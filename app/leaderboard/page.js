'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase';

const RANKS = [
  { name: 'Retail', min: 0, color: '#6B7280', icon: '👤' },
  { name: 'Smart Money', min: 100, color: '#10B981', icon: '💡' },
  { name: 'Institutional', min: 500, color: '#3B82F6', icon: '🏦' },
  { name: 'Liquidity Hunter', min: 1000, color: '#8B5CF6', icon: '🎯' },
  { name: 'ICT Master', min: 2500, color: '#D4A843', icon: '👑' },
];

function getRank(xp) {
  return [...RANKS].reverse().find(r => xp >= r.min) || RANKS[0];
}

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Fetch top 50
      const { data: top } = await supabase
        .from('profiles')
        .select('id, username, xp, streak')
        .order('xp', { ascending: false })
        .limit(50);

      setLeaders(top || []);

      if (user) {
        setCurrentUser(user);
        const pos = (top || []).findIndex(p => p.id === user.id);
        setUserRank(pos >= 0 ? pos + 1 : null);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .row-hover:hover { background: rgba(212,168,67,0.04) !important; }
      `}</style>

      <Navbar active="/leaderboard" />

      {/* HERO */}
      <section style={{ padding: '60px 24px 40px', textAlign: 'center', borderBottom: '1px solid rgba(212,168,67,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 300px at 50% 100%, rgba(212,168,67,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.15)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '20px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            LIVE LEADERBOARD
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
            <span style={{ color: 'white' }}>TOP </span>
            <span className="shine">TRADERS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 300 }}>
            Earn XP by completing lessons and daily challenges. Climb the ranks.
          </p>
        </div>
      </section>

      {/* RANKS KEY */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '40px' }}>
          {RANKS.map(r => (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '100px', border: `1px solid ${r.color}30`, background: `${r.color}10` }}>
              <span style={{ fontSize: '14px' }}>{r.icon}</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: r.color, letterSpacing: '0.1em' }}>{r.name}</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>{r.min}+ XP</span>
            </div>
          ))}
        </div>

        {/* USER POSITION */}
        {currentUser && userRank && (
          <div style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843', letterSpacing: '0.1em' }}>YOUR POSITION</div>
            <div className="font-display" style={{ fontSize: '32px', color: '#D4A843' }}>#{userRank}</div>
          </div>
        )}

        {!currentUser && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              <Link href="/auth" style={{ color: '#D4A843', textDecoration: 'none' }}>Sign in</Link> to see your rank
            </span>
          </div>
        )}

        {/* LEADERBOARD TABLE */}
        <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 80px', padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
            {['RANK', 'TRADER', 'XP', 'STREAK'].map(h => (
              <div key={h} style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em' }}>{h}</div>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>LOADING...</div>
          ) : leaders.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>NO DATA YET — BE THE FIRST!</div>
          ) : (
            leaders.map((p, i) => {
              const rank = getRank(p.xp || 0);
              const isMe = currentUser && p.id === currentUser.id;
              const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
              return (
                <div key={p.id} className="row-hover" style={{ display: 'grid', gridTemplateColumns: '60px 1fr 120px 80px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: isMe ? 'rgba(212,168,67,0.04)' : 'transparent', transition: 'background 0.2s' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '14px', color: i < 3 ? '#D4A843' : 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    {medal || `#${i + 1}`}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${rank.color}20`, border: `1px solid ${rank.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>{rank.icon}</div>
                    <div>
                      <div style={{ fontSize: '13px', color: isMe ? '#D4A843' : 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                        {p.username || 'Anonymous'} {isMe && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#D4A843' }}>(YOU)</span>}
                      </div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: rank.color, letterSpacing: '0.08em' }}>{rank.name}</div>
                    </div>
                  </div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: '#D4A843', fontWeight: 600 }}>{(p.xp || 0).toLocaleString()} XP</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>🔥 {p.streak || 0}</div>
                </div>
              );
            })
          )}
        </div>

        {/* XP GUIDE */}
        <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', marginBottom: '16px' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', marginBottom: '16px' }}>HOW TO EARN XP</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
            {[['Complete a lesson', '+10 XP'], ['Pass a quiz', '+20 XP'], ['Daily challenge', '+20 XP'], ['Perfect score', '+50 XP'], ['7-day streak', '+100 XP']].map(([action, xp]) => (
              <div key={action} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{action}</span>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#D4A843' }}>{xp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
