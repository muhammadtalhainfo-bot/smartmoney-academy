'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase';

const ALL_MODULES = [
  { id: 1, title: 'Market Structure', lessons: 6, emoji: '📊', level: 'Beginner' },
  { id: 2, title: 'Liquidity Concepts', lessons: 5, emoji: '💧', level: 'Beginner' },
  { id: 3, title: 'Fair Value Gaps', lessons: 5, emoji: '🎯', level: 'Beginner' },
  { id: 4, title: 'Order Blocks', lessons: 6, emoji: '🧱', level: 'Intermediate' },
  { id: 5, title: 'Killzones & Macros', lessons: 4, emoji: '⏰', level: 'Intermediate' },
  { id: 6, title: 'Power of Three (AMD)', lessons: 5, emoji: '🔱', level: 'Intermediate' },
  { id: 7, title: 'Premium & Discount', lessons: 4, emoji: '📐', level: 'Intermediate' },
  { id: 8, title: 'ICT Entry Models', lessons: 7, emoji: '🎲', level: 'Intermediate' },
  { id: 9, title: 'Market Maker Models', lessons: 5, emoji: '🏦', level: 'Advanced' },
  { id: 10, title: 'SMT Divergence', lessons: 4, emoji: '🔀', level: 'Advanced' },
  { id: 11, title: 'IPDA & CRT', lessons: 5, emoji: '🤖', level: 'Advanced' },
  { id: 12, title: 'ICT 2024 Mentorship', lessons: 8, emoji: '🆕', level: 'Advanced' },
  { id: 13, title: 'SMC Concepts', lessons: 6, emoji: '💼', level: 'Beginner' },
  { id: 14, title: 'Top-Down Analysis', lessons: 5, emoji: '🔭', level: 'Intermediate' },
];

const LEVEL_RANKS = ['Novice', 'Apprentice', 'Practitioner', 'Analyst', 'Strategist', 'Institutional'];

function CircleProgress({ pct, size = 90, stroke = 7, color = '#D4A843' }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(212,168,67,0.1)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 1s ease' }} />
    </svg>
  );
}

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function loadData() {
      // Check auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth'); return; }
      setUser(user);

      // Load profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      setProfile(profileData);

      // Load completions
      const { data: completionData } = await supabase
        .from('lesson_completions')
        .select('*')
        .eq('user_id', user.id);
      setCompletions(completionData || []);

      // Update streak
      await updateStreak(user.id, profileData);
      setLoading(false);
    }
    loadData();
  }, []);

  async function updateStreak(userId, prof) {
    if (!prof) return;
    const today = new Date().toISOString().split('T')[0];
    const lastActive = prof.last_active;
    if (lastActive === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newStreak = lastActive === yesterday ? (prof.streak || 0) + 1 : 1;
    const longestStreak = Math.max(newStreak, prof.longest_streak || 0);

    await supabase.from('profiles').update({
      streak: newStreak,
      longest_streak: longestStreak,
      last_active: today,
    }).eq('id', userId);

    setProfile(p => ({ ...p, streak: newStreak, longest_streak: longestStreak, last_active: today }));
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="font-mono-c text-xs tracking-widest" style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(212,168,67,0.5)' }}>
          LOADING YOUR DASHBOARD...
        </div>
      </div>
    );
  }

  // Computed stats
  const totalLessons = ALL_MODULES.reduce((a, m) => a + m.lessons, 0);
  const totalModules = ALL_MODULES.length;
  const completedLessons = completions.length;
  const completedModuleIds = ALL_MODULES
    .filter(m => {
      const modCompletions = completions.filter(c => c.module_id === m.id);
      return modCompletions.length >= m.lessons;
    })
    .map(m => m.id);
  const overallPct = Math.round((completedModuleIds.length / totalModules) * 100);
  const xp = profile?.total_xp || 0;
  const rankIndex = Math.min(Math.floor(xp / 500), LEVEL_RANKS.length - 1);
  const currentRank = LEVEL_RANKS[rankIndex];
  const nextRank = LEVEL_RANKS[rankIndex + 1] || 'MAX';
  const xpToNext = (rankIndex + 1) * 500;
  const xpPct = Math.round((xp / xpToNext) * 100);
  const displayName = profile?.name || user?.email?.split('@')[0] || 'Trader';

  // Recent completions
  const recentCompletions = [...completions]
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --gold-dim: #8A6B28; --border: rgba(212,168,67,0.12); }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-c { font-family: 'DM Mono', monospace; }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
        .grid-bg { background-image: linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px); background-size: 60px 60px; }
        .card { background: #0F0F0F; border: 1px solid rgba(212,168,67,0.1); border-radius: 16px; }
        .card-hover { transition: all 0.25s ease; }
        .card-hover:hover { border-color: rgba(212,168,67,0.25); transform: translateY(-2px); }
        .gold-gradient { background: linear-gradient(135deg, #8A6B28, #D4A843, #F0C96A, #D4A843); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .tab-btn { font-family: 'DM Mono', monospace; transition: all 0.2s; border-bottom: 2px solid transparent; }
        .tab-btn.active { color: #D4A843; border-bottom-color: #D4A843; }
        .progress-bar-bg { background: rgba(212,168,67,0.08); border-radius: 99px; overflow: hidden; }
        .progress-bar-fill { background: linear-gradient(90deg, #8A6B28, #D4A843, #F0C96A); border-radius: 99px; transition: width 1s ease; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease forwards; opacity: 0; }
      `}</style>

      {/* NAV */}
      <Navbar active="/dashboard" />
      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
          {[['/', 'Home'], ['/courses', 'Courses'], ['/signals', 'Signals'], ['/glossary', 'Glossary'], ['/practice', 'Practice'], ['/journal', 'Journal'], ['/dashboard', 'Dashboard']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '24px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="fade-up mb-10">
          <div className="font-mono-c text-xs tracking-widest uppercase mb-2" style={{ color: '#D4A843' }}>// Your Progress</div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-display leading-none" style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
                <span className="text-white">WELCOME BACK, </span>
                <span className="gold-gradient">{displayName.toUpperCase()}</span>
              </h1>
              <p className="text-gray-300 text-sm mt-1" style={{ fontWeight: 300 }}>
                {currentRank} · {xp} XP · {profile?.streak || 0} day streak
              </p>
            </div>
            <Link href="/courses">
              <div className="px-6 py-3 rounded-xl font-mono-c text-sm tracking-wider uppercase font-bold cursor-pointer" style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808' }}>
                Continue Learning →
              </div>
            </Link>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="fade-up grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Day Streak', value: profile?.streak || 0, icon: '🔥', sub: `Best: ${profile?.longest_streak || 0}`, highlight: true },
            { label: 'Lessons Done', value: completedLessons, icon: '📖', sub: `of ${totalLessons} total` },
            { label: 'Modules Done', value: completedModuleIds.length, icon: '✅', sub: `of ${totalModules} modules` },
            { label: 'Total XP', value: xp.toLocaleString(), icon: '⚡', sub: `${xpToNext - xp} to next rank` },
          ].map((s, i) => (
            <div key={i} className={`card p-5 ${s.highlight ? 'border-[rgba(212,168,67,0.25)]' : ''}`} style={s.highlight ? { background: 'rgba(212,168,67,0.04)' } : {}}>
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="font-display text-4xl mb-1" style={{ color: s.highlight ? '#D4A843' : 'white' }}>{s.value}</div>
              <div className="font-mono-c text-[10px] tracking-widest uppercase mb-1" style={{ color: '#C0C0C0' }}>{s.label}</div>
              <div className="font-mono-c text-[10px]" style={{ color: 'rgba(212,168,67,0.7)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="fade-up flex gap-6 border-b mb-8" style={{ animationDelay: '0.15s', borderColor: 'rgba(212,168,67,0.1)' }}>
          {[['overview', 'Overview'], ['modules', 'All Modules']].map(([key, label]) => (
            <button key={key} onClick={() => setActiveTab(key)} className={`tab-btn pb-3 text-xs tracking-widest uppercase ${activeTab === key ? 'active' : 'text-gray-300'}`}>
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
                <div className="font-mono-c text-xs tracking-widest uppercase mb-5" style={{ color: '#D4A843' }}>// Curriculum Progress</div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative flex-shrink-0">
                    <CircleProgress pct={overallPct} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-2xl" style={{ color: '#D4A843' }}>{overallPct}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-3xl text-white mb-1">{completedModuleIds.length} / {totalModules} Modules</div>
                    <div className="text-gray-300 text-sm" style={{ fontWeight: 300 }}>{completedLessons} of {totalLessons} lessons completed</div>
                    <div className="mt-3 progress-bar-bg h-2 w-48">
                      <div className="progress-bar-fill h-2" style={{ width: `${(completedLessons / totalLessons) * 100}%` }} />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Beginner Track', ids: [1,2,3,13], color: '#34D399' },
                    { label: 'Intermediate Track', ids: [4,5,6,7,8,14], color: '#D4A843' },
                    { label: 'Advanced Track', ids: [9,10,11,12], color: '#F87171' },
                  ].map((track) => {
                    const done = track.ids.filter(id => completedModuleIds.includes(id)).length;
                    return (
                      <div key={track.label}>
                        <div className="flex justify-between mb-1.5">
                          <span className="font-mono-c text-xs" style={{ color: track.color }}>{track.label}</span>
                          <span className="font-mono-c text-xs" style={{ color: '#808080' }}>{done}/{track.ids.length}</span>
                        </div>
                        <div className="progress-bar-bg h-1.5">
                          <div className="h-1.5 rounded-full" style={{ width: `${(done / track.ids.length) * 100}%`, background: track.color, transition: 'width 1s ease' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent lessons */}
              <div className="card p-6">
                <div className="font-mono-c text-xs tracking-widest uppercase mb-5" style={{ color: '#D4A843' }}>// Recent Lessons</div>
                {recentCompletions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="font-mono-c text-xs" style={{ color: '#A8A8A8' }}>No lessons completed yet</p>
                    <Link href="/courses" className="inline-block mt-3 font-mono-c text-xs" style={{ color: '#D4A843' }}>Start your first lesson →</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentCompletions.map((c, i) => {
                      const mod = ALL_MODULES.find(m => m.id === c.module_id);
                      return (
                        <Link key={i} href={`/lesson/${c.lesson_id}`}>
                          <div className="flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[rgba(212,168,67,0.25)] cursor-pointer mb-2" style={{ borderColor: 'rgba(212,168,67,0.08)', background: '#141414' }}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: 'rgba(212,168,67,0.08)' }}>{mod?.emoji || '📖'}</div>
                              <div>
                                <div className="font-medium text-white text-sm">{mod?.title || `Lesson ${c.lesson_id}`}</div>
                                <div className="font-mono-c text-[10px]" style={{ color: '#D4A843' }}>{new Date(c.completed_at).toLocaleDateString()}</div>
                              </div>
                            </div>
                            <div className="font-display text-xl" style={{ color: c.quiz_score === 100 ? '#34D399' : '#D4A843' }}>{c.quiz_score}%</div>
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
                <div className="font-mono-c text-xs tracking-widest uppercase mb-4" style={{ color: '#D4A843' }}>// Current Rank</div>
                <div className="text-center mb-5">
                  <div className="text-5xl mb-3">🎖️</div>
                  <div className="font-display text-3xl text-white mb-1">{currentRank.toUpperCase()}</div>
                  <div className="font-mono-c text-xs" style={{ color: '#B0B0B0' }}>Rank {rankIndex + 1} of {LEVEL_RANKS.length}</div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-mono-c text-[10px]" style={{ color: '#D0D0D0', fontSize: '11px' }}>XP Progress</span>
                    <span className="font-mono-c text-[10px]" style={{ color: '#D4A843' }}>{xp} / {xpToNext}</span>
                  </div>
                  <div className="progress-bar-bg h-2">
                    <div className="progress-bar-fill h-2" style={{ width: `${xpPct}%` }} />
                  </div>
                </div>
                <div className="font-mono-c text-[10px] text-center" style={{ color: '#D4A843' }}>
                  Next: {nextRank} ({xpToNext - xp} XP away)
                </div>
                <div className="mt-5 space-y-2">
                  {LEVEL_RANKS.map((rank, i) => {
                    const current = i === rankIndex;
                    const done = i < rankIndex;
                    return (
                      <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: current ? 'rgba(212,168,67,0.08)' : 'transparent' }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: done ? '#D4A843' : current ? 'rgba(212,168,67,0.3)' : 'rgba(255,255,255,0.08)', color: done ? '#080808' : current ? '#D4A843' : '#A8A8A8' }}>
                          {done ? '✓' : i + 1}
                        </div>
                        <span className="font-mono-c text-sm" style={{ color: current ? '#D4A843' : done ? '#C0C0C0' : '#B0B0B0', fontWeight: current ? '600' : '400' }}>{rank}</span>
                        {current && <span className="ml-auto font-mono-c text-[9px]" style={{ color: 'rgba(212,168,67,0.5)' }}>← YOU</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next up */}
              <div className="card p-6">
                <div className="font-mono-c text-xs tracking-widest uppercase mb-4" style={{ color: '#D4A843' }}>// Up Next</div>
                {(() => {
                  const nextModule = ALL_MODULES.find(m => !completedModuleIds.includes(m.id));
                  if (!nextModule) return <p className="font-mono-c text-xs text-center py-4" style={{ color: '#34D399' }}>🏆 All modules complete!</p>;
                  const modCompletions = completions.filter(c => c.module_id === nextModule.id).length;
                  return (
                    <Link href={`/lesson/${nextModule.id}`}>
                      <div className="p-4 rounded-xl border cursor-pointer transition-all hover:border-[rgba(212,168,67,0.3)]" style={{ borderColor: 'rgba(212,168,67,0.15)', background: 'rgba(212,168,67,0.03)' }}>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">{nextModule.emoji}</span>
                          <div>
                            <div className="font-semibold text-white text-sm">{nextModule.title}</div>
                            <div className="font-mono-c text-[10px]" style={{ color: 'rgba(212,168,67,0.5)' }}>Module {nextModule.id} · {nextModule.level}</div>
                          </div>
                        </div>
                        <div className="progress-bar-bg h-1.5 mb-2">
                          <div className="h-1.5 rounded-full" style={{ width: `${(modCompletions / nextModule.lessons) * 100}%`, background: '#D4A843' }} />
                        </div>
                        <div className="font-mono-c text-[10px]" style={{ color: '#808080' }}>{modCompletions} / {nextModule.lessons} lessons</div>
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
              const modCompletions = completions.filter(c => c.module_id === mod.id).length;
              const pct = isComplete ? 100 : Math.round((modCompletions / mod.lessons) * 100);
              return (
                <Link key={mod.id} href={`/lesson/${mod.id}`}>
                  <div className="card card-hover p-5 cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.1)' }}>{mod.emoji}</div>
                        <div>
                          <div className="font-mono-c text-[10px] mb-0.5" style={{ color: 'rgba(212,168,67,0.7)', letterSpacing: '0.15em' }}>MODULE {String(mod.id).padStart(2, '0')}</div>
                          <div className="font-semibold text-white text-sm">{mod.title}</div>
                        </div>
                      </div>
                      {isComplete && <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'rgba(52,211,153,0.15)', color: '#34D399' }}>✓</div>}
                    </div>
                    <div className="progress-bar-bg h-1.5 mb-2">
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: isComplete ? '#34D399' : '#D4A843', transition: 'width 0.7s ease' }} />
                    </div>
                    <div className="flex justify-between">
                      <span className="font-mono-c text-[10px]" style={{ color: isComplete ? '#34D399' : modCompletions > 0 ? '#D4A843' : '#707070' }}>
                        {isComplete ? 'Complete' : modCompletions > 0 ? `${modCompletions}/${mod.lessons} lessons` : 'Not started'}
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
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #D4A843, #8A6B28)' }}>S</div>
            <span className="font-display text-lg tracking-widest text-white">SMARTMONEY ACADEMY</span>
          </div>
          <div className="font-mono-c text-xs text-gray-300">Educational platform only. Not financial advice.</div>
        </div>
      </footer>
    <Footer />
    </div>
  );
}