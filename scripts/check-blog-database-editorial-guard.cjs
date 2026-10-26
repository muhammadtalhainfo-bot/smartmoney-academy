const fs = require('node:fs');

async function main() {
  const { POSTS } = await import('../app/blog/posts.js');
  const { assessDatabaseBlogRow, LEGACY_BLOG_REDIRECTS } = await import('../lib/blog-editorial-policy.js');
  const blogData = fs.readFileSync('lib/blog-data.js', 'utf8');
  const articlePage = fs.readFileSync('app/blog/[slug]/page.js', 'utf8');
  const schemaGuard = fs.readFileSync('scripts/check-blog-article-schema.cjs', 'utf8');
  const errors = [];
  const staticSlugs = new Set(POSTS.map((post) => post.slug));

  const fixtures = [
    {
      slug: 'what-is-ict-trading',
      title: "What Is ICT Trading? The Complete Beginner's Guide",
      description: 'ICT is a trading methodology that teaches how institutional money moves markets.',
      expect: 'static-fallback',
    },
    {
      slug: 'ict-killzones-explained',
      title: 'ICT Killzones — The Only Times You Should Be Trading',
      description: 'ICT Killzones are specific time windows when institutional activity peaks.',
      content: 'Killzones are time windows when institutional algorithms are most active creating the highest probability setups.',
      expect: 'redirect',
    },
    {
      slug: 'liquidity-sweeps-stop-hunts',
      title: 'Liquidity Sweeps and Stop Hunts — The ICT Explanation',
      description: 'Learn how banks engineer liquidity sweeps.',
      expect: 'redirect',
    },
    {
      slug: 'fair-value-gap-ict-explained',
      title: 'What is a Fair Value Gap? ICT Explained',
      description: 'Fair Value Gaps are one of the most powerful ICT concepts.',
      expect: 'redirect',
    },
    {
      slug: 'ict-order-blocks-explained',
      title: 'Order Blocks ICT — How to Find and Trade Them',
      description: 'Order Blocks are the institutional footprint on your chart.',
      expect: 'redirect',
    },
    {
      slug: 'ict-silver-bullet-strategy',
      title: 'ICT Silver Bullet Strategy — Step by Step Guide 2026',
      description: 'The ICT Silver Bullet is one of the most precise entry models in trading.',
      expect: 'redirect',
    },
    {
      slug: 'how-to-pass-ftmo-ict',
      title: 'How to Pass FTMO Using ICT Strategy in 2026',
      description: 'ICT methodology is one of the most effective approaches for passing prop firm challenges.',
      expect: 'redirect',
    },
    {
      slug: 'ict-premium-discount-explained',
      title: 'ICT Premium and Discount — The Fibonacci Framework Explained',
      description: 'ICT Premium and Discount zones tell you whether price is cheap or expensive.',
      expect: 'redirect',
    },
  ];

  for (const fixture of fixtures) {
    const decision = assessDatabaseBlogRow(fixture, staticSlugs.has(fixture.slug));
    if (!decision.flags.length) errors.push(fixture.slug + ': known legacy claim was not flagged.');

    if (fixture.expect === 'static-fallback' && (!decision.useStaticFallback || decision.suppress)) {
      errors.push(fixture.slug + ': unsafe DB override must fall back to its reviewed static article.');
    }
    if (fixture.expect === 'redirect') {
      if (!decision.suppress) errors.push(fixture.slug + ': unsafe database-only article must be suppressed.');
      const target = LEGACY_BLOG_REDIRECTS[fixture.slug];
      if (target !== decision.redirectSlug || !staticSlugs.has(target)) {
        errors.push(fixture.slug + ': legacy redirect must target an existing reviewed static article.');
      }
      if (staticSlugs.has(fixture.slug)) errors.push(fixture.slug + ': legacy alias must not collide with a static article slug.');
    }
  }

  const safeRow = assessDatabaseBlogRow({
    slug: 'test-safe-post',
    title: 'How to Define and Test an ICT Session Filter',
    description: 'Session windows are model-specific references. Compare a chosen filter with a consistent baseline.',
    content: 'Record results and risk assumptions before testing.',
  }, false);
  if (safeRow.flags.length || safeRow.suppress || safeRow.useStaticFallback) {
    errors.push('A neutral, test-oriented database article must remain eligible for ordinary publication.');
  }

  if (!blogData.includes('assessDatabaseBlogRow(row, Boolean(existing))')) {
    errors.push('The public blog data loader must evaluate database-backed copy before merging it.');
  }
  if (!blogData.includes('LEGACY_BLOG_REDIRECTS[row.slug]')) {
    errors.push('Known legacy database-only aliases must be removed from public listings and sitemap data.');
  }
  if (!blogData.includes('if (editorialDecision.useStaticFallback)') || !blogData.includes('if (editorialDecision.suppress)')) {
    errors.push('The data loader must use reviewed static copy or suppress an unsafe DB-only article.');
  }
  if (!articlePage.includes('permanentRedirect') || !articlePage.includes('LEGACY_BLOG_REDIRECTS[slug]')) {
    errors.push('Legacy aliases must issue a permanent redirect to their canonical reviewed article.');
  }
  if (blogData.includes('row.modified_date') || !schemaGuard.includes('Do not read blog_posts.modified_date')) {
    errors.push('The date schema guard must not rely on the nonexistent blog_posts.modified_date column.');
  }

  if (errors.length) {
    for (const error of errors) console.error('Database blog editorial guard failed: ' + error);
    process.exit(1);
  }

  console.log('Database blog editorial guard passed: ' + fixtures.length + ' legacy fixtures, ' + Object.keys(LEGACY_BLOG_REDIRECTS).length + ' canonical redirects, a reviewed-static fallback, and a safe neutral fixture.');
}

main().catch((error) => {
  console.error('Database blog editorial guard could not complete:', error);
  process.exit(1);
});
