const fs = require('node:fs');

async function main() {
  const { POSTS } = await import('../app/blog/posts.js');
  const { getRelatedBlogPosts, CURATED_RELATED } = await import('../lib/related-blog-posts.js');
  const { sortBlogPosts } = await import('../lib/blog-sort.js');
  const page = fs.readFileSync('app/blog/[slug]/page.js', 'utf8');
  const indexPage = fs.readFileSync('app/blog/BlogIndexClient.js', 'utf8');
  const knownSlugs = new Set(POSTS.map((post) => post.slug));
  const errors = [];

  if (!page.includes('getRelatedBlogPosts')) errors.push('Blog article pages must import and use the related-reading helper.');
  if (!page.includes('aria-labelledby="related-reading-heading"')) errors.push('Related reading needs a labelled section for assistive technology.');
  if (!page.includes("href={'/blog/' + related.slug}")) errors.push('Related recommendations must link to their canonical /blog/[slug] route.');

  if (knownSlugs.size !== POSTS.length) errors.push('Blog post slugs must be unique before building internal links.');

  if (!indexPage.includes('const availableCategories = useMemo(() =>')) {
    errors.push('Blog category buttons must derive their available values from the published article list.');
  }
  if (!indexPage.includes('for (const post of allPosts)') || !indexPage.includes('counts.set(category')) {
    errors.push('Every published article category must be counted and available as a filter.');
  }
  if (!indexPage.includes('availableCategories.map(({ name: cat, count }) => (')) {
    errors.push('The blog index must render category filters with their article counts.');
  }
  if (!indexPage.includes("const categoryPosts = active === 'All' ? allPosts : allPosts.filter((post) => post.category === active);")) {
    errors.push('Selecting a category must filter the published article collection before text search.');
  }
  if (!indexPage.includes("const featured = active === 'All' && !searchQuery && sortBy === 'featured' ? featuredPost : null;") ||
      !indexPage.includes('const sortedPosts = sortBlogPosts(matchingPosts, sortBy);') ||
      !indexPage.includes('const rest = sortedPosts.filter((post) => post.slug !== featured?.slug);')) {
    errors.push('The featured layout must be reserved for the unfiltered Featured mode, while other sort modes include every matching article in the sorted list.');
  }

  if (!indexPage.includes("import { sortBlogPosts } from '@/lib/blog-sort';") ||
      !indexPage.includes('value={sortBy}') ||
      !indexPage.includes('onChange={(event) => setSortBy(event.target.value)}')) {
    errors.push('The blog index must expose a controlled article-sort selector.');
  }
  for (const option of ['featured', 'newest', 'oldest', 'title']) {
    if (!indexPage.includes('value="' + option + '"')) {
      errors.push('The blog sort selector is missing the ' + option + ' mode.');
    }
  }

  const sortingFixture = [
    { slug: 'middle', title: 'Beta', date: 'May 3, 2026' },
    { slug: 'newest', title: 'Alpha', date: 'June 10, 2026' },
    { slug: 'oldest', title: 'Delta', date: 'January 1, 2026' },
    { slug: 'missing-date', title: 'Charlie', date: '' },
    { slug: 'invalid-date', title: 'Echo', date: 'not-a-date' },
  ];
  const originalOrder = sortingFixture.map((post) => post.slug).join(',');
  const expectedOrders = {
    featured: 'middle,newest,oldest,missing-date,invalid-date',
    newest: 'newest,middle,oldest,missing-date,invalid-date',
    oldest: 'oldest,middle,newest,missing-date,invalid-date',
    title: 'newest,middle,missing-date,oldest,invalid-date',
  };
  for (const [mode, expected] of Object.entries(expectedOrders)) {
    const actual = sortBlogPosts(sortingFixture, mode).map((post) => post.slug).join(',');
    if (actual !== expected) errors.push('Blog article sort mode ' + mode + ' returned ' + actual + ' instead of ' + expected + '.');
  }
  if (sortingFixture.map((post) => post.slug).join(',') !== originalOrder) {
    errors.push('Sorting blog articles must not mutate the source collection.');
  }
  if (sortBlogPosts(null, 'newest').length !== 0 || sortBlogPosts(sortingFixture, 'unknown').map((post) => post.slug).join(',') !== expectedOrders.featured) {
    errors.push('Blog sorting must handle invalid collections and unknown modes safely.');
  }

  const expectedFilteredHeading = "{active === 'All' ? (searchQuery ? 'SEARCH RESULTS' : 'ALL ARTICLES') : active.toUpperCase() + ' ARTICLES'} ({resultCount})";
  if (!indexPage.includes(expectedFilteredHeading)) {
    errors.push('The blog index heading and count must reflect the actual filtered and searched result set.');
  }

  if (!indexPage.includes('type="search"') ||
      !indexPage.includes('id="blog-article-search"') ||
      !indexPage.includes('aria-describedby="blog-search-help"')) {
    errors.push('The blog index must provide a labelled, described article search field.');
  }
  if (!indexPage.includes('searchTerms.every((term) => searchableText.includes(term))')) {
    errors.push('Article search must match all query words against indexed article text.');
  }
  if (!indexPage.includes('searchQuery.split(/' + String.fromCharCode(92) + 's+/)')) {
    errors.push('Article search must split multi-word queries on whitespace.');
  }
  if (!indexPage.includes('availableCategories.map(({ name: cat, count }) => (')) {
    errors.push('Each category filter must display its published article count.');
  }
  if (!indexPage.includes('<nav aria-label="Filter articles by category"')) {
    errors.push('Category filters must be grouped in a labelled navigation landmark.');
  }
  if (!indexPage.includes('role="status" aria-live="polite" aria-atomic="true"')) {
    errors.push('Search and filter result changes must be announced to assistive technology.');
  }
  if (!indexPage.includes('NO MATCHING ARTICLES') ||
      !indexPage.includes('CLEAR SEARCH AND FILTERS') ||
      !indexPage.includes("setActive('All'); setSearch('');")) {
    errors.push('An empty search result must explain the state and provide a working reset action.');
  }
  if (!indexPage.includes('{rest.length > 0 || featured ? (')) {
    errors.push('The blog index must still show its featured card when it is the only available article.');
  }

  for (const post of POSTS) {
    const related = getRelatedBlogPosts(post, POSTS);
    if (related.length !== Math.min(3, POSTS.length - 1)) {
      errors.push(post.slug + ': expected up to three related posts, received ' + related.length + '.');
      continue;
    }

    const slugs = related.map((item) => item.slug);
    if (slugs.includes(post.slug)) errors.push(post.slug + ': related reading links to the current page.');
    if (new Set(slugs).size !== slugs.length) errors.push(post.slug + ': related reading contains duplicate links.');

    for (const slug of slugs) {
      if (!knownSlugs.has(slug)) errors.push(post.slug + ': related slug does not exist: ' + slug);
    }
  }

  for (const [sourceSlug, preferredSlugs] of Object.entries(CURATED_RELATED)) {
    const sourcePost = POSTS.find((post) => post.slug === sourceSlug);
    if (!sourcePost) {
      errors.push('Curated related-reading source is missing: ' + sourceSlug);
      continue;
    }
    const relatedSlugs = getRelatedBlogPosts(sourcePost, POSTS).map((post) => post.slug);
    for (const targetSlug of preferredSlugs) {
      if (!knownSlugs.has(targetSlug)) {
        errors.push(sourceSlug + ': curated related-reading target does not exist: ' + targetSlug);
      } else if (!relatedSlugs.includes(targetSlug)) {
        errors.push(sourceSlug + ': curated related-reading target is not included: ' + targetSlug);
      }
    }
  }

  if (errors.length) {
    for (const error of errors) console.error('Blog related-reading guard failed: ' + error);
    process.exit(1);
  }

  console.log('Blog related-reading guard passed: ' + POSTS.length + ' articles have unique, valid, non-self related links.');
}

main().catch((error) => {
  console.error('Blog related-reading guard could not complete:', error);
  process.exit(1);
});
