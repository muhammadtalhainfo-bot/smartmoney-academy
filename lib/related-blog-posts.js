const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'your', 'how', 'what', 'when', 'why',
  'into', 'that', 'this', 'are', 'not', 'but', 'you', 'can', 'use', 'using',
  'explained', 'complete', 'guide', 'trading', 'trade', 'ict', 'model', 'models',
  'strategy', 'strategies', 'concept', 'concepts', 'every', 'between', 'their',
  'price', 'entry', 'zone', 'zones', 'understanding', 'identify', 'defined',
]);

const TOPICS = [
  { id: 'market-structure', pattern: /market-structure|\bmss\b|\bchoch\b|\bbos\b|swing-high|swing-low|displacement|inducement|valid-pullback|order-flow/ },
  { id: 'liquidity', pattern: /liquidity|turtle-soup|judas-swing|draw-on|sweep|seek-and-destroy|inducement/ },
  { id: 'fair-value-gaps', pattern: /fair-value|\bfvg\b|\bifvg\b|\bsibi\b|\bbisi\b|consequent-encroachment|balanced-price-range|\bbpr\b|liquidity-void/ },
  { id: 'order-blocks', pattern: /order-block|breaker-block|mitigation-block|propulsion-block|rejection-block|\bscob\b|unicorn|\brdrb\b|suspension-block/ },
  { id: 'sessions-and-ranges', pattern: /killzone|macro-time|london|asian-range|intraday-profile|opening-range|\bc b d r\b|cbdr|nwog|ndog|weekly-profile|tgif|seek-and-destroy|candle-range/ },
  { id: 'price-delivery-and-bias', pattern: /power-of-three|\bamd\b|\bipda\b|market-maker|\bcisd\b|\bcrt\b|top-down-analysis|daily-bias|premium-discount|\bote\b|pd-array|fibonacci/ },
  { id: 'entry-models', pattern: /silver-bullet|venom|one-shot|2022|scalping|ftmo|prop-firm|unicorn|reversal-pattern|market-maker-buy|market-maker-sell/ },
  { id: 'smt-divergence', pattern: /smt-divergence/ },
  { id: 'testing-and-psychology', pattern: /backtest|psychology|common-ict-mistakes|ftmo|prop-firm|scalping|risk-control/ },
  { id: 'foundations', pattern: /what-is-ict-trading|ict-vs-smc|supply-demand|market-order-flow|liquidity-in-ict-trading/ },
];

function tokensFor(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function topicsFor(post) {
  const text = String(post.slug || '') + ' ' + String(post.title || '');
  return new Set(TOPICS.filter((topic) => topic.pattern.test(text)).map((topic) => topic.id));
}

/**
 * Pick related reading by shared ICT topic first, then meaningful title/slug
 * overlap. Category is only a low-weight tie-breaker, never the main signal.
 */
export function getRelatedBlogPosts(currentPost, posts, limit = 3) {
  if (!currentPost || !Array.isArray(posts) || posts.length < 2 || limit < 1) return [];

  const currentSlug = currentPost.slug;
  const currentTopics = topicsFor(currentPost);
  const currentSlugTokens = new Set(tokensFor(currentSlug));
  const currentTitleTokens = new Set(tokensFor(currentPost.title));
  const currentCategory = String(currentPost.category || '').toLowerCase();

  return posts
    .filter((candidate) => candidate && candidate.slug && candidate.slug !== currentSlug)
    .map((candidate) => {
      const candidateTopics = topicsFor(candidate);
      let score = 0;

      for (const topic of currentTopics) {
        if (candidateTopics.has(topic)) score += 10;
      }

      for (const token of tokensFor(candidate.slug)) {
        if (currentSlugTokens.has(token)) score += 2;
      }

      for (const token of tokensFor(candidate.title)) {
        if (currentTitleTokens.has(token)) score += 1;
      }

      if (currentCategory && String(candidate.category || '').toLowerCase() === currentCategory) {
        score += 0.25;
      }

      return { post: candidate, score };
    })
    .sort((a, b) => b.score - a.score || String(a.post.title || a.post.slug).localeCompare(String(b.post.title || b.post.slug)))
    .slice(0, Math.min(3, Math.floor(limit)))
    .map(({ post }) => post);
}
