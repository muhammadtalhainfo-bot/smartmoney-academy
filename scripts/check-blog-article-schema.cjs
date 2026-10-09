const fs = require('node:fs');

async function main() {
  const { POSTS } = await import('../app/blog/posts.js');
  const page = fs.readFileSync('app/blog/[slug]/page.js', 'utf8');
  const errors = [];

  const requiredPatterns = [
    [/datePublished:\s*safeIsoDate\(post\.date\)/, 'Article structured data must expose a safely parsed publication date.'],
    [/const breadcrumbSchema\s*=\s*\{/, 'Article pages must define BreadcrumbList structured data.'],
    [/'@type':\s*'BreadcrumbList'/, 'Breadcrumb structured data must use the BreadcrumbList type.'],
    [/item:\s*canonical/, 'The final breadcrumb must point to the article canonical URL.'],
    [/aria-label="Breadcrumb"/, 'Article pages must provide visible, accessible breadcrumb navigation.'],
    [/href="\/blog"/, 'The visible breadcrumb must link to the blog index.'],
    [/serializeJsonLd\(breadcrumbSchema\)/, 'Breadcrumb structured data must be rendered in the page.'],
  ];

  for (const [pattern, message] of requiredPatterns) {
    if (!pattern.test(page)) errors.push(message);
  }

  const slugs = POSTS.map((post) => post?.slug).filter(Boolean);
  if (slugs.length !== POSTS.length) errors.push('Every static article must have a slug.');
  if (new Set(slugs).size !== slugs.length) errors.push('Static article slugs must be unique.');

  let validDates = 0;
  for (const post of POSTS) {
    const value = typeof post?.date === 'string' ? post.date.trim() : '';
    if (!value || !Number.isFinite(Date.parse(value))) {
      errors.push('/blog/' + (post?.slug || '(unknown)') + ': publication date must be valid or removed from the static article.');
    } else {
      validDates += 1;
    }
  }

  if (errors.length) {
    for (const error of errors) console.error('Blog article schema guard failed: ' + error);
    process.exit(1);
  }

  console.log('Blog article schema guard passed: ' + POSTS.length + ' static articles, ' + validDates + ' parseable publication dates, accessible breadcrumbs and matching canonical destinations.');
}

main().catch((error) => {
  console.error('Blog article schema guard could not complete:', error);
  process.exit(1);
});
