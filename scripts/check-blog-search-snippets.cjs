async function main() {
  const { POSTS } = await import('../app/blog/posts.js');

const EXPECTED = {
  'liquidity-in-ict-trading': 'Liquidity in ICT Trading: Levels & Market Drivers',
  'ict-premium-discount-zones': 'ICT Premium & Discount: Midpoint Context',
  'ict-optimal-trade-entry-ote': 'ICT OTE: Retracement Zone Rules & Testing',
  'ict-candle-range-theory-crt': 'Candle Range Theory (CRT): Rules & Testing',
  'ict-institutional-order-flow-entry-drill': 'ICT Order Flow Entry Drill: Rules & Tests',
  'ict-nwog-ndog-opening-gaps': 'ICT NWOG & NDOG: Opening Gap Rules',
  'ict-mitigation-block-guide': 'ICT Mitigation Blocks: Rules & Retests',
  'ict-central-bank-dealers-range': 'ICT CBDR: Range Measurement & Scenarios',
  'ict-power-of-three-amd-complete': 'ICT Power of Three (AMD): Phases & Testing',
  'ict-hidden-order-block': 'ICT Hidden Order Blocks: Definitions & Tests',
  'ict-seek-and-destroy-friday': 'ICT Seek & Destroy Friday: A Testable Idea',
  'ict-qml-quasimodo-pattern': 'ICT Quasimodo (QML): Structure & Confirmation',
  'ict-inducement-after-bos': 'ICT Inducement After BOS: Rules & Evidence',
  'ict-hrlr-lrlr-liquidity-run': 'ICT HRLR & LRLR: Movement Toward Levels',
  'ict-market-order-flow-explained': 'Market Order Flow vs ICT Chart Interpretation',
  'ict-premium-discount-zone-identification': 'ICT Premium & Discount: Midpoint Rules',
  'ict-reclaimed-order-block': 'ICT Reclaimed Order Blocks: Zone & Retest Rules',
  'ict-bullish-order-block-complete': 'ICT Bullish Order Block: Identification & Risk',
  'ict-market-maker-sell-model-mmsm': 'ICT Market Maker Sell Model (MMSM): Rules & Tests',
  'ict-valid-pullback-guide': 'ICT Pullback Rules: Structure & Invalidation',
  'ict-rejection-block-explained': 'ICT Rejection Blocks: Wick Zones & Testing',
  'ict-market-structure-shift-complete': 'ICT Market Structure Shift (MSS): Rules & Limits',
  'ict-supply-demand-forex': 'Supply & Demand vs ICT: Comparing Chart Zones',
  'how-to-trade-nas100-ict': 'How to Study NAS100 With ICT Concepts',
  'ict-2026-mentorship-concepts': 'ICT Mentorship Concepts: Source Checks & Testing',
  'how-to-trade-fair-value-gaps': 'Fair Value Gap (FVG): Meaning, Rules & Examples',
  'ict-valid-fair-value-gap': 'Valid FVG Rules: Define and Test ICT Gaps',
  'ict-consequent-encroachment-explained': 'Consequent Encroachment (CE): FVG Midpoint Rules',
  'ict-implied-fair-value-gap-ifvg': 'What Is an IFVG? Inverted Fair Value Gap Rules',
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
const descriptions = new Set();

for (const post of POSTS) {
  const slug = String(post?.slug || '').trim();
  const title = String(post?.title || '').trim();
  const description = String(post?.description || '').trim();
  const effectiveTitle = String(post?.metaTitle || (title ? title + ' | ICT Flow' : '')).trim();
  const effectiveDescription = String(post?.metaDesc || description).trim();

  if (!slug || !title || !description || !post?.date) {
    errors.push((slug || '(unknown article)') + ': every static blog article needs a slug, visible title, description and publication date.');
    continue;
  }
  if (Boolean(post.metaTitle) !== Boolean(post.metaDesc)) {
    errors.push(slug + ': custom metaTitle and metaDesc must be supplied together.');
  }
  if (post.metaTitle && (post.metaTitle.length < 30 || post.metaTitle.length > 70)) {
    errors.push(slug + ': custom metaTitle must be 30–70 characters.');
  }
  if (post.metaDesc && (post.metaDesc.length < 120 || post.metaDesc.length > 170)) {
    errors.push(slug + ': custom metaDesc must be 120–170 characters.');
  }
  const normalizedTitle = effectiveTitle.toLowerCase();
  if (titles.has(normalizedTitle)) errors.push(slug + ': rendered article title duplicates another article.');
  titles.add(normalizedTitle);
  const normalizedDescription = effectiveDescription.toLowerCase();
  if (descriptions.has(normalizedDescription)) errors.push(slug + ': rendered article description duplicates another article.');
  descriptions.add(normalizedDescription);
}

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
  if (!post.title || !post.description) errors.push(slug + ': visible title and description must remain present.');
}

if (errors.length) {
  for (const error of errors) console.error('Blog search snippet guard failed: ' + error);
  process.exit(1);
}

  console.log('Blog search snippet guard passed: ' + Object.keys(EXPECTED).length + ' query-aligned article titles and descriptions, within length limits.');
}

main().catch((error) => {
  console.error('Blog search snippet guard could not complete:', error);
  process.exit(1);
});
