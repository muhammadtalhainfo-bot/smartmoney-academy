'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { POSTS } from './posts';

const CATEGORIES = ['All', 'Beginner', 'Strategy', 'Resources'];

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? POSTS : POSTS.filter(p => p.category === active);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card:hover { border-color: rgba(212,168,67,0.25) !important; transform: translateY(-2px); transition: all 0.2s; }
        .card { transition: all 0.2s; }
      `}</style>

      <Navbar active="/blog" />

      <section style={{ padding: '64px 24px 40px', textAlign: 'center', borderBottom: '1px solid rgba(212,168,67,0.1)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.15)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '20px' }}>
            ICT EDUCATION BLOG
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
            <span style={{ color: 'white' }}>LEARN </span><span className="shine">ICT</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 300 }}>In-depth guides on ICT trading concepts, strategies, and prop firm tips.</p>
        </div>
      </section>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActive(cat)} style={{ padding: '8px 18px', borderRadius: '100px', border: `1px solid ${active === cat ? '#D4A843' : 'rgba(255,255,255,0.1)'}`, background: active === cat ? 'rgba(212,168,67,0.1)' : 'transparent', color: active === cat ? '#D4A843' : 'rgba(255,255,255,0.5)', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <div className="card" style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                <div style={{ height: '160px', overflow: 'hidden' }}>
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.1em', color: '#D4A843', background: 'rgba(212,168,67,0.08)', padding: '3px 10px', borderRadius: '4px' }}>{post.category}</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>{post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: '16px', fontWeight: 500, color: 'white', lineHeight: 1.4, marginBottom: '10px' }}>{post.title}</h2>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontWeight: 300 }}>{post.description}</p>
                  <div style={{ marginTop: '16px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843' }}>Read article →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
