import { LESSONS_EXTRA } from './lessons-data';

const LESSONS_BASE_TITLES = {
  1: 'Introduction to ICT', 2: 'Market Structure', 3: 'Liquidity', 4: 'Fair Value Gaps',
  5: 'Order Blocks', 6: 'Breaker Blocks', 7: 'Mitigation Blocks', 8: 'Killzones',
  9: 'AMD Model', 10: 'Silver Bullet', 11: 'Power of 3', 12: 'IPDA',
  13: 'OTE & Fibonacci', 14: 'SMT Divergence',
};

const ALL_TITLES = {
  ...LESSONS_BASE_TITLES,
  ...Object.fromEntries(Object.entries(LESSONS_EXTRA).map(([k,v]) => [k, v.title]))
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const title = ALL_TITLES[parseInt(id)];
  if (!title) return {};
  return {
    title: `${title} | ICT Flow`,
    description: `Learn ${title} - ICT and Smart Money Concepts trading education`,
    alternates: { canonical: `https://ictflow.com/lesson/${id}` },
  };
}

export default function LessonLayout({ children }) {
  return children;
}
