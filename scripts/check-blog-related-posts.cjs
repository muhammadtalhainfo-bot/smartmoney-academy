const fs = require('node:fs');

async function main() {
  const { POSTS } = await import('../app/blog/posts.js');
  const { getRelatedBlogPosts } = await import('../lib/related-blog-posts.js');
  const page = fs.readFileSync('app/blog/[slug]/page.js', 'utf8');
  const knownSlugs = new Set(POSTS.map((post) => post.slug));
  const errors = [];

  if (!page.includes('getRelatedBlogPosts')) errors.push('Blog article pages must import and use the related-reading helper.');
  if (!page.includes('aria-labelledby="related-reading-heading"')) errors.push('Related reading needs a labelled section for assistive technology.');
  if (!page.includes("href={'/blog/' + related.slug}")) errors.push('Related recommendations must link to their canonical /blog/[slug] route.');

  if (knownSlugs.size !== POSTS.length) errors.push('Blog post slugs must be unique before building internal links.');

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
