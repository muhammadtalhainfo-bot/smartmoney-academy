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
                <div className="card" style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '20px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>

                  {/* ── FEATURED PREMIUM BANNER ── */}
                  <div style={{ position: 'relative', minHeight: '280px', overflow: 'hidden' }}>
                    <img
                      src={featured.image}
                      alt={featured.title}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 100% 100%, rgba(212,168,67,0.12) 0%, transparent 65%)' }} />

                    {/* Corner frames */}
                    <div style={{ position: 'absolute', top: '12px', left: '12px', width: '24px', height: '24px', borderTop: '2px solid rgba(212,168,67,0.7)', borderLeft: '2px solid rgba(212,168,67,0.7)' }} />
                    <div style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', borderTop: '2px solid rgba(212,168,67,0.7)', borderRight: '2px solid rgba(212,168,67,0.7)' }} />
                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '24px', height: '24px', borderBottom: '2px solid rgba(212,168,67,0.7)', borderLeft: '2px solid rgba(212,168,67,0.7)' }} />
                    <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '24px', height: '24px', borderBottom: '2px solid rgba(212,168,67,0.7)', borderRight: '2px solid rgba(212,168,67,0.7)' }} />

                    {/* Featured tag */}
                    <div style={{ position: 'absolute', top: '20px', left: '20px', padding: '4px 12px', borderRadius: '100px', background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.4)', fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.15em', color: '#D4A843', backdropFilter: 'blur(8px)' }}>
                      ★ FEATURED
                    </div>

                    {/* IF logo */}
                    <div style={{
                      position: 'absolute', top: '20px', right: '20px',
                      width: '36px', height: '36px', borderRadius: '9px',
                      background: 'rgba(10,10,10,0.85)',
                      border: '1px solid rgba(212,168,67,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(8px)',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16M4 4v16M4 12h8" stroke="#D4A843" strokeWidth="2.2" strokeLinecap="round"/>
                        <path d="M16 12l2 4" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>

                    {/* Title overlay at bottom */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
                      <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', letterSpacing: '0.04em', color: 'white', lineHeight: 1.1, textShadow: '0 2px 16px rgba(0,0,0,0.9)' }}>{featured.title}</h2>
                    </div>
                  </div>

                  {/* Right side */}
                  <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#D4A843', background: 'rgba(212,168,67,0.08)', padding: '3px 10px', borderRadius: '4px', letterSpacing: '0.1em', alignSelf: 'flex-start', marginBottom: '16px', textTransform: 'uppercase' }}>{featured.category}</span>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, fontWeight: 300, marginBottom: '24px' }}>{featured.description}</p>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(212,168,67,0.12)', border: '1px solid rgba(212,168,67,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '7px', color: '#D4A843' }}>IF</div>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>ICT Flow Team</span>
                      </div>
                      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{featured.readTime}</span>
                      {featured.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{featured.date}</span>}
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843' }}>
                      Read article <span>→</span>
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
                    <div className="card" style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '16px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>

                      {/* ── PREMIUM BLOG BANNER ── */}
                      <div style={{ position: 'relative', height: '168px', overflow: 'hidden', flexShrink: 0 }}>
                        {/* Chart image */}
                        <img
                          src={post.image}
                          alt={post.title}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                        {/* Gradient overlay */}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(150deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 100%)' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 100% 100%, rgba(212,168,67,0.1) 0%, transparent 65%)' }} />

                        {/* Corner frame lines */}
                        <div style={{ position: 'absolute', top: '9px', left: '9px', width: '18px', height: '18px', borderTop: '1.5px solid rgba(212,168,67,0.55)', borderLeft: '1.5px solid rgba(212,168,67,0.55)' }} />
                        <div style={{ position: 'absolute', top: '9px', right: '9px', width: '18px', height: '18px', borderTop: '1.5px solid rgba(212,168,67,0.55)', borderRight: '1.5px solid rgba(212,168,67,0.55)' }} />
                        <div style={{ position: 'absolute', bottom: '9px', left: '9px', width: '18px', height: '18px', borderBottom: '1.5px solid rgba(212,168,67,0.55)', borderLeft: '1.5px solid rgba(212,168,67,0.55)' }} />
                        <div style={{ position: 'absolute', bottom: '9px', right: '9px', width: '18px', height: '18px', borderBottom: '1.5px solid rgba(212,168,67,0.55)', borderRight: '1.5px solid rgba(212,168,67,0.55)' }} />

                        {/* IF logo mark */}
                        <div style={{
                          position: 'absolute', top: '16px', left: '16px',
                          width: '28px', height: '28px', borderRadius: '7px',
                          background: 'rgba(10,10,10,0.85)',
                          border: '1px solid rgba(212,168,67,0.4)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backdropFilter: 'blur(8px)',
                        }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4h16M4 4v16M4 12h8" stroke="#D4A843" strokeWidth="2.2" strokeLinecap="round"/>
                            <path d="M16 12l2 4" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round"/>
                          </svg>
                        </div>

                        {/* Category badge */}
                        <div style={{
                          position: 'absolute', top: '16px', right: '16px',
                          padding: '3px 9px',
                          borderRadius: '100px',
                          background: 'rgba(10,10,10,0.8)',
                          border: '1px solid rgba(212,168,67,0.3)',
                          fontFamily: 'DM Mono, monospace',
                          fontSize: '8px', letterSpacing: '0.12em',
                          color: '#D4A843',
                          backdropFilter: 'blur(8px)',
                          textTransform: 'uppercase',
                        }}>{post.category}</div>

                        {/* Title at bottom */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px' }}>
                          <h3 style={{
                            fontFamily: 'Bebas Neue, sans-serif',
                            fontSize: '19px', letterSpacing: '0.03em',
                            color: 'white', lineHeight: 1.1,
                            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                          }}>{post.title}</h3>
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px', flex: 1 }}>{post.description}</p>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(212,168,67,0.12)', border: '1px solid rgba(212,168,67,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '6px', color: '#D4A843', flexShrink: 0 }}>IF</div>
                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.3)' }}>ICT Flow Team</span>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>{post.readTime}</span>
                            {post.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{post.date}</span>}
                          </div>
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
