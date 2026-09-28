import { MODULES } from '@/lib/curriculum';
// Pre-render all lesson pages as static HTML at build time
// This makes Google read the full lesson content, not a JS loading shell
export function generateStaticParams() {
  return MODULES.map(({ id }) => ({ id: String(id) }));
}

const LESSONS_META = {
  // ── Beginner (IDs 1–6) ──────────────────────────────────────────
  1:  { title: 'Market Structure', description: 'Learn ICT Market Structure — HH/HL, BOS, ChoCH and MSS. Study how traders interpret trends, breaks of structure, and potential reversals.' },
  2:  { title: 'Liquidity Concepts', description: 'Study liquidity concepts including BSL/SSL, equal highs and lows, sweeps, and how ICT traders interpret potential liquidity objectives.' },
  3:  { title: 'Fair Value Gaps (FVG)', description: 'Study Fair Value Gaps, BISI/SIBI, Consequent Encroachment, and how traders test 3-candle imbalances as potential entry areas.' },
  4:  { title: 'Order Blocks', description: 'Study ICT Order Blocks, Breakers, and Mitigation Blocks and how traders interpret these zones on charts.' },
  5:  { title: 'Killzones & Macro Times', description: 'Study ICT Killzones, macro times, London and New York sessions, Silver Bullet windows, and Asian Range concepts.' },
  6:  { title: 'Power of Three (AMD)', description: 'Study the Power of Three (AMD), its accumulation/manipulation/distribution framework, and the Judas Swing concept.' },
  // ── Intermediate (IDs 7–14) ─────────────────────────────────────
  7:  { title: 'Premium & Discount Arrays', description: 'Study premium and discount ranges, equilibrium, OTE, and how traders use Fibonacci-based ranges to frame potential entries.' },
  8:  { title: 'ICT Entry Models', description: 'Study commonly taught ICT entry models including the 2022 Model, Unicorn, and OTE, with emphasis on testable entry rules.' },
  9:  { title: 'The Silver Bullet Strategy', description: 'Study the ICT Silver Bullet as a time-window model, including commonly cited windows and entry conditions that traders can test.' },
  10: { title: 'Higher Timeframe Analysis', description: 'Learn the ICT top-down analysis framework — how to read markets from Monthly bias down to 1-minute entry. The multi-timeframe methodology that separates ICT traders.' },
  11: { title: 'IPDA & Algorithmic Theory', description: 'Understand the IPDA — Interbank Price Delivery Algorithm — IPDA data ranges, weekly draws, and Candle Range Theory. Learn the machine behind every market move.' },
  12: { title: 'Risk Management (ICT Style)', description: 'Master ICT-style risk management — the 1% rule, RR ratios, stop placement, position sizing and the professional rules that keep consistent traders in the game.' },
  13: { title: 'Trade Management', description: 'Learn how to manage trades after entry — running winners, partial profits, break-even stops and the ICT approach to letting trades reach their full potential target.' },
  14: { title: 'Building Your ICT Trading Plan', description: 'Create your complete ICT trading plan — from timeframe selection and session focus to entry models, risk rules and the daily routine that builds lasting consistency.' },
  // ── Intermediate continued (IDs 15–25) ──────────────────────────
  15: { title: 'Daily Bias Framework', description: 'Study daily bias construction using higher-timeframe context, prior-day levels, and session information.' },
  16: { title: 'Draw on Liquidity', description: 'Understand the ICT Draw on Liquidity — where price is going before it arrives. Learn ERL vs IRL, how to identify your DOL and why this separates ICT traders from everyone else.' },
  17: { title: 'Dealing Ranges & PD Arrays', description: 'Master the full ICT PD Array Matrix — every institutional zone ranked by strength. Learn how to stack PD arrays for confluence and prioritize entries and targets.' },
  18: { title: 'Institutional Order Flow', description: 'Learn how banks and hedge funds actually move price — accumulation, manipulation and distribution at the institutional scale. Recognize stop hunt engineering and candle signatures.' },
  19: { title: 'Session Timing & Market Hours', description: 'The clock is as important as the chart. Learn ICT session timing — Asian, London, New York — and why when you trade matters as much as what setup you take.' },
  20: { title: 'Narrative Building', description: 'Learn to construct the complete trade story before price moves — the highest-level ICT skill. Build narratives from monthly bias down to 1-minute entry precision.' },
  21: { title: 'Quarterly Theory & Seasonal Tendencies', description: 'Markets breathe in quarterly cycles. Learn Q1 accumulation, Q2 manipulation, Q3 distribution and Q4 reversal — the macro rhythm that transforms your directional bias.' },
  22: { title: 'Liquidity Voids & Gaps', description: 'Understand liquidity voids, inefficiencies and opening gaps — the invisible zones price is magnetically drawn to fill. Learn NWOGs, NDOGs and void fill patterns.' },
  23: { title: 'Time & Price Theory', description: 'Price and time are inseparable. The algorithm delivers price to specific levels at specific times. Master the time dimension of ICT and trade both axes simultaneously.' },
  24: { title: 'Turtle Soup & Stop Hunts', description: 'Study Turtle Soup as a false-breakout and liquidity-sweep reversal concept, including its conditions and limitations.' },
  25: { title: 'Judas Swing & AMD Deep Dive', description: 'The Judas Swing dissected — how the false move traps retail traders and how to position against it every session. A complete AMD deep dive with real trade examples.' },
  // ── Advanced (IDs 26–28) ─────────────────────────────────────────
  26: { title: 'Balanced Price Range (BPR)', description: 'Study Balanced Price Range formation and how traders evaluate overlapping FVGs as potential reaction zones.' },
  27: { title: 'Execution & Trade Management', description: 'Study execution, stop placement, target selection, partials, and break-even logic within a defined trading plan.' },
  28: { title: 'Backtesting & Model Development', description: 'Learn how to backtest an ICT model, evaluate sample size and out-of-sample performance, and validate rules before risking capital.' },
  // ── Risk Management Modules (IDs 29–30, 101–103) ─────────────────
  29: { title: 'Risk Management Fundamentals', description: 'Study core ICT risk-management rules, including position sizing, R:R, stop placement, and common risk mistakes.' },
  30: { title: 'Advanced Risk Management & Position Sizing', description: 'Go beyond the basics — Kelly Criterion, correlation risk, drawdown recovery and protecting capital like a professional ICT trader across all market conditions.' },
  101: { title: 'Risk Management: Core Principles', description: 'Master the five core risk management rules every ICT trader must follow — position sizing, RR ratios, stop placement, the 1% rule and creating daily trading consistency.' },
  102: { title: 'Advanced Position Sizing & Portfolio Heat', description: 'Master portfolio heat, correlated pairs scaling and the Kelly Criterion — the advanced risk layer that professional ICT traders use to manage multiple positions.' },
  103: { title: 'The Psychology of Risk', description: 'Study trading psychology, cognitive biases, discipline, mindset, and routines without assuming a universal percentage split.' },
  // ── Instrument Specific (IDs 201, 202, 301) ──────────────────────
  201: { title: 'ICT for NAS100 & US30 (Indices)', description: 'Apply ICT and Smart Money Concepts to stock indices. Learn index-specific killzones, opening range strategy and position sizing for NAS100 and US30 trading.' },
  202: { title: 'ICT for Gold (XAU/USD)', description: 'Study gold-specific drivers, ICT session timing, and ways traders adapt their framework to XAU/USD.' },
  301: { title: 'ICT for Crypto: Bitcoin & Ethereum', description: 'Apply ICT concepts to 24/7 crypto markets. Learn crypto-specific timing, leverage and execution risks, and how to adapt your existing framework to BTC and ETH.' },
  31: { title: 'Trade Review & Journal Process', description: 'Build a structured trading journal, review trades with R-multiples and MAE/MFE, classify process errors, and turn repeated observations into testable rule changes.' },
  32: { title: 'Macro, News & Execution Risk', description: 'Learn how scheduled economic events can affect volatility, spreads and slippage, and build a news-aware no-trade and re-entry process.' },
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const meta = LESSONS_META[parseInt(id)];

  if (!meta) {
    return { robots: { index: false, follow: false } };
  }

  const numericId = Number(id);
  const moduleRecord = MODULES.find((module) => module.id === numericId);
  const socialImage = moduleRecord?.image || '/og-image.png';

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
      images: [{ url: socialImage, width: 1200, height: 630, alt: `${meta.title} — ICT Concept` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | ICT Flow`,
      description: meta.description,
      images: [socialImage],
    },
  };
}

export default async function LessonLayout({ children, params }) {
  const { id } = await params;
  const numericId = Number(id);
  const meta = LESSONS_META[numericId];

  if (!meta) return children;

  const canonical = `https://ictflow.com/lesson/${id}`;
  const moduleRecord = MODULES.find((module) => module.id === numericId);
  const image = moduleRecord?.image
    ? (moduleRecord.image.startsWith('http') ? moduleRecord.image : `https://ictflow.com${moduleRecord.image}`)
    : 'https://ictflow.com/og-image.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.title,
    description: meta.description,
    image: [image],
    author: {
      '@type': 'Organization',
      name: 'ICT Flow',
      url: 'https://ictflow.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ICT Flow',
      url: 'https://ictflow.com',
      logo: { '@type': 'ImageObject', url: 'https://ictflow.com/favicon-96x96.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    url: canonical,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
