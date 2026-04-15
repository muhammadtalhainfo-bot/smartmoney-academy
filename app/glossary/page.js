'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TERMS = [
  { term: "AMD", full: "Accumulation, Manipulation, Distribution", cat: "ICT", def: "ICT's Power of Three — the 3-phase model of how smart money delivers price every single day. Asian = Accumulate, London = Manipulate (Judas Swing), NY AM = Distribute (real move)." },
  { term: "AR", full: "Asian Range", cat: "ICT", def: "The high-to-low range formed during the Asian trading session (8 PM–12 AM EST). The AR highs and lows become the primary liquidity targets for London's Judas Swing." },
  { term: "BB", full: "Breaker Block", cat: "ICT", def: "A failed Order Block that has flipped polarity. A bullish OB that price breaks through becomes a bearish Breaker Block (resistance). Highest-ranked PD Array." },
  { term: "BE", full: "Break Even", cat: "ICT & SMC", def: "Moving your stop-loss to your exact entry price after a trade is in profit, eliminating all monetary risk on the trade." },
  { term: "BISI", full: "Buy Side Imbalance Sell Side Inefficiency", cat: "ICT", def: "The bullish Fair Value Gap. Buyers were so aggressive that sellers couldn't participate fairly in that range. Acts as discount support when price returns." },
  { term: "BOS", full: "Break of Structure", cat: "ICT & SMC", def: "Price breaks a previous swing point in the SAME direction as the trend — confirms trend continuation. Bullish BOS = new HH. Bearish BOS = new LL." },
  { term: "BPR", full: "Balanced Price Range", cat: "ICT", def: "The overlap zone between a bullish and bearish FVG. Ultra-high confluence reaction zone where price almost always reacts sharply." },
  { term: "BSL", full: "Buy Side Liquidity", cat: "ICT & SMC", def: "Clusters of buy-stop orders and sell stop-losses sitting ABOVE price at swing highs, equal highs, PDH, PWH, and round numbers. Institutions push price up to grab BSL before selling." },
  { term: "CBDR", full: "Central Bank Dealers Range", cat: "ICT", def: "The price range delivered between 2:00–5:00 PM EST. Used to gauge the expected size of the next day's directional move. Narrow CBDR = small move. Wide CBDR = large move." },
  { term: "CE", full: "Consequent Encroachment", cat: "ICT", def: "The exact 50% midpoint of any Fair Value Gap. The most precise and highest-probability entry level within an FVG." },
  { term: "ChoCH", full: "Change of Character", cat: "ICT & SMC", def: "Price breaks a previous swing in the OPPOSITE direction to the current trend — signals a potential reversal. Same as MSS." },
  { term: "CISD", full: "Change in State of Delivery", cat: "ICT", def: "A more advanced version of ChoCH/MSS. Signals the algorithm has shifted price delivery direction — stronger signal than a simple ChoCH." },
  { term: "COT", full: "Commitment of Traders", cat: "ICT", def: "Weekly CFTC report showing the net positioning of large institutional traders. ICT uses COT for macro directional bias." },
  { term: "CRT", full: "Candle Range Theory", cat: "ICT", def: "Each candle on any timeframe contains its own AMD cycle within its high-to-low range. Every candle is a miniature market day." },
  { term: "DOL", full: "Draw on Liquidity", cat: "ICT", def: "The next probable price target — where the algorithm is drawing price toward before a reversal. Always identify your DOL before entering any trade." },
  { term: "Displacement", full: "Displacement Move", cat: "ICT & SMC", def: "A strong, aggressive impulse price movement with large-bodied candles and FVGs. Validates Order Blocks and signals institutional activity." },
  { term: "EQ", full: "Equilibrium", cat: "ICT & SMC", def: "The exact 50% Fibonacci level of any price range. Buy BELOW EQ (discount). Sell ABOVE EQ (premium)." },
  { term: "EQH", full: "Equal Highs", cat: "ICT & SMC", def: "Two or more swing highs at approximately the same price level. A Buy-Side Liquidity magnet — price will almost always sweep above EQH before a potential reversal." },
  { term: "EQL", full: "Equal Lows", cat: "ICT & SMC", def: "Two or more swing lows at approximately the same price level. A Sell-Side Liquidity magnet — price will sweep below EQL before a potential reversal." },
  { term: "ERL", full: "External Range Liquidity", cat: "ICT", def: "Liquidity sitting OUTSIDE the current price range — beyond the highs or lows. The primary draw-on-liquidity target." },
  { term: "FVG", full: "Fair Value Gap", cat: "ICT & SMC", def: "A 3-candle formation where a large impulse candle creates a gap between C1's high and C3's low (bullish) — an area of price imbalance. Price returns to fill it." },
  { term: "HH", full: "Higher High", cat: "ICT & SMC", def: "Each successive swing high is above the previous — defines a bullish trend structure." },
  { term: "HL", full: "Higher Low", cat: "ICT & SMC", def: "Each successive swing low is above the previous — confirms bullish trend continuation." },
  { term: "HRLR", full: "High Resistance Liquidity Run", cat: "ICT", def: "A path to a liquidity target that has lots of opposing price action defending it. Low probability — avoid these setups." },
  { term: "HTF", full: "Higher Time Frame", cat: "ICT & SMC", def: "Monthly, Weekly, Daily, and 4-Hour charts. Used for directional bias. HTF always overrules LTF." },
  { term: "Hidden OB", full: "Hidden Order Block", cat: "ICT", def: "A PD Array invisible on the current timeframe, formed by overlapping wicks on a higher timeframe. Extremely precise reaction zone." },
  { term: "IDM", full: "Inducement", cat: "ICT & SMC", def: "A deliberate small market move to trigger early traders' stops before the real direction move. Always look for inducement after a BOS." },
  { term: "IFVG", full: "Inversion Fair Value Gap", cat: "ICT", def: "An FVG that price has completely violated. It inverts polarity — a bullish IFVG becomes bearish resistance." },
  { term: "IOFED", full: "Institutional Order Flow Entry Drill", cat: "ICT", def: "ICT's precision trade execution model based on FVG mitigation within confirmed institutional order flow." },
  { term: "IOF", full: "Institutional Order Flow", cat: "ICT", def: "The directional bias and movement driven by institutional buy/sell programs. The footprint smart money leaves on charts." },
  { term: "IPDA", full: "Interbank Price Delivery Algorithm", cat: "ICT", def: "The algorithmic system that delivers price across all markets. Operates on a schedule to seek liquidity, reprice FVGs, and deliver price during Killzone windows." },
  { term: "IRL", full: "Internal Range Liquidity", cat: "ICT", def: "Liquidity sitting INSIDE the current price range — FVGs, OBs, unmitigated levels. IRL = entry zone, ERL = target." },
  { term: "ITH", full: "Intermediate Term High", cat: "ICT", def: "A swing high positioned between two short-term highs. More significant than STH." },
  { term: "ITL", full: "Intermediate Term Low", cat: "ICT", def: "A swing low positioned between two short-term lows. More significant than STL." },
  { term: "Judas Swing", full: "Judas Swing", cat: "ICT", def: "The fake directional move during London Killzone (2–5 AM EST) that sweeps Asian range liquidity in the WRONG direction before the real daily move begins." },
  { term: "Killzone", full: "ICT Kill Zone", cat: "ICT", def: "4 windows where the algorithm delivers significant price moves. Asian (8PM–12AM), London (2–5AM), NY AM (7–10AM), London Close (10AM–12PM) EST." },
  { term: "LH", full: "Lower High", cat: "ICT & SMC", def: "Each successive swing high is below the previous — defines a bearish trend structure." },
  { term: "LL", full: "Lower Low", cat: "ICT & SMC", def: "Each successive swing low is below the previous — confirms bearish trend continuation." },
  { term: "LP", full: "Liquidity Pool", cat: "ICT", def: "A cluster of stop-loss orders at a key price level. Common locations: swing highs/lows, equal highs/lows, PDH/PDL, round numbers." },
  { term: "LRLR", full: "Low Resistance Liquidity Run", cat: "ICT", def: "A clean, unobstructed path to a liquidity target with minimal opposing price action. High probability setup — always prefer over HRLR." },
  { term: "LTF", full: "Lower Time Frame", cat: "ICT & SMC", def: "1-Minute, 5-Minute, 15-Minute charts. Used for precision trade entry and LTF confirmation." },
  { term: "LTH", full: "Long Term High", cat: "ICT", def: "The major structural high with lower ITHs on both sides. Major BSL draw target on weekly/monthly timeframe." },
  { term: "LTL", full: "Long Term Low", cat: "ICT", def: "The major structural low with higher ITLs on both sides. Major SSL draw target on weekly/monthly timeframe." },
  { term: "Macro", full: "ICT Macro Time", cat: "ICT", def: "Short 10–27 minute algorithmic windows within Killzones where IPDA specifically seeks liquidity. Schedule: London 2:33–3AM, 4:03–4:30AM; NY AM 8:50–9:10, 9:50–10:10, 10:50–11:10; Lunch 11:50AM–12:10PM; PM 1:10–1:40PM; Last Hour 3:15–3:45PM." },
  { term: "MB", full: "Mitigation Block", cat: "ICT", def: "An OB formed when smart money exits a losing position from a previously failed OB. Strong future support/resistance." },
  { term: "MMBM", full: "Market Maker Buy Model", cat: "ICT", def: "ICT's complete bullish trade framework: accumulate → manipulate (sweep SSL) → rally. Used to read the full weekly/daily narrative." },
  { term: "MMSM", full: "Market Maker Sell Model", cat: "ICT", def: "ICT's complete bearish trade framework: accumulate → manipulate (sweep BSL) → decline. Mirror image of MMBM." },
  { term: "MSS", full: "Market Structure Shift", cat: "ICT", def: "Same as ChoCH — the initial price break opposite to the current trend. First warning sign of a potential reversal." },
  { term: "MT", full: "Mean Threshold", cat: "ICT", def: "The 50% midpoint of an Order Block's body (open to close, wicks excluded). Ideal entry level within an OB." },
  { term: "NDOG", full: "New Day Opening Gap", cat: "ICT", def: "The gap between yesterday's close and today's midnight open. Acts as intraday support/resistance. Price frequently seeks to close this gap." },
  { term: "NFP", full: "Non-Farm Payroll", cat: "ICT", def: "Monthly US employment report — highest-impact forex news event. ICT's 'Seek and Destroy Friday' strategy is often tied to NFP Fridays." },
  { term: "NWOG", full: "New Week Opening Gap", cat: "ICT", def: "The gap between Friday's close and Sunday's open. Major support/resistance. Price frequently seeks to close the NWOG early in the week." },
  { term: "OB", full: "Order Block", cat: "ICT & SMC", def: "The last opposing candle before a significant impulse move. Bullish OB = last bearish candle before bullish impulse. Bearish OB = last bullish candle before bearish impulse." },
  { term: "OTE", full: "Optimal Trade Entry", cat: "ICT", def: "The 62%–79% Fibonacci retracement zone — ICT's precise entry model for getting the deepest discount (longs) or highest premium (shorts) within a swing." },
  { term: "PA", full: "Price Action", cat: "ICT & SMC", def: "The raw movement of price over time. Foundation of all ICT analysis — no indicators, only price structure, liquidity, and time." },
  { term: "PD Array", full: "Premium & Discount Array", cat: "ICT", def: "ICT's ranked checklist of trade levels. Ranked: Breaker Block > Mitigation Block > OB > FVG > Liquidity Pool > EQ." },
  { term: "PDH", full: "Previous Day High", cat: "ICT & SMC", def: "The high of the previous daily candle. Key BSL level and draw target for the current day." },
  { term: "PDL", full: "Previous Day Low", cat: "ICT & SMC", def: "The low of the previous daily candle. Key SSL level and draw target for the current day." },
  { term: "PO3", full: "Power of Three", cat: "ICT", def: "Same as AMD — Accumulate, Manipulate, Distribute. Repeats on every timeframe from 1-minute candles to monthly charts." },
  { term: "Propulsion Block", full: "Propulsion Block", cat: "ICT", def: "An OB variant at the origin of a strong displacement move, showing price 'propelling' away from an institutional zone with high momentum." },
  { term: "PWH", full: "Previous Week High", cat: "ICT", def: "The high of the previous weekly candle. Major BSL draw target for weekly-timeframe moves." },
  { term: "PWL", full: "Previous Week Low", cat: "ICT", def: "The low of the previous weekly candle. Major SSL draw target for weekly-timeframe moves." },
  { term: "QML", full: "Quasimodo Level", cat: "ICT & SMC", def: "A reversal pattern: HH → HL → LH → LL → Higher Low. The final Higher Low is the QML entry zone for a reversal trade." },
  { term: "RDRB", full: "Redelivered Rebalanced Price Range", cat: "ICT", def: "A hidden PD Array formed when price re-enters and partially rebalances a previously delivered price range, creating an overlap zone." },
  { term: "Rejection Block", full: "Rejection Block", cat: "ICT", def: "A price level indicated by long wicks at major support/resistance — the last point of interest before a reversal." },
  { term: "Reclaimed OB", full: "Reclaimed Order Block", cat: "ICT", def: "An OB initially violated by price that price then returns to reclaim back inside. When reclaimed, it reasserts its original role." },
  { term: "RTO", full: "Return to Origin", cat: "ICT & SMC", def: "When price returns to the starting point of an impulse move — typically an OB or FVG — before continuing in the original direction." },
  { term: "SCOB", full: "Single Candle Order Block", cat: "ICT", def: "A simplified OB: a single candle whose body represents an institutional order zone, followed by a displacement move in the opposite direction." },
  { term: "SIBI", full: "Sell Side Imbalance Buy Side Inefficiency", cat: "ICT", def: "The bearish Fair Value Gap. Acts as premium resistance when price returns." },
  { term: "Silver Bullet", full: "ICT Silver Bullet Strategy", cat: "ICT", def: "ICT's cleanest intraday strategy. Runs in 3 windows: 3–4 AM, 10–11 AM, 2–3 PM EST. After a liquidity sweep, price displaces creating an FVG — enter at the FVG CE." },
  { term: "SMT", full: "Smart Money Technique / SMT Divergence", cat: "ICT", def: "When two correlated assets diverge — one makes a new high/low while the other does not. Signals a fake move and potential reversal in both." },
  { term: "SSL", full: "Sell Side Liquidity", cat: "ICT & SMC", def: "Clusters of sell-stop orders sitting BELOW price at swing lows, equal lows, PDL, PWL, and round numbers. Institutions push price down to grab SSL before buying." },
  { term: "STH", full: "Short Term High", cat: "ICT", def: "A basic swing high on your trading timeframe. Lowest tier of market structure significance." },
  { term: "STL", full: "Short Term Low", cat: "ICT", def: "A basic swing low on your trading timeframe. Lowest tier of significance." },
  { term: "Suspension Block", full: "Suspension Block", cat: "ICT", def: "New 2025 ICT concept. Forms when price creates a gap and suspends at a specific price. The suspension price becomes a key future PD Array." },
  { term: "TGIF", full: "Thank God It's Friday", cat: "ICT", def: "ICT's Friday model — the market typically reverses or retraces the week's move on Fridays. Used as a short-term counter-trend setup." },
  { term: "Turtle Soup", full: "ICT Turtle Soup Strategy", cat: "ICT", def: "A reversal strategy trading the false breakout. Price sweeps a 20-day high/low → fails to hold → enter opposite the sweep direction." },
  { term: "Unicorn Model", full: "ICT Unicorn Model", cat: "ICT", def: "A high-precision entry combining an Order Block and a Fair Value Gap at the same zone. OB = institutional context. FVG = precise entry. Double confluence = highest probability." },
  { term: "Venom Model", full: "ICT Venom Trading Model", cat: "ICT", def: "Introduced by ICT in April 2025. An advanced model building on AMD and the 2022 framework with new refinements to entry triggers." },
  { term: "Weekly Profiles", full: "ICT Weekly Range Profiles", cat: "ICT", def: "ICT's 5 weekly price delivery patterns: Classic, Consolidation, Expansion, Reversal, and Balanced. Used to predict which day creates the weekly high/low." },
  { term: "2022 Model", full: "ICT 2022 Trading Model", cat: "ICT", def: "ICT's 5-step trade framework: ① HTF Bias → ② Draw on Liquidity → ③ Wait for Killzone → ④ LTF Entry (Judas → ChoCH → FVG/OB) → ⑤ Trade Management. Most comprehensive ICT trade plan." },
  { term: "2024 Mentorship", full: "ICT 2024 Mentorship Concepts", cat: "ICT", def: "ICT's latest teaching: New Day Opening Gap, Asian Range Strategy, post-7 AM price delivery, and macro-level time analysis refinements." },
];

const CATS = ['All', 'ICT', 'SMC', 'ICT & SMC'];

const CAT_STYLE = {
  'ICT': { color: '#818CF8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)' },
  'SMC': { color: '#FB923C', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.2)' },
  'ICT & SMC': { color: '#C084FC', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.2)' },
};

export default function GlossaryPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = useMemo(() => {
    return TERMS.filter(t => {
      const matchesCat = activeCat === 'All' || t.cat === activeCat || t.cat.includes(activeCat);
      const q = search.toLowerCase();
      const matchesSearch = !q || t.term.toLowerCase().includes(q) || t.full.toLowerCase().includes(q) || t.def.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [search, activeCat]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(t => {
      const letter = t.term[0].toUpperCase();
      const key = /[0-9]/.test(letter) ? '#' : letter;
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --gold-dim: #8A6B28; --border: rgba(212,168,67,0.22); --bg2: #0F0F0F; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-c { font-family: 'DM Mono', monospace; }
        body::before {
          content: ''; position: fixed; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 0; opacity: 0.4;
        }
        .grid-bg {
          background-image: linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .search-input { background: #0F0F0F; border: 1px solid rgba(212,168,67,0.25); color: white; outline: none; transition: border-color 0.2s; }
        .search-input:focus { border-color: rgba(212,168,67,0.75); }
        .search-input::placeholder { color: #A8A8A8; font-family: 'DM Mono', monospace; font-size: 12px; }
        .term-row { transition: all 0.2s ease; border-bottom: 1px solid rgba(212,168,67,0.06); }
        .term-row:hover { background: rgba(212,168,67,0.03); }
        .term-row.active { background: rgba(212,168,67,0.05); border-bottom-color: rgba(212,168,67,0.25); }
        .filter-btn { font-family: 'DM Mono', monospace; transition: all 0.2s ease; }
        .filter-btn.active { background: linear-gradient(135deg, #D4A843, #F0C96A); color: #080808; font-weight: 700; border-color: transparent; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .slide-down { animation: slideDown 0.2s ease forwards; }
        .letter-anchor { scroll-margin-top: 140px; }
        .gold-gradient { background: linear-gradient(135deg, #8A6B28, #D4A843, #F0C96A, #D4A843, #8A6B28); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* ── NAV ── */}
      <Navbar active="/glossary" />

            {/* ── HERO ── */}
      <section className="relative z-10 grid-bg px-6 py-16 text-center border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 600px 300px at 50% 100%, rgba(212,168,67,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5 font-mono-c text-xs tracking-widest" style={{ borderColor: 'var(--border)', background: 'rgba(212,168,67,0.04)', color: '#D4A843' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            {TERMS.length} TERMS · UPDATED 2026
          </div>
          <h1 className="font-display leading-none mb-4" style={{ fontSize: 'clamp(42px, 8vw, 88px)' }}>
            <span className="text-white">ICT & SMC </span>
            <span className="gold-gradient">GLOSSARY</span>
          </h1>
          <p className="text-gray-300 max-w-lg mx-auto text-sm" style={{ fontWeight: 300 }}>
            Every term from ICT's YouTube channel and mentorship series. The complete reference — no fluff.
          </p>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <div className="sticky top-[72px] z-40 border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono-c text-xs" style={{ color: 'rgba(212,168,67,0.75)' }}>⌕</span>
            <input
              type="text"
              placeholder="Search terms, definitions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input w-full pl-9 pr-4 py-3 rounded-xl text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-c text-xs" style={{ color: 'rgba(212,168,67,0.75)' }}>✕</button>
            )}
          </div>
          {/* Filters */}
          <div className="flex items-center gap-2">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`filter-btn px-4 py-3 rounded-xl text-xs border tracking-wider uppercase ${activeCat === cat ? 'active' : ''}`}
                style={activeCat !== cat ? { borderColor: 'rgba(212,168,67,0.25)', color: '#C0C0C0', background: 'transparent' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* A–Z quick jump */}
        <div className="max-w-5xl mx-auto mt-3 flex items-center gap-1 flex-wrap">
          <span className="font-mono-c text-[10px] mr-1" style={{ color: 'rgba(212,168,67,0.8)' }}>JUMP:</span>
          {grouped.map(([letter]) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="font-mono-c text-[11px] w-6 h-6 flex items-center justify-center rounded hover:text-[#D4A843] transition-colors"
              style={{ color: '#808080' }}
            >
              {letter}
            </a>
          ))}
          <span className="ml-auto font-mono-c text-[10px]" style={{ color: '#D4A843' }}>
            {filtered.length} / {TERMS.length} terms
          </span>
        </div>
      </div>

      {/* ── TERMS ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {grouped.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono-c text-xs" style={{ color: 'rgba(212,168,67,0.8)' }}>No terms match "{search}"</p>
          </div>
        )}

        {grouped.map(([letter, terms]) => (
          <div key={letter} id={`letter-${letter}`} className="letter-anchor mb-10">
            {/* Letter header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="font-display text-5xl leading-none" style={{ color: 'rgba(212,168,67,0.25)' }}>{letter}</div>
              <div className="flex-1 h-px" style={{ background: 'rgba(212,168,67,0.22)' }} />
              <span className="font-mono-c text-[10px]" style={{ color: 'rgba(212,168,67,0.75)' }}>{terms.length}</span>
            </div>

            {/* Terms in this group */}
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(212,168,67,0.25)', background: '#0F0F0F' }}>
              {terms.map((t, i) => {
                const isOpen = expanded === `${letter}-${i}`;
                const cs = CAT_STYLE[t.cat] || CAT_STYLE['ICT'];
                return (
                  <div key={i} className={`term-row ${isOpen ? 'active' : ''}`}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : `${letter}-${i}`)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="font-semibold text-white text-sm flex-shrink-0">{t.term}</span>
                        <span className="text-gray-300 text-xs truncate hidden sm:block" style={{ fontWeight: 300 }}>{t.full}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono-c border hidden sm:block" style={{ color: cs.color, background: cs.bg, borderColor: cs.border }}>
                          {t.cat}
                        </span>
                        <span className="font-mono-c text-base" style={{ color: isOpen ? '#D4A843' : 'rgba(212,168,67,0.8)' }}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="slide-down px-6 pb-5 border-t" style={{ borderColor: 'rgba(212,168,67,0.22)' }}>
                        <div className="pt-4">
                          <div className="font-mono-c text-xs mb-3" style={{ color: 'rgba(212,168,67,0.75)' }}>{t.full}</div>
                          <p className="text-gray-300 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{t.def}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono-c border" style={{ color: cs.color, background: cs.bg, borderColor: cs.border }}>
                              {t.cat}
                            </span>
                            <Link href="/courses" className="font-mono-c text-[10px] tracking-wider" style={{ color: 'rgba(212,168,67,0.75)' }}>
                              → View in Courses
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <Footer />
    <Footer />
    </div>
  );
}