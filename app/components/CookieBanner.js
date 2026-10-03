'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted');
    const declined = localStorage.getItem('cookies_declined');
    if (!accepted && !declined) setShow(true);
  }, []);

  const setConsent = (accepted) => {
    if (accepted) localStorage.setItem('cookies_accepted', 'true');
    else localStorage.setItem('cookies_declined', 'true');
    setShow(false);
    window.dispatchEvent(new Event('ictflow-cookie-consent'));
  };

  const accept = () => setConsent(true);
  const decline = () => setConsent(false);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
      position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 1000, width: '90%', maxWidth: '600px',
      background: '#0F0F0F', border: '1px solid #E8C547',
      borderRadius: '16px', padding: '16px 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '16px', flexWrap: 'wrap',
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
    }}>
      <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.8)', margin: 0, flex: 1 }}>
        We use non-essential cookies and third-party services for analytics, advertising, and notifications. Choose Accept or Decline.{' '}
        <Link href="/cookies" style={{ color: '#E8C547', textDecoration: 'underline' }}>Cookie Policy</Link>.
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button type="button" onClick={accept} style={{
          background: 'linear-gradient(135deg, #E8C547, #F0C96A)',
          color: '#080808', border: 'none', borderRadius: '8px',
          padding: '8px 20px', fontFamily: 'DM Mono, monospace',
          fontSize: '11px', fontWeight: 700, cursor: 'pointer',
          letterSpacing: '0.08em', textTransform: 'uppercase'
        }}>Accept</button>
        <button type="button" onClick={decline} style={{
          background: 'transparent', color: 'rgba(255,255,255,0.7)',
          border: '1px solid rgba(255,255,255,0.6)', borderRadius: '8px',
          padding: '8px 16px', fontFamily: 'DM Mono, monospace',
          fontSize: '11px', cursor: 'pointer'
        }}>Decline</button>
      </div>
    </div>
  );
}
