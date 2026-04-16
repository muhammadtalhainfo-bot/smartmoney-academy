'use client';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Track 404 errors in GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'error', {
        error_type: '404',
        page_path: window.location.pathname,
      });
    }
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#080808', 
      color: '#ededed',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '72px', marginBottom: '16px' }}>
        404
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>
        This page could not be found.
      </p>
      <a href="/" style={{
        background: 'linear-gradient(135deg, #D4A843, #F0C96A)',
        color: '#080808',
        padding: '12px 24px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontFamily: 'DM Mono, monospace',
        fontWeight: 700,
      }}>
        Return Home
      </a>
    </div>
  );
}
