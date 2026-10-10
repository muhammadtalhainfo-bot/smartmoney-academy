'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TERMS = [
  { term: "AMD", full: "Accumulation, Manipulation, Distribution", cat: "ICT", def: "ICT's Power of Three (AMD) is a framework that some traders use to organize a possible sequence across sessions. It should not be assumed to repeat identically every day." },
  { term: "AR", full: "Asian Range", cat: "ICT", def: "The high-to-low range formed during the Asian trading session (8 PM–12 AM EST). The AR highs and lows become the primary liquidity targets for London's Judas Swing." },
  { term: "BB", full: "Breaker Block", cat: "ICT", def: "A failed Order Block that has flipped polarity. A bullish OB that price breaks through becomes a bearish Breaker Block (resistance). A PD Array concept that some ICT practitioners prioritize." },
  { term: "BE", full: "Break Even", cat: "ICT & SMC", def: "Moving your stop-loss to your exact entry price after a trade is in profit. Traders may use this to reduce potential loss, although execution risk and market conditions can still affect the outcome." },
  { term: "BISI", full: "Buy Side Imbalance Sell Side Inefficiency", cat: "ICT", def: "An ICT term associated with a bullish Fair Value Gap. Traders may study the imbalance as a reference area if price revisits it; it does not prove which participants caused the move or guarantee support." },
  { term: "BOS", full: "Break of Structure", cat: "ICT & SMC", def: "Price breaks a previously identified swing point in the direction of the structure being analyzed. ICT/SMC traders often use BOS as a continuation reference, but a break alone does not guarantee continuation. Bullish and bearish labels depend on the stated swing rules." },
  { term: "BPR", full: "Balanced Price Range", cat: "ICT", def: "The overlap zone between a bullish and bearish FVG. A confluence zone that some traders study as a potential reaction area." },
  { term: "BSL", full: "Buy Side Liquidity", cat: "ICT & SMC", def: "Areas above visible highs where an ICT trader may hypothesize that buy-stop or stop-loss orders could be concentrated. The actual orders and participant intent are not directly visible from a chart." },
  { term: "CBDR", full: "Central Bank Dealers Range", cat: "ICT", def: "The price range between 2:00–5:00 PM New York time used by some ICT traders as contextual input for the following day; any directional relationship should be tested." },
  { term: "CE", full: "Consequent Encroachment", cat: "ICT", def: "The 50% midpoint of a Fair Value Gap. Some ICT traders use this level as a more precise reference when studying FVG revisits; it is not a guaranteed reaction level." },
  { term: "ChoCH", full: "Change of Character", cat: "ICT & SMC", def: "Price breaks a previous swing in the OPPOSITE direction to the current trend — signals a potential reversal. Same as MSS." },
  { term: "CISD", full: "Change in State of Delivery", cat: "ICT", def: "A more advanced version of ChoCH/MSS. Within ICT terminology, this is interpreted as a shift in price delivery direction." },
  { term: "COT", full: "Commitment of Traders", cat: "ICT", def: "Weekly CFTC report showing the net positioning of large institutional traders. ICT uses COT for macro directional bias." },
  { term: "CRT", full: "Candle Range Theory", cat: "ICT", def: "An ICT framework interpretation that applies AMD-style analysis within a candle's range; treat the recurring-cycle claim as a model to test." },
  { term: "DOL", full: "Draw on Liquidity", cat: "ICT", def: "A potential price objective that ICT traders may identify before evaluating an entry; it is a framework concept, not a guaranteed target or reversal point." },
  { term: "Displacement", full: "Displacement Move", cat: "ICT & SMC", def: "A strong, aggressive impulse price movement with large-bodied candles and FVGs. Can be used as context for evaluating an Order Block; some traders interpret it as evidence of institutional activity, but that intent is not directly observable from price alone." },
  { term: "EQ", full: "Equilibrium", cat: "ICT & SMC", def: "The exact 50% Fibonacci level of any price range. Within this framework, traders may classify prices below EQ as discount and above EQ as premium; the labels do not by themselves determine a buy or sell." },
  { term: "EQH", full: "Equal Highs", cat: "ICT & SMC", def: "Two or more swing highs at approximately the same price level. A reference area that some traders study for potential liquidity interaction; a sweep or reversal is not guaranteed." },
  { term: "EQL", full: "Equal Lows", cat: "ICT & SMC", def: "Two or more swing lows at approximately the same price level. A reference area that some traders study for potential liquidity interaction; a sweep or reversal is not guaranteed." },
  { term: "ERL", full: "External Range Liquidity", cat: "ICT", def: "A framework label for liquidity/reference areas outside the current range; traders may study them as potential draw-on-liquidity targets." },
  { term: "FVG", full: "Fair Value Gap", cat: "ICT & SMC", def: "A three-candle price formation where the first candle's high and third candle's low do not overlap in a bullish example (with the inverse relationship in a bearish example). Traders interpret it as an imbalance reference; price may revisit it, but a fill is not guaranteed." },
  { term: "HH", full: "Higher High", cat: "ICT & SMC", def: "Each successive swing high is above the previous — defines a bullish trend structure." },
  { term: "HL", full: "Higher Low", cat: "ICT & SMC", def: "A swing low positioned above the prior swing low. It can support a bullish-structure interpretation, but does not by itself guarantee continuation." },
  { term: "HRLR", full: "High Resistance Liquidity Run", cat: "ICT", def: "A path to a liquidity target with substantial opposing price action. Traders may classify such paths as more difficult to trade, but probability depends on the defined setup and sample." },
  { term: "HTF", full: "Higher Time Frame", cat: "ICT & SMC", def: "Monthly, Weekly, Daily, and 4-Hour charts. Used for directional bias. HTF context is commonly given greater weight than LTF signals in this framework." },
  { term: "Hidden OB", full: "Hidden Order Block", cat: "ICT", def: "An ICT term for a PD Array that is easier to identify on a higher timeframe; the exact formation rules vary by source. It should be tested rather than assumed to be an extremely precise reaction zone." },
  { term: "IDM", full: "Inducement", cat: "ICT & SMC", def: "An ICT-style concept describing a possible move that may attract early entries or stops before a larger move. Treat it as a hypothesis to test rather than an assumption, and do not require it after every BOS." },
  { term: "IFVG", full: "Inversion Fair Value Gap", cat: "ICT", def: "An FVG that price has completely violated. It inverts polarity — a bullish IFVG becomes bearish resistance." },
  { term: "IOFED", full: "Institutional Order Flow Entry Drill", cat: "ICT", def: "An ICT entry-drill framework that studies FVG mitigation and directional context. The chart alone cannot confirm institutional order flow, so define the rules and test outcomes." },
  { term: "IOF", full: "Institutional Order Flow", cat: "ICT", def: "An ICT-style interpretation of directional bias and price movement. References to institutional buying or selling are interpretations of the framework, not directly observable facts from a chart." },
  { term: "IPDA", full: "Interbank Price Delivery Algorithm", cat: "ICT", def: "A theoretical model in ICT education used to interpret price behavior around liquidity and time-based references; it should not be treated as independently verified market mechanics." },
  { term: "IRL", full: "Internal Range Liquidity", cat: "ICT", def: "A framework label for liquidity/reference areas inside the current range, including areas some traders associate with FVGs or other PD arrays." },
  { term: "ITH", full: "Intermediate Term High", cat: "ICT", def: "A swing high positioned between two short-term highs. More significant than STH." },
  { term: "ITL", full: "Intermediate Term Low", cat: "ICT", def: "A swing low positioned between two short-term lows. More significant than STL." },
  { term: "Judas Swing", full: "Judas Swing", cat: "ICT", def: "An ICT-style concept describing a possible directional move during the London Killzone that may sweep Asian-range liquidity before a later move." },
  { term: "Killzone", full: "ICT Kill Zone", cat: "ICT", def: "Defined time windows used in ICT education to focus analysis and execution. Commonly cited windows include Asian (8PM–12AM), London (2–5AM), NY AM (7–10AM), and London Close (10AM–12PM) New York time; verify the chart timezone and daylight-saving date." },
  { term: "LH", full: "Lower High", cat: "ICT & SMC", def: "Each successive swing high is below the previous — defines a bearish trend structure." },
  { term: "LL", full: "Lower Low", cat: "ICT & SMC", def: "Each successive swing low is below the previous — confirms bearish trend continuation." },
  { term: "LP", full: "Liquidity Pool", cat: "ICT", def: "A chart area where traders may hypothesize that stop-loss or other resting orders could cluster, often around visible highs/lows and similar reference levels." },
  { term: "LRLR", full: "Low Resistance Liquidity Run", cat: "ICT", def: "A clean, unobstructed path to a liquidity target with minimal opposing price action. Often described within ICT education as a cleaner path than HRLR; this is a framework preference, not a guarantee." },
  { term: "LTF", full: "Lower Time Frame", cat: "ICT & SMC", def: "1-Minute, 5-Minute, 15-Minute charts. Used for precision trade entry and LTF confirmation." },
  { term: "LTH", full: "Long Term High", cat: "ICT", def: "A major structural high defined by the chosen swing rules, with lower intermediate-term highs on both sides. Some ICT traders monitor it as a possible buy-side liquidity reference, not a guaranteed target." },
  { term: "LTL", full: "Long Term Low", cat: "ICT", def: "A major structural low defined by the chosen swing rules, with higher intermediate-term lows on both sides. Some ICT traders monitor it as a possible sell-side liquidity reference, not a guaranteed target." },
  { term: "Macro", full: "ICT Macro Time", cat: "ICT", def: "Short time windows that some ICT traders study within Killzones for recurring market behavior. Commonly cited examples include London 2:33–3AM and 4:03–4:30AM; NY AM 8:50–9:10, 9:50–10:10, and 10:50–11:10; Lunch 11:50AM–12:10PM; PM 1:10–1:40PM; and Last Hour 3:15–3:45PM. These schedules are framework conventions, not evidence of a directly observable algorithmic process." },
  { term: "MB", full: "Mitigation Block", cat: "ICT", def: "An ICT label for a price area associated with a previously failed order block. Explanations about which institutions exited positions are interpretations, not facts observable from the chart; traders may study the area as a potential reference." },
  { term: "MMBM", full: "Market Maker Buy Model", cat: "ICT", def: "An ICT framework describing a possible accumulate → manipulate (SSL sweep) → rally sequence. Use it as a scenario to compare with observed price behavior, not as a required weekly or daily sequence." },
  { term: "MMSM", full: "Market Maker Sell Model", cat: "ICT", def: "An ICT framework describing a possible accumulate → manipulate (BSL sweep) → decline sequence. It is a bearish counterpart to MMBM, but neither sequence is guaranteed to occur." },
  { term: "MSS", full: "Market Structure Shift", cat: "ICT", def: "Same as ChoCH — the initial price break opposite to the current trend. First warning sign of a potential reversal." },
  { term: "MT", full: "Mean Threshold", cat: "ICT", def: "The 50% midpoint of an Order Block's body (open to close, wicks excluded). Some ICT traders use it as a reference within an OB; it is not a guaranteed entry level." },
  { term: "NDOG", full: "New Day Opening Gap", cat: "ICT", def: "A gap measured between the previous day's close and the selected new-day open convention. Some traders monitor it as an intraday reference; whether price revisits or reacts to it should be tested." },
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
  { term: "SSL", full: "Sell Side Liquidity", cat: "ICT & SMC", def: "A chart reference area below visible lows, equal lows, prior-day/week lows or round-number levels where some ICT traders hypothesize sell-stop orders may be concentrated. Actual orders and participant intent are not directly observable, and movement through the area does not guarantee a reversal." },
  { term: "STH", full: "Short Term High", cat: "ICT", def: "A basic swing high on your trading timeframe. Lowest tier of market structure significance." },
  { term: "STL", full: "Short Term Low", cat: "ICT", def: "A basic swing low on your trading timeframe. Lowest tier of significance." },
  { term: "Suspension Block", full: "Suspension Block", cat: "ICT", def: "A newer ICT concept associated with recent ICT material. Forms when price creates a gap and suspends at a specific price; the suspension price is treated as a potential PD Array." },
  { term: "TGIF", full: "Thank God It's Friday", cat: "ICT", def: "A Friday-related ICT framework that some traders use to study potential reversal or retracement behavior; Friday outcomes vary by market and conditions." },
  { term: "Turtle Soup", full: "ICT Turtle Soup Strategy", cat: "ICT", def: "An ICT-style framework that studies a possible failed breakout around a reference high or low. Entry rules vary; a move through the level and subsequent reversal do not establish intent or guarantee a reversal trade." },
  { term: "Unicorn Model", full: "ICT Unicorn Model", cat: "ICT", def: "A setup framework that combines an Order Block and Fair Value Gap at the same zone; whether the combination improves outcomes should be tested. OB = institutional context. FVG = precise entry. The combined concepts are often used as confluence." },
  { term: "Venom Model", full: "ICT Venom Trading Model", cat: "ICT", def: "A later ICT model building on AMD and the 2022 framework, with refinements to entry triggers." },
  { term: "Weekly Profiles", full: "ICT Weekly Range Profiles", cat: "ICT", def: "ICT's 5 weekly price delivery patterns: Classic, Consolidation, Expansion, Reversal, and Balanced. Used as a framework for studying potential weekly price-delivery patterns." },
  { term: "2022 Model", full: "ICT 2022 Trading Model", cat: "ICT", def: "ICT's 5-step trade framework: ① HTF Bias → ② Draw on Liquidity → ③ Wait for Killzone → ④ LTF Entry (Judas → ChoCH → FVG/OB) → ⑤ Trade Management. A five-step ICT trading framework." },
  { term: "2024 Mentorship", full: "ICT 2024 Mentorship Concepts", cat: "ICT", def: "Historical 2024 mentorship material covering New Day Opening Gap, Asian Range Strategy, post-7 AM price delivery, and macro-level time analysis refinements." },

  { term: "Accumulation", full: "Accumulation Phase", cat: "ICT", def: "The first phase in the AMD (Accumulation, Manipulation, Distribution) framework, often described as a period of range formation. The chart does not show which participants are accumulating, and the range need not precede a specific directional move." },
  { term: "Algorithm", full: "Trading Algorithm / IPDA", cat: "ICT", def: "A term used in ICT education for a theoretical price-delivery model. The label does not establish the existence or operation of a specific algorithm from chart data alone." },
  { term: "Balanced Price Range", full: "BPR", cat: "ICT", def: "An area where opposing Fair Value Gaps overlap. Some traders study the overlap as a potential reaction reference, but it does not predict that consolidation or an explosive move must follow." },
  { term: "CE", full: "Consequent Encroachment", cat: "ICT", def: "The exact 50% midpoint level of a Fair Value Gap. A commonly studied 50% reference point within an FVG; its usefulness should be evaluated with the chosen rules and market. -- often where precise LTF entries are taken." },
  { term: "Dealing Range", full: "Dealing Range / DR", cat: "ICT", def: "Price range between significant swing high and low. Exists at every timeframe, nested inside each other. Defines premium (above 50%) and discount (below 50%) zones." },
  { term: "Distribution", full: "Distribution Phase", cat: "ICT", def: "The third phase of the AMD framework, commonly described as distribution; specific market behavior can vary." },
  { term: "ERL", full: "External Range Liquidity", cat: "ICT", def: "Liquidity sitting outside the current dealing range -- above swing highs (BSL) or below swing lows (SSL). A potential external liquidity target within the ICT framework." },
  { term: "IFVG", full: "Implied Fair Value Gap", cat: "ICT", def: "A term used for an FVG that has been violated and is interpreted with the opposite polarity. Some ICT traders study it as a potential reference; it does not by itself prove manipulation or guarantee a reaction." },
  { term: "IPDA", full: "Interbank Price Delivery Algorithm", cat: "ICT", def: "A theoretical ICT concept used to interpret price movement through time and liquidity references. The concept does not independently verify that a specific algorithm controls price or follows a fixed delivery process." },
  { term: "IRL", full: "Internal Range Liquidity", cat: "ICT", def: "A framework label for potential liquidity references inside a dealing range, such as selected FVGs, order blocks or gaps. Traders may use IRL and ERL to organize entry scenarios and target hypotheses, but neither role is automatic." },
  { term: "MMBM", full: "Market Maker Buy Model", cat: "ICT", def: "An ICT bullish framework that organizes a possible accumulate → manipulate (SSL sweep) → rally toward BSL sequence. Treat the narrative as a hypothesis and define the conditions that would invalidate it." },
  { term: "MMSM", full: "Market Maker Sell Model", cat: "ICT", def: "An ICT bearish framework that organizes a possible accumulate → manipulate (BSL sweep) → decline toward SSL sequence. Treat the narrative as a hypothesis and define the conditions that would invalidate it." },
  { term: "Reclaimed OB", full: "Reclaimed Order Block", cat: "ICT", def: "An Order Block initially violated by price that price later returns to and trades back inside. Some traders study the reclaim as relevant context, but its original institutional role is not directly observable or guaranteed to reassert." },
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
            Every term from ICT&apos;s YouTube channel and mentorship series. The complete reference — no fluff.
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
              <button type="button" aria-label="Clear glossary search" onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 font-mono-c text-xs" style={{ color: 'rgba(232,197,71,0.95)' }}>✕</button>
            )}
          </div>
          {/* Filters */}
          <div className="flex items-center gap-2">
            {CATS.map(cat => (
              <button
                type="button"
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
            <p className="font-mono-c text-xs" style={{ color: '#E8C547' }}>No terms match &quot;{search}&quot;</p>
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
                      type="button"
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