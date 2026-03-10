'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthGuard from '@/app/components/AuthGuard';
import { createClient } from '@/lib/supabase';

// ─── Constants ───────────────────────────────────────────────────
const PAIRS = ['EURUSD','GBPUSD','XAUUSD','NAS100','US30','USDJPY','GBPJPY','AUDUSD','USDCAD','BTCUSD','ETHUSD','SP500'];
const SESSIONS = ['Asian','London','New York AM','New York PM','London Close','Overlap'];
const ICT_CONCEPTS = ['FVG','Order Block','Liquidity Sweep','BOS','ChoCH','Breaker Block','Mitigation Block','Silver Bullet','AMD/Power of 3','NWOG','NDOG','SMT Divergence','OTE','Killzone Macro','Unicorn Model','2022 Model'];
const MISTAKES = ['Early Entry','No HTF Confirmation','Wrong Session','Chased Price','Moved SL','Overleverage','Revenge Trade','FOMO Entry','Ignored Structure','No Setup — Random Entry','Exited Too Early','Held Too Long'];
const EMOTIONS = ['Calm & Focused','Confident','Anxious','Impatient','Greedy','Fearful','Revenge Mode','Neutral','Overconfident','Hesitant'];
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const GRADE = (rr, win) => {
  if (!win) return { label: 'L', color: '#F87171', bg: 'rgba(248,113,113,0.1)' };
  if (rr >= 3) return { label: 'A+', color: '#34D399', bg: 'rgba(52,211,153,0.1)' };
  if (rr >= 2) return { label: 'A', color: '#34D399', bg: 'rgba(52,211,153,0.08)' };
  if (rr >= 1) return { label: 'B', color: '#D4A843', bg: 'rgba(212,168,67,0.1)' };
  return { label: 'C', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' };
};

const emptyTrade = {
  date: new Date().toISOString().split('T')[0],
  pair: 'EURUSD', direction: 'Long', session: 'New York AM',
  entry: '', sl: '', tp: '', rr: '', pnl: '', result: 'Win',
  concepts: [], mistakes: [], emotion: 'Calm & Focused',
  notes: '', screenshot: '', grade: 'A',
};

// ─── Micro components ─────────────────────────────────────────────
const Tag = ({ label, active, onClick, color = '#D4A843' }) => (
  <button onClick={onClick} className="px-3 py-1.5 rounded-lg text-xs transition-all font-mono" style={{
    fontFamily: "'DM Mono', monospace",
    background: active ? `rgba(${color === '#D4A843' ? '212,168,67' : '248,113,113'},0.15)` : '#141414',
    border: `1px solid ${active ? color : 'rgba(255,255,255,0.06)'}`,
    color: active ? color : 'rgba(255,255,255,0.65)',
    letterSpacing: '0.05em',
  }}>{label}</button>
);

const StatCard = ({ label, value, sub, icon, color = '#D4A843', big = false }) => (
  <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' }}>
    <div style={{ fontSize: '20px', marginBottom: '10px' }}>{icon}</div>
    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: big ? '42px' : '32px', color, lineHeight: 1, marginBottom: '4px' }}>{value}</div>
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: sub ? '4px' : 0 }}>{label}</div>
    {sub && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)' }}>{sub}</div>}
  </div>
);

// ─── Equity Curve ─────────────────────────────────────────────────
function EquityCurve({ trades }) {
  if (trades.length === 0) return (
    <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>No trades yet</span>
    </div>
  );
  let equity = 0;
  const points = [0, ...trades.map(t => { equity += (t.result === 'Win' ? 1 : -1) * (parseFloat(t.rr) || 1); return equity; })];
  const min = Math.min(...points); const max = Math.max(...points);
  const range = max - min || 1;
  const w = 600; const h = 120; const pad = 10;
  const pts = points.map((p, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((p - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  const isPositive = points[points.length - 1] >= 0;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: '120px' }}>
      <defs>
        <linearGradient id="eq-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isPositive ? '#34D399' : '#F87171'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? '#34D399' : '#F87171'} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={isPositive ? '#34D399' : '#F87171'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`${pad},${h - pad} ${pts} ${w - pad},${h - pad}`} fill="url(#eq-grad)" />
    </svg>
  );
}

// ─── Calendar Heatmap ─────────────────────────────────────────────
function CalendarHeatmap({ trades }) {
  const byDate = {};
  trades.forEach(t => {
    if (!byDate[t.date]) byDate[t.date] = { wins: 0, losses: 0, rr: 0 };
    byDate[t.date].wins += t.result === 'Win' ? 1 : 0;
    byDate[t.date].losses += t.result === 'Loss' ? 1 : 0;
    byDate[t.date].rr += parseFloat(t.rr) || 0;
  });
  const today = new Date();
  const days = Array.from({ length: 35 }, (_, i) => {
    const d = new Date(today); d.setDate(d.getDate() - 34 + i);
    const key = d.toISOString().split('T')[0];
    const data = byDate[key];
    return { key, day: d.getDate(), data };
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
      {['M','T','W','T','F','S','S'].map((d, i) => (
        <div key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.45)', textAlign: 'center', paddingBottom: '4px' }}>{d}</div>
      ))}
      {days.map(({ key, day, data }) => {
        let bg = 'rgba(255,255,255,0.03)';
        if (data) bg = data.wins > data.losses ? 'rgba(52,211,153,0.3)' : data.losses > data.wins ? 'rgba(248,113,113,0.3)' : 'rgba(212,168,67,0.2)';
        return (
          <div key={key} title={data ? `${data.wins}W ${data.losses}L` : ''} style={{
            background: bg, borderRadius: '4px', aspectRatio: '1',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'DM Mono', monospace", fontSize: '9px',
            color: data ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
            border: key === today.toISOString().split('T')[0] ? '1px solid #D4A843' : '1px solid transparent',
            cursor: data ? 'pointer' : 'default',
          }}>{day}</div>
        );
      })}
    </div>
  );
}

// ─── Trade Form ───────────────────────────────────────────────────
function TradeForm({ onSave, onCancel, initial }) {
  const [form, setForm] = useState(initial || emptyTrade);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setForm(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));

  const autoRR = () => {
    const e = parseFloat(form.entry), sl = parseFloat(form.sl), tp = parseFloat(form.tp);
    if (e && sl && tp) {
      const rr = Math.abs((tp - e) / (e - sl));
      set('rr', rr.toFixed(2));
    }
  };

  return (
    <div style={{ background: '#0A0A0A', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '20px', padding: '28px' }}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: 'white', letterSpacing: '0.1em', marginBottom: '24px' }}>
        {initial ? 'EDIT TRADE' : 'LOG NEW TRADE'}
      </div>

      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[['date', 'Date', 'date'], ['pair', 'Pair', 'text'], ['session', 'Session', 'text']].map(([k, label]) => (
          <div key={k}>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{label}</label>
            {k === 'pair' ? (
              <select value={form[k]} onChange={e => set(k, e.target.value)} style={{ width: '100%', background: '#141414', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '10px', color: 'white', padding: '10px 12px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}>
                {PAIRS.map(p => <option key={p}>{p}</option>)}
              </select>
            ) : k === 'session' ? (
              <select value={form[k]} onChange={e => set(k, e.target.value)} style={{ width: '100%', background: '#141414', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '10px', color: 'white', padding: '10px 12px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}>
                {SESSIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            ) : (
              <input type={k === 'date' ? 'date' : 'text'} value={form[k]} onChange={e => set(k, e.target.value)} style={{ width: '100%', background: '#141414', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '10px', color: 'white', padding: '10px 12px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", outline: 'none', boxSizing: 'border-box' }} />
            )}
          </div>
        ))}
      </div>

      {/* Direction + Result */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Direction</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Long', 'Short'].map(d => (
              <button key={d} onClick={() => set('direction', d)} style={{
                flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: form.direction === d ? (d === 'Long' ? 'rgba(52,211,153,0.15)' : 'rgba(248,113,113,0.15)') : '#141414',
                border: `1px solid ${form.direction === d ? (d === 'Long' ? '#34D399' : '#F87171') : 'rgba(212,168,67,0.12)'}`,
                color: form.direction === d ? (d === 'Long' ? '#34D399' : '#F87171') : 'rgba(255,255,255,0.4)',
                fontFamily: "'DM Sans', sans-serif",
              }}>{d === 'Long' ? '↑ Long' : '↓ Short'}</button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Result</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {['Win', 'Loss', 'BE'].map(r => (
              <button key={r} onClick={() => set('result', r)} style={{
                flex: 1, padding: '10px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: form.result === r ? (r === 'Win' ? 'rgba(52,211,153,0.15)' : r === 'Loss' ? 'rgba(248,113,113,0.15)' : 'rgba(212,168,67,0.15)') : '#141414',
                border: `1px solid ${form.result === r ? (r === 'Win' ? '#34D399' : r === 'Loss' ? '#F87171' : '#D4A843') : 'rgba(212,168,67,0.12)'}`,
                color: form.result === r ? (r === 'Win' ? '#34D399' : r === 'Loss' ? '#F87171' : '#D4A843') : 'rgba(255,255,255,0.4)',
                fontFamily: "'DM Sans', sans-serif",
              }}>{r}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Entry / SL / TP / RR / PnL */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
        {[['entry','Entry'],['sl','Stop Loss'],['tp','Take Profit'],['rr','R:R'],['pnl','P&L ($)']].map(([k, label]) => (
          <div key={k}>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{label}</label>
            <input
              type="number" step="any" value={form[k]}
              onChange={e => { set(k, e.target.value); if (['entry','sl','tp'].includes(k)) setTimeout(autoRR, 100); }}
              placeholder={k === 'rr' ? 'Auto' : '0.00'}
              style={{ width: '100%', background: '#141414', border: `1px solid ${k === 'rr' ? 'rgba(212,168,67,0.25)' : 'rgba(212,168,67,0.12)'}`, borderRadius: '10px', color: k === 'rr' ? '#D4A843' : 'white', padding: '10px 12px', fontSize: '13px', fontFamily: "'DM Mono', monospace", outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        ))}
      </div>

      {/* ICT Concepts */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>ICT Concepts Used</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {ICT_CONCEPTS.map(c => <Tag key={c} label={c} active={form.concepts.includes(c)} onClick={() => toggleArr('concepts', c)} />)}
        </div>
      </div>

      {/* Mistakes */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Mistakes Made</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {MISTAKES.map(m => <Tag key={m} label={m} active={form.mistakes.includes(m)} onClick={() => toggleArr('mistakes', m)} color="#F87171" />)}
        </div>
      </div>

      {/* Emotion */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Emotional State</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {EMOTIONS.map(e => <Tag key={e} label={e} active={form.emotion === e} onClick={() => set('emotion', e)} />)}
        </div>
      </div>

      {/* Notes */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Trade Notes & Analysis</label>
        <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={4} placeholder="What was the setup? Why did you enter? What happened? What would you do differently?" style={{ width: '100%', background: '#141414', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '10px', color: 'white', padding: '12px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => onSave(form)} style={{
          flex: 1, padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808',
        }}>Save Trade →</button>
        <button onClick={onCancel} style={{
          padding: '14px 24px', borderRadius: '12px', cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase',
          background: 'transparent', border: '1px solid rgba(212,168,67,0.15)', color: 'rgba(255,255,255,0.65)',
        }}>Cancel</button>
      </div>
    </div>
  );
}

// ─── Main Journal Page ─────────────────────────────────────────────
export default function JournalPage() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const supabase = createClient();
  const [trades, setTrades] = useState([]);
  const [view, setView] = useState('dashboard'); // dashboard | log | analytics | calendar
  const [showForm, setShowForm] = useState(false);
  const [editTrade, setEditTrade] = useState(null);
  const [filterPair, setFilterPair] = useState('All');
  const [filterResult, setFilterResult] = useState('All');
  const [filterSession, setFilterSession] = useState('All');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('trades').select('*').eq('user_id', user.id).order('date', { ascending: false });
        setTrades(data || []);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function saveTrade(form) {
    const rr = parseFloat(form.rr) || 0;
    const g = GRADE(rr, form.result === 'Win');
    const trade = { ...form, rr, grade: g.label, user_id: user.id };
    if (editTrade) {
      const { data } = await supabase.from('trades').update(trade).eq('id', editTrade.id).select().single();
      setTrades(t => t.map(x => x.id === editTrade.id ? data : x));
    } else {
      const { data } = await supabase.from('trades').insert(trade).select().single();
      setTrades(t => [data, ...t]);
    }
    setShowForm(false); setEditTrade(null);
  }

  async function deleteTrade(id) {
    await supabase.from('trades').delete().eq('id', id);
    setTrades(t => t.filter(x => x.id !== id));
  }

  // ── Analytics ──
  const wins = trades.filter(t => t.result === 'Win').length;
  const losses = trades.filter(t => t.result === 'Loss').length;
  const be = trades.filter(t => t.result === 'BE').length;
  const total = trades.length;
  const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0';
  const avgRR = total > 0 ? (trades.reduce((a, t) => a + (parseFloat(t.rr) || 0), 0) / total).toFixed(2) : '0';
  const totalPnL = trades.reduce((a, t) => a + (parseFloat(t.pnl) || 0), 0).toFixed(2);
  const profitFactor = losses > 0 ? (wins / losses).toFixed(2) : wins > 0 ? '∞' : '0';
  const streak = (() => {
    let s = 0;
    for (const t of trades) { if (t.result === 'Win') s++; else break; }
    return s;
  })();
  const bestRR = trades.length > 0 ? Math.max(...trades.map(t => parseFloat(t.rr) || 0)).toFixed(2) : '0';

  // Best session
  const sessionStats = {};
  trades.forEach(t => {
    if (!sessionStats[t.session]) sessionStats[t.session] = { wins: 0, total: 0 };
    sessionStats[t.session].total++;
    if (t.result === 'Win') sessionStats[t.session].wins++;
  });
  const bestSession = Object.entries(sessionStats).sort((a, b) => (b[1].wins / b[1].total) - (a[1].wins / a[1].total))[0]?.[0] || 'N/A';

  // Most common mistake
  const mistakeCount = {};
  trades.forEach(t => (t.mistakes || []).forEach(m => { mistakeCount[m] = (mistakeCount[m] || 0) + 1; }));
  const topMistake = Object.entries(mistakeCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  // Best concept
  const conceptCount = {};
  trades.filter(t => t.result === 'Win').forEach(t => (t.concepts || []).forEach(c => { conceptCount[c] = (conceptCount[c] || 0) + 1; }));
  const topConcept = Object.entries(conceptCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  // Filtered trades
  const filtered = trades.filter(t =>
    (filterPair === 'All' || t.pair === filterPair) &&
    (filterResult === 'All' || t.result === filterResult) &&
    (filterSession === 'All' || t.session === filterSession)
  );

  const inputStyle = { background: '#141414', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '8px', color: 'white', padding: '8px 12px', fontSize: '12px', fontFamily: "'DM Mono', monospace", outline: 'none', cursor: 'pointer' };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(212,168,67,0.75)', fontSize: '12px', letterSpacing: '0.2em' }}>LOADING JOURNAL...</span>
    </div>
  );

  return (
    <AuthGuard>
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A0A0A; } ::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.2); border-radius: 4px; }
        select option { background: #141414; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        .trade-row:hover { background: rgba(212,168,67,0.03) !important; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 32px', borderBottom: '1px solid rgba(212,168,67,0.08)', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #D4A843, #8A6B28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", color: 'black', fontSize: '18px' }}>S</div>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.15em', color: 'white' }}>SMARTMONEY</span>
        </Link>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {[['/', 'Home'], ['/courses', 'Courses'], ['/signals', 'Signals'], ['/dashboard', 'Dashboard'], ['/journal', 'Journal']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', color: href === '/journal' ? '#D4A843' : 'rgba(255,255,255,0.65)' }}>{label}</Link>
          ))}
        </div>
        <button onClick={() => { setShowForm(true); setEditTrade(null); }} style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '10px', padding: '10px 20px', fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
          + Log Trade
        </button>
      </nav>
      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
          {[['/', 'Home'], ['/courses', 'Courses'], ['/signals', 'Signals'], ['/glossary', 'Glossary'], ['/journal', 'Journal'], ['/dashboard', 'Dashboard']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '24px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{label}</a>
          ))}
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>

        {/* HEADER */}
        <div className="fade-up" style={{ marginBottom: '32px' }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>// Trading Journal</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1, margin: 0 }}>
              <span style={{ color: 'white' }}>YOUR </span>
              <span style={{ background: 'linear-gradient(135deg, #8A6B28, #D4A843, #F0C96A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>EDGE DATA</span>
            </h1>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'rgba(212,168,67,0.75)' }}>
              {total} trades logged · {winRate}% win rate
            </div>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: '2px', background: '#0D0D0D', borderRadius: '12px', padding: '4px', border: '1px solid rgba(212,168,67,0.08)', marginBottom: '28px', width: 'fit-content' }}>
          {[['dashboard','📊 Overview'], ['log','📋 Trade Log'], ['analytics','📈 Analytics'], ['calendar','📅 Calendar']].map(([key, label]) => (
            <button key={key} onClick={() => setView(key)} style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontFamily: "'DM Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'all 0.2s',
              background: view === key ? 'linear-gradient(135deg, #D4A843, #F0C96A)' : 'transparent',
              color: view === key ? '#080808' : 'rgba(255,255,255,0.65)',
            }}>{label}</button>
          ))}
        </div>

        {/* FORM MODAL */}
        {showForm && (
          <div style={{ marginBottom: '28px' }} className="fade-up">
            <TradeForm onSave={saveTrade} onCancel={() => { setShowForm(false); setEditTrade(null); }} initial={editTrade} />
          </div>
        )}

        {/* ── DASHBOARD VIEW ── */}
        {view === 'dashboard' && (
          <div className="fade-up">
            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginBottom: '24px' }}>
              <StatCard icon="🎯" label="Win Rate" value={`${winRate}%`} sub={`${wins}W ${losses}L ${be}BE`} big />
              <StatCard icon="⚡" label="Avg R:R" value={avgRR} sub={`Best: ${bestRR}R`} />
              <StatCard icon="💰" label="Total P&L" value={`$${parseFloat(totalPnL) >= 0 ? '+' : ''}${totalPnL}`} color={parseFloat(totalPnL) >= 0 ? '#34D399' : '#F87171'} />
              <StatCard icon="📊" label="Profit Factor" value={profitFactor} sub="Win/Loss ratio" />
              <StatCard icon="🔥" label="Win Streak" value={streak} sub="Current" />
              <StatCard icon="⏰" label="Best Session" value={bestSession.split(' ')[0]} sub={bestSession} />
              <StatCard icon="🧠" label="Top Concept" value="" sub={topConcept} icon="🎯" />
              <StatCard icon="⚠️" label="Top Mistake" value="" sub={topMistake} color="#F87171" />
            </div>

            {/* Equity curve */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>// Equity Curve (R)</div>
              <EquityCurve trades={[...trades].reverse()} />
            </div>

            {/* Recent trades */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>// Recent Trades</div>
                <button onClick={() => setView('log')} style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: '#D4A843', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.1em' }}>View All →</button>
              </div>
              {trades.slice(0, 5).length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>
                  No trades yet. Click "+ Log Trade" to start.
                </div>
              ) : trades.slice(0, 5).map(t => {
                const g = GRADE(parseFloat(t.rr) || 0, t.result === 'Win');
                return (
                  <div key={t.id} className="trade-row" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', marginBottom: '4px', transition: 'all 0.2s', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: g.color, flexShrink: 0 }}>{g.label}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: 'white' }}>{t.pair} <span style={{ color: t.direction === 'Long' ? '#34D399' : '#F87171', fontSize: '12px' }}>{t.direction === 'Long' ? '↑' : '↓'}</span></div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.25)' }}>{t.date} · {t.session}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '14px', color: t.result === 'Win' ? '#34D399' : t.result === 'Loss' ? '#F87171' : '#D4A843', fontWeight: 600 }}>{t.result === 'Win' ? '+' : t.result === 'Loss' ? '-' : ''}{t.rr}R</div>
                      {t.pnl && <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: parseFloat(t.pnl) >= 0 ? 'rgba(52,211,153,0.5)' : 'rgba(248,113,113,0.5)' }}>${t.pnl}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TRADE LOG VIEW ── */}
        {view === 'log' && (
          <div className="fade-up">
            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <select value={filterPair} onChange={e => setFilterPair(e.target.value)} style={inputStyle}>
                <option>All</option>{PAIRS.map(p => <option key={p}>{p}</option>)}
              </select>
              <select value={filterResult} onChange={e => setFilterResult(e.target.value)} style={inputStyle}>
                {['All','Win','Loss','BE'].map(r => <option key={r}>{r}</option>)}
              </select>
              <select value={filterSession} onChange={e => setFilterSession(e.target.value)} style={inputStyle}>
                <option>All</option>{SESSIONS.map(s => <option key={s}>{s}</option>)}
              </select>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                {filtered.length} trades
              </div>
            </div>

            {/* Table */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 100px 80px 120px 70px 70px 70px 80px 1fr 80px', gap: '0', padding: '12px 16px', borderBottom: '1px solid rgba(212,168,67,0.06)' }}>
                {['Grade','Date','Pair','Session','Dir','RR','P&L','Result','Concepts',''].map((h, i) => (
                  <div key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{h}</div>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>
                  No trades match your filters
                </div>
              ) : filtered.map(t => {
                const g = GRADE(parseFloat(t.rr) || 0, t.result === 'Win');
                return (
                  <div key={t.id} className="trade-row" style={{ display: 'grid', gridTemplateColumns: '80px 100px 80px 120px 70px 70px 70px 80px 1fr 80px', gap: '0', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.03)', transition: 'all 0.15s', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '15px', color: g.color }}>{g.label}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{t.date}</div>
                    <div style={{ fontWeight: 600, fontSize: '13px' }}>{t.pair}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{t.session}</div>
                    <div style={{ fontSize: '13px', color: t.direction === 'Long' ? '#34D399' : '#F87171' }}>{t.direction === 'Long' ? '↑ L' : '↓ S'}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '13px', color: '#D4A843', fontWeight: 600 }}>{t.rr}R</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: parseFloat(t.pnl) >= 0 ? '#34D399' : '#F87171' }}>{t.pnl ? `$${t.pnl}` : '-'}</div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: t.result === 'Win' ? '#34D399' : t.result === 'Loss' ? '#F87171' : '#D4A843' }}>{t.result}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(t.concepts || []).slice(0, 2).map(c => <span key={c} style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '4px', padding: '2px 6px', fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(212,168,67,0.6)' }}>{c}</span>)}
                      {(t.concepts || []).length > 2 && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '9px', color: 'rgba(255,255,255,0.45)' }}>+{t.concepts.length - 2}</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setEditTrade(t); setShowForm(true); setView('log'); }} style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '6px', padding: '4px 8px', color: '#D4A843', fontSize: '11px', cursor: 'pointer' }}>✏</button>
                      <button onClick={() => deleteTrade(t.id)} style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.12)', borderRadius: '6px', padding: '4px 8px', color: '#F87171', fontSize: '11px', cursor: 'pointer' }}>✕</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ANALYTICS VIEW ── */}
        {view === 'analytics' && (
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* Win rate by session */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>// Win Rate by Session</div>
              {Object.entries(sessionStats).length === 0 ? <div style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>No data yet</div> :
                Object.entries(sessionStats).map(([session, data]) => {
                  const wr = ((data.wins / data.total) * 100).toFixed(0);
                  return (
                    <div key={session} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{session}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#D4A843' }}>{wr}%</span>
                      </div>
                      <div style={{ background: 'rgba(212,168,67,0.06)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${wr}%`, height: '100%', background: 'linear-gradient(90deg, #8A6B28, #D4A843)', borderRadius: '99px', transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  );
                })
              }
            </div>

            {/* Win rate by pair */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>// Performance by Pair</div>
              {(() => {
                const pairStats = {};
                trades.forEach(t => {
                  if (!pairStats[t.pair]) pairStats[t.pair] = { wins: 0, total: 0, rr: 0 };
                  pairStats[t.pair].total++;
                  if (t.result === 'Win') pairStats[t.pair].wins++;
                  pairStats[t.pair].rr += parseFloat(t.rr) || 0;
                });
                return Object.entries(pairStats).length === 0 ? <div style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>No data yet</div> :
                  Object.entries(pairStats).sort((a, b) => b[1].total - a[1].total).map(([pair, data]) => (
                    <div key={pair} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: 'white', fontWeight: 600, width: '70px' }}>{pair}</div>
                      <div style={{ flex: 1, background: 'rgba(212,168,67,0.06)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: `${(data.wins / data.total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #8A6B28, #34D399)', borderRadius: '99px' }} />
                      </div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.65)', width: '60px', textAlign: 'right' }}>{data.total} trades</div>
                    </div>
                  ));
              })()}
            </div>

            {/* Mistake frequency */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>// Most Common Mistakes</div>
              {Object.entries(mistakeCount).length === 0 ? <div style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>No mistakes logged 🎯</div> :
                Object.entries(mistakeCount).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([mistake, count]) => (
                  <div key={mistake} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#F87171', flex: 1 }}>{mistake}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', color: '#F87171' }}>{count}×</div>
                  </div>
                ))
              }
            </div>

            {/* Emotion vs result */}
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>// Emotion vs Win Rate</div>
              {(() => {
                const emotionStats = {};
                trades.forEach(t => {
                  if (!emotionStats[t.emotion]) emotionStats[t.emotion] = { wins: 0, total: 0 };
                  emotionStats[t.emotion].total++;
                  if (t.result === 'Win') emotionStats[t.emotion].wins++;
                });
                return Object.entries(emotionStats).length === 0 ? <div style={{ color: 'rgba(255,255,255,0.15)', fontFamily: "'DM Mono', monospace", fontSize: '12px' }}>No data yet</div> :
                  Object.entries(emotionStats).sort((a, b) => (b[1].wins / b[1].total) - (a[1].wins / a[1].total)).map(([emotion, data]) => {
                    const wr = ((data.wins / data.total) * 100).toFixed(0);
                    return (
                      <div key={emotion} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.4)', flex: 1 }}>{emotion}</div>
                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '12px', color: parseInt(wr) >= 60 ? '#34D399' : parseInt(wr) >= 40 ? '#D4A843' : '#F87171', fontWeight: 600 }}>{wr}%</div>
                      </div>
                    );
                  });
              })()}
            </div>
          </div>
        )}

        {/* ── CALENDAR VIEW ── */}
        {view === 'calendar' && (
          <div className="fade-up" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>// 35-Day Activity</div>
              <CalendarHeatmap trades={trades} />
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                {[['rgba(52,211,153,0.3)', 'Win day'], ['rgba(248,113,113,0.3)', 'Loss day'], ['rgba(212,168,67,0.2)', 'Breakeven'], ['rgba(255,255,255,0.03)', 'No trades']].map(([bg, label]) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: bg }} />
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>// Win Rate by Day</div>
              {(() => {
                const dayStats = {};
                trades.forEach(t => {
                  const day = DAYS[new Date(t.date).getDay() - 1];
                  if (!day) return;
                  if (!dayStats[day]) dayStats[day] = { wins: 0, total: 0 };
                  dayStats[day].total++;
                  if (t.result === 'Win') dayStats[day].wins++;
                });
                return DAYS.map(day => {
                  const data = dayStats[day] || { wins: 0, total: 0 };
                  const wr = data.total > 0 ? ((data.wins / data.total) * 100).toFixed(0) : 0;
                  return (
                    <div key={day} style={{ marginBottom: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: day === 'Tuesday' ? '#D4A843' : 'rgba(255,255,255,0.4)' }}>{day} {day === 'Tuesday' ? '⚡' : ''}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.65)' }}>{data.total > 0 ? `${wr}% (${data.total})` : 'No data'}</span>
                      </div>
                      <div style={{ background: 'rgba(212,168,67,0.06)', borderRadius: '99px', height: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${wr}%`, height: '100%', background: 'linear-gradient(90deg, #8A6B28, #D4A843)', borderRadius: '99px', transition: 'width 0.8s ease' }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid rgba(212,168,67,0.06)', padding: '24px', marginTop: '60px', textAlign: 'center' }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.15)' }}>SmartMoney Academy Trading Journal — Track your edge, not your feelings.</div>
      </footer>
    </div>
    </AuthGuard>
  );
}