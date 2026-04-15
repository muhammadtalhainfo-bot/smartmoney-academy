'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted');
    if (!accepted) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('cookies_accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, width: '90%', maxWidth: '600px',
      background: '#0F0F0F', border: '1px solid rgba(212,168,67,0.2)',
      borderRadius: '16px', padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '16px', flexWrap: 'wrap',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
    }}>
      <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.8)', margin: 0, flex: 1 }}>
        We use cookies to improve your experience. By continuing, you agree to our{' '}
        <Link href="/cookies" style={{ color: '#D4A843', textDecoration: 'underline' }}>Cookie Policy</Link>.
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={accept} style={{
          background: 'linear-gradient(135deg, #D4A843, #F0C96A)',
          color: '#080808', border: 'none', borderRadius: '8px',
          padding: '8px 20px', fontFamily: 'DM Mono, monospace',
          fontSize: '11px', fontWeight: 700, cursor: 'pointer',
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>Accept</button>
        <button onClick={() => setShow(false)} style={{
          background: 'transparent', color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
          padding: '8px 16px', fontFamily: 'DM Mono, monospace',
          fontSize: '11px', cursor: 'pointer'
        }}>Decline</button>
      </div>
    </div>
  );
}
