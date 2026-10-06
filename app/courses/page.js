'use client';
import { MODULES } from '@/lib/curriculum';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ModuleBanner from '@/app/components/ModuleBanner';


const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'ICT', 'ICT & SMC', 'SMC', 'NEWER', 'New'];

const LEVEL_COLORS = {
  Beginner: { text: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  Intermediate: { text: '#E8C547', bg: 'rgba(212,168,67,0.22)', border: '#E8C547' },
  Advanced: { text: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
  SMC: { text: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
};

const TAG_COLORS = {
  ICT: { text: '#818CF8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
  SMC: { text: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
  NEWER: { text: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  'ICT & SMC': { text: '#C084FC', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.2)' },
};

function ModuleCard({ mod, index }) {
  const [expanded, setExpanded] = useState(false);
  const lvl = LEVEL_COLORS[mod.level];
  const tag = TAG_COLORS[mod.tag] || TAG_COLORS['ICT'];

  return (
    <div
      className="module-card"
      style={{
        borderRadius: '18px',
        border: '1px solid rgba(212,168,67,0.22)',
        background: '#0C0C0C',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animationDelay: `${index * 0.04}s`,
      }}
    >
      {/* ── HEADER STRIP — no image, pure premium layout ── */}
      <div style={{
        position: 'relative',
        padding: '20px 22px 18px',
        background: 'linear-gradient(135deg, #111008 0%, #0E0E0E 60%, #0C0C0C 100%)',
        borderBottom: '1px solid rgba(212,168,67,0.22)',
        overflow: 'hidden',
      }}>
        {/* Subtle gold radial glow top-right */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '160px', height: '100px', background: 'radial-gradient(ellipse at 100% 0%, rgba(212,168,67,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Ghost module number watermark */}
        <div style={{
          position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'Bebas Neue, sans-serif', fontSize: '72px', lineHeight: 1,
          color: 'rgba(212,168,67,0.05)', userSelect: 'none', letterSpacing: '-3px', pointerEvents: 'none',
        }}>{mod.module}</div>

        {/* Top row: module tag + level badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* IF monogram */}
            <div style={{
              width: '26px', height: '26px', borderRadius: '7px',
              background: 'rgba(232,197,71,0.95)', border: '1px solid rgba(232,197,71,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', color: '#080808', letterSpacing: '0.05em',
            }}>IF</div>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(232,197,71,0.95)', textTransform: 'uppercase' }}>
              Module {mod.module}
            </span>
          </div>
          <span style={{
            padding: '3px 10px', borderRadius: '100px',
            border: `1px solid ${lvl.border}`,
            fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.1em',
            color: lvl.text, background: lvl.bg,
          }}>{mod.level}</span>
        </div>

        {/* Module title */}
        <h3 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '24px', letterSpacing: '0.04em',
          color: 'white', lineHeight: 1.05,
          marginBottom: '10px', position: 'relative',
        }}>{mod.title}</h3>

        {/* Thin gold divider line */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, #E8C547, rgba(212,168,67,0.06) 60%, transparent)', borderRadius: '1px' }} />
      </div>

      {/* ── IMAGE PREVIEW — untouched, clean display ── */}
      {mod.image && (
        <div style={{ height: '148px', overflow: 'hidden', background: '#090909', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
          <ModuleBanner
            id={mod.id >= 1 && mod.id <= 14 ? String(mod.id).padStart(2, '0') : `module-${mod.id}`}
            title={mod.title}
            label={mod.level}
            levelColor={lvl}
            width={300}
            height={148}
          />
        </div>
      )}

      {/* ── CONTENT BODY ── */}
      <div style={{ padding: '18px 22px 0', flex: 1 }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px' }}>
          {mod.desc}
        </p>

        {/* Tag + meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span style={{
            padding: '3px 9px', borderRadius: '6px',
            border: `1px solid ${tag.border}`,
            fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.1em',
            color: tag.text, background: tag.bg,
          }}>{mod.tag}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.85)', marginLeft: 'auto' }}>
            {mod.lessons} lessons · {mod.duration}
          </span>
        </div>

        {/* Topics toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={`topics-${mod.id}`}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 13px', borderRadius: '9px',
            background: expanded ? 'rgba(212,168,67,0.05)' : 'transparent',
            border: '1px solid rgba(232,197,71,0.95)',
            color: 'rgba(212,168,67,0.85)',
            fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.15em',
            cursor: 'pointer', textTransform: 'uppercase',
          }}
        >
          <span>{expanded ? 'Hide Topics' : 'View Topics'}</span>
          <span style={{ fontSize: '14px', lineHeight: 1 }}>{expanded ? '−' : '+'}</span>
        </button>
      </div>

      {/* Topics list */}
      {expanded && (
        <div id={`topics-${mod.id}`} style={{ padding: '0 22px 14px', borderTop: '1px solid rgba(212,168,67,0.07)', marginTop: '2px' }}>
          <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mod.topics.map((topic, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#E8C547', opacity: 0.4, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: 300 }}>{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start button */}
      <div style={{ padding: '14px 22px 20px' }}>
        <Link href={`/lesson/${mod.id}`}>
          <div className="start-btn" style={{
            width: '100%', padding: '11px', borderRadius: '10px',
            border: '1px solid #E8C547',
            color: '#E8C547', background: 'transparent',
            fontFamily: 'DM Mono, monospace', fontSize: '10px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
            textAlign: 'center', cursor: 'pointer',
          }}>
            Start Module →
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = useMemo(() => ({
    total: MODULES.length,
    beginner: MODULES.filter(m => m.level === 'Beginner').length,
    intermediate: MODULES.filter(m => m.level === 'Intermediate').length,
    advanced: MODULES.filter(m => m.level === 'Advanced').length,
    lessons: MODULES.reduce((a, m) => a + m.lessons, 0),
  }), []);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return MODULES.filter(m => {
      const matchesSearch = !q || [
        m.title,
        m.desc,
        m.level,
        m.tag,
        m.module,
        ...(m.topics || []),
      ].some(value => String(value).toLowerCase().includes(q));

      if (!matchesSearch) return false;
      if (activeFilter === 'All') return true;
      if (['Beginner', 'Intermediate', 'Advanced'].includes(activeFilter)) return m.level === activeFilter;
      if (activeFilter === 'SMC') return m.tag === 'SMC' || m.tag === 'ICT & SMC';
      if (activeFilter === 'ICT & SMC') return m.tag === 'ICT & SMC';
      if (activeFilter === 'NEWER') return m.tag === 'NEWER';
      if (activeFilter === 'New') return m.isNew === true;
      return m.tag.includes('ICT');
    });
  }, [activeFilter, searchTerm]);

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

        :root {
          --gold: #E8C547;
          --gold-dim: #8A6B28;
          --bg2: #0F0F0F;
          --border: rgba(212,168,67,0.22);
        }

        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .font-mono-c { font-family: 'DM Mono', monospace; }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .grid-bg {
          background-image:
            linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .module-card {
          animation: fadeUp 0.5s ease forwards;
          opacity: 0;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .module-card:hover {
          border-color: rgba(212,168,67,0.28) !important;
          transform: translateY(-4px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(212,168,67,0.04);
        }
        .module-card:hover .start-btn {
          background: rgba(212,168,67,0.07) !important;
          border-color: rgba(232,197,71,0.95) !important;
        }

        .filter-btn {
          transition: all 0.2s ease;
          font-family: 'DM Mono', monospace;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #E8C547, #F0C96A);
          color: #080808;
          border-color: transparent;
        }

        .gold-gradient-text {
          background: linear-gradient(135deg, #8A6B28 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #8A6B28 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .track-header {
          border-left: 2px solid #E8C547;
          padding-left: 16px;
        }
      `}</style>

      {/* ── NAV ── */}
      <Navbar active="/courses" />

            {/* ── HERO ── */}
      <section className="relative z-10 grid-bg px-6 py-20 text-center border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 800px 400px at 50% 100%, rgba(212,168,67,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 font-mono-c text-xs tracking-widest" style={{ borderColor: 'var(--border)', background: 'rgba(212,168,67,0.04)', color: '#E8C547' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C547] animate-pulse" />
            {stats.total} MODULES · {stats.lessons}+ LESSONS
          </div>
          <h1 className="font-display leading-none mb-4" style={{ fontSize: 'clamp(48px, 9vw, 100px)' }}>
            <span className="text-white">THE COMPLETE </span>
            <span className="gold-gradient-text">ICT CURRICULUM</span>
          </h1>
          <p className="text-gray-200 text-lg max-w-xl mx-auto" style={{ fontWeight: 300 }}>
            Every concept. Every model. From basic market structure to the newer Mentorship models. Built from ICT's YouTube channel — recent Mentorship updates.
          </p>
        </div>
      </section>

      {/* ── TRACK STATS ── */}
      <section className="relative z-10 border-b" style={{ borderColor: 'var(--border)', background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Beginner Modules', value: stats.beginner, color: '#34D399' },
            { label: 'Intermediate Modules', value: stats.intermediate, color: '#E8C547' },
            { label: 'Advanced Modules', value: stats.advanced, color: '#F87171' },
            { label: 'Total Lessons', value: `${stats.lessons}+`, color: '#818CF8' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-4xl mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="font-mono-c text-xs tracking-widest uppercase" style={{ color: '#C0C0C0' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Foundations Banner */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid #E8C547', borderRadius: '16px', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#E8C547', marginBottom: '6px' }}>// NEW TO TRADING?</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'white', fontWeight: 600 }}>Start with Trading Foundations before ICT concepts.</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>Learn what trading is, how markets work, and risk management basics first.</div>
          </div>
          <a href="/foundations" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808', borderRadius: '8px', padding: '10px 20px', fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start With Foundations →</a>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <section className="sticky top-[72px] z-40 border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span className="font-mono-c text-xs flex-shrink-0" style={{ color: 'rgba(232,197,71,0.95)', letterSpacing: '0.14em' }}>FIND A MODULE</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by concept, lesson topic, or module..."
              aria-label="Search the ICT curriculum"
              style={{
                flex: '1 1 320px', minWidth: '220px', padding: '10px 13px', borderRadius: '10px',
                border: '1px solid rgba(232,197,71,0.16)', background: '#0B0B0B', color: 'white',
                outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '12px'
              }}
            />
            <span className="font-mono-c text-xs flex-shrink-0" style={{ color: '#C5CCD6' }}>
              {filtered.length} shown
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="font-mono-c text-xs mr-2 flex-shrink-0" style={{ color: 'rgba(232,197,71,0.95)' }}>FILTER:</span>
          {FILTERS.map(f => (
            <button
              type="button"
              key={f}
              aria-pressed={activeFilter === f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn flex-shrink-0 px-4 py-2 rounded-lg text-xs border tracking-wider uppercase ${activeFilter === f ? 'active font-bold' : ''}`}
              style={activeFilter !== f ? { borderColor: 'rgba(232,197,71,0.95)', color: '#A0A0A0', background: 'transparent' } : {}}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono-c text-xs flex-shrink-0" style={{ color: 'rgba(232,197,71,0.95)' }}>
            {MODULES.length} modules · {stats.lessons}+ lessons
          </span>
          </div>
        </div>
      </section>

      {/* ── MODULE GRID ── */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Beginner Track */}
          {filtered.some(m => m.level === 'Beginner') && (activeFilter === 'All' || activeFilter === 'Beginner') && (
            <div className="mb-12">
              <div className="track-header mb-6">
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#34D399' }}>Beginner Track</div>
                <p className="text-gray-200 text-xs" style={{ fontWeight: 300 }}>Start here. No prior knowledge required.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.filter(m => m.level === 'Beginner').sort((a, b) => parseInt(a.module) - parseInt(b.module)).map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
              </div>
            </div>
          )}

          {/* Intermediate Track */}
          {filtered.some(m => m.level === 'Intermediate') && (activeFilter === 'All' || activeFilter === 'Intermediate') && (
            <div className="mb-12">
              <div className="track-header mb-6" style={{ borderLeftColor: 'rgba(232,197,71,0.95)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#E8C547' }}>Intermediate Track</div>
                <p className="text-gray-200 text-xs" style={{ fontWeight: 300 }}>Entry models, sessions, and PD arrays in depth.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.filter(m => m.level === 'Intermediate').sort((a, b) => parseInt(a.module) - parseInt(b.module)).map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
              </div>
            </div>
          )}

          {/* SMC Track */}
          {filtered.filter(m => m.level === 'SMC').length > 0 && (
            <div className="mb-12">
              <div className="mb-6 pb-3 border-b" style={{ borderColor: 'rgba(251,146,60,0.15)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#FB923C' }}>SMC Track</div>
                <div className="text-white font-semibold text-lg">Smart Money Concepts</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Community-built framework derived from ICT — great companion to the main curriculum.</div>
              </div>
              {filtered.filter(m => m.level === 'SMC').sort((a, b) => parseInt(a.module) - parseInt(b.module)).map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
            </div>
          )}

          {/* Advanced Track */}
          {filtered.some(m => m.level === 'Advanced') && (activeFilter === 'All' || activeFilter === 'Advanced') && (
            <div className="mb-12">
              <div className="track-header mb-6" style={{ borderLeftColor: 'rgba(248,113,113,0.5)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#F87171' }}>Advanced Track</div>
                <p className="text-gray-200 text-xs" style={{ fontWeight: 300 }}>Market Maker Models, IPDA, SMT, and newer mentorship-era concepts.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.filter(m => m.level === 'Advanced').sort((a, b) => parseInt(a.module) - parseInt(b.module)).map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
              </div>
            </div>
          )}

          {/* Filtered (non-level) results */}
          {!['All', 'Beginner', 'Intermediate', 'Advanced'].includes(activeFilter) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.sort((a, b) => parseInt(a.module) - parseInt(b.module)).map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-mono-c text-xs" style={{ color: 'rgba(232,197,71,0.95)' }}>No modules match this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── SEO LEARNING HUB ── */}
      <section className="relative z-10 px-6 py-16 border-t" style={{ borderColor: 'var(--border)', background: '#090909' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="font-mono-c text-xs tracking-widest uppercase mb-2" style={{ color: '#E8C547' }}>Free ICT Guides</div>
            <h2 className="font-display text-5xl text-white mb-3">MASTER THE CORE CONCEPTS</h2>
            <p className="text-gray-200 text-sm max-w-2xl" style={{ fontWeight: 300, lineHeight: 1.7 }}>
              Use these focused guides alongside the curriculum to understand the terminology, build testable rules, and connect concepts across modules.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['What Is ICT Trading?', '/learn/what-is-ict-trading'],
              ['ICT Market Structure', '/learn/ict-market-structure'],
              ['ICT Liquidity', '/learn/ict-liquidity'],
              ['Fair Value Gap Trading', '/learn/fair-value-gap-trading'],
              ['ICT Order Blocks', '/learn/ict-order-block'],
              ['ICT Silver Bullet', '/learn/ict-silver-bullet'],
              ['How to Backtest ICT', '/learn/how-to-backtest-ict'],
              ['ICT Risk Management', '/learn/ict-risk-management'],
            ].map(([title, href]) => (
              <Link key={href} href={href} className="rounded-xl p-4 transition-all hover:border-[#E8C547]" style={{ border: '1px solid rgba(232,197,71,0.16)', background: '#0D0D0D', textDecoration: 'none' }}>
                <span className="text-white text-sm font-medium">{title}</span>
                <span className="block mt-2 text-xs" style={{ color: '#E8C547' }}>Read guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 px-6 py-16 border-t" style={{ borderColor: 'var(--border)', background: '#0A0A0A' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="font-mono-c text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(232,197,71,0.95)' }}>// Start From Zero</div>
          <h2 className="font-display text-5xl text-white mb-4">DON'T KNOW WHERE<br/>TO BEGIN?</h2>
          <p className="text-gray-200 text-sm mb-8" style={{ fontWeight: 300 }}>New to trading? Start with Trading Foundations first, then come back here.</p>
          <Link href="/lesson/1">
            <span className="inline-block px-8 py-4 rounded-xl font-mono-c text-sm tracking-widest uppercase font-bold transition-all hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808' }}>
              Start Module 1 →
            </span>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
