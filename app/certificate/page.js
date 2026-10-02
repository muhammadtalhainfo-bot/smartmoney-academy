'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { MODULES } from '@/lib/curriculum';

const TOTAL_MODULES = MODULES.length;

export default function CertificatePage() {
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [profile, setProfile] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessError, setAccessError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch('/api/certificate', { cache: 'no-store' });
        const data = await response.json();

        if (!response.ok) {
          const message = data?.error || 'Unable to load certificate data.';
          setAccessError(response.status === 401 ? 'Sign in required to view your certificate.' : message);
          return;
        }

        setUser({ id: 'authenticated' });
        setCertificate(data);
        setCompleted(data.completedCount || 0);
        setProfile({ username: data.name, xp: data.xp || 0 });
      } catch (error) {
        console.error('Certificate page error:', error);
        setAccessError('Unable to load certificate data. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const progress = Math.round((completed / TOTAL_MODULES) * 100);
  const eligible = Boolean(certificate?.eligible) && completed >= TOTAL_MODULES;
  const name = certificate?.name || profile?.username || user?.email?.split('@')[0] || 'Trader';
  const date = certificate?.issuedAt
    ? new Date(certificate.issuedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .cert-card { box-shadow: none !important; }
        }
      `}</style>

      <div className="no-print"><Navbar active="/certificate" /></div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'DM Mono, monospace', color: 'rgba(255,255,255,0.6)' }}>LOADING...</div>
        ) : accessError ? (
          <div style={{ textAlign: 'center', padding: '80px' }}>
            <div className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 64px)', color: 'white', marginBottom: '16px' }}>
              {accessError.toLowerCase().includes('sign in') ? 'SIGN IN REQUIRED' : 'CERTIFICATE UNAVAILABLE'}
            </div>
            <p style={{ color: '#D0D6DE', margin: '0 auto 24px', maxWidth: '520px', lineHeight: 1.7 }}>{accessError}</p>
            <Link href={accessError.toLowerCase().includes('sign in') ? '/auth' : '/courses'} style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#E8C547,#8A6B28)', borderRadius: '10px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em' }}>
              {accessError.toLowerCase().includes('sign in') ? 'SIGN IN →' : 'CONTINUE LEARNING →'}
            </Link>
          </div>
        ) : !eligible ? (
          /* PROGRESS VIEW */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h1 className="font-display" style={{ fontSize: 'clamp(40px, 7vw, 72px)', color: 'white', lineHeight: 1, marginBottom: '12px' }}>
                YOUR <span className="shine">PROGRESS</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300 }}>
                Complete all {TOTAL_MODULES} modules to earn your certificate.
              </p>
            </div>

            {/* Progress bar */}
            <div style={{ background: '#111111', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>MODULES COMPLETED</span>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#E8C547' }}>{completed}/{TOTAL_MODULES}</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '100px', overflow: 'hidden', marginBottom: '24px' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#8A6B28,#E8C547)', borderRadius: '100px', transition: 'width 0.5s' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
                {MODULES.map((module) => {
                  const done = certificate?.completedModuleIds?.includes(module.id);
                  return (
                    <div key={module.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontSize: '14px' }}>{done ? '✅' : '⬜'}</span>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: done ? '#D0D6DE' : '#B9C1CC' }}>
                        MODULE {String(module.id).padStart(2, '0')} · {module.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/courses" style={{ display: 'inline-block', padding: '14px 36px', background: 'linear-gradient(135deg,#E8C547,#8A6B28)', borderRadius: '10px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600 }}>
                CONTINUE LEARNING →
              </Link>
            </div>
          </div>
        ) : (
          /* CERTIFICATE VIEW */
          <div>
            <div className="no-print" style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 className="font-display shine" style={{ fontSize: '56px', lineHeight: 1, marginBottom: '8px' }}>CONGRATULATIONS!</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>Your certificate is ready. Print or save as PDF.</p>
            </div>

            {/* CERTIFICATE CARD */}
            <div className="cert-card" style={{ background: 'white', borderRadius: '16px', padding: '60px', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 0 80px #E8C547' }}>
              {/* Gold border */}
              <div style={{ position: 'absolute', inset: '12px', border: '2px solid #E8C547', borderRadius: '10px', opacity: 0.4, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: '16px', border: '1px solid #E8C547', borderRadius: '8px', opacity: 0.2, pointerEvents: 'none' }} />

              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'linear-gradient(135deg,#E8C547,#8A6B28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue, sans-serif', color: 'black', fontSize: '22px' }}>S</div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '0.15em', color: '#1a1a1a' }}>ICT FLOW</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#8A6B28', letterSpacing: '0.2em' }}>ICT & SMART MONEY EDUCATION</div>
                </div>
              </div>

              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#8A6B28', letterSpacing: '0.3em', marginBottom: '16px' }}>CERTIFICATE OF COMPLETION</div>

              <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#666', marginBottom: '8px' }}>This certifies that</div>

              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', fontStyle: 'italic', color: '#E8C547', marginBottom: '8px', lineHeight: 1.2 }}>{name}</div>

              <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: 1.8 }}>
                has successfully completed the<br />
                <strong style={{ color: '#1a1a1a' }}>ICT & Smart Money Concepts Curriculum</strong><br />
                comprising all {TOTAL_MODULES} modules and {certificate?.totalLessons || 203} lessons
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '32px' }}>
                {[[TOTAL_MODULES, 'Modules'], [certificate?.totalLessons || 203, 'Lessons'], [certificate?.xp || profile?.xp || 0, 'XP Earned']].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: '#E8C547' }}>{val}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#5B6573', letterSpacing: '0.15em' }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#5B6573', letterSpacing: '0.1em', marginBottom: '4px' }}>DATE ISSUED</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: '13px', color: '#333' }}>{date}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#5B6573', letterSpacing: '0.1em', marginBottom: '4px' }}>CREDENTIAL ID</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#E8C547' }}>{certificate?.credentialId || '—'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#E8C547', letterSpacing: '0.1em' }}>ICT FLOW</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: '#5B6573', letterSpacing: '0.15em' }}>ACADEMY</div>
                </div>
              </div>
            </div>

            <div className="no-print" style={{ textAlign: 'center', marginTop: '18px' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C5CCD6', letterSpacing: '0.12em', marginBottom: '6px' }}>PUBLIC VERIFICATION</div>
              <a
                href={certificate?.verificationUrl || '#'}
                target="_blank"
                rel="noreferrer"
                style={{ color: '#E8C547', fontFamily: 'DM Mono, monospace', fontSize: '10px', wordBreak: 'break-all' }}
              >
                {certificate?.verificationUrl || 'Verification unavailable'}
              </a>
            </div>

            {/* ACTIONS */}
            <div className="no-print" style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }}>
              <button onClick={() => window.print()} style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#E8C547,#8A6B28)', borderRadius: '10px', color: 'black', border: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600, cursor: 'pointer' }}>
                🖨️ PRINT / SAVE PDF
              </button>
              <Link href="/dashboard" style={{ padding: '14px 32px', background: 'transparent', borderRadius: '10px', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.6)', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                BACK TO DASHBOARD
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
