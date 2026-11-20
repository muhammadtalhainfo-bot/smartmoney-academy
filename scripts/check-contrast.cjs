'use strict';

const fs = require('node:fs');
const path = require('node:path');

const read = (relativePath) => fs.readFileSync(path.join(process.cwd(), relativePath), 'utf8');
const errors = [];

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) throw new Error('Expected a six-digit hex color: ' + hex);
  const rgb = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

function contrast(foreground, background) {
  const a = luminance(foreground);
  const b = luminance(background);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function expectContrast(foreground, background, label, minimum = 4.5) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    errors.push(label + ': ' + foreground + ' on ' + background + ' is ' + ratio.toFixed(2) + ':1 (needs ' + minimum + ':1).');
  }
}

function expectIncludes(source, expected, label) {
  if (!source.includes(expected)) errors.push(label + ': required accessible treatment is missing.');
}

// Core page labels and controls.
const homepage = read('app/page.js');
const tools = read('app/tools/page.js');
const lessonClient = read('app/lesson/[id]/LessonClient.js');
const admin = read('app/admin/page.js');
expectIncludes(homepage, "color:'#D4A843'", 'Homepage section label');
expectIncludes(tools, "color: '#D4A843'", 'Tools page subtitle');
expectIncludes(lessonClient, "color: ' #D4A843'".replace("color: ' #", "color: '#"), 'Lesson section index');
expectIncludes(admin, "color: '#D4A843'", 'Admin module index');
expectIncludes(admin, "color: '#FCA5A5'", 'Admin destructive action');
expectContrast('#D4A843', '#070707', 'Muted gold label');
expectContrast('#FCA5A5', '#0C0C0C', 'Admin destructive action');

// The leaderboard rank names are text, not merely decorative icon colors.
const leaderboard = read('app/leaderboard/page.js');
const rankBlock = leaderboard.match(/const RANKS = \[([\s\S]*?)\n\];/);
if (!rankBlock) {
  errors.push('Leaderboard rank palette could not be located.');
} else {
  const rankColors = [...rankBlock[1].matchAll(/color: '(#[0-9a-fA-F]{6})'/g)].map((match) => match[1]);
  if (rankColors.length !== 5) errors.push('Expected five leaderboard rank text colors; found ' + rankColors.length + '.');
  rankColors.forEach((color, index) => expectContrast(color, '#111111', 'Leaderboard rank ' + (index + 1)));
}

// Resource logos keep their brand colors, while their text uses a separately
// selected accent that remains readable on the #111 card background.
const resources = read('app/resources/page.js');
const resourceTextColors = [...resources.matchAll(/textColor:'(#[0-9a-fA-F]{6})'/g)].map((match) => match[1]);
if (resourceTextColors.length !== 8) {
  errors.push('Expected accessible text accents for all eight resource cards; found ' + resourceTextColors.length + '.');
}
resourceTextColors.forEach((color, index) => expectContrast(color, '#111111', 'Resource card text accent ' + (index + 1)));

// Dark text over the gold gradient must pass at its darkest stop.
const goldButtonFiles = [
  'app/about/page.js',
  'app/pricing/page.js',
  'app/certificate/page.js',
  'app/strategies/page.js',
];
for (const file of goldButtonFiles) {
  const content = read(file);
  expectIncludes(content, 'linear-gradient(135deg,#E8C547,#C49A22)', file + ' gold button gradient');
  if (content.includes('linear-gradient(135deg,#E8C547,#8A6B28)')) {
    errors.push(file + ': old low-contrast gold button gradient remains.');
  }
}
expectContrast('#000000', '#C49A22', 'Black button text at darkest gold gradient stop');

// Small SVG labels must be fully legible. The two large low-opacity words are
// intentional background watermarks, not informational labels.
const banner = read('app/components/ModuleBanner.js');
const textNodes = [...banner.matchAll(/<text\b[\s\S]*?<\/text>/g)].map((match) => match[0]);
let checkedSvgLabels = 0;
for (const node of textNodes) {
  const isLargeWatermark =
    /fontSize="(?:36|42)"/.test(node) &&
    />\s*(?:ICT|NAS100)\s*<\/text>/.test(node);
  if (isLargeWatermark) continue;
  const opacity = node.match(/fillOpacity="([0-9.]+)"/);
  if (opacity && Number(opacity[1]) < 0.9) {
    errors.push('SVG informational label has low opacity: ' + node.slice(0, 120).replace(/\s+/g, ' '));
  }
  if (/fillOpacity=\{0\.4 \+ i\*0\.12\}/.test(node)) {
    errors.push('SVG quarter labels still use a low-contrast dynamic opacity.');
  }
  checkedSvgLabels += 1;
}
if (checkedSvgLabels < 50) errors.push('SVG contrast audit scanned too few text labels: ' + checkedSvgLabels + '.');

// Certificate copy is rendered on a white paper surface, so test it against
// white rather than incorrectly comparing it with the site's dark body.
for (const color of ['#666666', '#8A6B28', '#6B4F16', '#5B6573', '#333333', '#1A1A1A']) {
  expectContrast(color, '#FFFFFF', 'Certificate text on paper');
}

if (errors.length) {
  for (const error of errors) console.error('Contrast guard failed: ' + error);
  process.exit(1);
}

console.log('Contrast guard passed: page labels, admin actions, five leaderboard ranks, eight resource-card accents, gold buttons, SVG labels and certificate text.');
