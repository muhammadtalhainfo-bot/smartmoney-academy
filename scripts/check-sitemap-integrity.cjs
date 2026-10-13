const fs = require('node:fs');

const errors = [];
function fail(message) {
  errors.push(message);
}

const sitemap = fs.readFileSync('app/sitemap.js', 'utf8');
const robots = fs.readFileSync('public/robots.txt', 'utf8');
const guideSource = fs.readFileSync('app/learn/seo-data.js', 'utf8');
const curriculum = fs.readFileSync('lib/curriculum.js', 'utf8');
const lessonLayout = fs.readFileSync('app/lesson/[id]/layout.js', 'utf8');

const baseMatch = sitemap.match(/const BASE\s*=\s*['"]([^'"]+)['"]/);
const canonicalBase = baseMatch?.[1] || '';
if (canonicalBase !== 'https://ictflow.com') {
  fail('Sitemap BASE must remain https://ictflow.com.');
}
if (!/^\s*Sitemap:\s*https:\/\/ictflow\.com\/sitemap\.xml\s*$/im.test(robots)) {
  fail('robots.txt must advertise the canonical sitemap URL.');
}
if (/lastModified\s*:/.test(sitemap)) {
  fail('Sitemap must not emit an unverified lastModified timestamp.');
}

const staticStart = sitemap.indexOf('const staticPages = [');
const staticEnd = sitemap.indexOf('].map(([url, priority, changeFrequency])', staticStart);
if (staticStart < 0 || staticEnd < 0) {
  fail('Could not locate the static sitemap URL source list.');
}
const staticBlock = staticStart >= 0 && staticEnd > staticStart
  ? sitemap.slice(staticStart, staticEnd)
  : '';
const staticPaths = [];
if (/^\s*\[BASE\s*,/m.test(staticBlock)) staticPaths.push('/');
for (const match of staticBlock.matchAll(/\x60\$\{BASE\}\/([^\x60]+)\x60/g)) {
  staticPaths.push('/' + match[1]);
}
if (!staticPaths.length) fail('No static sitemap routes were parsed.');
if (new Set(staticPaths).size !== staticPaths.length) {
  fail('Static sitemap URLs must not contain duplicates.');
}

const expectedStaticPaths = [
  '/', '/courses', '/foundations', '/mentorship', '/blog', '/glossary',
  '/strategies', '/practice', '/leaderboard', '/pricing', '/resources',
  '/tools', '/about', '/editorial-policy', '/privacy', '/terms', '/cookies',
];
for (const path of expectedStaticPaths) {
  if (!staticPaths.includes(path)) fail('Public static route is missing from the sitemap: ' + path);
}
for (const path of staticPaths) {
  if (!expectedStaticPaths.includes(path)) fail('Unexpected static sitemap route; classify it intentionally: ' + path);
}

const noindexRoutes = [
  '/dashboard', '/admin', '/auth', '/auth/reset', '/journal', '/certificate', '/verify',
];
for (const route of noindexRoutes) {
  if (staticPaths.includes(route) || sitemap.includes(route)) {
    fail('Noindex/private route must not be included in the public sitemap: ' + route);
  }
}

const guideSlugs = [...guideSource.matchAll(/\bslug\s*:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
if (!guideSlugs.length) fail('No SEO guide slugs were found for the sitemap.');
if (new Set(guideSlugs).size !== guideSlugs.length) fail('SEO guide slugs must be unique.');
if (!sitemap.includes('SEO_PAGES.map(({ slug })')) fail('Sitemap must derive /learn URLs from SEO_PAGES.');
if (!/learnPages\.length\s*\?\s*\{\s*url:\s*.*\/learn/.test(sitemap)) {
  fail('The /learn hub must be included when the SEO guide catalogue is populated.');
}
if (!sitemap.includes('getPublishedBlogPosts()') ||
    !sitemap.includes('const blogPages = (posts || [])') ||
    !/\.filter\(p\s*=>\s*p\s*&&\s*p\.slug\)/.test(sitemap)) {
  fail('Blog sitemap entries must come from published posts with non-empty slugs.');
}

const moduleIds = [...curriculum.matchAll(/^\s*id:\s*(\d+),\s*module:\s*["'][^"']+["']/gm)]
  .map((match) => Number(match[1]));
if (!moduleIds.length) fail('No curriculum module IDs were found.');
if (new Set(moduleIds).size !== moduleIds.length) fail('Curriculum module IDs must be unique.');

const metaStart = lessonLayout.indexOf('const LESSONS_META = {');
const metaEnd = lessonLayout.indexOf('\n};', metaStart);
const metaBlock = metaStart >= 0 && metaEnd > metaStart
  ? lessonLayout.slice(metaStart, metaEnd)
  : '';
const lessonMetaIds = [...metaBlock.matchAll(/^\s*(\d+):\s*\{\s*title:/gm)]
  .map((match) => Number(match[1]));
if (!lessonMetaIds.length) fail('No lesson metadata IDs were found.');
if (new Set(lessonMetaIds).size !== lessonMetaIds.length) fail('Lesson metadata IDs must be unique.');
const moduleIdSet = new Set(moduleIds);
const lessonMetaSet = new Set(lessonMetaIds);
for (const id of moduleIds) {
  if (!lessonMetaSet.has(id)) fail('Curriculum module ' + id + ' has no matching crawlable lesson metadata.');
}
for (const id of lessonMetaIds) {
  if (!moduleIdSet.has(id)) fail('Lesson metadata ID ' + id + ' is not in the curriculum and may create a dead sitemap URL.');
}
if (!sitemap.includes('const lessonPages = MODULES.map(({ id })')) {
  fail('Sitemap lesson URLs must derive from the canonical MODULES list.');
}
if (!/\$\{BASE\}\/lesson\/\$\{id\}/.test(sitemap)) {
  fail('Sitemap lesson URL template must use the canonical host and module ID.');
}

if (errors.length) {
  for (const error of errors) console.error('Sitemap integrity guard failed: ' + error);
  process.exit(1);
}
console.log('Sitemap integrity guard passed: ' + staticPaths.length +
  ' unique static routes, ' + guideSlugs.length + ' unique guides, ' +
  moduleIds.length + ' matching lesson IDs, canonical host and no private routes.');
