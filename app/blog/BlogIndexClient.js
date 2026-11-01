'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import ModuleBanner from '@/app/components/ModuleBanner';

const CATEGORIES = ['Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'];

export default function BlogIndexClient({ posts }) {
  const [active, setActive] = useState('All');
  const [search, setSearch] = useState('');
  const searchQuery = search.trim().toLowerCase();

  const { allPosts, featured, rest, resultCount } = useMemo(() => {
    const allPosts = Array.isArray(posts) ? posts : [];
    const categoryPosts = active === 'All' ? allPosts : allPosts.filter((post) => post.category === active);
    const searchTerms = searchQuery.split(/\s+/).filter(Boolean);
    const matchingPosts = categoryPosts.filter((post) => {
      const searchableText = [post?.title, post?.description, post?.category, post?.slug]
        .filter((value) => typeof value === 'string')
        .join(' ')
        .toLowerCase();
      return searchTerms.every((term) => searchableText.includes(term));
    });
    const featuredPost = allPosts.find((post) => post?.featured) || allPosts[0];
    const featured = active === 'All' && !searchQuery ? featuredPost : null;
    const rest = matchingPosts.filter((post) => post.slug !== featured?.slug);
    return { allPosts, featured, rest, resultCount: matchingPosts.length };
  }, [posts, active, searchQuery]);

  const availableCategories = useMemo(() => {
    const counts = new Map();
    for (const post of allPosts) {
      const category = typeof post?.category === 'string' ? post.category.trim() : '';
      if (category) counts.set(category, (counts.get(category) || 0) + 1);
    }
    const known = CATEGORIES.filter((category) => counts.has(category));
    const additional = [...counts.keys()].filter((category) => !CATEGORIES.includes(category))
      .sort((a, b) => a.localeCompare(b));
    return [
      { name: 'All', count: allPosts.length },
      ...[...known, ...additional].map((name) => ({ name, count: counts.get(name) })),
    ];
  }, [allPosts]);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

        .shine { background: linear-gradient(135deg, #8A6B28 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card { transition: all 0.2s; }
        .card:hover { border-color: rgba(232,197,71,0.95) !important; transform: translateY(-2px); }
      `}</style>

      <Navbar active="/blog" />
      <section style={{ padding: '64px 24px 40px', borderBottom: '1px solid rgba(232,197,71,0.95)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
            <span className="shine">NEWS & INSIGHTS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300 }}>
            ICT education, strategy frameworks, and risk-aware trading practice.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '28px' }}>
          <div style={{ flex: '1 1 320px', maxWidth: '520px' }}>
            <label htmlFor="blog-article-search" style={{ display: 'block', color: '#E8C547', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '9px' }}>
              SEARCH ARTICLES
            </label>
            <input
              id="blog-article-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search titles, topics or descriptions"
              aria-describedby="blog-search-help"
              style={{ width: '100%', boxSizing: 'border-box', background: '#101010', color: 'white', border: '1px solid rgba(232,197,71,0.35)', borderRadius: '8px', padding: '12px 14px', fontSize: '14px' }}
            />
            <p id="blog-search-help" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', lineHeight: 1.5, margin: '7px 0 0' }}>
              Search matches every word across article titles, topics and descriptions.
            </p>
          </div>
          <p role="status" aria-live="polite" aria-atomic="true" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '13px', margin: '0 0 4px' }}>
            Showing {resultCount} {resultCount === 1 ? 'article' : 'articles'}
          </p>
        </div>

        {active === 'All' && featured && (
          <Link href={'/blog/' + featured.slug} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
            <div className="card" style={{ background: '#0C0C0C', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '22px 32px 20px', background: 'linear-gradient(135deg, #111008 0%, #0F0F0E 60%, #0C0C0C 100%)', borderBottom: '1px solid rgba(212,168,67,0.22)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(24px, 3vw, 34px)', color: 'white', lineHeight: 1.05, marginBottom: '12px' }}>{featured.title}</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, fontWeight: 300 }}>{featured.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0 }}>
                    <span style={{ padding: '4px 12px', borderRadius: '100px', border: '1px solid #E8C547', fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#E8C547' }}>FEATURED</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#E8C547' }}>Read article</span>
                  </div>
                </div>
              </div>
              <div style={{ height: '220px', overflow: 'hidden', background: '#090909' }}>
                <ModuleBanner id={featured.slug} title={featured.title} label={featured.category} width={1100} height={220} />
              </div>
            </div>
          </Link>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'white' }}>
            {active === 'All' ? (searchQuery ? 'SEARCH RESULTS' : 'ALL ARTICLES') : active.toUpperCase() + ' ARTICLES'} ({resultCount})
          </h2>
          <nav aria-label="Filter articles by category" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {availableCategories.map(({ name: cat, count }) => (
              <button type="button" key={cat} onClick={() => setActive(cat)} aria-pressed={active === cat} style={{
                padding: '6px 14px', borderRadius: '100px',
                border: '1px solid ' + (active === cat ? '#E8C547' : 'rgba(255,255,255,0.6)'),
                background: active === cat ? 'rgba(232,197,71,0.95)' : 'transparent',
                color: active === cat ? '#080808' : 'rgba(255,255,255,0.85)',
                fontFamily: 'DM Mono, monospace', fontSize: '11px', cursor: 'pointer'
              }}>
                {cat} ({count})
              </button>
            ))}
          </nav>
        </div>

        {rest.length > 0 || featured ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,300px), 1fr))', gap: '16px' }}>
            {rest.map(post => (
              <Link key={post.slug} href={'/blog/' + post.slug} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ background: '#0C0C0C', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '18px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 20px 14px', background: 'linear-gradient(135deg, #111008 0%, #0E0E0E 100%)', borderBottom: '1px solid rgba(212,168,67,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>ICT Flow Team</span>
                    <span style={{ padding: '2px 9px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.22)', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#E8C547' }}>{post.category}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: 'white', lineHeight: 1.1, marginBottom: '10px' }}>{post.title}</h3>
                </div>
                <div style={{ height: '140px', overflow: 'hidden', background: '#090909', flexShrink: 0 }}>
                  <ModuleBanner id={post.slug} title={post.title} label={post.category} width={300} height={140} />
                </div>
                <div style={{ padding: '14px 20px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px', flex: 1 }}>{post.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.6)' }}>{post.readTime}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#E8C547' }}>Read</span>
                  </div>
                </div>
              </div>
            </Link>
            ))}
          </div>
        ) : (
          <section aria-labelledby="blog-empty-heading" style={{ padding: '40px 24px', textAlign: 'center', background: '#101010', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px' }}>
            <h3 id="blog-empty-heading" style={{ color: 'white', fontFamily: 'Bebas Neue, sans-serif', fontSize: '26px', marginBottom: '8px' }}>
              {allPosts.length === 0 ? 'NO ARTICLES AVAILABLE YET' : 'NO MATCHING ARTICLES'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '14px', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 18px' }}>
              {allPosts.length === 0
                ? 'There are no published articles to display right now.'
                : 'Try a different search phrase or clear the current filters to browse all articles.'}
            </p>
            {allPosts.length > 0 && (active !== 'All' || search) && (
              <button
                type="button"
                onClick={() => { setActive('All'); setSearch(''); }}
                style={{ border: '1px solid #E8C547', background: 'transparent', color: '#E8C547', borderRadius: '8px', padding: '10px 16px', fontSize: '12px', cursor: 'pointer' }}
              >
                CLEAR SEARCH AND FILTERS
              </button>
            )}
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}