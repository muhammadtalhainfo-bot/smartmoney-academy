'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import AuthGuard from '@/app/components/AuthGuard';
import { createClient } from '@/lib/supabase';
import Navbar from '@/app/components/Navbar';

const PAIRS = ['EURUSD','GBPUSD','XAUUSD','NAS100','US30','USDJPY','GBPJPY','AUDUSD','USDCAD','BTCUSD','ETHUSD','SP500'];
const SESSIONS = ['Asian','London','New York AM','New York PM','London Close','Overlap'];
const ICT_CONCEPTS = ['FVG','Order Block','Liquidity Sweep','BOS','ChoCH','Breaker Block','Mitigation Block','Silver Bullet','AMD/Power of 3','NWOG','NDOG','SMT Divergence','OTE','Killzone Macro','Unicorn Model','2022 Model'];
const MISTAKES = ['Early Entry','No HTF Confirmation','Wrong Session','Chased Price','Moved SL','Overleverage','Revenge Trade','FOMO Entry','Ignored Structure','No Setup — Random Entry','Exited Too Early','Held Too Long'];
const EMOTIONS = ['Calm & Focused','Confident','Anxious','Impatient','Greedy','Fearful','Revenge Mode','Neutral','Overconfident','Hesitant'];
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
const NAV = [['/', 'Home'],['/courses','Courses'],['/signals','Signals'],['/glossary','Glossary'],['/practice','Practice'],['/journal','Journal'],['/dashboard','Dashboard']];

const emptyTrade = {
  date: new Date().toISOString().split('T')[0],
  pair: 'EURUSD', direction: 'Long', session: 'New York AM',
  entry: '', sl: '', tp: '', rr: '', pnl: '', result: 'Win',
  concepts: [], mistakes: [], emotion: 'Calm & Focused', notes: '',
};

const GRADE = (rr, win) => {
  if (!win) return { label: 'L', color: '#F87171', bg: 'rgba(248,113,113,0.1)' };
  if (rr >= 3) return { label: 'A+', color: '#34D399', bg: 'rgba(52,211,153,0.1)' };
  if (rr >= 2) return { label: 'A', color: '#34D399', bg: 'rgba(52,211,153,0.08)' };
  if (rr >= 1) return { label: 'B', color: '#D4A843', bg: 'rgba(212,168,67,0.1)' };
  return { label: 'C', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)' };
};

function MiniBar({ value, max, color }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '99px', height: '6px', overflow: 'hidden', flex: 1 }}>
      <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: '99px', transition: 'width 0.8s ease' }} />
    </div>
  );
}

function TradeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial, concepts: initial.concepts || [], mistakes: initial.mistakes || [] } : { ...emptyTrade, date: new Date().toISOString().split('T')[0] });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleArr = (k, v) => setForm(f => ({ ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v] }));
  const inp = { width: '100%', background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '10px 12px', color: 'white', fontFamily: 'DM Mono, monospace', fontSize: '12px', boxSizing: 'border-box', outline: 'none' };
  const lbl = { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' };
  return (
    <div style={{ background: '#0A0A0A', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '20px', padding: '28px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: 'white', letterSpacing: '0.1em' }}>{initial ? 'EDIT TRADE' : 'LOG NEW TRADE'}</div>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#808080', fontSize: '22px', cursor: 'pointer' }}>✕</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '16px' }}>
        <div><label style={lbl}>Pair</label><select value={form.pair} onChange={e => set('pair', e.target.value)} style={inp}>{PAIRS.map(p => <option key={p}>{p}</option>)}</select></div>
        <div><label style={lbl}>Direction</label><div style={{ display: 'flex', gap: '8px' }}>{['Long','Short'].map(d => <button key={d} onClick={() => set('direction', d)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${form.direction === d ? (d === 'Long' ? '#34D399' : '#F87171') : 'rgba(255,255,255,0.08)'}`, background: form.direction === d ? (d === 'Long' ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)') : '#141414', color: form.direction === d ? (d === 'Long' ? '#34D399' : '#F87171') : '#C0C0C0', fontFamily: 'DM Mono, monospace', fontSize: '12px', cursor: 'pointer' }}>{d}</button>)}</div></div>
        <div><label style={lbl}>Date</label><input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inp} /></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '16px' }}>
        {[['entry','Entry Price'],['sl','Stop Loss'],['tp','Take Profit']].map(([k,l]) => (
          <div key={k}><label style={lbl}>{l}</label><input type="number" value={form[k]} onChange={e => set(k, e.target.value)} placeholder="0.00000" style={inp} /></div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px', marginBottom: '16px' }}>
        <div><label style={lbl}>R:R Ratio</label><input type="number" value={form.rr} onChange={e => set('rr', e.target.value)} placeholder="2.5" style={inp} /></div>
        <div><label style={lbl}>PnL ($)</label><input type="number" value={form.pnl} onChange={e => set('pnl', e.target.value)} placeholder="0.00" style={inp} /></div>
        <div><label style={lbl}>Result</label><div style={{ display: 'flex', gap: '6px' }}>{['Win','Loss','BE'].map(r => <button key={r} onClick={() => set('result', r)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `1px solid ${form.result === r ? '#D4A843' : 'rgba(255,255,255,0.08)'}`, background: form.result === r ? 'rgba(212,168,67,0.1)' : '#141414', color: form.result === r ? '#D4A843' : '#C0C0C0', fontFamily: 'DM Mono, monospace', fontSize: '11px', cursor: 'pointer' }}>{r}</button>)}</div></div>
      </div>
      <div style={{ marginBottom: '16px' }}><label style={lbl}>Session</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{SESSIONS.map(s => <button key={s} onClick={() => set('session', s)} style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${form.session === s ? '#D4A843' : 'rgba(255,255,255,0.06)'}`, background: form.session === s ? 'rgba(212,168,67,0.1)' : '#141414', color: form.session === s ? '#D4A843' : '#C0C0C0', fontFamily: 'DM Mono, monospace', fontSize: '11px', cursor: 'pointer' }}>{s}</button>)}</div></div>
      <div style={{ marginBottom: '16px' }}><label style={lbl}>ICT Concepts Used</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{ICT_CONCEPTS.map(c => <button key={c} onClick={() => toggleArr('concepts', c)} style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${form.concepts.includes(c) ? '#D4A843' : 'rgba(255,255,255,0.06)'}`, background: form.concepts.includes(c) ? 'rgba(212,168,67,0.1)' : '#141414', color: form.concepts.includes(c) ? '#D4A843' : '#C0C0C0', fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>{c}</button>)}</div></div>
      <div style={{ marginBottom: '16px' }}><label style={lbl}>Mistakes Made</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{MISTAKES.map(m => <button key={m} onClick={() => toggleArr('mistakes', m)} style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${form.mistakes.includes(m) ? '#F87171' : 'rgba(255,255,255,0.06)'}`, background: form.mistakes.includes(m) ? 'rgba(248,113,113,0.1)' : '#141414', color: form.mistakes.includes(m) ? '#F87171' : '#C0C0C0', fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>{m}</button>)}</div></div>
      <div style={{ marginBottom: '16px' }}><label style={lbl}>Emotional State</label><div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{EMOTIONS.map(e => <button key={e} onClick={() => set('emotion', e)} style={{ padding: '6px 12px', borderRadius: '8px', border: `1px solid ${form.emotion === e ? '#D4A843' : 'rgba(255,255,255,0.06)'}`, background: form.emotion === e ? 'rgba(212,168,67,0.1)' : '#141414', color: form.emotion === e ? '#D4A843' : '#C0C0C0', fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>{e}</button>)}</div></div>
      <div style={{ marginBottom: '24px' }}><label style={lbl}>Trade Notes</label><textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3} placeholder="What did you see? Why did you enter? What would you do differently?" style={{ ...inp, resize: 'vertical' }} /></div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={() => onSave(form)} style={{ flex: 1, background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', border: 'none', borderRadius: '12px', padding: '14px', fontFamily: 'DM Mono, monospace', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Save Trade</button>
        <button onClick={onCancel} style={{ padding: '14px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#808080', fontFamily: 'DM Mono, monospace', fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  );
}

export default function JournalPage() {
  const [trades, setTrades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTrade, setEditTrade] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [view, setView] = useState('trades');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const supabase = createClient();

  // Load trades from Supabase
  const loadTrades = useCallback(async (uid) => {
    const { data, error } = await supabase
      .from('trades')
      .select('*')
      .eq('user_id', uid)
      .order('date', { ascending: false });
    if (!error && data) {
      // Parse concepts/mistakes arrays from JSON strings if needed
      setTrades(data.map(t => ({
        ...t,
        concepts: Array.isArray(t.concepts) ? t.concepts : (t.concepts ? JSON.parse(t.concepts) : []),
        mistakes: Array.isArray(t.mistakes) ? t.mistakes : (t.mistakes ? JSON.parse(t.mistakes) : []),
      })));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await loadTrades(user.id);
      }
    }
    init();
  }, []);

  const save = async (t) => {
    const tradeData = {
      user_id: userId,
      date: t.date,
      pair: t.pair,
      direction: t.direction,
      session: t.session,
      entry: parseFloat(t.entry) || null,
      sl: parseFloat(t.sl) || null,
      tp: parseFloat(t.tp) || null,
      rr: parseFloat(t.rr) || null,
      pnl: parseFloat(t.pnl) || null,
      result: t.result,
      concepts: t.concepts,
      mistakes: t.mistakes,
      emotion: t.emotion,
      notes: t.notes,
    };

    if (editTrade?.id) {
      // Update existing
      await supabase.from('trades').update(tradeData).eq('id', editTrade.id);
    } else {
      // Insert new
      await supabase.from('trades').insert(tradeData);
    }

    await loadTrades(userId);
    setShowForm(false);
    setEditTrade(null);
  };

  const del = async (id) => {
    await supabase.from('trades').delete().eq('id', id);
    setTrades(prev => prev.filter(t => t.id !== id));
  };

  const wins = trades.filter(t => t.result === 'Win').length;
  const losses = trades.filter(t => t.result === 'Loss').length;
  const wr = trades.length ? Math.round((wins / trades.length) * 100) : 0;
  const avgRR = trades.length ? (trades.reduce((a,t) => a + parseFloat(t.rr||0), 0) / trades.length).toFixed(2) : '0.00';
  const totalPnl = trades.reduce((a,t) => a + parseFloat(t.pnl||0), 0);
  const streak = (() => { let s = 0; for (let t of trades) { if (t.result === 'Win') s++; else break; } return s; })();

  const dayStats = {};
  DAYS.forEach(d => { dayStats[d] = { wins: 0, total: 0 }; });
  trades.forEach(t => {
    const day = DAYS[new Date(t.date + 'T12:00:00').getDay() - 1];
    if (day) { dayStats[day].total++; if (t.result === 'Win') dayStats[day].wins++; }
  });

  const emotionStats = {};
  trades.forEach(t => {
    if (!emotionStats[t.emotion]) emotionStats[t.emotion] = { wins: 0, total: 0 };
    emotionStats[t.emotion].total++;
    if (t.result === 'Win') emotionStats[t.emotion].wins++;
  });
  const topEmotions = Object.entries(emotionStats).sort((a,b) => b[1].total - a[1].total).slice(0, 5);

  const conceptStats = {};
  trades.forEach(t => {
    (t.concepts||[]).forEach(c => {
      if (!conceptStats[c]) conceptStats[c] = { wins: 0, total: 0 };
      conceptStats[c].total++;
      if (t.result === 'Win') conceptStats[c].wins++;
    });
  });
  const topConcepts = Object.entries(conceptStats).sort((a,b) => b[1].total - a[1].total).slice(0, 6);

  const monthlyPnl = {};
  trades.forEach(t => {
    const m = t.date ? t.date.slice(0, 7) : 'unknown';
    if (!monthlyPnl[m]) monthlyPnl[m] = 0;
    monthlyPnl[m] += parseFloat(t.pnl || 0);
  });
  const months = Object.entries(monthlyPnl).sort((a,b) => a[0].localeCompare(b[0])).slice(-6);
  const maxMonthPnl = Math.max(...months.map(([,v]) => Math.abs(v)), 1);

  const card = { background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.08)', borderRadius: '16px', padding: '20px' };

  return (
    <AuthGuard>
      <div style={{ minHeight: '100vh', background: '#080808', color: 'white' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
          * { box-sizing: border-box; }
          select option { background: #141414; color: white; }
        `}</style>

        <Navbar active="/journal" />

        {menuOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(20px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '32px' }}>
            <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: '#D4A843', fontSize: '28px', cursor: 'pointer' }}>✕</button>
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '24px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
        )}

        {showForm && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <TradeForm initial={editTrade} onSave={save} onCancel={() => { setShowForm(false); setEditTrade(null); }} />
          </div>
        )}

        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>// Trading Journal</div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '42px', letterSpacing: '0.05em', color: 'white', lineHeight: 1 }}>YOUR EDGE OVER TIME</div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'rgba(212,168,67,0.5)', letterSpacing: '0.2em' }}>LOADING TRADES...</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '12px', marginBottom: '28px' }}>
                {[
                  { label: 'Total Trades', value: trades.length, icon: '📊', color: '#D4A843' },
                  { label: 'Win Rate', value: wr + '%', icon: '🎯', color: wr >= 60 ? '#34D399' : wr >= 40 ? '#D4A843' : '#F87171' },
                  { label: 'Avg R:R', value: avgRR + 'R', icon: '⚖️', color: '#D4A843' },
                  { label: 'Total PnL', value: (totalPnl >= 0 ? '+' : '') + totalPnl.toFixed(0), icon: '💰', color: totalPnl >= 0 ? '#34D399' : '#F87171' },
                  { label: 'Win Streak', value: streak, icon: '🔥', color: streak >= 3 ? '#F59E0B' : '#D4A843' },
                ].map(s => (
                  <div key={s.label} style={card}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}>{s.icon}</div>
                    <div style={{ fontFamily: 'Bebas Neue', fontSize: '30px', color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#808080', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', background: '#0D0D0D', borderRadius: '12px', padding: '4px', width: 'fit-content', border: '1px solid rgba(212,168,67,0.08)' }}>
                {[['trades','📋 Trades'],['analytics','📈 Analytics'],['calendar','📅 Calendar']].map(([v, l]) => (
                  <button key={v} onClick={() => setView(v)} style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: view === v ? 'rgba(212,168,67,0.15)' : 'transparent', color: view === v ? '#D4A843' : '#808080', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.08em', cursor: 'pointer' }}>{l}</button>
                ))}
              </div>

              {view === 'trades' && (
                <div>
                  {trades.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '80px 24px', border: '1px dashed rgba(212,168,67,0.15)', borderRadius: '20px' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                      <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: 'white', letterSpacing: '0.1em', marginBottom: '8px' }}>NO TRADES LOGGED YET</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: '#808080', marginBottom: '24px' }}>Start building your edge. Log your first trade.</div>
                      <button onClick={() => setShowForm(true)} style={{ background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', border: 'none', borderRadius: '12px', padding: '12px 28px', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>+ Log First Trade</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {trades.map((t) => {
                        const g = GRADE(parseFloat(t.rr || 0), t.result === 'Win');
                        return (
                          <div key={t.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', padding: '16px 20px' }}>
                            <div style={{ fontFamily: 'Bebas Neue', fontSize: '26px', color: g.color, background: g.bg, borderRadius: '10px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{g.label}</div>
                            <div style={{ minWidth: '130px' }}>
                              <div style={{ fontFamily: 'Bebas Neue', fontSize: '18px', color: 'white', letterSpacing: '0.08em' }}>{t.pair} <span style={{ color: t.direction === 'Long' ? '#34D399' : '#F87171', fontSize: '13px' }}>{t.direction}</span></div>
                              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#808080', marginTop: '2px' }}>{t.date} · {t.session}</div>
                            </div>
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C0C0C0' }}>RR: <span style={{ color: '#D4A843' }}>{t.rr || '—'}</span></div>
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: parseFloat(t.pnl) >= 0 ? '#34D399' : '#F87171' }}>{t.pnl ? (parseFloat(t.pnl) > 0 ? '+' : '') + t.pnl : '—'}</div>
                            {t.concepts && t.concepts.length > 0 && (
                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', flex: 1 }}>
                                {t.concepts.slice(0, 3).map(c => (
                                  <span key={c} style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#D4A843', background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '4px', padding: '2px 7px' }}>{c}</span>
                                ))}
                              </div>
                            )}
                            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                              <button onClick={() => { setEditTrade(t); setShowForm(true); }} style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.15)', borderRadius: '8px', padding: '6px 14px', color: '#D4A843', fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>Edit</button>
                              <button onClick={() => del(t.id)} style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.15)', borderRadius: '8px', padding: '6px 14px', color: '#F87171', fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>Delete</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {view === 'analytics' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div style={card}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Win / Loss Breakdown</div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                      {[['Wins', wins, '#34D399'],['Losses', losses, '#F87171'],['BE', trades.length - wins - losses, '#D4A843']].map(([l,v,c]) => (
                        <div key={l} style={{ flex: 1, background: '#141414', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                          <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: c }}>{v}</div>
                          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#808080', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden', height: '8px', gap: '2px' }}>
                      {trades.length > 0 && <>
                        <div style={{ width: `${(wins/trades.length)*100}%`, background: '#34D399', transition: 'width 0.8s' }} />
                        <div style={{ width: `${(losses/trades.length)*100}%`, background: '#F87171', transition: 'width 0.8s' }} />
                        <div style={{ flex: 1, background: '#D4A843', opacity: 0.5 }} />
                      </>}
                    </div>
                  </div>
                  <div style={card}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Monthly PnL</div>
                    {months.length === 0 ? (
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#808080', textAlign: 'center', padding: '20px' }}>No data yet</div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {months.map(([month, pnl]) => (
                          <div key={month} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#A0A0A0', width: '60px' }}>{month.slice(5)}/{month.slice(2,4)}</div>
                            <MiniBar value={Math.abs(pnl)} max={maxMonthPnl} color={pnl >= 0 ? '#34D399' : '#F87171'} />
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: pnl >= 0 ? '#34D399' : '#F87171', width: '60px', textAlign: 'right' }}>{pnl >= 0 ? '+' : ''}{pnl.toFixed(0)}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={card}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Win Rate by Day</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {DAYS.map(day => {
                        const d = dayStats[day];
                        const wr = d.total > 0 ? Math.round((d.wins / d.total) * 100) : 0;
                        return (
                          <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: day === 'Tuesday' ? '#D4A843' : '#A0A0A0', width: '72px' }}>{day.slice(0,3)} {day === 'Tuesday' ? '⚡' : ''}</div>
                            <MiniBar value={wr} max={100} color={wr >= 60 ? '#34D399' : wr >= 40 ? '#D4A843' : '#F87171'} />
                            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C0C0C0', width: '70px', textAlign: 'right' }}>{d.total > 0 ? `${wr}% (${d.total})` : 'No data'}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div style={card}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Emotion vs Win Rate</div>
                    {topEmotions.length === 0 ? (
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#808080', textAlign: 'center', padding: '20px' }}>No data yet</div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {topEmotions.map(([emotion, data]) => {
                          const wr = Math.round((data.wins / data.total) * 100);
                          return (
                            <div key={emotion} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#A0A0A0', width: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emotion}</div>
                              <MiniBar value={wr} max={100} color={wr >= 60 ? '#34D399' : wr >= 40 ? '#D4A843' : '#F87171'} />
                              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C0C0C0', width: '40px', textAlign: 'right' }}>{wr}%</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div style={{ ...card, gridColumn: '1 / -1' }}>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '16px' }}>Top ICT Concepts — Usage & Win Rate</div>
                    {topConcepts.length === 0 ? (
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#808080', textAlign: 'center', padding: '20px' }}>No concept data yet — log trades with ICT concepts selected</div>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
                        {topConcepts.map(([concept, data]) => {
                          const wr = Math.round((data.wins / data.total) * 100);
                          return (
                            <div key={concept} style={{ background: '#141414', borderRadius: '12px', padding: '14px' }}>
                              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#D4A843', marginBottom: '8px' }}>{concept}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                                <MiniBar value={wr} max={100} color={wr >= 60 ? '#34D399' : wr >= 40 ? '#D4A843' : '#F87171'} />
                                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C0C0C0', whiteSpace: 'nowrap' }}>{wr}%</span>
                              </div>
                              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#808080' }}>{data.total} trades</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {view === 'calendar' && (
                <div style={card}>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.75)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px' }}>Trade Calendar — {new Date().getFullYear()}</div>
                  {(() => {
                    const tradesByDate = {};
                    trades.forEach(t => { if (!tradesByDate[t.date]) tradesByDate[t.date] = []; tradesByDate[t.date].push(t); });
                    const monthsArr = Array.from({ length: 12 }, (_, i) => i);
                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
                        {monthsArr.map(m => {
                          const year = new Date().getFullYear();
                          const firstDay = new Date(year, m, 1).getDay();
                          const daysInMonth = new Date(year, m + 1, 0).getDate();
                          const monthName = new Date(year, m).toLocaleString('default', { month: 'short' }).toUpperCase();
                          return (
                            <div key={m}>
                              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#D4A843', marginBottom: '8px', letterSpacing: '0.1em' }}>{monthName}</div>
                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px' }}>
                                {['S','M','T','W','T','F','S'].map((d,i) => <div key={i} style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: '#404040', textAlign: 'center', paddingBottom: '3px' }}>{d}</div>)}
                                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                                  const dateStr = `${year}-${String(m+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                                  const dayTrades = tradesByDate[dateStr] || [];
                                  const hasWin = dayTrades.some(t => t.result === 'Win');
                                  const hasLoss = dayTrades.some(t => t.result === 'Loss');
                                  const bg = dayTrades.length === 0 ? 'transparent' : hasWin && !hasLoss ? 'rgba(52,211,153,0.3)' : !hasWin && hasLoss ? 'rgba(248,113,113,0.3)' : 'rgba(212,168,67,0.3)';
                                  const borderColor = hasWin && !hasLoss ? 'rgba(52,211,153,0.5)' : hasLoss && !hasWin ? 'rgba(248,113,113,0.5)' : 'rgba(212,168,67,0.5)';
                                  return <div key={day} title={dayTrades.length > 0 ? `${dayTrades.length} trade(s)` : ''} style={{ aspectRatio: '1', borderRadius: '3px', background: bg, border: dayTrades.length > 0 ? `1px solid ${borderColor}` : '1px solid rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontFamily: 'DM Mono, monospace', color: dayTrades.length > 0 ? 'white' : '#303030' }}>{day}</div>;
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                  <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
                    {[['rgba(52,211,153,0.3)','Win day'],['rgba(248,113,113,0.3)','Loss day'],['rgba(212,168,67,0.3)','Mixed day'],['transparent','No trades']].map(([bg, label]) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: bg, border: '1px solid rgba(255,255,255,0.1)' }} />
                        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C0C0C0' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <footer style={{ borderTop: '1px solid rgba(212,168,67,0.06)', padding: '24px', marginTop: '40px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#707070' }}>SmartMoney Academy Trading Journal — Track your edge, not your feelings.</div>
        </footer>
      </div>
    </AuthGuard>
  );
}
