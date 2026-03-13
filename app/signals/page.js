'use client';
import AuthGuard from '@/app/components/AuthGuard';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

const SIGNALS = [
  {
    id: 1,
    pair: 'EURUSD',
    type: 'BUY',
    status: 'ACTIVE',
    timeframe: '15M',
    session: 'NY AM',
    entry: '1.08320',
    sl: '1.08180',
    tp1: '1.08520',
    tp2: '1.08780',
    rr: '3.2',
    confidence: 88,
    time: '10:02 AM EST',
    model: 'Silver Bullet',
    concepts: ['SSL Sweep', 'Bullish FVG', 'OTE Zone', 'NY AM Macro'],
    analysis: 'Price swept the Asian session low (SSL) at 1.08180 during London open, creating a classic Judas Swing. After the sweep, a bullish displacement formed on the 5M leaving an FVG between 1.08280-1.08360. NY AM macro window opens at 9:50 EST — entering at FVG CE (1.08320) with stop below the liquidity sweep low. Target is BSL resting above previous day high at 1.08780.',
    icon: '🇪🇺',
  },
  {
    id: 2,
    pair: 'XAUUSD',
    type: 'BUY',
    status: 'ACTIVE',
    timeframe: '1H',
    session: 'London',
    entry: '2,318.50',
    sl: '2,304.00',
    tp1: '2,338.00',
    tp2: '2,358.00',
    rr: '2.7',
    confidence: 82,
    time: '3:15 AM EST',
    model: '2022 Model',
    concepts: ['Daily Bullish Bias', 'OB Mitigation', 'Breaker Block', 'London Killzone'],
    analysis: 'Daily structure is bullish — last BOS to the upside at 2,290. A 1H Order Block sits at 2,304-2,318 from the rally that created the BOS. Price has returned to mitigate this OB during London open. The OB aligns with a 4H Breaker Block. Entering at OB mean threshold (2,318.50), stop below the OB low. DOL is the PWH at 2,358.',
    icon: '🥇',
  },
  {
    id: 3,
    pair: 'NAS100',
    type: 'SELL',
    status: 'WATCHING',
    timeframe: '4H',
    session: 'NY AM',
    entry: '18,245.00',
    sl: '18,390.00',
    tp1: '17,980.00',
    tp2: '17,720.00',
    rr: '3.5',
    confidence: 74,
    time: 'Pending setup',
    model: 'MMSM',
    concepts: ['BSL Sweep', 'Bearish ChoCH', 'Bearish FVG', 'Premium Zone'],
    analysis: 'NAS100 swept the previous week high (BSL) at 18,380 during Monday NY session. A bearish ChoCH formed on the 1H after the sweep. Price is currently in a premium zone (above 50% of the weekly range). Watching for price to retrace into the 4H bearish FVG at 18,220-18,245 before the SELL trigger. Will not enter until price fills the FVG — patience required.',
    icon: '📊',
  },
  {
    id: 4,
    pair: 'GBPUSD',
    type: 'BUY',
    status: 'CLOSED ✅',
    timeframe: '15M',
    session: 'London',
    entry: '1.26480',
    sl: '1.26320',
    tp1: '1.26720',
    tp2: '1.26980',
    rr: '3.1',
    confidence: 91,
    result: '+2.4R',
    time: 'Closed 4:22 AM EST',
    model: 'Unicorn Model',
    concepts: ['OB + FVG Confluence', 'London Macro', 'Equal Lows Sweep', 'Displacement'],
    analysis: 'Textbook Unicorn Model. Equal lows at 1.26320 were swept during early London (2:33 AM macro). Post-sweep displacement created a bullish FVG at 1.26440-1.26520 that overlapped with a 1H bullish OB. OB + FVG confluence = Unicorn. Entered at 1.26480 (CE of FVG). TP1 hit at 1.26720. Trade closed at full TP2 at London close.',
    icon: '🇬🇧',
  },
];

const STATUS_STYLE = {
  'ACTIVE': { color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.25)', dot: true },
  'WATCHING': { color: '#F0C96A', bg: 'rgba(240,201,106,0.08)', border: 'rgba(240,201,106,0.25)', dot: true },
  'CLOSED ✅': { color: '#6B7280', bg: 'rgba(107,114,128,0.08)', border: 'rgba(107,114,128,0.2)', dot: false },
};

const TYPE_STYLE = {
  'BUY': { color: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  'SELL': { color: '#F87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
};

const SESSION_STYLE = {
  'NY AM': { color: '#D4A843', bg: 'rgba(212,168,67,0.08)' },
  'London': { color: '#818CF8', bg: 'rgba(129,140,248,0.08)' },
  'Asian': { color: '#34D399', bg: 'rgba(52,211,153,0.08)' },
};

function SignalCard({ signal }) {
  const [open, setOpen] = useState(false);
  const ss = STATUS_STYLE[signal.status];
  const ts = TYPE_STYLE[signal.type];
  const ses = SESSION_STYLE[signal.session] || SESSION_STYLE['NY AM'];
  const isClosed = signal.status.startsWith('CLOSED');

  return (
    <div className="signal-card rounded-2xl border overflow-hidden" style={{ borderColor: isClosed ? 'rgba(255,255,255,0.08)' : 'rgba(212,168,67,0.12)', background: '#0F0F0F' }}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(212,168,67,0.06)', background: isClosed ? 'rgba(255,255,255,0.01)' : 'rgba(212,168,67,0.02)' }}>
        <div className="flex items-center gap-2">
          {ss.dot && <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: ss.color }} />}
          <span className="font-mono-c text-[10px] tracking-widest" style={{ color: ss.color }}>{signal.status}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono-c text-[10px]" style={{ color: '#808080' }}>{signal.time}</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono-c" style={{ background: ses.bg, color: ses.color }}>{signal.session}</span>
        </div>
      </div>

      {/* Main body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{signal.icon}</div>
            <div>
              <div className="font-display text-3xl text-white leading-none">{signal.pair}</div>
              <div className="font-mono-c text-[10px] mt-0.5" style={{ color: 'rgba(212,168,67,0.75)' }}>{signal.timeframe} · {signal.model}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg text-xs font-mono-c font-bold border" style={{ color: ts.color, background: ts.bg, borderColor: ts.border }}>
              {signal.type}
            </span>
            {signal.result && (
              <span className="px-3 py-1.5 rounded-lg text-xs font-mono-c font-bold" style={{ background: 'rgba(52,211,153,0.1)', color: '#34D399', border: '1px solid rgba(52,211,153,0.2)' }}>
                {signal.result}
              </span>
            )}
          </div>
        </div>

        {/* Levels grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: 'ENTRY', value: signal.entry, color: 'white' },
            { label: 'STOP LOSS', value: signal.sl, color: '#F87171' },
            { label: 'TP1', value: signal.tp1, color: '#34D399' },
          ].map((item, i) => (
            <div key={i} className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="font-mono-c text-[9px] tracking-widest mb-1" style={{ color: '#808080' }}>{item.label}</div>
              <div className="font-mono-c text-xs font-medium" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* R:R + Confidence */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono-c text-[10px]" style={{ color: '#C0C0C0' }}>R:R</span>
            <span className="font-mono-c text-sm font-medium" style={{ color: '#D4A843' }}>1:{signal.rr}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-c text-[10px]" style={{ color: '#C0C0C0' }}>Confidence</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 rounded-full" style={{ background: 'rgba(212,168,67,0.1)' }}>
                <div className="h-1.5 rounded-full" style={{ width: `${signal.confidence}%`, background: signal.confidence >= 85 ? '#34D399' : signal.confidence >= 70 ? '#D4A843' : '#F87171' }} />
              </div>
              <span className="font-mono-c text-[10px]" style={{ color: signal.confidence >= 85 ? '#34D399' : '#D4A843' }}>{signal.confidence}%</span>
            </div>
          </div>
          <div className="ml-auto font-mono-c text-[10px]" style={{ color: 'rgba(212,168,67,0.75)' }}>TP2: {signal.tp2}</div>
        </div>

        {/* ICT Concepts tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {signal.concepts.map((c, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg font-mono-c text-[10px]" style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.12)', color: 'rgba(212,168,67,0.6)' }}>
              {c}
            </span>
          ))}
        </div>

        {/* Analysis toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl font-mono-c text-[10px] tracking-widest transition-all"
          style={{ background: open ? 'rgba(212,168,67,0.06)' : 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,168,67,0.1)', color: 'rgba(212,168,67,0.6)' }}
        >
          <span>{open ? 'HIDE ICT ANALYSIS' : 'READ ICT ANALYSIS'}</span>
          <span>{open ? '−' : '+'}</span>
        </button>

        {open && (
          <div className="mt-3 p-4 rounded-xl" style={{ background: 'rgba(212,168,67,0.03)', border: '1px solid rgba(212,168,67,0.08)' }}>
            <div className="font-mono-c text-[10px] tracking-widest mb-2" style={{ color: 'rgba(212,168,67,0.75)' }}>// TRADE RATIONALE</div>
            <p className="text-gray-300 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{signal.analysis}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignalsPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [filter, setFilter] = useState('All');

  const filtered = SIGNALS.filter(s => {
    if (filter === 'All') return true;
    if (filter === 'Active') return s.status === 'ACTIVE';
    if (filter === 'Watching') return s.status === 'WATCHING';
    if (filter === 'Closed') return s.status.startsWith('CLOSED');
    return true;
  });

  const activeCount = SIGNALS.filter(s => s.status === 'ACTIVE').length;
  const closedWins = SIGNALS.filter(s => s.status.startsWith('CLOSED') && s.result?.startsWith('+')).length;

  return (
    <AuthGuard>
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --gold-dim: #8A6B28; --border: rgba(212,168,67,0.12); --bg2: #0F0F0F; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-c { font-family: 'DM Mono', monospace; }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
        .grid-bg {
          background-image: linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .signal-card { transition: all 0.25s ease; }
        .signal-card:hover { border-color: rgba(212,168,67,0.28) !important; box-shadow: 0 16px 48px rgba(0,0,0,0.4), 0 0 20px rgba(212,168,67,0.04); }
        .filter-btn { font-family: 'DM Mono', monospace; transition: all 0.2s; }
        .filter-btn.active { background: linear-gradient(135deg, #D4A843, #F0C96A); color: #080808; font-weight: 700; border-color: transparent; }
        .gold-gradient { background: linear-gradient(135deg, #8A6B28, #D4A843, #F0C96A, #D4A843); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .disclaimer-box { background: repeating-linear-gradient(45deg, rgba(212,168,67,0.02), rgba(212,168,67,0.02) 10px, transparent 10px, transparent 20px); }
      `}</style>

      {/* ── NAV ── */}
      <Navbar active="/signals" />
      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
          {[['/', 'Home'], ['/courses', 'Courses'], ['/signals', 'Signals'], ['/glossary', 'Glossary'], ['/practice', 'Practice'], ['/journal', 'Journal'], ['/dashboard', 'Dashboard']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '24px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="relative z-10 grid-bg px-6 py-16 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 700px 300px at 50% 100%, rgba(212,168,67,0.04) 0%, transparent 70%)' }} />
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5 font-mono-c text-xs tracking-widest" style={{ borderColor: 'var(--border)', background: 'rgba(212,168,67,0.04)', color: '#D4A843' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activeCount} ACTIVE SIGNALS TODAY
              </div>
              <h1 className="font-display leading-none mb-3" style={{ fontSize: 'clamp(42px, 7vw, 88px)' }}>
                <span className="text-white">EDUCATIONAL </span>
                <span className="gold-gradient">SIGNALS</span>
              </h1>
              <p className="text-gray-300 text-sm max-w-lg" style={{ fontWeight: 300 }}>
                Each signal is a live ICT lesson — showing exactly which concept triggered it, why, and how the trade was constructed using the 2022 Model.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              {[
                { value: activeCount, label: 'Active', color: '#34D399' },
                { value: '1', label: 'Watching', color: '#D4A843' },
                { value: `${closedWins}/1`, label: 'Closed Today', color: '#6B7280' },
                { value: '3.1', label: 'Avg R:R', color: '#818CF8' },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl" style={{ color: s.color }}>{s.value}</div>
                  <div className="font-mono-c text-[10px] tracking-widest uppercase" style={{ color: '#808080' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="relative z-10 disclaimer-box border-b px-6 py-4" style={{ borderColor: 'rgba(212,168,67,0.1)' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <span className="text-lg flex-shrink-0">⚠️</span>
          <p className="font-mono-c text-[10px] text-gray-300 leading-relaxed">
            EDUCATIONAL ONLY — These signals are ICT concept demonstrations, not financial advice. They are designed to show how ICT models identify setups in real market conditions. Never risk money you cannot afford to lose. Past performance does not guarantee future results.
          </p>
        </div>
      </div>

      {/* ── SESSION MAP ── */}
      <div className="relative z-10 border-b" style={{ borderColor: 'var(--border)', background: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="font-mono-c text-[10px] tracking-widest uppercase mb-3" style={{ color: 'rgba(212,168,67,0.3)' }}>// Current Sessions (EST)</div>
          <div className="flex gap-3 flex-wrap">
            {[
              { name: 'Asian', time: '8PM–12AM', active: false, color: '#818CF8' },
              { name: 'London Open', time: '2AM–5AM', active: false, color: '#C084FC' },
              { name: 'NY AM', time: '7AM–12PM', active: true, color: '#D4A843' },
              { name: 'London Close', time: '10AM–12PM', active: false, color: '#34D399' },
              { name: 'NY PM', time: '1PM–4PM', active: false, color: '#6B7280' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: s.active ? `${s.color}15` : 'rgba(255,255,255,0.02)', border: `1px solid ${s.active ? s.color + '40' : 'rgba(255,255,255,0.08)'}` }}>
                {s.active && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.color }} />}
                <span className="font-mono-c text-[10px]" style={{ color: s.active ? s.color : '#808080' }}>{s.name}</span>
                <span className="font-mono-c text-[9px]" style={{ color: '#707070' }}>{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FILTERS ── */}
      <div className="sticky top-[72px] z-40 border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto flex items-center gap-2">
          <span className="font-mono-c text-[10px] mr-2" style={{ color: 'rgba(212,168,67,0.7)' }}>FILTER:</span>
          {['All', 'Active', 'Watching', 'Closed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`filter-btn px-4 py-2 rounded-lg text-[10px] border tracking-wider uppercase ${filter === f ? 'active' : ''}`}
              style={filter !== f ? { borderColor: 'rgba(212,168,67,0.12)', color: '#C0C0C0', background: 'transparent' } : {}}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono-c text-[10px]" style={{ color: 'rgba(212,168,67,0.7)' }}>{filtered.length} signals</span>
        </div>
      </div>

      {/* ── SIGNALS GRID ── */}
      <section className="relative z-10 px-6 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map(signal => <SignalCard key={signal.id} signal={signal} />)}
        </div>
      </section>

      {/* ── HOW TO USE ── */}
      <section className="relative z-10 border-t px-6 py-14" style={{ borderColor: 'var(--border)', background: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto">
          <div className="font-mono-c text-[10px] tracking-widest uppercase mb-6 text-center" style={{ color: 'rgba(212,168,67,0.75)' }}>// How to Use These Signals</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'Read the Analysis', desc: 'Every signal has a full ICT breakdown — which liquidity was swept, which PD array triggered, which model it follows. Study it before looking at the levels.' },
              { step: '02', title: 'Verify on Your Chart', desc: 'Open the pair on your platform. Confirm you can see the same structure — the OB, the FVG, the liquidity sweep. Never take a signal you can\'t see yourself.' },
              { step: '03', title: 'Paper Trade First', desc: 'Use these signals for sim trading only until you can consistently identify the same setups independently. The goal is to learn the concepts, not follow alerts.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-2xl border" style={{ borderColor: 'rgba(212,168,67,0.1)', background: '#0F0F0F' }}>
                <div className="font-display text-5xl mb-3" style={{ color: 'rgba(212,168,67,0.12)' }}>{item.step}</div>
                <div className="font-semibold text-white text-sm mb-2">{item.title}</div>
                <p className="text-gray-300 text-xs leading-relaxed" style={{ fontWeight: 300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t px-8 py-6" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #D4A843, #8A6B28)' }}>S</div>
            <span className="font-display text-lg tracking-widest text-white">SMARTMONEY ACADEMY</span>
          </div>
          <div className="font-mono-c text-xs text-gray-300">Educational platform only. Not financial advice.</div>
          <div className="flex gap-6">
            {['/courses', '/signals', '/glossary', '/dashboard'].map((href, i) => (
              <Link key={i} href={href} className="font-mono-c text-xs text-gray-300 hover:text-[#D4A843] transition-colors tracking-wider uppercase">{href.slice(1)}</Link>
            ))}
          </div>
</div>
      </footer>
    </div>
    </AuthGuard>
  );
}