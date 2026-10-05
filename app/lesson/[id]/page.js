import { notFound } from 'next/navigation';
import { MODULES } from '@/lib/curriculum';
import { ALL_LESSONS } from './lesson-data';
import { LESSONS_EXTRA as LEGACY_LESSONS } from './lessons-data';
import LessonClient from './LessonClient';

export function generateStaticParams() {
  return MODULES.map((module) => ({ id: String(module.id) }));
}

export default async function LessonPage({ params }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();

  const lessonId = Number.parseInt(id, 10);
  if (!Number.isSafeInteger(lessonId) || String(lessonId) !== id) notFound();

  const lesson = ALL_LESSONS[lessonId] || LEGACY_LESSONS[lessonId];
  if (!lesson) notFound();

  const curriculumModule = MODULES.find((module) => module.id === lessonId);
  const moduleDiagramSrc = curriculumModule?.image || lesson.image || '/images/market-structure.webp';

  return (
    <LessonClient
      lesson={lesson}
      lessonId={lessonId}
      moduleDiagramSrc={moduleDiagramSrc}
    />
  );
}
