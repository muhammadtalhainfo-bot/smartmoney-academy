'use client';
import { useState, useEffect, useCallback } from 'react';
import { adminDb } from './actions';
import { getAdminSession, loginAdmin, logoutAdmin } from './actions';
import { MODULES as CURRICULUM_MODULES } from '@/lib/curriculum';
import { PRO_ANNUAL_PRICE_USD, PRO_MONTHLY_PRICE_USD } from '@/lib/pricing';

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
const ALL_MODULES = CURRICULUM_MODULES;


const NAV_PAGES = [
  { href: '/',            label: 'Home',              desc: 'Landing page' },
  { href: '/courses',     label: 'Courses',           desc: '38 modules listing' },
  { href: '/glossary',    label: 'Glossary',          desc: 'ICT/SMC terms (97+)' },
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

const Input = ({ value, onChange, placeholder, type = 'text', style = {}, onKeyDown, ariaLabel }) => (
  <input type={type} value={value} onChange={onChange} placeholder={placeholder}
    aria-label={ariaLabel || placeholder || undefined}
    onKeyDown={onKeyDown} style={{ ...css.input, ...style }} />
);

const Textarea = ({ value, onChange, placeholder, rows = 5, style = {}, ariaLabel }) => (
  <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
    aria-label={ariaLabel || placeholder || undefined}
    style={{ ...css.input, resize: 'vertical', lineHeight: 1.6, ...style }} />
);

const Select = ({ value, onChange, options, style = {}, ariaLabel }) => (
  <select value={value} onChange={onChange} aria-label={ariaLabel || undefined} style={{ ...css.input, ...style }}>
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

const JournalListEditor = ({ label, field, items, setItems, newItem, setNewItem }) => {
  const add = () => {
    if (!newItem[field].trim()) return;
    setItems(p => [...p, newItem[field].trim()]);
    setNewItem(p => ({ ...p, [field]: '' }));
  };
  const remove = i => setItems(p => p.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
  };

  return (
    <div style={{ ...css.card, marginBottom:'16px' }}>
      <div style={{ ...css.mono, fontSize:'10px', color:G, marginBottom:'14px', letterSpacing:'0.12em' }}>
        {label.toUpperCase()} <span style={{ color:'#AAB3BF', marginLeft:'8px' }}>{items.length} items</span>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'12px' }}>
        {items.map((item,i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:'4px', background:S3, border:`1px solid ${BORDER}`, borderRadius:'7px', padding:'4px 8px 4px 10px' }}>
            <span style={{ fontSize:'12px' }}>{item}</span>
            <button type="button" onClick={() => move(i,-1)} aria-label={`Move ${item} up`} style={{ background:'none',border:'none',color:'#9DA6B2',cursor:'pointer',fontSize:'12px',padding:'0 2px' }}>↑</button>
            <button type="button" onClick={() => move(i,1)} aria-label={`Move ${item} down`} style={{ background:'none',border:'none',color:'#9DA6B2',cursor:'pointer',fontSize:'12px',padding:'0 2px' }}>↓</button>
            <button type="button" onClick={() => remove(i)} aria-label={`Remove ${item}`} style={{ background:'none',border:'none',color:'#F87171',cursor:'pointer',fontSize:'14px',padding:'0 0 0 4px' }}>×</button>
          </div>
        ))}
      </div>
      <div style={{ display:'flex', gap:'8px' }}>
        <Input value={newItem[field]} onChange={e => setNewItem(p => ({ ...p, [field]: e.target.value }))}
          placeholder={`Add new ${label.toLowerCase()}...`} style={{ flex:1 }}
          onKeyDown={e => e.key === 'Enter' && add()} />
        <button type="button" onClick={add} style={{ ...css.btn, padding:'10px 18px' }}>ADD</button>
      </div>
    </div>
  );
};

// ─── DASHBOARD SECTION ────────────────────────────────────────────────────────
function DashboardSection({ users, emails, trades, proUsers, loading, onRefresh }) {
  const topUsers = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 8);
  const recentEmails = [...emails].slice(0, 6);
  const totalLessons = ALL_MODULES.reduce((a, m) => a + m.lessons, 0);

  return (
    <div>
      <SectionHeader title="SITE OVERVIEW" action={
        <button type="button" onClick={onRefresh} style={css.btnGhost}>↻ Refresh</button>
      } />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', ...css.mono, fontSize: '12px', color: 'rgba(232,197,71,0.7)' }}>LOADING DATA...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '14px', marginBottom: '24px' }}>
            <StatCard icon="👥" value={users.length}  label="Total Users"   sub={`${proUsers} Pro`} />
            <StatCard icon="💰" value={proUsers}       label="Pro Members"   sub={`~${proUsers * PRO_MONTHLY_PRICE_USD}/mo`} />
            <StatCard icon="📧" value={emails.length}  label="Email Leads" />
            <StatCard icon="📊" value={trades}         label="Trade Logs" />
            <StatCard icon="🎓" value={ALL_MODULES.length} label="Modules"  sub={`${totalLessons} lessons`} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={css.card}>
              <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.15em' }}>{'// TOP USERS BY XP'}</div>
              {topUsers.length === 0 ? (
                <div style={{ ...css.mono, fontSize: '11px', color: '#AAB3BF', textAlign: 'center', padding: '20px' }}>No users yet</div>
              ) : topUsers.map((u, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ ...css.mono, fontSize: '10px', color: '#AAB3BF', width: '18px' }}>#{i + 1}</div>
                  <div style={{ flex: 1, fontSize: '13px' }}>{u.username || u.email?.split('@')[0] || '—'}</div>
                  <div style={{ ...css.mono, fontSize: '11px', color: G }}>{u.xp || 0} XP</div>
                  <Badge color={u.is_pro ? '#34D399' : '#B8B8B8'}>{u.is_pro ? 'PRO' : 'FREE'}</Badge>
                </div>
              ))}
            </div>

            <div style={css.card}>
              <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.15em' }}>{'// RECENT EMAIL LEADS'}</div>
              {recentEmails.length === 0 ? (
                <div style={{ ...css.mono, fontSize: '11px', color: '#AAB3BF', textAlign: 'center', padding: '20px' }}>No email signups yet</div>
              ) : recentEmails.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${BORDER}` }}>
                  <div style={{ fontSize: '16px' }}>📧</div>
                  <div style={{ flex: 1, fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.email}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: '#AAB3BF' }}>{e.created_at ? new Date(e.created_at).toLocaleDateString() : '—'}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...css.card }}>
            <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '14px', letterSpacing: '0.15em' }}>{'// QUICK LINKS — LIVE SITE'}</div>
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
function UsersSection({ users, onReload }) {
  const [search, setSearch] = useState('');
  const [filterPro, setFilterPro] = useState('all');
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState('success');
  const [selectedUser, setSelectedUser] = useState(null);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchSearch = !q || (u.username || '').toLowerCase().includes(q) || (u.email || '').toLowerCase().includes(q);
    const matchPro = filterPro === 'all' || (filterPro === 'pro' ? u.is_pro : !u.is_pro);
    return matchSearch && matchPro;
  });

  const togglePro = async (u) => {
    try {
      await adminDb('profile.togglePro', { id: u.id, isPro: !u.is_pro });
      setMsgType('success');
      setMsg(`${u.username || 'User'} → ${!u.is_pro ? 'Pro' : 'Free'}`);
      onReload();
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error('Admin Pro toggle failed:', error);
      setMsgType('error');
      setMsg('Could not update this user. Please retry.');
    }
  };

  const resetXP = async (u) => {
    if (!confirm(`Reset XP for ${u.username || u.email}?`)) return;
    try {
      await adminDb('profile.resetXP', { id: u.id });
      setMsgType('success');
      setMsg(`XP reset for ${u.username || u.email}`);
      onReload();
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error('Admin XP reset failed:', error);
      setMsgType('error');
      setMsg('Could not reset XP. Please retry.');
    }
  };

  const deleteUser = async (u) => {
    if (!confirm(`Delete account ${u.username || u.email}? This permanently removes the auth account and linked data, and cancels linked Stripe subscriptions first.`)) return;
    try {
      await adminDb('profile.delete', { id: u.id });
      setMsgType('success');
      setMsg(`Deleted ${u.username || u.email || 'account'}.`);
      onReload();
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error('Admin user deletion failed:', error);
      setMsgType('error');
      setMsg('Could not delete this account. Please retry.');
    }
  };

  return (
    <div>
      <SectionHeader title={`USERS (${users.length})`} />
      <Toast msg={msg} type={msgType} />

      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by username or email..." style={{ flex: 1 }} />
        <Select ariaLabel="Filter users by Pro status" value={filterPro} onChange={e => setFilterPro(e.target.value)}
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
                    <button type="button" onClick={() => togglePro(u)} style={{
                      background: u.is_pro ? 'rgba(52,211,153,0.1)' : 'rgba(232,197,71,0.08)',
                      border: `1px solid ${u.is_pro ? 'rgba(52,211,153,0.3)' : BORDER2}`,
                      borderRadius: '5px', padding: '3px 10px',
                      color: u.is_pro ? '#34D399' : G,
                      ...css.mono, fontSize: '10px', cursor: 'pointer',
                    }}>{u.is_pro ? '✓ PRO' : 'FREE'}</button>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: '11px', color: '#AAB3BF', whiteSpace: 'nowrap' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                  <td style={{ padding: '10px 12px', display: 'flex', gap: '6px' }}>
                    <button type="button" onClick={() => resetXP(u)} style={{ ...css.btnGhost, padding: '5px 10px', fontSize: '10px' }}>RESET XP</button>
                    <button type="button" onClick={() => deleteUser(u)} style={css.btnDanger}>DEL</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', ...css.mono, fontSize: '11px', color: '#AAB3BF' }}>No users found</td></tr>
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
        <StatCard icon="💵" value={`${proCount * PRO_MONTHLY_PRICE_USD}`} label="Est. Monthly Rev" sub={`at ${PRO_MONTHLY_PRICE_USD}/mo`} />
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

function BlogSection({ adminDbClient = adminDb }) {
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState('list');
  const [form, setForm] = useState(EMPTY_POST);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: 'success' });
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');

  const load = useCallback(async () => {
    try {
      const { data } = await adminDbClient('blog.list');
      if (data) setPosts(data);
    } catch (error) {
      console.error('Admin blog load failed:', error);
      setMsg({ text: 'Unable to load blog posts.', type: 'error' });
    }
  }, [adminDbClient]);

  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q);
    const matchCat = filterCat === 'all' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const save = async () => {
    if (!form.title || !form.content) {
      setMsg({ text: 'Title and content are required', type: 'error' });
      return;
    }
    setSaving(true);
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const date = form.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    try {
      await adminDbClient('blog.save', { form: { ...form, slug, date } });
      setMsg({ text: '✓ Post saved!', type: 'success' });
      await load();
      setView('list');
      setForm(EMPTY_POST);
      setEditId(null);
    } catch (error) {
      console.error('Admin blog save failed:', error);
      setMsg({ text: 'Unable to save this post. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const del = async (p) => {
    if (!confirm('Remove this post from the public blog? Source-controlled posts will be unpublished; database-only posts will be deleted.')) return;
    try {
      await adminDbClient('blog.delete', { id: p.id, slug: p.slug, post: p });
      await load();
    } catch (error) {
      console.error('Admin blog delete failed:', error);
      setMsg({ text: 'Unable to delete this post.', type: 'error' });
    }
  };

  const edit = (p) => {
    setEditId(p.id);
    setForm({ ...p });
    setView('edit');
    setMsg({ text: '', type: 'success' });
  };

  const togglePub = async (p) => {
    try {
      await adminDbClient('blog.togglePublished', { id: p.id, slug: p.slug, post: p, published: !p.published });
      await load();
    } catch (error) {
      console.error('Admin blog publish toggle failed:', error);
      setMsg({ text: 'Unable to update publication status.', type: 'error' });
    }
  };

  const CATS = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Strategy', 'Psychology', 'News', 'Analysis'];

  if (view === 'edit') return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
        <button type="button" onClick={() => { setView('list'); setForm(EMPTY_POST); setEditId(null); }} style={css.btnGhost}>← Back</button>
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
                  <button type="button" key={s} onClick={() => setForm({ ...form, published: s === 'Published' })}
                    style={{ flex: 1, padding: '8px', borderRadius: '7px', cursor: 'pointer',
                      background: (s === 'Published') === form.published ? `${G}18` : 'transparent',
                      border: `1px solid ${(s === 'Published') === form.published ? G : BORDER2}`,
                      color: (s === 'Published') === form.published ? G : 'rgba(255,255,255,0.6)',
                      ...css.mono, fontSize: '11px' }}>{s}</button>
                ))}
              </div>
            </FieldGroup>
            <FieldGroup label="Category">
              <Select ariaLabel="Blog category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
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
              <input aria-label="Featured post" type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
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
          <button type="button" onClick={save} disabled={saving} style={{ ...css.btn, width: '100%', padding: '14px', fontSize: '12px', marginBottom: '8px' }}>
            {saving ? 'SAVING...' : editId ? '💾 SAVE CHANGES' : '🚀 PUBLISH POST'}
          </button>
          <button type="button" onClick={() => { setView('list'); setForm(EMPTY_POST); setEditId(null); }} style={{ ...css.btnGhost, width: '100%', padding: '12px' }}>CANCEL</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader title={`BLOG POSTS (${posts.length})`} action={
        <button type="button" onClick={() => { setForm(EMPTY_POST); setEditId(null); setView('edit'); }} style={css.btn}>+ NEW POST</button>
      } />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." style={{ flex: 1 }} />
        <Select ariaLabel="Filter posts by category" value={filterCat} onChange={e => setFilterCat(e.target.value)}
          options={CATS.map(c => ({ value: c, label: c === 'all' ? 'All Categories' : c }))}
          style={{ width: '180px' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div style={{ ...css.card, textAlign: 'center', padding: '50px', ...css.mono, fontSize: '12px', color: '#AAB3BF' }}>
            {posts.length === 0 ? 'No blog posts yet. Click NEW POST to write your first article.' : 'No posts match your search.'}
          </div>
        ) : filtered.map(p => (
          <div key={p.id || p.slug} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px' }}>
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
              <button type="button" onClick={() => togglePub(p)} style={{
                background: p.published ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${p.published ? 'rgba(52,211,153,0.3)' : BORDER}`,
                borderRadius: '6px', padding: '5px 12px',
                color: p.published ? '#34D399' : '#AAB3BF',
                ...css.mono, fontSize: '10px', cursor: 'pointer',
              }}>{p.published ? '● LIVE' : '○ DRAFT'}</button>
              <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, padding: '6px 12px', fontSize: '10px', textDecoration: 'none' }}>VIEW ↗</a>
              <button type="button" onClick={() => edit(p)} style={{ ...css.btn, padding: '6px 14px', fontSize: '10px' }}>EDIT</button>
              <button type="button" onClick={() => del(p)} style={css.btnDanger}>DEL</button>
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
        <Select ariaLabel="Filter modules by level" value={filterLevel} onChange={e => setFilterLevel(e.target.value)}
          options={[{ value: 'all', label: 'All Levels' }, 'Beginner', 'Intermediate', 'Advanced', 'SMC'].map(v => typeof v === 'string' ? { value: v, label: v } : v)}
          style={{ width: '180px' }} />
        <div style={{ ...css.mono, fontSize: '11px', color: '#AAB3BF', display: 'flex', alignItems: 'center' }}>
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
                  <FieldGroup label="Title"><Input ariaLabel="Module title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></FieldGroup>
                  <FieldGroup label="Level">
                    <Select ariaLabel="Module level" value={form.level} onChange={e => setForm({ ...form, level: e.target.value })} options={['Beginner', 'Intermediate', 'Advanced', 'SMC']} />
                  </FieldGroup>
                  <FieldGroup label="Tag">
                    <Select ariaLabel="Module tag" value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} options={['ICT', 'ICT & SMC', 'SMC', 'NEWER']} />
                  </FieldGroup>
                  <FieldGroup label="Lessons"><Input ariaLabel="Number of lessons" type="number" value={form.lessons} onChange={e => setForm({ ...form, lessons: parseInt(e.target.value) || 0 })} /></FieldGroup>
                  <FieldGroup label="Duration"><Input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="48 min" /></FieldGroup>
                  <FieldGroup label="Emoji"><Input ariaLabel="Module emoji" value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} /></FieldGroup>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input aria-label="Lock module for Pro users" type="checkbox" checked={form.locked} onChange={e => setForm({ ...form, locked: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>Pro locked</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input aria-label="Mark module as coming soon" type="checkbox" checked={form.comingSoon} onChange={e => setForm({ ...form, comingSoon: e.target.checked })} />
                    <span style={{ ...css.mono, fontSize: '11px', color: 'rgba(255,255,255,0.85)' }}>Coming soon</span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={save} style={css.btn}>💾 SAVE</button>
                  <button type="button" onClick={() => setEditing(null)} style={css.btnGhost}>CANCEL</button>
                </div>
              </div>
            ) : (
              <div style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 18px' }}>
                <div style={{ ...css.mono, fontSize: '11px', color: 'rgba(232,197,71,0.5)', width: '28px', flexShrink: 0 }}>{m.module}</div>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: `${G}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{m.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{m.title}</div>
                  <div style={{ ...css.mono, fontSize: '10px', color: '#AAB3BF' }}>{m.lessons} lessons · {m.duration} · {m.tag}</div>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <Badge color={m.level === 'Beginner' ? '#34D399' : m.level === 'Intermediate' ? G : '#F87171'}>{m.level}</Badge>
                  {m.locked && <Badge color="#F87171">PRO</Badge>}
                  {m.comingSoon && <Badge color="#AAB3BF">SOON</Badge>}
                  <a href={`/lesson/${m.id}`} target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, padding: '5px 10px', fontSize: '10px', textDecoration: 'none' }}>VIEW ↗</a>
                  <button type="button" onClick={() => { setEditing(m.id); setForm({ ...m }); }} style={{ ...css.btn, padding: '5px 12px', fontSize: '10px' }}>EDIT</button>
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
          <div key={p.href} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', border: selected === p.href ? `1px solid ${G}` : `1px solid ${BORDER}` }}>
            <button
              type="button"
              aria-pressed={selected === p.href}
              onClick={() => setSelected(selected === p.href ? null : p.href)}
              style={{ flex: 1, minWidth: 0, padding: 0, border: 'none', background: 'transparent', color: 'inherit', textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px' }}>{p.label}</div>
              <div style={{ ...css.mono, fontSize: '10px', color: 'rgba(232,197,71,0.6)' }}>{p.href}</div>
              <div style={{ fontSize: '12px', color: '#AAB3BF', marginTop: '3px' }}>{p.desc}</div>
            </button>
            <a href={p.href} target="_blank" rel="noopener noreferrer"
              style={{ ...css.btn, padding: '6px 12px', fontSize: '10px', textDecoration: 'none' }}>VIEW ↗</a>
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

// ─── MEDIA SECTION ────────────────────────────────────────────────────────────
function MediaSection() {
  const IMAGES = [
    '/images/market-structure.png', '/images/liquidity.png', '/images/fvg.png',
    '/images/order-blocks.png', '/images/killzones.png', '/images/amd.png', '/images/premium-discount.png',
    '/modules/module-01.png', '/modules/module-02.png',
    '/modules/module-03.png', '/modules/module-04.png',
    '/modules/module-06.png', '/modules/module-07.png',
    '/modules/module-09.png', '/modules/module-10.png', '/modules/module-11.png',
    '/modules/module-12.png', '/modules/module-13.png', '/modules/module-14.png',
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
          <button
            type="button"
            key={img}
            onClick={() => copy(img)}
            aria-label={copied === img ? `Copied ${img.split('/').pop()}` : `Copy ${img.split('/').pop()} URL`}
            style={{ ...css.card, padding: '12px', cursor: 'pointer', border: copied === img ? `1px solid ${G}` : `1px solid ${BORDER}`, color: 'inherit', textAlign: 'left' }}
          >
            <div style={{ width: '100%', height: '70px', background: S3, borderRadius: '6px', overflow: 'hidden', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
            </div>
            <div style={{ ...css.mono, fontSize: '9px', color: copied === img ? G : '#AAB3BF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {copied === img ? '✓ COPIED!' : img.split('/').pop()}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── SEO SECTION ──────────────────────────────────────────────────────────────
function SEOSection() {
  const items = [
    ['Global metadata', 'app/layout.js', 'Title, description, canonical, Open Graph, robots, JSON-LD'],
    ['Sitemap', 'app/sitemap.js', 'Dynamic sitemap with curriculum lesson URLs and blog/guide pages'],
    ['Robots rules', 'public/robots.txt', 'Crawler exclusions for private/authenticated routes'],
    ['Blog metadata', 'app/blog/page.js + app/blog/[slug]/layout.js', 'Per-post canonical, article metadata and structured data'],
  ];

  return (
    <div>
      <SectionHeader title="SEO STATUS" />
      <InfoBox>ℹ️ SEO is source-controlled in the repository. This admin panel does not write database-backed SEO settings because the live Supabase project has no site_settings table. Edit the listed files and deploy to change production SEO.</InfoBox>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map(([label, file, desc]) => (
          <div key={label} style={{ ...css.card, display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{label}</div>
              <div style={{ ...css.mono, fontSize: '10px', color: G, marginBottom: '4px' }}>{file}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
        <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, textDecoration: 'none' }}>VIEW SITEMAP ↗</a>
        <a href="/robots.txt" target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, textDecoration: 'none' }}>VIEW ROBOTS ↗</a>
        <a href="/feed.xml" target="_blank" rel="noopener noreferrer" style={{ ...css.btnGhost, textDecoration: 'none' }}>VIEW RSS ↗</a>
      </div>
    </div>
  );
}

// ─── PRICING SECTION ──────────────────────────────────────────────────────────
function PricingSection() {
  const [freeFeatures, setFreeFeatures] = useState(['All 38 modules and 203+ lessons', 'ICT Glossary (97+ terms)', 'Daily practice challenges', 'Trade Journal', 'AI trade coaching in the journal']);
  const [proFeatures, setProFeatures] = useState(['Everything in Free', 'Certificate of completion', 'Professional trading-plan template', 'Ad-free learning experience', 'Cancel anytime']);
  const [monthlyPrice, setMonthlyPrice] = useState(String(PRO_MONTHLY_PRICE_USD));
  const [annualPrice, setAnnualPrice] = useState(String(PRO_ANNUAL_PRICE_USD));
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
              <div style={{ ...css.mono, fontSize: '11px', color: '#AAB3BF' }}>{p.suffix}</div>
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
                  <button type="button" onClick={() => removeFeature(plan, i)} style={{ background: 'none', border: 'none', color: '#F87171', cursor: 'pointer', fontSize: '14px' }}>×</button>
                </div>
              ))}
            </div>
            {addingTo === plan ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <Input value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="New feature..." style={{ flex: 1 }} onKeyDown={e => e.key === 'Enter' && addFeature(plan)} />
                <button type="button" onClick={() => addFeature(plan)} style={css.btn}>ADD</button>
                <button type="button" onClick={() => { setAddingTo(null); setNewFeature(''); }} style={css.btnGhost}>✕</button>
              </div>
            ) : (
              <button type="button" onClick={() => { setAddingTo(plan); setNewFeature(''); }} style={{ ...css.btnGhost, width: '100%', padding: '8px' }}>+ Add Feature</button>
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
  const MORE = [['/mentorship', '2022 ICT Mentorship'], ['/practice', 'Practice'], ['/journal', 'Journal'], ['/leaderboard', 'Leaderboard'], ['/certificate', 'Certificate'], ['/resources', 'Resources'], ['/blog', 'Blog'], ['/pricing', 'Pricing'], ['/about', 'About']];

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
                  <div style={{ ...css.mono, fontSize: '10px', color: '#9DA6B2', width: '18px' }}>{i + 1}</div>
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
          <FieldGroup label="Message *"><Textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="New ICT lessons and modules are live. Start learning!" rows={4} /></FieldGroup>
          <FieldGroup label="Link URL (optional)"><Input value={url} onChange={e => setUrl(e.target.value)} placeholder="/courses" /></FieldGroup>
          <button type="button" onClick={send} disabled={sending} style={{ ...css.btn, width: '100%', padding: '14px' }}>
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
          <div style={{ ...css.mono, fontSize: '11px', color: '#AAB3BF', marginTop: '14px', lineHeight: 1.6 }}>
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
function JournalSection({ adminDbClient = adminDb }) {
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
    adminDbClient('journal.load').then(({ stats: nextStats, config }) => {
      setStats(nextStats);
      if (config) {
        if (config.pairs) setPairs(config.pairs);
        if (config.sessions) setSessions(config.sessions);
        if (config.setups) setSetups(config.setups);
        if (config.mistakes) setMistakes(config.mistakes);
        if (config.rules) setRules(config.rules);
      }
    }).catch((error) => console.error('Journal settings load failed:', error));
  }, [adminDbClient]);

  const save = () => {
    setMsg({ text:'✓ Preview updated locally. Copy the exported constants below into app/journal/page.js to persist across deploys.', type:'success' });
    setTimeout(() => setMsg({ text:'', type:'success' }), 8000);
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
      <InfoBox>ℹ️ Journal is now 100% FREE — no paywall. Logged-in users get full Supabase trade persistence. The option lists below are source-controlled in app/journal/page.js; changes here are a local preview until you copy the exported constants into that file.</InfoBox>
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
            <div style={{ fontSize:'11px', color:'#AAB3BF', marginTop:'4px' }}>User-isolated via RLS (user_id column)</div>
          </div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
        <div>
          <JournalListEditor label="Trading Pairs" field="pairs" items={pairs} setItems={setPairs} newItem={newItem} setNewItem={setNewItem} />
          <JournalListEditor label="Sessions" field="sessions" items={sessions} setItems={setSessions} newItem={newItem} setNewItem={setNewItem} />
          <JournalListEditor label="Trading Rules" field="rules" items={rules} setItems={setRules} newItem={newItem} setNewItem={setNewItem} />
        </div>
        <div>
          <JournalListEditor label="ICT Setups" field="setups" items={setups} setItems={setSetups} newItem={newItem} setNewItem={setNewItem} />
          <JournalListEditor label="Mistakes / Leaks" field="mistakes" items={mistakes} setItems={setMistakes} newItem={newItem} setNewItem={setNewItem} />
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
      <button type="button" onClick={save} style={{ ...css.btn, padding:'14px 28px', marginTop:'16px', fontSize:'12px' }}>
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
  const [authSubmitting, setAuthSubmitting] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [users, setUsers] = useState([]);
  const [emails, setEmails] = useState([]);
  const [trades, setTrades] = useState(0);
  const [proUsers, setProUsers] = useState(0);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const { users: usersData, emails: emailsData, trades: tradeCount } = await adminDb('dashboard');
      setUsers(usersData);
      setProUsers(usersData.filter(u => u.is_pro).length);
      setEmails(emailsData);
      setTrades(tradeCount);
    } catch (error) {
      console.error('Admin data load failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    getAdminSession().then(({ ok }) => {
      if (!mounted) return;
      setAuthed(ok);
      if (ok) loadData();
    });
    return () => { mounted = false; };
  }, [loadData]);

  const login = async () => {
    if (authSubmitting) return;
    setAuthSubmitting(true);
    setError('');
    try {
      const result = await loginAdmin(pass);
      if (result.ok) {
        setAuthed(true);
        setPass('');
        loadData();
      } else {
        setError(result.error || 'Admin login failed.');
      }
    } finally {
      setAuthSubmitting(false);
    }
  };

  const GLOBAL_STYLES = `

    * { box-sizing: border-box; }
    input, textarea, select { outline: none; color: white; }
    input::placeholder, textarea::placeholder { color: #B9C1CC; opacity: 1; }
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
        <input type="password" placeholder="Enter admin password" value={pass} disabled={authSubmitting}
          onChange={e => { setPass(e.target.value); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ ...css.input, marginBottom: '12px', textAlign: 'center', letterSpacing: '0.2em' }} />
        {error && <div style={{ ...css.mono, fontSize: '11px', color: '#F87171', marginBottom: '12px' }}>{error}</div>}
        <button type="button" onClick={login} disabled={authSubmitting} style={{ ...css.btn, width: '100%', padding: '13px', fontSize: '12px' }}>
          {authSubmitting ? 'CHECKING...' : 'UNLOCK DASHBOARD'}
        </button>
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
          <button type="button" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#AAB3BF', cursor: 'pointer', fontSize: '14px', flexShrink: 0 }}>
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav groups */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 6px' }}>
          {GROUPS.map(group => (
            <div key={group.id} style={{ marginBottom: '6px' }}>
              {!sidebarCollapsed && (
                <div style={{ ...css.mono, fontSize: '8px', color: '#9DA6B2', letterSpacing: '0.15em', padding: '8px 8px 4px', textTransform: 'uppercase' }}>{group.label}</div>
              )}
              {TABS.filter(t => t.group === group.id).map(tab => (
                <button type="button" key={tab.id} onClick={() => setActiveTab(tab.id)}
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
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', color: '#AAB3BF', textDecoration: 'none', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <span>🌐</span>
            {!sidebarCollapsed && <span style={{ ...css.mono, fontSize: '10px' }}>VIEW SITE ↗</span>}
          </a>
          <button type="button" onClick={async () => { await logoutAdmin(); setAuthed(false); }}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '8px', border: 'none', background: 'transparent', color: 'rgba(248,113,113,0.6)', cursor: 'pointer', justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}>
            <span>🚪</span>
            {!sidebarCollapsed && <span style={{ ...css.mono, fontSize: '10px' }}>LOGOUT</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'auto', padding: '32px 36px', maxWidth: '1300px' }}>
        {activeTab === 'dashboard'     && <DashboardSection users={users} emails={emails} trades={trades} proUsers={proUsers} loading={loading} onRefresh={loadData} />}
        {activeTab === 'users'         && <UsersSection users={users} onReload={loadData} />}
        {activeTab === 'analytics'     && <AnalyticsSection users={users} emails={emails} />}
        {activeTab === 'blog'          && <BlogSection />}
        {activeTab === 'courses'       && <CoursesSection />}
        {activeTab === 'pages'         && <PagesSection />}
        {activeTab === 'media'         && <MediaSection />}
        {activeTab === 'notifications' && <NotificationsSection />}
        {activeTab === 'seo'           && <SEOSection />}
        {activeTab === 'pricing'       && <PricingSection />}
        {activeTab === 'nav'           && <NavSection />}
        {activeTab === 'journal'       && <JournalSection />}
      </div>
    </div>
  );
}
