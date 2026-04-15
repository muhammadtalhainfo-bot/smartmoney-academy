// Server Component - handles SEO metadata for lessons
export async function generateMetadata({ params }) {
  // Lesson data mapping (add all 28 lessons here)
  const lessons = {
    1: { title: 'Market Structure Basics', desc: 'Learn HH/HL, BOS, ChoCH fundamentals' },
    2: { title: 'Liquidity Concepts', desc: 'Understanding BSL, SSL, and stop hunts' },
    3: { title: 'Fair Value Gaps', desc: 'Master BISI, SIBI, and gap trading' },
    4: { title: 'Order Blocks', desc: 'Identify and trade institutional order blocks' },
    5: { title: 'Killzones', desc: 'Trade the London and New York sessions' },
    6: { title: 'AMD Model', desc: 'Accumulation, Manipulation, Distribution' },
    7: { title: 'Premium & Discount', desc: 'Institutional pricing levels' },
    8: { title: 'Entry Models', desc: 'High-probability ICT entry setups' },
    9: { title: 'SMT Divergence', desc: 'Smart Money Technique divergence' },
    10: { title: 'IPDA Levels', desc: 'Institutional Price Delivery Algorithm' },
    11: { title: 'Silver Bullet', desc: 'The 1-hour ICT setup' },
    12: { title: 'Market Maker Models', desc: 'Advanced institutional models' },
    13: { title: 'Time & Price', desc: 'ICT temporal and price concepts' },
    14: { title: 'Risk Management', desc: 'Position sizing and trade management' },
    15: { title: 'Advanced FVG', desc: 'Fair Value Gap variations' },
    16: { title: 'Breaker Blocks', desc: 'Mitigation and breaker concepts' },
    17: { title: 'Dealing Ranges', desc: 'Range-bound market strategies' },
    18: { title: 'Displacement', desc: 'Understanding market displacement' },
    19: { title: ' inducement', desc: 'Inducement trading concepts' },
    20: { title: ' turtle Soup', desc: 'False breakout trading' },
    21: { title: 'Judas Swing', desc: 'The AMD manipulation phase' },
    22: { title: 'OTE Entry', desc: 'Optimal Trade Entry with Fibonacci' },
    23: { title: 'Multi-Timeframe', desc: 'Top-down analysis approach' },
    24: { title: 'Trading Plan', desc: 'Creating your ICT trading plan' },
    25: { title: 'Backtesting', desc: 'How to backtest ICT strategies' },
    26: { title: 'Psychology', desc: 'Trading psychology and discipline' },
    27: { title: 'Journaling', desc: 'Effective trade journaling' },
    28: { title: 'Live Trading', desc: 'Putting it all together' },
  };
  
  const lesson = lessons[params.id];
  const title = lesson ? lesson.title : 'Lesson';
  const description = lesson ? lesson.desc : 'ICT Flow trading lesson';
  
  return {
    title: `${title} | Module ${params.id} | ICT Flow`,
    description: description,
    openGraph: {
      title: `${title} | ICT Flow`,
      description: description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ICT Flow`,
      description: description,
    }
  };
}

export default function LessonLayout({ children }) {
  return children;
}
