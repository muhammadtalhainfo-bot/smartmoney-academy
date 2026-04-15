'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase';

const EPISODES = [
  {
    id: 1, phase: 1,
    title: "The Stripped-Down Model & Demo Baller Philosophy",
    duration: "2h 15m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Demo Trading", "Risk Psychology", "Independent Thinking", "Capital Preservation"],
    summary: "Huddleston introduces the 2022 model as an accessible entry point. Establishes the 'demo baller' approach — master the craft on paper before risking real capital. Core philosophy: become an independent earner, not a follower.",
    keyLesson: "Risk no more than 0.5–1% per trade. Master the model on demo for 100 trades minimum before going live.",
    tags: ["Psychology", "Foundation"]
  },
  {
    id: 2, phase: 1,
    title: "Elements of a Trade Setup & Weekly Bias",
    duration: "2h 45m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Weekly Bias", "Seasonal Tendencies", "Interest Rate Differentials", "HTF Analysis"],
    summary: "Introduces the Weekly Bias framework. Learn to project weekly candle expansion based on macro conditions — Fed rate hikes create predictable bearish expansion in November/December historically.",
    keyLesson: "Always start your analysis on the Weekly chart. Macro drives the directional bias before any intraday setup.",
    tags: ["Bias", "HTF Analysis", "Foundation"]
  },
  {
    id: 3, phase: 1,
    title: "Internal Range Liquidity & Market Structure Shift",
    duration: "3h 00m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["IRL", "MSS", "Displacement", "Relative Equal Highs/Lows", "REH/REL"],
    summary: "Critical distinction between a structure 'break' and a true 'shift'. MSS requires displacement — large energetic candles signaling institutional intent. Algorithm targets REH and REL where dense stop clusters sit.",
    keyLesson: "A Market Structure Shift is NOT just any break. It must have displacement — strong, fast candles that leave a Fair Value Gap.",
    tags: ["Market Structure", "Liquidity", "Foundation"]
  },
  {
    id: 4, phase: 1,
    title: "MSS in Action — E-Mini S&P 500",
    duration: "2h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["2-Minute Chart", "8:30 AM Macro", "Stop Hunts", "ES Futures", "Precision Entry"],
    summary: "Practical application of MSS on ES. The 2-minute chart is the precision entry tool. Stop hunts between 8:30–11:00 AM EST are the setup trigger. Displacement after the hunt must leave an FVG to validate.",
    keyLesson: "The hunt begins at 8:30 AM. After the sweep, wait for displacement and a visible FVG. That's your entry zone.",
    tags: ["Entry Models", "NQ/ES", "Practical"]
  },
  {
    id: 5, phase: 1,
    title: "Intraday Order Flow & Power of Three (AMD)",
    duration: "2h 50m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Power of Three", "AMD", "Accumulation", "Manipulation", "Distribution", "Judas Swing"],
    summary: "The daily candle is a structured delivery: Accumulate (Asian), Manipulate/Judas Swing (London), Distribute (NY AM). The Judas Swing traps retail traders before the real move begins.",
    keyLesson: "Every day runs the same script: fake move first (Judas Swing), real move second. London creates the trap, NY delivers the trend.",
    tags: ["AMD", "Power of Three", "Foundation"]
  },
  {
    id: 6, phase: 2,
    title: "Market Efficiency Paradigm & FVG Rebalancing",
    duration: "2h 20m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Market Efficiency", "FVG Rebalancing", "Institutional Orders", "Price Spikes"],
    summary: "Algorithm delivers price to give both buyers and sellers fair entries. Inefficiencies (FVGs) occur when price moves too fast and must be rebalanced. Big spikes attract retail orders to engineer liquidity for institutions.",
    keyLesson: "Price always returns to fill Fair Value Gaps. These are not random — they are algorithmic magnets for rebalancing.",
    tags: ["FVG", "Algorithm", "Theory"]
  },
  {
    id: 7, phase: 2,
    title: "Daily Bias & Consolidation Hurdles — Forex",
    duration: "2h 40m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Daily Bias", "Consolidation", "Nimble Trading", "HTF Context"],
    summary: "During HTF consolidation, daily bias is unclear. Be nimble — target small liquidity pools instead of large expansions. Patience is key during choppy environments.",
    keyLesson: "In consolidation, reduce size and target. Don't force a bias when the higher timeframe shows range-bound conditions.",
    tags: ["Forex", "Bias", "Psychology"]
  },
  {
    id: 8, phase: 2,
    title: "Institutional Order Flow — EUR/USD Step-by-Step",
    duration: "3h 10m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["EURUSD", "Forex Application", "Order Flow", "Session Alignment"],
    summary: "Forex pairs mirror index futures behavioral patterns. EUR/USD application of the 2022 model. The definitive step-by-step: HTF bias → liquidity sweep → LTF MSS → FVG entry.",
    keyLesson: "Step 1: HTF bias. Step 2: Wait for killzone sweep. Step 3: LTF MSS with displacement. Step 4: Limit order at FVG.",
    tags: ["Forex", "EURUSD", "Entry Models", "Practical"]
  },
  {
    id: 9, phase: 2,
    title: "Power of Three & NY PM Session Macros",
    duration: "2h 55m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["1:30 PM Macro", "NY PM Session", "Trend Continuation", "Reversals"],
    summary: "1:30 PM EST Macro often drives significant continuations or reversals in index futures. The PM session is when institutional volatility is injected for afternoon objectives.",
    keyLesson: "The 1:30 PM macro is a high-probability trigger. Watch for alignment between the AM trend and PM continuation.",
    tags: ["Macros", "NQ/ES", "Session Timing"]
  },
  {
    id: 10, phase: 2,
    title: "Economic Calendar Integration",
    duration: "2h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["News Events", "8:30 AM Data", "10:00 AM Data", "Stop Runs", "Calendar"],
    summary: "News events are the engine the algorithm uses to reach HTF objectives. Don't trade the data — observe the stop-run it creates. 8:30 and 10:00 AM releases are the key macro windows.",
    keyLesson: "Never trade INTO news. Wait for the stop-run the news creates, then look for your setup after the manipulation clears.",
    tags: ["News Trading", "Macros", "Risk Management"]
  },
  {
    id: 11, phase: 3,
    title: "Market Structure for Precision Technicians — Part 1",
    duration: "3h 20m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Institutional Sponsorship", "Advanced Price Action", "Professional Reading"],
    summary: "Professionals look for Institutional Sponsorship — evidence that smart money is actively supporting a move. Retail traders look for patterns; ICT traders look for algorithmic signatures.",
    keyLesson: "Before entering any trade, ask: where is the institutional sponsorship? Which side is the algorithm supporting right now?",
    tags: ["Advanced", "Market Structure", "Theory"]
  },
  {
    id: 12, phase: 3,
    title: "Market Structure for Precision Technicians — Part 2",
    duration: "3h 15m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Advanced Price Action Theory", "Precision Entries", "LTF Refinement"],
    summary: "Deep dive into advanced price action theory. How to 'eye' a high-probability setup without indicators. Refining entries from HTF context down to 1-minute execution.",
    keyLesson: "The goal is to see the setup before it happens — not react to it. Train your eye on historical charts until the patterns are automatic.",
    tags: ["Advanced", "Entry Models", "Practical"]
  },
  {
    id: 13, phase: 3,
    title: "Episodes 11-12 Concepts In Action — Historical Review",
    duration: "2h 45m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Historical Chart Review", "Pattern Recognition", "Setup Identification"],
    summary: "Pivotal review episode. Historical chart data proves the precision entry concepts. Learn to 'reverse engineer' why specific entries were valid using the 2022 model logic.",
    keyLesson: "Backtest is not optional. Go back 3-6 months and mark every valid setup. Pattern recognition only comes through repetition.",
    tags: ["Backtest", "Practical", "Review"]
  },
  {
    id: 14, phase: 3,
    title: "Live Trading Session — Real-Time Execution",
    duration: "2h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Live Execution", "TradingView", "Real-Time Analysis", "Conviction"],
    summary: "Huddleston shares live executions on TradingView. Challenge: reverse-engineer the logic behind each entry. Builds conviction through real-time observation.",
    keyLesson: "Watch the trade BEFORE it triggers. Can you see why he entered? If not, you need more chart time.",
    tags: ["Live Trading", "Practical", "Advanced"]
  },
  {
    id: 15, phase: 3,
    title: "Live Trading Session — Continued",
    duration: "2h 15m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Live Execution", "Model Validation", "Real-Time Bias"],
    summary: "Continued live trading demonstrations. Proves the model works in real-time conditions. Focus on the process, not the outcome of any single trade.",
    keyLesson: "A valid setup that loses is still a valid setup. Process > outcome. Judge your trading on execution quality, not P&L.",
    tags: ["Live Trading", "Psychology", "Advanced"]
  },
  {
    id: 16, phase: 3,
    title: "Multiple Setups Within One Session",
    duration: "2h 20m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Internal Structure", "1-Minute Chart", "5-Minute Chart", "Multiple Entries"],
    summary: "You don't have to catch the first move. Internal structure on 1M and 5M charts reveals additional entry opportunities throughout the session after the initial AM move.",
    keyLesson: "Miss the first setup? Look for internal structure shifts in the continuation. There are always secondary entries if you know where to look.",
    tags: ["Entry Models", "Practical", "Advanced"]
  },
  {
    id: 17, phase: 3,
    title: "2022 Model Forex Applications — Part 1",
    duration: "2h 50m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Forex", "Currency Pairs", "London Session", "Application"],
    summary: "Applying the 2022 model framework to Forex currency pairs. London killzone as the primary setup window for major pairs like GBPUSD and EURUSD.",
    keyLesson: "Forex and indices use the same model. The only difference is session timing — London open is your primary window for Forex.",
    tags: ["Forex", "Entry Models", "Practical"]
  },
  {
    id: 18, phase: 3,
    title: "2022 Model — Definitive Step-by-Step Approach",
    duration: "3h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["2022 Model", "Full Framework", "Step by Step", "Checklist"],
    summary: "THE definitive guide to the 2022 model. Complete sequence: HTF bias → killzone liquidity sweep → LTF MSS with displacement → FVG entry → low-hanging fruit target → HTF draw.",
    keyLesson: "Write this checklist: 1) HTF bias confirmed? 2) Killzone liquidity sweep happened? 3) MSS with displacement? 4) FVG present? All yes = valid setup.",
    tags: ["2022 Model", "Entry Models", "Must Watch"]
  },
  {
    id: 19, phase: 3,
    title: "Price Delivery Narrative & Reversal Theory",
    duration: "3h 00m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Price Narrative", "Trend End", "Reversals", "HTF Context", "Micro-Scalping Dangers"],
    summary: "Being at the END of a trend captures the highest-reward reversals. Danger of micro-scalping without HTF context. Every trade must have a narrative — a story of why price should move.",
    keyLesson: "The best trades are at trend extremes with HTF confluence. Micro-scalping random levels without a narrative is gambling.",
    tags: ["Theory", "Advanced", "Psychology"]
  },
  {
    id: 20, phase: 3,
    title: "London Open Framework & Midnight Open",
    duration: "2h 40m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["London Open", "Midnight Open", "NDOG", "Session Extremes", "Daily Range"],
    summary: "Define the range from NY Midnight Open to London Open. Algorithm reacts to session extremes. Essential for capturing the initial expansion of the daily range during London.",
    keyLesson: "Mark the New York Midnight Open (12:00 AM EST) on every chart. This is the reference price the algorithm uses for the daily delivery.",
    tags: ["Session Timing", "London", "Foundation"]
  },
  {
    id: 21, phase: 4,
    title: "Intermarket Relationships & SMT Divergence",
    duration: "2h 35m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["SMT", "ES vs NQ", "Correlated Assets", "Divergence", "Confirmation"],
    summary: "ES and NQ used as confluence for each other. SMT Divergence = one asset makes a higher high while the correlated one fails. Confirms institutional selling into rally.",
    keyLesson: "When NQ makes a new high but ES doesn't (or vice versa), that's SMT divergence — institutions are distributing. Look for reversal setups.",
    tags: ["SMT", "Intermarket", "Advanced"]
  },
  {
    id: 22, phase: 4,
    title: "Tape Reading — Part 1",
    duration: "2h 20m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Tape Reading", "Candle Bodies", "Candle Wicks", "Price Speed", "Characteristics"],
    summary: "Candle bodies tell the story of where the algorithm wants to go. Wicks represent the liquidity-seeking phase — the damage. Speed and characteristics of movement reveal the next objective.",
    keyLesson: "Read the candle BODIES not just the wicks. Strong body closes in one direction = algorithm is committed. Wick-heavy candles = liquidity hunting.",
    tags: ["Tape Reading", "Advanced", "Price Action"]
  },
  {
    id: 23, phase: 4,
    title: "FOMC Events & Market Maker Conditioning",
    duration: "2h 15m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["FOMC", "Fed Events", "Market Conditioning", "PM Session Entry", "High Impact News"],
    summary: "FOMC events are designed as market-maker conditioning sessions. Unpredictable manipulation often requires sitting out. Wait for PM session after extreme volatility clears before entering.",
    keyLesson: "On FOMC days, don't trade the event. Wait 30-60 minutes after the release, let the manipulation clear, then look for your setup in the PM.",
    tags: ["News Trading", "FOMC", "Risk Management"]
  },
  {
    id: 24, phase: 4,
    title: "Model Diagrams & Emotional Execution",
    duration: "2h 50m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Visual Templates", "Psychology", "Emotional Execution", "Fear of Loss", "Rules"],
    summary: "Visual templates for the 2022 entry model. Fear of losing is what causes the most losses — it leads to early exits and rule violations. Emotional execution is the primary barrier to profitability.",
    keyLesson: "Your rules must be non-negotiable. Write them down before the session. If the setup isn't there, don't trade. Period.",
    tags: ["Psychology", "Entry Models", "Practical"]
  },
  {
    id: 25, phase: 4,
    title: "Daily Rebalance Theory",
    duration: "2h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Daily Rebalance", "Prior Day FVG", "Swing Trading", "Multi-Day Holds"],
    summary: "Algorithm returns to prior day's Fair Value Gap to rebalance before resuming trend. Critical for swing traders holding across multiple daily candles.",
    keyLesson: "Before a trend continues, it often retraces to fill the previous day's FVG. This rebalance IS the entry opportunity for swing positions.",
    tags: ["FVG", "Swing Trading", "Theory"]
  },
  {
    id: 26, phase: 4,
    title: "Tape Reading — Part 2",
    duration: "2h 25m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Advanced Tape Reading", "Pattern Recognition", "IPDA Signatures"],
    summary: "Advanced tape reading skills. Identifying IPDA signatures in real-time price action. Building the 'eye' through focused observation of candle-by-candle delivery.",
    keyLesson: "Slow down your charts. Watch one candle at a time. What story is each candle telling about where the algorithm wants to go?",
    tags: ["Tape Reading", "Advanced", "Price Action"]
  },
  {
    id: 27, phase: 4,
    title: "Counter Trend Ideas",
    duration: "2h 10m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Counter Trend", "Reversal Setups", "HTF Targets", "Trend End"],
    summary: "When the higher-timeframe draw on liquidity has been reached, counter-trend setups become valid. These offer the highest reward-to-risk but require confirmed HTF context.",
    keyLesson: "Counter trend trades are only valid at HTF premium/discount extremes after a liquidity run. Never fade a trend in the middle of a range.",
    tags: ["Reversals", "Advanced", "HTF Analysis"]
  },
  {
    id: 28, phase: 4,
    title: "Silent Presentation — Visual Pattern Training",
    duration: "2h 00m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Visual Training", "Pattern Recognition", "IPDA Signatures", "No Commentary"],
    summary: "Unique episode — Huddleston removes verbal commentary. Students must identify IPDA signatures from visual cues alone. Forces independent thinking and pattern internalization.",
    keyLesson: "Can you identify the setup without being told what it is? This episode tests whether you truly see the market or just follow instructions.",
    tags: ["Training", "Advanced", "Must Watch"]
  },
  {
    id: 29, phase: 4,
    title: "Trading Bullish Narrow Range Days with SMT",
    duration: "2h 15m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Narrow Range Days", "Low Volatility", "SMT Application", "Conservative Targets"],
    summary: "How to profit during low-volatility narrow range environments using SMT divergence. Reduce targets and position size. Don't expect large expansions on NR days.",
    keyLesson: "On narrow range days, smaller targets win. Don't try to catch 50 points when the daily range is 15. Scale expectations to the environment.",
    tags: ["SMT", "Low Volatility", "Practical"]
  },
  {
    id: 30, phase: 4,
    title: "PM Session Trading — Central Bank Volatility",
    duration: "2h 20m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["PM Session", "Fed Chair Speeches", "Afternoon Trend", "Volatility Injection"],
    summary: "Central bank chair speeches inject afternoon volatility. Navigate PM session by watching for continuation of AM trend or reversal setups after 1:30 PM macro window.",
    keyLesson: "Central bank speeches at 2-3 PM EST often create the afternoon's directional move. Be positioned BEFORE the speech, not after.",
    tags: ["PM Session", "Macros", "Advanced"]
  },
  {
    id: 31, phase: 5,
    title: "E-Mini Examples — FVG Precision",
    duration: "2h 35m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["FVG Validity", "Liquidity Run Required", "Structure Shift Required", "ES Examples"],
    summary: "Not every FVG is tradeable. Must occur AFTER a liquidity run AND a structure shift to be valid. Quality over quantity — fewer, higher-conviction setups.",
    keyLesson: "Three requirements for a valid FVG entry: 1) After a liquidity sweep. 2) After an MSS. 3) In the direction of HTF bias. All three must be present.",
    tags: ["FVG", "NQ/ES", "Entry Models"]
  },
  {
    id: 32, phase: 5,
    title: "Consolidation Days & Market on Close Profile",
    duration: "2h 00m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Consolidation Day", "MOC", "Anticipation", "Order Building", "Low-Volume Days"],
    summary: "Consolidation days are for anticipation, not trading. Algorithm builds orders for the next significant move. Market on Close profile reveals institutional positioning intentions.",
    keyLesson: "On consolidation days, DO NOT TRADE. Use the time to mark your levels and prepare your narrative for tomorrow's potential expansion.",
    tags: ["Consolidation", "Risk Management", "Theory"]
  },
  {
    id: 33, phase: 5,
    title: "More E-Mini FVG Examples",
    duration: "2h 25m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["FVG", "ES Precision", "Real Examples", "Pattern Repetition"],
    summary: "Additional E-Mini S&P 500 FVG examples reinforcing the three-criteria framework. The algorithm repeats the same patterns — train your eye to see them instantly.",
    keyLesson: "The algorithm is repetitive. If you study enough historical examples, you will begin to 'see' where price is going before it gets there.",
    tags: ["FVG", "NQ/ES", "Review"]
  },
  {
    id: 34, phase: 5,
    title: "Price Action Review — Session 1",
    duration: "2h 40m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Price Action Review", "Pattern Training", "IPDA Recognition", "Multiple Markets"],
    summary: "First PA Review session. Cross-market review of how the IPDA produces repeating setups across different conditions. Building the 'eye' through comprehensive chart analysis.",
    keyLesson: "Study at least one full week of historical price action every weekend. Your pattern recognition depends on volume of chart hours.",
    tags: ["Review", "Training", "Practical"]
  },
  {
    id: 35, phase: 5,
    title: "Price Action Review — Session 2",
    duration: "2h 35m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["PA Review", "Cross-Market", "Setup Consistency"],
    summary: "Continued PA review across multiple market conditions. Emphasizes that the model works across all market environments when applied correctly with HTF context.",
    keyLesson: "A setup that works in trending markets must also work in ranging markets — if you truly understand the underlying mechanics.",
    tags: ["Review", "Training", "Advanced"]
  },
  {
    id: 36, phase: 5,
    title: "Price Action Review — Session 3",
    duration: "2h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["PA Review", "Execution Review", "Trade Management"],
    summary: "Third PA review focusing on trade management decisions — where to take partials, when to move stop to break-even, and how to scale into HTF objectives.",
    keyLesson: "Move stop to break-even after price reaches the first structural level. Never let a confirmed entry turn into a full loss.",
    tags: ["Review", "Risk Management", "Trade Management"]
  },
  {
    id: 37, phase: 5,
    title: "Price Action Review — Session 4",
    duration: "2h 25m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["PA Review", "Advanced Examples", "Edge Refinement"],
    summary: "Advanced PA review focusing on edge cases and complex market conditions. How to handle conflicting signals and when NOT to take a setup.",
    keyLesson: "When signals conflict between timeframes, do nothing. Patience and selectivity are your highest-value edge.",
    tags: ["Review", "Advanced", "Training"]
  },
  {
    id: 38, phase: 5,
    title: "Bias Shifts & Change of Character (CHoCH)",
    duration: "2h 45m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Bias Shift", "CHoCH", "HTF Objective Met", "Reversal Signal"],
    summary: "When the higher-timeframe objective has been met, a Change of Character signals the bias shift. Learning to identify these turning points is the key to avoiding reversals and capturing new trends.",
    keyLesson: "When HTF draw on liquidity is reached AND a CHoCH forms on LTF, the bias has shifted. Stop trading the old direction immediately.",
    tags: ["CHoCH", "Market Structure", "Advanced"]
  },
  {
    id: 39, phase: 5,
    title: "Algo Talk — Time-Based Macro Windows",
    duration: "3h 00m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["20-Minute Windows", "Algorithmic Timing", "Macro Precision", "Time = Edge"],
    summary: "Theoretical deep dive into time-based macro windows. Specific 20-minute windows during the day when the algorithm is most active seeking objectives. Time is the most critical variable.",
    keyLesson: "The 20-minute macro windows are: 8:50-9:10, 9:50-10:10, 10:50-11:10, 11:50-12:10, 1:10-1:30, 1:50-2:10, 2:50-3:10, 3:30-4:00 EST.",
    tags: ["Macros", "Theory", "Must Watch", "Algorithm"]
  },
  {
    id: 40, phase: 5,
    title: "Keys to Daily Bias",
    duration: "2h 50m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Daily Bias Keys", "Bias Checklist", "Intermarket", "Draw on Liquidity"],
    summary: "Final checklist for establishing daily market direction. Primary determinants: Intermarket relationship (SMT) and Draw on Liquidity (DOL). These two factors define bias above all else.",
    keyLesson: "Daily Bias checklist: 1) Where is the HTF draw on liquidity? 2) Is SMT confirming? 3) Which killzone sets up the delivery? 4) What is the AMD script for today?",
    tags: ["Bias", "Must Watch", "Foundation", "Checklist"]
  },
  {
    id: 41, phase: 5,
    title: "Final Episode — Path to Independence",
    duration: "2h 30m",
    youtube: "https://www.youtube.com/watch?v=placeholder",
    concepts: ["Risk Management", "Independence", "Backtesting", "Journaling", "Final Advice"],
    summary: "Final installment. Urges continued backtesting and journaling. The path to independence requires 6-12 months of disciplined study. Risk management is the foundation of longevity.",
    keyLesson: "Journal every trade. Screenshot the setup before and after. Write what you saw, what you did, and what you learned. This is how mastery is built.",
    tags: ["Psychology", "Risk Management", "Foundation", "Must Watch"]
  }
];

const PHASES = [
  { id: 1, label: "Phase 1", name: "Structural Foundations", episodes: "1–5", color: "#34D399", episodes_range: [1,5] },
  { id: 2, label: "Phase 2", name: "Institutional Flow & Timing", episodes: "6–10", color: "#818CF8", episodes_range: [6,10] },
  { id: 3, label: "Phase 3", name: "Precision Execution", episodes: "11–20", color: "#D4A843", episodes_range: [11,20] },
  { id: 4, label: "Phase 4", name: "Intermarket & Tape Reading", episodes: "21–30", color: "#F87171", episodes_range: [21,30] },
  { id: 5, label: "Phase 5", name: "Final Synthesis & Bias Keys", episodes: "31–41", color: "#C084FC", episodes_range: [31,41] },
];

const ALL_TAGS = ["Must Watch", "Foundation", "Entry Models", "FVG", "Market Structure", "Psychology", "Macros", "Forex", "NQ/ES", "SMT", "Advanced", "Review", "Practical", "Algorithm"];

export default function MentorshipPage() {
  const [search, setSearch] = useState('');
  const [activePhase, setActivePhase] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [watched, setWatched] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('ict_watched_episodes');
    if (saved) setWatched(JSON.parse(saved));

    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUserId(session.user.id);
    });
  }, []);

  const toggleWatched = (id) => {
    const updated = watched.includes(id)
      ? watched.filter(w => w !== id)
      : [...watched, id];
    setWatched(updated);
    localStorage.setItem('ict_watched_episodes', JSON.stringify(updated));
  };

  const filtered = EPISODES.filter(ep => {
    const matchSearch = search === '' ||
      ep.title.toLowerCase().includes(search.toLowerCase()) ||
      ep.concepts.some(c => c.toLowerCase().includes(search.toLowerCase())) ||
      ep.summary.toLowerCase().includes(search.toLowerCase());
    const matchPhase = activePhase === 'All' || ep.phase === parseInt(activePhase);
    const matchTag = activeTag === 'All' || ep.tags.includes(activeTag);
    return matchSearch && matchPhase && matchTag;
  });

  const watchedCount = watched.length;
  const totalCount = EPISODES.length;
  const pct = Math.round((watchedCount / totalCount) * 100);

  const mono = { fontFamily: 'DM Mono, monospace' };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .ep-card { transition: all 0.2s ease; border: 1px solid rgba(212,168,67,0.75); }
        .ep-card:hover { border-color: rgba(212,168,67,0.8); transform: translateY(-1px); }
        .tag-pill { cursor: pointer; transition: all 0.15s; }
        .progress-bar { background: rgba(212,168,67,0.22); border-radius: 99px; overflow: hidden; height: 6px; }
        .progress-fill { background: linear-gradient(90deg, #8A6B28, #D4A843, #F0C96A); height: 6px; border-radius: 99px; transition: width 0.8s ease; }
        input::placeholder { color: rgba(255,255,255,0.55); }
        input:focus { outline: none; border-color: rgba(212,168,67,0.75) !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0A; } ::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.8); border-radius: 4px; }
      `}</style>

      <Navbar active="/mentorship" />

      {/* Hero */}
      <section style={{ borderBottom: '1px solid rgba(212,168,67,0.75)', background: 'linear-gradient(180deg, #0A0A0A 0%, #080808 100%)', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.8)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>// Michael J. Huddleston</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(42px, 7vw, 96px)', lineHeight: 1, marginBottom: '16px' }}>
            <span style={{ color: 'white' }}>ICT 2022 </span>
            <span style={{ background: 'linear-gradient(135deg, #8A6B28, #D4A843, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MENTORSHIP</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '32px' }}>
            The complete 41-episode series deconstructed. Every concept, key lesson, and algorithmic framework — organized for systematic mastery of the IPDA.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { value: '41', label: 'Episodes' },
              { value: '95h+', label: 'Content' },
              { value: '5', label: 'Phases' },
              { value: `${watchedCount}/${totalCount}`, label: 'Watched' },
            ].map((s, i) => (
              <div key={i}>
                <div className="font-display" style={{ fontSize: '36px', color: '#D4A843', lineHeight: 1 }}>{s.value}</div>
                <div style={{ ...mono, fontSize: '10px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.8)', letterSpacing: '0.1em' }}>YOUR PROGRESS</span>
              <span style={{ ...mono, fontSize: '10px', color: '#D4A843' }}>{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Phase overview */}
      <div style={{ borderBottom: '1px solid rgba(212,168,67,0.22)', background: '#0A0A0A', padding: '20px 24px', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '12px', flexWrap: 'nowrap', minWidth: 'max-content' }}>
          {PHASES.map(p => {
            const phaseEps = EPISODES.filter(e => e.phase === p.id);
            const watchedInPhase = phaseEps.filter(e => watched.includes(e.id)).length;
            return (
              <button key={p.id} onClick={() => setActivePhase(activePhase === String(p.id) ? 'All' : String(p.id))}
                style={{ background: activePhase === String(p.id) ? `${p.color}15` : 'transparent', border: `1px solid ${activePhase === String(p.id) ? p.color + '40' : 'rgba(255,255,255,0.18)'}`, borderRadius: '10px', padding: '10px 16px', cursor: 'pointer', textAlign: 'left', minWidth: '160px' }}>
                <div style={{ ...mono, fontSize: '9px', color: p.color, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>{p.label} · EP {p.episodes}</div>
                <div style={{ fontSize: '12px', color: 'white', fontWeight: 500, marginBottom: '6px' }}>{p.name}</div>
                <div style={{ ...mono, fontSize: '9px', color: '#808080' }}>{watchedInPhase}/{phaseEps.length} watched</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search and filters */}
      <div style={{ borderBottom: '1px solid rgba(212,168,67,0.22)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)', padding: '16px 24px', position: 'sticky', top: '72px', zIndex: 40 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexDirection: 'column' }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search episodes, concepts..."
              style={{ background: '#0F0F0F', border: '1px solid rgba(212,168,67,0.75)', borderRadius: '8px', padding: '8px 14px', color: 'white', ...mono, fontSize: '12px', width: '100%' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
              {['All', ...ALL_TAGS].map(tag => (
                <button key={tag} onClick={() => setActiveTag(tag)}
                  className="tag-pill"
                  style={{ background: activeTag === tag ? 'rgba(212,168,67,0.75)' : 'transparent', border: `1px solid ${activeTag === tag ? 'rgba(212,168,67,0.75)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '99px', padding: '4px 10px', ...mono, fontSize: '10px', color: activeTag === tag ? '#D4A843' : '#808080', letterSpacing: '0.06em' }}>
                  {tag}
                </button>
              ))}
            </div>
            <span style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.75)', whiteSpace: 'nowrap' }}>{filtered.length} episodes</span>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {PHASES.filter(p => activePhase === 'All' || p.id === parseInt(activePhase)).map(phase => {
          const phaseEps = filtered.filter(e => e.phase === phase.id);
          if (phaseEps.length === 0) return null;
          return (
            <div key={phase.id} style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '12px', borderBottom: `1px solid ${phase.color}20` }}>
                <span style={{ ...mono, fontSize: '10px', color: phase.color, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{phase.label}</span>
                <span className="font-display" style={{ fontSize: '24px', color: 'white', letterSpacing: '0.05em' }}>{phase.name}</span>
                <span style={{ ...mono, fontSize: '10px', color: '#808080' }}>Episodes {phase.episodes}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {phaseEps.map(ep => {
                  const isWatched = watched.includes(ep.id);
                  const isExpanded = expandedId === ep.id;
                  const isMustWatch = ep.tags.includes('Must Watch');

                  return (
                    <div key={ep.id} className="ep-card" style={{ background: isWatched ? 'rgba(52,211,153,0.03)' : '#0D0D0D', borderRadius: '14px', overflow: 'hidden', borderColor: isWatched ? 'rgba(52,211,153,0.15)' : isMustWatch ? 'rgba(212,168,67,0.8)' : 'rgba(212,168,67,0.22)' }}>

                      {/* Episode header */}
                      <div style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
                        onClick={() => setExpandedId(isExpanded ? null : ep.id)}>

                        {/* Episode number */}
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isWatched ? 'rgba(52,211,153,0.15)' : 'rgba(212,168,67,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {isWatched
                            ? <span style={{ color: '#34D399', fontSize: '16px' }}>✓</span>
                            : <span className="font-display" style={{ color: '#D4A843', fontSize: '16px' }}>{String(ep.id).padStart(2, '0')}</span>
                          }
                        </div>

                        {/* Title and meta */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{ep.title}</span>
                            {isMustWatch && <span style={{ ...mono, fontSize: '9px', background: 'rgba(212,168,67,0.75)', color: '#D4A843', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.08em' }}>MUST WATCH</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ ...mono, fontSize: '10px', color: '#808080' }}>{ep.duration}</span>
                            {ep.concepts.slice(0, 3).map(c => (
                              <span key={c} style={{ ...mono, fontSize: '9px', color: 'rgba(212,168,67,0.75)', background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(212,168,67,0.75)', padding: '1px 6px', borderRadius: '4px' }}>{c}</span>
                            ))}
                            {ep.concepts.length > 3 && <span style={{ ...mono, fontSize: '9px', color: '#9CA3AF' }}>+{ep.concepts.length - 3} more</span>}
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleWatched(ep.id); }}
                            style={{ background: isWatched ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isWatched ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '8px', padding: '6px 12px', ...mono, fontSize: '10px', color: isWatched ? '#34D399' : '#808080', cursor: 'pointer', letterSpacing: '0.06em' }}>
                            {isWatched ? '✓ WATCHED' : 'MARK WATCHED'}
                          </button>
                          <span style={{ color: '#D4A843', fontSize: '14px' }}>{isExpanded ? '−' : '+'}</span>
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div style={{ borderTop: '1px solid rgba(212,168,67,0.22)', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                            {/* Summary */}
                            <div>
                              <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Episode Summary</div>
                              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.7, fontWeight: 300 }}>{ep.summary}</p>
                            </div>
                            {/* Key Lesson */}
                            <div style={{ background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(212,168,67,0.75)', borderRadius: '10px', padding: '16px' }}>
                              <div style={{ ...mono, fontSize: '10px', color: '#D4A843', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>🎯 Key Lesson</div>
                              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6 }}>{ep.keyLesson}</p>
                            </div>
                          </div>

                          {/* All concepts */}
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ ...mono, fontSize: '10px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Concepts Covered</div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {ep.concepts.map(c => (
                                <span key={c} style={{ ...mono, fontSize: '10px', color: '#D4A843', background: 'rgba(212,168,67,0.22)', border: '1px solid rgba(212,168,67,0.75)', padding: '3px 8px', borderRadius: '6px' }}>{c}</span>
                              ))}
                            </div>
                          </div>

                          {/* Tags */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {ep.tags.map(t => (
                              <span key={t} style={{ ...mono, fontSize: '9px', color: '#9CA3AF', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', padding: '2px 7px', borderRadius: '4px' }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <div className="font-display" style={{ fontSize: '28px', color: 'white', marginBottom: '8px' }}>NO EPISODES FOUND</div>
            <div style={{ ...mono, fontSize: '12px', color: '#808080' }}>Try a different search term or filter</div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
