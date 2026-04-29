const LESSONS_META = {
  1: { title: 'Market Structure', description: 'Learn ICT Market Structure — HH/HL, BOS, ChoCH, MSS and how price creates trends, breaks structure, and signals reversals. The foundation of every ICT trade.' },
  2: { title: 'Liquidity Concepts', description: 'Understand WHY price really moves in ICT — stop hunts, BSL/SSL, equal highs and lows, and how smart money uses retail orders as fuel. Master liquidity before anything else.' },
  3: { title: 'Fair Value Gaps (FVG)', description: 'Master Fair Value Gaps — the most-traded ICT concept. Learn BISI, SIBI, Consequent Encroachment, and how 3-candle imbalances act as magnetic entry zones.' },
  4: { title: 'Order Blocks', description: 'Learn ICT Order Blocks — the institutional footprint on charts. Understand where banks actually place orders, how to identify valid OBs, Breakers, and Mitigation Blocks.' },
  5: { title: 'Killzones & Macro Times', description: 'Discover ICT Killzones and Macro Times — the precise time windows when the algorithm delivers price. London, New York AM, Silver Bullet windows and the Asian Range explained.' },
  6: { title: 'Power of Three (AMD)', description: 'Master the Power of Three — Accumulate, Manipulate, Distribute. The three-act daily market script that runs every trading session and how to trade the Judas Swing.' },
  7: { title: 'Premium & Discount Arrays', description: 'Learn the ICT Premium & Discount framework — institutions only buy cheap and sell expensive. Master the Fibonacci price delivery model that defines every valid ICT entry.' },
  8: { title: 'ICT Entry Models', description: 'Study the official ICT entry models — the 2022 Model, Unicorn, and optimal trade entry setups. The exact frameworks ICT uses to enter trades with surgical precision.' },
  9: { title: 'The Silver Bullet Strategy', description: 'Deep dive into the ICT Silver Bullet — the most specific time-based trade setup. Learn the 3 daily Silver Bullet windows and how to execute this high-probability entry model.' },
  10: { title: 'Higher Timeframe Analysis', description: 'Learn the ICT top-down analysis framework — how to read markets from Monthly bias down to 1-minute entry. The multi-timeframe methodology that separates ICT traders from everyone else.' },
  11: { title: 'IPDA & Algorithmic Theory', description: 'Understand the IPDA — the Interbank Price Delivery Algorithm — IPDA data ranges, weekly draws, and Candle Range Theory. Learn the machine behind every market move.' },
  12: { title: 'Risk Management (ICT Style)', description: 'Master ICT-style risk management — the 1% rule, RR ratios, stop placement, position sizing, and the professional rules that keep consistent traders in the game long-term.' },
  13: { title: 'Trade Management', description: 'Learn how to manage trades after entry — running winners, partial profits, break-even stops, and the ICT approach to letting trades reach their full potential target.' },
  14: { title: 'Building Your ICT Trading Plan', description: 'Create your complete ICT trading plan — from timeframe selection and session focus to entry models, risk rules, and the daily routine that builds consistency.' },
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const meta = LESSONS_META[parseInt(id)];
  if (!meta) return {};
  return {
    title: `${meta.title} — ICT Trading Education`,
    description: meta.description,
    alternates: { canonical: `https://ictflow.com/lesson/${id}` },
    openGraph: {
      title: `${meta.title} | ICT Flow`,
      description: meta.description,
      url: `https://ictflow.com/lesson/${id}`,
      siteName: 'ICT Flow',
      images: [{ url: `/modules/module-${String(id).padStart(2, '0')}.png`, width: 1200, height: 630, alt: `${meta.title} — ICT Concept` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | ICT Flow`,
      description: meta.description,
      images: [`/modules/module-${String(id).padStart(2, '0')}.png`],
    },
  };
}

export default function LessonLayout({ children }) { return children; }
