// Server Component - handles SEO metadata for lessons
export async function generateMetadata({ params }) {
  const lessonId = parseInt(params?.id || '0');
  
  // All 28 lessons data
  const lessons = {
    1: { title: 'Market Structure Basics', module: '01' },
    2: { title: 'Liquidity Concepts', module: '02' },
    3: { title: 'Fair Value Gaps', module: '03' },
    4: { title: 'Order Blocks', module: '04' },
    5: { title: 'Killzones & Macros', module: '05' },
    6: { title: 'Power of Three', module: '06' },
    7: { title: 'Premium & Discount', module: '07' },
    8: { title: 'ICT Entry Models', module: '08' },
    9: { title: 'Market Maker Models', module: '09' },
    10: { title: 'SMT Divergence', module: '10' },
    11: { title: 'IPDA & CRT', module: '11' },
    12: { title: 'ICT 2024 Mentorship', module: '12' },
    13: { title: 'SMC Concepts', module: '13' },
    14: { title: 'Top-Down Analysis', module: '14' },
    15: { title: 'Advanced FVG', module: '15' },
    16: { title: 'Breaker Blocks', module: '16' },
    17: { title: 'Dealing Ranges', module: '17' },
    18: { title: 'Displacement', module: '18' },
    19: { title: 'Inducement', module: '19' },
    20: { title: 'Turtle Soup', module: '20' },
    21: { title: 'Judas Swing', module: '21' },
    22: { title: 'OTE Entry', module: '22' },
    23: { title: 'Multi-Timeframe', module: '23' },
    24: { title: 'Trading Plan', module: '24' },
    25: { title: 'Backtesting', module: '25' },
    26: { title: 'Psychology', module: '26' },
    27: { title: 'Journaling', module: '27' },
    28: { title: 'Live Trading', module: '28' },
  };
  
  const lesson = lessons[lessonId];
  const title = lesson?.title || 'Trading Lesson';
  const moduleNum = lesson?.module || String(lessonId).padStart(2, '0');
  
  return {
    title: `${title} | Module ${moduleNum} | ICT Flow`,
    description: `Learn ${title} in Module ${moduleNum} of ICT Flow trading education`,
  };
}

export default function LessonLayout({ children }) {
  return children;
}
