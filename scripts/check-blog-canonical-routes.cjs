const fs = require('node:fs');

async function main() {
  const { POSTS } = await import('../app/blog/posts.js');
  const { LEGACY_BLOG_REDIRECTS } = await import('../lib/blog-editorial-policy.js');
  const sitemapSource = fs.readFileSync('app/sitemap.js', 'utf8');
  const blogIndexSource = fs.readFileSync('app/blog/page.js', 'utf8');
  const articleSource = fs.readFileSync('app/blog/[slug]/page.js', 'utf8');
  const relatedSource = fs.readFileSync('lib/related-blog-posts.js', 'utf8');
  const loaderSource = fs.readFileSync('lib/blog-data.js', 'utf8');
  const errors = [];
  const staticSlugs = POSTS.map((post) => post?.slug);
  const staticSlugSet = new Set(staticSlugs);

  if (staticSlugs.some((slug) => typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))) {
    errors.push('Every static article slug must use lowercase words separated by single hyphens.');
  }
  if (staticSlugSet.size !== POSTS.length) {
    errors.push('Static article slugs must be unique before indexing or canonical URL generation.');
  }

  for (const [alias, target] of Object.entries(LEGACY_BLOG_REDIRECTS)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(alias)) {
      errors.push('Legacy alias has an invalid URL slug: ' + alias);
    }
    if (!staticSlugSet.has(target)) {
      errors.push(alias + ': redirect target is not a reviewed static article: ' + target);
    }
    if (alias === target) errors.push(alias + ': legacy alias must not redirect to itself.');
    if (staticSlugSet.has(alias)) {
      errors.push(alias + ': redirect alias must not collide with a live static article slug.');
    }
    if (LEGACY_BLOG_REDIRECTS[target]) {
      errors.push(alias + ': redirect chains are not allowed; target also redirects: ' + target);
    }
  }

  if (!sitemapSource.includes("import { LEGACY_BLOG_REDIRECTS } from '../lib/blog-editorial-policy'")) {
    errors.push('The sitemap must share the canonical alias map with blog routing.');
  }
  if (!sitemapSource.includes('.filter(p => p && p.slug && !LEGACY_BLOG_REDIRECTS[p.slug])')) {
    errors.push('The sitemap must exclude redirected aliases even if an upstream loader changes.');
  }
  if (!sitemapSource.includes('getPublishedBlogPosts()') || !sitemapSource.includes('url: `${BASE}/blog/${p.slug}`')) {
    errors.push('Sitemap blog URLs must be created from the published, canonical article collection.');
  }

  if (!blogIndexSource.includes("import { LEGACY_BLOG_REDIRECTS } from '@/lib/blog-editorial-policy';")) {
    errors.push('The blog index must share the canonical alias map.');
  }
  if (!blogIndexSource.includes('.filter((post) => post?.slug && !LEGACY_BLOG_REDIRECTS[post.slug])')) {
    errors.push('The blog index and its CollectionPage ItemList must exclude redirect aliases.');
  }
  if (!blogIndexSource.includes('url: `https://ictflow.com/blog/${post.slug}`')) {
    errors.push('Blog index structured data must point to canonical article URLs.');
  }

  if (!articleSource.includes('permanentRedirect') ||
      !articleSource.includes('LEGACY_BLOG_REDIRECTS[slug]')) {
    errors.push('The article route must implement permanent redirects from the canonical alias map.');
  }
  const metadataStart = articleSource.indexOf('export async function generateMetadata');
  const pageStart = articleSource.indexOf('export default async function BlogPost');
  const metadataEnd = pageStart > metadataStart ? pageStart : articleSource.length;
  const metadataBody = articleSource.slice(metadataStart, metadataEnd);
  const pageBody = articleSource.slice(pageStart);
  if (metadataStart < 0 || metadataBody.indexOf('permanentRedirect') < 0 ||
      metadataBody.indexOf('permanentRedirect') > metadataBody.indexOf('getPublishedBlogPosts')) {
    errors.push('Metadata generation must redirect an alias before article lookup.');
  }
  if (pageStart < 0 || pageBody.indexOf('permanentRedirect') < 0 ||
      pageBody.indexOf('permanentRedirect') > pageBody.indexOf('getPublishedBlogPosts')) {
    errors.push('Article rendering must redirect an alias before article lookup.');
  }
  if (!articleSource.includes('alternates: { canonical }') ||
      !articleSource.includes('url: canonical') ||
      !articleSource.includes('mainEntityOfPage: canonical') ||
      !articleSource.includes('item: canonical')) {
    errors.push('HTML metadata, Open Graph, Article and Breadcrumb schema must agree on the canonical URL.');
  }
  if (!metadataBody.includes('robots: { index: false, follow: false }')) {
    errors.push('Missing articles must be explicitly noindex and follow.');
  }

  if (!loaderSource.includes('LEGACY_BLOG_REDIRECTS[row.slug]') ||
      !loaderSource.includes('if (editorialDecision.suppress)')) {
    errors.push('The data loader must keep legacy aliases and unsafe database-only articles out of public listings.');
  }
  if (!relatedSource.includes('getRelatedBlogPosts')) {
    errors.push('The topic-aware related-reading helper must remain present.');
  }

  if (errors.length) {
    for (const error of errors) console.error('Blog canonical-route guard failed: ' + error);
    process.exit(1);
  }

  console.log(
    'Blog canonical-route guard passed: ' + POSTS.length + ' unique static articles, ' +
    Object.keys(LEGACY_BLOG_REDIRECTS).length + ' valid single-hop redirects, canonical metadata/schema, and alias exclusions from the index and sitemap.'
  );
}

main().catch((error) => {
  console.error('Blog canonical-route guard could not complete:', error);
  process.exit(1);
});
