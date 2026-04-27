'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase';

const ADMIN_PASSWORD = 'sma_admin_2026';

const G = '#E8C547';
const G2 = '#F0C96A';
const BG = '#060608';
const S1 = '#0C0C10';
const S2 = '#111118';
const S3 = '#16161E';
const BORDER = 'rgba(232,197,71,0.18)';
const BORDER2 = 'rgba(232,197,71,0.5)';

const css = {
  card: { background: S2, border: `1px solid ${BORDER}`, borderRadius: '12px', padding: '20px' },
  mono: { fontFamily: "'DM Mono', monospace", letterSpacing: '0.06em' },
  bebas: { fontFamily: "'Bebas Neue', sans-serif" },
  input: {
    width: '100%', background: S1, border: `1px solid ${BORDER2}`,
    borderRadius: '8px', padding: '10px 14px', color: 'white',
    fontFamily: "'DM Sans', sans-serif", fontSize: '14px',
    boxSizing: 'border-box', outline: 'none',
  },
  btn: {
    background: `linear-gradient(135deg, ${G}, ${G2})`, color: '#080808',
    border: 'none', borderRadius: '8px', padding: '10px 22px',
    fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 700,
    cursor: 'pointer', letterSpacing: '0.08em',
  },
  btnGhost: {
    background: 'transparent', border: `1px solid ${BORDER2}`,
    borderRadius: '8px', padding: '10px 18px', color: 'rgba(255,255,255,0.85)',
    fontFamily: "'DM Mono', monospace", fontSize: '11px', cursor: 'pointer',
    letterSpacing: '0.06em',
  },
  btnDanger: {
    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)',
    borderRadius: '8px', padding: '7px 14px', color: '#F87171',
    fontFamily: "'DM Mono', monospace", fontSize: '10px', cursor: 'pointer',
  },
  label: {
    fontFamily: "'DM Mono', monospace", fontSize: '10px',
    color: 'rgba(232,197,71,0.85)', marginBottom: '6px',
    letterSpacing: '0.12em', display: 'block', textTransform: 'uppercase',
  },
};

// ─── STATIC DATA ──────────────────────────────────────────────────────────────
const ALL_MODULES = [
  { id: 1,  module: '01', title: 'Market Structure',               level: 'Beginner',     tag: 'ICT',      lessons: 6,  duration: '48 min', emoji: '📊' },
  { id: 2,  module: '02', title: 'Liquidity Concepts',             level: 'Beginner',     tag: 'ICT',      lessons: 5,  duration: '45 min', emoji: '💧' },
  { id: 3,  module: '03', title: 'Fair Value Gaps (FVG)',          level: 'Beginner',     tag: 'ICT & SMC',lessons: 5,  duration: '42 min', emoji: '🎯' },
  { id: 4,  module: '04', title: 'Order Blocks',                   level: 'Intermediate', tag: 'ICT',      lessons: 6,  duration: '52 min', emoji: '🧱' },
  { id: 5,  module: '05', title: 'Killzones & Macros',             level: 'Intermediate', tag: 'ICT',      lessons: 4,  duration: '38 min', emoji: '⏰' },
  { id: 6,  module: '06', title: 'Power of Three (AMD)',           level: 'Intermediate', tag: 'ICT',      lessons: 5,  duration: '44 min', emoji: '🔱' },
  { id: 7,  module: '07', title: 'Premium & Discount',             level: 'Intermediate', tag: 'ICT',      lessons: 4,  duration: '36 min', emoji: '📐' },
  { id: 8,  module: '08', title: 'ICT Entry Models',               level: 'Intermediate', tag: 'ICT',      lessons: 7,  duration: '60 min', emoji: '🎲' },
  { id: 9,  module: '09', title: 'Market Maker Models',            level: 'Advanced',     tag: 'ICT',      lessons: 5,  duration: '55 min', emoji: '🏦' },
  { id: 10, module: '10', title: 'SMT Divergence',                 level: 'Advanced',     tag: 'ICT',      lessons: 4,  duration: '40 min', emoji: '🔀' },
  { id: 11, module: '11', title: 'IPDA & CRT',                     level: 'Advanced',     tag: 'ICT',      lessons: 5,  duration: '50 min', emoji: '🤖' },
  { id: 12, module: '12', title: 'ICT 2024 Mentorship',            level: 'Advanced',     tag: '2024',     lessons: 8,  duration: '75 min', emoji: '🆕' },
  { id: 13, module: '13', title: 'SMC — Smart Money Concepts',     level: 'Beginner',     tag: 'SMC',      lessons: 6,  duration: '50 min', emoji: '💼' },
  { id: 14, module: '14', title: 'Top-Down Analysis',              level: 'Intermediate', tag: 'ICT',      lessons: 5,  duration: '42 min', emoji: '🔭' },
  { id: 15, module: '15', title: 'Daily Bias Framework',           level: 'Intermediate', tag: 'ICT',      lessons: 6,  duration: '48 min', emoji: '🧭' },
  { id: 16, module: '16', title: 'Draw on Liquidity',              level: 'Intermediate', tag: 'ICT',      lessons: 5,  duration: '44 min', emoji: '🎯' },
  { id: 17, module: '17', title: 'Dealing Ranges & PD Arrays',     level: 'Intermediate', tag: 'ICT',      lessons: 5,  duration: '46 min', emoji: '📐' },
  { id: 18, module: '18', title: 'Institutional Order Flow',       level: 'Advanced',     tag: 'ICT',      lessons: 7,  duration: '62 min', emoji: '🏦' },
  { id: 19, module: '19', title: 'Session Timing & Market Hours',  level: 'Beginner',     tag: 'ICT',      lessons: 5,  duration: '40 min', emoji: '⏰' },
  { id: 20, module: '20', title: 'Narrative Building',             level: 'Advanced',     tag: 'ICT',      lessons: 6,  duration: '55 min', emoji: '📖' },
  { id: 21, module: '21', title: 'Quarterly Theory & Seasonal',    level: 'Advanced',     tag: 'ICT',      lessons: 5,  duration: '50 min', emoji: '📅' },
  { id: 22, module: '22', title: 'Liquidity Voids & Gaps',         level: 'Intermediate', tag: 'ICT',      lessons: 5,  duration: '44 min', emoji: '🕳️' },
  { id: 23, module: '23', title: 'Time & Price Theory',            level: 'Advanced',     tag: 'ICT',      lessons: 5,  duration: '48 min', emoji: '⌚' },
  { id: 24, module: '24', title: 'Turtle Soup & Stop Hunts',       level: 'Intermediate', tag: 'ICT',      lessons: 5,  duration: '44 min', emoji: '🐢' },
  { id: 25, module: '25', title: 'Judas Swing & AMD Deep Dive',    level: 'Advanced',     tag: 'ICT',      lessons: 6,  duration: '56 min', emoji: '⚡' },
  { id: 26, module: '26', title: 'Balanced Price Range (BPR)',     level: 'Advanced',     tag: 'ICT',      lessons: 5,  duration: '48 min', emoji: '⚖️' },
  { id: 27, module: '27', title: 'Execution & Trade Management',   level: 'Advanced',     tag: 'ICT',      lessons: 6,  duration: '58 min', emoji: '🎯' },
  { id: 28, module: '28', title: 'Backtesting & Model Development',level: 'Advanced',     tag: 'ICT',      lessons: 5,  duration: '50 min', emoji: '🔬' },
  // Extended Lessons
  { id: 29,  module: '29', title: 'Risk Management Fundamentals',            level: 'Beginner',     tag: 'ICT',         lessons: 5, duration: '40 min', emoji: '🛡️' },
  { id: 30,  module: '30', title: 'Advanced Risk Management & Position Sizing', level: 'Advanced',  tag: 'ICT',         lessons: 5, duration: '48 min', emoji: '⚖️' },
  { id: 101, module: 'F1', title: 'Risk Management Fundamentals (Foundations)', level: 'Beginner',  tag: 'Foundations', lessons: 5, duration: '35 min', emoji: '🛡️' },
  { id: 102, module: 'F2', title: 'Advanced Position Sizing & Portfolio Heat',  level: 'Intermediate', tag: 'Foundations', lessons: 5, duration: '40 min', emoji: '📐' },
  { id: 103, module: 'F3', title: 'The Psychology of Risk',                    level: 'Intermediate', tag: 'Foundations', lessons: 5, duration: '38 min', emoji: '🧠' },
  { id: 201, module: 'A1', title: 'ICT for NAS100 & US30: Index Trading',      level: 'Intermediate', tag: 'Indices',     lessons: 5, duration: '44 min', emoji: '📈' },
  { id: 202, module: 'A2', title: 'ICT for Gold (XAU/USD): Safe Haven Trading',level: 'Intermediate', tag: 'Gold',        lessons: 5, duration: '40 min', emoji: '🥇' },
  { id: 301, module: 'C1', title: 'ICT for Crypto: Bitcoin & Ethereum',        level: 'Intermediate', tag: 'Crypto',      lessons: 5, duration: '42 min', emoji: '₿'  },
];

const NAV_PAGES = [
  { href: '/',            label: 'Home',              desc: 'Landing page' },
  { href: '/courses',     label: 'Courses',           desc: '28 modules listing' },
  { href: '/glossary',    label: 'Glossary',          desc: 'ICT/SMC terms (75+)' },
  { href: '/practice',    label: 'Practice',          desc: 'Quiz practice questions' },
  { href: '/strategies',  label: 'Strategies',        desc: 'ICT strategy breakdowns' },
  { href: '/mentorship',  label: 'Mentorship',        desc: '2022 ICT Mentorship sessions' },
  { href: '/blog',        label: 'Blog',              desc: 'SEO blog posts' },
  { href: '/pricing',     label: 'Pricing',           desc: 'Free vs Pro plans' },
  { href: '/about',       label: 'About',             desc: 'About the platform' },
  { href: '/resources',   label: 'Resources',         desc: 'External trading resources' },
  { href: '/journal',     label: 'Journal',           desc: 'Trade journal (Free for all users)' },
  { href: '/dashboard',   label: 'Dashboard',         desc: 'User progress dashboard' },
  { href: '/leaderboard', label: 'Leaderboard',       desc: 'Community XP leaderboard' },
  { href: '/certificate', label: 'Certificate',       desc: 'Completion certificate' },
  { href: '/foundations', label: 'Foundations',       desc: 'Trading foundations intro' },
  { href: '/auth',        label: 'Auth',              desc: 'Login / signup page' },
];

// ─── SIDEBAR TABS ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'dashboard',     label: 'Dashboard',       icon: '📊', group: 'overview' },
  { id: 'users',         label: 'Users',           icon: '👥', group: 'overview' },
  { id: 'analytics',     label: 'Analytics',       icon: '📈', group: 'overview' },
  { id: 'blog',          label: 'Blog',            icon: '📝', group: 'content' },
  { id: 'courses',       label: 'Modules',         icon: '🎓', group: 'content' },
  { id: 'pages',         label: 'Pages',           icon: '📄', group: 'content' },
  { id: 'media',         label: 'Media',           icon: '🖼️', group: 'content' },
  { id: 'banners',       label: 'Banners',         icon: '📢', group: 'content' },
  { id: 'notifications', label: 'Push Notify',     icon: '🔔', group: 'content' },
  { id: 'seo',           label: 'SEO',             icon: '🔍', group: 'settings' },
  { id: 'pricing',       label: 'Pricing',         icon: '💰', group: 'settings' },
  { id: 'nav',           label: 'Navigation',      icon: '🗺️', group: 'settings' },
  { id: 'journal',       label: 'Journal Settings',icon: '📓', group: 'settings' },
];

const GROUPS = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'content',  label: 'CONTENT' },
  { id: 'settings', label: 'SETTINGS' },
];

// ─── SMALL REUSABLE COMPONENTS ────────────────────────────────────────────────
const Badge = ({ color = G, children }) => (
  <span style={{
    background: `${color}18`, border: `1px solid ${color}30`,
    color, borderRadius: '5px', padding: '2px 8px',
    fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.06em',
  }}>{children}</span>
);

const StatCard = ({ icon, value, label, sub }) => (
  <div style={{ ...css.card, textAlign: 'center' }}>
    <div style={{ fontSize: '22px', marginBottom: '8px' }}>{icon}</div>
    <div style={{ ...css.bebas, fontSize: '38px', color: G, lineHeight: 1 }}>{value}</div>
    <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginTop: '6px' }}>{label}</div>
    {sub && <div style={{ ...css.mono, fontSize: '9px', color: 'rgba(232,197,71,0.7)', marginTop: '4px' }}>{sub}</div>}
  </div>
);

const FieldGroup = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={css.label}>{label}</label>
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, type = 'text', style = {}, onKeyDown }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder}
    onKeyDown={onKeyDown} style={{ ...css.input, ...style }} />
);

const Textarea = ({ value, onChange, placeholder, rows = 5, style = {} }) => (
  <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
    style={{ ...css.input, resize: 'vertical', lineHeight: 1.6, ...style }} />
);

const Select = ({ value, onChange, options, style = {} }) => (
  <select value={value} onChange={onChange} style={{ ...css.input, ...style }}>
    {options.map(o => typeof o === 'string'
      ? <option key={o} value={o}>{o}</option>
      : <option key={o.value} value={o.value}>{o.label}</option>)}
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
    fontFamily: "'DM Mono', monospace", fontSize: '12px',
  }}>{msg}</div>
) : null;

const InfoBox = ({ children }) => (
  <div style={{ ...css.card, padding: '14px 18px', marginBottom: '16px', background: 'rgba(232,197,71,0.04)', border: `1px solid rgba(232,197,71,0.12)` }}>
    <div style={{ ...css.mono, fontSize: '11px', color: '#E8C547', lineHeight: 1.6 }}>{children}</div>
  </div>
);

// ─── DASHBOARD SECTION ────────────────────────────────────────────────────────
function DashboardSection({ users, emails, trades, proUsers, loading, onRefresh }) {
  const topUsers = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 8);
  const recentEmails = [...emails].slice(0, 6);
  const totalLessons = ALL_MODULES.reduce((a, m) => a + m.lessons, 0);

  return (
    <div>
      <SectionHeader title="SITE OVERVIEW" action={
        <button onClick={onRefresh} style={css.btnGhost}>↻ Refresh</button>
      } />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', ...css.mono, fontSize: '12px', color: 'rgba(232,197,71,0.7)' }}>LOADING DATA...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
            <StatCard icon="👥" value={users.length}  label="Total Users"   sub={`${proUsers} Pro`} />
            <StatCard icon="💰" value={proUsers}       label="Pro Members"   sub={`~$${proUsers * 19}/mo`} />
            <StatCard icon="📧" value={emails.length}  label="Email Leads" />
            <StatCard icon="📊" value={trades}         label="Trade Logs" />
            <StatCard icon="🎓" value={ALL_MODULES.length} label="Modules"  sub={`${totalLessons} lessons`} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={css.card}>
              <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.15em' }}>// TOP USERS BY XP</div>
              {topUsers.length === 0 ? (
                <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px' }}>No users yet</div>
              ) : topUsers.map((u, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.5)', width: '18px' }}>#{i + 1}</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{u.username || u.email?.split('@')[0] || '—'}</div>
                  <div style={{ ...css.mono, fontSize: '11px', color: G }}>{u.xp || 0} XP</div>
                  <Badge color={u.is_pro ? '#34D399' : '#666'}>{u.is_pro ? 'PRO' : 'FREE'}</Badge>
                </div>
              ))}
            </div>

            <div style={css.card}>
              <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.15em' }}>// RECENT EMAIL LEADS</div>
              {recentEmails.length === 0 ? (
                <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px' }}>No email signups yet</div>
              ) : recentEmails.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: '16px' }}>📧</div>
                  <div style={{ flex: 1, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.email}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...css.card }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.15em' }}>// QUICK LINKS — LIVE SITE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['/', '/courses', '/blog', '/pricing', '/glossary', '/practice', '/leaderboard', '/dashboard', '/lesson/1', '/lesson/15', '/lesson/28'].map(href => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ ...css.mono, fontSize: '11px', color: G, background: `${G}10`, border: `1px solid ${BORDER2}`, borderRadius: '6px', padding: '6px 12px', textDecoration: 'none' }}>
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

// ─── USERS SECTION ────────────────────────────────────────────────────────────
function UsersSection({ users, supabase, onReload }) {
  const [search, setSearch] = useState('');
  const [filterPro, setFilterPro] = useState('all');
  const [msg, setMsg] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || (u.username || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
    const matchPro = filterPro === 'all' || (filterPro === 'pro' ? u.is_pro : !u.is_pro);
    return matchSearch && matchPro;
  });

  const togglePro = async (u) => {
    await supabase.from('profiles').update({ is_pro: !u.is_pro }).eq('id', u.id);
    setMsg(`${u.username || 'User'} → ${!u.is_pro ? 'Pro' : 'Free'}`);
    onReload();
    setTimeout(() => setMsg(''), 3000);
  };

  const resetXP = async (u) => {
    if (!confirm(`Reset XP for ${u.username || u.email}?`)) return;
    await supabase.from('profiles').update({ xp: 0, streak: 0 }).eq('id', u.id);
    setMsg(`XP reset for ${u.username || u.email}`);
    onReload();
    setTimeout(() => setMsg(''), 3000);
  };

  const deleteUser = async (u) => {
    if (!confirm(`Delete user ${u.username || u.email}? Cannot be undone.`)) return;
    await supabase.from('profiles').delete().eq('id', u.id);
    onReload();
  };

  return (
    <div>
      <SectionHeader title={`USERS (${users.length})`} />
      <Toast msg={msg} />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by username or email..." style={{ flex: 1 }} />
        <Select value={filterPro} onChange={e => setFilterPro(e.target.value)}
          options={[{ value: 'all', label: 'All Users' }, { value: 'pro', label: 'Pro Only' }, { value: 'free', label: 'Free Only' }]}
          style={{ width: '160px' }} />
      </div>

      <div style={css.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Username', 'Email', 'XP', 'Streak', 'Plan', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ ...css.mono, fontSize: '9px', color: 'rgba(232,197,71,0.7)', padding: '8px 12px', textAlign: 'left', borderBottom: `1px solid ${BORDER}`, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={i} style={{ borderBottom: `1px solid rgba(255,255,255,0.03)` }}>
                  <td style={{ padding: '10px 12px', fontSize: '13px', fontWeight: 500 }}>{u.username || '—'}</td>
                  <td style={{ padding: '10px 12px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{u.email || '—'}</td>
                  <td style={{ padding: '10px 12px', color: G, ...css.mono, fontSize: '12px' }}>{u.xp || 0}</td>
                  <td style={{ padding: '10px 12px', fontSize: '13px' }}>{u.streak || 0}🔥</td>
                  <td style={{ padding: '10px 12px' }}>
                    <button onClick={() => togglePro(u)} style={{
                      background: u.is_pro ? 'rgba(52,211,153,0.1)' : 'rgba(232,197,71,0.08)',
                      border: `1px solid ${u.is_pro ? 'rgba(52,211,153,0.3)' : BORDER2}`,
                      borderRadius: '5px', padding: '3px 10px',
                      color: u.is_pro ? '#34D399' : G,
                      ...css.mono, fontSize: '10px', cursor: 'pointer',
                    }}>{u.is_pro ? '✓ PRO' : 'FREE'}</button>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                  <td style={{ padding: '10px 12px', display: 'flex', gap: '6px' }}>
                    <button onClick={() => resetXP(u)} style={{ ...css.btnGhost, padding: '5px 10px', fontSize: '10px' }}>RESET XP</button>
                    <button onClick={() => deleteUser(u)} style={css.btnDanger}>DEL</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>No users found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYTICS SECTION ───────────────────────────────────────────────────────
function AnalyticsSection({ users, emails }) {
  const proCount = users.filter(u => u.is_pro).length;
  const freeCount = users.length - proCount;
  const convRate = users.length > 0 ? ((proCount / users.length) * 100).toFixed(1) : 0;
  const totalXP = users.reduce((a, u) => a + (u.xp || 0), 0);
  const avgXP = users.length > 0 ? Math.round(totalXP / users.length) : 0;
  const activeStreaks = users.filter(u => (u.streak || 0) >= 3).length;

  const levelCounts = ['Beginner', 'Intermediate', 'Advanced', 'SMC'].map(l => ({
    level: l, count: ALL_MODULES.filter(m => m.level === l).length,
  }));

  return (
    <div>
      <SectionHeader title="ANALYTICS" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
        <StatCard icon="📈" value={`${convRate}%`} label="Conversion Rate" sub="Free → Pro" />
        <StatCard icon="⚡" value={avgXP}           label="Avg XP / User" />
        <StatCard icon="🔥" value={activeStreaks}    label="Active Streaks" sub="3+ day streak" />
        <StatCard icon="💵" value={`$${proCount * 19}`} label="Est. Monthly Rev" sub="at $19/mo" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div style={css.card}>
          <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>USER BREAKDOWN</div>
          {[{ label: 'Pro Members', count: proCount, color: '#34D399' }, { label: 'Free Members', count: freeCount, color: G }].map(r => (
            <div key={r.label} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px' }}>{r.label}</span>
                <span style={{ ...css.mono, fontSize: '12px', color: r.color }}>{r.count}</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${users.length > 0 ? (r.count / users.length * 100) : 0}%`, background: r.color, borderRadius: '99px', transition: 'width 1s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <div style={css.card}>
          <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>MODULES BY LEVEL</div>
          {levelCounts.map(({ level, count }) => (
            <div key={level} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: '13px' }}>{level}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ ...css.mono, fontSize: '11px', color: G }}>{count} modules</div>
              </div>
            </div>
          ))}
        </div>

        <div style={css.card}>
          <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>CONTENT STATS</div>
          {[
            { label: 'Total Modules', value: ALL_MODULES.length },
            { label: 'Total Lessons', value: ALL_MODULES.reduce((a, m) => a + m.lessons, 0) },
            { label: 'Email Leads', value: emails.length },
            { label: 'Total Users', value: users.length },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: '13px' }}>{label}</span>
              <span style={{ ...css.mono, fontSize: '12px', color: G }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BLOG SECTION ─────────────────────────────────────────────────────────────
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
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const date = form.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const { error } = await supabase.from('blog_posts').upsert({ ...form, slug, date }, { onConflict: 'slug' });
    if (error) setMsg({ text: 'Error: ' + error.message, type: 'error' });
    else { setMsg({ text: '✓ Post saved!', type: 'success' }); load(); setView('list'); setForm(EMPTY_POST); setEditId(null); }
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
        <button onClick={() => { setView('list'); setForm(EMPTY_POST); setEditId(null); }} style={css.btnGhost}>← Back</button>
        <div style={{ ...css.bebas, fontSize: '26px', color: 'white' }}>{editId ? 'EDIT POST' : 'NEW POST'}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div>
          <FieldGroup label="Title *">
            <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: editId ? form.slug : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })} placeholder="Post title..." />
          </FieldGroup>
          <FieldGroup label="Slug (URL)">
            <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="post-url-slug" style={{ ...css.mono, fontSize: '12px' }} />
          </FieldGroup>
          <FieldGroup label="Description (shown in blog list + Google)">
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief description..." rows={2} />
          </FieldGroup>
          <FieldGroup label="Content *">
            <Textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write your full blog post here..." rows={22} />
          </FieldGroup>
        </div>

        <div>
          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>PUBLISH SETTINGS</div>
            <FieldGroup label="Status">
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Published', 'Draft'].map(s => (
                  <button key={s} onClick={() => setForm({ ...form, published: s === 'Published' })}
                    style={{ flex: 1, padding: '8px', borderRadius: '7px', cursor: 'pointer',
                      background: (s === 'Published') === form.published ? `${G}18` : 'transparent',
                      border: `1px solid ${(s === 'Published') === form.published ? G : BORDER2}`,
                      color: (s === 'Published') === form.published ? G : 'rgba(255,255,255,0.6)',
                      ...css.mono, fontSize: '11px' }}>{s}</button>
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
            <FieldGroup label="Sort Order (lower = first)">
              <Input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} />
            </FieldGroup>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginTop: '4px' }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>Featured post</span>
            </label>
          </div>

          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>COVER IMAGE</div>
            <FieldGroup label="Image URL">
              <Input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="/images/fvg.png or https://..." />
            </FieldGroup>
            {form.image && <img src={form.image} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} onError={e => e.target.style.display = 'none'} />}
          </div>

          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>SEO META</div>
            <FieldGroup label="Meta Title (blank = post title)">
              <Input value={form.meta_title || ''} onChange={e => setForm({ ...form, meta_title: e.target.value })} placeholder="Custom SEO title..." />
            </FieldGroup>
            <FieldGroup label="Meta Description (blank = description)">
              <Textarea value={form.meta_desc || ''} onChange={e => setForm({ ...form, meta_desc: e.target.value })} rows={2} />
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
        <button onClick={() => { setForm(EMPTY_POST); setEditId(null); setView('edit'); }} style={css.btn}>+ NEW POST</button>
      } />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{ flex: 1 }} />
        <Select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          options={CATS.map(c => ({ value: c, label: c === 'all' ? 'All Categories' : c }))}
          style={{ width: '180px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div style={{ ...css.card, textAlign: 'center', padding: '50px', ...css.mono, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
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
              <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(232,197,71,0.6)' }}>{p.category} · {p.read_time} · /{p.slug}</div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
              <button onClick={() => togglePub(p)} style={{
                background: p.published ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${p.published ? 'rgba(52,211,153,0.3)' : BORDER}`,
                borderRadius: '6px', padding: '5px 12px',
                color: p.published ? '#34D399' : 'rgba(255,255,255,0.4)',
                ...css.mono, fontSize: '10px', cursor: 'pointer',
              }}>{p.published ? '● LIVE' : '○ DRAFT'}</button>
              <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, padding: '6px 12px', fontSize: '10px', textDecoration: 'none' }}>VIEW ↗</a>
              <button onClick={() => edit(p)} style={{ ...css.btn, padding: '6px 14px', fontSize: '10px' }}>EDIT</button>
              <button onClick={() => del(p.slug)} style={css.btnDanger}>DEL</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MODULES SECTION ──────────────────────────────────────────────────────────
function CoursesSection() {
  const [modules, setModules] = useState(ALL_MODULES.map(m => ({ ...m, locked: m.id > 3, comingSoon: false })));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');

  const filtered = filterLevel === 'all' ? modules : modules.filter(m => m.level === filterLevel);

  const save = () => {
    setModules(prev => prev.map(m => m.id === editing ? { ...m, ...form } : m));
    setEditing(null);
    setMsg('✓ Updated locally. These changes are for preview only — to persist, update your source files.');
    setTimeout(() => setMsg(''), 6000);
  };

  return (
    <div>
      <SectionHeader title={`COURSE MODULES (${modules.length})`} />
      <InfoBox>ℹ️ Module data is defined in your source files. Changes here are local preview only. To persist: update <code>app/dashboard/page.js</code>, <code>app/courses/page.js</code>, and <code>app/lesson/[id]/layout.js</code>.</InfoBox>
      <Toast msg={msg} />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Select value={filterLevel} onChange={e => setFilterLevel(e.target.value)}
          options={[{ value: 'all', label: 'All Levels' }, 'Beginner', 'Intermediate', 'Advanced', 'SMC'].map(v => typeof v === 'string' ? { value: v, label: v } : v)}
          style={{ width: '180px' }} />
        <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center' }}>
          {filtered.length} modules · {filtered.reduce((a, m) => a + m.lessons, 0)} lessons
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(m => (
          <div key={m.id}>
            {editing === m.id ? (
              <div style={{ ...css.card, border: `1px solid ${BORDER2}` }}>
                <div style={{ ...css.bebas, fontSize: '18px', color: G, marginBottom: '16px' }}>EDITING: {m.title}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <FieldGroup label="Title"><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Level">
                    <Select value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} options={['Beginner', 'Intermediate', 'Advanced', 'SMC']} />
                  </FieldGroup>
                  <FieldGroup label="Tag">
                    <Select value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} options={['ICT', 'ICT & SMC', 'SMC', '2024']} />
                  </FieldGroup>
                  <FieldGroup label="Lessons"><Input type="number" value={form.lessons} onChange={e => setForm({ ...form, lessons: parseInt(e.target.value) || 0 })} /></FieldGroup>
                  <FieldGroup label="Duration"><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="48 min" /></FieldGroup>
                  <FieldGroup label="Emoji"><Input value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} /></FieldGroup>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.locked} onChange={e => setForm({ ...form, locked: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>Pro locked</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.comingSoon} onChange={e => setForm({ ...form, comingSoon: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>Coming soon</span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={save} style={css.btn}>💾 SAVE</button>
                  <button onClick={() => setEditing(null)} style={css.btnGhost}>CANCEL</button>
                </div>
              </div>
            ) : (
              <div style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px' }}>
                <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(232,197,71,0.5)', width: '28px', flexShrink: 0 }}>{m.module}</div>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `${G}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{m.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{m.title}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>{m.lessons} lessons · {m.duration} · {m.tag}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Badge color={m.level === 'Beginner' ? '#34D399' : m.level === 'Intermediate' ? G : '#F87171'}>{m.level}</Badge>
                  {m.locked && <Badge color="#F87171">PRO</Badge>}
                  {m.comingSoon && <Badge color="rgba(255,255,255,0.5)">SOON</Badge>}
                  <a href={`/lesson/${m.id}`} target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, padding: '5px 10px', fontSize: '10px', textDecoration: 'none' }}>VIEW ↗</a>
                  <button onClick={() => { setEditing(m.id); setForm({ ...m }); }} style={{ ...css.btn, padding: '5px 12px', fontSize: '10px' }}>EDIT</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGES SECTION ────────────────────────────────────────────────────────────
function PagesSection() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <SectionHeader title="SITE PAGES" />
      <InfoBox>ℹ️ All pages are Next.js files in the <code>app/</code> directory. Click VIEW to open the live page. Edit the file in your code editor and push to GitHub to update.</InfoBox>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {NAV_PAGES.map(p => (
          <div key={p.href} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', cursor: 'pointer', border: selected === p.href ? `1px solid ${G}` : `1px solid ${BORDER}` }}
            onClick={() => setSelected(selected === p.href ? null : p.href)}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{p.label}</div>
              <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(232,197,71,0.6)' }}>{p.href}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '3px' }}>{p.desc}</div>
            </div>
            <a href={p.href} target="_blank" rel="noopener noreferrer"
              style={{ ...css.btn, padding: '6px 12px', fontSize: '10px', textDecoration: 'none' }}
              onClick={e => e.stopPropagation()}>VIEW ↗</a>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{ ...css.card, marginTop: '16px', border: `1px solid ${G}` }}>
          <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '10px' }}>FILE LOCATION</div>
          <div style={{ background: S1, borderRadius: '8px', padding: '14px', ...css.mono, fontSize: '13px', color: G }}>
            app{selected === '/' ? '/page.js' : `${selected}/page.js`}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BANNERS SECTION ──────────────────────────────────────────────────────────
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
    if (!form.text) { setMsg({ text: 'Banner text required', type: 'error' }); return; }
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
            <Input value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} placeholder="e.g. 🎉 New modules released! Lessons 15-28 are now live." />
          </FieldGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <FieldGroup label="CTA Button Text">
              <Input value={form.cta_text} onChange={e => setForm({ ...form, cta_text: e.target.value })} placeholder="Start Learning" />
            </FieldGroup>
            <FieldGroup label="CTA Link">
              <Input value={form.cta_url} onChange={e => setForm({ ...form, cta_url: e.target.value })} placeholder="/courses" />
            </FieldGroup>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={save} disabled={saving} style={css.btn}>{saving ? 'SAVING...' : '+ CREATE BANNER'}</button>
            <button onClick={() => setShowForm(false)} style={css.btnGhost}>CANCEL</button>
          </div>
        </div>
      )}

      {banners.length === 0 ? (
        <div style={{ ...css.card, textAlign: 'center', padding: '50px', ...css.mono, fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
          No banners yet. Add a site-wide announcement, promo, or alert.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {banners.map(b => (
            <div key={b.id} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderLeft: `3px solid ${TYPE_COLORS[b.type] || G}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '3px' }}>{b.text}</div>
                <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
                  {b.type?.toUpperCase()} · Page: {b.page} {b.cta_text && `· CTA: "${b.cta_text}"`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => toggle(b)} style={{
                  background: b.active ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${b.active ? 'rgba(52,211,153,0.3)' : BORDER}`,
                  borderRadius: '6px', padding: '5px 12px',
                  color: b.active ? '#34D399' : 'rgba(255,255,255,0.4)',
                  ...css.mono, fontSize: '10px', cursor: 'pointer',
                }}>{b.active ? '● LIVE' : '○ OFF'}</button>
                <button onClick={() => del(b.id)} style={css.btnDanger}>DEL</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MEDIA SECTION ────────────────────────────────────────────────────────────
function MediaSection() {
  const IMAGES = [
    '/images/market-structure.png', '/images/liquidity.png', '/images/fvg.png',
    '/images/order-blocks.png', '/images/killzones.png', '/images/amd.png', '/images/premium-discount.png',
    '/modules images/Market structure.png', '/modules images/LIQUIDITY CONCEPTS.png',
    '/modules images/Fair Value Gaps (FVG).png', '/modules images/ORDER BLOCKS.png',
    '/modules images/AMD.png', '/modules images/Premium_and_discount.png',
    '/modules images/SMC.png', '/modules images/IPDA.png', '/modules images/SMT.png',
    '/modules images/Top down analysis.png', '/modules images/entry model.png',
    '/og-image.png', '/favicon.svg',
  ];
  const [copied, setCopied] = useState('');
  const copy = (url) => { navigator.clipboard.writeText(url); setCopied(url); setTimeout(() => setCopied(''), 2000); };

  return (
    <div>
      <SectionHeader title="MEDIA LIBRARY" />
      <InfoBox>ℹ️ Static images in your project. Click any image to copy its URL. To add new images, place them in <code>/public/images/</code> and push to GitHub.</InfoBox>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
        {IMAGES.map(img => (
          <div key={img} onClick={() => copy(img)}
            style={{ ...css.card, padding: '12px', cursor: 'pointer', border: copied === img ? `1px solid ${G}` : `1px solid ${BORDER}` }}>
            <div style={{ width: '100%', height: '70px', background: S3, borderRadius: '6px', overflow: 'hidden', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
            </div>
            <div style={{ ...css.mono, fontSize: '9px', color: copied === img ? G : 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {copied === img ? '✓ COPIED!' : img.split('/').pop()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEO SECTION ──────────────────────────────────────────────────────────────
function SEOSection({ supabase }) {
  const [form, setForm] = useState({
    site_name: 'ICT Flow',
    site_tagline: 'Master ICT & Smart Money Concepts',
    meta_description: 'The most comprehensive ICT & Smart Money Concepts learning platform. Master market structure, liquidity, FVGs, order blocks, and all ICT strategies.',
    keywords: 'ICT trading, smart money concepts, order blocks, fair value gap, liquidity, market structure, forex trading education',
    og_image: '/og-image.png',
    twitter_handle: '@riskfirsttrad',
    google_analytics: 'G-HRGZYFXQ5W',
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
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>GLOBAL META</div>
            <FieldGroup label="Site Name"><Input value={form.site_name} onChange={e => setForm({ ...form, site_name: e.target.value })} /></FieldGroup>
            <FieldGroup label="Tagline"><Input value={form.site_tagline} onChange={e => setForm({ ...form, site_tagline: e.target.value })} /></FieldGroup>
            <FieldGroup label="Default Meta Description"><Textarea value={form.meta_description} onChange={e => setForm({ ...form, meta_description: e.target.value })} rows={3} /></FieldGroup>
            <FieldGroup label="Keywords"><Textarea value={form.keywords} onChange={e => setForm({ ...form, keywords: e.target.value })} rows={2} /></FieldGroup>
            <FieldGroup label="Canonical URL"><Input value={form.canonical_url} onChange={e => setForm({ ...form, canonical_url: e.target.value })} /></FieldGroup>
          </div>
        </div>
        <div>
          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>SOCIAL & OG</div>
            <FieldGroup label="OG Image URL"><Input value={form.og_image} onChange={e => setForm({ ...form, og_image: e.target.value })} /></FieldGroup>
            <FieldGroup label="Twitter/X Handle"><Input value={form.twitter_handle} onChange={e => setForm({ ...form, twitter_handle: e.target.value })} /></FieldGroup>
          </div>
          <div style={{ ...css.card, marginBottom: '16px' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>ANALYTICS</div>
            <FieldGroup label="Google Analytics ID"><Input value={form.google_analytics} onChange={e => setForm({ ...form, google_analytics: e.target.value })} /></FieldGroup>
            <FieldGroup label="Google Site Verify"><Input value={form.google_site_verify} onChange={e => setForm({ ...form, google_site_verify: e.target.value })} /></FieldGroup>
          </div>
          <div style={{ ...css.card, marginBottom: '16px', background: 'rgba(52,211,153,0.04)' }}>
            <div style={{ ...css.mono, fontSize: '10px', color: '#34D399', marginBottom: '8px' }}>✓ Sitemap Status</div>
            <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>Dynamic sitemap active — auto-generates for all 28 lessons + pages</div>
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

// ─── PRICING SECTION ──────────────────────────────────────────────────────────
function PricingSection() {
  const [freeFeatures, setFreeFeatures] = useState(['Modules 1–3 (Market Structure, Liquidity, FVG)', 'ICT Glossary (75+ terms)', 'Basic practice questions', 'Trade Journal']);
  const [proFeatures, setProFeatures] = useState(['Everything in Free', 'All 28 modules unlocked', 'AI-generated daily challenges', 'Certificate of completion', 'Discord community access', 'Weekly market breakdown', 'Priority support', 'Early access to new modules', 'Cancel anytime']);
  const [monthlyPrice, setMonthlyPrice] = useState('19');
  const [annualPrice, setAnnualPrice] = useState('149');
  const [newFeature, setNewFeature] = useState('');
  const [addingTo, setAddingTo] = useState(null);
  const [msg, setMsg] = useState('');

  const addFeature = (plan) => {
    if (!newFeature.trim()) return;
    if (plan === 'free') setFreeFeatures(prev => [...prev, newFeature.trim()]);
    else setProFeatures(prev => [...prev, newFeature.trim()]);
    setNewFeature(''); setAddingTo(null);
    setMsg('✓ Added locally. Update pricing/page.js to persist.');
    setTimeout(() => setMsg(''), 4000);
  };

  const removeFeature = (plan, i) => {
    if (plan === 'free') setFreeFeatures(prev => prev.filter((_, idx) => idx !== i));
    else setProFeatures(prev => prev.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <SectionHeader title="PRICING" />
      <InfoBox>ℹ️ Pricing data lives in <code>app/pricing/page.js</code>. Stripe prices are configured in your Stripe dashboard.</InfoBox>
      <Toast msg={msg} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {[{ label: 'MONTHLY (USD)', value: monthlyPrice, set: setMonthlyPrice, color: G, suffix: '/month' },
          { label: 'ANNUAL (USD)', value: annualPrice, set: setAnnualPrice, color: '#34D399', suffix: '/year' }].map(p => (
          <div key={p.label} style={css.card}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>{p.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ fontSize: '24px', color: p.color, fontWeight: 700 }}>$</div>
              <Input value={p.value} onChange={e => p.set(e.target.value)} style={{ fontSize: '28px', fontWeight: 700, color: p.color, width: '120px' }} />
              <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{p.suffix}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {[{ plan: 'free', label: 'FREE PLAN', features: freeFeatures, color: '#60A5FA' },
          { plan: 'pro', label: 'PRO PLAN', features: proFeatures, color: G }].map(({ plan, label, features, color }) => (
          <div key={plan} style={css.card}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>{label} FEATURES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: S3, borderRadius: '7px' }}>
                  <div style={{ color, fontSize: '12px', flexShrink: 0 }}>✓</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{f}</div>
                  <button onClick={() => removeFeature(plan, i)} style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '14px' }}>×</button>
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

// ─── NAVIGATION SECTION ───────────────────────────────────────────────────────
function NavSection() {
  const MAIN = [['/', 'Home'], ['/foundations', 'Trading Foundations'], ['/courses', 'Courses'], ['/glossary', 'Glossary'], ['/dashboard', 'Dashboard']];
  const MORE = [['/mentorship', '2022 ICT Mentorship'], ['/practice', 'Practice'], ['/journal', 'Journal'], ['/leaderboard', 'Leaderboard'], ['/certificate', 'Certificate'], ['/resources', 'Resources'], ['/blog', 'Blog'], ['https://discord.gg/bh2YK6vF', 'Discord 💬'], ['/pricing', 'Pricing'], ['/about', 'About']];

  return (
    <div>
      <SectionHeader title="NAVIGATION" />
      <InfoBox>ℹ️ Nav is defined in <code>app/components/Navbar.js</code> (or similar). Edit that file to add, remove, or reorder items.</InfoBox>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {[{ label: 'MAIN NAV', items: MAIN }, { label: '"MORE" DROPDOWN', items: MORE }].map(group => (
          <div key={group.label} style={css.card}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>{group.label}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {group.items.map(([href, label], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: S3, borderRadius: '7px' }}>
                  <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(255,255,255,0.3)', width: '18px' }}>{i + 1}</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{label}</div>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ ...css.mono, fontSize: '10px', color: G, textDecoration: 'none' }}>{href} ↗</a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS SECTION ────────────────────────────────────────────────────
function NotificationsSection() {
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [url, setUrl] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ text: '', type: 'success' });

  const send = async () => {
    if (!title || !msg) { setStatus({ text: 'Title and message required', type: 'error' }); return; }
    setSending(true);
    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message: msg, url }),
      });
      const result = await response.json();
      if (!response.ok) setStatus({ text: 'Error: ' + JSON.stringify(result), type: 'error' });
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
          <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '16px', letterSpacing: '0.12em' }}>SEND TO ALL USERS</div>
          <Toast msg={status.text} type={status.type} />
          <FieldGroup label="Title *"><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="New Module Released!" /></FieldGroup>
          <FieldGroup label="Message *"><Textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="ICT lessons 15-28 are now live. Start learning!" rows={4} /></FieldGroup>
          <FieldGroup label="Link URL (optional)"><Input value={url} onChange={e => setUrl(e.target.value)} placeholder="/courses" /></FieldGroup>
          <button onClick={send} disabled={sending} style={{ ...css.btn, width: '100%', padding: '14px' }}>
            {sending ? 'SENDING...' : '🔔 SEND PUSH NOTIFICATION'}
          </button>
        </div>

        <div>
          <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.12em' }}>PREVIEW</div>
          <div style={{ background: S3, borderRadius: '16px', padding: '16px', maxWidth: '320px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${G}20`, border: `1px solid ${BORDER2}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📈</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '3px' }}>{title || 'Notification Title'}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{msg || 'Your message will appear here...'}</div>
              </div>
            </div>
          </div>
          <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '14px', lineHeight: 1.6 }}>
            Powered by OneSignal. Sends to all users who enabled browser push notifications.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
// ─── JOURNAL SETTINGS SECTION ────────────────────────────────────────────────
function JournalSection({ supabase }) {
  const PAIRS_DEF     = ['XAUUSD','NAS100','EURUSD','GBPUSD','US30','USDJPY','GBPJPY','AUDUSD','USDCAD','BTCUSD','SP500','USOIL'];
  const SESSIONS_DEF  = ['NY AM','London','Asia','NY PM','London Close','Overlap'];
  const SETUPS_DEF    = ['ICT Silver Bullet','Order Block','Fair Value Gap','BOS Retest','Liquidity Sweep','AMD / PO3','SMT Divergence','Breaker Block','Mitigation Block','OTE Zone','NWOG / NDOG','Turtle Soup','Unicorn Model','2022 ICT Model'];
  const MISTAKES_DEF  = ['Moved Stop Loss','Closed Early (Fear)','FOMO Entry','Revenge Trade','No HTF Confirmation','Oversized Position','Wrong Session','Chased Price','Ignored Structure','Random Entry','Held Too Long','Skipped A+ Setup'];
  const RULES_DEF     = ['HTF Bias confirmed','Killzone / Session correct','Setup matches playbook','Min 2:1 R:R','Risk ≤ 1%','No active news','Waited for confirmation'];
  const [pairs, setPairs]       = useState(PAIRS_DEF);
  const [sessions, setSessions] = useState(SESSIONS_DEF);
  const [setups, setSetups]     = useState(SETUPS_DEF);
  const [mistakes, setMistakes] = useState(MISTAKES_DEF);
  const [rules, setRules]       = useState(RULES_DEF);
  const [newItem, setNewItem]   = useState({ pairs:'', sessions:'', setups:'', mistakes:'', rules:'' });
  const [stats, setStats]       = useState({ total:0, wins:0, users:0 });
  const [msg, setMsg]           = useState({ text:'', type:'success' });
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    Promise.all([
      supabase.from('trades').select('*', { count:'exact', head:true }),
      supabase.from('trades').select('result').eq('result','Win'),
      supabase.from('trades').select('user_id'),
    ]).then(([{ count }, { data: wins }, { data: all }]) => {
      setStats({ total: count||0, wins:(wins||[]).length, users: new Set((all||[]).map(t=>t.user_id)).size });
    });
    supabase.from('site_settings').select('value').eq('key','journal_config').single()
      .then(({ data }) => {
        if (data?.value) {
          const c = data.value;
          if (c.pairs)    setPairs(c.pairs);
          if (c.sessions) setSessions(c.sessions);
          if (c.setups)   setSetups(c.setups);
          if (c.mistakes) setMistakes(c.mistakes);
          if (c.rules)    setRules(c.rules);
        }
      });
  }, [supabase]);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from('site_settings').upsert({ key:'journal_config', value:{pairs,sessions,setups,mistakes,rules} }, { onConflict:'key' });
    if (error) setMsg({ text:'Error: '+error.message, type:'error' });
    else setMsg({ text:'✓ Saved! Copy the constants below into app/journal/page.js to persist across deploys.', type:'success' });
    setSaving(false);
    setTimeout(() => setMsg({ text:'', type:'success' }), 8000);
  };

  const ListEditor = ({ label, field, items, setItems }) => {
    const add = () => { if (!newItem[field].trim()) return; setItems(p=>[...p, newItem[field].trim()]); setNewItem(p=>({...p,[field]:''})); };
    const remove = i => setItems(p=>p.filter((_,idx)=>idx!==i));
    const move = (i,dir) => { const a=[...items]; const j=i+dir; if(j<0||j>=a.length)return; [a[i],a[j]]=[a[j],a[i]]; setItems(a); };
    return (
      <div style={{ ...css.card, marginBottom:'16px' }}>
        <div style={{ ...css.mono, fontSize:'10px', color:G, marginBottom:'14px', letterSpacing:'0.12em' }}>
          {label.toUpperCase()} <span style={{ color:'rgba(255,255,255,0.4)', marginLeft:'8px' }}>{items.length} items</span>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'12px' }}>
          {items.map((item,i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'4px', background:S3, border:`1px solid ${BORDER}`, borderRadius:'7px', padding:'4px 8px 4px 10px' }}>
              <span style={{ fontSize:'12px' }}>{item}</span>
              <button onClick={()=>move(i,-1)} style={{ background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'12px',padding:'0 2px' }}>↑</button>
              <button onClick={()=>move(i,1)}  style={{ background:'none',border:'none',color:'rgba(255,255,255,0.3)',cursor:'pointer',fontSize:'12px',padding:'0 2px' }}>↓</button>
              <button onClick={()=>remove(i)}  style={{ background:'none',border:'none',color:'#F87171',cursor:'pointer',fontSize:'14px',padding:'0 0 0 4px' }}>×</button>
            </div>
          ))}
        </div>
        <div style={{ display:'flex', gap:'8px' }}>
          <Input value={newItem[field]} onChange={e=>setNewItem(p=>({...p,[field]:e.target.value}))}
            placeholder={`Add new ${label.toLowerCase()}...`} style={{ flex:1 }}
            onKeyDown={e=>e.key==='Enter'&&add()} />
          <button onClick={add} style={{ ...css.btn, padding:'10px 18px' }}>ADD</button>
        </div>
      </div>
    );
  };

  const winRate = stats.total > 0 ? ((stats.wins/stats.total)*100).toFixed(1) : 0;
  return (
    <div>
      <SectionHeader title="JOURNAL SETTINGS" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'14px', marginBottom:'24px' }}>
        <StatCard icon="📓" value={stats.total}  label="Total Trades Logged" />
        <StatCard icon="✅" value={stats.wins}    label="Winning Trades" />
        <StatCard icon="👥" value={stats.users}   label="Traders Using Journal" />
        <StatCard icon="📊" value={`${winRate}%`} label="Platform Win Rate" />
      </div>
      <InfoBox>ℹ️ Journal is now 100% FREE — no paywall. Logged-in users get full Supabase persistence. Anonymous visitors see a public SEO landing with sign-up CTA. Edit lists below to customize the trade form options.</InfoBox>
      <Toast msg={msg.text} type={msg.type} />
      <div style={{ ...css.card, marginBottom:'16px', borderColor:'rgba(52,211,153,0.3)' }}>
        <div style={{ ...css.mono, fontSize:'10px', color:'#34D399', marginBottom:'14px', letterSpacing:'0.12em' }}>ACCESS SETTINGS</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
          <div style={{ padding:'14px', background:'rgba(52,211,153,0.06)', borderRadius:'10px', border:'1px solid rgba(52,211,153,0.15)' }}>
            <div style={{ fontSize:'13px', fontWeight:600, color:'#34D399', marginBottom:'4px' }}>✓ FREE for all users</div>
            <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.6)' }}>Journal is public. Logged-in users get full data. Anonymous visitors see public landing with CTA.</div>
          </div>
          <div style={{ padding:'14px', background:S3, borderRadius:'10px' }}>
            <div style={{ fontSize:'13px', fontWeight:600, marginBottom:'4px' }}>Data stored in:</div>
            <div style={{ ...css.mono, fontSize:'11px', color:G }}>supabase → trades table</div>
            <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.5)', marginTop:'4px' }}>User-isolated via RLS (user_id column)</div>
          </div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
        <div>
          <ListEditor label="Trading Pairs" field="pairs" items={pairs} setItems={setPairs} />
          <ListEditor label="Sessions" field="sessions" items={sessions} setItems={setSessions} />
          <ListEditor label="Trading Rules" field="rules" items={rules} setItems={setRules} />
        </div>
        <div>
          <ListEditor label="ICT Setups" field="setups" items={setups} setItems={setSetups} />
          <ListEditor label="Mistakes / Leaks" field="mistakes" items={mistakes} setItems={setMistakes} />
        </div>
      </div>
      <div style={{ ...css.card, marginTop:'16px' }}>
        <div style={{ ...css.mono, fontSize:'10px', color:G, marginBottom:'14px', letterSpacing:'0.12em' }}>EXPORT CONSTANTS — copy into app/journal/page.js</div>
        <pre style={{ background:S1, borderRadius:'8px', padding:'14px', fontSize:'11px', color:'rgba(255,255,255,0.7)', overflow:'auto', maxHeight:'200px', fontFamily:'DM Mono,monospace', lineHeight:1.6 }}>
{`const PAIRS = ${JSON.stringify(pairs)};
const SESSIONS = ${JSON.stringify(sessions)};
const SETUPS = ${JSON.stringify(setups)};
const MISTAKES = ${JSON.stringify(mistakes)};
const RULES = ${JSON.stringify(rules)};`}
        </pre>
      </div>
      <button onClick={save} disabled={saving} style={{ ...css.btn, padding:'14px 28px', marginTop:'16px', fontSize:'12px' }}>
        {saving ? 'SAVING...' : '💾 SAVE JOURNAL CONFIG'}
      </button>
    </div>
  );
}


export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [trades, setTrades] = useState(0);
  const [proUsers, setProUsers] = useState(0);

  const supabase = createClient();

  const loadData = useCallback(async () => {
    setLoading(true);
    const [{ data: usersData }, { data: emailsData }, { count }] = await Promise.all([
      supabase.from('profiles').select('*').order('xp', { ascending: false }).limit(500),
      supabase.from('email_signups').select('*').order('created_at', { ascending: false }),
      supabase.from('trades').select('*', { count: 'exact', head: true }),
    ]);
    if (usersData) { setUsers(usersData); setProUsers(usersData.filter(u => u.is_pro).length); }
    if (emailsData) setEmails(emailsData);
    if (count !== null) setTrades(count);
    setLoading(false);
  }, [supabase]);

  const login = () => {
    if (pass === ADMIN_PASSWORD) { setAuthed(true); loadData(); }
    else setError('Incorrect password');
  };

  const GLOBAL_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; }
    input, textarea, select { outline: none; color: white; }
    input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
    input[type=checkbox] { accent-color: ${G}; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(232,197,71,0.4); border-radius: 2px; }
    select option { background: #111118; }
    button:hover { opacity: 0.85; }
    a:hover { opacity: 0.8; }
    code { background: rgba(232,197,71,0.1); padding: 2px 6px; border-radius: 4px; font-family: 'DM Mono', monospace; font-size: 11px; }
  `;

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: BG, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <style>{GLOBAL_STYLES}</style>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(232,197,71,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,197,71,0.04) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at center, rgba(232,197,71,0.06) 0%, transparent 65%)` }} />

      <div style={{ ...css.card, width: '100%', maxWidth: '380px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${G}18`, border: `1px solid ${BORDER2}`, margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>⚡</div>
        <div style={{ ...css.bebas, fontSize: '30px', color: 'white', marginBottom: '4px', letterSpacing: '0.04em' }}>ADMIN CONSOLE</div>
        <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(232,197,71,0.6)', marginBottom: '24px', letterSpacing: '0.15em' }}>ICT FLOW — RESTRICTED ACCESS</div>
        <input type="password" placeholder="Enter admin password" value={pass}
          onChange={e => { setPass(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ ...css.input, marginBottom: '12px', textAlign: 'center', letterSpacing: '0.2em' }} />
        {error && <div style={{ ...css.mono, fontSize: '11px', color: '#F87171', marginBottom: '12px' }}>{error}</div>}
        <button onClick={login} style={{ ...css.btn, width: '100%', padding: '13px', fontSize: '12px' }}>UNLOCK DASHBOARD</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: BG, color: 'white', fontFamily: "'DM Sans', sans-serif", display: 'flex' }}>
      <style>{GLOBAL_STYLES}</style>

      {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
      <div style={{
        width: sidebarCollapsed ? '56px' : '220px', flexShrink: 0,
        background: S1, borderRight: `1px solid ${BORDER}`,
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        transition: 'width 0.2s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: sidebarCollapsed ? '16px 10px' : '18px 16px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${G}20`, border: `1px solid ${BORDER2}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>⚡</div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ ...css.bebas, fontSize: '15px', color: 'white', lineHeight: 1, letterSpacing: '0.04em' }}>ICT FLOW</div>
              <div style={{ ...css.mono, fontSize: '8px', color: 'rgba(232,197,71,0.6)', letterSpacing: '0.1em' }}>ADMIN PANEL</div>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav groups */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 6px' }}>
          {GROUPS.map(group => (
            <div key={group.id} style={{ marginBottom: '6px' }}>
              {!sidebarCollapsed && (
                <div style={{ ...css.mono, fontSize: '8px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', padding: '8px 8px 4px', textTransform: 'uppercase' }}>{group.label}</div>
              )}
              {TABS.filter(t => t.group === group.id).map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  title={sidebarCollapsed ? tab.label : ''}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '9px',
                    padding: sidebarCollapsed ? '10px' : '8px 10px',
                    borderRadius: '8px', border: 'none',
                    background: activeTab === tab.id ? `${G}15` : 'transparent',
                    color: activeTab === tab.id ? G : 'rgba(255,255,255,0.6)',
                    cursor: 'pointer', marginBottom: '2px',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    borderLeft: activeTab === tab.id ? `2px solid ${G}` : '2px solid transparent',
                  }}>
                  <span style={{ fontSize: '14px', flexShrink: 0 }}>{tab.icon}</span>
                  {!sidebarCollapsed && (
                    <span style={{ ...css.mono, fontSize: '10px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{tab.label.toUpperCase()}</span>
                  )}
                </button>
              ))}
              {!sidebarCollapsed && group.id !== 'settings' && <div style={{ height: '1px', background: BORDER, margin: '8px 0' }} />}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: '10px 6px', borderTop: `1px solid ${BORDER}` }}>
          <a href="/" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <span>🌐</span>
            {!sidebarCollapsed && <span style={{ ...css.mono, fontSize: '10px' }}>VIEW SITE ↗</span>}
          </a>
          <button onClick={() => setAuthed(false)}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'rgba(248,113,113,0.6)', cursor: 'pointer', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <span>🚪</span>
            {!sidebarCollapsed && <span style={{ ...css.mono, fontSize: '10px' }}>LOGOUT</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px 36px', maxWidth: '1300px' }}>
        {activeTab === 'dashboard'     && <DashboardSection users={users} emails={emails} trades={trades} proUsers={proUsers} loading={loading} onRefresh={loadData} />}
        {activeTab === 'users'         && <UsersSection users={users} supabase={supabase} onReload={loadData} />}
        {activeTab === 'analytics'     && <AnalyticsSection users={users} emails={emails} />}
        {activeTab === 'blog'          && <BlogSection supabase={supabase} />}
        {activeTab === 'courses'       && <CoursesSection />}
        {activeTab === 'pages'         && <PagesSection />}
        {activeTab === 'media'         && <MediaSection />}
        {activeTab === 'banners'       && <BannersSection supabase={supabase} />}
        {activeTab === 'notifications' && <NotificationsSection />}
        {activeTab === 'seo'           && <SEOSection supabase={supabase} />}
        {activeTab === 'pricing'       && <PricingSection />}
        {activeTab === 'nav'           && <NavSection />}
        {activeTab === 'journal'       && <JournalSection supabase={supabase} />}
      </div>
    </div>
  );
}
