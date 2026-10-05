'use client';
// Production build checkpoint
// Production build checkpoint
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const EPISODES = [
  {
    id: 1, phase: 1,
    title: "The Stripped-Down Model & Demo Baller Philosophy",
    duration: "2h 15m",
    youtube: null,
    concepts: ["Demo Trading", "Risk Psychology", "Independent Thinking", "Capital Preservation"],
    summary: "Huddleston introduces the 2022 model as an accessible entry point. Establishes the 'demo baller' approach — master the craft on paper before risking real capital. Core philosophy: become an independent earner, not a follower.",
    keyLesson: "Use a predefined risk limit that fits the account and strategy. Build a sufficiently broad demo sample before risking meaningful capital.",
    tags: ["Psychology", "Foundation"]
  },
  {
    id: 2, phase: 1,
    title: "Elements of a Trade Setup & Weekly Bias",
    duration: "2h 45m",
    youtube: null,
    concepts: ["Weekly Bias", "Seasonal Tendencies", "Interest Rate Differentials", "HTF Analysis"],
    summary: "Introduces the Weekly Bias framework. Learn to study weekly context and macro conditions while recognizing that historical tendencies do not guarantee a particular expansion.",
    keyLesson: "Start with an appropriate higher-timeframe context before evaluating intraday setups.",
    tags: ["Bias", "HTF Analysis", "Foundation"]
  },
  {
    id: 3, phase: 1,
    title: "Internal Range Liquidity & Market Structure Shift",
    duration: "3h 00m",
    youtube: null,
    concepts: ["IRL", "MSS", "Displacement", "Relative Equal Highs/Lows", "REH/REL"],
    summary: "Critical distinction between a structure 'break' and a true 'shift'. MSS is distinguished here by displacement — strong price movement used as a chart-based condition. Claims about algorithmic targets, stop placement, or participant intent are framework interpretations rather than directly observable facts.",
    keyLesson: "In this ICT-style model, an MSS is distinguished from an ordinary break by displacement; traders can test whether requiring strong candles and an FVG improves their setup definition.",
    tags: ["Market Structure", "Liquidity", "Foundation"]
  },
  {
    id: 4, phase: 1,
    title: "MSS in Action — E-Mini S&P 500",
    duration: "2h 30m",
    youtube: null,
    concepts: ["2-Minute Chart", "8:30 AM Macro", "Stop Hunts", "ES Futures", "Precision Entry"],
    summary: "Practical application of MSS on ES. This lesson uses the 2-minute chart as an execution example. It also studies liquidity events during the 8:30–11:00 AM EST window and uses displacement/FVGs as example confirmation criteria; these are testable conditions, not guarantees.",
    keyLesson: "Around scheduled releases, observe the sweep/displacement sequence and only consider an FVG entry if it matches the predefined plan.",
    tags: ["Entry Models", "NQ/ES", "Practical"]
  },
  {
    id: 5, phase: 1,
    title: "Intraday Order Flow & Power of Three (AMD)",
    duration: "2h 50m",
    youtube: null,
    concepts: ["Power of Three", "AMD", "Accumulation", "Manipulation", "Distribution", "Judas Swing"],
    summary: "The daily candle can be studied as a three-phase delivery framework: Accumulation, Manipulation/Judas Swing, and Distribution. The phases are a model, not a guarantee, and session behavior can vary.",
    keyLesson: "AMD can be studied as a three-phase framework in which a potential manipulation phase precedes a directional move; the sequence and session behavior can vary.",
    tags: ["AMD", "Power of Three", "Foundation"]
  },
  {
    id: 6, phase: 2,
    title: "Market Efficiency Paradigm & FVG Rebalancing",
    duration: "2h 20m",
    youtube: null,
    concepts: ["Market Efficiency", "FVG Rebalancing", "Institutional Orders", "Price Spikes"],
    summary: "In this ICT-style framework, FVGs are studied as price inefficiencies and potential areas of repricing. Large moves can coincide with liquidity events, but institutional intent cannot be confirmed from a chart alone.",
    keyLesson: "Some traders study FVG revisits as potential rebalancing behavior; FVGs do not have a universal fill guarantee.",
    tags: ["FVG", "Algorithm", "Theory"]
  },
  {
    id: 7, phase: 2,
    title: "Daily Bias & Consolidation Hurdles — Forex",
    duration: "2h 40m",
    youtube: null,
    concepts: ["Daily Bias", "Consolidation", "Nimble Trading", "HTF Context"],
    summary: "During HTF consolidation, daily bias is unclear. Be nimble — target small liquidity pools instead of large expansions. Patience is key during choppy environments.",
    keyLesson: "In consolidation, reduce size and target. Don't force a bias when the higher timeframe shows range-bound conditions.",
    tags: ["Forex", "Bias", "Psychology"]
  },
  {
    id: 8, phase: 2,
    title: "Institutional Order Flow — EUR/USD Step-by-Step",
    duration: "3h 10m",
    youtube: null,
    concepts: ["EURUSD", "Forex Application", "Order Flow", "Session Alignment"],
    summary: "The 2022 model can be studied on EUR/USD as an example. Forex and index futures can share some ICT-style concepts, but liquidity, volatility, and session behavior can differ by instrument.",
    keyLesson: "Step 1: HTF bias. Step 2: Wait for killzone sweep. Step 3: LTF MSS with displacement. Step 4: Limit order at FVG.",
    tags: ["Forex", "EURUSD", "Entry Models", "Practical"]
  },
  {
    id: 9, phase: 2,
    title: "Power of Three & NY PM Session Macros",
    duration: "2h 55m",
    youtube: null,
    concepts: ["1:30 PM Macro", "NY PM Session", "Trend Continuation", "Reversals"],
    summary: "The 1:30 PM EST macro can be studied as a session variable when reviewing index-futures behavior. Continuations, reversals, and volatility vary by day and should be evaluated with historical data rather than assumed.",
    keyLesson: "The 1:30 PM macro can be included as a testable session variable; evaluate its behavior and alignment with the AM trend on the market traded.",
    tags: ["Macros", "NQ/ES", "Session Timing"]
  },
  {
    id: 10, phase: 2,
    title: "Economic Calendar Integration",
    duration: "2h 30m",
    youtube: null,
    concepts: ["News Events", "8:30 AM Data", "10:00 AM Data", "Stop Runs", "Calendar"],
    summary: "Scheduled news can materially affect volatility, spreads, and execution. Traders may choose to avoid entering immediately around releases and study post-event behavior.",
    keyLesson: "Avoid treating news reactions as guaranteed stop-runs. Around scheduled releases, wait for volatility to settle and only trade if the setup matches your predefined plan.",
    tags: ["News Trading", "Macros", "Risk Management"]
  },
  {
    id: 11, phase: 3,
    title: "Market Structure for Precision Technicians — Part 1",
    duration: "3h 20m",
    youtube: null,
    concepts: ["Institutional Sponsorship", "Advanced Price Action", "Professional Reading"],
    summary: "Some ICT teaching uses the idea of institutional sponsorship and algorithmic signatures. Treat these as framework interpretations and distinguish chart observations from claims about participant intent.",
    keyLesson: "Before entering, identify the structural and liquidity evidence supporting the setup and distinguish observations from interpretations about institutional activity.",
    tags: ["Advanced", "Market Structure", "Theory"]
  },
  {
    id: 12, phase: 3,
    title: "Market Structure for Precision Technicians — Part 2",
    duration: "3h 15m",
    youtube: null,
    concepts: ["Advanced Price Action Theory", "Precision Entries", "LTF Refinement"],
    summary: "Deep dive into advanced price action theory. How to study a potential setup without indicators. Refining entries from HTF context down to 1-minute execution.",
    keyLesson: "The goal is to define the setup before it happens rather than react impulsively. Use historical charts to practice identifying the conditions in your plan.",
    tags: ["Advanced", "Entry Models", "Practical"]
  },
  {
    id: 13, phase: 3,
    title: "Episodes 11-12 Concepts In Action — Historical Review",
    duration: "2h 45m",
    youtube: null,
    concepts: ["Historical Chart Review", "Pattern Recognition", "Setup Identification"],
    summary: "Pivotal review episode. Historical chart data can be used to study and test the precision entry concepts. Review why an entry would satisfy the 2022 model’s stated conditions, while keeping the distinction between a rule match and a profitable outcome.",
    keyLesson: "Backtesting is a useful way to study a strategy. A 3–6 month window can be an example starting point; choose a sample that is relevant to the strategy and market, and recognize that repetition does not guarantee future performance.",
    tags: ["Backtest", "Practical", "Review"]
  },
  {
    id: 14, phase: 3,
    title: "Live Trading Session — Real-Time Execution",
    duration: "2h 30m",
    youtube: null,
    concepts: ["Live Execution", "TradingView", "Real-Time Analysis", "Conviction"],
    summary: "Huddleston shares live executions on TradingView. Challenge: reverse-engineer the logic behind each entry. Builds conviction through real-time observation.",
    keyLesson: "Watch the trade BEFORE it triggers. Can you see why he entered? If not, you need more chart time.",
    tags: ["Live Trading", "Practical", "Advanced"]
  },
  {
    id: 15, phase: 3,
    title: "Live Trading Session — Continued",
    duration: "2h 15m",
    youtube: null,
    concepts: ["Live Execution", "Model Validation", "Real-Time Bias"],
    summary: "Continued live trading demonstrations can be used to study how the model is applied in real-time; demonstrations do not by themselves establish future performance. Focus on the process, not the outcome of any single trade.",
    keyLesson: "A setup can satisfy the model’s rules and still lose. Evaluate execution quality separately from the trade outcome, and review the evidence and rule adherence rather than using P&L alone.",
    tags: ["Live Trading", "Psychology", "Advanced"]
  },
  {
    id: 16, phase: 3,
    title: "Multiple Setups Within One Session",
    duration: "2h 20m",
    youtube: null,
    concepts: ["Internal Structure", "1-Minute Chart", "5-Minute Chart", "Multiple Entries"],
    summary: "You don't have to catch the first move. Internal structure on 1M and 5M charts reveals additional entry opportunities throughout the session after the initial AM move.",
    keyLesson: "Miss the first setup? Look for internal structure shifts in the continuation. Additional entries may appear after an initial move, but they are not guaranteed and should meet the same plan criteria.",
    tags: ["Entry Models", "Practical", "Advanced"]
  },
  {
    id: 17, phase: 3,
    title: "2022 Model Forex Applications — Part 1",
    duration: "2h 50m",
    youtube: null,
    concepts: ["Forex", "Currency Pairs", "London Session", "Application"],
    summary: "Applying the 2022 model framework to Forex currency pairs. London killzone as the primary setup window for major pairs like GBPUSD and EURUSD.",
    keyLesson: "Forex and indices can share some ICT-style concepts, but their liquidity, volatility, and session behavior can differ. London open is one window this lesson emphasizes for Forex; test suitability by instrument.",
    tags: ["Forex", "Entry Models", "Practical"]
  },
  {
    id: 18, phase: 3,
    title: "2022 Model — Definitive Step-by-Step Approach",
    duration: "3h 30m",
    youtube: null,
    concepts: ["2022 Model", "Full Framework", "Step by Step", "Checklist"],
    summary: "A step-by-step guide to the 2022 model. Complete sequence: HTF bias → killzone liquidity sweep → LTF MSS with displacement → FVG entry → low-hanging fruit target → HTF draw.",
    keyLesson: "Write this checklist: 1) HTF bias confirmed? 2) Killzone liquidity sweep happened? 3) MSS with displacement? 4) FVG present? Meeting these conditions satisfies this model’s rule set; it does not guarantee a favorable outcome, so test the complete setup.",
    tags: ["2022 Model", "Entry Models", "Must Watch"]
  },
  {
    id: 19, phase: 3,
    title: "Price Delivery Narrative & Reversal Theory",
    duration: "3h 00m",
    youtube: null,
    concepts: ["Price Narrative", "Trend End", "Reversals", "HTF Context", "Micro-Scalping Dangers"],
    summary: "Trend extremes can be studied as potential reversal areas when higher-timeframe context supports the idea. A trade narrative should state the assumptions and evidence supporting the expected move.",
    keyLesson: "Trend extremes with higher-timeframe context can be studied as potential reversal areas. Avoid entries that are not supported by the trading plan.",
    tags: ["Theory", "Advanced", "Psychology"]
  },
  {
    id: 20, phase: 3,
    title: "London Open Framework & Midnight Open",
    duration: "2h 40m",
    youtube: null,
    concepts: ["London Open", "Midnight Open", "NDOG", "Session Extremes", "Daily Range"],
    summary: "Define the range from NY Midnight Open to London Open. Some ICT traders study session extremes as contextual reference points for London price delivery; the relationship should be tested rather than assumed.",
    keyLesson: "The New York Midnight Open (12:00 AM EST) is an ICT reference level that some traders study alongside daily price delivery; its role should be tested rather than assumed.",
    tags: ["Session Timing", "London", "Foundation"]
  },
  {
    id: 21, phase: 4,
    title: "Intermarket Relationships & SMT Divergence",
    duration: "2h 35m",
    youtube: null,
    concepts: ["SMT", "ES vs NQ", "Correlated Assets", "Divergence", "Confirmation"],
    summary: "ES and NQ used as confluence for each other. SMT Divergence = one asset makes a higher high while the correlated one fails. Can be studied as possible divergence; it does not by itself confirm institutional selling.",
    keyLesson: "When NQ makes a new high but ES doesn't (or vice versa), that's SMT divergence — the divergence may provide additional context for a reversal setup; test it rather than treating it as proof of institutional distribution.",
    tags: ["SMT", "Intermarket", "Advanced"]
  },
  {
    id: 22, phase: 4,
    title: "Tape Reading — Part 1",
    duration: "2h 20m",
    youtube: null,
    concepts: ["Tape Reading", "Candle Bodies", "Candle Wicks", "Price Speed", "Characteristics"],
    summary: "Candle bodies and wicks can be studied as price-action observations. Some ICT-style interpretations associate strong body closes with directional momentum and wicks with rejection or liquidity events; these interpretations should be tested rather than treated as proof of an algorithmic objective.",
    keyLesson: "Read candle bodies and wicks together. Strong closes can indicate directional momentum, while wick-heavy candles can indicate rejection or a liquidity event; neither observation proves an underlying algorithmic intention.",
    tags: ["Tape Reading", "Advanced", "Price Action"]
  },
  {
    id: 23, phase: 4,
    title: "FOMC Events & Market Maker Conditioning",
    duration: "2h 15m",
    youtube: null,
    concepts: ["FOMC", "Fed Events", "Market Conditioning", "PM Session Entry", "High Impact News"],
    summary: "FOMC announcements are scheduled macro events that can produce sharp volatility and wider spreads. Avoid assuming a specific manipulation pattern or universal waiting period; use a predefined news-risk plan and reassess once conditions stabilize.",
    keyLesson: "On FOMC days, don't trade the event. Wait 30-60 minutes after the release, let the manipulation clear, then look for your setup in the PM.",
    tags: ["News Trading", "FOMC", "Risk Management"]
  },
  {
    id: 24, phase: 4,
    title: "Model Diagrams & Emotional Execution",
    duration: "2h 50m",
    youtube: null,
    concepts: ["Visual Templates", "Psychology", "Emotional Execution", "Fear of Loss", "Rules"],
    summary: "Visual templates for the 2022 entry model. Fear of loss can contribute to early exits and rule violations. Emotional discipline is one part of execution quality and should be managed alongside risk, process, and strategy design.",
    keyLesson: "Write your rules down before the session and define what qualifies as a setup. If your plan requires a complete checklist, wait when the criteria are not met.",
    tags: ["Psychology", "Entry Models", "Practical"]
  },
  {
    id: 25, phase: 4,
    title: "Daily Rebalance Theory",
    duration: "2h 30m",
    youtube: null,
    concepts: ["Daily Rebalance", "Prior Day FVG", "Swing Trading", "Multi-Day Holds"],
    summary: "In this ICT-style framework, traders study prior-day Fair Value Gaps as potential rebalance areas before a continuation. The behavior is not guaranteed and should be evaluated with historical testing.",
    keyLesson: "A continuation may revisit a previous-day FVG in this framework. Treat such a revisit as a potential area to study, not a guaranteed entry opportunity.",
    tags: ["FVG", "Swing Trading", "Theory"]
  },
  {
    id: 26, phase: 4,
    title: "Tape Reading — Part 2",
    duration: "2h 25m",
    youtube: null,
    concepts: ["Advanced Tape Reading", "Pattern Recognition", "IPDA Signatures"],
    summary: "Advanced tape reading skills. Identifying IPDA signatures in real-time price action. Building the 'eye' through focused observation of candle-by-candle delivery.",
    keyLesson: "Slow down your charts. Watch one candle at a time. What story is each candle suggesting within the framework, and what would count as invalidation?",
    tags: ["Tape Reading", "Advanced", "Price Action"]
  },
  {
    id: 27, phase: 4,
    title: "Counter Trend Ideas",
    duration: "2h 10m",
    youtube: null,
    concepts: ["Counter Trend", "Reversal Setups", "HTF Targets", "Trend End"],
    summary: "When a higher-timeframe draw on liquidity has been reached, traders may study counter-trend setups as a conditional hypothesis; define invalidation and test the rule. These can offer attractive reward-to-risk profiles in some conditions, but outcomes depend on the setup and execution.",
    keyLesson: "Counter-trend setups can be evaluated around higher-timeframe extremes and liquidity events; define invalidation and avoid treating the framework as an absolute rule.",
    tags: ["Reversals", "Advanced", "HTF Analysis"]
  },
  {
    id: 28, phase: 4,
    title: "Silent Presentation — Visual Pattern Training",
    duration: "2h 00m",
    youtube: null,
    concepts: ["Visual Training", "Pattern Recognition", "IPDA Signatures", "No Commentary"],
    summary: "Unique episode — Huddleston removes verbal commentary. Students identify the lesson's IPDA-style visual cues independently to practice pattern recognition and hypothesis testing.",
    keyLesson: "Can you identify the setup without being told what it is? This episode tests whether you truly see the market or just follow instructions.",
    tags: ["Training", "Advanced", "Must Watch"]
  },
  {
    id: 29, phase: 4,
    title: "Trading Bullish Narrow Range Days with SMT",
    duration: "2h 15m",
    youtube: null,
    concepts: ["Narrow Range Days", "Low Volatility", "SMT Application", "Conservative Targets"],
    summary: "How SMT divergence can be studied during low-volatility narrow-range environments. Consider smaller targets or reduced exposure only when supported by a predefined risk plan; narrow-range days do not guarantee a particular expansion.",
    keyLesson: "On narrow range days, smaller targets win. Don't try to catch 50 points when the daily range is 15. Scale expectations to the environment.",
    tags: ["SMT", "Low Volatility", "Practical"]
  },
  {
    id: 30, phase: 4,
    title: "PM Session Trading — Central Bank Volatility",
    duration: "2h 20m",
    youtube: null,
    concepts: ["PM Session", "Fed Chair Speeches", "Afternoon Trend", "Volatility Injection"],
    summary: "Central bank chair speeches inject afternoon volatility. Navigate PM session by watching for continuation of AM trend or reversal setups after 1:30 PM macro window.",
    keyLesson: "Central-bank speeches can change afternoon volatility and direction. Consider the event risk and define whether the plan permits holding positions into the release.",
    tags: ["PM Session", "Macros", "Advanced"]
  },
  {
    id: 31, phase: 5,
    title: "E-Mini Examples — FVG Precision",
    duration: "2h 35m",
    youtube: null,
    concepts: ["FVG Validity", "Liquidity Run Required", "Structure Shift Required", "ES Examples"],
    summary: "Not every FVG is necessarily a trade setup. In this model, a liquidity event and structure shift can be used as additional filters; define the complete rule set and test it rather than treating those conditions as universal requirements.",
    keyLesson: "This lesson presents three example conditions for an FVG entry: a liquidity sweep, an MSS, and alignment with HTF bias. Treat them as a testable framework rather than universal requirements.",
    tags: ["FVG", "NQ/ES", "Entry Models"]
  },
  {
    id: 32, phase: 5,
    title: "Consolidation Days & Market on Close Profile",
    duration: "2h 00m",
    youtube: null,
    concepts: ["Consolidation Day", "MOC", "Anticipation", "Order Building", "Low-Volume Days"],
    summary: "Consolidation days can be studied as periods of anticipation within this framework. Claims about algorithmic order-building or institutional positioning are interpretations rather than directly observable facts.",
    keyLesson: "Use the session to mark levels and define a hypothesis for potential expansion; whether to trade should depend on your written rules and current conditions.",
    tags: ["Consolidation", "Risk Management", "Theory"]
  },
  {
    id: 33, phase: 5,
    title: "More E-Mini FVG Examples",
    duration: "2h 25m",
    youtube: null,
    concepts: ["FVG", "ES Precision", "Real Examples", "Pattern Repetition"],
    summary: "Additional E-Mini S&P 500 FVG examples reinforcing a three-criteria framework. Repeated chart patterns can be studied and tested, but similar-looking formations do not establish a fixed algorithmic process.",
    keyLesson: "This lesson encourages repeated historical study to recognize recurring patterns and test hypotheses; historical patterns do not reliably reveal the next price move.",
    tags: ["FVG", "NQ/ES", "Review"]
  },
  {
    id: 34, phase: 5,
    title: "Price Action Review — Session 1",
    duration: "2h 40m",
    youtube: null,
    concepts: ["Price Action Review", "Pattern Training", "IPDA Recognition", "Multiple Markets"],
    summary: "First PA Review session. Cross-market review of how the IPDA produces repeating setups across different conditions. Building the 'eye' through comprehensive chart analysis.",
    keyLesson: "Study at least one full week of historical price action every weekend. Your pattern recognition depends on volume of chart hours.",
    tags: ["Review", "Training", "Practical"]
  },
  {
    id: 35, phase: 5,
    title: "Price Action Review — Session 2",
    duration: "2h 35m",
    youtube: null,
    concepts: ["PA Review", "Cross-Market", "Setup Consistency"],
    summary: "Continued price-action review across multiple market conditions. Examines how the model can be applied in different environments while recognizing that market conditions vary and historical examples do not establish universal performance.",
    keyLesson: "A robust strategy should be evaluated across both trending and ranging conditions; performance can differ by market regime.",
    tags: ["Review", "Training", "Advanced"]
  },
  {
    id: 36, phase: 5,
    title: "Price Action Review — Session 3",
    duration: "2h 30m",
    youtube: null,
    concepts: ["PA Review", "Execution Review", "Trade Management"],
    summary: "Third PA review focusing on trade management decisions — where to take partials, when to move stop to break-even, and how to scale into HTF objectives.",
    keyLesson: "One testable trade-management rule is to move the stop to break-even after a predefined structural milestone. The exact rule should be part of the trader's plan and tested rather than assumed to prevent every loss.",
    tags: ["Review", "Risk Management", "Trade Management"]
  },
  {
    id: 37, phase: 5,
    title: "Price Action Review — Session 4",
    duration: "2h 25m",
    youtube: null,
    concepts: ["PA Review", "Advanced Examples", "Edge Refinement"],
    summary: "Advanced PA review focusing on edge cases and complex market conditions. How to handle conflicting signals and when NOT to take a setup.",
    keyLesson: "When signals conflict between timeframes, do nothing. Patience and selectivity are your highest-value edge.",
    tags: ["Review", "Advanced", "Training"]
  },
  {
    id: 38, phase: 5,
    title: "Bias Shifts & Change of Character (CHoCH)",
    duration: "2h 45m",
    youtube: null,
    concepts: ["Bias Shift", "CHoCH", "HTF Objective Met", "Reversal Signal"],
    summary: "When the higher-timeframe objective has been met, a Change of Character signals the bias shift. Learning to identify these turning points is the key to avoiding reversals and capturing new trends.",
    keyLesson: "When HTF draw on liquidity is reached AND a CHoCH forms on LTF, the bias has shifted. Stop trading the old direction immediately.",
    tags: ["CHoCH", "Market Structure", "Advanced"]
  },
  {
    id: 39, phase: 5,
    title: "Algo Talk — Time-Based Macro Windows",
    duration: "3h 00m",
    youtube: null,
    concepts: ["20-Minute Windows", "Algorithmic Timing", "Macro Precision", "Time = Edge"],
    summary: "Theoretical deep dive into time-based macro windows. Some ICT traders study recurring time windows as a timing variable; market behavior can vary by instrument, session, and day, so the windows should be treated as testable context.",
    keyLesson: "The 20-minute macro windows are: 8:50-9:10, 9:50-10:10, 10:50-11:10, 11:50-12:10, 1:10-1:30, 1:50-2:10, 2:50-3:10, 3:30-4:00 EST.",
    tags: ["Macros", "Theory", "Must Watch", "Algorithm"]
  },
  {
    id: 40, phase: 5,
    title: "Keys to Daily Bias",
    duration: "2h 50m",
    youtube: null,
    concepts: ["Daily Bias Keys", "Bias Checklist", "Intermarket", "Draw on Liquidity"],
    summary: "Final checklist for studying daily market direction. Intermarket relationships (SMT) and Draw on Liquidity (DOL) are two framework inputs; they should be evaluated alongside broader context rather than treated as sufficient on their own.",
    keyLesson: "Daily Bias checklist: 1) Where is the HTF draw on liquidity? 2) Is SMT confirming? 3) Which killzone sets up the delivery? 4) What is the AMD script for today?",
    tags: ["Bias", "Must Watch", "Foundation", "Checklist"]
  },
  {
    id: 41, phase: 5,
    title: "Final Episode — Path to Independence",
    duration: "2h 30m",
    youtube: null,
    concepts: ["Risk Management", "Independence", "Backtesting", "Journaling", "Final Advice"],
    summary: "Final installment. Urges continued backtesting and journaling. The path to independence requires 6-12 months of disciplined study. Risk management is the foundation of longevity.",
    keyLesson: "Journal every trade. Screenshot the setup before and after. Write what you saw, what you did, and what you learned. This is how mastery is built.",
    tags: ["Psychology", "Risk Management", "Foundation", "Must Watch"]
  }
];

const PHASES = [
  { id: 1, label: "Phase 1", name: "Structural Foundations", episodes: "1–5", color: "#34D399", episodes_range: [1,5] },
  { id: 2, label: "Phase 2", name: "Institutional Flow & Timing", episodes: "6–10", color: "#818CF8", episodes_range: [6,10] },
  { id: 3, label: "Phase 3", name: "Precision Execution", episodes: "11–20", color: "#E8C547", episodes_range: [11,20] },
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

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ict_watched_episodes');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setWatched(parsed);
        } catch {
          try { localStorage.removeItem('ict_watched_episodes'); } catch {}
        }
      }
    } catch {}
  }, []);

  const toggleWatched = (id) => {
    const updated = watched.includes(id)
      ? watched.filter(w => w !== id)
      : [...watched, id];
    setWatched(updated);
    try { localStorage.setItem('ict_watched_episodes', JSON.stringify(updated)); } catch {}
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

        * { box-sizing: border-box; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .ep-card { transition: all 0.2s ease; border: 1px solid rgba(232,197,71,0.95); }
        .ep-card:hover { border-color: #E8C547; transform: translateY(-1px); }
        .tag-pill { cursor: pointer; transition: all 0.15s; }
        .progress-bar { background: rgba(212,168,67,0.22); border-radius: 99px; overflow: hidden; height: 6px; }
        .progress-fill { background: linear-gradient(90deg, #8A6B28, #E8C547, #F0C96A); height: 6px; border-radius: 99px; transition: width 0.8s ease; }
        input::placeholder { color: #B9C1CC; }
        input:focus { outline: none; border-color: rgba(232,197,71,0.95) !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0A; } ::-webkit-scrollbar-thumb { background: #E8C547; border-radius: 4px; }
      `}</style>

      <Navbar active="/mentorship" />

      {/* Hero */}
      <section style={{ borderBottom: '1px solid rgba(232,197,71,0.95)', background: 'linear-gradient(180deg, #0A0A0A 0%, #080808 100%)', padding: '64px 24px 48px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ ...mono, fontSize: '11px', color: '#E8C547', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>// Michael J. Huddleston</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(42px, 7vw, 96px)', lineHeight: 1, marginBottom: '16px' }}>
            <span style={{ color: 'white' }}>ICT 2022 </span>
            <span style={{ background: 'linear-gradient(135deg, #8A6B28, #E8C547, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MENTORSHIP</span>
          </h1>
          <p style={{ color: '#B9C1CC', fontSize: '16px', maxWidth: '640px', lineHeight: 1.7, fontWeight: 300, marginBottom: '32px' }}>
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
                <div className="font-display" style={{ fontSize: '36px', color: '#E8C547', lineHeight: 1 }}>{s.value}</div>
                <div style={{ ...mono, fontSize: '10px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ ...mono, fontSize: '10px', color: '#E8C547', letterSpacing: '0.1em' }}>YOUR PROGRESS</span>
              <span style={{ ...mono, fontSize: '10px', color: '#E8C547' }}>{pct}%</span>
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
              style={{ background: '#0F0F0F', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '8px', padding: '8px 14px', color: 'white', ...mono, fontSize: '12px', width: '100%' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
              {['All', ...ALL_TAGS].map(tag => (
                <button key={tag} onClick={() => setActiveTag(tag)}
                  className="tag-pill"
                  style={{ background: activeTag === tag ? 'rgba(232,197,71,0.95)' : 'transparent', border: `1px solid ${activeTag === tag ? 'rgba(232,197,71,0.95)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '99px', padding: '4px 10px', ...mono, fontSize: '10px', color: activeTag === tag ? '#080808' : '#A6A6A6', letterSpacing: '0.06em' }}>
                  {tag}
                </button>
              ))}
            </div>
            <span style={{ ...mono, fontSize: '11px', color: 'rgba(232,197,71,0.95)', whiteSpace: 'nowrap' }}>{filtered.length} episodes</span>
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
                    <div key={ep.id} className="ep-card" style={{ background: isWatched ? 'rgba(52,211,153,0.03)' : '#111111', borderRadius: '14px', overflow: 'hidden', borderColor: isWatched ? 'rgba(52,211,153,0.15)' : isMustWatch ? '#E8C547' : 'rgba(212,168,67,0.22)' }}>

                      {/* Episode header */}
                      <div
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-controls={`mentorship-episode-${ep.id}-content`}
                        onClick={() => setExpandedId(isExpanded ? null : ep.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpandedId(isExpanded ? null : ep.id);
                          }
                        }}
                        style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}>

                        {/* Episode number */}
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: isWatched ? 'rgba(52,211,153,0.15)' : 'rgba(212,168,67,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {isWatched
                            ? <span style={{ color: '#34D399', fontSize: '16px' }}>✓</span>
                            : <span className="font-display" style={{ color: '#E8C547', fontSize: '16px' }}>{String(ep.id).padStart(2, '0')}</span>
                          }
                        </div>

                        {/* Title and meta */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{ep.title}</span>
                            {isMustWatch && <span style={{ ...mono, fontSize: '9px', background: 'rgba(232,197,71,0.95)', color: '#080808', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.08em' }}>MUST WATCH</span>}
                          </div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <span style={{ ...mono, fontSize: '10px', color: '#808080' }}>{ep.duration}</span>
                            {ep.concepts.slice(0, 3).map(c => (
                              <span key={c} style={{ ...mono, fontSize: '9px', color: 'rgba(232,197,71,0.95)', background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(232,197,71,0.95)', padding: '1px 6px', borderRadius: '4px' }}>{c}</span>
                            ))}
                            {ep.concepts.length > 3 && <span style={{ ...mono, fontSize: '9px', color: '#D1D5DB' }}>+{ep.concepts.length - 3} more</span>}
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); toggleWatched(ep.id); }}
                            style={{ background: isWatched ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isWatched ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '8px', padding: '6px 12px', ...mono, fontSize: '10px', color: isWatched ? '#34D399' : '#808080', cursor: 'pointer', letterSpacing: '0.06em' }}>
                            {isWatched ? '✓ WATCHED' : 'MARK WATCHED'}
                          </button>
                          <span style={{ color: '#E8C547', fontSize: '14px' }}>{isExpanded ? '−' : '+'}</span>
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div id={`mentorship-episode-${ep.id}-content`} style={{ borderTop: '1px solid rgba(212,168,67,0.22)', padding: '20px', background: 'rgba(0,0,0,0.2)' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px', marginBottom: '20px' }}>
                            {/* Summary */}
                            <div>
                              <div style={{ ...mono, fontSize: '10px', color: '#E8C547', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Episode Summary</div>
                              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.7, fontWeight: 300 }}>{ep.summary}</p>
                            </div>
                            {/* Key Lesson */}
                            <div style={{ background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '10px', padding: '16px' }}>
                              <div style={{ ...mono, fontSize: '10px', color: '#E8C547', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>🎯 Key Lesson</div>
                              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', lineHeight: 1.6 }}>{ep.keyLesson}</p>
                            </div>
                          </div>

                          {/* All concepts */}
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ ...mono, fontSize: '10px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>Concepts Covered</div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {ep.concepts.map(c => (
                                <span key={c} style={{ ...mono, fontSize: '10px', color: '#E8C547', background: 'rgba(212,168,67,0.22)', border: '1px solid rgba(232,197,71,0.95)', padding: '3px 8px', borderRadius: '6px' }}>{c}</span>
                              ))}
                            </div>
                          </div>

                          {/* Tags */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {ep.tags.map(t => (
                              <span key={t} style={{ ...mono, fontSize: '9px', color: '#D1D5DB', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', padding: '2px 7px', borderRadius: '4px' }}>{t}</span>
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
