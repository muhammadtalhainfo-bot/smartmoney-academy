'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';

// ─── AUTH ────────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'sma_admin_2026';

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const G = '#D4A843';
const G2 = '#F0C96A';
const BG = '#060608';
const S1 = '#0C0C10';
const S2 = '#111118';
const S3 = '#16161E';
const BORDER = 'rgba(212,168,67,0.1)';
const BORDER2 = 'rgba(212,168,67,0.2)';

const css = {
  card: { background: S2, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px' },
  mono: { fontFamily: 'DM Mono, monospace', letterSpacing: '0.06em' },
  sans: { fontFamily: 'DM Sans, sans-serif' },
  bebas: { fontFamily: 'Bebas Neue, sans-serif' },
  input: {
    width: '100%', background: S1, border: `1px solid ${BORDER2}`,
    borderRadius: '8px', padding: '10px 14px', color: 'white',
    fontFamily: 'DM Sans, sans-serif', fontSize: '14px',
    boxSizing: 'border-box', outline: 'none',
  },
  btn: {
    background: `linear-gradient(135deg, ${G}, ${G2})`, color: '#080808',
    border: 'none', borderRadius: '8px', padding: '10px 22px',
    fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 700,
    cursor: 'pointer', letterSpacing: '0.08em',
  },
  btnGhost: {
    background: 'transparent', border: `1px solid ${BORDER2}`,
    borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.5)',
    fontFamily: 'DM Mono, monospace', fontSize: '11px', cursor: 'pointer',
    letterSpacing: '0.06em',
  },
  btnDanger: {
    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)',
    borderRadius: '8px', padding: '7px 14px', color: '#F87171',
    fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer',
  },
  label: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: `rgba(212,168,67,0.65)`, marginBottom: '6px', letterSpacing: '0.12em', display: 'block', textTransform: 'uppercase' },
};

// ─── STATIC DATA (mirrors site) ───────────────────────────────────────────────
const MODULES_DATA = [
  { id: 1, module: '01', title: 'Market Structure', level: 'Beginner', tag: 'ICT', lessons: 6, duration: '48 min', emoji: '📊' },
  { id: 2, module: '02', title: 'Liquidity Concepts', level: 'Beginner', tag: 'ICT', lessons: 5, duration: '45 min', emoji: '💧' },
  { id: 3, module: '03', title: 'Fair Value Gaps (FVG)', level: 'Beginner', tag: 'ICT & SMC', lessons: 5, duration: '42 min', emoji: '🎯' },
  { id: 4, module: '04', title: 'Order Blocks', level: 'Intermediate', tag: 'ICT', lessons: 6, duration: '52 min', emoji: '🧱' },
  { id: 5, module: '05', title: 'Killzones & Macros', level: 'Intermediate', tag: 'ICT', lessons: 4, duration: '38 min', emoji: '⏰' },
  { id: 6, module: '06', title: 'Power of Three (AMD)', level: 'Intermediate', tag: 'ICT', lessons: 5, duration: '44 min', emoji: '🔱' },
  { id: 7, module: '07', title: 'Premium & Discount', level: 'Intermediate', tag: 'ICT', lessons: 4, duration: '36 min', emoji: '📐' },
  { id: 8, module: '08', title: 'ICT Entry Models', level: 'Intermediate', tag: 'ICT', lessons: 7, duration: '60 min', emoji: '🎲' },
  { id: 9, module: '09', title: 'Market Maker Models', level: 'Advanced', tag: 'ICT', lessons: 5, duration: '55 min', emoji: '🏦' },
  { id: 10, module: '10', title: 'SMT Divergence', level: 'Advanced', tag: 'ICT', lessons: 4, duration: '40 min', emoji: '🔀' },
  { id: 11, module: '11', title: 'IPDA & CRT', level: 'Advanced', tag: 'ICT', lessons: 5, duration: '50 min', emoji: '🤖' },
  { id: 12, module: '12', title: 'ICT 2024 Mentorship', level: 'Advanced', tag: '2024', lessons: 8, duration: '75 min', emoji: '🆕' },
  { id: 13, module: '13', title: 'SMC — Smart Money Concepts', level: 'SMC', tag: 'SMC', lessons: 6, duration: '50 min', emoji: '💼' },
  { id: 14, module: '14', title: 'Top-Down Analysis', level: 'Intermediate', tag: 'ICT', lessons: 5, duration: '42 min', emoji: '🔭' },
];

const NAV_PAGES = [
  { href: '/', label: 'Home', desc: 'Landing page with ticker, courses, testimonials' },
  { href: '/courses', label: 'Courses', desc: 'All 14 course modules listing' },
  { href: '/glossary', label: 'Glossary', desc: 'ICT/SMC terms dictionary (75+ terms)' },
  { href: '/practice', label: 'Practice', desc: 'Quiz practice questions' },
  { href: '/strategies', label: 'Strategies', desc: 'ICT strategy breakdowns' },
  { href: '/mentorship', label: 'Mentorship', desc: '2022 ICT Mentorship sessions' },
  { href: '/blog', label: 'Blog', desc: 'SEO blog posts (DB or static)' },
  { href: '/pricing', label: 'Pricing', desc: 'Free vs Pro plans + Stripe checkout' },
  { href: '/about', label: 'About', desc: 'About the platform' },
  { href: '/resources', label: 'Resources', desc: 'External trading resources' },
  { href: '/journal', label: 'Journal', desc: 'Trade journal (Pro only)' },
  { href: '/dashboard', label: 'Dashboard', desc: 'User progress dashboard' },
  { href: '/leaderboard', label: 'Leaderboard', desc: 'Community XP leaderboard' },
  { href: '/certificate', label: 'Certificate', desc: 'Course completion certificate' },
  { href: '/foundations', label: 'Foundations', desc: 'Trading foundations intro' },
  { href: '/auth', label: 'Auth', desc: 'Login / signup page' },
];

const FREE_FEATURES_DEFAULT = [
  'Modules 1–3 (Market Structure, Liquidity, FVG)',
  'ICT Glossary (75+ terms)',
  'Basic practice questions',
  'Trade Journal',
];
const PRO_FEATURES_DEFAULT = [
  'Everything in Free',
  'All 28 modules unlocked',
  'AI-generated daily challenges',
  'Certificate of completion',
  'Discord community access',
  'Weekly market breakdown',
  'Priority support',
  'Early access to new modules',
  'Cancel anytime',
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const Badge = ({ color = G, children }) => (
  <span style={{
    background: `${color}18`, border: `1px solid ${color}30`,
    color, borderRadius: '5px', padding: '2px 8px',
    fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.06em'
  }}>{children}</span>
);

const StatCard = ({ icon, value, label, sub }) => (
  <div style={{ ...css.card, textAlign: 'center' }}>
    <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
    <div style={{ ...css.bebas, fontSize: '38px', color: G, lineHeight: 1 }}>{value}</div>
    <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: '6px' }}>{label}</div>
    {sub && <div style={{ ...css.mono, fontSize: '9px', color: `rgba(212,168,67,0.4)`, marginTop: '4px' }}>{sub}</div>}
  </div>
);

const FieldGroup = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={css.label}>{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text', style = {} }) => (
  <input
    type={type} value={value} onChange={onChange}
    placeholder={placeholder}
    style={{ ...css.input, ...style }}
  />
);

const Textarea = ({ value, onChange, placeholder, rows = 5, style = {} }) => (
  <textarea
    value={value} onChange={onChange} placeholder={placeholder} rows={rows}
    style={{ ...css.input, resize: 'vertical', lineHeight: 1.6, ...style }}
  />
);

const Select = ({ value, onChange, options, style = {} }) => (
  <select value={value} onChange={onChange} style={{ ...css.input, ...style }}>
    {options.map(o => typeof o === 'string'
      ? <option key={o} value={o}>{o}</option>
      : <option key={o.value} value={o.value}>{o.label}</option>
    )}
  </select>
);

const SectionHeader = ({ title, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <div style={{ ...css.bebas, fontSize: '26px', color: 'white', letterSpacing: '0.04em' }}>{title}</div>
    {action}
  </div>
);

const Toast = ({ msg, type = 'success' }) => msg ? (
  <div style={{
    padding: '12px 16px', borderRadius: '8px', marginBottom: '16px',
    background: type === 'error' ? 'rgba(248,113,113,0.08)' : 'rgba(52,211,153,0.08)',
    border: `1px solid ${type === 'error' ? 'rgba(248,113,113,0.3)' : 'rgba(52,211,153,0.3)'}`,
    color: type === 'error' ? '#F87171' : '#34D399',
    fontFamily: 'DM Mono, monospace', fontSize: '12px',
  }}>{msg}</div>
) : null;

const Divider = () => <div style={{ height: '1px', background: BORDER, margin: '24px 0' }} />;

// ─── TABS CONFIG ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard', label: '📊 Dashboard', group: 'overview' },
  { id: 'users', label: '👥 Users', group: 'overview' },
  { id: 'blog', label: '✍️ Blog', group: 'content' },
  { id: 'courses', label: '📚 Courses', group: 'content' },
  { id: 'pages', label: '📄 Pages', group: 'content' },
  { id: 'banners', label: '🚨 Banners', group: 'content' },
  { id: 'media', label: '🖼️ Media', group: 'content' },
  { id: 'categories', label: '🏷️ Categories', group: 'content' },
  { id: 'pricing', label: '💳 Pricing', group: 'settings' },
  { id: 'seo', label: '🔍 SEO', group: 'settings' },
  { id: 'nav', label: '🧭 Navigation', group: 'settings' },
  { id: 'notifications', label: '🔔 Notifications', group: 'settings' },
];

const GROUPS = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'content', label: 'CONTENT' },
  { id: 'settings', label: 'SETTINGS' },
];

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function DashboardSection({ users, emails, trades, proUsers, loading, onRefresh }) {
  const topUsers = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 8);
  const recentEmails = [...emails].slice(0, 6);

  return (
    <div>
      <SectionHeader title="SITE OVERVIEW" action={
        <button onClick={onRefresh} style={{ ...css.btnGhost }}>↻ Refresh</button>
      } />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', ...css.mono, fontSize: '12px', color: `rgba(212,168,67,0.4)` }}>LOADING DATA...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
            <StatCard icon="👥" value={users.length} label="Total Users" sub={`${proUsers} Pro`} />
            <StatCard icon="💰" value={proUsers} label="Pro Members" sub={`$${proUsers * 19}/mo revenue`} />
            <StatCard icon="📧" value={emails.length} label="Email Leads" />
            <StatCard icon="📊" value={trades} label="Trade Logs" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* Top Users */}
            <div style={css.card}>
              <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.15em' }}>// TOP USERS BY XP</div>
              {topUsers.length === 0 ? (
                <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '20px' }}>No users yet</div>
              ) : topUsers.map((u, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.2)', width: '18px' }}>#{i + 1}</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{u.username || u.email?.split('@')[0] || '—'}</div>
                  <div style={{ ...css.mono, fontSize: '11px', color: G }}>{u.xp || 0} XP</div>
                  <Badge color={u.is_pro ? '#34D399' : '#666'}>{u.is_pro ? 'PRO' : 'FREE'}</Badge>
                </div>
              ))}
            </div>

            {/* Recent Emails */}
            <div style={css.card}>
              <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.15em' }}>// RECENT EMAIL LEADS</div>
              {recentEmails.length === 0 ? (
                <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '20px' }}>No email signups yet</div>
              ) : recentEmails.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: '16px' }}>📧</div>
                  <div style={{ flex: 1, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.email}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ ...css.card, marginTop: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.15em' }}>// QUICK LINKS — LIVE SITE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['/', '/courses', '/blog', '/pricing', '/glossary', '/practice', '/leaderboard', '/dashboard'].map(href => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ ...css.mono, fontSize: '11px', color: G, background: `${G}12`, border: `1px solid ${BORDER2}`, borderRadius: '6px', padding: '6px 12px', textDecoration: 'none' }}>
                  {href} ↗
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── USERS ────────────────────────────────────────────────────────────────────
function UsersSection({ users, supabase, onReload }) {
  const [search, setSearch] = useState('');
  const [filterPro, setFilterPro] = useState('all');
  const [msg, setMsg] = useState('');

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || (u.username || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
    const matchPro = filterPro === 'all' || (filterPro === 'pro' ? u.is_pro : !u.is_pro);
    return matchSearch && matchPro;
  });

  const togglePro = async (u) => {
    await supabase.from('profiles').update({ is_pro: !u.is_pro }).eq('id', u.id);
    setMsg(`${u.username || 'User'} updated to ${u.is_pro ? 'Free' : 'Pro'}`);
    onReload();
    setTimeout(() => setMsg(''), 3000);
  };

  const deleteUser = async (u) => {
    if (!confirm(`Delete user ${u.username || u.email}? This cannot be undone.`)) return;
    await supabase.from('profiles').delete().eq('id', u.id);
    onReload();
  };

  return (
    <div>
      <SectionHeader title={`USERS (${users.length})`} />
      <Toast msg={msg} />

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by username or email..." style={{ flex: 1 }} />
        <Select value={filterPro} onChange={e => setFilterPro(e.target.value)} options={[
          { value: 'all', label: 'All Users' }, { value: 'pro', label: 'Pro Only' }, { value: 'free', label: 'Free Only' }
        ]} style={{ width: '160px' }} />
      </div>

      <div style={css.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Username', 'Email', 'XP', 'Streak', 'Plan', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ ...css.mono, fontSize: '9px', color: `rgba(212,168,67,0.5)`, padding: '8px 12px', textAlign: 'left', borderBottom: `1px solid ${BORDER}`, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                  <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 500 }}>{u.username || '—'}</td>
                  <td style={{ padding: '10px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{u.email || '—'}</td>
                  <td style={{ padding: '10px 12px', color: G, ...css.mono, fontSize: '12px' }}>{u.xp || 0}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>{u.streak || 0}🔥</td>
                  <td style={{ padding: '10px 12px' }}>
                    <button onClick={() => togglePro(u)} style={{
                      background: u.is_pro ? 'rgba(52,211,153,0.1)' : 'rgba(212,168,67,0.1)',
                      border: `1px solid ${u.is_pro ? 'rgba(52,211,153,0.3)' : BORDER2}`,
                      borderRadius: '5px', padding: '3px 10px',
                      color: u.is_pro ? '#34D399' : G,
                      ...css.mono, fontSize: '10px', cursor: 'pointer'
                    }}>{u.is_pro ? '✓ PRO' : 'FREE'}</button>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <button onClick={() => deleteUser(u)} style={{ ...css.btnDanger }}>DELETE</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
const EMPTY_POST = { title: '', slug: '', description: '', category: 'Beginner', read_time: '5 min read', date: '', image: '', content: '', featured: false, published: true, sort_order: 0, meta_title: '', meta_desc: '' };

function BlogSection({ supabase }) {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('list');
  const [form, setForm] = useState(EMPTY_POST);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: 'success' });
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const load = useCallback(async () => {
    const { data } = await supabase.from('blog_posts').select('*').order('sort_order', { ascending: true });
    if (data) setPosts(data);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q);
    const matchCat = filterCat === 'all' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const save = async () => {
    if (!form.title || !form.content) { setMsg({ text: 'Title and content are required', type: 'error' }); return; }
    setSaving(true);
    setMsg({ text: '', type: 'success' });
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const date = form.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { error } = await supabase.from('blog_posts').upsert({ ...form, slug, date }, { onConflict: 'slug' });
    if (error) setMsg({ text: 'Error: ' + error.message, type: 'error' });
    else { setMsg({ text: '✓ Post saved successfully!', type: 'success' }); load(); setView('list'); setForm(EMPTY_POST); setEditId(null); }
    setSaving(false);
  };

  const del = async (slug) => {
    if (!confirm('Delete this post permanently?')) return;
    await supabase.from('blog_posts').delete().eq('slug', slug);
    load();
  };

  const edit = (p) => { setEditId(p.id); setForm({ ...p }); setView('edit'); setMsg({ text: '', type: 'success' }); };
  const togglePub = async (p) => { await supabase.from('blog_posts').update({ published: !p.published }).eq('id', p.id); load(); };

  const CATS = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'];

  if (view === 'edit') return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <button onClick={() => { setView('list'); setForm(EMPTY_POST); setEditId(null); }} style={{ ...css.btnGhost }}>← Back</button>
        <div style={{ ...css.bebas, fontSize: '26px', color: 'white' }}>{editId ? 'EDIT POST' : 'NEW POST'}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Main */}
        <div>
          <FieldGroup label="Title *">
            <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: editId ? form.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })} placeholder="Post title..." />
          </FieldGroup>
          <FieldGroup label="Slug (URL)">
            <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="post-url-slug" style={{ ...css.mono, fontSize: '12px', color: 'rgba(255,255,255,0.6)' }} />
          </FieldGroup>
          <FieldGroup label="Description (SEO + Blog Preview)">
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description shown in Google and blog listing..." rows={2} />
          </FieldGroup>
          <FieldGroup label="Content *">
            <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder={'Write your full blog post here...\n\nUse blank lines for paragraph breaks.\n\nNo special formatting needed — just write naturally.'} rows={20} />
          </FieldGroup>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>PUBLISH SETTINGS</div>
            <FieldGroup label="Status">
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Published', 'Draft'].map(s => (
                  <button key={s} onClick={() => setForm({ ...form, published: s === 'Published' })}
                    style={{ flex: 1, padding: '8px', borderRadius: '7px', border: `1px solid`,
                      background: (s === 'Published') === form.published ? `${G}18` : 'transparent',
                      borderColor: (s === 'Published') === form.published ? G : BORDER2,
                      color: (s === 'Published') === form.published ? G : 'rgba(255,255,255,0.4)',
                      ...css.mono, fontSize: '11px', cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
            </FieldGroup>
            <FieldGroup label="Category">
              <Select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                options={['Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis']} />
            </FieldGroup>
            <FieldGroup label="Read Time">
              <Input value={form.read_time} onChange={e => setForm({ ...form, read_time: e.target.value })} placeholder="5 min read" />
            </FieldGroup>
            <FieldGroup label="Date">
              <Input value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="April 2, 2026" />
            </FieldGroup>
            <FieldGroup label="Sort Order">
              <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} placeholder="0" />
            </FieldGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '4px' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Featured post (shown first)</span>
            </label>
          </div>

          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>COVER IMAGE</div>
            <FieldGroup label="Image URL">
              <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/fvg.png or https://..." />
            </FieldGroup>
            {form.image && <img src={form.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} onError={e => e.target.style.display = 'none'} />}
            <div style={{ ...css.mono, fontSize: '9px', color: 'rgba(255,255,255,0.25)', marginTop: '8px', lineHeight: 1.6 }}>
              Built-in: /images/market-structure.png · /images/liquidity.png · /images/fvg.png · /images/order-blocks.png · /images/killzones.png · /images/amd.png · /images/premium-discount.png
            </div>
          </div>

          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>SEO META TAGS</div>
            <FieldGroup label="Meta Title (leave blank to use post title)">
              <Input value={form.meta_title || ''} onChange={e => setForm({ ...form, meta_title: e.target.value })} placeholder="Custom SEO title..." />
            </FieldGroup>
            <FieldGroup label="Meta Description (leave blank to use description)">
              <Textarea value={form.meta_desc || ''} onChange={e => setForm({ ...form, meta_desc: e.target.value })} placeholder="Custom meta description..." rows={2} />
            </FieldGroup>
          </div>

          <Toast msg={msg.text} type={msg.type} />
          <button onClick={save} disabled={saving} style={{ ...css.btn, width: '100%', padding: '14px', fontSize: '12px', marginBottom: '8px' }}>
            {saving ? 'SAVING...' : editId ? '💾 SAVE CHANGES' : '🚀 PUBLISH POST'}
          </button>
          <button onClick={() => { setView('list'); setForm(EMPTY_POST); setEditId(null); }} style={{ ...css.btnGhost, width: '100%', padding: '12px' }}>CANCEL</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader title={`BLOG POSTS (${posts.length})`} action={
        <button onClick={() => { setForm(EMPTY_POST); setEditId(null); setView('edit'); setMsg({ text: '', type: 'success' }); }} style={css.btn}>+ NEW POST</button>
      } />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{ flex: 1 }} />
        <Select value={filterCat} onChange={e => setFilterCat(e.target.value)} options={CATS.map(c => ({ value: c, label: c === 'all' ? 'All Categories' : c }))} style={{ width: '180px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div style={{ ...css.card, textAlign: 'center', padding: '50px', ...css.mono, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
            {posts.length === 0 ? 'No blog posts yet. Click NEW POST to write your first article.' : 'No posts match your search.'}
          </div>
        ) : filtered.map(p => (
          <div key={p.id} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '8px', background: S3, flexShrink: 0, overflow: 'hidden' }}>
              {p.image && <img src={p.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {p.featured && <span style={{ ...css.mono, fontSize: '9px', color: G, marginRight: '8px' }}>★ FEATURED</span>}
                {p.title}
              </div>
              <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.5)` }}>{p.category} · {p.read_time} · /{p.slug}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
              <button onClick={() => togglePub(p)} style={{
                background: p.published ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${p.published ? 'rgba(52,211,153,0.3)' : BORDER}`,
                borderRadius: '6px', padding: '5px 12px',
                color: p.published ? '#34D399' : 'rgba(255,255,255,0.3)',
                ...css.mono, fontSize: '10px', cursor: 'pointer'
              }}>{p.published ? '● LIVE' : '○ DRAFT'}</button>
              <button onClick={() => edit(p)} style={{ ...css.btn, padding: '6px 14px', fontSize: '10px' }}>EDIT</button>
              <button onClick={() => del(p.slug)} style={{ ...css.btnDanger }}>DEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── COURSES ─────────────────────────────────────────────────────────────────
function CoursesSection({ supabase }) {
  const [modules, setModules] = useState(MODULES_DATA.map(m => ({ ...m, locked: m.id > 3, comingSoon: false, visible: true })));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');

  const startEdit = (m) => { setEditing(m.id); setForm({ ...m }); };
  const cancelEdit = () => { setEditing(null); setForm({}); };

  const save = () => {
    setModules(prev => prev.map(m => m.id === editing ? { ...m, ...form } : m));
    setEditing(null);
    setMsg('✓ Module updated locally. To persist, update your courses/page.js source file with these values.');
    setTimeout(() => setMsg(''), 5000);
  };

  const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'SMC'];
  const TAGS = ['ICT', 'ICT & SMC', 'SMC', '2024'];

  return (
    <div>
      <SectionHeader title={`COURSE MODULES (${modules.length})`} />
      <div style={{ ...css.card, padding: '14px 18px', marginBottom: '16px', background: 'rgba(212,168,67,0.04)' }}>
        <div style={{ ...css.mono, fontSize: '11px', color: `rgba(212,168,67,0.7)` }}>
          ℹ️ Course modules are defined in your <code style={{ color: G }}>app/courses/page.js</code> source file. Changes here show a live preview. To make them permanent, apply the same changes to your source file and push to GitHub.
        </div>
      </div>
      <Toast msg={msg} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {modules.map(m => (
          <div key={m.id}>
            {editing === m.id ? (
              <div style={{ ...css.card, border: `1px solid ${BORDER2}` }}>
                <div style={{ ...css.bebas, fontSize: '18px', color: G, marginBottom: '16px' }}>EDITING: {m.title}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <FieldGroup label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Level"><Select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} options={LEVELS} /></FieldGroup>
                  <FieldGroup label="Tag"><Select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} options={TAGS} /></FieldGroup>
                  <FieldGroup label="Lessons"><Input type="number" value={form.lessons} onChange={e => setForm({ ...form, lessons: parseInt(e.target.value) || 0 })} /></FieldGroup>
                  <FieldGroup label="Duration"><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="48 min" /></FieldGroup>
                  <FieldGroup label="Emoji"><Input value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} /></FieldGroup>
                </div>
                <FieldGroup label="Description">
                  <Textarea value={form.desc || ''} onChange={e => setForm({ ...form, desc: e.target.value })} rows={2} />
                </FieldGroup>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.locked} onChange={e => setForm({ ...form, locked: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Pro locked</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.comingSoon} onChange={e => setForm({ ...form, comingSoon: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Coming soon</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.visible !== false} onChange={e => setForm({ ...form, visible: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Visible</span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={save} style={css.btn}>💾 SAVE MODULE</button>
                  <button onClick={cancelEdit} style={css.btnGhost}>CANCEL</button>
                </div>
              </div>
            ) : (
              <div style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${G}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>{m.emoji}</div>
                <div style={{ ...css.mono, fontSize: '11px', color: `rgba(212,168,67,0.5)`, width: '28px', flexShrink: 0 }}>{m.module}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '3px' }}>{m.title}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{m.lessons} lessons · {m.duration} · {m.tag}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Badge color={m.level === 'Beginner' ? '#34D399' : m.level === 'Intermediate' ? G : m.level === 'Advanced' ? '#F87171' : '#A78BFA'}>{m.level}</Badge>
                  {m.locked && <Badge color="#F87171">PRO</Badge>}
                  {m.comingSoon && <Badge color="rgba(255,255,255,0.4)">SOON</Badge>}
                  {m.visible === false && <Badge color="rgba(255,255,255,0.2)">HIDDEN</Badge>}
                  <button onClick={() => startEdit(m)} style={{ ...css.btn, padding: '6px 14px', fontSize: '10px', marginLeft: '6px' }}>EDIT</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
function PagesSection() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <SectionHeader title="SITE PAGES" />
      <div style={{ ...css.card, padding: '14px 18px', marginBottom: '16px', background: 'rgba(212,168,67,0.04)' }}>
        <div style={{ ...css.mono, fontSize: '11px', color: `rgba(212,168,67,0.7)` }}>
          ℹ️ All pages are React/Next.js files. Select a page below to see its file location and open it in the live site.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {NAV_PAGES.map(p => (
          <div key={p.href} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', cursor: 'pointer', border: selected === p.href ? `1px solid ${BORDER2}` : `1px solid ${BORDER}` }}
            onClick={() => setSelected(selected === p.href ? null : p.href)}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{p.label}</div>
              <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.5)` }}>{p.href}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>{p.desc}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" style={{ ...css.btn, padding: '6px 12px', fontSize: '10px', textDecoration: 'none', display: 'block', textAlign: 'center' }}>VIEW ↗</a>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div style={{ ...css.card, marginTop: '16px', border: `1px solid ${BORDER2}` }}>
          <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '10px', letterSpacing: '0.12em' }}>PAGE FILE LOCATION</div>
          <div style={{ background: S1, borderRadius: '8px', padding: '14px', ...css.mono, fontSize: '13px', color: G }}>
            app{selected === '/' ? '/page.js' : `${selected}/page.js`}
          </div>
          <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '10px' }}>
            Edit this file in your code editor and push to GitHub to update the live site.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BANNERS ─────────────────────────────────────────────────────────────────
function BannersSection({ supabase }) {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ text: '', cta_text: '', cta_url: '', type: 'info', active: true, page: 'all' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: 'success' });
  const [showForm, setShowForm] = useState(false);

  const load = useCallback(async () => {
    const { data } = await supabase.from('banners').select('*').order('created_at', { ascending: false });
    if (data) setBanners(data);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!form.text) { setMsg({ text: 'Banner text is required', type: 'error' }); return; }
    setSaving(true);
    const { error } = await supabase.from('banners').insert(form);
    if (error) setMsg({ text: 'Error: ' + error.message, type: 'error' });
    else { setMsg({ text: '✓ Banner created!', type: 'success' }); load(); setShowForm(false); setForm({ text: '', cta_text: '', cta_url: '', type: 'info', active: true, page: 'all' }); }
    setSaving(false);
    setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
  };

  const toggle = async (b) => { await supabase.from('banners').update({ active: !b.active }).eq('id', b.id); load(); };
  const del = async (id) => { if (!confirm('Delete banner?')) return; await supabase.from('banners').delete().eq('id', id); load(); };

  const TYPE_COLORS = { info: G, warning: '#FBBF24', success: '#34D399', promo: '#A78BFA' };

  return (
    <div>
      <SectionHeader title="SITE BANNERS" action={
        <button onClick={() => setShowForm(!showForm)} style={css.btn}>+ NEW BANNER</button>
      } />

      {showForm && (
        <div style={{ ...css.card, marginBottom: '16px', border: `1px solid ${BORDER2}` }}>
          <div style={{ ...css.bebas, fontSize: '20px', color: 'white', marginBottom: '16px' }}>NEW BANNER</div>
          <Toast msg={msg.text} type={msg.type} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <FieldGroup label="Type">
              <Select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                options={[{ value: 'info', label: '📢 Info' }, { value: 'warning', label: '⚠️ Warning' }, { value: 'success', label: '✅ Success' }, { value: 'promo', label: '🎉 Promo' }]} />
            </FieldGroup>
            <FieldGroup label="Show on Page">
              <Select value={form.page} onChange={e => setForm({ ...form, page: e.target.value })}
                options={[{ value: 'all', label: 'All Pages' }, ...NAV_PAGES.map(p => ({ value: p.href, label: p.label }))]} />
            </FieldGroup>
          </div>
          <FieldGroup label="Banner Text *">
            <Input value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="e.g. 🎉 Black Friday — 50% off Pro! Use code BLACKFRIDAY at checkout." />
          </FieldGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FieldGroup label="CTA Button Text">
              <Input value={form.cta_text} onChange={e => setForm({ ...form, cta_text: e.target.value })} placeholder="Get Deal" />
            </FieldGroup>
            <FieldGroup label="CTA Link URL">
              <Input value={form.cta_url} onChange={e => setForm({ ...form, cta_url: e.target.value })} placeholder="/pricing" />
            </FieldGroup>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button onClick={save} disabled={saving} style={css.btn}>{saving ? 'SAVING...' : '+ CREATE BANNER'}</button>
            <button onClick={() => setShowForm(false)} style={css.btnGhost}>CANCEL</button>
          </div>
        </div>
      )}

      {banners.length === 0 ? (
        <div style={{ ...css.card, textAlign: 'center', padding: '50px', ...css.mono, fontSize: '12px', color: 'rgba(255,255,255,0.2)' }}>
          No banners created yet. Add your first site-wide announcement, promo, or alert.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {banners.map(b => (
            <div key={b.id} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderLeft: `3px solid ${TYPE_COLORS[b.type] || G}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '3px' }}>{b.text}</div>
                <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
                  {b.type?.toUpperCase()} · Page: {b.page} {b.cta_text && `· CTA: "${b.cta_text}" → ${b.cta_url}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => toggle(b)} style={{
                  background: b.active ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${b.active ? 'rgba(52,211,153,0.3)' : BORDER}`,
                  borderRadius: '6px', padding: '5px 12px',
                  color: b.active ? '#34D399' : 'rgba(255,255,255,0.3)',
                  ...css.mono, fontSize: '10px', cursor: 'pointer'
                }}>{b.active ? '● LIVE' : '○ OFF'}</button>
                <button onClick={() => del(b.id)} style={{ ...css.btnDanger }}>DEL</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MEDIA ────────────────────────────────────────────────────────────────────
function MediaSection() {
  const IMAGES = [
    '/images/market-structure.png', '/images/liquidity.png', '/images/fvg.png',
    '/images/order-blocks.png', '/images/killzones.png', '/images/amd.png',
    '/images/premium-discount.png',
    '/modules images/Market structure.png', '/modules images/LIQUIDITY CONCEPTS.png',
    '/modules images/Fair Value Gaps (FVG).png', '/modules images/ORDER BLOCKS.png',
    '/modules images/AMD.png', '/modules images/Premium_and_discount.png',
    '/modules images/SMC.png', '/modules images/IPDA.png', '/modules images/SMT.png',
    '/modules images/Top down analysis.png', '/modules images/entry model.png',
    '/public/favicon.svg', '/public/ictflow-symbol.svg',
  ];

  const [copied, setCopied] = useState('');
  const copy = (url) => { navigator.clipboard.writeText(url); setCopied(url); setTimeout(() => setCopied(''), 2000); };

  return (
    <div>
      <SectionHeader title="MEDIA LIBRARY" />
      <div style={{ ...css.card, padding: '14px 18px', marginBottom: '16px', background: 'rgba(212,168,67,0.04)' }}>
        <div style={{ ...css.mono, fontSize: '11px', color: `rgba(212,168,67,0.7)` }}>
          ℹ️ These are the static images available in your project. To add new images, place them in the <code style={{ color: G }}>/public/images/</code> folder and push to GitHub.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {IMAGES.map(img => (
          <div key={img} style={{ ...css.card, padding: '12px', cursor: 'pointer', border: copied === img ? `1px solid ${G}` : `1px solid ${BORDER}` }}
            onClick={() => copy(img)}>
            <div style={{ width: '100%', height: '80px', background: S3, borderRadius: '6px', overflow: 'hidden', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = '<span style="font-size:24px">🖼️</span>'; }} />
            </div>
            <div style={{ ...css.mono, fontSize: '9px', color: copied === img ? G : 'rgba(255,255,255,0.4)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {copied === img ? '✓ COPIED!' : img.split('/').pop()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
function CategoriesSection({ supabase }) {
  const BLOG_CATS = ['Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'];
  const MODULE_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'SMC'];
  const GLOSSARY_CATS = ['ICT', 'ICT & SMC', 'SMC', 'Risk', 'General'];

  return (
    <div>
      <SectionHeader title="CONTENT CATEGORIES" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {[
          { title: 'Blog Categories', items: BLOG_CATS, color: '#60A5FA' },
          { title: 'Module Levels', items: MODULE_LEVELS, color: '#34D399' },
          { title: 'Glossary Categories', items: GLOSSARY_CATS, color: G },
        ].map(group => (
          <div key={group.title} style={css.card}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>{group.title.toUpperCase()}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {group.items.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: S3, borderRadius: '7px' }}>
                  <span style={{ fontSize: '13px' }}>{item}</span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: group.color }} />
                </div>
              ))}
            </div>
            <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>
              Edit in source files to add/remove categories
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────
function PricingSection({ supabase }) {
  const [freeFeatures, setFreeFeatures] = useState(FREE_FEATURES_DEFAULT);
  const [proFeatures, setProFeatures] = useState(PRO_FEATURES_DEFAULT);
  const [monthlyPrice, setMonthlyPrice] = useState('19');
  const [annualPrice, setAnnualPrice] = useState('149');
  const [newFeature, setNewFeature] = useState('');
  const [addingTo, setAddingTo] = useState(null);
  const [msg, setMsg] = useState('');

  const addFeature = (plan) => {
    if (!newFeature.trim()) return;
    if (plan === 'free') setFreeFeatures(prev => [...prev, newFeature.trim()]);
    else setProFeatures(prev => [...prev, newFeature.trim()]);
    setNewFeature('');
    setAddingTo(null);
    setMsg('✓ Feature added locally. Update your pricing/page.js to persist.');
    setTimeout(() => setMsg(''), 4000);
  };

  const removeFeature = (plan, i) => {
    if (plan === 'free') setFreeFeatures(prev => prev.filter((_, idx) => idx !== i));
    else setProFeatures(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <SectionHeader title="PRICING MANAGEMENT" />
      <Toast msg={msg} />

      <div style={{ ...css.card, padding: '14px 18px', marginBottom: '16px', background: 'rgba(212,168,67,0.04)' }}>
        <div style={{ ...css.mono, fontSize: '11px', color: `rgba(212,168,67,0.7)` }}>
          ℹ️ Pricing data lives in <code style={{ color: G }}>app/pricing/page.js</code>. Stripe prices are set in your Stripe dashboard and linked via environment variables.
        </div>
      </div>

      {/* Prices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={css.card}>
          <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>MONTHLY PRICE (USD)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '24px', color: G, fontWeight: 700 }}>$</div>
            <Input value={monthlyPrice} onChange={e => setMonthlyPrice(e.target.value)} style={{ fontSize: '28px', fontWeight: 700, color: G, width: '120px' }} />
            <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>/month</div>
          </div>
        </div>
        <div style={css.card}>
          <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>ANNUAL PRICE (USD)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ fontSize: '24px', color: '#34D399', fontWeight: 700 }}>$</div>
            <Input value={annualPrice} onChange={e => setAnnualPrice(e.target.value)} style={{ fontSize: '28px', fontWeight: 700, color: '#34D399', width: '120px' }} />
            <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>/year</div>
          </div>
        </div>
      </div>

      {/* Feature Lists */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {[
          { plan: 'free', label: 'FREE PLAN FEATURES', features: freeFeatures, color: '#60A5FA' },
          { plan: 'pro', label: 'PRO PLAN FEATURES', features: proFeatures, color: G },
        ].map(({ plan, label, features, color }) => (
          <div key={plan} style={css.card}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>{label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: S3, borderRadius: '7px' }}>
                  <div style={{ color, fontSize: '12px', flexShrink: 0 }}>✓</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{f}</div>
                  <button onClick={() => removeFeature(plan, i)} style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '14px', lineHeight: 1 }}>×</button>
                </div>
              ))}
            </div>
            {addingTo === plan ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="New feature..." style={{ flex: 1 }} onKeyDown={e => e.key === 'Enter' && addFeature(plan)} />
                <button onClick={() => addFeature(plan)} style={css.btn}>ADD</button>
                <button onClick={() => { setAddingTo(null); setNewFeature(''); }} style={css.btnGhost}>✕</button>
              </div>
            ) : (
              <button onClick={() => { setAddingTo(plan); setNewFeature(''); }} style={{ ...css.btnGhost, width: '100%', padding: '8px' }}>+ Add Feature</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEO ─────────────────────────────────────────────────────────────────────
function SEOSection({ supabase }) {
  const [form, setForm] = useState({
    site_name: 'ICT Flow',
    site_tagline: 'Master ICT & Smart Money Concepts',
    meta_description: 'The most comprehensive ICT & Smart Money Concepts learning platform. Master market structure, liquidity, FVGs, order blocks, and all ICT strategies.',
    keywords: 'ICT trading, smart money concepts, order blocks, fair value gap, liquidity, market structure, forex trading education',
    og_image: '/og-image.png',
    twitter_handle: '@ictflow',
    google_analytics: '',
    google_site_verify: 'googlebb5bafc8712b4351',
    canonical_url: 'https://ictflow.com',
  });
  const [msg, setMsg] = useState({ text: '', type: 'success' });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ key: 'seo', value: form }, { onConflict: 'key' });
    if (error) setMsg({ text: 'Error: ' + error.message, type: 'error' });
    else setMsg({ text: '✓ SEO settings saved!', type: 'success' });
    setSaving(false);
    setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
  };

  return (
    <div>
      <SectionHeader title="SEO SETTINGS" />
      <Toast msg={msg.text} type={msg.type} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>GLOBAL SITE META</div>
            <FieldGroup label="Site Name"><Input value={form.site_name} onChange={e => setForm({ ...form, site_name: e.target.value })} /></FieldGroup>
            <FieldGroup label="Site Tagline"><Input value={form.site_tagline} onChange={e => setForm({ ...form, site_tagline: e.target.value })} /></FieldGroup>
            <FieldGroup label="Default Meta Description"><Textarea value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} rows={3} /></FieldGroup>
            <FieldGroup label="Keywords (comma separated)"><Textarea value={form.keywords} onChange={e => setForm({ ...form, keywords: e.target.value })} rows={2} /></FieldGroup>
            <FieldGroup label="Canonical URL"><Input value={form.canonical_url} onChange={e => setForm({ ...form, canonical_url: e.target.value })} /></FieldGroup>
          </div>
        </div>

        <div>
          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>SOCIAL & OG</div>
            <FieldGroup label="OG Image URL (used for link previews)"><Input value={form.og_image} onChange={e => setForm({ ...form, og_image: e.target.value })} /></FieldGroup>
            <FieldGroup label="Twitter/X Handle"><Input value={form.twitter_handle} onChange={e => setForm({ ...form, twitter_handle: e.target.value })} placeholder="@yourhandle" /></FieldGroup>
          </div>

          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>ANALYTICS & VERIFICATION</div>
            <FieldGroup label="Google Analytics ID"><Input value={form.google_analytics} onChange={e => setForm({ ...form, google_analytics: e.target.value })} placeholder="G-XXXXXXXXXX" /></FieldGroup>
            <FieldGroup label="Google Site Verification"><Input value={form.google_site_verify} onChange={e => setForm({ ...form, google_site_verify: e.target.value })} /></FieldGroup>
          </div>

          <div style={{ ...css.card, marginBottom: '16px', background: 'rgba(212,168,67,0.04)' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '10px', letterSpacing: '0.12em' }}>SITEMAP STATUS</div>
            <div style={{ ...css.mono, fontSize: '12px', color: '#34D399', marginBottom: '4px' }}>✓ Dynamic sitemap active</div>
            <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>app/sitemap.js — auto-generates for all pages & lessons</div>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ ...css.mono, fontSize: '11px', color: G, display: 'block', marginTop: '8px' }}>View sitemap.xml ↗</a>
          </div>

          <button onClick={save} disabled={saving} style={{ ...css.btn, width: '100%', padding: '14px' }}>
            {saving ? 'SAVING...' : '💾 SAVE SEO SETTINGS'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── NAVIGATION ───────────────────────────────────────────────────────────────
function NavSection() {
  const MAIN = [['/', 'Home'], ['/foundations', 'Trading Foundations'], ['/courses', 'Courses'], ['/glossary', 'Glossary'], ['/dashboard', 'Dashboard']];
  const MORE = [['/mentorship', '2022 ICT Mentorship'], ['/practice', 'Practice'], ['/journal', 'Journal'], ['/leaderboard', 'Leaderboard'], ['/certificate', 'Certificate'], ['/resources', 'Resources'], ['/blog', 'Blog'], ['https://discord.gg/bh2YK6vF', 'Discord 💬'], ['/pricing', 'Pricing'], ['/about', 'About']];

  return (
    <div>
      <SectionHeader title="NAVIGATION MANAGER" />
      <div style={{ ...css.card, padding: '14px 18px', marginBottom: '16px', background: 'rgba(212,168,67,0.04)' }}>
        <div style={{ ...css.mono, fontSize: '11px', color: `rgba(212,168,67,0.7)` }}>
          ℹ️ Navigation is defined in <code style={{ color: G }}>app/components/Navbar.js</code>. Edit that file to add, remove, or reorder nav items.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {[{ label: 'MAIN NAV (always visible)', items: MAIN }, { label: '"MORE" DROPDOWN', items: MORE }].map(group => (
          <div key={group.label} style={css.card}>
            <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>{group.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {group.items.map(([href, label], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: S3, borderRadius: '7px' }}>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.25)', width: '18px' }}>{i + 1}</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{label}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.4)` }}>{href}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
function NotificationsSection() {
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [url, setUrl] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ text: '', type: 'success' });

  const send = async () => {
    if (!title || !msg) { setStatus({ text: 'Title and message are required', type: 'error' }); return; }
    setSending(true);
    setStatus({ text: '', type: 'success' });
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message: msg, url }),
      });
      const result = await response.json();
      if (!response.ok) { setStatus({ text: 'Error: ' + JSON.stringify(result), type: 'error' }); }
      else { setStatus({ text: '✓ Notification sent to all users!', type: 'success' }); setTitle(''); setMsg(''); setUrl(''); }
    } catch (e) {
      setStatus({ text: 'Error sending notification', type: 'error' });
    }
    setSending(false);
  };

  return (
    <div>
      <SectionHeader title="PUSH NOTIFICATIONS" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={css.card}>
          <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '16px', letterSpacing: '0.12em' }}>SEND TO ALL USERS</div>
          <Toast msg={status.text} type={status.type} />
          <FieldGroup label="Notification Title *">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. New Module Released!" />
          </FieldGroup>
          <FieldGroup label="Message *">
            <Textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="e.g. ICT 2025 Mentorship concepts are now live. Start learning!" rows={4} />
          </FieldGroup>
          <FieldGroup label="Link URL (optional)">
            <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="/courses or /blog/..." />
          </FieldGroup>
          <button onClick={send} disabled={sending} style={{ ...css.btn, width: '100%', padding: '14px' }}>
            {sending ? 'SENDING...' : '🔔 SEND PUSH NOTIFICATION'}
          </button>
        </div>

        {/* Preview */}
        <div>
          <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.6)`, marginBottom: '14px', letterSpacing: '0.12em' }}>PREVIEW</div>
          <div style={{ background: S3, borderRadius: '16px', padding: '16px', maxWidth: '320px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${G}20`, border: `1px solid ${BORDER2}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📈</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '3px' }}>{title || 'Notification Title'}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{msg || 'Your message will appear here...'}</div>
              </div>
            </div>
          </div>
          <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '14px', lineHeight: 1.6 }}>
            Powered by OneSignal. Sends to all users who have enabled browser push notifications on your site.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Data
  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [trades, setTrades] = useState(0);
  const [proUsers, setProUsers] = useState(0);

  const supabase = createClient();

  const loadData = useCallback(async () => {
    setLoading(true);
    const { data: usersData } = await supabase.from('profiles').select('*').order('xp', { ascending: false }).limit(200);
    const { data: emailsData } = await supabase.from('email_signups').select('*').order('created_at', { ascending: false });
    const { count } = await supabase.from('trades').select('*', { count: 'exact', head: true });
    if (usersData) { setUsers(usersData); setProUsers(usersData.filter(u => u.is_pro).length); }
    if (emailsData) setEmails(emailsData);
    if (count !== null) setTrades(count);
    setLoading(false);
  }, [supabase]);

  const login = () => {
    if (pass === ADMIN_PASSWORD) { setAuthed(true); loadData(); }
    else { setError('Incorrect password'); }
  };

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input, textarea, select { outline: none; color: white; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input[type=checkbox] { accent-color: ${G}; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.2); border-radius: 2px; }
      `}</style>

      {/* BG grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${BORDER} 1px, transparent 1px), linear-gradient(90deg, ${BORDER} 1px, transparent 1px)`, backgroundSize: '60px 60px', opacity: 0.4 }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(212,168,67,0.04) 0%, transparent 70%)` }} />

      <div style={{ ...css.card, width: '100%', maxWidth: '380px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <img src="/ictflow-symbol.svg" alt="ICT Flow" style={{ width: "52px", height: "52px", borderRadius: "14px", margin: "0 auto 18px", display: "block" }} />
        <div style={{ ...css.bebas, fontSize: '30px', color: 'white', marginBottom: '4px', letterSpacing: '0.04em' }}>ADMIN CONSOLE</div>
        <div style={{ ...css.mono, fontSize: '10px', color: `rgba(212,168,67,0.5)`, marginBottom: '24px', letterSpacing: '0.15em' }}>ICT FLOW — RESTRICTED ACCESS</div>

        <input type="password" placeholder="Enter admin password" value={pass}
          onChange={e => { setPass(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ ...css.input, marginBottom: '12px', textAlign: 'center', letterSpacing: '0.2em' }} />
        {error && <div style={{ ...css.mono, fontSize: '11px', color: '#F87171', marginBottom: '12px' }}>{error}</div>}
        <button onClick={login} style={{ ...css.btn, width: '100%', padding: '13px', fontSize: '12px' }}>
          UNLOCK DASHBOARD
        </button>
      </div>
    </div>
  );

  const activeTabConfig = TABS.find(t => t.id === activeTab);

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'white', fontFamily: 'DM Sans, sans-serif', display: 'flex' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input, textarea, select { outline: none; color: white; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input[type=checkbox] { accent-color: ${G}; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.2); border-radius: 2px; }
        select option { background: #111118; }
        button:hover { opacity: 0.88; }
        a:hover { opacity: 0.8; }
      `}</style>

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <div style={{
        width: sidebarCollapsed ? '60px' : '220px',
        flexShrink: 0, background: S1,
        borderRight: `1px solid ${BORDER}`,
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        transition: 'width 0.2s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: sidebarCollapsed ? '18px 10px' : '20px 18px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/ictflow-symbol.svg" alt="ICT Flow" style={{ width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0 }} />
          {!sidebarCollapsed && (
            <div>
              <div style={{ ...css.bebas, fontSize: '16px', color: 'white', lineHeight: 1, letterSpacing: '0.04em' }}>ICT FLOW</div>
              <div style={{ ...css.mono, fontSize: '8px', color: `rgba(212,168,67,0.5)`, letterSpacing: '0.1em' }}>ADMIN</div>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
          {GROUPS.map(group => (
            <div key={group.id} style={{ marginBottom: '8px' }}>
              {!sidebarCollapsed && (
                <div style={{ ...css.mono, fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', padding: '6px 8px 4px', textTransform: 'uppercase' }}>{group.label}</div>
              )}
              {TABS.filter(t => t.group === group.id).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                    padding: sidebarCollapsed ? '10px' : '9px 10px',
                    borderRadius: '8px', border: 'none',
                    background: activeTab === tab.id ? `${G}18` : 'transparent',
                    color: activeTab === tab.id ? G : 'rgba(255,255,255,0.45)',
                    cursor: 'pointer', marginBottom: '2px',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    borderLeft: activeTab === tab.id ? `2px solid ${G}` : '2px solid transparent',
                  }}>
                  <span style={{ fontSize: '15px', flexShrink: 0 }}>{tab.label.split(' ')[0]}</span>
                  {!sidebarCollapsed && (
                    <span style={{ ...css.mono, fontSize: '10px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                      {tab.label.split(' ').slice(1).join(' ')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ padding: '12px 8px', borderTop: `1px solid ${BORDER}` }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 10px', borderRadius: '8px',
            color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '13px',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          }}>
            <span>🌐</span>
            {!sidebarCollapsed && <span style={{ ...css.mono, fontSize: '10px' }}>VIEW SITE ↗</span>}
          </a>
          <button onClick={() => setAuthed(false)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 10px', borderRadius: '8px', border: 'none',
            background: 'transparent', color: 'rgba(248,113,113,0.5)', cursor: 'pointer',
            justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
          }}>
            <span>🚪</span>
            {!sidebarCollapsed && <span style={{ ...css.mono, fontSize: '10px' }}>LOGOUT</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px 36px', maxWidth: '1200px' }}>

        {activeTab === 'dashboard' && <DashboardSection users={users} emails={emails} trades={trades} proUsers={proUsers} loading={loading} onRefresh={loadData} />}
        {activeTab === 'users' && <UsersSection users={users} supabase={supabase} onReload={loadData} />}
        {activeTab === 'blog' && <BlogSection supabase={supabase} />}
        {activeTab === 'courses' && <CoursesSection supabase={supabase} />}
        {activeTab === 'pages' && <PagesSection />}
        {activeTab === 'banners' && <BannersSection supabase={supabase} />}
        {activeTab === 'media' && <MediaSection />}
        {activeTab === 'categories' && <CategoriesSection supabase={supabase} />}
        {activeTab === 'pricing' && <PricingSection supabase={supabase} />}
        {activeTab === 'seo' && <SEOSection supabase={supabase} />}
        {activeTab === 'nav' && <NavSection />}
        {activeTab === 'notifications' && <NotificationsSection />}
      </div>
    </div>
  );
}
