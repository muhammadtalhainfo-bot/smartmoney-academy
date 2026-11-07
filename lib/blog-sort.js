const VALID_SORTS = new Set(['featured', 'newest', 'oldest', 'title', 'shortest', 'longest']);

function titleFor(post) {
  return String(post?.title || post?.slug || '');
}

function readingMinutesFor(post) {
  const match = String(post?.readTime || '').match(/\b(\d+(?:\.\d+)?)\s*(?:min|minute)s?\b/i);
  if (!match) return Number.NaN;
  const minutes = Number(match[1]);
  return Number.isFinite(minutes) && minutes >= 0 ? minutes : Number.NaN;
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

    if (mode === 'shortest' || mode === 'longest') {
      const minutesA = readingMinutesFor(a);
      const minutesB = readingMinutesFor(b);
      const hasMinutesA = Number.isFinite(minutesA);
      const hasMinutesB = Number.isFinite(minutesB);

      if (hasMinutesA !== hasMinutesB) return hasMinutesA ? -1 : 1;
      if (hasMinutesA && hasMinutesB && minutesA !== minutesB) {
        return mode === 'shortest' ? minutesA - minutesB : minutesB - minutesA;
      }
      return titleOrder;
    }

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
