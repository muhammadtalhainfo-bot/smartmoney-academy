export default function sitemap() {
  const base = 'https://ictflow.com';
  const pages = [
    { path: '', priority: 1.0 },
    { path: '/courses', priority: 0.9 },
    { path: '/foundations', priority: 0.9 },
    { path: '/mentorship', priority: 0.9 },
    { path: '/glossary', priority: 0.85 },
    { path: '/blog', priority: 0.85 },
    { path: '/practice', priority: 0.8 },
    { path: '/pricing', priority: 0.8 },
    { path: '/strategies', priority: 0.8 },
    { path: '/about', priority: 0.7 },
    { path: '/resources', priority: 0.7 },
    { path: '/leaderboard', priority: 0.6 },
    { path: '/journal', priority: 0.6 },
    { path: '/dashboard', priority: 0.6 },
    { path: '/certificate', priority: 0.5 },
    { path: '/privacy', priority: 0.3 },
    { path: '/terms', priority: 0.3 },
    { path: '/cookies', priority: 0.3 },
  ];
  const lessons = Array.from({ length: 14 }, (_, i) => ({ path: `/lesson/${i + 1}`, priority: 0.75 }));

  return [...pages, ...lessons].map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === '/blog' ? 'weekly' : 'monthly',
    priority,
  }));
}
