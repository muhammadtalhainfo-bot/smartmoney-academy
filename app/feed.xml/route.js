import { POSTS } from '../blog/posts'

const BASE = 'https://ictflow.com'

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function parseDate(value) {
  const time = Date.parse(value)
  return Number.isNaN(time) ? new Date().toUTCString() : new Date(time).toUTCString()
}

export function GET() {
  const items = POSTS.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${parseDate(post.date)}</pubDate>
      <category>${escapeXml(post.category)}</category>
    </item>`).join('\\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ICT Flow Blog</title>
    <link>${BASE}/blog</link>
    <description>ICT and Smart Money Concepts trading education from ICT Flow.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
