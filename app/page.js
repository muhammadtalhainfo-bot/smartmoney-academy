'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

// ─── Animated ticker data ───────────────────────────────────────
const TICKER = [
  { pair: 'EURUSD', price: '1.08432', change: '+0.12%', up: true },
  { pair: 'XAUUSD', price: '2,341.50', change: '+0.84%', up: true },
  { pair: 'NAS100', price: '18,204.25', change: '-0.23%', up: false },
  { pair: 'GBPUSD', price: '1.26718', change: '+0.07%', up: true },
  { pair: 'BTCUSD', price: '67,842.00', change: '+1.42%', up: true },
  { pair: 'US30', price: '38,910.50', change: '-0.18%', up: false },
  { pair: 'USDJPY', price: '151.824', change: '+0.31%', up: true },
];

const COURSES = [
  { id: 1, emoji: '📊', title: 'Market Structure', level: 'Beginner', lessons: 6, desc: 'HH/HL, BOS, ChoCH, MSS — the foundation of every trade.' },
  { id: 2, emoji: '💧', title: 'Liquidity Concepts', level: 'Beginner', lessons: 5, desc: 'Stop hunts, BSL/SSL, equal highs/lows — why price really moves.' },
  { id: 3, emoji: '🎯', title: 'Fair Value Gaps', level: 'Beginner', lessons: 5, desc: 'BISI, SIBI, CE, BPR — the most-traded ICT concept explained.' },
  { id: 4, emoji: '🧱', title: 'Order Blocks', level: 'Intermediate', lessons: 6, desc: 'OB, Breaker, Mitigation — the institutional footprint on charts.' },
  { id: 5, emoji: '⏰', title: 'Killzones & Macros', level: 'Intermediate', lessons: 4, desc: 'London, NY AM, Silver Bullet windows — time is your edge.' },
  { id: 6, emoji: '🔱', title: 'Power of Three (AMD)', level: 'Intermediate', lessons: 5, desc: 'Accumulate, Manipulate, Distribute — the daily market script.' },
];

const STATS = [
  { value: '110+', label: 'ICT Concepts' },
  { value: '14', label: 'Modules' },
  { value: '80+', label: 'Lessons' },
  { value: '2025', label: 'Updated' },
];

const LEVEL_STYLE = {
  Beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  Intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Advanced: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [tick, setTick] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const t = setInterval(() => setTick(n => n + 1), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        
        :root {
          --gold: #D4A843;
          --gold-light: #F0C96A;
          --gold-dim: #8A6B28;
          --bg: #080808;
          --bg2: #0F0F0F;
          --bg3: #141414;
          --border: rgba(212,168,67,0.15);
        }

        * { box-sizing: border-box; }

        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .font-mono { font-family: 'DM Mono', monospace; }

        /* Noise overlay */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        /* Gold glow */
        .glow-gold { box-shadow: 0 0 40px rgba(212,168,67,0.15), 0 0 80px rgba(212,168,67,0.05); }
        .glow-gold-text { text-shadow: 0 0 30px rgba(212,168,67,0.75); }

        /* Ticker */
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker 30s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }

        /* Fade in */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.25s; }
        .delay-3 { animation-delay: 0.4s; }
        .delay-4 { animation-delay: 0.55s; }
        .delay-5 { animation-delay: 0.7s; }

        /* Card hover */
        .course-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(212,168,67,0.1);
        }
        .course-card:hover {
          border-color: rgba(212,168,67,0.7);
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,168,67,0.08);
        }

        /* Gold button */
        .btn-gold {
          background: linear-gradient(135deg, #D4A843 0%, #F0C96A 50%, #D4A843 100%);
          background-size: 200% 200%;
          transition: all 0.3s ease;
          color: #080808;
          font-weight: 700;
        }
        .btn-gold:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(212,168,67,0.75);
        }

        /* Grid lines bg */
        .grid-bg {
          background-image:
            linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* Diagonal accent */
        .diagonal-accent {
          background: linear-gradient(135deg, transparent 49.5%, rgba(212,168,67,0.06) 49.5%, rgba(212,168,67,0.06) 50.5%, transparent 50.5%);
          background-size: 80px 80px;
        }

        /* Stat counter */
        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #F0C96A, #D4A843);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Separator line */
        .gold-line {
          background: linear-gradient(90deg, transparent, #D4A843, transparent);
          height: 1px;
        }
      `}</style>

      {/* ── LIVE TICKER ── */}
      <div className="relative z-10 border-b border-[var(--border)] bg-[#0A0A0A] py-2 overflow-hidden">
        <div className="flex ticker-track whitespace-nowrap">
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 font-mono text-xs">
              <span className="text-[var(--gold-dim)] font-medium">{item.pair}</span>
              <span className="text-white">{item.price}</span>
              <span className={item.up ? 'text-emerald-400' : 'text-red-400'}>
                {item.up ? '▲' : '▼'} {item.change}
              </span>
              <span className="text-gray-300">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <Navbar active="/" />

            {/* ── HERO ── */}
      <section className="relative z-10 grid-bg diagonal-accent min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-24">

        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{
            position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)',
          }} />
        </div>

        {/* Badge */}
        <div className={`fade-up delay-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg2)] mb-8`}>
          <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
          <span className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase">ICT & Smart Money Concepts</span>
        </div>

        {/* Main heading */}
        <h1 className="fade-up delay-2 font-display text-center leading-none mb-6" style={{ fontSize: 'clamp(56px, 10vw, 120px)' }}>
          <span className="block text-white">TRADE LIKE</span>
          <span className="block glow-gold-text" style={{
            background: 'linear-gradient(135deg, #8A6B28 0%, #D4A843 30%, #F0C96A 50%, #D4A843 70%, #8A6B28 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>INSTITUTIONS</span>
        </h1>

        <p className="fade-up delay-3 text-gray-300 text-lg max-w-xl mx-auto mb-10 leading-relaxed" style={{ fontWeight: 300 }}>
          Master ICT — the methodology used by banks, hedge funds, and professional traders to move markets. Every concept. Zero fluff.
        </p>

        <div className="fade-up delay-4 flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/courses" className="btn-gold px-8 py-4 rounded-xl text-base font-mono tracking-wide uppercase">
            Begin Your Journey →
          </Link>
          <Link href="/glossary" className="px-8 py-4 rounded-xl text-base font-mono tracking-wide uppercase border border-[var(--border)] text-gray-300 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">
            ICT Glossary
          </Link>
        </div>

        {/* Stats bar */}
        <div className="fade-up delay-5 flex items-center justify-center gap-12 flex-wrap">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div className="stat-value text-4xl">{s.value}</div>
              <div className="font-mono text-xs text-gray-300 tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Gold line */}
        <div className="absolute bottom-0 left-0 right-0 gold-line opacity-50" />
      </section>

      {/* ── WHAT IS ICT ── */}
      <section className="relative z-10 px-6 py-24 bg-[var(--bg2)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase mb-4">// What is ICT</div>
              <h2 className="font-display text-5xl text-white mb-6 leading-tight">THE ALGORITHM<br/>RUNS THE MARKET</h2>
              <p className="text-gray-300 leading-relaxed mb-6" style={{ fontWeight: 300 }}>
                ICT (Inner Circle Trader) is Michael Huddleston's complete methodology for understanding how the Interbank Price Delivery Algorithm (IPDA) moves markets. It explains exactly why price moves — not what happened, but what was engineered to happen.
              </p>
              <p className="text-gray-300 leading-relaxed" style={{ fontWeight: 300 }}>
                Banks don't react to news. They create the moves that retail traders react to. ICT teaches you to stop being the liquidity — and start following the institutions that consume it.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: '🎯', title: 'Liquidity First', desc: 'Every move is engineered to sweep stop-losses. Identify BSL/SSL before entering.' },
                { icon: '⏰', title: 'Time is the Edge', desc: 'Killzones and Macro times are when the algorithm delivers. Outside them — random noise.' },
                { icon: '📊', title: 'Premium vs Discount', desc: 'Institutions only buy in discount (below 50% Fib) and sell in premium. Never buy the top.' },
                { icon: '🔱', title: 'AMD Daily Script', desc: 'Every day: Accumulate (Asian) → Manipulate/Judas (London) → Distribute (NY AM).' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg3)] hover:border-[var(--gold-dim)] transition-colors">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm mb-1">{item.title}</p>
                    <p className="text-gray-300 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="relative z-10 px-6 py-24 grid-bg">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <div className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase mb-4">// Curriculum</div>
            <h2 className="font-display text-6xl text-white mb-4">WHAT YOU'LL LEARN</h2>
            <p className="text-gray-300 max-w-lg mx-auto text-sm" style={{ fontWeight: 300 }}>
              14 modules, 80+ lessons. Built from innercircletrader.net, ICT PDFs Months 1–4, and the LumiTraders 2022 book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {COURSES.map((c, i) => (
              <Link key={c.id} href={`/lesson/${c.id}`}>
                <div className="course-card h-full p-5 rounded-2xl bg-[var(--bg2)] cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border border-[var(--border)]" style={{ background: 'rgba(212,168,67,0.05)' }}>
                      {c.emoji}
                    </div>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-mono border ${LEVEL_STYLE[c.level]}`}>
                      {c.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed mb-4" style={{ fontWeight: 300 }}>{c.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[var(--gold-dim)]">{c.lessons} LESSONS</span>
                    <span className="text-[var(--gold)] text-sm">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/courses" className="btn-gold inline-flex items-center gap-3 px-8 py-4 rounded-xl font-mono text-sm tracking-wider uppercase">
              View All 14 Modules →
            </Link>
          </div>

        </div>
      </section>

      {/* ── DAILY SCHEDULE STRIP ── */}
      <section className="relative z-10 border-y border-[var(--border)] bg-[var(--bg2)] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase text-center mb-8">// ICT Daily Session Map</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { time: '8PM–12AM', zone: 'Asian', role: 'ACCUMULATION', desc: 'Build Asian Range', color: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)', text: '#818CF8' },
              { time: '2AM–5AM', zone: 'London', role: 'MANIPULATION', desc: 'Judas Swing / Stop Hunt', color: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#F87171' },
              { time: '7AM–12PM', zone: 'New York AM', role: 'DISTRIBUTION', desc: 'Real Directional Move', color: 'rgba(212,168,67,0.1)', border: 'rgba(212,168,67,0.3)', text: '#D4A843' },
              { time: '10AM–12PM', zone: 'London Close', role: 'REVERSAL', desc: 'Profit Taking / Fade', color: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#34D399' },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-4 border text-center" style={{ background: s.color, borderColor: s.border }}>
                <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: s.text }}>{s.role}</div>
                <div className="font-semibold text-white text-sm mb-1">{s.zone}</div>
                <div className="font-mono text-[10px] text-gray-300 mb-2">{s.time} EST</div>
                <div className="text-xs text-gray-300" style={{ fontWeight: 300 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="relative z-10 px-6 py-24 text-center diagonal-accent">
        <div className="max-w-3xl mx-auto">
          <div className="font-mono text-xs text-[var(--gold-dim)] tracking-widest uppercase mb-8">// ICT on Trading</div>
          <blockquote className="font-display text-3xl md:text-5xl text-white leading-tight mb-8">
            "STOP TRYING TO PREDICT.<br/>
            <span style={{ color: 'var(--gold)' }}>START READING THE ALGORITHM."</span>
          </blockquote>
          <p className="font-mono text-xs text-gray-300 tracking-widest">— MICHAEL J. HUDDLESTON (ICT)</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 py-24 bg-[var(--bg2)]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-px rounded-2xl glow-gold" style={{ background: 'linear-gradient(135deg, rgba(212,168,67,0.3), transparent, rgba(212,168,67,0.3))' }}>
            <div className="bg-[var(--bg3)] rounded-2xl p-12">
              <div className="font-mono text-xs text-[var(--gold)] tracking-widest uppercase mb-4">// Begin Now</div>
              <h2 className="font-display text-5xl text-white mb-4">READY TO THINK<br/>LIKE SMART MONEY?</h2>
              <p className="text-gray-300 mb-8 text-sm leading-relaxed" style={{ fontWeight: 300 }}>
                Join thousands of traders who stopped guessing and started reading institutional footprints. Free access to all beginner modules.
              </p>
              <Link href="/courses" className="btn-gold inline-block px-10 py-4 rounded-xl font-mono text-sm tracking-widest uppercase">
                Start For Free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-[var(--border)] px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center font-display text-black text-sm" style={{ background: 'linear-gradient(135deg, #D4A843, #8A6B28)' }}>S</div>
            <span className="font-display text-lg tracking-widest text-white">SMARTMONEY ACADEMY</span>
          </div>
          <div className="font-mono text-xs text-gray-300 text-center">
            Educational platform only. Not financial advice. Trade at your own risk.
          </div>
          <div className="flex gap-6">
            {['/courses', '/signals', '/glossary'].map((href, i) => (
              <Link key={i} href={href} className="font-mono text-xs text-gray-300 hover:text-[var(--gold)] transition-colors tracking-wider uppercase">
                {href.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}