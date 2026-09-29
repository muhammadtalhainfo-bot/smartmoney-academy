import { QUESTIONS } from './questions';
import PracticeClient from './PracticeClient';

export const dynamic = 'force-dynamic';

function getDailyQuestions() {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / 86400000);
  const setCount = Math.max(1, Math.floor(QUESTIONS.length / 5));
  const setIndex = dayOfYear % setCount;
  return QUESTIONS.slice(setIndex * 5, setIndex * 5 + 5);
}

export default function PracticePage() {
  const now = new Date();
  const dateStr = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(now);

  return <PracticeClient initialQuestions={getDailyQuestions()} dateStr={dateStr} />;
}
