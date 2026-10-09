'use client';
// Production build checkpoint

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TOPICS = [
  {
    id: 1, step: 1, stepName: "Learn the Language",
    title: "What is Trading?",
    icon: "📈",
    explanation: "Trading is the act of buying and selling financial assets — currencies, stocks, commodities, or indices — with the goal of making a profit from price movements. Unlike investing, trading focuses on short-term price changes.",
    example: "You believe EUR/USD will rise. You BUY at 1.0800. Price moves to 1.0850. You SELL and pocket the 50 pip profit.",
    remember: "Trading is speculation on price direction — up (Long) or down (Short).",
    color: "#34D399"
  },
  {
    id: 2, step: 1, stepName: "Learn the Language",
    title: "Markets: Forex, Indices, Gold, Crypto",
    icon: "🌍",
    explanation: "Forex = currency pairs (EURUSD, GBPUSD). Indices = stock market baskets (NAS100, US30). Gold = precious metal (XAUUSD). Crypto = digital assets (BTCUSD). Each market has different characteristics, volatility, and session times.",
    example: "NAS100 tracks the top 100 tech companies. When Apple, Google, and Microsoft move up, NAS100 rises. ICT focuses mainly on NAS100 and Gold.",
    remember: "Start with one market. Most ICT traders focus on NAS100, Gold, or major Forex pairs like EURUSD.",
    color: "#818CF8"
  },
  {
    id: 3, step: 2, stepName: "Read the Chart",
    title: "Chart Types",
    icon: "📊",
    explanation: "Line charts show closing prices. Bar charts show OHLC (Open, High, Low, Close). Candlestick charts show the full story of each period visually. Candlestick charts are commonly used by ICT traders.",
    example: "A 15-minute candlestick shows exactly what happened in that 15 minutes: where price opened, where it went highest, lowest, and where it closed.",
    remember: "Candlestick charts are a useful default because they show open, high, low, and close in one visual.",
    color: "#E8C547"
  },
  {
    id: 4, step: 2, stepName: "Read the Chart",
    title: "Candlestick Anatomy",
    icon: "🕯️",
    explanation: "Every candle has a Body (open to close) and Wicks/Shadows (high and low extremes). A green/white candle = closed HIGHER than it opened (bullish). A red/black candle = closed LOWER than it opened (bearish). The wick shows how far price explored beyond the body.",
    example: "A candle opens at 100, rises to 105 (upper wick), drops to 98 (lower wick), and closes at 103. Body = 100-103. Upper wick = 103-105. Lower wick = 98-100.",
    remember: "Long wicks can show rejection or movement through a reference level; infer a liquidity sweep only when your predefined criteria are met. Candle bodies and wicks provide different information and should be interpreted in context.",
    color: "#F59E0B"
  },
  {
    id: 5, step: 2, stepName: "Read the Chart",
    title: "Timeframes",
    icon: "⏱️",
    explanation: "Timeframes determine how much time each candle represents. Monthly (MN), Weekly (W), Daily (D), 4-Hour (H4), 1-Hour (H1), 15-Minute (M15), 5-Minute (M5), 1-Minute (M1). Higher timeframes show the big picture. Lower timeframes show entry precision.",
    example: "A bullish daily candle might contain dozens of bearish 5-minute candles inside it. The daily bias is up, but intraday you'll see pullbacks.",
    remember: "A top-down sequence such as Daily → 4H → 1H → 15M → 5M → 1M is one framework for organizing context; adapt and test the timeframes that fit your strategy. Use higher-timeframe context before relying on lower-timeframe signals.",
    color: "#C084FC"
  },
  {
    id: 6, step: 1, stepName: "Learn the Language",
    title: "Pips & Pip Value",
    icon: "💹",
    explanation: "A pip is the smallest price movement in a currency pair. For most pairs (EURUSD), 1 pip = 0.0001. For JPY pairs, 1 pip = 0.01. Pip value depends on your lot size and account currency.",
    example: "EURUSD moves from 1.0800 to 1.0850 = 50 pips. With 1 standard lot ($100,000), each pip = $10. So 50 pips = $500 profit.",
    remember: "Pip value formula: (0.0001 / Exchange Rate) × Lot Size × 100,000. Use a pip calculator for exact values.",
    color: "#34D399"
  },
  {
    id: 7, step: 1, stepName: "Learn the Language",
    title: "Lots & Position Sizing",
    icon: "📦",
    explanation: "A lot is the standardized unit of trading. Standard Lot = 100,000 units. Mini Lot = 10,000 units. Micro Lot = 1,000 units. Nano Lot = 100 units. Beginners should trade micro lots until consistent.",
    example: "Account: $1,000. For illustration, a $1,000 account with a 1% predefined risk limit would risk $10 on the trade. SL = 20 pips. Pip value at 0.01 lots = $0.10. $10 ÷ (20 × $0.10) = 5 micro lots (0.05 lots).",
    remember: "Avoid sizing by feel. Calculate position size from your predefined risk amount and stop distance using the appropriate instrument specification.",
    color: "#F87171"
  },
  {
    id: 8, step: 1, stepName: "Learn the Language",
    title: "Leverage Explained Simply",
    icon: "⚡",
    explanation: "Leverage lets you control a large position with a small deposit. 1:100 leverage means $1,000 controls $100,000. This amplifies both profits AND losses. High leverage = high risk.",
    example: "With $1,000 and 1:100 leverage, you can open a $100,000 trade. A 1% move = $1,000 gain OR loss. That's your entire account in one trade.",
    remember: "Leverage is a tool, not a strategy. Use leverage conservatively and understand the potential loss before trading live.",
    color: "#F59E0B"
  },
  {
    id: 9, step: 1, stepName: "Learn the Language",
    title: "Spread, Slippage & Commission",
    icon: "💰",
    explanation: "Spread = the difference between Buy (Ask) and Sell (Bid) price. This is the broker's fee. Slippage = price difference between your intended entry and actual fill. Commission = fixed fee per trade on some account types.",
    example: "EURUSD Bid = 1.0800, Ask = 1.0802. Spread = 2 pips. You buy at 1.0802 and immediately need 2 pip profit just to break even.",
    remember: "Lower spread = lower cost. ECN accounts have tighter spreads + commission. Standard accounts have wider spreads, no commission.",
    color: "#818CF8"
  },
  {
    id: 10, step: 1, stepName: "Learn the Language",
    title: "Buy, Sell, Bid & Ask",
    icon: "↕️",
    explanation: "BID = price you can SELL at. ASK = price you can BUY at. Going Long = BUYing, expecting price to rise. Going Short = SELLing, expecting price to fall. The spread is the gap between Bid and Ask.",
    example: "GBPUSD: Bid 1.2650 / Ask 1.2652. You go Long (buy) at 1.2652. Price rises to 1.2700. You close (sell) at bid 1.2700. Profit = 48 pips.",
    remember: "You always BUY at the higher price (Ask) and SELL at the lower price (Bid). The spread is your immediate loss on entry.",
    color: "#E8C547"
  },
  {
    id: 11, step: 3, stepName: "Understand Risk",
    title: "Stop Loss & Take Profit",
    icon: "🛡️",
    explanation: "A Stop Loss (SL) is an order intended to trigger an exit at a defined price level; the final fill can differ during gaps, slippage or fast markets. A Take Profit (TP) is an order intended to close at a target level, but execution can also vary. Define your loss controls and account exposure before entry.",
    example: "For illustration, a EURUSD entry at 1.0800 with a stop level at 1.0780 and a target at 1.0860 plans for 20 pips of price risk and 60 pips of potential reward (1:3 before costs). Actual fills can differ because of spread, slippage or gaps, so realized results may not equal the plan.",
    remember: "Consider defining and placing a stop or other explicit loss-control method before entry when appropriate to the strategy. Risk controls should reflect the account and instrument.",
    color: "#F87171"
  },
  {
    id: 12, step: 3, stepName: "Understand Risk",
    title: "Risk-to-Reward Ratio",
    icon: "⚖️",
    explanation: "R:R compares your potential loss to your potential gain. 1:2 R:R = risk $100 to make $200. A 1:2 R:R setup can be profitable at a 40% win rate in a simplified example before costs, provided the assumptions hold over a sufficiently large sample. Some ICT traders use higher reward-to-risk targets, but there is no universal minimum that applies to every setup.",
    example: "10 trades at 1:2 R:R. Win 4, lose 6. Wins: 4 × $200 = $800. Losses: 6 × $100 = $600. Net profit: $200 with only 40% win rate!",
    remember: "A strategy's expectancy depends on both win rate and average win/loss size, along with costs and execution. R:R by itself does not guarantee profitability.",
    color: "#34D399"
  },
  {
    id: 13, step: 3, stepName: "Understand Risk",
    title: "Risk Management (The Most Important Topic)",
    icon: "🔐",
    explanation: "Risk management is the difference between a trader who survives and one who blows accounts. Set a predefined risk limit that fits your account, strategy, and tolerance; never risk money you cannot afford to lose. Risk management protects your capital so you can trade another day.",
    example: "$10,000 account. 1% risk = $100 max per trade. Even 10 losses in a row only costs $1,000 (10%). Recovery is possible. Risk 10% per trade = 10 losses = account gone.",
    remember: "Protect the downside first. The upside takes care of itself. Preserving capital gives you more opportunity to learn and evaluate your process over time.",
    color: "#F87171"
  },
  {
    id: 14, step: 3, stepName: "Understand Risk",
    title: "Account: Balance, Equity & Margin",
    icon: "🏦",
    explanation: "Balance = deposited funds + closed P&L. Equity = Balance + open trade P&L (changes in real-time). Margin = collateral held by broker for open trades. Free Margin = Equity - Margin Used. Margin Call = equity too low to hold positions.",
    example: "Balance: $5,000. Open trade losing $200. Equity = $4,800. Broker holds $500 margin. Free margin = $4,300 available for new trades.",
    remember: "Monitor equity, margin usage, and broker liquidation rules so open losses do not create an unacceptable risk of forced closure.",
    color: "#C084FC"
  },
  {
    id: 15, step: 2, stepName: "Read the Chart",
    title: "Trading Sessions & Why Time Matters",
    icon: "🕐",
    explanation: "Markets have 3 main sessions: Asian (8PM-12AM EST), London (2AM-5AM EST), New York AM (7AM-12PM EST). Each session has different volatility and characteristics. Session activity varies by instrument and market conditions; London-New York overlap is often actively traded.",
    example: "EURUSD barely moves during Asian session. London open at 2AM creates the first big move. NY open at 9:30AM creates peak volatility. This is when ICT setups form.",
    remember: "Only trade during active sessions. Trading during dead hours (NY lunch, late Asian) gives poor results. Time and session context can be useful variables to test in a trading plan.",
    color: "#818CF8"
  },
  {
    id: 16, step: 4, stepName: "Practice Market Structure",
    title: "Basic Market Structure",
    icon: "🏗️",
    explanation: "In a common swing-structure definition, an uptrend forms higher highs (HH) and higher lows (HL), while a downtrend forms lower highs (LH) and lower lows (LL). ICT/SMC traders often use a Break of Structure (BOS) as a continuation reference and a Change of Character (CHoCH) as a possible shift in behavior; neither label guarantees the next move.",
    example: "Price makes HH at 100, pulls back to HL at 95, rallies to new HH at 105. This is a healthy uptrend. If price then breaks below 95 (the HL), structure has shifted bearish.",
    remember: "Market structure is the foundation of everything. Before any trade, ask: what is the current structure and where is it likely going next?",
    color: "#E8C547"
  },
  {
    id: 17, step: 4, stepName: "Practice Market Structure",
    title: "Support & Resistance",
    icon: "🧱",
    explanation: "Support and resistance are price areas where the market has previously paused, rejected or changed direction. They are reference levels, not guaranteed floors or ceilings. In ICT, some traders also study nearby highs and lows as potential liquidity areas, but the exact orders present cannot be confirmed from a chart alone.",
    example: "Price bounces off 1.0800 three times. That may be evidence of a historically watched level. Some ICT interpretations treat nearby highs/lows as potential liquidity areas, but the location and size of resting orders cannot be known from the chart alone.",
    remember: "Traditional support and resistance can be studied alongside ICT liquidity concepts. Some ICT traders look for a sweep below support before considering a long setup, but a sweep or reversal is not guaranteed.",
    color: "#F59E0B"
  },
  {
    id: 18, step: 4, stepName: "Practice Market Structure",
    title: "Trend vs Range",
    icon: "📉",
    explanation: "Trending market = price making consistent directional movement (HH/HL or LH/LL). Ranging market = price bouncing between two levels without clear direction. Different strategies work in different conditions.",
    example: "NAS100 in an uptrend: buy pullbacks to FVGs and Order Blocks. NAS100 in a range: trade reversals at range extremes. Misreading this is a common beginner mistake.",
    remember: "Trend context can help organize a trade idea, but it does not guarantee continuation. Define what would confirm or invalidate your daily-bias hypothesis, and allow for neutral or conflicting conditions.",
    color: "#34D399"
  },
  {
    id: 19, step: 4, stepName: "Practice Market Structure",
    title: "Liquidity in Simple Language",
    icon: "💧",
    explanation: "Liquidity refers to chart areas where traders may hypothesize that stop-loss or other resting orders could cluster. Equal highs and lows are commonly studied as potential liquidity areas; the actual location and size of orders cannot be known from the chart alone.",
    example: "Price makes three equal highs at 100. Traders may hypothesize that some orders are clustered above the highs, but the chart does not reveal the number or type of orders present. One possible liquidity-sweep interpretation is that price moves above the level, interacts with orders, and then reverses; evaluate this against observed data rather than assuming the outcome.",
    remember: "ICT-style liquidity concepts focus on areas where orders may cluster; a sweep is a potential scenario, not a guaranteed future path.",
    color: "#818CF8"
  },
  {
    id: 20, step: 5, stepName: "Move into ICT & SMC",
    title: "What is ICT? (Simple Version)",
    icon: "🎓",
    explanation: "ICT (Inner Circle Trader) is a trading methodology taught by Michael J. Huddleston. It uses concepts around time, price, liquidity and market structure to frame chart analysis; these concepts should be treated as educational frameworks rather than verified descriptions of how markets are mechanically delivered.",
    example: "Instead of relying only on traditional support/resistance, ICT education studies liquidity, time windows and price-delivery concepts such as Fair Value Gaps and Order Blocks. These are interpretations to test rather than proof of institutional objectives.",
    remember: "ICT is a framework for organizing chart observations and hypotheses about price behavior, not a guarantee of why price moves. Start with the 2022 Mentorship after mastering these foundations.",
    color: "#E8C547"
  },
  {
    id: 21, step: 5, stepName: "Move into ICT & SMC",
    title: "What is SMC? (Simple Version)",
    icon: "💡",
    explanation: "Smart Money Concepts (SMC) is a broad community framework that overlaps with ICT teaching. It includes Order Blocks, Fair Value Gaps, Break of Structure and Change of Character. Terminology and identification rules vary among educators, so define the specific rules you intend to study.",
    example: "An SMC trader sees price break structure upward, pull back to an Order Block (the last bearish candle before the bullish move), and enters long. ICT adds the time and liquidity dimension to this.",
    remember: "SMC and ICT share many terms but are not one universal rulebook. Compare definitions carefully and choose a consistent framework before backtesting.",
    color: "#C084FC"
  },
  {
    id: 22, step: 6, stepName: "Common Mistakes & Psychology",
    title: "Trading Psychology Basics",
    icon: "🧠",
    explanation: "Fear causes early exits. Greed causes held losses. Revenge trading after a loss causes blown accounts. Overconfidence after wins causes oversizing. These emotional patterns destroy more accounts than bad strategies.",
    example: "You win 5 trades. You feel invincible. You 3x your position size. One loss wipes out all 5 wins. This is the classic greed cycle that destroys beginner traders.",
    remember: "Use a predefined sizing method rather than changing size impulsively after wins or losses; process consistency does not guarantee consistent results.",
    color: "#F87171"
  },
  {
    id: 23, step: 6, stepName: "Common Mistakes & Psychology",
    title: "Overtrading & Revenge Trading",
    icon: "⛔",
    explanation: "Overtrading = taking too many setups, forcing trades when conditions aren't right. Revenge trading = entering immediately after a loss to 'get it back'. Both lead to account destruction faster than any bad strategy.",
    example: "You lose $200. You immediately open 3 new trades to recover. All 3 hit stop loss. Now you're down $800 in one session. This is revenge trading.",
    remember: "After a loss, close the platform. Take a walk. Come back only when calm. Your next trade must be as calculated as your first.",
    color: "#F59E0B"
  },
  {
    id: 24, step: 6, stepName: "Common Mistakes & Psychology",
    title: "Common Beginner Mistakes",
    icon: "🚫",
    explanation: "1) Trading without a stop loss. 2) Risking too much per trade. 3) Trading during low-volume sessions. 4) Chasing price after a big move. 5) Moving stop loss further away when losing. 6) Not keeping a journal. 7) Jumping between strategies constantly.",
    example: "The biggest killer: moving your SL further away because you 'know' price will come back. This turns a 1% loss into a 5% or 10% loss. Avoid widening a stop impulsively; if the strategy permits stop adjustments, define the rules before trading.",
    remember: "A stop-loss level helps define planned risk, but gaps and slippage can make the realized loss larger than expected. Do not widen a stop impulsively; if adjustments are permitted by your strategy, define the rules before the trade.",
    color: "#F87171"
  },
  {
    id: 25, step: 6, stepName: "Practice & Review",
    title: "How to Practice (Demo First)",
    icon: "🎯",
    explanation: "Demo trading = real market conditions, fake money. Use demo practice long enough to evaluate execution, risk, and consistency before risking meaningful capital. Use a sufficiently broad, relevant demo sample before risking meaningful capital; there is no universal trade-count threshold that guarantees readiness. Track every trade in a journal. Screenshot entries and exits.",
    example: "Use TradingView for chart analysis. MT4/MT5 for demo trading. Keep a spreadsheet: date, pair, entry, SL, TP, result, what you saw, what you learned.",
    remember: "Treat demo money like real money. If you don't respect demo, you won't respect live. Practice with discipline or the live market will teach you a painful lesson.",
    color: "#34D399"
  },
];

const STEPS = [
  { id: 1, name: "Learn the Language", desc: "Understand trading fundamentals, markets, and terminology", color: "#34D399", icon: "📖" },
  { id: 2, name: "Read the Chart", desc: "Master candlesticks, timeframes, and chart reading", color: "#818CF8", icon: "📊" },
  { id: 3, name: "Understand Risk", desc: "Risk management, position sizing, and capital protection", color: "#F87171", icon: "🛡️" },
  { id: 4, name: "Practice Market Structure", desc: "Structure, S/R, trends, and liquidity basics", color: "#E8C547", icon: "🏗️" },
  { id: 5, name: "Move into ICT & SMC", desc: "Introduction to institutional concepts and smart money", color: "#C084FC", icon: "🎓" },
  { id: 6, name: "Psychology & Common Mistakes", desc: "Mental game, common errors, and how to practice", color: "#F59E0B", icon: "🧠" },
];

export default function FoundationsPage() {
  const [activeStep, setActiveStep] = useState('All');
  const [expandedId, setExpandedId] = useState(1);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    // Remove welcome param from URL for SEO consistency
    if (window.location.search.includes('welcome=')) {
      window.history.replaceState({}, '', '/foundations');
    }
    try {
      const saved = localStorage.getItem('foundations_completed');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate client-only completion state
          if (Array.isArray(parsed)) setCompleted(parsed);
        } catch {
          try { localStorage.removeItem('foundations_completed'); } catch {}
        }
      }
    } catch {}
  }, []);

  const toggleCompleted = (id) => {
    const updated = completed.includes(id)
      ? completed.filter(c => c !== id)
      : [...completed, id];
    setCompleted(updated);
    try { localStorage.setItem('foundations_completed', JSON.stringify(updated)); } catch {}
  };

  const filtered = useMemo(() => activeStep === 'All' ? TOPICS : TOPICS.filter(t => t.step === parseInt(activeStep)), [activeStep]);
  const pct = Math.round((completed.length / TOPICS.length) * 100);
  const mono = { fontFamily: 'DM Mono, monospace' };

  const isWelcome = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('welcome') === '1';

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

        * { box-sizing: border-box; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .topic-card { transition: all 0.2s ease; cursor: pointer; }
        .topic-card:hover { transform: translateY(-2px); }
        .step-btn { transition: all 0.15s; cursor: pointer; }
        .progress-bar { background: rgba(212,168,67,0.22); border-radius: 99px; overflow: hidden; height: 8px; }
        .progress-fill { background: linear-gradient(90deg, #8A6B28, #E8C547, #F0C96A); height: 8px; border-radius: 99px; transition: width 1s ease; }
        .btn-gold { background: linear-gradient(135deg, #E8C547, #F0C96A); color: #080808; font-weight: 700; transition: all 0.2s; }
        .btn-gold:hover { transform: translateY(-1px); box-shadow: 0 8px 24px #E8C547; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E8C547; border-radius: 4px; }
      `}</style>

      <Navbar active="/foundations" />

      {/* Welcome banner for new signups */}
      {isWelcome && (
        <div style={{ background: 'linear-gradient(135deg, rgba(52,211,153,0.1), rgba(52,211,153,0.05))', borderBottom: '1px solid rgba(52,211,153,0.2)', padding: '14px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px' }}>🎉</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#34D399', fontWeight: 700 }}>Welcome to ICT Flow! </span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>Start here — complete Trading Foundations before jumping into ICT modules.</span>
            </div>
            <a href="/courses" style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#34D399', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '7px', padding: '6px 14px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Skip to Courses →
            </a>
          </div>
        </div>
      )}

      {/* Hero */}
      <section style={{ padding: '80px 24px 64px', borderBottom: '1px solid rgba(232,197,71,0.95)', background: 'linear-gradient(180deg, #111111 0%, #080808 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ ...mono, fontSize: '11px', color: '#E8C547', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>{'// Step 0 — Before ICT & SMC'}</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 1, marginBottom: '20px', letterSpacing: '0.02em' }}>
            <span style={{ display: 'block', color: 'white' }}>TRADING</span>
            <span style={{ display: 'block', background: 'linear-gradient(135deg, #8A6B28, #E8C547, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FOUNDATIONS</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.6)', maxWidth: '580px', lineHeight: 1.7, fontWeight: 300, marginBottom: '12px' }}>
            Start from zero. Learn the real basics before touching ICT, SMC, or any advanced strategy. This is a foundation for understanding trading mechanics, risk, and disciplined practice.
          </p>
          <p style={{ ...mono, fontSize: '11px', color: 'rgba(232,197,71,0.95)', marginBottom: '36px', letterSpacing: '0.05em' }}>
            Complete this before starting the ICT 2022 Mentorship or any module
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button type="button" onClick={() => { setActiveStep('All'); document.getElementById('topics').scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-gold" style={{ padding: '14px 28px', borderRadius: '12px', ...mono, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              Start Beginner Journey →
            </button>
            <Link href="/glossary" style={{ padding: '14px 28px', borderRadius: '12px', ...mono, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid #E8C547', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              View Trading Glossary
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            {[
              { value: '25', label: 'Topics Covered' },
              { value: '6', label: 'Learning Steps' },
              { value: `${completed.length}/${TOPICS.length}`, label: 'Completed' },
              { value: `${pct}%`, label: 'Progress' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display" style={{ fontSize: '38px', color: '#E8C547', lineHeight: 1 }}>{s.value}</div>
                <div style={{ ...mono, fontSize: '10px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress bar */}
      <div style={{ background: '#0A0A0A', borderBottom: '1px solid rgba(212,168,67,0.22)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ ...mono, fontSize: '10px', color: '#E8C547', letterSpacing: '0.12em' }}>YOUR FOUNDATION PROGRESS</span>
            <span style={{ ...mono, fontSize: '10px', color: '#E8C547' }}>{completed.length} of {TOPICS.length} topics completed</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>

      {/* Roadmap Steps */}
      <section style={{ padding: '48px 24px', background: '#080808', borderBottom: '1px solid rgba(212,168,67,0.22)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ ...mono, fontSize: '10px', color: 'rgba(232,197,71,0.95)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>{'// Learning Roadmap'}</div>
          <h2 className="font-display" style={{ fontSize: '42px', color: 'white', marginBottom: '32px' }}>YOUR PATH TO MASTERY</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px), 1fr))', gap: '16px' }}>
            {STEPS.map((step, i) => {
              const stepTopics = TOPICS.filter(t => t.step === step.id);
              const stepCompleted = stepTopics.filter(t => completed.includes(t.id)).length;
              const isActive = activeStep === String(step.id);
              return (
                <button type="button" key={step.id} aria-pressed={isActive} onClick={() => setActiveStep(isActive ? 'All' : String(step.id))}
                  className="step-btn"
                  style={{ background: isActive ? `${step.color}10` : '#111111', border: `1px solid ${isActive ? step.color + '40' : 'rgba(255,255,255,0.15)'}`, borderRadius: '14px', padding: '20px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{step.icon}</span>
                    <span style={{ ...mono, fontSize: '10px', color: step.color, letterSpacing: '0.1em' }}>STEP {step.id}</span>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'white', marginBottom: '6px' }}>{step.name}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 300, marginBottom: '12px', lineHeight: 1.5 }}>{step.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '99px', height: '4px', marginRight: '10px', overflow: 'hidden' }}>
                      <div style={{ width: `${(stepCompleted / stepTopics.length) * 100}%`, height: '4px', background: step.color, borderRadius: '99px', transition: 'width 0.8s' }} />
                    </div>
                    <span style={{ ...mono, fontSize: '9px', color: step.color, whiteSpace: 'nowrap' }}>{stepCompleted}/{stepTopics.length}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section id="topics" style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ ...mono, fontSize: '10px', color: 'rgba(232,197,71,0.95)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4px' }}>{'// Topics'}</div>
              <h2 className="font-display" style={{ fontSize: '36px', color: 'white' }}>{activeStep === 'All' ? 'ALL TOPICS' : `STEP ${activeStep}: ${STEPS[parseInt(activeStep)-1]?.name.toUpperCase()}`}</h2>
            </div>
            <button type="button" onClick={() => setActiveStep('All')} style={{ ...mono, fontSize: '11px', color: '#E8C547', background: 'transparent', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer' }}>
              Show All →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(topic => {
              const isDone = completed.includes(topic.id);
              const isOpen = expandedId === topic.id;
              const step = STEPS[topic.step - 1];

              return (
                <div key={topic.id} className="topic-card"
                  style={{ background: isDone ? 'rgba(52,211,153,0.03)' : '#111111', border: `1px solid ${isDone ? 'rgba(52,211,153,0.2)' : `${topic.color}20`}`, borderRadius: '16px', overflow: 'hidden' }}>

                  {/* Header */}
                  <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`foundation-topic-${topic.id}-content`}
                      aria-label={isOpen ? `Collapse ${topic.title}` : `Expand ${topic.title}`}
                      onClick={() => setExpandedId(isOpen ? null : topic.id)}
                      style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: '16px', padding: 0, border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer', textAlign: 'left' }}
                    >
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: isDone ? 'rgba(52,211,153,0.15)' : `${topic.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                        {isDone ? '✅' : topic.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                          <span style={{ fontSize: '15px', fontWeight: 600, color: 'white' }}>{topic.title}</span>
                          <span style={{ ...mono, fontSize: '9px', color: step?.color, background: `${step?.color}15`, padding: '2px 7px', borderRadius: '4px' }}>Step {topic.step}</span>
                        </div>
                        <div style={{ ...mono, fontSize: '10px', color: '#D1D5DB' }}>{step?.name}</div>
                      </div>
                    </button>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                      <button type="button" aria-pressed={isDone} onClick={() => toggleCompleted(topic.id)}
                        style={{ background: isDone ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isDone ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '8px', padding: '6px 12px', ...mono, fontSize: '10px', color: isDone ? '#34D399' : '#808080', cursor: 'pointer' }}>
                        {isDone ? '✓ DONE' : 'MARK DONE'}
                      </button>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`foundation-topic-${topic.id}-content`}
                        aria-label={isOpen ? `Collapse ${topic.title}` : `Expand ${topic.title}`}
                        onClick={() => setExpandedId(isOpen ? null : topic.id)}
                        style={{ background: 'transparent', border: 'none', color: '#E8C547', fontSize: '18px', cursor: 'pointer', padding: '4px 8px', lineHeight: 1 }}
                      >{isOpen ? '−' : '+'}</button>
                    </div>
                  </div>

                  {/* Expanded */}
                  {isOpen && (
                    <div id={`foundation-topic-${topic.id}-content`} style={{ borderTop: '1px solid rgba(212,168,67,0.22)', padding: '24px 22px', background: 'rgba(0,0,0,0.15)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px), 1fr))', gap: '16px', marginBottom: '16px' }}>
                        {/* Explanation */}
                        <div>
                          <div style={{ ...mono, fontSize: '10px', color: '#E8C547', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>What it means</div>
                          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, fontWeight: 300 }}>{topic.explanation}</p>
                        </div>
                        {/* Example */}
                        <div style={{ background: `${topic.color}08`, border: `1px solid ${topic.color}20`, borderRadius: '12px', padding: '16px' }}>
                          <div style={{ ...mono, fontSize: '10px', color: topic.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>📌 Practical Example</div>
                          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>{topic.example}</p>
                        </div>
                      </div>
                      {/* Remember */}
                      <div style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid #E8C547', borderRadius: '10px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
                        <div>
                          <span style={{ ...mono, fontSize: '10px', color: '#E8C547', letterSpacing: '0.1em' }}>REMEMBER THIS: </span>
                          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{topic.remember}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checkpoint Quiz */}
      <section style={{ padding: '48px 24px', background: '#0A0A0A', borderTop: '1px solid rgba(212,168,67,0.22)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ ...mono, fontSize: '10px', color: 'rgba(232,197,71,0.95)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>{'// Checkpoint'}</div>
          <h2 className="font-display" style={{ fontSize: '42px', color: 'white', marginBottom: '24px' }}>FOUNDATION CHECKLIST</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
            {[
              "I understand what pips, lots, and leverage mean",
              "I can read a candlestick chart and identify bullish/bearish candles",
              "I always use a stop loss on every trade",
              "I have a predefined risk limit that fits my account and strategy",
              "I understand what support, resistance, and liquidity mean",
              "I know the 3 main trading sessions and their times",
              "I understand what ICT and SMC are conceptually",
              "I know the difference between trending and ranging markets",
              "I understand risk-to-reward ratio and can calculate it",
              "I have practiced my strategy in a sufficiently broad demo sample before risking meaningful capital",
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '14px 16px', background: '#111111', border: '1px solid rgba(212,168,67,0.22)', borderRadius: '10px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '1.5px solid #E8C547', flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section style={{ padding: '64px 24px', borderTop: '1px solid rgba(232,197,71,0.95)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ ...mono, fontSize: '10px', color: 'rgba(232,197,71,0.95)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>{'// What\'s Next'}</div>
          <h2 className="font-display" style={{ fontSize: '56px', color: 'white', marginBottom: '16px' }}>READY FOR THE REAL THING?</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.85)', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7, fontWeight: 300 }}>
            You&apos;ve built the foundation. Now step into the full ICT curriculum and study how ICT-style frameworks interpret market behavior.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/mentorship" className="btn-gold" style={{ padding: '16px 32px', borderRadius: '12px', ...mono, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ICT 2022 Mentorship →
            </Link>
            <Link href="/courses" style={{ padding: '16px 32px', borderRadius: '12px', ...mono, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid #E8C547', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              View All Modules
            </Link>
            <Link href="/glossary" style={{ padding: '16px 32px', borderRadius: '12px', ...mono, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
              ICT Glossary
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
