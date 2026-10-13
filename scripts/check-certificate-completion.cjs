const fs = require('node:fs');

const curriculum = fs.readFileSync('lib/curriculum.js', 'utf8');
const quizAnswers = fs.readFileSync('lib/lesson-quiz-answers.js', 'utf8');
const completionApi = fs.readFileSync('app/api/lesson-completion/route.js', 'utf8');
const lessonDataSources = [
  ['app/lesson/[id]/lesson-data.js', fs.readFileSync('app/lesson/[id]/lesson-data.js', 'utf8')],
  ['app/lesson/[id]/lessons-data.js', fs.readFileSync('app/lesson/[id]/lessons-data.js', 'utf8')],
];

const certificateApi = fs.readFileSync('app/api/certificate/route.js', 'utf8');
const errors = [];

const moduleIds = [...curriculum.matchAll(/^\s*id:\s*(\d+),\s*module:\s*["'][^"']+["']/gm)]
  .map((match) => Number(match[1]));
const quizEntries = [...quizAnswers.matchAll(/(?:^|[,\n])\s*(\d+)\s*:\s*\[([^\]]+)\]/g)]
  .map((match) => ({
    id: Number(match[1]),
    answerCount: match[2].split(',').map((value) => value.trim()).filter(Boolean).length,
  }));
const quizIds = quizEntries.map((entry) => entry.id);

if (!moduleIds.length) errors.push('No curriculum module IDs found.');
if (new Set(moduleIds).size !== moduleIds.length) errors.push('Curriculum module IDs must be unique.');
if (new Set(quizIds).size !== quizIds.length) errors.push('Server-side quiz answer keys must be unique.');
for (const id of moduleIds) {
  if (!quizIds.includes(id)) errors.push('Curriculum module ' + id + ' has no server-side quiz answer key.');
}
for (const id of quizIds) {
  if (!moduleIds.includes(id)) errors.push('Quiz answer key ' + id + ' does not map to a curriculum module.');
}


const lessonEntries = [];
for (const [file, source] of lessonDataSources) {
  const blocks = [...source.matchAll(/^  (\d+): \{\s*$/gm)];
  for (let index = 0; index < blocks.length; index += 1) {
    const start = blocks[index].index;
    const end = index + 1 < blocks.length ? blocks[index + 1].index : source.length;
    const body = source.slice(start, end);
    lessonEntries.push({
      file,
      id: Number(blocks[index][1]),
      questionCount: (body.match(/\{\s*q\s*:/g) || []).length,
    });
  }
}
if (new Set(lessonEntries.map((entry) => entry.id)).size !== lessonEntries.length) {
  errors.push('Lesson page data must not define duplicate route IDs across lesson data files.');
}
for (const lesson of lessonEntries) {
  if (!moduleIds.includes(lesson.id)) {
    errors.push(lesson.file + ' defines lesson ID ' + lesson.id + ' outside the curriculum module list.');
  }
  const answerKey = quizEntries.find((entry) => entry.id === lesson.id);
  if (!answerKey) {
    errors.push(lesson.file + ' defines lesson ID ' + lesson.id + ' without a server-side answer key.');
  } else if (!lesson.questionCount || lesson.questionCount !== answerKey.answerCount) {
    errors.push(lesson.file + ' lesson ' + lesson.id + ' has ' + lesson.questionCount +
      ' quiz questions but ' + answerKey.answerCount + ' server-side answers.');
  }
}
for (const id of moduleIds) {
  if (!lessonEntries.some((entry) => entry.id === id)) {
    errors.push('Curriculum module ' + id + ' has no lesson page data.');
  }
}

if (!completionApi.includes('LESSON_QUIZ_ANSWERS[lessonId]') ||
    !completionApi.includes('p_lesson_id: lessonId')) {
  errors.push('Lesson completion must validate and store the canonical module route ID.');
}
if (!certificateApi.includes('const requiredModuleIds = MODULES.map((module) => module.id);')) {
  errors.push('Certificate eligibility must derive required IDs from the canonical curriculum.');
}
if (!certificateApi.includes('const completedModuleIdsSet = new Set(') ||
    !certificateApi.includes('requiredModuleIds.filter((moduleId) => completedModuleIdsSet.has(moduleId))')) {
  errors.push('Certificate completion must be calculated from passed completions keyed by module ID.');
}
if (!certificateApi.includes('completedModuleIdsSet.has(Number(row.lesson_id))')) {
  errors.push('Certificate issue date must use the same successfully completed module-ID set.');
}
if (certificateApi.includes('completedIds.has(')) {
  errors.push('Certificate route contains an undefined/legacy completedIds reference.');
}
if (certificateApi.includes('let lessonCursor = 1') ||
    /lessonId\s*<=\s*totalLessons/.test(certificateApi)) {
  errors.push('Certificate route must not assume sequential lesson-unit IDs; completions are keyed by module IDs.');
}
if (!certificateApi.includes("if (profile?.is_pro !== true)")) {
  errors.push('Certificate endpoint must continue to enforce Pro entitlement.');
}
if (!certificateApi.includes("Number(row.quiz_score) >= 70")) {
  errors.push('Certificate eligibility must include only passing quiz completions.');
}

if (errors.length) {
  for (const error of errors) console.error('Certificate completion guard failed: ' + error);
  process.exit(1);
}

console.log('Certificate guard passed: ' + moduleIds.length +
  ' module IDs match ' + quizIds.length +
  ' answer keys; certificate eligibility uses the same module completion model.');
