'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { POSTS as STATIC_POSTS } from './posts';
import { createClient } from '@/lib/supabase';

const CATEGORIES = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'];

function normalizePost(p) {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    category: p.category || 'Beginner',
    readTime: p.read_time || p.readTime || '5 min read',
    date: p.date || '',
    image: p.image || p.image_url || '/images/market-structure.png',
    featured: p.featured || false,
    sort_order: p.sort_order || 0,
    fromDB: !!p.id,
  };
}

export default function BlogPage() {
  const [active, setActive] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data: dbPosts } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('sort_order', { ascending: true });

        if (dbPosts && dbPosts.length > 0) {
          setAllPosts(dbPosts.map(normalizePost));
        } else {
          setAllPosts(STATIC_POSTS.map(normalizePost));
        }
      } catch (e) {
        setAllPosts(STATIC_POSTS.map(normalizePost));
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = active === 'All' ? allPosts : allPosts.filter(p => p.category === active);
  const featured = allPosts.find(p => p.featured) || allPosts[0];
  const rest = active === 'All'
    ? allPosts.filter(p => p.slug !== featured?.slug)
    : filtered.filter(p => p.slug !== featured?.slug);

  const handleSubscribe = async () => {
    if (!email.includes('@')) return;
    try {
      const supabase = createClient();
      await supabase.from('email_signups').upsert({ email }, { onConflict: 'email' });
    } catch (e) {}
    setSubscribed(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card { transition: all 0.2s; }
        .card:hover { border-color: rgba(212,168,67,0.25) !important; transform: translateY(-2px); }
        .auth-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(212,168,67,0.15); border-radius: 8px; color: white; padding: 10px 16px; font-size: 14px; outline: none; }
        .auth-input:focus { border-color: #D4A843; }
      `}</style>

      <Navbar active="/blog" />

      <section style={{ padding: '64px 24px 40px', borderBottom: '1px solid rgba(212,168,67,0.1)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 400px at 50% 0%, rgba(212,168,67,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', position: 'relative' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px' }}>
            <h1 className="font-display" style={{ fontSize: 'clamp(52px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
              <span className="shine">NEWS & INSIGHTS</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', fontWeight: 300, marginBottom: '24px' }}>
              ICT education, strategy guides, and prop firm tips delivered weekly.
            </p>
            {!subscribed ? (
              <div style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
                <input className="auth-input" type="email" placeholder="your@email.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  style={{ flex: 1 }} />
                <button onClick={handleSubscribe} style={{ padding: '10px 20px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', border: 'none', borderRadius: '8px', color: 'black', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  SUBSCRIBE
                </button>
              </div>
            ) : (
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#34D399' }}>You are subscribed!</div>
            )}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            LOADING ARTICLES...
          </div>
        ) : (
          <>
            {active === 'All' && featured && (
              <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
                <div className="card" style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  <div style={{ height: '280px', overflow: 'hidden', background: '#111' }}>
                    <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                  <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(212,168,67,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '8px', color: '#D4A843' }}>IF</div>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>ICT Flow Team</span>
                    </div>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#D4A843', background: 'rgba(212,168,67,0.08)', padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.1em', alignSelf: 'flex-start', marginBottom: '12px' }}>{featured.category}</span>
                    <h2 style={{ fontSize: '22px', fontWeight: 500, color: 'white', lineHeight: 1.4, marginBottom: '12px' }}>{featured.title}</h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontWeight: 300, marginBottom: '20px' }}>{featured.description}</p>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{featured.readTime}</span>
                      {featured.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{featured.date}</span>}
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843' }}>Read article -&gt;</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'white', letterSpacing: '0.05em' }}>
                {active === 'All' ? `ALL ARTICLES (${allPosts.length})` : `${active.toUpperCase()} (${filtered.length})`}
              </h2>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setActive(cat)} style={{ padding: '6px 14px', borderRadius: '100px', border: `1px solid ${active === cat ? '#D4A843' : 'rgba(255,255,255,0.1)'}`, background: active === cat ? 'rgba(212,168,67,0.1)' : 'transparent', color: active === cat ? '#D4A843' : 'rgba(255,255,255,0.5)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.1em', cursor: 'pointer' }}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {rest.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>
                No articles in this category yet.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {rest.map(post => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', overflow: 'hidden', height: '100%' }}>
                      <div style={{ height: '150px', overflow: 'hidden', background: '#111' }}>
                        <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                          onError={e => { e.target.style.display = 'none'; }} />
                      </div>
                      <div style={{ padding: '18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(212,168,67,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '7px', color: '#D4A843', flexShrink: 0 }}>IF</div>
                          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)' }}>ICT Flow Team</span>
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: 500, color: 'white', lineHeight: 1.4, marginBottom: '8px' }}>{post.title}</h3>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300, marginBottom: '12px' }}>{post.description}</p>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#D4A843', background: 'rgba(212,168,67,0.08)', padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>{post.category}</span>
                          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>{post.readTime}</span>
                          {post.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{post.date}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
