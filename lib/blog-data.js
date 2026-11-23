import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { POSTS } from '@/app/blog/posts';
import { assessDatabaseBlogRow, LEGACY_BLOG_REDIRECTS } from '@/lib/blog-editorial-policy';

function parseContentJson(value) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function publicPostFromDb(row, staticPost) {
  const structured = parseContentJson(row.content_json);
  const content = structured || row.content || staticPost?.content || '';

  return {
    ...(staticPost || {}),
    id: row.id || staticPost?.id || null,
    slug: row.slug || staticPost?.slug,
    title: row.title || staticPost?.title || 'Untitled',
    description: row.description ?? staticPost?.description ?? '',
    category: row.category || staticPost?.category || 'Beginner',
    readTime: row.read_time || staticPost?.readTime || '5 min read',
    date: row.date || staticPost?.date || '',
    image: row.image || row.image_url || staticPost?.image || '/images/market-structure.png',
    featured: row.featured ?? staticPost?.featured ?? false,
    sortOrder: Number.isFinite(Number(row.sort_order)) ? Number(row.sort_order) : staticPost?.sortOrder ?? 0,
    content,
    metaTitle: row.meta_title || staticPost?.metaTitle || '',
    metaDesc: row.meta_desc || staticPost?.metaDesc || '',
    published: row.published !== false,
  };
}

export async function getPublishedBlogPosts() {
  const staticPosts = (POSTS || []).map((post, index) => ({
    ...post,
    sortOrder: post.sortOrder ?? index,
    published: true,
    metaTitle: post.metaTitle || '',
    metaDesc: post.metaDesc || '',
  }));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !serviceKey) return staticPosts;

  try {
    const supabase = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title, description, category, read_time, date, image, image_url, featured, published, sort_order, content, content_json, meta_title, meta_desc, created_at')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error || !Array.isArray(data)) {
      console.error('Blog DB load failed:', error);
      return staticPosts;
    }

    const bySlug = new Map(staticPosts.map((post) => [post.slug, post]));
    const removed = new Set();

    for (const row of data) {
      if (!row?.slug) continue;

      if (row.published === false) {
        removed.add(row.slug);
        continue;
      }

      // These legacy database-only URLs have reviewed static replacements.
      // Excluding them here keeps them out of the blog index, related links, and sitemap.
      if (LEGACY_BLOG_REDIRECTS[row.slug]) {
        removed.add(row.slug);
        continue;
      }

      const existing = bySlug.get(row.slug);
      const editorialDecision = assessDatabaseBlogRow(row, Boolean(existing));

      if (editorialDecision.useStaticFallback) {
        // A database edit must not override reviewed source-controlled copy when
        // its title, description, or body reintroduces high-risk trading claims.
        const staticIndex = staticPosts.indexOf(existing);
        const sortOrder = Number(row.sort_order);
        bySlug.set(row.slug, {
          ...existing,
          id: row.id || existing.id || null,
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : existing.sortOrder ?? staticIndex,
          _isDbOnly: false,
          _staticIndex: staticIndex,
        });
        continue;
      }

      if (editorialDecision.suppress) {
        // Unsafe database-only content has no reviewed fallback. Keep it out of
        // public listings until it is rewritten or replaced with an approved article.
        removed.add(row.slug);
        continue;
      }

      const merged = publicPostFromDb(row, existing);
      bySlug.set(row.slug, {
        ...merged,
        _isDbOnly: !existing,
        _staticIndex: existing ? staticPosts.indexOf(existing) : Number.MAX_SAFE_INTEGER,
      });
    }

    return [...bySlug.values()]
      .filter((post) => post?.slug && !removed.has(post.slug))
      .sort((a, b) => {
        if (a._isDbOnly !== b._isDbOnly) return a._isDbOnly ? 1 : -1;
        if (!a._isDbOnly && a._staticIndex !== b._staticIndex) return a._staticIndex - b._staticIndex;
        const sortDiff = Number(a.sortOrder || 0) - Number(b.sortOrder || 0);
        if (sortDiff !== 0) return sortDiff;
        return String(a.date || '').localeCompare(String(b.date || ''));
      })
      .map(({ _isDbOnly, _staticIndex, ...post }) => post);
  } catch (error) {
    console.error('Blog DB load error:', error);
    return staticPosts;
  }
}
