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
  9:  { title: 'Market Maker Models', description: 'Study MMBM and MMSM frameworks, False Flag, Seek & Destroy and TGIF concepts as testable multi-day price-behavior models.' },
  10: { title: 'SMT Divergence', description: 'Study SMT divergence between correlated markets, intermarket comparisons, index SMT and rules for testing divergence as confirmation.' },
  11: { title: 'IPDA & CRT', description: 'Study IPDA, 20/40/60-day lookbacks, NWOG and NDOG gaps, weekly draws and Candle Range Theory as testable ICT frameworks.' },
  12: { title: 'ICT 2024 Mentorship', description: 'Study newer ICT concepts including the Venom Model, Propulsion Blocks, Quarterly Shifts, SCOB, QML and weekly profile templates.' },
  13: { title: 'SMC — Smart Money Concepts', description: 'Study the community SMC framework, including structure, supply and demand, order blocks, CHoCH, BOS, inducement and a rules-based workflow.' },
  14: { title: 'Top-Down Analysis', description: 'Study multi-timeframe analysis from Monthly and Weekly context through Daily narrative, 4H confirmation and 15M/5M execution.' },
  // ── Intermediate continued (IDs 15–25) ──────────────────────────
  15: { title: 'Daily Bias Framework', description: 'Study daily bias construction using higher-timeframe context, prior-day levels, and session information.' },
  16: { title: 'Draw on Liquidity', description: 'Study the ICT Draw on Liquidity framework, including ERL vs IRL, potential DOL targets, and how traders map objectives before execution.' },
  17: { title: 'Dealing Ranges & PD Arrays', description: 'Study the ICT PD Array Matrix, compare commonly taught institutional zones, and learn how traders test confluence for entries and targets.' },
  18: { title: 'Institutional Order Flow', description: 'Study institutional-order-flow concepts including accumulation, manipulation, distribution, and common interpretations of liquidity-seeking price behavior.' },
  19: { title: 'Session Timing & Market Hours', description: 'Study ICT session timing across Asian, London, and New York hours, and examine how session context can be incorporated into a trading plan.' },
  20: { title: 'Narrative Building', description: 'Learn to construct a multi-timeframe trade narrative from higher-timeframe context to lower-timeframe execution, using explicit assumptions you can test.' },
  21: { title: 'Quarterly Theory & Seasonal Tendencies', description: 'Study Quarterly Theory and seasonal tendencies as contextual frameworks for organizing market observations across longer time horizons.' },
  22: { title: 'Liquidity Voids & Gaps', description: 'Study liquidity voids, inefficiencies, and opening gaps, including NWOGs, NDOGs, and common approaches to evaluating potential gap fills.' },
  23: { title: 'Time & Price Theory', description: 'Study ICT time-and-price concepts, including session timing, price levels, and ways traders test relationships between time windows and price behavior.' },
  24: { title: 'Turtle Soup & Stop Hunts', description: 'Study Turtle Soup as a false-breakout and liquidity-sweep reversal concept, including its conditions and limitations.' },
  25: { title: 'Judas Swing & AMD Deep Dive', description: 'Study the Judas Swing within the AMD framework, including the false-move concept, session context, and conditions traders can test.' },
  // ── Advanced (IDs 26–28) ─────────────────────────────────────────
  26: { title: 'Balanced Price Range (BPR)', description: 'Study Balanced Price Range formation and how traders evaluate overlapping FVGs as potential reaction zones.' },
  27: { title: 'Execution & Trade Management', description: 'Study execution, stop placement, target selection, partials, and break-even logic within a defined trading plan.' },
  28: { title: 'Backtesting & Model Development', description: 'Learn how to backtest an ICT model, evaluate sample size and out-of-sample performance, and validate rules before risking capital.' },
  // ── Risk Management Modules (IDs 29–30, 101–103) ─────────────────
  29: { title: 'Risk Management Fundamentals', description: 'Study core ICT risk-management concepts, including position sizing, reward-to-risk ratios, stop placement, and common risk mistakes.' },
  30: { title: 'Advanced Risk Management & Position Sizing', description: 'Study Kelly Criterion, correlation risk, drawdown recovery, and capital-preservation concepts for managing risk across changing market conditions.' },
  101: { title: 'Risk Management: Core Principles', description: 'Study core risk-management principles including position sizing, reward-to-risk ratios, stop placement, and how traders evaluate risk limits and consistency.' },
  102: { title: 'Advanced Position Sizing & Portfolio Heat', description: 'Study portfolio heat, correlated-position scaling, and Kelly Criterion concepts as advanced tools for evaluating exposure across multiple positions.' },
  103: { title: 'The Psychology of Risk', description: 'Study trading psychology, cognitive biases, discipline, mindset, and routines without assuming a universal percentage split.' },
  // ── Instrument Specific (IDs 201, 202, 301) ──────────────────────
  201: { title: 'ICT for NAS100 & US30 (Indices)', description: 'Apply ICT and Smart Money Concepts to stock indices. Study index-specific session timing, opening-range concepts, and position sizing for NAS100 and US30.' },
  202: { title: 'ICT for Gold (XAU/USD)', description: 'Study gold-specific drivers, ICT session timing, and ways traders adapt their framework to XAU/USD.' },
  301: { title: 'ICT for Crypto: Bitcoin & Ethereum', description: 'Apply ICT concepts to 24/7 crypto markets. Study crypto-specific timing, leverage and execution risks, and ways to adapt an existing framework to BTC and ETH.' },
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
