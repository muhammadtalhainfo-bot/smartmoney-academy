const fs = require('node:fs');

const robotsPath = 'public/robots.txt';
const sitemapPath = 'app/sitemap.js';
const noindexRoutes = [
  { path: '/journal', metadataPath: 'app/journal/layout.js' },
  { path: '/certificate', metadataPath: 'app/certificate/layout.js' },
  { path: '/verify', metadataPath: 'app/verify/[credential]/page.js' },
];

function fail(message) {
  console.error(`SEO indexing guard failed: ${message}`);
  process.exitCode = 1;
}

const robots = fs.readFileSync(robotsPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const disallowedPaths = robots
  .split(/\r?\n/)
  .map((line) => line.match(/^\s*Disallow:\s*(\S*)/i)?.[1])
  .filter(Boolean);

if (!/^\s*Sitemap:\s*https:\/\/ictflow\.com\/sitemap\.xml\s*$/im.test(robots)) {
  fail('robots.txt must advertise the canonical XML sitemap.');
}

for (const route of noindexRoutes) {
  const metadata = fs.readFileSync(route.metadataPath, 'utf8');
  if (!/robots\s*:\s*\{[^}]*index\s*:\s*false/s.test(metadata)) {
    fail(`${route.metadataPath} must retain an explicit noindex directive.`);
  }

  const blocked = disallowedPaths.some((rule) =>
    rule === '/' || route.path === rule || route.path.startsWith(`${rule}/`)
  );
  if (blocked) {
    fail(`${route.path} uses noindex and must not be blocked by robots.txt.`);
  }

  if (sitemap.includes('${BASE}' + route.path)) {
    fail(`${route.path} must remain excluded from the public sitemap.`);
  }
}

if (process.exitCode) process.exit(process.exitCode);
console.log('SEO indexing guard passed: noindex routes are crawlable, excluded from the sitemap, and the canonical sitemap is advertised.');
