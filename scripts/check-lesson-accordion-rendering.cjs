'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const clientPath = path.join(__dirname, '..', 'app', 'lesson', '[id]', 'LessonClient.js');
const source = fs.readFileSync(clientPath, 'utf8');
const sectionStart = source.indexOf('function Section(');
const sectionEnd = source.indexOf('// ─── Quiz component', sectionStart);

assert.notEqual(sectionStart, -1, 'Section component must exist');
assert.notEqual(sectionEnd, -1, 'Section component boundary must exist');

const section = source.slice(sectionStart, sectionEnd);
assert.match(section, /aria-expanded=\{open\}/, 'Accordion button should expose expanded state');
assert.match(section, /aria-controls=\{\x60lesson-section-\$\{index\}\x60\}/, 'Accordion button must point to its panel');
assert.match(section, /id=\{\x60lesson-section-\$\{index\}\x60\} hidden=\{!open\}/, 'Panel should remain in the rendered DOM while closed');
assert.match(section, /\{section\.content\}/, 'Lesson section content should stay inside the panel');
assert.doesNotMatch(section, /\{open\s*&&\s*\(/, 'Closed panels must not be conditionally omitted');
assert.match(section, /section\.highlight\s*&&/, 'Optional section highlights should remain panel content');

console.log('Lesson accordion SSR/rendering checks passed (6 assertions).');
