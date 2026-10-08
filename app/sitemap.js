import { MODULES } from '../lib/curriculum'
import { getPublishedBlogPosts } from '../lib/blog-data'
import { SEO_PAGES } from './learn/seo-data'

export const revalidate = 3600

const BASE = 'https://ictflow.com'
const CONTENT_UPDATED_AT = new Date('2026-10-09T00:00:00.000Z')

export default async function sitemap() {
  const posts = await getPublishedBlogPosts();

  const staticPages = [
    [BASE,                  1.0,  'weekly'],
    [`${BASE}/courses`,     0.9,  'monthly'],
    [`${BASE}/foundations`, 0.9,  'monthly'],
    [`${BASE}/mentorship`,  0.9,  'monthly'],
    [`${BASE}/blog`,        0.85, 'weekly'],
    [`${BASE}/glossary`,    0.85, 'monthly'],
    [`${BASE}/strategies`,  0.8,  'monthly'],
    [`${BASE}/practice`,    0.8,  'monthly'],
    [`${BASE}/leaderboard`, 0.7,  'weekly'],
    [`${BASE}/pricing`,     0.8,  'monthly'],
    [`${BASE}/resources`,   0.7,  'monthly'],
    [`${BASE}/tools`,       0.75, 'monthly'],
    [`${BASE}/about`,       0.7,  'monthly'],
    [`${BASE}/editorial-policy`, 0.6, 'monthly'],
    [`${BASE}/privacy`,     0.3,  'yearly'],
    [`${BASE}/terms`,       0.3,  'yearly'],
    [`${BASE}/cookies`,     0.3,  'yearly'],
  ].map(([url, priority, changeFrequency]) => ({
    url, priority, changeFrequency, lastModified: CONTENT_UPDATED_AT,
  }))

  const learnPages = SEO_PAGES.map(({ slug }) => ({
    url: `${BASE}/learn/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: CONTENT_UPDATED_AT,
  }))

  const lessonPages = MODULES.map(({ id }) => ({
    url: `${BASE}/lesson/${id}`,
    changeFrequency: 'monthly',
    priority: 0.75,
    lastModified: CONTENT_UPDATED_AT,
  }))

  const blogPages = (posts || [])
    .filter(p => p && p.slug)
    .map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.date || CONTENT_UPDATED_AT,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticPages, learnPages.length ? { url: `${BASE}/learn`, changeFrequency: 'weekly', priority: 0.9 } : null, ...learnPages, ...lessonPages, ...blogPages].filter(Boolean)
}
