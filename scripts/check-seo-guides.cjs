const fs = require('node:fs');

const guidePath = 'app/learn/seo-data.js';
const rendererPath = 'app/learn/[slug]/page.js';
const sitemapPath = 'app/sitemap.js';
const source = fs.readFileSync(guidePath, 'utf8');
const renderer = fs.readFileSync(rendererPath, 'utf8');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const guideChunks = source.split(/\n  },\n  \{/).filter((chunk) => /\bslug\s*:\s*'[^']+'/.test(chunk));
const slugs = guideChunks.map((chunk) => chunk.match(/\bslug\s*:\s*'([^']+)'/)?.[1]).filter(Boolean);
const slugSet = new Set(slugs);
const errors = [];

if (slugs.length === 0) errors.push('No SEO guides found.');
if (slugSet.size !== slugs.length) errors.push('Guide slugs must be unique.');
if (!renderer.includes('return SEO_PAGES.map(({ slug }) => ({ slug }))')) {
  errors.push('The guide renderer must generate static params from SEO_PAGES.');
}
if (!sitemap.includes('SEO_PAGES.map(({ slug })')) {
  errors.push('The XML sitemap must include the SEO_PAGES collection.');
}

for (const chunk of guideChunks) {
  const slug = chunk.match(/\bslug\s*:\s*'([^']+)'/)?.[1] || '(unknown)';
  for (const field of ['title', 'meta', 'intro', 'sections', 'related']) {
    if (!new RegExp('\\b' + field + '\\s*:').test(chunk)) {
      errors.push(`/${slug}: missing ${field} field.`);
    }
  }

  const examples = (chunk.match(/\["Worked example \(hypothetical\)"/g) || []).length;
  if (examples < 1) errors.push(`/${slug}: add a practical worked example.`);

  const faqCount = (chunk.match(/\["FAQ: /g) || []).length;
  if (faqCount < 2) errors.push(`/${slug}: add at least two topic-specific FAQs.`);

  const relatedMatch = chunk.match(/\brelated\s*:\s*\[([^\]]*)\]/);
  if (!relatedMatch) continue;
  const related = [...relatedMatch[1].matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]);
  if (related.length < 2) errors.push(`/${slug}: link to at least two related guides.`);
  if (new Set(related).size !== related.length) errors.push(`/${slug}: related-guide links contain duplicates.`);
  for (const target of related) {
    if (target === slug) errors.push(`/${slug}: cannot link to itself as a related guide.`);
    else if (!slugSet.has(target)) errors.push(`/${slug}: related guide '${target}' does not exist.`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(`SEO guide quality guard failed: ${error}`);
  process.exit(1);
}

console.log(`SEO guide quality guard passed for ${slugs.length} guides: metadata fields, worked examples, FAQs, and related-guide targets are present.`);
