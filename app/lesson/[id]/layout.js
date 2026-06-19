// Pre-render all lesson pages as static HTML at build time
// This makes Google read the full lesson content, not a JS loading shell
export function generateStaticParams() {
  const ids = [
    ...Array.from({ length: 28 }, (_, i) => i + 1),
    29, 30, 101, 102, 103, 201, 202, 301,
  ];
  return ids.map(id => ({ id: String(id) }));
}

const LESSONS_META = {
  // ── Beginner (IDs 1–6) ──────────────────────────────────────────
  1:  { title: 'Market Structure', description: 'Learn ICT Market Structure — HH/HL, BOS, ChoCH and MSS. Understand how price creates trends, breaks structure, and signals reversals. The foundation of every ICT trade setup.' },
  2:  { title: 'Liquidity Concepts', description: 'Understand why price really moves in ICT — stop hunts, BSL/SSL, equal highs and lows, and how smart money uses retail orders as fuel before delivering price.' },
  3:  { title: 'Fair Value Gaps (FVG)', description: 'Master Fair Value Gaps — the most-traded ICT concept. Learn BISI, SIBI, Consequent Encroachment and how 3-candle imbalances act as magnetic price entry zones.' },
  4:  { title: 'Order Blocks', description: 'Learn ICT Order Blocks — the institutional footprint on charts. Understand where banks place orders, how to identify valid OBs, Breakers and Mitigation Blocks.' },
  5:  { title: 'Killzones & Macro Times', description: 'Discover ICT Killzones and Macro Times — the precise time windows when the algorithm delivers price. London, New York AM, Silver Bullet and the Asian Range explained.' },
  6:  { title: 'Power of Three (AMD)', description: 'Master the Power of Three — Accumulate, Manipulate, Distribute. The three-act daily market script that runs every trading session and how to trade the Judas Swing.' },
  // ── Intermediate (IDs 7–14) ─────────────────────────────────────
  7:  { title: 'Premium & Discount Arrays', description: 'Learn the ICT Premium & Discount framework — institutions only buy cheap and sell expensive. Master the Fibonacci price delivery model that defines every valid ICT entry.' },
  8:  { title: 'ICT Entry Models', description: 'Study the official ICT entry models — the 2022 Model, Unicorn and optimal trade entry setups. The exact frameworks ICT uses to enter trades with surgical precision.' },
  9:  { title: 'The Silver Bullet Strategy', description: 'Deep dive into the ICT Silver Bullet — the most specific time-based trade setup. Learn the 3 daily Silver Bullet windows and how to execute this high-probability entry.' },
  10: { title: 'Higher Timeframe Analysis', description: 'Learn the ICT top-down analysis framework — how to read markets from Monthly bias down to 1-minute entry. The multi-timeframe methodology that separates ICT traders.' },
  11: { title: 'IPDA & Algorithmic Theory', description: 'Understand the IPDA — Interbank Price Delivery Algorithm — IPDA data ranges, weekly draws, and Candle Range Theory. Learn the machine behind every market move.' },
  12: { title: 'Risk Management (ICT Style)', description: 'Master ICT-style risk management — the 1% rule, RR ratios, stop placement, position sizing and the professional rules that keep consistent traders in the game.' },
  13: { title: 'Trade Management', description: 'Learn how to manage trades after entry — running winners, partial profits, break-even stops and the ICT approach to letting trades reach their full potential target.' },
  14: { title: 'Building Your ICT Trading Plan', description: 'Create your complete ICT trading plan — from timeframe selection and session focus to entry models, risk rules and the daily routine that builds lasting consistency.' },
  // ── Intermediate continued (IDs 15–25) ──────────────────────────
  15: { title: 'Daily Bias Framework', description: 'Master the daily bias framework — determining market direction before the session opens using monthly, weekly and daily timeframe alignment. The most critical ICT decision.' },
  16: { title: 'Draw on Liquidity', description: 'Understand the ICT Draw on Liquidity — where price is going before it arrives. Learn ERL vs IRL, how to identify your DOL and why this separates ICT traders from everyone else.' },
  17: { title: 'Dealing Ranges & PD Arrays', description: 'Master the full ICT PD Array Matrix — every institutional zone ranked by strength. Learn how to stack PD arrays for confluence and prioritize entries and targets.' },
  18: { title: 'Institutional Order Flow', description: 'Learn how banks and hedge funds actually move price — accumulation, manipulation and distribution at the institutional scale. Recognize stop hunt engineering and candle signatures.' },
  19: { title: 'Session Timing & Market Hours', description: 'The clock is as important as the chart. Learn ICT session timing — Asian, London, New York — and why when you trade matters as much as what setup you take.' },
  20: { title: 'Narrative Building', description: 'Learn to construct the complete trade story before price moves — the highest-level ICT skill. Build narratives from monthly bias down to 1-minute entry precision.' },
  21: { title: 'Quarterly Theory & Seasonal Tendencies', description: 'Markets breathe in quarterly cycles. Learn Q1 accumulation, Q2 manipulation, Q3 distribution and Q4 reversal — the macro rhythm that transforms your directional bias.' },
  22: { title: 'Liquidity Voids & Gaps', description: 'Understand liquidity voids, inefficiencies and opening gaps — the invisible zones price is magnetically drawn to fill. Learn NWOGs, NDOGs and void fill patterns.' },
  23: { title: 'Time & Price Theory', description: 'Price and time are inseparable. The algorithm delivers price to specific levels at specific times. Master the time dimension of ICT and trade both axes simultaneously.' },
  24: { title: 'Turtle Soup & Stop Hunts', description: 'Learn the Turtle Soup pattern — engineering false breakouts to trap breakout traders and reverse violently against them. The most reliable ICT reversal setup in every session.' },
  25: { title: 'Judas Swing & AMD Deep Dive', description: 'The Judas Swing dissected — how the false move traps retail traders and how to position against it every session. A complete AMD deep dive with real trade examples.' },
  // ── Advanced (IDs 26–28) ─────────────────────────────────────────
  26: { title: 'Balanced Price Range (BPR)', description: 'The Balanced Price Range — where a bullish and bearish FVG overlap to create the highest-probability reaction zone on any chart. The most precise ICT entry point.' },
  27: { title: 'Execution & Trade Management', description: 'Knowing the setup is 40% of trading — execution is the other 60%. Learn precise entry, SL placement, TP logic, partials and break-even — the professional execution framework.' },
  28: { title: 'Backtesting & Model Development', description: 'No edge can be trusted until proven across hundreds of historical setups. Build your personal ICT model and validate it before risking real capital — the complete backtesting system.' },
  // ── Risk Management Modules (IDs 29–30, 101–103) ─────────────────
  29: { title: 'Risk Management Fundamentals', description: 'The number one reason traders fail is poor risk management. Learn the core ICT risk rules — 1% rule, RR ratios, stop placement — and how to avoid the most common mistakes.' },
  30: { title: 'Advanced Risk Management & Position Sizing', description: 'Go beyond the basics — Kelly Criterion, correlation risk, drawdown recovery and protecting capital like a professional ICT trader across all market conditions.' },
  101: { title: 'Risk Management: Core Principles', description: 'Master the five core risk management rules every ICT trader must follow — position sizing, RR ratios, stop placement, the 1% rule and creating daily trading consistency.' },
  102: { title: 'Advanced Position Sizing & Portfolio Heat', description: 'Master portfolio heat, correlated pairs scaling and the Kelly Criterion — the advanced risk layer that professional ICT traders use to manage multiple positions.' },
  103: { title: 'The Psychology of Risk', description: 'Trading is 80% psychology. Master the four deadly emotions, cognitive biases, building discipline and the winning mindset that produces daily trading consistency.' },
  // ── Instrument Specific (IDs 201, 202, 301) ──────────────────────
  201: { title: 'ICT for NAS100 & US30 (Indices)', description: 'Apply ICT and Smart Money Concepts to stock indices. Learn index-specific killzones, opening range strategy and position sizing for NAS100 and US30 trading.' },
  202: { title: 'ICT for Gold (XAU/USD)', description: 'Gold is the ultimate safe-haven asset. Understand what drives gold, how to apply ICT killzones and how to trade the high-probability safe-haven setup on XAU/USD.' },
  301: { title: 'ICT for Crypto: Bitcoin & Ethereum', description: 'Apply ICT concepts to 24/7 crypto markets. Learn crypto killzones, leverage rules, Bitcoin cycle strategy and whale accumulation patterns for BTC and ETH trading.' },
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const meta = LESSONS_META[parseInt(id)];

  if (!meta) {
    return { robots: { index: false, follow: false } };
  }

  const paddedId = String(id).padStart(2, '0');

  return {
    title: `${meta.title} — ICT Trading Education`,
    description: meta.description,
    alternates: {
      canonical: `https://ictflow.com/lesson/${id}`,
    },
    openGraph: {
      title: `${meta.title} | ICT Flow`,
      description: meta.description,
      url: `https://ictflow.com/lesson/${id}`,
      siteName: 'ICT Flow',
      images: [{ url: `/modules/module-${paddedId}.png`, width: 1200, height: 630, alt: `${meta.title} — ICT Concept` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | ICT Flow`,
      description: meta.description,
      images: [`/modules/module-${paddedId}.png`],
    },
  };
}

export default function LessonLayout({ children }) {
  return children;
}
