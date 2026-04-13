'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

const MAIN_NAV = [
  ['/', 'Home'],
  ['/foundations', 'Trading Foundations'],
  ['/courses', 'Courses'],
  ['/glossary', 'Glossary'],
  ['/dashboard', 'Dashboard'],
];

const MORE_NAV = [
  ['/mentorship', '2022 ICT Mentorship'],
  ['/practice', 'Practice'],
  ['/journal', 'Journal'],
  ['/leaderboard', 'Leaderboard'],
  ['/certificate', 'Certificate'],
  ['/resources', 'Resources'],
  ['/blog', 'Blog'],
  ['https://discord.gg/bh2YK6vF', 'Discord 💬'],
  ['/pricing', 'Pricing'],
  ['/about', 'About'],
];

const ALL_NAV = [...MAIN_NAV, ...MORE_NAV];

export default function Navbar({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    }
    checkSession();
  }, []);

  return (
    <>
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid rgba(212,168,67,0.08)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>

        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/ictflow-symbol.svg" alt="ICT Flow" style={{ width: '34px', height: '34px', borderRadius: '8px' }} />
          <div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '17px', letterSpacing: '0.15em', color: 'white', lineHeight: 1.1 }}>ICT FLOW</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: '#B8924A', letterSpacing: '0.2em' }}>TRADING EDUCATION</div>
          </div>
        </Link>

        <div className="hidden-mobile" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {MAIN_NAV.map(([href, label], i) => (
            <React.Fragment key={href}>
              {i > 0 && <span style={{ color: 'rgba(212,168,67,0.25)', fontSize: '12px', userSelect: 'none' }}>|</span>}
              <Link href={href} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.6)', borderBottom: active === href ? '1px solid #D4A843' : '1px solid transparent', paddingBottom: '2px', transition: 'color 0.2s', whiteSpace: 'nowrap' }}>{label}</Link>
            </React.Fragment>
          ))}
          <span style={{ color: 'rgba(212,168,67,0.25)', fontSize: '12px', userSelect: 'none' }}>|</span>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setMoreOpen(!moreOpen)} onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', background: 'none', border: 'none', color: moreOpen ? '#D4A843' : 'rgba(255,255,255,0.6)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
              MORE <span style={{ fontSize: '8px', display: 'inline-block', transform: moreOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </button>
            {moreOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, background: '#111', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '12px', padding: '8px', minWidth: '200px', zIndex: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                {MORE_NAV.map(([href, label]) => (
                  <Link key={href} href={href} onClick={() => setMoreOpen(false)}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ display: 'block', padding: '9px 14px', fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.6)', borderRadius: '8px', background: active === href ? 'rgba(212,168,67,0.06)' : 'transparent', whiteSpace: 'nowrap' }}
                    onMouseOver={e => { e.currentTarget.style.color = '#D4A843'; e.currentTarget.style.background = 'rgba(212,168,67,0.04)'; }}
                    onMouseOut={e => { e.currentTarget.style.color = active === href ? '#D4A843' : 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = active === href ? 'rgba(212,168,67,0.06)' : 'transparent'; }}>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link href={isLoggedIn ? '/courses' : '/auth'} className="hidden-mobile" style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', borderRadius: '8px', padding: '8px 18px', fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', flexShrink: 0 }}>
          {isLoggedIn ? 'My Courses' : 'Start Free'}
        </Link>

        <button onClick={() => setMenuOpen(!menuOpen)} className="show-mobile" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#D4A843', borderRadius: '2px', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </nav>

      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', overflowY: 'auto', padding: '80px 0 40px' }}>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(212,168,67,0.4)', textTransform: 'uppercase' }}>// LEARN</div>
          {MAIN_NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'DM Mono', monospace", fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>{label}</Link>
          ))}
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(212,168,67,0.4)', textTransform: 'uppercase', marginTop: '8px' }}>// TOOLS & MORE</div>
          {MORE_NAV.map(([href, label]) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ fontFamily: "'DM Mono', monospace", fontSize: '15px', letterSpacing: '0.15em', textTransform: 'uppercase', color: active === href ? '#D4A843' : 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{label}</Link>
          ))}
          <Link href={isLoggedIn ? '/courses' : '/auth'} onClick={() => setMenuOpen(false)} style={{ marginTop: '16px', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', borderRadius: '8px', padding: '14px 32px', fontFamily: "'DM Mono', monospace", fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none' }}>
            {isLoggedIn ? 'My Courses' : 'Start Free'}
          </Link>
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
