'use client';
import { useState } from 'react';
import Link from 'next/link';

const NAV = [
  ['/', 'Home'],
  ['/courses', 'Courses'],
  ['/signals', 'Signals'],
  ['/glossary', 'Glossary'],
  ['/practice', 'Practice'],
  ['/journal', 'Journal'],
  ['/dashboard', 'Dashboard'],
  ['/resources', 'Resources'],
];

export default function Navbar({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(212,168,67,0.08)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", color: 'black', fontSize: '18px', flexShrink: 0 }}>S</div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '17px', letterSpacing: '0.15em', color: 'white', lineHeight: 1.1 }}>SMARTMONEY</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8A6B28', letterSpacing: '0.2em' }}>ACADEMY</div>
          </div>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <div className="hidden-mobile" style={{ display: 'flex', gap: '24px' }}>
            {NAV.map(([href, label]) => (
              <Link key={href} href={href} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.65)', transition: 'color 0.2s', borderBottom: active === href ? '1px solid #D4A843' : '1px solid transparent', paddingBottom: '2px' }}>{label}</Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '36px' }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'DM Mono', monospace", fontSize: '22px', letterSpacing: '0.2em', textTransform: 'uppercase', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
