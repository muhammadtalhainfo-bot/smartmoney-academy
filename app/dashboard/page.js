'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase';
import { MODULES as ALL_MODULES } from '@/lib/curriculum';

const LEVEL_RANKS = ['Novice', 'Apprentice', 'Practitioner', 'Analyst', 'Strategist', 'Institutional'];

function CircleProgress({ pct, size = 90, stroke = 7, color = '#E8C547' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(232,197,71,0.95)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s ease' }} />
    </svg>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [retryTick, setRetryTick] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const supabase = useMemo(() => createClient(), []);

  const updateStreak = useCallback(async () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await fetch('/api/streak', {
        method: 'POST',
        cache: 'no-store',
        headers: timezone ? { 'x-timezone': timezone } : undefined,
      });
      if (!response.ok) return;
      const data = await response.json();
      setProfile(p => p ? { ...p, ...data } : p);
    } catch (error) {
      console.warn('Dashboard streak update skipped:', error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (!isMounted) return;
      setLoading(true);
      setLoadError('');

      try {
        const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!currentUser) {
          router.push('/auth');
          return;
        }
        if (!isMounted) return;
        setUser(currentUser);

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, name, username, xp, streak, longest_streak, is_pro')
          .eq('id', currentUser.id)
          .single();

        if (profileError || !profileData) {
          throw new Error('Unable to load your profile.');
        }

        const { data: completionData, error: completionError } = await supabase
          .from('lesson_completions')
          .select('lesson_id, quiz_score, completed_at')
          .eq('user_id', currentUser.id)
          .order('completed_at', { ascending: false });

        if (completionError) {
          throw new Error('Unable to load your lesson progress.');
        }

        if (!isMounted) return;
        setProfile(profileData);
        setCompletions((completionData || []).filter((row) => Number(row.quiz_score) >= 70));

        // Streak failures are non-fatal; progress data is still usable.
        await updateStreak();
        if (isMounted) setLoading(false);
      } catch (err) {
        console.error('Dashboard error:', err);
        if (isMounted) {
          setLoadError(err?.message || 'Unable to load your dashboard data.');
          setLoading(false);
        }
      }
    }
    loadData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (!isMounted) return;
      if (event === 'SIGNED_OUT') router.push('/auth');
    });

    return () => { isMounted = false; subscription?.unsubscribe(); };
  }, [router, supabase, updateStreak, retryTick]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
        <div className="font-mono-c text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(232,197,71,0.95)' }}>
          LOADING YOUR DASHBOARD...
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="w-full max-w-lg rounded-2xl border p-8 text-center" style={{ background: '#0F0F0F', borderColor: 'rgba(248,113,113,0.3)' }}>
          <div className="text-4xl mb-4">⚠️</div>
          <div className="font-mono-c text-xs tracking-widest uppercase mb-3" style={{ color: '#FCA5A5' }}>// Dashboard Load Failed</div>
          <h1 className="font-display text-4xl text-white mb-3">YOUR DATA IS STILL SAFE</h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: '#B9C1CC' }}>{loadError}</p>
          <button
            type="button"
            onClick={() => setRetryTick(tick => tick + 1)}
            className="px-6 py-3 rounded-xl font-mono-c text-xs tracking-wider uppercase font-bold"
            style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808' }}
          >
            Retry Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Computed stats
  const totalModules = ALL_MODULES.length;
  const completedModuleIds = [...new Set(
    completions
      .map(c => Number(c.lesson_id))
      .filter(id => ALL_MODULES.some(m => m.id === id))
  )];
  const completedModules = completedModuleIds.length;
  const overallPct = Math.round((completedModuleIds.length / totalModules) * 100);
  const xp = profile?.xp || 0;
  const rankIndex = Math.min(Math.floor(xp / 500), LEVEL_RANKS.length - 1);
  const currentRank = LEVEL_RANKS[rankIndex];
  const isMaxRank = rankIndex === LEVEL_RANKS.length - 1;
  const nextRank = isMaxRank ? null : LEVEL_RANKS[rankIndex + 1];
  const xpToNext = isMaxRank ? null : (rankIndex + 1) * 500;
  const xpPct = isMaxRank ? 100 : Math.min(100, Math.round((xp / xpToNext) * 100));
  const displayName = profile?.name || user?.email?.split('@')[0] || 'Trader';

  // Recent completions
  const recentCompletions = [...completions]
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

        :root { --gold: #E8C547; --gold-dim: #8A6B28; --border: rgba(212,168,67,0.22); }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-c { font-family: 'DM Mono', monospace; }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
        .grid-bg { background-image: linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px); background-size: 60px 60px; }
        .card { background: #0F0F0F; border: 1px solid rgba(232,197,71,0.95); border-radius: 16px; }
        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { border-color: rgba(232,197,71,0.95); transform: translateY(-2px); }
        .gold-gradient { background: linear-gradient(135deg, #8A6B28, #E8C547, #F0C96A, #E8C547); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .tab-btn { font-family: 'DM Mono', monospace; transition: all 0.2s; border-bottom: 2px solid transparent; }
        .tab-btn.active { color: #E8C547; border-bottom-color: #E8C547; }
        .progress-bar-bg { background: rgba(212,168,67,0.22); border-radius: 99px; overflow: hidden; }
        .progress-bar-fill { background: linear-gradient(90deg, #8A6B28, #E8C547, #F0C96A); border-radius: 99px; transition: width 1s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }
      `}</style>

      {/* NAV */}
      <Navbar active="/dashboard" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="fade-up mb-10">
          <div className="font-mono-c text-xs tracking-widest uppercase mb-2" style={{ color: '#E8C547' }}>// Your Progress</div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display leading-none" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
                <span className="text-white">WELCOME BACK, </span>
                <span className="gold-gradient">{displayName.toUpperCase()}</span>
              </h1>
              <p className="text-gray-200 text-sm mt-1" style={{ fontWeight: 300 }}>
                {currentRank} · {xp} XP · {profile?.streak || 0} day streak
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link href="/courses">
                <div className="px-6 py-3 rounded-xl font-mono-c text-sm tracking-wider uppercase font-bold cursor-pointer" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808' }}>
                  Continue Learning →
                </div>
              </Link>
              {profile?.is_pro ? (
                <button
                  type="button"
                  onClick={async () => {
                    const response = await fetch('/api/create-portal', { method: 'POST' });
                    const data = await response.json().catch(() => ({}));
                    if (response.ok && data.url) {
                      window.location.href = data.url;
                    } else {
                      window.alert(data?.error || 'Unable to open billing portal.');
                    }
                  }}
                  className="px-5 py-3 rounded-xl font-mono-c text-xs tracking-wider uppercase font-bold"
                  style={{ border: '1px solid rgba(232,197,71,0.35)', color: '#E8C547', background: 'transparent', cursor: 'pointer' }}
                >
                  Manage Pro →
                </button>
              ) : null}
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="fade-up grid grid-cols-2 md:grid-cols-3 gap-4 mb-8" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Day Streak', value: profile?.streak || 0, icon: '🔥', sub: `Best: ${profile?.longest_streak || 0}`, highlight: true },
            { label: 'Modules Done', value: completedModules, icon: '📖', sub: `of ${totalModules} total` },
            
            { label: 'Total XP', value: xp.toLocaleString(), icon: '⚡', sub: `${xpToNext - xp} to next rank` },
          ].map((s, i) => (
            <div key={i} className={`card p-5 ${s.highlight ? 'border-[rgba(232,197,71,0.95)]' : ''}`} style={s.highlight ? { background: 'rgba(212,168,67,0.04)' } : {}}>
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="font-display text-4xl mb-1" style={{ color: s.highlight ? '#E8C547' : 'white' }}>{s.value}</div>
              <div className="font-mono-c text-[10px] tracking-widest uppercase mb-1" style={{ color: '#C0C0C0' }}>{s.label}</div>
              <div className="font-mono-c text-[10px]" style={{ color: '#E8C547' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="fade-up flex gap-6 border-b mb-8" style={{ animationDelay: '0.15s', borderColor: 'rgba(232,197,71,0.95)' }}>
          {[['overview', 'Overview'], ['modules', 'All Modules']].map(([key, label]) => (
            <button type="button" key={key} aria-pressed={activeTab === key} onClick={() => setActiveTab(key)} className={`tab-btn pb-3 text-xs tracking-widest uppercase ${activeTab === key ? 'active' : 'text-gray-200'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="fade-up grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">

              {/* Overall progress */}
              <div className="card p-6">
                <div className="font-mono-c text-xs tracking-widest uppercase mb-5" style={{ color: '#E8C547' }}>// Curriculum Progress</div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative flex-shrink-0">
                    <CircleProgress pct={overallPct} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl" style={{ color: '#E8C547' }}>{overallPct}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-white mb-1">{completedModuleIds.length} / {totalModules} Modules</div>
                    <div className="text-gray-200 text-sm" style={{ fontWeight: 300 }}>{completedModules} of {totalModules} modules completed</div>
                    <div className="mt-3 progress-bar-bg h-2 w-48">
                      <div className="progress-bar-fill h-2" style={{ width: `${overallPct}%` }} />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Beginner Track', level: 'Beginner', color: '#34D399' },
                    { label: 'Intermediate Track', level: 'Intermediate', color: '#E8C547' },
                    { label: 'Advanced Track', level: 'Advanced', color: '#F87171' },
                    { label: 'SMC Track', level: 'SMC', color: '#FB923C' },
                  ].map((track) => {
                    const trackIds = ALL_MODULES.filter(m => m.level === track.level).map(m => m.id);
                    const done = trackIds.filter(id => completedModuleIds.includes(id)).length;
                    return (
                      <div key={track.label}>
                        <div className="flex justify-between mb-1.5">
                          <span className="font-mono-c text-xs" style={{ color: track.color }}>{track.label}</span>
                          <span className="font-mono-c text-xs" style={{ color: '#808080' }}>{done}/{trackIds.length}</span>
                        </div>
                        <div className="progress-bar-bg h-1.5">
                          <div className="h-1.5 rounded-full" style={{ width: `${trackIds.length ? (done / trackIds.length) * 100 : 0}%`, background: track.color, transition: 'width 1s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent module completions */}
              <div className="card p-6">
                <div className="font-mono-c text-xs tracking-widest uppercase mb-5" style={{ color: '#E8C547' }}>// Recent Modules</div>
                {recentCompletions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-mono-c text-xs" style={{ color: '#A8A8A8' }}>No modules completed yet</p>
                    <Link href="/courses" className="inline-block mt-3 font-mono-c text-xs" style={{ color: '#E8C547' }}>Start your first module →</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentCompletions.map((c, i) => {
                      const mod = ALL_MODULES.find(m => m.id === Number(c.lesson_id));
                      return (
                        <Link key={i} href={`/lesson/${c.lesson_id}`}>
                          <div className="flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[rgba(232,197,71,0.95)] cursor-pointer mb-2" style={{ borderColor: 'rgba(212,168,67,0.22)', background: '#141414' }}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(212,168,67,0.22)' }}>{mod?.emoji || '📖'}</div>
                              <div>
                                <div className="font-medium text-white text-sm">{mod?.title || `Module ${c.lesson_id}`}</div>
                                <div className="font-mono-c text-[10px]" style={{ color: '#E8C547' }}>{new Date(c.completed_at).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="font-display text-xl" style={{ color: c.quiz_score === 100 ? '#34D399' : '#E8C547' }}>{c.quiz_score}%</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right col */}
            <div className="space-y-6">
              {/* Rank card */}
              <div className="card p-6" style={{ background: 'rgba(212,168,67,0.03)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-4" style={{ color: '#E8C547' }}>// Current Rank</div>
                <div className="text-center mb-5">
                  <div className="text-5xl mb-3">🎖️</div>
                  <div className="font-display text-3xl text-white mb-1">{currentRank.toUpperCase()}</div>
                  <div className="font-mono-c text-xs" style={{ color: '#B0B0B0' }}>Rank {rankIndex + 1} of {LEVEL_RANKS.length}</div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono-c text-[10px]" style={{ color: '#D0D0D0', fontSize: '11px' }}>XP Progress</span>
                    <span className="font-mono-c text-[10px]" style={{ color: '#E8C547' }}>{isMaxRank ? 'MAX RANK' : xp + ' / ' + xpToNext}</span>
                  </div>
                  <div className="progress-bar-bg h-2">
                    <div className="progress-bar-fill h-2" style={{ width: `${xpPct}%` }} />
                  </div>
                </div>
                <div className="font-mono-c text-[10px] text-center" style={{ color: '#E8C547' }}>
                  {isMaxRank ? 'MAX RANK REACHED' : 'Next: ' + nextRank + ' (' + (xpToNext - xp) + ' XP away)'}
                </div>
                <div className="mt-5 space-y-2">
                  {LEVEL_RANKS.map((rank, i) => {
                    const current = i === rankIndex;
                    const done = i < rankIndex;
                    return (
                      <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: current ? 'rgba(212,168,67,0.22)' : 'transparent' }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: done ? '#E8C547' : current ? '#E8C547' : 'rgba(255,255,255,0.18)', color: done ? '#080808' : current ? '#E8C547' : '#A8A8A8' }}>
                          {done ? '✓' : i + 1}
                        </div>
                        <span className="font-mono-c text-sm" style={{ color: current ? '#E8C547' : done ? '#C0C0C0' : '#B0B0B0', fontWeight: current ? '600' : '400' }}>{rank}</span>
                        {current && <span className="ml-auto font-mono-c text-[9px]" style={{ color: 'rgba(232,197,71,0.95)' }}>← YOU</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next up */}
              <div className="card p-6">
                <div className="font-mono-c text-xs tracking-widest uppercase mb-4" style={{ color: '#E8C547' }}>// Up Next</div>
                {(() => {
                  const nextModule = ALL_MODULES.find(m => !completedModuleIds.includes(m.id));
                  if (!nextModule) return <p className="font-mono-c text-xs text-center py-4" style={{ color: '#34D399' }}>🏆 All modules complete!</p>;
                  return (
                    <Link href={`/lesson/${nextModule.id}`}>
                      <div className="p-4 rounded-xl border cursor-pointer transition-all hover:border-[#E8C547]" style={{ borderColor: 'rgba(232,197,71,0.95)', background: 'rgba(212,168,67,0.03)' }}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{nextModule.emoji}</span>
                          <div>
                            <div className="font-semibold text-white text-sm">{nextModule.title}</div>
                            <div className="font-mono-c text-[10px]" style={{ color: 'rgba(232,197,71,0.95)' }}>Module {nextModule.id} · {nextModule.level}</div>
                          </div>
                        </div>
                        <div className="progress-bar-bg h-1.5 mb-2">
                          <div className="h-1.5 rounded-full" style={{ width: '0%', background: '#E8C547' }} />
                        </div>
                        <div className="font-mono-c text-[10px]" style={{ color: '#808080' }}>Not started · 0% complete</div>
                      </div>
                    </Link>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* MODULES TAB */}
        {activeTab === 'modules' && (
          <div className="fade-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_MODULES.map((mod) => {
              const isComplete = completedModuleIds.includes(mod.id);
              const pct = isComplete ? 100 : 0;
              return (
                <Link key={mod.id} href={`/lesson/${mod.id}`}>
                  <div className="card card-hover p-5 cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(232,197,71,0.95)' }}>{mod.emoji}</div>
                        <div>
                          <div className="font-mono-c text-[10px] mb-0.5" style={{ color: '#E8C547', letterSpacing: '0.15em' }}>MODULE {String(mod.id).padStart(2, '0')}</div>
                          <div className="font-semibold text-white text-sm">{mod.title}</div>
                        </div>
                      </div>
                      {isComplete && <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399' }}>✓</div>}
                    </div>
                    <div className="progress-bar-bg h-1.5 mb-2">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: isComplete ? '#34D399' : '#E8C547', transition: 'width 0.7s ease' }} />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono-c text-[10px]" style={{ color: isComplete ? '#34D399' : '#E4E4E7' }}>
                        {isComplete ? 'Complete' : 'Not started'}
                      </span>
                      <span className="font-mono-c text-[10px]" style={{ color: '#A8A8A8' }}>{pct}%</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t px-8 py-6 mt-16" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #E8C547, #8A6B28)' }}>S</div>
            <span className="font-display text-lg tracking-widest text-white">ICT FLOW</span>
          </div>
          <div className="font-mono-c text-xs text-gray-200">Educational platform only. Not financial advice.</div>
        </div>
      </footer>
    <Footer />
    </div>
  );
}