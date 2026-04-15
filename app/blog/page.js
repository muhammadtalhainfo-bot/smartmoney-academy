'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { POSTS } from './posts';
import ModuleBanner from '@/app/components/ModuleBanner';

const CATEGORIES = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'];

export default function BlogPage() {
  const [active, setActive] = useState('All');

  const allPosts = POSTS.map(p => ({
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    category: p.category || 'Beginner',
    readTime: p.readTime || '5 min read',
    date: p.date || '',
    image: p.image || '/images/market-structure.png',
    featured: p.featured || false,
  }));

  const filtered = active === 'All' ? allPosts : allPosts.filter(p => p.category === active);
  const featured = allPosts.find(p => p.featured) || allPosts[0];
  const rest = (active === 'All' ? allPosts : filtered).filter(p => p.slug !== featured?.slug);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card { transition: all 0.2s; }
        .card:hover { border-color: rgba(212,168,67,0.25) !important; transform: translateY(-2px); }
      `}</style>

      <Navbar active="/blog" />

      <section style={{ padding: '64px 24px 40px', borderBottom: '1px solid rgba(212,168,67,0.15)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
            <span className="shine">NEWS & INSIGHTS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300 }}>
            ICT education, strategy guides, and prop firm tips delivered weekly.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>

        {active === 'All' && featured && (
          <Link href={'/blog/' + featured.slug} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
            <div className="card" style={{ background: '#0C0C0C', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '20px', overflow: 'hidden' }}>
              <div style={{ padding: '22px 32px 20px', background: 'linear-gradient(135deg, #111008 0%, #0F0F0E 60%, #0C0C0C 100%)', borderBottom: '1px solid rgba(212,168,67,0.12)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(24px, 3vw, 34px)', color: 'white', lineHeight: 1.05, marginBottom: '12px' }}>{featured.title}</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, fontWeight: 300 }}>{featured.description}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0 }}>
                    <span style={{ padding: '4px 12px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.8)', fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#D4A843' }}>FEATURED</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(212,168,67,0.7)' }}>Read article</span>
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
            ALL ARTICLES ({allPosts.length})
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)} style={{
                padding: '6px 14px', borderRadius: '100px',
                border: '1px solid ' + (active === cat ? '#D4A843' : 'rgba(255,255,255,0.1)'),
                background: active === cat ? 'rgba(212,168,67,0.15)' : 'transparent',
                color: active === cat ? '#D4A843' : 'rgba(255,255,255,0.5)',
                fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer'
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {rest.map(post => (
            <Link key={post.slug} href={'/blog/' + post.slug} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ background: '#0C0C0C', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '18px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 20px 14px', background: 'linear-gradient(135deg, #111008 0%, #0E0E0E 100%)', borderBottom: '1px solid rgba(212,168,67,0.07)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.28)' }}>ICT Flow Team</span>
                    <span style={{ padding: '2px 9px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.22)', fontFamily: 'DM Mono, monospace', fontSize: '8px', color: '#D4A843' }}>{post.category}</span>
                  </div>
                  <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: 'white', lineHeight: 1.1, marginBottom: '10px' }}>{post.title}</h3>
                </div>
                <div style={{ height: '140px', overflow: 'hidden', background: '#090909', flexShrink: 0 }}>
                  <ModuleBanner id={post.slug} title={post.title} label={post.category} width={300} height={140} />
                </div>
                <div style={{ padding: '14px 20px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px', flex: 1 }}>{post.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>{post.readTime}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.8)' }}>Read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
