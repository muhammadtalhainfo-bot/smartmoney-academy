'use client';
import Link from 'next/link';
import { use } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { POSTS } from '../posts';

export default function BlogPost({ params }) {
  const { slug } = use(params);
  const post = POSTS.find(p => p.slug === slug);

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '64px', color: '#D4A843' }}>404</div>
        <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>Post not found</p>
        <Link href="/blog" style={{ color: '#D4A843', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>← Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      <Navbar active="/blog" />

      {/* Hero image */}
      <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, #080808)' }} />
      </div>

      <article style={{ maxWidth: '720px', margin: '-80px auto 0', padding: '0 24px 80px', position: 'relative' }}>
        {/* Meta */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#D4A843', background: 'rgba(212,168,67,0.08)', padding: '4px 12px', borderRadius: '4px', letterSpacing: '0.1em' }}>{post.category}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{post.readTime}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{post.date}</span>
        </div>

        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 6vw, 56px)', color: 'white', lineHeight: 1.1, marginBottom: '32px', letterSpacing: '0.02em' }}>{post.title}</h1>

        {/* Content */}
        {post.content.map((block, i) => {
          if (block.type === 'intro') return (
            <p key={i} style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px', borderLeft: '3px solid #D4A843', paddingLeft: '20px' }}>{block.text}</p>
          );
          if (block.type === 'heading') return (
            <h2 key={i} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: 'white', letterSpacing: '0.05em', marginTop: '40px', marginBottom: '16px' }}>{block.text}</h2>
          );
          if (block.type === 'paragraph') return (
            <p key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>{block.text}</p>
          );
          if (block.type === 'list') return (
            <ul key={i} style={{ marginBottom: '24px', paddingLeft: '0', listStyle: 'none' }}>
              {block.items.map((item, j) => (
                <li key={j} style={{ display: 'flex', gap: '12px', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontWeight: 300 }}>
                  <span style={{ color: '#D4A843', flexShrink: 0, marginTop: '2px' }}>→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
          if (block.type === 'cta') return (
            <div key={i} style={{ marginTop: '48px', padding: '28px', background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '16px', fontWeight: 300 }}>{block.text}</p>
              <Link href={block.link} style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '8px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}>
                {block.label}
              </Link>
            </div>
          );
          return null;
        })}

        {/* Back link */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/blog" style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.1em' }}>← BACK TO BLOG</Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
