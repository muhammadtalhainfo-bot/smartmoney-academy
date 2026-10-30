const EDITORIAL_RISK_RULES = [
  {
    id: 'programmed-price-delivery',
    pattern: /\b(?:the\s+)?algorithm(?:s)?\s+(?:is|are|will be)\s+programmed to\b|\bprice\s+is\s+programmed to\b/i,
  },
  {
    id: 'certain-price-target',
    pattern: /\b(?:price|the algorithm)\s+(?:will|must)\s+(?:fill|return to fill|deliver to|seek to fill)\b|\b(?:will be filled at some point|will at some point rally back to fill|price will seek to fill)\b/i,
  },
  {
    id: 'unverified-institutional-motive',
    pattern: /\binstitutional activity peaks\b|\binstitutional algorithms?\s+(?:is|are)\s+most active\b|\bbanks?\s+engineer(?:s)?\s+(?:liquidity sweeps|stop hunts|traps)\b|\binstitutional footprint on your chart\b|\bteaches how institutional money moves markets\b|\binstitutions?\s+(?:need|needs)\s+to\s+fill\s+their\s+(?:massive|large)\s+positions\b|\bdesigned to trigger stop losses before the real move begins\b|\binstitutions?\s+buy discount and sell premium\b|\bretail traders how to think and trade like institutional money\b/i,
  },
  {
    id: 'unsupported-performance-ranking',
    pattern: /\bthe only times you should be trading\b|\b(?:high|highest)[- ]probability\s+(?:setups|entries)\b|\bone of the most\s+(?:powerful|precise|effective)\s+(?:ict\s+)?(?:concepts?|entry models?|approaches)\b|\bmost effective approaches for passing prop firm challenges\b|\b(?:NAS100|NASDAQ\s*100)\s+is the most popular market for ICT traders\b|\bwith remarkable precision\b|\bmaking it ideal for ICT methodology\b|\bhigh-probability setups with tight stops align perfectly with\b/i,
  },
  {
    id: 'unverified-framework-lineage',
    pattern: /\bICT\s+is\s+the original methodology\b|\bSMC\s+is\s+a simplified community-built framework derived from ICT\b/i,
  },
  {
    id: 'time-sensitive-current-claim',
    pattern: /\b(?:the\s+)?2026 mentorship introduces\b|\bupdated IPDA ranges\b/i,
  },
  {
    id: 'objective-price-value-claim',
    pattern: /\b(?:zones|levels)\s+tell you whether price is cheap or expensive\b|\btell you whether price is cheap or expensive\b/i,
  },
];

export const LEGACY_BLOG_REDIRECTS = Object.freeze({
  'ict-killzones-explained': 'ict-killzones-guide',
  'liquidity-sweeps-stop-hunts': 'ict-liquidity-sweep-vs-run',
  'fair-value-gap-ict-explained': 'how-to-trade-fair-value-gaps',
  'ict-order-blocks-explained': 'understanding-order-blocks',
  'ict-silver-bullet-strategy': 'ict-silver-bullet-strategy-complete',
  'how-to-pass-ftmo-ict': 'how-to-pass-ftmo-ict-strategy',
  'ict-premium-discount-explained': 'ict-premium-discount-zones',
  'liquidity-in-trading-ict': 'liquidity-in-ict-trading',
  'smart-money-concepts-vs-ict': 'ict-vs-smc-difference',
});

function editorialText(record) {
  return [
    record?.title,
    record?.description,
    record?.meta_title,
    record?.meta_desc,
    record?.metaTitle,
    record?.metaDesc,
    record?.content,
    record?.content_json,
  ].map((value) => {
    if (typeof value === 'string') return value;
    if (value == null) return '';
    try {
      return JSON.stringify(value);
    } catch {
      return '';
    }
  }).join('\n');
}

/**
 * Focused runtime tripwires for legacy/database copy that bypasses the static
 * article regression suite. This complements, rather than replaces, the
 * article-specific checks against app/blog/posts.js.
 */
export function findBlogEditorialRiskFlags(record) {
  const text = editorialText(record);
  return EDITORIAL_RISK_RULES
    .filter(({ pattern }) => pattern.test(text))
    .map(({ id }) => id);
}

export function assessDatabaseBlogRow(record, hasStaticPost = false) {
  const flags = findBlogEditorialRiskFlags(record);
  return {
    flags,
    useStaticFallback: flags.length > 0 && Boolean(hasStaticPost),
    suppress: flags.length > 0 && !hasStaticPost,
    redirectSlug: LEGACY_BLOG_REDIRECTS[record?.slug] || null,
  };
}
