export default function sitemap() {
  const base = 'https://ictflow.com';
  const pages = ['', '/courses', '/glossary', '/mentorship', '/practice', '/pricing', '/resources', '/leaderboard', '/journal', '/dashboard', '/about', '/certificate'];
  const lessons = Array.from({length: 14}, (_, i) => `/lesson/${i + 1}`);
  
  return [...pages, ...lessons].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    priority: path === '' ? 1 : path.includes('lesson') ? 0.7 : 0.8,
  }));
}
