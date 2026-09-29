import { MODULES } from '../lib/curriculum'
import { POSTS } from './blog/posts'
import { SEO_PAGES } from './learn/seo-data'

const BASE = 'https://ictflow.com'

export default function sitemap() {
  const now = new Date().toISOString()

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
    [`${BASE}/privacy`,     0.3,  'yearly'],
    [`${BASE}/terms`,       0.3,  'yearly'],
    [`${BASE}/cookies`,     0.3,  'yearly'],
  ].map(([url, priority, changeFrequency]) => ({
    url, priority, changeFrequency, lastModified: now,
  }))

  const learnPages = SEO_PAGES.map(({ slug }) => ({
    url: `${BASE}/learn/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const lessonPages = MODULES.map(({ id }) => ({
    url: `${BASE}/lesson/${id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const blogPages = (POSTS || [])
    .filter(p => p && p.slug)
    .map(p => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

  return [...staticPages, learnPages.length ? { url: `${BASE}/learn`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 } : null, ...learnPages, ...lessonPages, ...blogPages].filter(Boolean)
}
