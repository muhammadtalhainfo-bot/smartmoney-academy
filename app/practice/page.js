'use client';
import { QUESTIONS } from './questions';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// ─── Daily Challenge Questions ────────────────────────────────────
// 460-question bank rotated into 92 daily sets of 5 (index = day of year % 92)
const ALL_QUESTIONS = [
  // SET 1 — Market Structure
  {
    id: 1,
    topic: 'Market Structure',
    difficulty: 'Beginner',
    image: '/images/market-structure.png',
    question: 'Price creates a Higher High followed by a Higher Low. What is the current market structure?',
    options: ['Bearish — Lower Lows forming', 'Bullish — HH/HL sequence confirmed', 'Ranging — no clear direction', 'Reversal — trend is changing'],
    answer: 1,
    explanation: 'A sequence of Higher Highs (HH) and Higher Lows (HL) is the definition of bullish market structure. HH/HL structure is commonly interpreted as bullish; it can inform a directional bias, while individual setups should still be evaluated.',
    lesson: 1,
  },
  {
    id: 2,
    topic: 'Market Structure',
    difficulty: 'Beginner',
    image: '/images/market-structure.png',
    question: 'Price breaks BELOW the most recent swing low in a downtrend. What just happened?',
    options: ['Break of Structure (BOS) — trend continuation', 'Change of Character (ChoCH) — reversal signal', 'Fair Value Gap forming', 'Order Block being mitigated'],
    answer: 0,
    explanation: 'When price breaks below the most recent swing low in a downtrend, that is a BOS — Break of Structure. It confirms the bearish trend is continuing. ChoCH would be if price broke a swing HIGH in a downtrend.',
    lesson: 1,
  },
  {
    id: 3,
    topic: 'Market Structure',
    difficulty: 'Beginner',
    image: '/images/market-structure.png',
    question: 'In a downtrend, price suddenly breaks ABOVE the most recent Lower High. What is this called?',
    options: ['BOS — trend continuation', 'Liquidity sweep', 'ChoCH — Change of Character, possible reversal', 'Premium zone rejection'],
    answer: 2,
    explanation: 'When price breaks ABOVE a Lower High in a downtrend, that is a Change of Character (ChoCH). It signals the bearish structure may be ending and a bullish reversal could be starting. This is the first warning signal to stop looking for sells.',
    lesson: 1,
  },
  {
    id: 4,
    topic: 'Market Structure',
    difficulty: 'Intermediate',
    image: '/images/market-structure.png',
    question: 'You see an Internal BOS on the 15-minute chart but the 4H structure is still bearish. What should you do?',
    options: ['Take a long trade — 15M BOS is your signal', 'Ignore the 15M BOS — only look for sells aligned with 4H bias', 'Wait for the daily chart to confirm', 'Switch to a different instrument'],
    answer: 1,
    explanation: 'Higher-timeframe structure can carry more weight in a multi-timeframe framework. A 15M BOS against a bearish 4H context may be treated as a counter-trend move, but the hierarchy should be tested.',
    lesson: 1,
  },
  {
    id: 5,
    topic: 'Market Structure',
    difficulty: 'Intermediate',
    image: '/images/market-structure.png',
    question: 'What is the difference between an Internal BOS and an External BOS?',
    options: ['There is no difference — both mean trend continuation', 'Internal BOS breaks intermediate swing points; External BOS breaks the major swing (confirms macro trend shift)', 'External BOS is on higher timeframes only', 'Internal BOS is a reversal signal; External BOS is continuation'],
    answer: 1,
    explanation: 'Internal BOS breaks intermediate/minor swing points within the current trend — it shows momentum. External BOS breaks the MAJOR swing high or low — this is the significant structural shift that confirms the macro trend has changed.',
    lesson: 1,
  },

  // SET 2 — Liquidity
  {
    id: 6,
    topic: 'Liquidity',
    difficulty: 'Beginner',
    image: '/images/liquidity.png',
    question: 'Where does Buy-Side Liquidity (BSL) sit in the market?',
    options: ['Below swing lows where stop losses cluster', 'Above swing highs where stop losses from shorts cluster', 'At the 50% Fibonacci level', 'Inside a Fair Value Gap'],
    answer: 1,
    explanation: 'Buy-Side Liquidity sits ABOVE swing highs. Traders who are short have their stop losses placed above highs — these stops are buy orders. When price sweeps above a high, it triggers those buy stops, which is the liquidity institutions need to sell into.',
    lesson: 2,
  },
  {
    id: 7,
    topic: 'Liquidity',
    difficulty: 'Beginner',
    image: '/images/liquidity.png',
    question: 'You see two consecutive candles with almost identical highs. What does ICT call this formation?',
    options: ['Double Top — bearish reversal', 'Equal Highs (EQH) — Buy-Side Liquidity resting above', 'Order Block — institutional demand', 'Fair Value Gap — imbalance in price'],
    answer: 1,
    explanation: 'Two or more candles with identical highs form Equal Highs (EQH). ICT sees these as a pool of Buy-Side Liquidity — retail traders have stop losses just above those equal highs. A liquidity-sweep interpretation is one possible scenario; the subsequent direction should be confirmed rather than assumed.',
    lesson: 2,
  },
  {
    id: 8,
    topic: 'Liquidity',
    difficulty: 'Intermediate',
    image: '/images/liquidity.png',
    question: 'The HTF is bullish. Price sweeps below a cluster of equal lows (SSL) and immediately reverses upward strongly. What is the correct ICT interpretation?',
    options: ['This is a breakdown — go short', 'The SSL sweep was the Judas Swing — now look for buys', 'Wait for another confirmation — this could be a false signal', 'The equal lows are now support — place stop below them'],
    answer: 1,
    explanation: 'When HTF is bullish and price sweeps SSL (equal lows), this is the algorithm collecting liquidity to fuel the upward move. A sweep can be treated as a setup condition rather than proof of direction. After an SSL sweep, look for displacement and confirmation that match the trading plan before considering an entry.',
    lesson: 2,
  },
  {
    id: 9,
    topic: 'Liquidity',
    difficulty: 'Intermediate',
    image: '/images/liquidity.png',
    question: 'What is a Stop Hunt and why does it actually HELP ICT traders?',
    options: ['A stop hunt is random volatility — it has no trading value', 'A stop hunt sweeps liquidity pools, providing the signal and entry opportunity ICT traders wait for', 'A stop hunt means the trend is reversing permanently', 'Stop hunts only happen in low-liquidity markets'],
    answer: 1,
    explanation: 'A Stop Hunt is when price moves to trigger clustered stop losses — creating a liquidity pool the algorithm uses to fill institutional orders. For ICT traders, a stop hunt is the SETUP: it tells you where the smart money just filled orders, and the reversal after the sweep is your entry signal.',
    lesson: 2,
  },
  {
    id: 10,
    topic: 'Liquidity',
    difficulty: 'Advanced',
    image: '/images/liquidity.png',
    question: 'Price is ranging in a tight consolidation for 3 hours. Equal highs AND equal lows have formed. Which direction will price likely move FIRST according to ICT?',
    options: ['Always sweeps the highs first', 'Always sweeps the lows first', 'Whichever side aligns with the HTF bias will be the TRUE move; the opposite side is swept first (Judas)', 'It is random — consolidations have no predictable sweep direction'],
    answer: 2,
    explanation: 'In the ICT Judas Swing framework, traders may look for a move opposite the eventual direction before a reversal. The sequence and swept side are not guaranteed, so use HTF context as one input rather than an expectation.',
    lesson: 2,
  },

  // SET 3 — Fair Value Gaps
  {
    id: 11,
    topic: 'Fair Value Gaps',
    difficulty: 'Beginner',
    image: '/images/fvg.png',
    question: 'A Fair Value Gap (FVG) is defined as the space between which two candles?',
    options: ['The open and close of a single large candle', 'The high of candle 1 and the low of candle 3 in a 3-candle sequence', 'The previous day high and low', 'Any gap between two consecutive candle bodies'],
    answer: 1,
    explanation: 'An FVG is the gap between Candle 1\'s HIGH and Candle 3\'s LOW (for a bullish FVG), created when Candle 2 is a large displacement candle. This 3-candle sequence is the signature of rapid, one-sided institutional order flow.',
    lesson: 3,
  },
  {
    id: 12,
    topic: 'Fair Value Gaps',
    difficulty: 'Beginner',
    image: '/images/fvg.png',
    question: 'How do some ICT teachings explain FVG revisits?',
    options: ['Because retail traders always buy at the gap', 'Because the algorithm requires two-sided pricing — it must return to complete the market order', 'Because FVGs are support/resistance levels', 'FVGs do not always get filled — this is a myth'],
    answer: 1,
    explanation: 'ICT\'s explanation: the algorithm operates on two-sided pricing. When a FVG is created, only one side of the market participated (pure buying or pure selling). The algorithm is programmed to return to that zone to offer the other side of the trade — completing the market. This is why FVGs get filled with such high consistency.',
    lesson: 3,
  },
  {
    id: 13,
    topic: 'Fair Value Gaps',
    difficulty: 'Intermediate',
    image: '/images/fvg.png',
    question: 'What is the Consequent Encroachment (CE) of a Fair Value Gap?',
    options: ['The top of the FVG', 'The bottom of the FVG', 'The 50% midpoint of the FVG — a reference point some ICT traders monitor', 'The candle that created the FVG'],
    answer: 2,
    explanation: 'The Consequent Encroachment is the exact 50% midpoint of any FVG. Some ICT teachings emphasize CE as a reference within an FVG. Traders can test whether monitoring this midpoint improves entries or trade management; it is not a guaranteed target or fill level.',
    lesson: 3,
  },
  {
    id: 14,
    topic: 'Fair Value Gaps',
    difficulty: 'Intermediate',
    image: '/images/fvg.png',
    question: 'What is an Inversion Fair Value Gap (IFVG)?',
    options: ['A FVG that was never filled', 'A Bearish FVG that has been broken through and now acts as support', 'A FVG on an inverted chart', 'A FVG created during the Asian session'],
    answer: 1,
    explanation: 'An IFVG forms when price breaks THROUGH a FVG instead of respecting it. A Bearish FVG that price blows through becomes a Bullish IFVG — it flips from resistance to support. The former "supply zone" is now a demand zone. IFVGs are highly respected because they represent exhausted supply that has been overwhelmed by demand.',
    lesson: 3,
  },
  {
    id: 15,
    topic: 'Fair Value Gaps',
    difficulty: 'Advanced',
    image: '/images/fvg.png',
    question: 'What is a Balanced Price Range (BPR)?',
    options: ['When price stays flat for an extended period', 'The overlap between a Bearish FVG above and a Bullish FVG below — a highly contested zone', 'A zone where buy and sell orders are equal', 'The range between the daily high and low'],
    answer: 1,
    explanation: 'A BPR forms when a Bearish FVG above and a Bullish FVG below overlap — creating a zone where price was delivered in both directions. This overlap is a "balanced" area of price. Some traders study whether price revisits BPRs as potential reaction areas; their usefulness should be evaluated with market-specific testing.',
    lesson: 3,
  },

  // SET 4 — Order Blocks
  {
    id: 16,
    topic: 'Order Blocks',
    difficulty: 'Beginner',
    image: '/images/order-blocks.png',
    question: 'In a bullish move, what candle defines the Bullish Order Block?',
    options: ['The first green candle in the move', 'The largest green candle in the impulse', 'The last RED (bearish) candle BEFORE the bullish impulse move', 'Any candle near a support level'],
    answer: 2,
    explanation: 'The Bullish Order Block is the LAST bearish (red) candle before a strong bullish impulse move. This candle represents where institutions placed their final buy orders before launching price upward. When price returns to this zone, institutions add more — creating the reaction.',
    lesson: 4,
  },
  {
    id: 17,
    topic: 'Order Blocks',
    difficulty: 'Intermediate',
    image: '/images/order-blocks.png',
    question: 'An Order Block has been tested once and held. Price returns for a second test. How should you treat it?',
    options: ['Second test is stronger — higher confidence entry', 'Second test is weaker — the OB is partially mitigated, use caution', 'It makes no difference how many times it\'s been tested', 'Avoid trading second tests completely'],
    answer: 1,
    explanation: 'ICT traders may study first-return behavior around Order Blocks, but the amount of resting institutional liquidity cannot be known from the chart and reaction strength varies. First mitigation is a testable hypothesis, not a universal rule.',
    lesson: 4,
  },
  {
    id: 18,
    topic: 'Order Blocks',
    difficulty: 'Intermediate',
    image: '/images/order-blocks.png',
    question: 'What is a Breaker Block?',
    options: ['A very strong Order Block that causes a large move', 'A former Order Block that has been swept through — it flips polarity and becomes resistance', 'An Order Block on the weekly timeframe', 'An OB formed during high-impact news'],
    answer: 1,
    explanation: 'A Breaker Block forms when price sweeps THROUGH a former Order Block, consuming all the orders there. The OB has been "broken." It now flips polarity: a former Bullish OB becomes a Bearish Breaker — price returns to it as resistance. This is powerful because the bulls who defended the OB have now been stopped out.',
    lesson: 4,
  },
  {
    id: 19,
    topic: 'Order Blocks',
    difficulty: 'Intermediate',
    image: '/images/order-blocks.png',
    question: 'What is the most precise entry point within a Bullish Order Block?',
    options: ['At the top of the OB candle', 'At the bottom of the OB candle', 'At the 50% midpoint of the OB candle body', 'Just below the OB'],
    answer: 2,
    explanation: 'The most precise OB entry is at the 50% midpoint of the OB candle\'s body. This is where the institutional orders are most densely clustered. Entering here gives the tightest stop (below the full OB) while being right in the center of institutional demand.',
    lesson: 4,
  },
  {
    id: 20,
    topic: 'Order Blocks',
    difficulty: 'Advanced',
    image: '/images/order-blocks.png',
    question: 'What does an OB + FVG confluence entry represent in ICT-style analysis?',
    options: ['It\'s when an OB and FVG are on opposite sides of price — they cancel each other out', 'When a FVG forms WITHIN the range of an OB — both arrays confirm the same zone, creating maximum institutional evidence', 'When an OB appears on the same candle as an FVG', 'It is not a recognized ICT concept'],
    answer: 1,
    explanation: 'When a FVG forms within the body of an Order Block, both arrays are confirming the same price zone. The OB shows WHERE institutions placed orders. The FVG shows the SPEED at which they executed (fast enough to leave an imbalance). Overlapping concepts can provide confluence, but confluence does not by itself establish a higher-quality or profitable entry. Add premium/discount alignment and you have a complete setup.',
    lesson: 4,
  },

  // SET 5 — Killzones & AMD
  {
    id: 21,
    topic: 'Killzones',
    difficulty: 'Beginner',
    image: '/images/killzones.png',
    question: 'What are the four main ICT Killzones and their approximate times (EST)?',
    options: ['Asian 12-2AM, London 3-5AM, NY AM 9:30-11AM, NY PM 1:30-3PM', 'Pre-market 4-6AM, Open 9-11AM, Midday 12-2PM, Close 3-4PM', 'Sydney 5-7PM, Tokyo 7-9PM, London 3-5AM, NY 8-10AM', 'Midnight, 6AM, Noon, 6PM — every 6 hours'],
    answer: 0,
    explanation: 'The four ICT Killzones: Asian (12-2 AM EST) — accumulation/consolidation. London (3-5 AM EST) — often the Judas Swing. NY AM (9:30-11 AM EST) is a commonly studied high-activity window for indices. NY PM (1:30-3 PM EST) is another session window; session suitability varies by instrument and strategy.',
    lesson: 5,
  },
  {
    id: 22,
    topic: 'Killzones',
    difficulty: 'Beginner',
    image: '/images/killzones.png',
    question: 'Which Killzone does this lesson emphasize for NAS100?',
    options: ['Asian session — most liquid', 'London open — most volatile', 'New York AM (9:30-11 AM EST) — highest volume + NYSE open', 'New York PM — after institutions have positioned'],
    answer: 2,
    explanation: 'The NY AM Killzone (9:30-11 AM EST) overlaps the U.S. equity-market open and is commonly studied for NAS100. Higher activity does not by itself guarantee cleaner or more reliable setups, so evaluate the window with your own data.',
    lesson: 5,
  },
  {
    id: 23,
    topic: 'Power of Three',
    difficulty: 'Intermediate',
    image: '/images/amd.png',
    question: 'In AMD (Accumulate, Manipulate, Distribute), what is the London session\'s typical role?',
    options: ['Distribution — the real directional move', 'Accumulation — building positions quietly', 'Manipulation — the Judas Swing in the WRONG direction', 'No specific role — London is random'],
    answer: 2,
    explanation: 'London\'s typical role in AMD is Manipulation — the Judas Swing. Price moves in the OPPOSITE direction of the day\'s true move first, sweeping stops and trapping retail traders. If the day is going to be bullish, London pushes price DOWN first to sweep the Asian lows. Then New York delivers the real bullish move.',
    lesson: 6,
  },
  {
    id: 24,
    topic: 'Power of Three',
    difficulty: 'Intermediate',
    image: '/images/amd.png',
    question: 'On a bullish AMD day, what does the lower wick of the daily candle represent?',
    options: ['Sellers pushing price down — bearish pressure', 'The distribution phase — real selling', 'The Manipulation phase — Judas Swing sweeping lows before the real bullish move', 'Random price noise with no significance'],
    answer: 2,
    explanation: 'On a bullish AMD day, the daily candle\'s lower wick IS the manipulation phase — the Judas Swing. Price was pushed down to sweep SSL (Asian lows), trap retail shorts, and collect the liquidity institutions needed to buy. The long green body after = the Distribution phase (real bullish move). Read every daily candle as an AMD story.',
    lesson: 6,
  },
  {
    id: 25,
    topic: 'Power of Three',
    difficulty: 'Advanced',
    image: '/images/amd.png',
    question: 'According to ICT\'s Weekly AMD, which day is most commonly the weekly Judas Swing day?',
    options: ['Monday — first day sets the trap', 'Tuesday — most consistent weekly manipulation day', 'Wednesday — middle of the week reversal', 'Friday — end of week stop hunt'],
    answer: 1,
    explanation: 'ICT specifically identifies TUESDAY as the most common day for the weekly Judas Swing. The weekly AMD pattern: Monday accumulates, Tuesday manipulates (sweeps the wrong side), then Thursday-Friday distributes the real directional move. This pattern repeats with high consistency on major forex pairs and indices.',
    lesson: 6,
  },

  // SET 6 — Risk Management
  {
    id: 26,
    topic: 'Risk Management',
    difficulty: 'Beginner',
    image: '/images/amd.png',
    question: 'You have a $5,000 trading account. Using ICT\'s 1% risk rule, what is the maximum you should lose on a single trade?',
    options: ['$500', '$50', '$250', '$100'],
    answer: 1,
    explanation: '1% of $5,000 = $50. This means your position size must be calculated so that if your stop loss is hit, you lose exactly $50 — no more. This example shows the arithmetic effect of risking 1% per trade; actual recovery depends on future returns and is not guaranteed.',
    lesson: 12,
  },
  {
    id: 27,
    topic: 'Risk Management',
    difficulty: 'Beginner',
    image: '/images/amd.png',
    question: 'Your stop loss is 25 pips away on EURUSD. Your account is $10,000 and you risk 1% per trade. What lot size should you trade?',
    options: ['1.0 lot', '0.4 lots', '0.2 lots', '2.0 lots'],
    answer: 1,
    explanation: 'Formula: Position Size = (Account × Risk%) ÷ (Stop × Pip Value). = ($10,000 × 1%) ÷ (25 × $10) = $100 ÷ $250 = 0.4 lots. Calculate position size from your predefined risk parameters rather than guessing.',
    lesson: 12,
  },
  {
    id: 28,
    topic: 'Risk Management',
    difficulty: 'Intermediate',
    image: '/images/amd.png',
    question: 'You\'ve already lost 3% today. A perfect ICT setup appears. What do you do?',
    options: ['Take it — the setup is too good to pass up', 'Take it but reduce size to 0.5%', 'Stop trading for the rest of the day — 3% is an example daily limit used in this question', 'Take it only if it\'s a Silver Bullet setup'],
    answer: 2,
    explanation: 'A 3% maximum daily loss is an example risk-management limit used in this lesson. If a trader adopts a daily loss limit, it should be defined in advance and followed consistently; the appropriate threshold depends on the strategy and risk plan.',
    lesson: 12,
  },
  {
    id: 29,
    topic: 'Risk Management',
    difficulty: 'Intermediate',
    image: '/images/amd.png',
    question: 'Your trade has moved 1R in your favor (your stop distance in profit). What should you do with your stop loss?',
    options: ['Keep it at the original level — give it room', 'Move it to breakeven (entry price)', 'Move it to 0.5R profit to lock in gains', 'Tighten it to half the original distance'],
    answer: 1,
    explanation: 'At 1R profit — move your stop to breakeven (entry price). This eliminates all risk on the trade while preserving full profit potential. You now have a "free trade." Never move to breakeven earlier than 1R — you\'ll get stopped out by normal price noise before the trade has had a chance to develop.',
    lesson: 13,
  },
  {
    id: 30,
    topic: 'Risk Management',
    difficulty: 'Advanced',
    image: '/images/amd.png',
    question: 'If you lose 50% of your trading account, what percentage gain do you need just to get back to break even?',
    options: ['50%', '75%', '100%', '150%'],
    answer: 2,
    explanation: 'If you lose 50% ($10,000 → $5,000), you need to make 100% on the remaining $5,000 to get back to $10,000. This is why drawdown protection is non-negotiable. A 50% loss doesn\'t just cost you money — it costs you the ability to recover. Protect capital first. Always.',
    lesson: 12,
  },
];

// Get today's 5 questions based on day of year
function getTodaysQuestions() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const setIndex = dayOfYear % Math.floor(QUESTIONS.length / 5);
  return QUESTIONS.slice(setIndex * 5, setIndex * 5 + 5);
}

const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function PracticePage() {
  const [questions] = useState(getTodaysQuestions);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date();
  const dateStr = `${DAYS[today.getDay()]}, ${MONTHS[today.getMonth()]} ${today.getDate()}`;

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  function handleSelect(i) {
    if (revealed) return;
    setSelected(i);
  }

  function handleReveal() {
    if (selected === null) return;
    setRevealed(true);
    const correct = selected === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, { correct, selected, answer: q.answer }]);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      const finalCorrect = answers.filter(a => a.correct).length + (selected === q.answer ? 1 : 0);
      const xp = finalCorrect * 20 + (finalCorrect === questions.length ? 50 : 0);
      setXpEarned(xp);
      setDone(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  const finalScore = answers.filter(a => a.correct).length + (revealed && selected === q?.answer ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#080808] text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8 text-center">Practice</h1>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px);} to { opacity:1; transform:translateY(0);} }
        .fade-up { animation: fadeUp 0.35s ease forwards; }
        @keyframes pop { 0%{transform:scale(0.95)} 50%{transform:scale(1.03)} 100%{transform:scale(1)} }
        .pop { animation: pop 0.25s ease; }
      `}</style>

      {/* ── Nav ── */}
      <Navbar active="/practice" />

      <div className="max-w-2xl mx-auto px-4 py-8">

        {!done ? (
          <>
            {/* ── Header ── */}
            <div className="mb-8 fade-up">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="font-mono-custom text-xs text-[#E8C547] tracking-widest uppercase mb-1">// Daily Challenge</div>
                  <div className="font-mono-custom text-xs text-gray-200">{dateStr}</div>
                </div>
                <div className="text-right">
                  <div className="font-display text-3xl" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {current + 1}/{questions.length}
                  </div>
                  <div className="font-mono-custom text-xs text-gray-200">questions</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #E8C547, #F0C96A)' }}
                />
              </div>
            </div>

            {/* ── Question Card ── */}
            <div key={current} className="fade-up">
              {/* Topic tag */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono-custom text-xs px-3 py-1 rounded-lg border border-[#E8C547] text-[#E8C547] bg-[rgba(212,168,67,0.05)]">
                  {q.topic}
                </span>
                <span className={`font-mono-custom text-xs px-3 py-1 rounded-lg border ${
                  q.difficulty === 'Beginner' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' :
                  q.difficulty === 'Intermediate' ? 'border-amber-500/20 text-amber-400 bg-amber-500/5' :
                  'border-red-500/20 text-red-400 bg-red-500/5'
                }`}>{q.difficulty}</span>
              </div>

              {/* Question */}
              <div className="p-6 rounded-2xl border border-[rgba(232,197,71,0.95)] bg-[#0F0F0F] mb-5">
                <p className="text-white text-lg font-medium leading-relaxed">{q.q}</p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {q.options.map((opt, i) => {
                  let borderColor = 'rgba(232,197,71,0.95)';
                  let bg = '#0F0F0F';
                  let textColor = 'text-gray-200';
                  let icon = null;

                  if (!revealed) {
                    if (selected === i) {
                      borderColor = '#E8C547';
                      bg = 'rgba(212,168,67,0.22)';
                      textColor = 'text-[#E8C547]';
                    }
                  } else {
                    if (i === q.answer) {
                      borderColor = 'rgba(52,211,153,0.4)';
                      bg = 'rgba(52,211,153,0.08)';
                      textColor = 'text-emerald-300';
                      icon = '✓';
                    } else if (selected === i && i !== q.answer) {
                      borderColor = 'rgba(239,68,68,0.4)';
                      bg = 'rgba(239,68,68,0.08)';
                      textColor = 'text-red-300';
                      icon = '✗';
                    } else {
                      textColor = 'text-gray-200';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${revealed ? '' : 'hover:border-[#E8C547] cursor-pointer'} ${textColor}`}
                      style={{ borderColor, background: bg }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono-custom text-xs opacity-50 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm leading-relaxed">{opt}</span>
                      </div>
                      {icon && <span className="text-base shrink-0 font-bold">{icon}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation (revealed) */}
              {revealed && (
                <div className="fade-up p-5 rounded-xl border border-[#E8C547] bg-[rgba(212,168,67,0.04)] mb-5">
                  <div className="font-mono-custom text-xs text-[#E8C547] mb-2">// Explanation</div>
                  <p className="text-gray-200 text-sm leading-relaxed">{q.explanation}</p>
                  <Link href={`/lesson/${q.lesson}`} className="inline-flex items-center gap-1 mt-3 font-mono-custom text-xs text-[#E8C547] hover:text-[#F0C96A] transition-colors">
                    📖 Review Lesson {q.lesson} →
                  </Link>
                </div>
              )}

              {/* Action button */}
              {!revealed ? (
                <button
                  onClick={handleReveal}
                  disabled={selected === null}
                  className="w-full py-4 rounded-xl font-mono-custom text-sm tracking-wider uppercase font-bold transition-all"
                  style={{
                    background: selected !== null ? 'linear-gradient(135deg, #E8C547, #F0C96A)' : 'rgba(232,197,71,0.95)',
                    color: selected !== null ? '#080808' : '#8A6B28',
                  }}
                >
                  {selected === null ? 'Select an answer' : 'Check Answer'}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-4 rounded-xl font-mono-custom text-sm tracking-wider uppercase font-bold transition-all pop"
                  style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808' }}
                >
                  {current + 1 >= questions.length ? 'See Results →' : 'Next Question →'}
                </button>
              )}
            </div>

            {/* Score tracker */}
            <div className="mt-6 flex justify-center gap-2">
              {questions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-all ${
                  i < answers.length
                    ? answers[i].correct ? 'bg-emerald-400' : 'bg-red-400'
                    : i === current ? 'bg-[#E8C547]' : 'bg-[#2A2A2A]'
                }`} />
              ))}
            </div>
          </>
        ) : (
          /* ── Results Screen ── */
          <div className="fade-up text-center">
            <div className="font-mono-custom text-xs text-[#E8C547] tracking-widest uppercase mb-6">// Challenge Complete</div>

            {/* Score circle */}
            <div className="w-40 h-40 rounded-full mx-auto mb-6 flex flex-col items-center justify-center border-2"
              style={{
                borderColor: finalScore >= 4 ? '#34D399' : finalScore >= 3 ? '#E8C547' : '#EF4444',
                background: finalScore >= 4 ? 'rgba(52,211,153,0.08)' : finalScore >= 3 ? 'rgba(212,168,67,0.22)' : 'rgba(239,68,68,0.08)',
              }}>
              <div className="font-display text-6xl" style={{
                background: finalScore >= 4 ? 'linear-gradient(135deg,#34D399,#6EE7B7)' : finalScore >= 3 ? 'linear-gradient(135deg,#E8C547,#F0C96A)' : 'linear-gradient(135deg,#EF4444,#FCA5A5)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
              }}>
                {finalScore}/{questions.length}
              </div>
              <div className="font-mono-custom text-xs text-gray-200 mt-1">correct</div>
            </div>

            {/* XP earned */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#E8C547] bg-[rgba(212,168,67,0.05)] mb-6">
              <span className="text-xl">⚡</span>
              <span className="font-display text-2xl" style={{ color: '#E8C547' }}>+{xpEarned} Practice XP</span>
              <span className="font-mono-custom text-xs text-gray-200">earned</span>
            </div>

            {/* Performance message */}
            <div className="p-5 rounded-xl border border-[rgba(232,197,71,0.95)] bg-[#0F0F0F] mb-6 text-left">
              <p className="text-white font-semibold mb-1">
                {finalScore === 5 ? '🎯 Perfect Score! Elite level.' :
                 finalScore === 4 ? '💪 Strong performance. One missed — review it.' :
                 finalScore === 3 ? '📈 Solid. Two gaps to close — check the lessons.' :
                 finalScore <= 2 ? '📖 Go back to the lessons. Fundamentals first.' : ''}
              </p>
              <p className="text-gray-200 text-sm">Come back tomorrow for a new challenge. Consistency builds the edge.</p>
            </div>

            {/* Question review */}
            <div className="text-left mb-8">
              <div className="font-mono-custom text-xs text-[#E8C547] tracking-widest uppercase mb-3">// Review</div>
              {questions.map((question, i) => {
                const ans = answers[i];
                if (!ans) return null;
                return (
                  <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border mb-2 ${ans.correct ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                    <span className={`text-base shrink-0 mt-0.5 ${ans.correct ? 'text-emerald-400' : 'text-red-400'}`}>{ans.correct ? '✓' : '✗'}</span>
                    <div>
                      <p className={`text-sm font-medium ${ans.correct ? 'text-emerald-300' : 'text-red-300'}`}>{question.topic}</p>
                      <p className="text-gray-200 text-xs mt-0.5 leading-relaxed">{question.question.substring(0, 80)}...</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/courses">
                <div className="py-4 rounded-xl border border-[#E8C547] bg-[#0F0F0F] hover:border-[rgba(232,197,71,0.95)] transition-all text-center">
                  <div className="font-mono-custom text-xs text-[#E8C547] tracking-wider uppercase">Study</div>
                  <div className="text-xs text-gray-200 mt-1">Review lessons</div>
                </div>
              </Link>
              <Link href="/dashboard">
                <div className="py-4 rounded-xl text-center transition-all" style={{ background: 'linear-gradient(135deg, #E8C547, #F0C96A)' }}>
                  <div className="font-mono-custom text-xs text-black font-bold tracking-wider uppercase">Dashboard</div>
                  <div className="text-xs text-black/60 mt-1">See your progress</div>
                </div>
              </Link>
            </div>

            <p className="font-mono-custom text-xs text-gray-200 mt-6">New challenge unlocks tomorrow at midnight</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[rgba(232,197,71,0.95)] px-8 py-6 mt-16">
        <div className="max-w-2xl mx-auto text-center font-mono-custom text-xs text-gray-200">
          ICT Flow — Educational content only. Not financial advice.
        </div>
      </footer>
    <Footer />
    </div>
  );
}
