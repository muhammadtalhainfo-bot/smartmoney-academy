import { POSTS } from './blog/posts'

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

  const lessonPages = [
    ...Array.from({ length: 28 }, (_, i) => i + 1),
    29, 30, 201, 202, 301
  ].map(id => ({
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

  return [...staticPages, ...lessonPages, ...blogPages]
}
