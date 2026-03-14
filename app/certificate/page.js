'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { createClient } from '@/lib/supabase';

const TOTAL_LESSONS = 14;

export default function CertificatePage() {
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [printed, setPrinted] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }
      setUser(user);

      const { data: completions } = await supabase
        .from('lesson_completions')
        .select('lesson_id')
        .eq('user_id', user.id);

      const { data: prof } = await supabase
        .from('profiles')
        .select('username, xp')
        .eq('id', user.id)
        .single();

      setCompleted((completions || []).length);
      setProfile(prof);
      setLoading(false);
    }
    load();
  }, []);

  const progress = Math.round((completed / TOTAL_LESSONS) * 100);
  const eligible = completed >= TOTAL_LESSONS;
  const name = profile?.username || user?.email?.split('@')[0] || 'Trader';
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@1,700&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .cert-card { box-shadow: none !important; }
        }
      `}</style>

      <div className="no-print"><Navbar active="/certificate" /></div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'DM Mono, monospace', color: 'rgba(255,255,255,0.3)' }}>LOADING...</div>
        ) : !user ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <div className="font-display" style={{ fontSize: '48px', color: 'white', marginBottom: '16px' }}>SIGN IN REQUIRED</div>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>You need an account to view your certificate.</p>
            <Link href="/auth" style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '10px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em' }}>SIGN IN →</Link>
          </div>
        ) : !eligible ? (
          /* PROGRESS VIEW */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'white', lineHeight: 1, marginBottom: '12px' }}>
                YOUR <span className="shine">PROGRESS</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 300 }}>
                Complete all 14 modules to earn your certificate.
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>MODULES COMPLETED</span>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843' }}>{completed}/{TOTAL_LESSONS}</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#8A6B28,#D4A843)', borderRadius: '100px', transition: 'width 0.5s' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                {Array.from({ length: TOTAL_LESSONS }, (_, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '14px' }}>{i < completed ? '✅' : '⬜'}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: i < completed ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>MODULE {String(i + 1).padStart(2, '0')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/courses" style={{ display: 'inline-block', padding: '14px 36px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '10px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600 }}>
                CONTINUE LEARNING →
              </Link>
            </div>
          </div>
        ) : (
          /* CERTIFICATE VIEW */
          <div>
            <div className="no-print" style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 className="font-display shine" style={{ fontSize: '56px', lineHeight: 1, marginBottom: '8px' }}>CONGRATULATIONS!</h1>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px' }}>Your certificate is ready. Print or save as PDF.</p>
            </div>

            {/* CERTIFICATE CARD */}
            <div className="cert-card" style={{ background: 'white', borderRadius: '16px', padding: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 80px rgba(212,168,67,0.2)' }}>
              {/* Gold border */}
              <div style={{ position: 'absolute', inset: '12px', border: '2px solid #D4A843', borderRadius: '10px', opacity: 0.4, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: '16px', border: '1px solid #D4A843', borderRadius: '8px', opacity: 0.2, pointerEvents: 'none' }} />

              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', color: 'black', fontSize: '22px' }}>S</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '0.15em', color: '#1a1a1a' }}>SMARTMONEY ACADEMY</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#8A6B28', letterSpacing: '0.2em' }}>ICT & SMART MONEY EDUCATION</div>
                </div>
              </div>

              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#8A6B28', letterSpacing: '0.3em', marginBottom: '16px' }}>CERTIFICATE OF COMPLETION</div>

              <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#666', marginBottom: '8px' }}>This certifies that</div>

              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontStyle: 'italic', color: '#D4A843', marginBottom: '8px', lineHeight: 1.2 }}>{name}</div>

              <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: 1.8 }}>
                has successfully completed the<br />
                <strong style={{ color: '#1a1a1a' }}>ICT & Smart Money Concepts Curriculum</strong><br />
                comprising all 14 modules and 80+ lessons
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px' }}>
                {[['14', 'Modules'], ['80+', 'Lessons'], [profile?.xp || 0, 'XP Earned']].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: '#D4A843' }}>{val}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#999', letterSpacing: '0.15em' }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#999', letterSpacing: '0.1em', marginBottom: '4px' }}>DATE ISSUED</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#333' }}>{date}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#999', letterSpacing: '0.1em', marginBottom: '4px' }}>CREDENTIAL ID</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843' }}>SMA-{user.id.slice(0, 8).toUpperCase()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#D4A843', letterSpacing: '0.1em' }}>SMARTMONEY</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: '#999', letterSpacing: '0.15em' }}>ACADEMY</div>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
              <button onClick={() => window.print()} style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '10px', color: 'black', border: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600, cursor: 'pointer' }}>
                🖨️ PRINT / SAVE PDF
              </button>
              <Link href="/dashboard" style={{ padding: '14px 32px', background: 'transparent', borderRadius: '10px', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                BACK TO DASHBOARD
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
