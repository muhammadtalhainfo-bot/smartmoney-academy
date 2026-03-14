'use client';
import { useState } from 'react';
import Link from 'next/link';

const MAIN_NAV = [
  ['/', 'Home'],
  ['/courses', 'Courses'],
  ['/signals', 'Signals'],
  ['/glossary', 'Glossary'],
  ['/dashboard', 'Dashboard'],
];

const MORE_NAV = [
  ['/practice', 'Practice'],
  ['/journal', 'Journal'],
  ['/leaderboard', 'Leaderboard'],
  ['/certificate', 'Certificate'],
  ['/about', 'About'],
  ['/pricing', 'Pricing'],
  ['/resources', 'Resources'],
];

const ALL_NAV = [...MAIN_NAV, ...MORE_NAV];

export default function Navbar({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(212,168,67,0.08)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", color: 'black', fontSize: '18px' }}>S</div>
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '17px', letterSpacing: '0.15em', color: 'white', lineHeight: 1.1 }}>SMARTMONEY</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#8A6B28', letterSpacing: '0.2em' }}>ACADEMY</div>
          </div>
        </Link>

        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {MAIN_NAV.map(([href, label]) => (
            <Link key={href} href={href} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.6)', borderBottom: active === href ? '1px solid #D4A843' : '1px solid transparent', paddingBottom: '2px', transition: 'color 0.2s' }}>{label}</Link>
          ))}

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', color: moreOpen ? '#D4A843' : 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
              MORE <span style={{ fontSize: '8px', transition: 'transform 0.2s', display: 'inline-block', transform: moreOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
            </button>
            {moreOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, background: '#111', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '12px', padding: '8px', minWidth: '160px', zIndex: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                {MORE_NAV.map(([href, label]) => (
                  <Link key={href} href={href} onClick={() => setMoreOpen(false)} style={{ display: 'block', padding: '9px 14px', fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.6)', borderRadius: '8px', background: active === href ? 'rgba(212,168,67,0.06)' : 'transparent' }}
                    onMouseOver={e => { e.currentTarget.style.color = '#D4A843'; e.currentTarget.style.background = 'rgba(212,168,67,0.04)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = active === href ? '#D4A843' : 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = active === href ? 'rgba(212,168,67,0.06)' : 'transparent'; }}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '28px', overflowY: 'auto', padding: '40px 0' }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
          {ALL_NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'DM Mono', monospace", fontSize: '20px', letterSpacing: '0.2em', textTransform: 'uppercase', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>{label}</Link>
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
