'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

const ADMIN_PASSWORD = 'sma_admin_2026';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [trades, setTrades] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMsg, setNotifMsg] = useState('');
  const [notifSent, setNotifSent] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogForm, setBlogForm] = useState({
    title: '', slug: '', description: '', category: 'Beginner',
    read_time: '5 min read', image_url: '', content: ''
  });
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogMsg, setBlogMsg] = useState('');
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
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .order('xp', { ascending: false });
    setUsers(profiles || []);

    const { data: emailData } = await supabase
      .from('email_signups')
      .select('*')
      .order('created_at', { ascending: false });
    setEmails(emailData || []);

    const { count } = await supabase
      .from('trades')
      .select('*', { count: 'exact', head: true });
    setTrades(count || 0);

    setLoading(false);
  };

  const sendNotification = async () => {
    if (!notifTitle || !notifMsg) return;
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: notifTitle, message: notifMsg }),
      });
      const result = await response.json();
      if (!response.ok) {
        alert('Error: ' + JSON.stringify(result));
        return;
      }
      setNotifSent(true);
      setNotifTitle('');
      setNotifMsg('');
      setTimeout(() => setNotifSent(false), 3000);
    } catch (e) {
      alert('Failed to send notification');
    }
  };

  const mono = { fontFamily: 'DM Mono, monospace' };
  const card = { background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '16px', padding: '24px', marginBottom: '24px' };

  if (!authed) {
  return (

      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap");'}</style>
        <div style={{ ...card, width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: '32px', color: 'white', marginBottom: '8px' }}>ADMIN PANEL</div>
          <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.5)', marginBottom: '24px' }}>ICT Flow</div>
          <input
            type="password"
            placeholder="Enter admin password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{ width: '100%', background: '#141414', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '12px', color: 'white', ...mono, fontSize: '13px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
          />
          {error && <div style={{ ...mono, fontSize: '11px', color: '#F87171', marginBottom: '12px' }}>{error}</div>}
          <button onClick={login} style={{ width: '100%', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '12px', ...mono, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
            LOGIN
          </button>
        </div>
      </div>
    );
  }

  const loadBlogPosts = async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) setBlogPosts(data);
  };

  const saveBlogPost = async () => {
    if (!blogForm.title || !blogForm.content) {
      setBlogMsg('Title and content are required');
      return;
    }
    setBlogSaving(true);
    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const { error } = await supabase.from('blog_posts').upsert({
      ...blogForm,
      slug,
      published: true
    }, { onConflict: 'slug' });
    if (error) {
      setBlogMsg('Error: ' + error.message);
    } else {
      setBlogMsg('Post published successfully!');
      setBlogForm({ title: '', slug: '', description: '', category: 'Beginner', read_time: '5 min read', image_url: '', content: '' });
      loadBlogPosts();
    }
    setBlogSaving(false);
  };

  const deleteBlogPost = async (slug) => {
    if (!confirm('Delete this post?')) return;
    await supabase.from('blog_posts').delete().eq('slug', slug);
    loadBlogPosts();
  };

  return (

    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', padding: '32px 24px' }}>
      <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500&family=DM+Mono:wght@400;500&display=swap");'}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '42px', color: 'white' }}>ADMIN PANEL</div>
            <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.5)' }}>ICT Flow — Internal Dashboard</div>
          </div>
          <button onClick={loadData} style={{ background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '8px 16px', color: '#D4A843', ...mono, fontSize: '11px', cursor: 'pointer' }}>
            ↻ Refresh
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid rgba(212,168,67,0.1)', paddingBottom: '16px' }}>
          {['dashboard', 'blog'].map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); if (tab === 'blog') loadBlogPosts(); }}
              style={{ padding: '8px 20px', borderRadius: '8px', border: '1px solid', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                background: activeTab === tab ? 'rgba(212,168,67,0.15)' : 'transparent',
                borderColor: activeTab === tab ? '#D4A843' : 'rgba(212,168,67,0.2)',
                color: activeTab === tab ? '#D4A843' : 'rgba(255,255,255,0.4)' }}>
              {tab === 'dashboard' ? '📊 Dashboard' : '✍️ Blog Editor'}
            </button>
          ))}
        </div>

        {activeTab === 'blog' && (
          <div>
            {/* Blog Form */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', color: 'white', marginBottom: '24px' }}>WRITE NEW POST</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>TITLE *</div>
                  <input value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')})}
                    placeholder="Post title..." style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>SLUG (auto-generated)</div>
                  <input value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})}
                    placeholder="post-url-slug" style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Mono, monospace', fontSize: '12px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>DESCRIPTION (SEO)</div>
                <input value={blogForm.description} onChange={e => setBlogForm({...blogForm, description: e.target.value})}
                  placeholder="Brief description for Google..." style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>CATEGORY</div>
                  <select value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})}
                    style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', boxSizing: 'border-box' }}>
                    {['Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>READ TIME</div>
                  <input value={blogForm.read_time} onChange={e => setBlogForm({...blogForm, read_time: e.target.value})}
                    placeholder="5 min read" style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>IMAGE URL</div>
                  <input value={blogForm.image_url} onChange={e => setBlogForm({...blogForm, image_url: e.target.value})}
                    placeholder="https://... or /images/fvg.png" style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '10px 14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', marginBottom: '6px', letterSpacing: '0.1em' }}>CONTENT * (write your full article here)</div>
                <textarea value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})}
                  placeholder="Write your full blog post here. Use double line breaks for paragraphs..."
                  rows={15} style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.2)', borderRadius: '8px', padding: '14px', color: 'white', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', lineHeight: 1.7, resize: 'vertical', boxSizing: 'border-box' }} />
              </div>

              {blogMsg && <div style={{ marginBottom: '16px', padding: '12px', borderRadius: '8px', background: blogMsg.includes('Error') ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)', border: `1px solid ${blogMsg.includes('Error') ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`, color: blogMsg.includes('Error') ? '#F87171' : '#34D399', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>{blogMsg}</div>}

              <button onClick={saveBlogPost} disabled={blogSaving}
                style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '14px 32px', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                {blogSaving ? 'PUBLISHING...' : '🚀 PUBLISH POST'}
              </button>
            </div>

            {/* Published Posts List */}
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '24px', color: 'white', marginBottom: '16px' }}>PUBLISHED POSTS ({blogPosts.length})</div>
            {blogPosts.length === 0 ? (
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '40px' }}>No posts yet. Write your first post above.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {blogPosts.map(post => (
                  <div key={post.id} style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ color: 'white', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '4px' }}>{post.title}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.5)' }}>{post.category} · {post.read_time} · /{post.slug}</div>
                    </div>
                    <button onClick={() => deleteBlogPost(post.slug)}
                      style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '6px', padding: '6px 12px', color: '#F87171', fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>
                      DELETE
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'dashboard' && loading ? (
          <div style={{ ...mono, fontSize: '12px', color: 'rgba(212,168,67,0.5)', textAlign: 'center', padding: '60px' }}>LOADING DATA...</div>
        ) : activeTab === 'dashboard' ? (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              {[
                { label: 'Total Users', value: users.length, icon: '👤' },
                { label: 'Email Signups', value: emails.length, icon: '📧' },
                { label: 'Total Trades', value: trades, icon: '📊' },
              ].map((s, i) => (
                <div key={i} style={card}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: '36px', color: '#D4A843' }}>{s.value}</div>
                  <div style={{ ...mono, fontSize: '10px', color: '#808080', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Send Push Notification */}
            <div style={card}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Send Push Notification</div>
              <input
                placeholder="Title (e.g. New Module Available!)"
                value={notifTitle}
                onChange={e => setNotifTitle(e.target.value)}
                style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: 'white', ...mono, fontSize: '12px', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }}
              />
              <input
                placeholder="Message (e.g. Module 15 is now live — check it out!)"
                value={notifMsg}
                onChange={e => setNotifMsg(e.target.value)}
                style={{ width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: 'white', ...mono, fontSize: '12px', outline: 'none', marginBottom: '12px', boxSizing: 'border-box' }}
              />
              <button onClick={sendNotification} style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '8px', padding: '10px 24px', ...mono, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                {notifSent ? '✓ Sent!' : 'Send to All Users'}
              </button>
            </div>

            {/* Users Table */}
            <div style={card}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Users — Top by XP ({users.length} total)
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['#', 'Username', 'XP', 'Streak', 'Pro', 'Joined'].map(h => (
                        <th key={h} style={{ ...mono, fontSize: '10px', color: '#808080', textAlign: 'left', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.slice(0, 50).map((u, i) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ ...mono, fontSize: '11px', color: '#808080', padding: '10px 12px' }}>{i + 1}</td>
                        <td style={{ ...mono, fontSize: '12px', color: 'white', padding: '10px 12px' }}>{u.username || '—'}</td>
                        <td style={{ ...mono, fontSize: '12px', color: '#D4A843', padding: '10px 12px' }}>{u.xp || 0}</td>
                        <td style={{ ...mono, fontSize: '12px', color: '#34D399', padding: '10px 12px' }}>{u.streak || 0}</td>
                        <td style={{ ...mono, fontSize: '11px', padding: '10px 12px', color: u.is_pro ? '#34D399' : '#808080' }}>{u.is_pro ? '✓ Pro' : 'Free'}</td>
                        <td style={{ ...mono, fontSize: '10px', color: '#808080', padding: '10px 12px' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Email Signups */}
            <div style={card}>
              <div style={{ ...mono, fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Email Signups ({emails.length} total)
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      {['#', 'Email', 'Signed Up'].map(h => (
                        <th key={h} style={{ ...mono, fontSize: '10px', color: '#808080', textAlign: 'left', padding: '8px 12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {emails.slice(0, 50).map((e, i) => (
                      <tr key={e.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <td style={{ ...mono, fontSize: '11px', color: '#808080', padding: '10px 12px' }}>{i + 1}</td>
                        <td style={{ ...mono, fontSize: '12px', color: 'white', padding: '10px 12px' }}>{e.email}</td>
                        <td style={{ ...mono, fontSize: '10px', color: '#808080', padding: '10px 12px' }}>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
