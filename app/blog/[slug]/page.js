'use client';
import Link from 'next/link';
import { use } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { POSTS } from '../posts';

function renderContent(content) {
  if (typeof content === 'string') {
    return content.split(/\n\n+/).map((para, i) => (
      <p key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>{para.trim()}</p>
    ));
  }
  if (Array.isArray(content)) {
    return content.map((block, i) => {
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
            <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontWeight: 300 }}>
              <span style={{ color: '#D4A843', flexShrink: 0, marginTop: '4px' }}>diamond</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      if (block.type === 'highlight') return (
        <div key={i} style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, fontWeight: 400, margin: 0 }}>{block.text}</p>
        </div>
      );
      return null;
    });
  }
  return null;
}

export default function BlogPost({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams ? resolvedParams.slug : null;

  if (!slug) return <div style={{ minHeight: '100vh', background: '#080808' }} />;

  const post = POSTS.find(p => p && p.slug === slug) || null;

  if (!post) return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '64px', color: '#D4A843' }}>404</div>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Post not found</p>
        <Link href="/blog" style={{ color: '#D4A843', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>

      <Navbar active="/blog" />

      <div style={{ height: '320px', overflow: 'hidden', position: 'relative', background: '#0D0D0D' }}>
        <img
          src={post.image || '/images/market-structure.png'}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          onError={e => { e.target.style.display = 'none'; }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #080808)' }} />
      </div>

      <article style={{ maxWidth: '720px', margin: '-80px auto 0', padding: '0 24px 80px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#D4A843', background: 'rgba(212,168,67,0.08)', padding: '4px 12px', borderRadius: '4px', letterSpacing: '0.1em' }}>{post.category}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{post.readTime}</span>
          {post.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{post.date}</span>}
        </div>

        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 6vw, 56px)', color: 'white', lineHeight: 1.1, marginBottom: '32px', letterSpacing: '0.02em' }}>{post.title}</h1>

        {post.description && (
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px', borderLeft: '3px solid #D4A843', paddingLeft: '20px' }}>{post.description}</p>
        )}

        <div>{renderContent(post.content)}</div>

        <div style={{ marginTop: '64px', padding: '32px', background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: 'white', marginBottom: '8px' }}>READY TO APPLY THIS?</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '24px' }}>14 free ICT modules. Structured learning. Zero fluff.</p>
          <Link href="/courses" style={{ background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', padding: '12px 32px', borderRadius: '8px', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none' }}>
            START LEARNING FREE
          </Link>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/blog" style={{ color: '#D4A843', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em' }}>
            BACK TO BLOG
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
