'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TERMS = [
  { term: "AMD", full: "Accumulation, Manipulation, Distribution", cat: "ICT", def: "ICT's Power of Three — the 3-phase model of how smart money delivers price every single day. Asian = Accumulate, London = Manipulate (Judas Swing), NY AM = Distribute (real move)." },
  { term: "AR", full: "Asian Range", cat: "ICT", def: "The high-to-low range formed during the Asian trading session (8 PM–12 AM EST). The AR highs and lows become the primary liquidity targets for London's Judas Swing." },
  { term: "BB", full: "Breaker Block", cat: "ICT", def: "A failed Order Block that has flipped polarity. A bullish OB that price breaks through becomes a bearish Breaker Block (resistance). A PD Array concept that some ICT practitioners prioritize." },
  { term: "BE", full: "Break Even", cat: "ICT & SMC", def: "Moving your stop-loss to your exact entry price after a trade is in profit, eliminating all monetary risk on the trade." },
  { term: "BISI", full: "Buy Side Imbalance Sell Side Inefficiency", cat: "ICT", def: "The bullish Fair Value Gap. Buyers were so aggressive that sellers couldn't participate fairly in that range. Acts as discount support when price returns." },
  { term: "BOS", full: "Break of Structure", cat: "ICT & SMC", def: "Price breaks a previous swing point in the SAME direction as the trend — confirms trend continuation. Bullish BOS = new HH. Bearish BOS = new LL." },
  { term: "BPR", full: "Balanced Price Range", cat: "ICT", def: "The overlap zone between a bullish and bearish FVG. A confluence zone that some traders study as a potential reaction area." },
  { term: "BSL", full: "Buy Side Liquidity", cat: "ICT & SMC", def: "Clusters of buy-stop orders and sell stop-losses sitting ABOVE price at swing highs, equal highs, PDH, PWH, and round numbers. Within the ICT framework, traders may interpret price movement above BSL as a liquidity sweep before a potential reversal." },
  { term: "CBDR", full: "Central Bank Dealers Range", cat: "ICT", def: "The price range delivered between 2:00–5:00 PM EST. Used to gauge the expected size of the next day's directional move. Narrow CBDR = small move. Wide CBDR = large move." },
  { term: "CE", full: "Consequent Encroachment", cat: "ICT", def: "The 50% midpoint of a Fair Value Gap. Some ICT traders use this level as a more precise reference when studying FVG revisits; it is not a guaranteed reaction level." },
  { term: "ChoCH", full: "Change of Character", cat: "ICT & SMC", def: "Price breaks a previous swing in the OPPOSITE direction to the current trend — signals a potential reversal. Same as MSS." },
  { term: "CISD", full: "Change in State of Delivery", cat: "ICT", def: "A more advanced version of ChoCH/MSS. Within ICT terminology, this is interpreted as a shift in price delivery direction." },
  { term: "COT", full: "Commitment of Traders", cat: "ICT", def: "Weekly CFTC report showing the net positioning of large institutional traders. ICT uses COT for macro directional bias." },
  { term: "CRT", full: "Candle Range Theory", cat: "ICT", def: "Each candle on any timeframe contains its own AMD cycle within its high-to-low range. Every candle is a miniature market day." },
  { term: "DOL", full: "Draw on Liquidity", cat: "ICT", def: "A potential price objective that ICT traders may identify before evaluating an entry; it is a framework concept, not a guaranteed target or reversal point." },
  { term: "Displacement", full: "Displacement Move", cat: "ICT & SMC", def: "A strong, aggressive impulse price movement with large-bodied candles and FVGs. Validates Order Blocks and is interpreted by some traders as evidence of institutional activity." },
  { term: "EQ", full: "Equilibrium", cat: "ICT & SMC", def: "The exact 50% Fibonacci level of any price range. Within this framework, traders may classify prices below EQ as discount and above EQ as premium; the labels do not by themselves determine a buy or sell." },
  { term: "EQH", full: "Equal Highs", cat: "ICT & SMC", def: "Two or more swing highs at approximately the same price level. A Buy-Side Liquidity magnet — price may interact with or sweep EQH before a potential reversal." },
  { term: "EQL", full: "Equal Lows", cat: "ICT & SMC", def: "Two or more swing lows at approximately the same price level. A Sell-Side Liquidity magnet — price may interact with or sweep EQL before a potential reversal." },
  { term: "ERL", full: "External Range Liquidity", cat: "ICT", def: "Liquidity sitting OUTSIDE the current price range — beyond the highs or lows. The primary draw-on-liquidity target." },
  { term: "FVG", full: "Fair Value Gap", cat: "ICT & SMC", def: "A 3-candle formation where a large impulse candle creates a gap between C1's high and C3's low (bullish) — an area of price imbalance. Price returns to fill it." },
  { term: "HH", full: "Higher High", cat: "ICT & SMC", def: "Each successive swing high is above the previous — defines a bullish trend structure." },
  { term: "HL", full: "Higher Low", cat: "ICT & SMC", def: "Each successive swing low is above the previous — confirms bullish trend continuation." },
  { term: "HRLR", full: "High Resistance Liquidity Run", cat: "ICT", def: "A path to a liquidity target with substantial opposing price action. Traders may classify such paths as more difficult to trade, but probability depends on the defined setup and sample." },
  { term: "HTF", full: "Higher Time Frame", cat: "ICT & SMC", def: "Monthly, Weekly, Daily, and 4-Hour charts. Used for directional bias. HTF context is commonly given greater weight than LTF signals in this framework." },
  { term: "Hidden OB", full: "Hidden Order Block", cat: "ICT", def: "An ICT term for a PD Array that is easier to identify on a higher timeframe; the exact formation rules vary by source. It should be tested rather than assumed to be an extremely precise reaction zone." },
  { term: "IDM", full: "Inducement", cat: "ICT & SMC", def: "An ICT-style concept describing a possible move that may attract early entries or stops before a larger move. Treat it as a hypothesis to test rather than an assumption, and do not require it after every BOS." },
  { term: "IFVG", full: "Inversion Fair Value Gap", cat: "ICT", def: "An FVG that price has completely violated. It inverts polarity — a bullish IFVG becomes bearish resistance." },
  { term: "IOFED", full: "Institutional Order Flow Entry Drill", cat: "ICT", def: "ICT's precision trade execution model based on FVG mitigation within confirmed institutional order flow." },
  { term: "IOF", full: "Institutional Order Flow", cat: "ICT", def: "An ICT-style interpretation of directional bias and price movement. References to institutional buying or selling are interpretations of the framework, not directly observable facts from a chart." },
  { term: "IPDA", full: "Interbank Price Delivery Algorithm", cat: "ICT", def: "An ICT theoretical model used to describe how price may be delivered through liquidity and time-based conditions." },
  { term: "IRL", full: "Internal Range Liquidity", cat: "ICT", def: "Liquidity sitting INSIDE the current price range — FVGs, OBs, unmitigated levels. IRL = entry zone, ERL = target." },
  { term: "ITH", full: "Intermediate Term High", cat: "ICT", def: "A swing high positioned between two short-term highs. More significant than STH." },
  { term: "ITL", full: "Intermediate Term Low", cat: "ICT", def: "A swing low positioned between two short-term lows. More significant than STL." },
  { term: "Judas Swing", full: "Judas Swing", cat: "ICT", def: "An ICT-style concept describing a possible directional move during the London Killzone that may sweep Asian-range liquidity before a later move." },
  { term: "Killzone", full: "ICT Kill Zone", cat: "ICT", def: "4 windows where the algorithm delivers significant price moves. Asian (8PM–12AM), London (2–5AM), NY AM (7–10AM), London Close (10AM–12PM) EST." },
  { term: "LH", full: "Lower High", cat: "ICT & SMC", def: "Each successive swing high is below the previous — defines a bearish trend structure." },
  { term: "LL", full: "Lower Low", cat: "ICT & SMC", def: "Each successive swing low is below the previous — confirms bearish trend continuation." },
  { term: "LP", full: "Liquidity Pool", cat: "ICT", def: "A cluster of stop-loss orders at a key price level. Common locations: swing highs/lows, equal highs/lows, PDH/PDL, round numbers." },
  { term: "LRLR", full: "Low Resistance Liquidity Run", cat: "ICT", def: "A clean, unobstructed path to a liquidity target with minimal opposing price action. Often described within ICT education as a cleaner path than HRLR; this is a framework preference, not a guarantee." },
  { term: "LTF", full: "Lower Time Frame", cat: "ICT & SMC", def: "1-Minute, 5-Minute, 15-Minute charts. Used for precision trade entry and LTF confirmation." },
  { term: "LTH", full: "Long Term High", cat: "ICT", def: "The major structural high with lower ITHs on both sides. Major BSL draw target on weekly/monthly timeframe." },
  { term: "LTL", full: "Long Term Low", cat: "ICT", def: "The major structural low with higher ITLs on both sides. Major SSL draw target on weekly/monthly timeframe." },
  { term: "Macro", full: "ICT Macro Time", cat: "ICT", def: "Short 10–27 minute algorithmic windows within Killzones where IPDA specifically seeks liquidity. Schedule: London 2:33–3AM, 4:03–4:30AM; NY AM 8:50–9:10, 9:50–10:10, 10:50–11:10; Lunch 11:50AM–12:10PM; PM 1:10–1:40PM; Last Hour 3:15–3:45PM." },
  { term: "MB", full: "Mitigation Block", cat: "ICT", def: "An OB formed when smart money exits a losing position from a previously failed OB. A potential future support/resistance area within the framework." },
  { term: "MMBM", full: "Market Maker Buy Model", cat: "ICT", def: "ICT's complete bullish trade framework: accumulate → manipulate (sweep SSL) → rally. Used to read the full weekly/daily narrative." },
  { term: "MMSM", full: "Market Maker Sell Model", cat: "ICT", def: "ICT's complete bearish trade framework: accumulate → manipulate (sweep BSL) → decline. Mirror image of MMBM." },
  { term: "MSS", full: "Market Structure Shift", cat: "ICT", def: "Same as ChoCH — the initial price break opposite to the current trend. First warning sign of a potential reversal." },
  { term: "MT", full: "Mean Threshold", cat: "ICT", def: "The 50% midpoint of an Order Block's body (open to close, wicks excluded). Some ICT traders use it as a reference within an OB; it is not a guaranteed entry level." },
  { term: "NDOG", full: "New Day Opening Gap", cat: "ICT", def: "The gap between yesterday's close and today's midnight open. Acts as intraday support/resistance. Traders may study whether price revisits or closes this gap as part of their market analysis." },
  { term: "NFP", full: "Non-Farm Payroll", cat: "ICT", def: "Monthly U.S. employment report and a major scheduled economic release. ICT's 'Seek and Destroy Friday' concept is sometimes discussed in connection with NFP Fridays." },
  { term: "NWOG", full: "New Week Opening Gap", cat: "ICT", def: "The gap between Friday's close and Sunday's open. Major support/resistance. Some traders study whether price revisits or closes the NWOG early in the week; this behavior is not guaranteed." },
  { term: "OB", full: "Order Block", cat: "ICT & SMC", def: "The last opposing candle before a significant impulse move. Bullish OB = last bearish candle before bullish impulse. Bearish OB = last bullish candle before bearish impulse." },
  { term: "OTE", full: "Optimal Trade Entry", cat: "ICT", def: "The 62%–79% Fibonacci retracement zone used in the ICT OTE framework as a potential entry area within a selected swing." },
  { term: "PA", full: "Price Action", cat: "ICT & SMC", def: "The raw movement of price over time. Foundation of all ICT analysis — no indicators, only price structure, liquidity, and time." },
  { term: "PD Array", full: "Premium & Discount Array", cat: "ICT", def: "ICT's ranked checklist of trade levels. Ranked: Breaker Block > Mitigation Block > OB > FVG > Liquidity Pool > EQ." },
  { term: "PDH", full: "Previous Day High", cat: "ICT & SMC", def: "The high of the previous daily candle. Key BSL level and draw target for the current day." },
  { term: "PDL", full: "Previous Day Low", cat: "ICT & SMC", def: "The low of the previous daily candle. Key SSL level and draw target for the current day." },
  { term: "PO3", full: "Power of Three", cat: "ICT", def: "Same as AMD — Accumulate, Manipulate, Distribute. ICT traders may apply this framework across timeframes, but the sequence should be treated as a model rather than an assumption that repeats on every chart." },
  { term: "Propulsion Block", full: "Propulsion Block", cat: "ICT", def: "An ICT term for an order-block variant associated with a strong displacement move. The institutional interpretation is a framework, not proof of a specific institutional zone." },
  { term: "PWH", full: "Previous Week High", cat: "ICT", def: "The high of the previous weekly candle. In ICT terminology it may be studied as a buy-side liquidity reference or draw on liquidity." },
  { term: "PWL", full: "Previous Week Low", cat: "ICT", def: "The low of the previous weekly candle. Major SSL draw target for weekly-timeframe moves." },
  { term: "QML", full: "Quasimodo Level", cat: "ICT & SMC", def: "A reversal pattern: HH → HL → LH → LL → Higher Low. The final Higher Low is the QML entry zone for a reversal trade." },
  { term: "RDRB", full: "Redelivered Rebalanced Price Range", cat: "ICT", def: "An ICT term for a price-delivery structure that can form when price re-enters and partially rebalances a previously delivered range; exact identification depends on the source definition." },
  { term: "Rejection Block", full: "Rejection Block", cat: "ICT", def: "An ICT term for a price area associated with long wicks near a reference level; traders may study it as a potential reversal area, but a reversal is not guaranteed." },
  { term: "Reclaimed OB", full: "Reclaimed Order Block", cat: "ICT", def: "An order-block concept in which price first violates the area and later trades back into it. Traders may interpret the reclaim as relevant context, but its original role is not guaranteed to reassert." },
  { term: "RTO", full: "Return to Origin", cat: "ICT & SMC", def: "When price returns to the starting point of an impulse move — typically an OB or FVG — before continuing in the original direction." },
  { term: "SCOB", full: "Single Candle Order Block", cat: "ICT", def: "A simplified OB: a single candle whose body represents an institutional order zone, followed by a displacement move in the opposite direction." },
  { term: "SIBI", full: "Sell Side Imbalance Buy Side Inefficiency", cat: "ICT", def: "The bearish Fair Value Gap. Some traders study it as a potential premium-area reference when price returns." },
  { term: "Silver Bullet", full: "ICT Silver Bullet Strategy", cat: "ICT", def: "An ICT intraday strategy with defined time windows and entry conditions. It is commonly described around 3–4 AM, 10–11 AM, and 2–3 PM EST. A typical framework sequence studies a liquidity event, displacement, an FVG, and its CE as potential entry references." },
  { term: "SMT", full: "Smart Money Technique / SMT Divergence", cat: "ICT", def: "When two correlated assets diverge — one makes a new high/low while the other does not. Can be interpreted as a possible divergence and reversal condition within the framework." },
  { term: "SSL", full: "Sell Side Liquidity", cat: "ICT & SMC", def: "Clusters of sell-stop orders sitting BELOW price at swing lows, equal lows, PDL, PWL, and round numbers. Within the ICT framework, traders may interpret movement below SSL as a liquidity sweep before a potential reversal." },
  { term: "STH", full: "Short Term High", cat: "ICT", def: "A basic swing high on your trading timeframe. Lowest tier of market structure significance." },
  { term: "STL", full: "Short Term Low", cat: "ICT", def: "A basic swing low on your trading timeframe. Lowest tier of significance." },
  { term: "Suspension Block", full: "Suspension Block", cat: "ICT", def: "New 2025 ICT concept. Forms when price creates a gap and suspends at a specific price. The suspension price becomes a key future PD Array." },
  { term: "TGIF", full: "Thank God It's Friday", cat: "ICT", def: "ICT's Friday model — the market typically reverses or retraces the week's move on Fridays. Used as a short-term counter-trend setup." },
  { term: "Turtle Soup", full: "ICT Turtle Soup Strategy", cat: "ICT", def: "A reversal strategy trading the false breakout. Price sweeps a 20-day high/low → fails to hold → enter opposite the sweep direction." },
  { term: "Unicorn Model", full: "ICT Unicorn Model", cat: "ICT", def: "A high-precision entry combining an Order Block and a Fair Value Gap at the same zone. OB = institutional context. FVG = precise entry. The combined concepts are often used as confluence." },
  { term: "Venom Model", full: "ICT Venom Trading Model", cat: "ICT", def: "Introduced by ICT in April 2025. An advanced model building on AMD and the 2022 framework with new refinements to entry triggers." },
  { term: "Weekly Profiles", full: "ICT Weekly Range Profiles", cat: "ICT", def: "ICT's 5 weekly price delivery patterns: Classic, Consolidation, Expansion, Reversal, and Balanced. Used as a framework for studying potential weekly price-delivery patterns." },
  { term: "2022 Model", full: "ICT 2022 Trading Model", cat: "ICT", def: "ICT's 5-step trade framework: ① HTF Bias → ② Draw on Liquidity → ③ Wait for Killzone → ④ LTF Entry (Judas → ChoCH → FVG/OB) → ⑤ Trade Management. A five-step ICT trading framework." },
  { term: "2024 Mentorship", full: "ICT 2024 Mentorship Concepts", cat: "ICT", def: "Historical 2024 mentorship material covering New Day Opening Gap, Asian Range Strategy, post-7 AM price delivery, and macro-level time analysis refinements." },

  { term: "Accumulation", full: "Accumulation Phase", cat: "ICT", def: "The first phase of the AMD framework, commonly described as accumulation. Price moves sideways collecting orders from uncertain retail traders before the real directional move begins." },
  { term: "Algorithm", full: "Trading Algorithm / IPDA", cat: "ICT", def: "A theoretical framework used in ICT education to interpret price delivery, liquidity, and time-based behavior." },
  { term: "Balanced Price Range", full: "BPR", cat: "ICT", def: "When two opposing FVGs overlap, creating a consolidation zone that precedes explosive moves. A BPR that some traders study as a potential reaction zone when opposing FVGs overlap." },
  { term: "CE", full: "Consequent Encroachment", cat: "ICT", def: "The exact 50% midpoint level of a Fair Value Gap. A commonly studied 50% reference point within an FVG; its usefulness should be evaluated with the chosen rules and market. -- often where precise LTF entries are taken." },
  { term: "Dealing Range", full: "Dealing Range / DR", cat: "ICT", def: "Price range between significant swing high and low. Exists at every timeframe, nested inside each other. Defines premium (above 50%) and discount (below 50%) zones." },
  { term: "Distribution", full: "Distribution Phase", cat: "ICT", def: "The third phase of the AMD framework, commonly described as distribution; specific market behavior can vary." },
  { term: "ERL", full: "External Range Liquidity", cat: "ICT", def: "Liquidity sitting outside the current dealing range -- above swing highs (BSL) or below swing lows (SSL). A potential external liquidity target within the ICT framework." },
  { term: "IFVG", full: "Implied Fair Value Gap", cat: "ICT", def: "An inverted FVG that forms opposite to displacement direction. Often signals a manipulation trap. A fully violated FVG becomes an IFVG -- polarity flips." },
  { term: "IPDA", full: "Interbank Price Delivery Algorithm", cat: "ICT", def: "A theoretical ICT concept describing algorithmic price delivery and liquidity behavior. A central theoretical concept in ICT education about how price may be delivered through time and liquidity." },
  { term: "IRL", full: "Internal Range Liquidity", cat: "ICT", def: "Liquidity sitting inside the current dealing range -- unmitigated FVGs, OBs, and gaps. IRL is the entry zone; ERL is the target." },
  { term: "MMBM", full: "Market Maker Buy Model", cat: "ICT", def: "ICT complete bullish trade framework: accumulate, manipulate (sweep SSL), then rally to BSL. Used to read the full weekly and daily narrative before entering." },
  { term: "MMSM", full: "Market Maker Sell Model", cat: "ICT", def: "ICT complete bearish trade framework: accumulate, manipulate (sweep BSL), then decline to SSL. The mirror image of MMBM." },
  { term: "Reclaimed OB", full: "Reclaimed Order Block", cat: "ICT", def: "An Order Block initially violated by price that price then returns to and reclaims back inside. When reclaimed, it reasserts its original institutional role." },
  { term: "TGIF Setup", full: "TGIF (Thank God It's Friday)", cat: "ICT", def: "Friday price action that reveals the true weekly delivery direction. Some ICT traders study Friday price behavior for potential weekly reversal or retracement patterns; outcomes vary." },
  { term: "Vacuum Block", full: "Vacuum Block", cat: "ICT", def: "An area where price moves rapidly due to lack of opposing orders. Similar to a liquidity void -- price passes through these zones without meaningful retracement." },
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

        :root { --gold: #E8C547; --gold-dim: #8A6B28; --border: rgba(212,168,67,0.22); --bg2: #0F0F0F; }
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
        .search-input { background: #0F0F0F; border: 1px solid rgba(232,197,71,0.95); color: white; outline: none; transition: border-color 0.2s; }
        .search-input:focus { border-color: rgba(232,197,71,0.95); }
        .search-input::placeholder { color: #A8A8A8; font-family: 'DM Mono', monospace; font-size: 12px; }
        .term-row { transition: all 0.2s ease; border-bottom: 1px solid rgba(212,168,67,0.06); }
        .term-row:hover { background: rgba(212,168,67,0.03); }
        .term-row.active { background: rgba(212,168,67,0.05); border-bottom-color: rgba(232,197,71,0.95); }
        .filter-btn { font-family: 'DM Mono', monospace; transition: all 0.2s ease; }
        .filter-btn.active { background: linear-gradient(135deg, #E8C547, #F0C96A); color: #080808; font-weight: 700; border-color: transparent; }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .slide-down { animation: slideDown 0.2s ease forwards; }
        .letter-anchor { scroll-margin-top: 140px; }
        .gold-gradient { background: linear-gradient(135deg, #8A6B28, #E8C547, #F0C96A, #E8C547, #8A6B28); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      {/* ── NAV ── */}
      <Navbar active="/glossary" />

            {/* ── HERO ── */}
      <section className="relative z-10 grid-bg px-6 py-16 text-center border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 600px 300px at 50% 100%, rgba(212,168,67,0.05) 0%, transparent 70%)' }} />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-5 font-mono-c text-xs tracking-widest" style={{ borderColor: 'var(--border)', background: 'rgba(212,168,67,0.04)', color: '#E8C547' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8C547]" />
            {TERMS.length} TERMS · UPDATED 2026
          </div>
          <h1 className="font-display leading-none mb-4" style={{ fontSize: 'clamp(42px, 8vw, 88px)' }}>
            <span className="text-white">ICT & SMC </span>
            <span className="gold-gradient">GLOSSARY</span>
          </h1>
          <p className="text-gray-200 max-w-lg mx-auto text-sm" style={{ fontWeight: 300 }}>
            Every term from ICT's YouTube channel and mentorship series. The complete reference — no fluff.
          </p>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ── */}
      <div className="sticky top-[72px] z-40 border-b px-6 py-4" style={{ borderColor: 'var(--border)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono-c text-xs" style={{ color: 'rgba(232,197,71,0.95)' }}>⌕</span>
            <input
              type="text"
              aria-label="Search glossary terms and definitions"
              placeholder="Search terms, definitions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="search-input w-full pl-9 pr-4 py-3 rounded-xl text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-c text-xs" style={{ color: 'rgba(232,197,71,0.95)' }}>✕</button>
            )}
          </div>
          {/* Filters */}
          <div className="flex items-center gap-2">
            {CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                aria-pressed={activeCat === cat}
                className={`filter-btn px-4 py-3 rounded-xl text-xs border tracking-wider uppercase ${activeCat === cat ? 'active' : ''}`}
                style={activeCat !== cat ? { borderColor: 'rgba(232,197,71,0.95)', color: '#C0C0C0', background: 'transparent' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* A–Z quick jump */}
        <div className="max-w-5xl mx-auto mt-3 flex items-center gap-1 flex-wrap">
          <span className="font-mono-c text-[10px] mr-1" style={{ color: '#E8C547' }}>JUMP:</span>
          {grouped.map(([letter]) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="font-mono-c text-[11px] w-6 h-6 flex items-center justify-center rounded hover:text-[#E8C547] transition-colors"
              style={{ color: '#808080' }}
            >
              {letter}
            </a>
          ))}
          <span className="ml-auto font-mono-c text-[10px]" style={{ color: '#E8C547' }}>
            {filtered.length} / {TERMS.length} terms
          </span>
        </div>
      </div>

      {/* ── TERMS ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-10">
        {grouped.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono-c text-xs" style={{ color: '#E8C547' }}>No terms match "{search}"</p>
          </div>
        )}

        {grouped.map(([letter, terms]) => (
          <div key={letter} id={`letter-${letter}`} className="letter-anchor mb-10">
            {/* Letter header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="font-display text-5xl leading-none" style={{ color: 'rgba(232,197,71,0.95)' }}>{letter}</div>
              <div className="flex-1 h-px" style={{ background: 'rgba(212,168,67,0.22)' }} />
              <span className="font-mono-c text-[10px]" style={{ color: 'rgba(232,197,71,0.95)' }}>{terms.length}</span>
            </div>

            {/* Terms in this group */}
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(232,197,71,0.95)', background: '#0F0F0F' }}>
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
                        <span className="text-gray-200 text-xs truncate hidden sm:block" style={{ fontWeight: 300 }}>{t.full}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono-c border hidden sm:block" style={{ color: cs.color, background: cs.bg, borderColor: cs.border }}>
                          {t.cat}
                        </span>
                        <span className="font-mono-c text-base" style={{ color: isOpen ? '#E8C547' : '#E8C547' }}>
                          {isOpen ? '−' : '+'}
                        </span>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="slide-down px-6 pb-5 border-t" style={{ borderColor: 'rgba(212,168,67,0.22)' }}>
                        <div className="pt-4">
                          <div className="font-mono-c text-xs mb-3" style={{ color: 'rgba(232,197,71,0.95)' }}>{t.full}</div>
                          <p className="text-gray-200 text-sm leading-relaxed" style={{ fontWeight: 300 }}>{t.def}</p>
                          <div className="mt-3 flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono-c border" style={{ color: cs.color, background: cs.bg, borderColor: cs.border }}>
                              {t.cat}
                            </span>
                            <Link href="/courses" className="font-mono-c text-[10px] tracking-wider" style={{ color: 'rgba(232,197,71,0.95)' }}>
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
    </div>
  );
}