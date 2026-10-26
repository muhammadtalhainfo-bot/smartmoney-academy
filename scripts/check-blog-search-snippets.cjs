const { POSTS } = await import('../app/blog/posts.js');

const EXPECTED = {
  'ict-implied-fair-value-gap-ifvg': 'Inverted Fair Value Gap (IFVG): Rules & Examples',
  'ict-inducement-forex-explained': 'What Is Inducement in Forex? ICT Definition',
  'ict-breaker-block-explained': 'ICT Breaker Block vs Order Block: Rules & Examples',
  'trading-psychology-complete-guide': 'Best Trading Psychology Tips: Fear, FOMO & Risk',
  'what-is-ict-trading': 'What Is ICT Trading? Concepts, Meaning & Risk',
  'ict-killzones-guide': 'ICT Killzone Times: Asian, London & New York',
  'ict-market-structure-complete-guide': 'ICT Market Structure: BOS, CHoCH & Swing Points',
  'power-of-three-amd-model': 'ICT Power of Three (AMD): Accumulation, Manipulation & Distribution',
};

const errors = [];
const bySlug = new Map(POSTS.map((post) => [post.slug, post]));
const titles = new Set();

for (const [slug, expectedTitle] of Object.entries(EXPECTED)) {
  const post = bySlug.get(slug);
  if (!post) {
    errors.push('Missing target article: ' + slug);
    continue;
  }
  if (post.metaTitle !== expectedTitle) {
    errors.push(slug + ': metaTitle must target its observed query intent.');
  }
  if (typeof post.metaTitle !== 'string' || post.metaTitle.length < 30 || post.metaTitle.length > 70) {
    errors.push(slug + ': metaTitle must be 30–70 characters.');
  }
  if (typeof post.metaDesc !== 'string' || post.metaDesc.length < 120 || post.metaDesc.length > 170) {
    errors.push(slug + ': metaDesc must be 120–170 characters.');
  }
  if (titles.has(post.metaTitle)) errors.push(slug + ': duplicate SEO title.');
  titles.add(post.metaTitle);
  if (!post.title || !post.description) errors.push(slug + ': visible title and description must remain present.');
}

if (errors.length) {
  for (const error of errors) console.error('Blog search snippet guard failed: ' + error);
  process.exit(1);
}

console.log('Blog search snippet guard passed: ' + Object.keys(EXPECTED).length + ' query-aligned article titles and descriptions, within length limits.');
