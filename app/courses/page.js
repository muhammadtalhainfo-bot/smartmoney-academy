'use client';
import { createClient } from '@/lib/supabase';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ModuleBanner from '@/app/components/ModuleBanner';

const MODULES = [
  {
    id: 1, module: "01", title: "Market Structure", level: "Beginner", tag: "ICT",
    lessons: 6, duration: "48 min", emoji: "📊", image: "/modules/module-01.webp",
    desc: "The foundation of everything — how price creates trends, breaks structure, and signals reversals.",
    topics: ["HH/HL & LH/LL", "Break of Structure (BOS)", "Change of Character (ChoCH/MSS)", "CISD — Change in State of Delivery", "STH / ITH / LTH Advanced Structure", "Weekly Market Rhythm"],
  },
  {
    id: 2, module: "02", title: "Liquidity Concepts", level: "Beginner", tag: "ICT",
    lessons: 5, duration: "45 min", emoji: "💧", image: "/modules/module-02.webp",
    desc: "Understand WHY price moves — stop hunts, liquidity pools, and how smart money uses retail orders.",
    topics: ["Buy-Side & Sell-Side Liquidity", "Equal Highs & Equal Lows (EQH/EQL)", "Internal vs External Range Liquidity", "Liquidity Sweep vs Liquidity Run", "HRLR vs LRLR"],
  },
  {
    id: 3, module: "03", title: "Fair Value Gaps (FVG)", level: "Beginner", tag: "ICT & SMC",
    lessons: 5, duration: "42 min", emoji: "🎯", image: "/modules/module-03.webp",
    desc: "The most-traded ICT concept — 3-candle price imbalances that act as magnetic entry zones.",
    topics: ["FVG Formation (BISI & SIBI)", "Consequent Encroachment (CE)", "1st Presented FVG", "Inversion FVG (IFVG)", "Balanced Price Range (BPR)", "RDRB"],
  },
  {
    id: 4, module: "04", title: "Order Blocks", level: "Intermediate", tag: "ICT",
    lessons: 6, duration: "52 min", emoji: "🧱", image: "/modules/module-04.webp",
    desc: "The institutional footprint — where banks actually place orders and why price always returns.",
    topics: ["Bullish & Bearish OBs", "Breaker Blocks", "Mitigation Blocks", "Rejection Blocks", "Reclaimed OBs (2024)", "Suspension Block (2025)"],
  },
  {
    id: 5, module: "05", title: "Killzones & Macro Times", level: "Intermediate", tag: "ICT",
    lessons: 4, duration: "38 min", emoji: "⏰", image: "/modules/module-05.webp",
    desc: "When you trade matters more than what you trade — the precise time windows the algorithm delivers.",
    topics: ["Asian / London / NY Killzones", "London Close", "8 Macro Time Windows", "Silver Bullet Hours", "CBDR & Asian Range"],
  },
  {
    id: 6, module: "06", title: "Power of Three (AMD)", level: "Intermediate", tag: "ICT",
    lessons: 5, duration: "44 min", emoji: "🔱", image: "/modules/module-06.webp",
    desc: "Accumulate. Manipulate. Distribute. The three-act script that runs every trading day.",
    topics: ["AMD Daily Framework", "Judas Swing", "Daily Candle Reading", "Weekly AMD Cycle", "Monthly PO3"],
  },
  {
    id: 7, module: "07", title: "Premium & Discount", level: "Intermediate", tag: "ICT",
    lessons: 4, duration: "36 min", emoji: "📐", image: "/modules/module-07.webp",
    desc: "Institutions only buy cheap and sell expensive — the Fibonacci framework that defines every entry.",
    topics: ["Premium vs Discount Zones", "Equilibrium (50%)", "OTE — Optimal Trade Entry (62-79%)", "PD Array Matrix", "How to Draw the Range"],
  },
  {
    id: 8, module: "08", title: "ICT Entry Models", level: "Intermediate", tag: "ICT",
    lessons: 7, duration: "60 min", emoji: "🎲", image: "/modules/module-08.webp",
    desc: "The official ICT trade setups — Silver Bullet, 2022 Model, Unicorn, and more.",
    topics: ["Silver Bullet Model", "2022 ICT Model", "Unicorn Model", "One Shot One Kill", "IOFED Model", "5-Minute Entry Drill"],
  },
  {
    id: 9, module: "09", title: "Market Maker Models", level: "Advanced", tag: "ICT",
    lessons: 5, duration: "55 min", emoji: "🏦", image: "/modules/module-09.webp",
    desc: "The full MMBM and MMSM — how banks build and unwind massive positions over days and weeks.",
    topics: ["Market Maker Buy Model (MMBM)", "Market Maker Sell Model (MMSM)", "False Flag", "Seek & Destroy Friday", "TGIF Pattern"],
  },
  {
    id: 10, module: "10", title: "SMT Divergence", level: "Advanced", tag: "ICT",
    lessons: 4, duration: "40 min", emoji: "🔀", image: "/modules/module-10.webp",
    desc: "Smart Money Technique — using correlated pairs to catch institutional divergence before moves.",
    topics: ["SMT Between Correlated Pairs", "Intermarket SMT", "SMT with Indices", "SMT Entry Confirmation", "Daily vs Intraday SMT"],
  },
  {
    id: 11, module: "11", title: "IPDA & CRT", level: "Advanced", tag: "ICT",
    lessons: 5, duration: "50 min", emoji: "🤖", image: "/modules/module-11.webp",
    desc: "The algorithm itself — IPDA data ranges, weekly draws, and Candle Range Theory.",
    topics: ["IPDA — Interbank Price Delivery Algorithm", "20/40/60 Day Lookback", "NWOG & NDOG Gaps", "Candle Range Theory (CRT)", "Weekly Draw on Liquidity"],
  },
  {
    id: 12, module: "12", title: "ICT 2024 Mentorship", level: "Advanced", tag: "2024",
    lessons: 8, duration: "75 min", emoji: "🆕", image: "/modules/module-12.webp",
    desc: "The newest ICT concepts — Venom Model, Propulsion Blocks, Quarterly Shifts, and 2024 updates.",
    topics: ["Venom Model 2025", "Propulsion Block", "Quarterly Shift", "SCOB — Silver Bullet Order Block", "QML — Quasi Market Level", "Weekly Profile Templates"],
  },
  {
    id: 13, module: "13", title: "SMC — Smart Money Concepts", level: "SMC", tag: "SMC",
    lessons: 6, duration: "50 min", emoji: "💼", image: "/modules/module-13.webp",
    desc: "The community-built framework derived from ICT — structure, OBs, FVGs, and CHoCH for beginners.",
    topics: ["SMC vs ICT Differences", "Supply & Demand Zones", "SMC Order Blocks", "SMC ChoCH & BOS", "Inducement", "SMC Trade Framework"],
  },
  {
    id: 14, module: "14", title: "Top-Down Analysis", level: "Intermediate", tag: "ICT & SMC",
    lessons: 5, duration: "45 min", emoji: "🔭", image: "/modules/module-14.webp",
    desc: "The complete multi-timeframe methodology — from Monthly bias to 1-minute entry precision.",
    topics: ["Monthly / Weekly Bias", "Daily Narrative Building", "4H Confirmation", "15M & 5M Entry Timeframe", "Full Trade Walkthrough"],
  },
];

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'ICT', 'SMC', '2024'];

const LEVEL_COLORS = {
  Beginner: { text: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  Intermediate: { text: '#D4A843', bg: 'rgba(212,168,67,0.08)', border: 'rgba(212,168,67,0.2)' },
  Advanced: { text: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
  SMC: { text: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
};

const TAG_COLORS = {
  ICT: { text: '#818CF8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
  SMC: { text: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
  '2024': { text: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
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
        border: '1px solid rgba(212,168,67,0.12)',
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
        borderBottom: '1px solid rgba(212,168,67,0.08)',
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
              background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', color: '#D4A843', letterSpacing: '0.05em',
            }}>IF</div>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(212,168,67,0.5)', textTransform: 'uppercase' }}>
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
        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(212,168,67,0.3), rgba(212,168,67,0.06) 60%, transparent)', borderRadius: '1px' }} />
      </div>

      {/* ── IMAGE PREVIEW — untouched, clean display ── */}
      {mod.image && (
        <div style={{ height: '148px', overflow: 'hidden', background: '#090909', borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0 }}>
          <ModuleBanner
            id={mod.module}
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
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px' }}>
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
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto' }}>
            {mod.lessons} lessons · {mod.duration}
          </span>
        </div>

        {/* Topics toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 13px', borderRadius: '9px',
            background: expanded ? 'rgba(212,168,67,0.05)' : 'transparent',
            border: '1px solid rgba(212,168,67,0.1)',
            color: 'rgba(212,168,67,0.65)',
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
        <div style={{ padding: '0 22px 14px', borderTop: '1px solid rgba(212,168,67,0.07)', marginTop: '2px' }}>
          <div style={{ paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mod.topics.map((topic, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4A843', opacity: 0.4, flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>{topic}</span>
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
            border: '1px solid rgba(212,168,67,0.2)',
            color: '#D4A843', background: 'transparent',
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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [completedIds, setCompletedIds] = useState([]);

  useEffect(() => {
    async function loadProgress() {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase
        .from('lesson_completions')
        .select('lesson_id')
        .eq('user_id', session.user.id);
      if (data) setCompletedIds(data.map(d => d.lesson_id));
    }
    loadProgress();
  }, []);

  const filtered = MODULES.filter(m => {
    if (activeFilter === 'All') return true;
    if (['Beginner', 'Intermediate', 'Advanced'].includes(activeFilter)) return m.level === activeFilter;
    if (activeFilter === 'SMC') return m.tag === 'SMC' || m.tag === 'ICT & SMC';
    if (activeFilter === '2024') return m.tag === '2024';
    return m.tag.includes('ICT');
  });

  const stats = {
    total: MODULES.length,
    beginner: MODULES.filter(m => m.level === 'Beginner').length,
    intermediate: MODULES.filter(m => m.level === 'Intermediate').length,
    advanced: MODULES.filter(m => m.level === 'Advanced').length,
    lessons: MODULES.reduce((a, m) => a + m.lessons, 0),
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --gold: #D4A843;
          --gold-dim: #8A6B28;
          --bg2: #0F0F0F;
          --border: rgba(212,168,67,0.12);
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
          border-color: rgba(212,168,67,0.5) !important;
        }

        .filter-btn {
          transition: all 0.2s ease;
          font-family: 'DM Mono', monospace;
        }
        .filter-btn.active {
          background: linear-gradient(135deg, #D4A843, #F0C96A);
          color: #080808;
          border-color: transparent;
        }

        .gold-gradient-text {
          background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .track-header {
          border-left: 2px solid rgba(212,168,67,0.3);
          padding-left: 16px;
        }
      `}</style>

      {/* ── NAV ── */}
      <Navbar active="/courses" />

            {/* ── HERO ── */}
      <section className="relative z-10 grid-bg px-6 py-20 text-center border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 800px 400px at 50% 100%, rgba(212,168,67,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 font-mono-c text-xs tracking-widest" style={{ borderColor: 'var(--border)', background: 'rgba(212,168,67,0.04)', color: '#D4A843' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
            {stats.total} MODULES · {stats.lessons}+ LESSONS
          </div>
          <h1 className="font-display leading-none mb-4" style={{ fontSize: 'clamp(48px, 9vw, 100px)' }}>
            <span className="text-white">THE COMPLETE </span>
            <span className="gold-gradient-text">ICT CURRICULUM</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto" style={{ fontWeight: 300 }}>
            Every concept. Every model. From basic market structure to the 2026 Mentorship Models. Built from ICT's YouTube channel — updated through 2026 Mentorship.
          </p>
        </div>
      </section>

      {/* ── TRACK STATS ── */}
      <section className="relative z-10 border-b" style={{ borderColor: 'var(--border)', background: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Beginner Modules', value: stats.beginner, color: '#34D399' },
            { label: 'Intermediate Modules', value: stats.intermediate, color: '#D4A843' },
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
        <div style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '16px', padding: '20px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: '#D4A843', marginBottom: '6px' }}>// NEW TO TRADING?</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: 'white', fontWeight: 600 }}>Start with Trading Foundations before ICT concepts.</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Learn what trading is, how markets work, and risk management basics first.</div>
          </div>
          <a href="/foundations" style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', borderRadius: '8px', padding: '10px 20px', fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', whiteSpace: 'nowrap' }}>Start With Foundations →</a>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <section className="sticky top-[72px] z-40 border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <span className="font-mono-c text-xs mr-2 flex-shrink-0" style={{ color: 'rgba(212,168,67,0.75)' }}>FILTER:</span>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-btn flex-shrink-0 px-4 py-2 rounded-lg text-xs border tracking-wider uppercase ${activeFilter === f ? 'active font-bold' : ''}`}
              style={activeFilter !== f ? { borderColor: 'rgba(212,168,67,0.15)', color: '#A0A0A0', background: 'transparent' } : {}}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono-c text-xs flex-shrink-0" style={{ color: 'rgba(212,168,67,0.75)' }}>
            {filtered.length} modules
          </span>
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
                <p className="text-gray-300 text-xs" style={{ fontWeight: 300 }}>Start here. No prior knowledge required.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.filter(m => m.level === 'Beginner').map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
              </div>
            </div>
          )}

          {/* Intermediate Track */}
          {filtered.some(m => m.level === 'Intermediate') && (activeFilter === 'All' || activeFilter === 'Intermediate') && (
            <div className="mb-12">
              <div className="track-header mb-6" style={{ borderLeftColor: 'rgba(212,168,67,0.5)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#D4A843' }}>Intermediate Track</div>
                <p className="text-gray-300 text-xs" style={{ fontWeight: 300 }}>Entry models, sessions, and PD arrays in depth.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.filter(m => m.level === 'Intermediate').map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
              </div>
            </div>
          )}

          {/* SMC Track */}
          {filtered.filter(m => m.level === 'SMC').length > 0 && (
            <div className="mb-12">
              <div className="mb-6 pb-3 border-b" style={{ borderColor: 'rgba(251,146,60,0.15)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#FB923C' }}>SMC Track</div>
                <div className="text-white font-semibold text-lg">Smart Money Concepts</div>
                <div className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Community-built framework derived from ICT — great companion to the main curriculum.</div>
              </div>
              {filtered.filter(m => m.level === 'SMC').map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
            </div>
          )}

          {/* Advanced Track */}
          {filtered.some(m => m.level === 'Advanced') && (activeFilter === 'All' || activeFilter === 'Advanced') && (
            <div className="mb-12">
              <div className="track-header mb-6" style={{ borderLeftColor: 'rgba(248,113,113,0.5)' }}>
                <div className="font-mono-c text-xs tracking-widest uppercase mb-1" style={{ color: '#F87171' }}>Advanced Track</div>
                <p className="text-gray-300 text-xs" style={{ fontWeight: 300 }}>Market Maker Models, IPDA, SMT, and 2024 concepts.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.filter(m => m.level === 'Advanced').map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
              </div>
            </div>
          )}

          {/* Filtered (non-level) results */}
          {!['All', 'Beginner', 'Intermediate', 'Advanced'].includes(activeFilter) && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((mod, i) => <ModuleCard key={mod.id} mod={mod} index={i} />)}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-mono-c text-xs" style={{ color: 'rgba(212,168,67,0.75)' }}>No modules match this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="relative z-10 px-6 py-16 border-t" style={{ borderColor: 'var(--border)', background: '#0A0A0A' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="font-mono-c text-xs tracking-widest uppercase mb-4" style={{ color: 'rgba(212,168,67,0.5)' }}>// Start From Zero</div>
          <h2 className="font-display text-5xl text-white mb-4">DON'T KNOW WHERE<br/>TO BEGIN?</h2>
          <p className="text-gray-300 text-sm mb-8" style={{ fontWeight: 300 }}>New to trading? Start with Trading Foundations first, then come back here.</p>
          <Link href="/lesson/1">
            <span className="inline-block px-8 py-4 rounded-xl font-mono-c text-sm tracking-widest uppercase font-bold transition-all hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808' }}>
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
