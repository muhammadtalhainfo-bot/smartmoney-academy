'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

const ADMIN_PASSWORD = 'sma_admin_2026';

const card = { background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '16px', padding: '24px' };
const mono = { fontFamily: 'DM Mono, monospace', letterSpacing: '0.08em' };
const input_style = { width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', boxSizing: 'border-box' };

const EMPTY_POST = { title: '', slug: '', description: '', category: 'Beginner', read_time: '5 min read', date: '', image: '', content: '', featured: false, published: true, sort_order: 0 };

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);

  // Dashboard state
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [trades, setTrades] = useState(0);
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifSent, setNotifSent] = useState(false);

  // Blog state
  const [blogPosts, setBlogPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [blogForm, setBlogForm] = useState(EMPTY_POST);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogMsg, setBlogMsg] = useState('');
  const [blogView, setBlogView] = useState('list'); // list or edit

  const supabase = createClient();

  const login = () => {
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
      loadData();
    } else {
      setError('Wrong password');
    }
  };

  const loadData = async () => {
    setLoading(true);
    const { data: usersData } = await supabase.from('profiles').select('*').order('xp', { ascending: false }).limit(50);
    const { data: emailsData } = await supabase.from('email_signups').select('*').order('created_at', { ascending: false });
    const { count } = await supabase.from('trades').select('*', { count: 'exact', head: true });
    if (usersData) setUsers(usersData);
    if (emailsData) setEmails(emailsData);
    if (count !== null) setTrades(count);
    setLoading(false);
  };

  const loadBlogPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('sort_order', { ascending: true });
    if (data) setBlogPosts(data);
  };

  const saveBlogPost = async () => {
    if (!blogForm.title || !blogForm.content) { setBlogMsg('Title and content are required'); return; }
    setBlogSaving(true);
    setBlogMsg('');
    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const date = blogForm.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { error } = await supabase.from('blog_posts').upsert({ ...blogForm, slug, date, published: true }, { onConflict: 'slug' });
    if (error) { setBlogMsg('Error: ' + error.message); }
    else { setBlogMsg('Post saved successfully!'); loadBlogPosts(); setBlogView('list'); setBlogForm(EMPTY_POST); setEditingPost(null); }
    setBlogSaving(false);
  };

  const deletePost = async (slug) => {
    if (!confirm('Delete this post permanently?')) return;
    await supabase.from('blog_posts').delete().eq('slug', slug);
    loadBlogPosts();
  };

  const editPost = (post) => {
    setEditingPost(post.id);
    setBlogForm({ ...post });
    setBlogView('edit');
    setBlogMsg('');
  };

  const togglePublish = async (post) => {
    await supabase.from('blog_posts').update({ published: !post.published }).eq('id', post.id);
    loadBlogPosts();
  };

  const sendNotification = async () => {
    if (!notifTitle || !notifMsg) return;
    const response = await fetch('/api/notify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: notifTitle, message: notifMsg }) });
    const result = await response.json();
    if (!response.ok) { alert('Error: ' + JSON.stringify(result)); return; }
    setNotifSent(true);
    setNotifTitle(''); setNotifMsg('');
    setTimeout(() => setNotifSent(false), 3000);
  };

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap");'}</style>
        <div style={{ ...card, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '32px', color: 'white', marginBottom: '8px' }}>ADMIN PANEL</div>
          <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.5)', marginBottom: '24px' }}>ICT Flow</div>
          <input type="password" placeholder="Enter admin password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
            style={{ ...input_style, marginBottom: '12px' }} />
          {error && <div style={{ ...mono, fontSize: '11px', color: '#F87171', marginBottom: '12px' }}>{error}</div>}
          <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '12px', ...mono, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>LOGIN</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap");'}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '42px', color: 'white' }}>ADMIN PANEL</div>
            <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.5)' }}>ICT Flow — Internal Dashboard</div>
          </div>
          <button onClick={loadData} style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '8px 16px', color: '#D4A843', ...mono, fontSize: '11px', cursor: 'pointer' }}>↻ Refresh</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid rgba(212,168,67,0.1)', paddingBottom: '16px' }}>
          {[['dashboard', '📊 Dashboard'], ['blog', '✍️ Blog CMS'], ['notifications', '🔔 Notifications']].map(([tab, label]) => (
            <button key={tab} onClick={() => { setActiveTab(tab); if (tab === 'blog') { loadBlogPosts(); setBlogView('list'); } }}
              style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid', ...mono, fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer',
                background: activeTab === tab ? 'rgba(212,168,67,0.15)' : 'transparent',
                borderColor: activeTab === tab ? '#D4A843' : 'rgba(212,168,67,0.2)',
                color: activeTab === tab ? '#D4A843' : 'rgba(255,255,255,0.4)' }}>
              {label}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          loading ? <div style={{ ...mono, fontSize: '12px', color: 'rgba(212,168,67,0.5)', textAlign: 'center', padding: '60px' }}>LOADING DATA...</div> :
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[{ label: 'Total Users', value: users.length, icon: '👤' }, { label: 'Email Signups', value: emails.length, icon: '📧' }, { label: 'Total Trades', value: trades, icon: '📊' }].map((s, i) => (
                <div key={i} style={card}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: '#D4A843' }}>{s.value}</div>
                  <div style={{ ...mono, fontSize: '10px', color: '#808080', textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ ...card, marginBottom: '24px' }}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.7)', marginBottom: '16px', letterSpacing: '0.15em' }}>// USERS — TOP BY XP ({users.length} TOTAL)</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>{['Username', 'XP', 'Streak', 'Pro', 'Joined'].map(h => <th key={h} style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.5)', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid rgba(212,168,67,0.08)', textTransform: 'uppercase' }}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ padding: '10px 12px', fontSize: '13px' }}>{u.username || '—'}</td>
                        <td style={{ padding: '10px 12px', color: '#D4A843', ...mono, fontSize: '12px' }}>{u.xp || 0}</td>
                        <td style={{ padding: '10px 12px', fontSize: '13px' }}>{u.streak || 0}🔥</td>
                        <td style={{ padding: '10px 12px' }}><span style={{ background: u.is_pro ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)', color: u.is_pro ? '#34D399' : '#666', padding: '2px 8px', borderRadius: '4px', ...mono, fontSize: '10px' }}>{u.is_pro ? 'PRO' : 'FREE'}</span></td>
                        <td style={{ padding: '10px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* BLOG CMS TAB */}
        {activeTab === 'blog' && (
          <div>
            {blogView === 'list' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: 'white' }}>BLOG POSTS ({blogPosts.length})</div>
                  <button onClick={() => { setBlogForm(EMPTY_POST); setEditingPost(null); setBlogView('edit'); setBlogMsg(''); }}
                    style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '10px 24px', ...mono, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    + NEW POST
                  </button>
                </div>

                {blogPosts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)', ...mono, fontSize: '12px' }}>No posts yet. Click NEW POST to write your first article.</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {blogPosts.map((post) => (
                      <div key={post.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#141414', flexShrink: 0, overflow: 'hidden' }}>
                          {post.image && <img src={post.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</div>
                          <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.5)' }}>{post.category} · {post.read_time} · /{post.slug}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                          <button onClick={() => togglePublish(post)}
                            style={{ background: post.published ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)', border: `1px solid ${post.published ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`, borderRadius: '6px', padding: '6px 12px', color: post.published ? '#34D399' : '#F87171', ...mono, fontSize: '10px', cursor: 'pointer' }}>
                            {post.published ? 'LIVE' : 'DRAFT'}
                          </button>
                          <button onClick={() => editPost(post)}
                            style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '6px', padding: '6px 12px', color: '#D4A843', ...mono, fontSize: '10px', cursor: 'pointer' }}>
                            EDIT
                          </button>
                          <button onClick={() => deletePost(post.slug)}
                            style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '6px', padding: '6px 12px', color: '#F87171', ...mono, fontSize: '10px', cursor: 'pointer' }}>
                            DELETE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {blogView === 'edit' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <button onClick={() => { setBlogView('list'); setBlogForm(EMPTY_POST); setEditingPost(null); }}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 16px', color: 'rgba(255,255,255,0.6)', ...mono, fontSize: '11px', cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: 'white' }}>{editingPost ? 'EDIT POST' : 'NEW POST'}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>TITLE *</div>
                    <input value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value, slug: editingPost ? blogForm.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')})}
                      placeholder="Post title..." style={input_style} />
                  </div>
                  <div>
                    <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>SLUG</div>
                    <input value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})}
                      placeholder="post-url-slug" style={{ ...input_style, color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Mono, monospace', fontSize: '12px' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>DESCRIPTION (shown in Google + blog list)</div>
                  <input value={blogForm.description} onChange={e => setBlogForm({...blogForm, description: e.target.value})}
                    placeholder="Brief description for SEO and blog preview..." style={input_style} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>CATEGORY</div>
                    <select value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                      style={{ ...input_style }}>
                      {['Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>READ TIME</div>
                    <input value={blogForm.read_time} onChange={e => setBlogForm({...blogForm, read_time: e.target.value})}
                      placeholder="5 min read" style={input_style} />
                  </div>
                  <div>
                    <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>DATE</div>
                    <input value={blogForm.date} onChange={e => setBlogForm({...blogForm, date: e.target.value})}
                      placeholder="April 2, 2026" style={input_style} />
                  </div>
                  <div>
                    <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>SORT ORDER</div>
                    <input type="number" value={blogForm.sort_order} onChange={e => setBlogForm({...blogForm, sort_order: parseInt(e.target.value)})}
                      placeholder="0" style={input_style} />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>IMAGE URL (paste URL or use /images/fvg.png etc)</div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input value={blogForm.image} onChange={e => setBlogForm({...blogForm, image: e.target.value})}
                      placeholder="https://... or /images/fvg.png" style={{ ...input_style, flex: 1 }} />
                    {blogForm.image && <img src={blogForm.image} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />}
                  </div>
                  <div style={{ ...mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>Available: /images/market-structure.png · /images/liquidity.png · /images/fvg.png · /images/order-blocks.png · /images/killzones.png · /images/amd.png · /images/premium-discount.png</div>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={blogForm.featured} onChange={e => setBlogForm({...blogForm, featured: e.target.checked})} />
                    <span style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Featured post</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={blogForm.published} onChange={e => setBlogForm({...blogForm, published: e.target.checked})} />
                    <span style={{ ...mono, fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Published (visible on site)</span>
                  </label>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>CONTENT * — Write your full article. Use double line breaks for paragraphs.</div>
                  <textarea value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                    placeholder="Write your full blog post here...&#10;&#10;Use blank lines between paragraphs.&#10;&#10;You can write naturally — no special formatting needed."
                    rows={20} style={{ ...input_style, lineHeight: 1.7, resize: 'vertical' }} />
                </div>

                {blogMsg && <div style={{ marginBottom: '16px', padding: '12px', borderRadius: '8px',
                  background: blogMsg.includes('Error') ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)',
                  border: `1px solid ${blogMsg.includes('Error') ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
                  color: blogMsg.includes('Error') ? '#F87171' : '#34D399', ...mono, fontSize: '12px' }}>{blogMsg}</div>}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={saveBlogPost} disabled={blogSaving}
                    style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '14px 32px', ...mono, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    {blogSaving ? 'SAVING...' : editingPost ? '💾 SAVE CHANGES' : '🚀 PUBLISH POST'}
                  </button>
                  <button onClick={() => { setBlogView('list'); setBlogForm(EMPTY_POST); setEditingPost(null); }}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '14px 24px', color: 'rgba(255,255,255,0.4)', ...mono, fontSize: '12px', cursor: 'pointer' }}>
                    CANCEL
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div style={{ ...card, maxWidth: '600px' }}>
            <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.7)', marginBottom: '20px', letterSpacing: '0.15em' }}>// SEND PUSH NOTIFICATION</div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>TITLE</div>
              <input value={notifTitle} onChange={e => setNotifTitle(e.target.value)} placeholder="Notification title..." style={input_style} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ ...mono, fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px' }}>MESSAGE</div>
              <textarea value={notifMsg} onChange={e => setNotifMsg(e.target.value)} placeholder="Notification message..." rows={4}
                style={{ ...input_style, resize: 'vertical' }} />
            </div>
            {notifSent && <div style={{ marginBottom: '16px', padding: '12px', borderRadius: '8px', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: '#34D399', ...mono, fontSize: '12px' }}>Notification sent successfully!</div>}
            <button onClick={sendNotification} style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '12px 28px', ...mono, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              Send to All Users
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
