'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', { error_type: '404', page_path: window.location.pathname });
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#ededed', display: 'flex', flexDirection: 'column', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar />
      <main style={{ flex: 1, display: 'grid', placeItems: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '620px' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', color: '#E8C547', fontSize: '11px', letterSpacing: '0.18em', marginBottom: '18px' }}>404 // PAGE NOT FOUND</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(64px, 12vw, 120px)', lineHeight: 0.9, margin: '0 0 20px' }}>WRONG <span style={{ color: '#E8C547' }}>LEVEL.</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, fontSize: '15px', margin: '0 auto 32px', maxWidth: '480px' }}>That page does not exist or may have moved. Continue from the curriculum or return home.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" style={{ background: '#E8C547', color: '#080808', padding: '14px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: 700 }}>Back Home →</Link>
            <Link href="/courses" style={{ border: '1px solid rgba(232,197,71,0.3)', color: '#E8C547', padding: '14px 26px', borderRadius: '10px', textDecoration: 'none' }}>Browse 38 Modules</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
