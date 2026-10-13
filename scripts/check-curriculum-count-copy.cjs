const fs = require('node:fs');

const curriculum = fs.readFileSync('lib/curriculum.js', 'utf8');
const currentModuleCount = [...curriculum.matchAll(/^\s*id:\s*\d+,\s*module:\s*["'][^"']+["']/gm)].length;
const lessonCounts = [...curriculum.matchAll(/^\s*lessons:\s*(\d+)/gm)].map((match) => Number(match[1]));
const currentLessonCount = lessonCounts.reduce((total, count) => total + count, 0);
const errors = [];

if (!currentModuleCount || !lessonCounts.length || !currentLessonCount) {
  errors.push('Could not derive the current module and lesson totals from lib/curriculum.js.');
}

const stalePatterns = [
  { label: 'hard-coded module count', pattern: /\b\d+\s+modules?\b/i, examples: ['38 modules', '12 module'] },
  { label: 'hard-coded hyphenated module count', pattern: /\b\d+-modules?\b/i, examples: ['38-module', '14-modules'] },
  { label: 'hard-coded lesson total', pattern: /\b\d+\+?\s+lessons?\b/i, examples: ['203+ lessons', '156 lessons'] },
];
for (const item of stalePatterns) {
  for (const example of item.examples) {
    if (!item.pattern.test(example)) errors.push('Self-test failed for ' + item.label + ': ' + example);
  }
  if (item.pattern.test('COUNT_FROM_CURRICULUM modules') ||
      item.pattern.test('COUNT_FROM_CURRICULUM lessons')) {
    errors.push('Count guard incorrectly matches a non-literal curriculum count expression for ' + item.label + '.');
  }
}

const countFiles = [
  'app/page.js',
  'app/courses/layout.js',
  'app/auth/page.js',
  'app/not-found.js',
  'app/learn/[slug]/page.js',
  'app/admin/page.js',
];
for (const file of countFiles) {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('CURRICULUM_STATS')) {
    errors.push(file + ' must import and use the canonical CURRICULUM_STATS data.');
  }
  for (const item of stalePatterns) {
    if (item.pattern.test(source)) {
      errors.push(file + ' still contains a hard-coded curriculum count (' + item.label + ').');
    }
  }
}

if (errors.length) {
  for (const error of errors) console.error('Curriculum count consistency guard failed: ' + error);
  process.exit(1);
}

console.log('Curriculum count guard passed. Current catalogue: ' + currentModuleCount +
  ' modules and ' + currentLessonCount + ' lesson units; audited ' + countFiles.length + ' UI files.');
