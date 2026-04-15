'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase';

export default function EmailCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [msg, setMsg] = useState('');

  async function handleSubmit() {
    if (!email || !email.includes('@')) {
      setMsg('Enter a valid email.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const supabase = createClient();
      const { error } = await supabase.from('email_signups').insert({ email: email.trim().toLowerCase() });
      if (error) {
        if (error.code === '23505') {
          setMsg("You're already on the list!");
          setStatus('success');
        } else {
          setMsg('Something went wrong. Try again.');
          setStatus('error');
        }
      } else {
        setMsg("You're in! We'll notify you of updates.");
        setStatus('success');
        setEmail('');
      }
    } catch {
      setMsg('Something went wrong. Try again.');
      setStatus('error');
    }
  }

  return (
    <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(212,168,67,0.25)', borderBottom: '1px solid rgba(212,168,67,0.25)', background: 'rgba(212,168,67,0.02)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 300px at 50% 50%, rgba(212,168,67,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.8)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '24px' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D4A843', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          FREE UPDATES · NO SPAM
        </div>

        <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px, 7vw, 64px)', color: 'white', lineHeight: 1, marginBottom: '16px', letterSpacing: '0.02em' }}>
          STAY AHEAD OF<br />
          <span style={{ background: 'linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>THE MARKET</span>
        </h2>

        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px', fontWeight: 300 }}>
          Get notified when new ICT modules drop, weekly market breakdowns, and exclusive trading tips — all free.
        </p>

        {status === 'success' ? (
          <div style={{ padding: '20px 28px', background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '12px', fontFamily: 'DM Mono, monospace', fontSize: '13px', color: '#34D399', letterSpacing: '0.05em' }}>
            ✓ {msg}
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '10px', maxWidth: '440px', margin: '0 auto 12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); setMsg(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="your@email.com"
                style={{ flex: 1, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${status === 'error' ? 'rgba(248,113,113,0.4)' : 'rgba(212,168,67,0.25)'}`, borderRadius: '10px', color: 'white', fontSize: '14px', fontFamily: 'DM Mono, monospace', outline: 'none', letterSpacing: '0.05em' }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{ padding: '14px 24px', background: status === 'loading' ? 'rgba(212,168,67,0.8)' : 'linear-gradient(135deg,#D4A843,#8A6B28)', border: 'none', borderRadius: '10px', color: 'black', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', cursor: status === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
              >
                {status === 'loading' ? '...' : 'NOTIFY ME'}
              </button>
            </div>
            {msg && status === 'error' && (
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(248,113,113,0.8)', letterSpacing: '0.05em' }}>{msg}</p>
            )}
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.08em', marginTop: '12px' }}>
              JOIN 500+ TRADERS · UNSUBSCRIBE ANYTIME
            </p>
          </>
        )}
      </div>
    </section>
  );
}
