'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { POSTS as STATIC_POSTS } from './posts';
import { createClient } from '@/lib/supabase';
import ModuleBanner from '@/app/components/ModuleBanner';

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
                <div className="card" style={{
                  background: '#0C0C0C',
                  border: '1px solid rgba(212,168,67,0.15)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}>
                  {/* ── FEATURED HEADER STRIP ── */}
                  <div style={{
                    position: 'relative',
                    padding: '22px 32px 20px',
                    background: 'linear-gradient(135deg, #111008 0%, #0F0F0E 60%, #0C0C0C 100%)',
                    borderBottom: '1px solid rgba(212,168,67,0.08)',
                    overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100px', background: 'radial-gradient(ellipse at 100% 0%, rgba(212,168,67,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                        {/* Meta row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <div style={{
                              width: '28px', height: '28px', borderRadius: '8px',
                              background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.25)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'Bebas Neue, sans-serif', fontSize: '11px', color: '#D4A843',
                            }}>IF</div>
                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>ICT Flow Team</span>
                          </div>
                          <div style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.1)' }} />
                          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.25)' }}>{featured.readTime}</span>
                          {featured.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>{featured.date}</span>}
                        </div>

                        {/* Title */}
                        <h2 style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '0.04em',
                          color: 'white', lineHeight: 1.05, marginBottom: '12px',
                        }}>{featured.title}</h2>

                        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65, fontWeight: 300, maxWidth: '540px' }}>{featured.description}</p>
                      </div>

                      {/* Right: badges + CTA */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0 }}>
                        <span style={{
                          padding: '4px 12px', borderRadius: '100px',
                          border: '1px solid rgba(212,168,67,0.3)',
                          fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.12em',
                          color: '#D4A843', background: 'rgba(212,168,67,0.07)',
                          textTransform: 'uppercase',
                        }}>★ Featured</span>
                        <span style={{
                          padding: '4px 12px', borderRadius: '100px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontFamily: 'DM Mono, monospace', fontSize: '9px', letterSpacing: '0.1em',
                          color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase',
                        }}>{featured.category}</span>
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(212,168,67,0.7)', marginTop: '4px' }}>Read article →</span>
                      </div>
                    </div>

                    {/* Gold rule */}
                    <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(212,168,67,0.3), rgba(212,168,67,0.05) 50%, transparent)', marginTop: '18px' }} />
                  </div>

                  {/* ── IMAGE — clean, full width, untouched ── */}
                  <div style={{ height: '220px', overflow: 'hidden', background: '#090909' }}>
                    <ModuleBanner
                      id={featured.slug}
                      title={featured.title}
                      label={featured.category}
                      width={1100}
                      height={220}
                    />
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
                    <div className="card" style={{
                      background: '#0C0C0C',
                      border: '1px solid rgba(212,168,67,0.1)',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}>

                      {/* ── HEADER STRIP ── */}
                      <div style={{
                        position: 'relative',
                        padding: '16px 20px 14px',
                        background: 'linear-gradient(135deg, #111008 0%, #0E0E0E 100%)',
                        borderBottom: '1px solid rgba(212,168,67,0.07)',
                        overflow: 'hidden',
                      }}>
                        <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '80px', background: 'radial-gradient(ellipse at 100% 0%, rgba(212,168,67,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

                        {/* Top row */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <div style={{
                              width: '22px', height: '22px', borderRadius: '6px',
                              background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.22)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'Bebas Neue, sans-serif', fontSize: '9px', color: '#D4A843',
                            }}>IF</div>
                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.05em' }}>ICT Flow Team</span>
                          </div>
                          <span style={{
                            padding: '2px 9px', borderRadius: '100px',
                            border: '1px solid rgba(212,168,67,0.22)',
                            fontFamily: 'DM Mono, monospace', fontSize: '8px', letterSpacing: '0.1em',
                            color: '#D4A843', background: 'rgba(212,168,67,0.06)',
                            textTransform: 'uppercase',
                          }}>{post.category}</span>
                        </div>

                        {/* Title */}
                        <h3 style={{
                          fontFamily: 'Bebas Neue, sans-serif',
                          fontSize: '20px', letterSpacing: '0.04em',
                          color: 'white', lineHeight: 1.1, marginBottom: '10px',
                        }}>{post.title}</h3>

                        {/* Gold rule */}
                        <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(212,168,67,0.28), rgba(212,168,67,0.05) 60%, transparent)' }} />
                      </div>

                      {/* ── IMAGE — clean, untouched ── */}
                      <div style={{ height: '140px', overflow: 'hidden', background: '#090909', borderBottom: '1px solid rgba(255,255,255,0.03)', flexShrink: 0 }}>
                        <ModuleBanner
                          id={post.slug}
                          title={post.title}
                          label={post.category}
                          width={300}
                          height={140}
                        />
                      </div>

                      {/* ── BODY ── */}
                      <div style={{ padding: '14px 20px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontWeight: 300, marginBottom: '14px', flex: 1 }}>{post.description}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.22)' }}>{post.readTime}</span>
                            {post.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.18)' }}>{post.date}</span>}
                          </div>
                          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)' }}>Read →</span>
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
