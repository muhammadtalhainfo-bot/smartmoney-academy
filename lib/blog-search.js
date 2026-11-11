/**
 * Match every query word against visible article copy and search-oriented
 * metadata. Keeping this logic pure makes the same behavior testable outside
 * the React component.
 */
export function matchesBlogPost(post, query) {
  const terms = String(query || '').trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  if (!post || typeof post !== 'object') return false;

  const searchableText = [
    post.title,
    post.description,
    post.metaTitle,
    post.metaDesc,
    post.category,
    post.slug,
  ]
    .filter((value) => typeof value === 'string')
    .join(' ')
    .toLowerCase();

  return terms.every((term) => searchableText.includes(term));
}
