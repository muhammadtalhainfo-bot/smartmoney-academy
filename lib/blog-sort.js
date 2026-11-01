const VALID_SORTS = new Set(['featured', 'newest', 'oldest', 'title']);

function titleFor(post) {
  return String(post?.title || post?.slug || '');
}

/**
 * Return a new, stably ordered list. Articles without a parseable date are
 * placed after dated articles in both date modes.
 */
export function sortBlogPosts(posts, sortBy = 'featured') {
  const items = Array.isArray(posts) ? [...posts] : [];
  const mode = VALID_SORTS.has(sortBy) ? sortBy : 'featured';

  if (mode === 'featured') return items;

  return items.sort((a, b) => {
    const titleOrder = titleFor(a).localeCompare(titleFor(b), undefined, {
      sensitivity: 'base',
      numeric: true,
    });

    if (mode === 'title') return titleOrder;

    const dateA = Date.parse(String(a?.date || ''));
    const dateB = Date.parse(String(b?.date || ''));
    const hasDateA = Number.isFinite(dateA);
    const hasDateB = Number.isFinite(dateB);

    if (hasDateA !== hasDateB) return hasDateA ? -1 : 1;
    if (hasDateA && hasDateB && dateA !== dateB) {
      return mode === 'oldest' ? dateA - dateB : dateB - dateA;
    }

    return titleOrder;
  });
}
