'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AuthGuard from '@/app/components/AuthGuard';
import { createClient } from '@/lib/supabase';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PAIRS = ['XAUUSD','NAS100','EURUSD','GBPUSD','US30','USDJPY','GBPJPY','AUDUSD','USDCAD','BTCUSD','SP500','USOIL'];
const SESSIONS = ['NY AM','London','Asia','NY PM','London Close','Overlap'];
const SETUPS = ['ICT Silver Bullet','Order Block','Fair Value Gap','BOS Retest','Liquidity Sweep','AMD / PO3','SMT Divergence','Breaker Block','Mitigation Block','OTE Zone','NWOG / NDOG','Turtle Soup','Unicorn Model','2022 ICT Model'];
const MARKETS = ['Trending','Ranging','Volatile','Low Volume','News Event','Asian Range Break','Daily Bias Clear'];
const MISTAKES = ['Moved Stop Loss','Closed Early (Fear)','FOMO Entry','Revenge Trade','No HTF Confirmation','Oversized Position','Wrong Session','Chased Price','Ignored Structure','Random Entry','Held Too Long','Skipped A+ Setup'];
const EMOTIONS_PRE = ['Calm & Confident','Focused','Neutral','Anxious','FOMO','Impatient','Overconfident','Revenge Mode'];
const EMOTIONS_DURING = ['Patient','Disciplined','Stressed','Wanted to Close Early','Moved SL','Added to Position'];
const EMOTIONS_POST = ['Satisfied','Regret (Exited Early)','Regret (Held Too Long)','Neutral','Overexcited','Relieved'];
const RULES = ['HTF Bias confirmed','Killzone / Session correct','Setup matches playbook','Min 2:1 R:R','Risk ≤ 1%','No active news','Waited for confirmation'];
const DAYS = ['Mon','Tue','Wed','Thu','Fri'];

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const C = {
  bg:     '#07090E',
  bg1:    '#0B0E16',
  bg2:    '#0F1420',
  bg3:    '#141927',
  bg4:    '#1A2030',
  border: '#1C2538',
  border2:'#243040',
  gold:   '#C9A84C',
  gold2:  '#E8C96A',
  goldDim:'rgba(201,168,76,0.12)',
  green:  '#22C55E',
  red:    '#EF4444',
  blue:   '#3B82F6',
  purple: '#A855F7',
  cyan:   '#06B6D4',
  text:   '#DDE4F0',
  text2:  '#7A8EA8',
  text3:  '#445060',
};

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const S = {
  card: {
    background: C.bg1,
    border: `1px solid ${C.border}`,
    borderRadius: '14px',
    padding: '22px',
  },
  mono: { fontFamily: 'DM Mono, monospace', letterSpacing: '0.06em' },
  label: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '10px',
    color: C.text3,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    background: C.bg2,
    border: `1px solid ${C.border2}`,
    borderRadius: '9px',
    padding: '10px 14px',
    color: C.text,
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  btn: {
    background: `linear-gradient(135deg, ${C.gold}, ${C.gold2})`,
    color: '#07090E',
    border: 'none',
    borderRadius: '10px',
    padding: '11px 22px',
    fontFamily: 'DM Mono, monospace',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.08em',
  },
  btnGhost: {
    background: 'transparent',
    border: `1px solid ${C.border2}`,
    borderRadius: '10px',
    padding: '10px 18px',
    color: C.text2,
    fontFamily: 'DM Mono, monospace',
    fontSize: '11px',
    cursor: 'pointer',
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n, dec = 2) => (isNaN(n) ? '—' : Number(n).toFixed(dec));
const fmtPnl = (n) => {
  if (isNaN(n) || n === '' || n === null) return '—';
  const v = parseFloat(n);
  return (v >= 0 ? '+$' : '-$') + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
const grade = (rr, win) => {
  if (!win) return { label: 'L', color: C.red, bg: 'rgba(239,68,68,0.1)' };
  const r = parseFloat(rr) || 0;
  if (r >= 3) return { label: 'A+', color: C.green, bg: 'rgba(34,197,94,0.12)' };
  if (r >= 2) return { label: 'A', color: C.green, bg: 'rgba(34,197,94,0.08)' };
  if (r >= 1) return { label: 'B', color: C.gold, bg: C.goldDim };
  return { label: 'C', color: C.text2, bg: C.bg3 };
};
const toMonthKey = (date) => date ? date.slice(0, 7) : '';

// ─── TINY COMPONENTS ─────────────────────────────────────────────────────────
const Bar = ({ pct, color, height = 6 }) => (
  <div style={{ background: C.bg3, borderRadius: '3px', height, overflow: 'hidden' }}>
    <div style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.6s ease' }} />
  </div>
);

const StatCard = ({ label, value, sub, color = C.gold, accent }) => (
  <div style={{ ...S.card, position: 'relative', overflow: 'hidden' }}>
    {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: accent }} />}
    <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '8px' }}>{label}</div>
    <div style={{ fontSize: '26px', fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
    {sub && <div style={{ fontSize: '11px', color: C.text3, marginTop: '5px' }}>{sub}</div>}
  </div>
);

const Tag = ({ children, color = C.gold, onClick, active }) => (
  <span onClick={onClick} style={{
    display: 'inline-flex', alignItems: 'center',
    padding: '4px 11px', borderRadius: '20px', cursor: onClick ? 'pointer' : 'default',
    border: `1px solid ${active ? color : C.border2}`,
    background: active ? `${color}18` : C.bg2,
    color: active ? color : C.text3,
    fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.05em',
    transition: 'all 0.15s',
  }}>{children}</span>
);

const SectionHead = ({ title, sub, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
    <div>
      <div style={{ fontSize: '20px', fontWeight: 700, color: C.text, letterSpacing: '-0.4px' }}>{title}</div>
      {sub && <div style={{ fontSize: '12px', color: C.text3, marginTop: '3px' }}>{sub}</div>}
    </div>
    {action}
  </div>
);

const NavBtn = ({ icon, label, active, badge, onClick }) => (
  <button onClick={onClick} style={{
    width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
    padding: '9px 12px', borderRadius: '9px', border: 'none',
    background: active ? C.goldDim : 'transparent',
    borderLeft: `2px solid ${active ? C.gold : 'transparent'}`,
    color: active ? C.gold : C.text2,
    fontFamily: 'DM Mono, monospace', fontSize: '11px', cursor: 'pointer',
    letterSpacing: '0.05em', marginBottom: '2px', textAlign: 'left',
    transition: 'all 0.15s',
  }}>
    <span style={{ fontSize: '14px', flexShrink: 0 }}>{icon}</span>
    <span style={{ flex: 1 }}>{label}</span>
    {badge > 0 && <span style={{ background: C.red, color: '#fff', fontSize: '9px', padding: '1px 6px', borderRadius: '10px', fontFamily: 'DM Mono, monospace' }}>{badge}</span>}
  </button>
);

const EmptyState = ({ onAdd }) => (
  <div style={{ textAlign: 'center', padding: '80px 24px', border: `1px dashed ${C.border2}`, borderRadius: '16px' }}>
    <div style={{ fontSize: '44px', marginBottom: '16px' }}>📋</div>
    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '20px', color: C.text, letterSpacing: '0.08em', marginBottom: '8px' }}>NO TRADES LOGGED</div>
    <div style={{ fontSize: '13px', color: C.text3, marginBottom: '24px' }}>Start building your edge. Every trade is data.</div>
    <button onClick={onAdd} style={S.btn}>+ LOG FIRST TRADE</button>
  </div>
);

// ─── EMPTY TRADE ─────────────────────────────────────────────────────────────
const emptyTrade = () => ({
  date: new Date().toISOString().split('T')[0],
  pair: 'XAUUSD', direction: 'Long', session: 'NY AM',
  entry: '', sl: '', tp: '', exit: '', rr: '', pnl: '',
  result: 'Win', risk_pct: '1',
  setup: [], market: [], mistakes: [],
  emotion_pre: 'Calm & Confident', emotion_during: [], emotion_post: '',
  rules_checked: [], notes_pre: '', notes_post: '',
  screenshot_url: '',
});

// ─── TRADE FORM ───────────────────────────────────────────────────────────────
function TradeForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(() => initial ? {
    ...emptyTrade(), ...initial,
    setup: initial.setup || [],
    market: initial.market || [],
    mistakes: initial.mistakes || [],
    emotion_during: initial.emotion_during || [],
    rules_checked: initial.rules_checked || [],
  } : emptyTrade());

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k, v) => setForm(f => ({
    ...f, [k]: f[k].includes(v) ? f[k].filter(x => x !== v) : [...f[k], v]
  }));

  // Auto-calc RR
  useEffect(() => {
    const e = parseFloat(form.entry), sl = parseFloat(form.sl), tp = parseFloat(form.tp);
    if (e && sl && tp && e !== sl) {
      const risk = Math.abs(e - sl);
      const reward = Math.abs(tp - e);
      set('rr', (reward / risk).toFixed(2));
    }
  }, [form.entry, form.sl, form.tp]);

  const inp = { ...S.input };
  const sel = { ...S.input, cursor: 'pointer' };
  const lbl = S.label;

  const ToggleGroup = ({ label, field, options, color = C.gold }) => (
    <div style={{ marginBottom: '16px' }}>
      <label style={lbl}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
        {options.map(o => {
          const isArr = Array.isArray(form[field]);
          const active = isArr ? form[field].includes(o) : form[field] === o;
          return (
            <span key={o} onClick={() => isArr ? toggle(field, o) : set(field, o)} style={{
              padding: '5px 12px', borderRadius: '8px', cursor: 'pointer',
              border: `1px solid ${active ? color : C.border}`,
              background: active ? `${color}14` : C.bg2,
              color: active ? color : C.text3,
              fontFamily: 'DM Mono, monospace', fontSize: '10px',
              transition: 'all 0.12s',
            }}>{o}</span>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 200,
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      overflowY: 'auto', padding: '20px',
    }}>
      <div style={{
        background: C.bg1, border: `1px solid ${C.border}`, borderRadius: '18px',
        width: '100%', maxWidth: '820px', padding: '32px', position: 'relative',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: C.text }}>{initial ? 'Edit Trade' : 'Log New Trade'}</div>
            <div style={{ fontSize: '12px', color: C.text3, marginTop: '3px' }}>Record every detail. Discipline compounds.</div>
          </div>
          <button onClick={onCancel} style={{ width: '32px', height: '32px', background: C.bg3, border: `1px solid ${C.border}`, borderRadius: '8px', cursor: 'pointer', color: C.text2, fontSize: '16px' }}>✕</button>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* LEFT */}
          <div>
            {/* Core */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ ...S.mono, fontSize: '10px', color: C.gold, letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '8px', borderBottom: `1px solid ${C.border}` }}>TRADE DETAILS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div><label style={lbl}>Symbol</label><select value={form.pair} onChange={e => set('pair', e.target.value)} style={sel}>{PAIRS.map(p => <option key={p}>{p}</option>)}</select></div>
                <div><label style={lbl}>Date</label><input type="date" value={form.date} onChange={e => set('date', e.target.value)} style={inp} /></div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={lbl}>Direction</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Long','Short'].map(d => (
                    <button key={d} onClick={() => set('direction', d)} style={{
                      flex: 1, padding: '9px', borderRadius: '9px',
                      border: `1px solid ${form.direction === d ? (d === 'Long' ? C.green : C.red) : C.border}`,
                      background: form.direction === d ? (d === 'Long' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)') : C.bg2,
                      color: form.direction === d ? (d === 'Long' ? C.green : C.red) : C.text2,
                      fontFamily: 'DM Mono, monospace', fontSize: '12px', cursor: 'pointer', fontWeight: 600,
                    }}>{d === 'Long' ? '▲ LONG' : '▼ SHORT'}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div><label style={lbl}>Entry</label><input type="number" value={form.entry} onChange={e => set('entry', e.target.value)} placeholder="0.00" style={inp} /></div>
                <div><label style={lbl}>Stop Loss</label><input type="number" value={form.sl} onChange={e => set('sl', e.target.value)} placeholder="0.00" style={inp} /></div>
                <div><label style={lbl}>Take Profit</label><input type="number" value={form.tp} onChange={e => set('tp', e.target.value)} placeholder="0.00" style={inp} /></div>
                <div><label style={lbl}>Exit Price</label><input type="number" value={form.exit} onChange={e => set('exit', e.target.value)} placeholder="0.00" style={inp} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                <div><label style={lbl}>R:R (auto)</label><input value={form.rr} onChange={e => set('rr', e.target.value)} placeholder="2.5" style={{ ...inp, color: C.gold }} /></div>
                <div><label style={lbl}>P&L ($)</label><input type="number" value={form.pnl} onChange={e => set('pnl', e.target.value)} placeholder="0.00" style={inp} /></div>
                <div><label style={lbl}>Risk %</label><input type="number" value={form.risk_pct} onChange={e => set('risk_pct', e.target.value)} placeholder="1.0" style={inp} /></div>
              </div>
              <div>
                <label style={lbl}>Result</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Win','Loss','Break Even','Partial'].map(r => (
                    <button key={r} onClick={() => set('result', r)} style={{
                      flex: 1, padding: '8px 4px', borderRadius: '8px',
                      border: `1px solid ${form.result === r ? C.gold : C.border}`,
                      background: form.result === r ? C.goldDim : C.bg2,
                      color: form.result === r ? C.gold : C.text3,
                      fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer',
                    }}>{r}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <div style={{ ...S.mono, fontSize: '10px', color: C.gold, letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '8px', borderBottom: `1px solid ${C.border}` }}>TRADE NOTES</div>
              <div style={{ marginBottom: '10px' }}>
                <label style={lbl}>Pre-Trade Plan (thesis, confluences, DOL)</label>
                <textarea value={form.notes_pre} onChange={e => set('notes_pre', e.target.value)} rows={3}
                  placeholder="What did you see? HTF bias? Killzone? Draw on liquidity?"
                  style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
              </div>
              <div>
                <label style={lbl}>Post-Trade Review (what happened, lessons)</label>
                <textarea value={form.notes_post} onChange={e => set('notes_post', e.target.value)} rows={3}
                  placeholder="Did price behave as expected? What would you do differently?"
                  style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div style={{ ...S.mono, fontSize: '10px', color: C.gold, letterSpacing: '0.12em', marginBottom: '12px', paddingBottom: '8px', borderBottom: `1px solid ${C.border}` }}>CONTEXT & TAGS</div>

            <ToggleGroup label="Session" field="session" options={SESSIONS} />
            <ToggleGroup label="Setup / Strategy" field="setup" options={SETUPS} />
            <ToggleGroup label="Market Condition" field="market" options={MARKETS} />
            <ToggleGroup label="Mistakes Made" field="mistakes" options={MISTAKES} color={C.red} />

            <div style={{ height: '1px', background: C.border, margin: '16px 0' }} />
            <div style={{ ...S.mono, fontSize: '10px', color: C.gold, letterSpacing: '0.12em', marginBottom: '12px' }}>PSYCHOLOGY</div>

            <ToggleGroup label="Emotion Before Entry" field="emotion_pre" options={EMOTIONS_PRE} color={C.cyan} />
            <ToggleGroup label="During Trade" field="emotion_during" options={EMOTIONS_DURING} color={C.purple} />
            <ToggleGroup label="Emotion After Exit" field="emotion_post" options={EMOTIONS_POST} color={C.blue} />

            <div style={{ height: '1px', background: C.border, margin: '16px 0' }} />
            <div style={{ ...S.mono, fontSize: '10px', color: C.gold, letterSpacing: '0.12em', marginBottom: '12px' }}>RULE CHECKLIST</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {RULES.map(r => {
                const checked = form.rules_checked.includes(r);
                return (
                  <label key={r} onClick={() => toggle('rules_checked', r)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <div style={{
                      width: '16px', height: '16px', borderRadius: '4px', flexShrink: 0,
                      border: `1px solid ${checked ? C.green : C.border2}`,
                      background: checked ? 'rgba(34,197,94,0.15)' : C.bg2,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{checked && <span style={{ color: C.green, fontSize: '10px', fontWeight: 700 }}>✓</span>}</div>
                    <span style={{ fontSize: '12px', color: checked ? C.text : C.text3 }}>{r}</span>
                  </label>
                );
              })}
            </div>

            {/* Screenshot */}
            <div>
              <label style={lbl}>Screenshot URL (TradingView, chart image)</label>
              <input value={form.screenshot_url} onChange={e => set('screenshot_url', e.target.value)}
                placeholder="https://..." style={inp} />
              {form.screenshot_url && (
                <img src={form.screenshot_url} alt="Chart" onError={e => e.target.style.display = 'none'}
                  style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px', paddingTop: '20px', borderTop: `1px solid ${C.border}` }}>
          <button onClick={() => onSave(form)} style={{ ...S.btn, flex: 1, padding: '13px' }}>
            {initial ? '💾 SAVE CHANGES' : '✦ SAVE TRADE'}
          </button>
          <button onClick={onCancel} style={{ ...S.btnGhost, padding: '13px 24px' }}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}

// ─── ANALYTICS HELPERS ────────────────────────────────────────────────────────
function useStats(trades) {
  return useMemo(() => {
    if (!trades.length) return null;
    const wins = trades.filter(t => t.result === 'Win').length;
    const losses = trades.filter(t => t.result === 'Loss').length;
    const winRate = (wins / trades.length) * 100;
    const pnls = trades.map(t => parseFloat(t.pnl) || 0);
    const netPnl = pnls.reduce((a, b) => a + b, 0);
    const rrs = trades.filter(t => t.rr).map(t => parseFloat(t.rr));
    const avgRR = rrs.length ? rrs.reduce((a, b) => a + b, 0) / rrs.length : 0;
    const winRRs = trades.filter(t => t.result === 'Win' && t.rr).map(t => parseFloat(t.rr));
    const lossRRs = trades.filter(t => t.result === 'Loss' && t.rr).map(t => parseFloat(t.rr));
    const avgWin = winRRs.length ? winRRs.reduce((a, b) => a + b, 0) / winRRs.length : 0;
    const avgLoss = lossRRs.length ? lossRRs.reduce((a, b) => a + b, 0) / lossRRs.length : 1;
    const expectancy = (winRate / 100) * avgWin - (1 - winRate / 100) * avgLoss;

    // Equity curve
    let equity = 0;
    const equityPoints = trades
      .slice().sort((a, b) => a.date.localeCompare(b.date))
      .map(t => { equity += parseFloat(t.pnl) || 0; return equity; });

    // Max drawdown
    let peak = 0, maxDD = 0, running = 0;
    for (const p of pnls) { running += p; if (running > peak) peak = running; if (peak - running > maxDD) maxDD = peak - running; }

    // By session
    const bySess = {};
    SESSIONS.forEach(s => { bySess[s] = { wins: 0, total: 0, pnl: 0 }; });
    trades.forEach(t => {
      const s = t.session;
      if (bySess[s]) { bySess[s].total++; if (t.result === 'Win') bySess[s].wins++; bySess[s].pnl += parseFloat(t.pnl) || 0; }
    });

    // By setup
    const bySetup = {};
    trades.forEach(t => {
      (t.setup || []).forEach(s => {
        if (!bySetup[s]) bySetup[s] = { wins: 0, total: 0 };
        bySetup[s].total++;
        if (t.result === 'Win') bySetup[s].wins++;
      });
    });

    // By symbol
    const byPair = {};
    trades.forEach(t => {
      if (!byPair[t.pair]) byPair[t.pair] = { wins: 0, total: 0, pnl: 0 };
      byPair[t.pair].total++;
      if (t.result === 'Win') byPair[t.pair].wins++;
      byPair[t.pair].pnl += parseFloat(t.pnl) || 0;
    });

    // By day
    const byDay = {};
    DAYS.forEach(d => { byDay[d] = { wins: 0, total: 0 }; });
    trades.forEach(t => {
      const d = new Date(t.date);
      const name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()];
      if (byDay[name]) { byDay[name].total++; if (t.result === 'Win') byDay[name].wins++; }
    });

    // Emotion win rate
    const byEmo = {};
    trades.forEach(t => {
      const e = t.emotion_pre || 'Unknown';
      if (!byEmo[e]) byEmo[e] = { wins: 0, total: 0 };
      byEmo[e].total++;
      if (t.result === 'Win') byEmo[e].wins++;
    });

    // Monthly
    const byMonth = {};
    trades.forEach(t => {
      const mk = toMonthKey(t.date);
      if (!byMonth[mk]) byMonth[mk] = { wins: 0, total: 0, pnl: 0 };
      byMonth[mk].total++;
      if (t.result === 'Win') byMonth[mk].wins++;
      byMonth[mk].pnl += parseFloat(t.pnl) || 0;
    });

    // Mistake frequency
    const byMistake = {};
    trades.forEach(t => {
      (t.mistakes || []).forEach(m => {
        byMistake[m] = (byMistake[m] || 0) + 1;
      });
    });

    // Consistency score
    const daysTraded = new Set(trades.map(t => t.date)).size;
    const tradesMistakes = trades.filter(t => (t.mistakes || []).length > 0).length;
    const tradesRuleBreaks = trades.filter(t => t.rules_checked && t.rules_checked.length < 4).length;
    const consistencyScore = Math.round(100 - (tradesMistakes / trades.length) * 30 - (tradesRuleBreaks / trades.length) * 20 + (winRate - 50) * 0.5);

    return {
      wins, losses, winRate, netPnl, avgRR, expectancy,
      equityPoints, maxDD, avgWin, avgLoss,
      bySess, bySetup, byPair, byDay, byEmo, byMonth, byMistake,
      consistencyScore: Math.min(100, Math.max(0, consistencyScore)),
    };
  }, [trades]);
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function Dashboard({ trades, stats, onAdd, onPage }) {
  if (!trades.length) return <EmptyState onAdd={onAdd} />;
  const recent = trades.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const topSetup = stats ? Object.entries(stats.bySetup).sort((a, b) => b[1].total - a[1].total)[0] : null;

  return (
    <div>
      <SectionHead
        title="Command Center"
        sub={`${trades.length} trades logged · Building your edge`}
        action={<button onClick={onAdd} style={S.btn}>+ Log Trade</button>}
      />

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '18px' }}>
        <StatCard label="NET P&L" value={fmtPnl(stats.netPnl)} color={stats.netPnl >= 0 ? C.green : C.red} accent={stats.netPnl >= 0 ? C.green : C.red} sub="All time" />
        <StatCard label="WIN RATE" value={`${fmt(stats.winRate, 1)}%`} color={C.gold} accent={C.gold} sub={`${stats.wins}W / ${stats.losses}L`} />
        <StatCard label="AVG R:R" value={`${fmt(stats.avgRR, 2)}R`} color={C.blue} accent={C.blue} sub="Per trade" />
        <StatCard label="EXPECTANCY" value={`${stats.expectancy >= 0 ? '+' : ''}${fmt(stats.expectancy, 2)}R`} color={stats.expectancy >= 0 ? C.green : C.red} accent={stats.expectancy >= 0 ? C.green : C.red} sub="Per trade edge" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* Equity mini */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '12px' }}>EQUITY CURVE</div>
          <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
            {stats.equityPoints.slice(-30).map((v, i, arr) => {
              const min = Math.min(...arr), max = Math.max(...arr);
              const range = max - min || 1;
              const h = Math.max(4, ((v - min) / range) * 72);
              return <div key={i} style={{ flex: 1, height: `${h}px`, background: v >= 0 ? C.green : C.red, borderRadius: '2px 2px 0 0', opacity: 0.8 }} />;
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ ...S.mono, fontSize: '10px', color: C.text3 }}>Max DD: <span style={{ color: C.red }}>-${fmt(stats.maxDD, 0)}</span></span>
            <span style={{ ...S.mono, fontSize: '10px', color: C.green }}>Total: {fmtPnl(stats.netPnl)}</span>
          </div>
        </div>

        {/* Scorecard */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>PERFORMANCE SCORECARD</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Win Rate', val: stats.winRate, color: C.gold },
              { label: 'Consistency', val: stats.consistencyScore, color: C.blue },
              { label: 'Clean Entries', val: Math.round(100 - (trades.filter(t => (t.mistakes || []).length > 0).length / trades.length) * 100), color: C.green },
            ].map(({ label, val, color }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '12px', color: C.text2 }}>{label}</span>
                  <span style={{ ...S.mono, fontSize: '11px', color }}>{fmt(val, 0)}%</span>
                </div>
                <Bar pct={val} color={color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent trades */}
      <div style={S.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em' }}>RECENT TRADES</div>
          <span onClick={() => onPage('trades')} style={{ ...S.mono, fontSize: '10px', color: C.gold, cursor: 'pointer' }}>VIEW ALL →</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recent.map((t, i) => {
            const g = grade(t.rr, t.result === 'Win');
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '10px 12px', background: C.bg2, borderRadius: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '13px', fontWeight: 700, color: g.color, flexShrink: 0 }}>{g.label}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontFamily: 'DM Mono, monospace', fontSize: '13px' }}>{t.pair}</span>
                    <span style={{ fontSize: '11px', color: t.direction === 'Long' ? C.green : C.red }}>{t.direction === 'Long' ? '▲' : '▼'} {t.direction}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: C.text3 }}>{t.date} · {t.session}</div>
                </div>
                <div style={{ ...S.mono, fontSize: '12px', color: t.rr ? C.gold : C.text3 }}>{t.rr ? `${t.rr}R` : '—'}</div>
                <div style={{ ...S.mono, fontSize: '12px', color: parseFloat(t.pnl) >= 0 ? C.green : C.red, minWidth: '70px', textAlign: 'right' }}>{fmtPnl(t.pnl)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TradeHistory({ trades, onEdit, onDelete }) {
  const [filter, setFilter] = useState({ result: 'all', session: 'all', pair: 'all', setup: 'all' });
  const [sort, setSort] = useState('date_desc');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let t = [...trades];
    if (filter.result !== 'all') t = t.filter(x => x.result === filter.result);
    if (filter.session !== 'all') t = t.filter(x => x.session === filter.session);
    if (filter.pair !== 'all') t = t.filter(x => x.pair === filter.pair);
    if (filter.setup !== 'all') t = t.filter(x => (x.setup || []).includes(filter.setup));
    if (search) t = t.filter(x => x.pair.toLowerCase().includes(search.toLowerCase()) || (x.notes_pre || '').toLowerCase().includes(search.toLowerCase()));
    if (sort === 'date_desc') t.sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === 'date_asc') t.sort((a, b) => a.date.localeCompare(b.date));
    else if (sort === 'pnl_desc') t.sort((a, b) => (parseFloat(b.pnl) || 0) - (parseFloat(a.pnl) || 0));
    else if (sort === 'rr_desc') t.sort((a, b) => (parseFloat(b.rr) || 0) - (parseFloat(a.rr) || 0));
    return t;
  }, [trades, filter, sort, search]);

  const selStyle = { ...S.input, padding: '7px 12px', fontSize: '11px' };

  return (
    <div>
      <SectionHead title="Trade History" sub={`${filtered.length} of ${trades.length} trades`} />

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search symbol, notes..." style={{ ...S.input, fontSize: '13px' }} />
        <select value={filter.result} onChange={e => setFilter(f => ({ ...f, result: e.target.value }))} style={selStyle}>
          <option value="all">All Results</option>
          <option>Win</option><option>Loss</option><option>Break Even</option><option>Partial</option>
        </select>
        <select value={filter.session} onChange={e => setFilter(f => ({ ...f, session: e.target.value }))} style={selStyle}>
          <option value="all">All Sessions</option>
          {SESSIONS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filter.pair} onChange={e => setFilter(f => ({ ...f, pair: e.target.value }))} style={selStyle}>
          <option value="all">All Symbols</option>
          {[...new Set(trades.map(t => t.pair))].map(p => <option key={p}>{p}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={selStyle}>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
          <option value="pnl_desc">Best P&L</option>
          <option value="rr_desc">Best R:R</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', color: C.text3, fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>No trades match your filters</div>
      ) : (
        <div style={{ ...S.card, padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: C.bg2 }}>
                {['Grade','Date','Symbol','Dir','Session','Setup','R:R','P&L','Emotion','Rules',''].map(h => (
                  <th key={h} style={{ ...S.mono, fontSize: '9px', color: C.text3, padding: '10px 14px', textAlign: 'left', whiteSpace: 'nowrap', letterSpacing: '0.12em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => {
                const g = grade(t.rr, t.result === 'Win');
                const rulesOk = (t.rules_checked || []).length;
                return (
                  <tr key={t.id || i} style={{ borderTop: `1px solid ${C.border}` }}>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '13px', fontWeight: 700, color: g.color }}>{g.label}</div>
                    </td>
                    <td style={{ padding: '11px 14px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: C.text3, whiteSpace: 'nowrap' }}>{t.date}</td>
                    <td style={{ padding: '11px 14px', fontWeight: 600, fontFamily: 'DM Mono, monospace', fontSize: '13px', color: C.text }}>{t.pair}</td>
                    <td style={{ padding: '11px 14px', color: t.direction === 'Long' ? C.green : C.red, fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 600 }}>{t.direction === 'Long' ? '▲ L' : '▼ S'}</td>
                    <td style={{ padding: '11px 14px', fontSize: '11px', color: C.text2 }}>{t.session}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {(t.setup || []).slice(0, 2).map(s => <Tag key={s}>{s}</Tag>)}
                        {(t.setup || []).length > 2 && <Tag color={C.text3}>+{t.setup.length - 2}</Tag>}
                      </div>
                    </td>
                    <td style={{ padding: '11px 14px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: t.rr ? C.gold : C.text3 }}>{t.rr ? `${t.rr}R` : '—'}</td>
                    <td style={{ padding: '11px 14px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: parseFloat(t.pnl) >= 0 ? C.green : C.red, whiteSpace: 'nowrap' }}>{fmtPnl(t.pnl)}</td>
                    <td style={{ padding: '11px 14px', fontSize: '11px', color: C.text3 }}>{t.emotion_pre || '—'}</td>
                    <td style={{ padding: '11px 14px' }}>
                      <span style={{ ...S.mono, fontSize: '10px', color: rulesOk >= 6 ? C.green : rulesOk >= 4 ? C.gold : C.red }}>{rulesOk}/{RULES.length}</span>
                    </td>
                    <td style={{ padding: '11px 14px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => onEdit(t)} style={{ padding: '5px 10px', borderRadius: '6px', background: C.goldDim, border: `1px solid rgba(201,168,76,0.2)`, color: C.gold, fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => onDelete(t.id)} style={{ padding: '5px 10px', borderRadius: '6px', background: 'rgba(239,68,68,0.08)', border: `1px solid rgba(239,68,68,0.2)`, color: C.red, fontFamily: 'DM Mono, monospace', fontSize: '10px', cursor: 'pointer' }}>Del</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Analytics({ trades, stats }) {
  if (!trades.length || !stats) return <div style={{ color: C.text3, textAlign: 'center', padding: '60px', fontFamily: 'DM Mono, monospace' }}>Log some trades to see analytics.</div>;

  const topSetups = Object.entries(stats.bySetup)
    .filter(([, v]) => v.total >= 1)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 8)
    .map(([k, v]) => ({ name: k, ...v, wr: (v.wins / v.total) * 100 }));

  const topPairs = Object.entries(stats.byPair)
    .sort((a, b) => b[1].pnl - a[1].pnl)
    .map(([k, v]) => ({ name: k, ...v, wr: (v.wins / v.total) * 100 }));

  const months = Object.entries(stats.byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6);

  const maxAbsPnl = Math.max(...months.map(([, m]) => Math.abs(m.pnl)), 1);

  return (
    <div>
      <SectionHead title="Deep Analytics" sub="Find your edge. Double down on what works." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '18px' }}>
        <StatCard label="TOTAL TRADES" value={trades.length} color={C.text} />
        <StatCard label="PROFIT FACTOR" value={stats.avgLoss > 0 ? fmt((stats.avgWin * stats.wins) / (stats.avgLoss * stats.losses || 1), 2) : '—'} color={C.purple} />
        <StatCard label="MAX DRAWDOWN" value={`-$${fmt(stats.maxDD, 0)}`} color={C.red} />
        <StatCard label="CONSISTENCY" value={`${stats.consistencyScore}%`} color={C.cyan} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* Win rate by setup */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>WIN RATE BY SETUP</div>
          {topSetups.length === 0 ? (
            <div style={{ color: C.text3, fontSize: '12px', textAlign: 'center', padding: '20px' }}>Log trades with setup tags to see data</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {topSetups.map(s => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '11px', color: C.text2 }}>{s.name}</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ ...S.mono, fontSize: '10px', color: C.text3 }}>{s.total} trades</span>
                      <span style={{ ...S.mono, fontSize: '11px', color: s.wr >= 60 ? C.green : s.wr >= 45 ? C.gold : C.red, fontWeight: 700 }}>{fmt(s.wr, 0)}%</span>
                    </div>
                  </div>
                  <Bar pct={s.wr} color={s.wr >= 60 ? C.green : s.wr >= 45 ? C.gold : C.red} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Symbol performance */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>SYMBOL PERFORMANCE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {topPairs.map(p => (
              <div key={p.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ ...S.mono, fontSize: '12px', fontWeight: 700, color: C.text }}>{p.name}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ ...S.mono, fontSize: '10px', color: p.wr >= 60 ? C.green : C.red }}>{fmt(p.wr, 0)}% WR</span>
                    <span style={{ ...S.mono, fontSize: '11px', color: p.pnl >= 0 ? C.green : C.red }}>{fmtPnl(p.pnl)}</span>
                  </div>
                </div>
                <Bar pct={p.wr} color={p.pnl >= 0 ? (p.wr >= 55 ? C.green : C.gold) : C.red} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* Monthly PnL */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>MONTHLY P&L</div>
          {months.length === 0 ? (
            <div style={{ color: C.text3, fontSize: '12px', textAlign: 'center', padding: '20px' }}>No data yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {months.map(([mk, m]) => (
                <div key={mk} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ ...S.mono, fontSize: '11px', color: C.text2, minWidth: '55px' }}>{mk.slice(0, 7)}</span>
                  <div style={{ flex: 1, height: '8px', background: C.bg3, borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(Math.abs(m.pnl) / maxAbsPnl) * 100}%`, height: '100%', background: m.pnl >= 0 ? C.green : C.red, borderRadius: '4px' }} />
                  </div>
                  <span style={{ ...S.mono, fontSize: '11px', color: m.pnl >= 0 ? C.green : C.red, minWidth: '70px', textAlign: 'right' }}>{fmtPnl(m.pnl)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* By day */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>WIN RATE BY DAY</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DAYS.map(d => {
              const data = stats.byDay[d] || { wins: 0, total: 0 };
              const wr = data.total > 0 ? (data.wins / data.total) * 100 : 0;
              return (
                <div key={d}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ ...S.mono, fontSize: '11px', color: C.text2 }}>{d}</span>
                    <span style={{ ...S.mono, fontSize: '11px', color: wr >= 60 ? C.green : wr >= 40 ? C.gold : C.text3 }}>
                      {data.total > 0 ? `${fmt(wr, 0)}% (${data.total})` : 'No data'}
                    </span>
                  </div>
                  {data.total > 0 && <Bar pct={wr} color={wr >= 60 ? C.green : wr >= 40 ? C.gold : C.red} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Long vs Short */}
      <div style={S.card}>
        <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '16px' }}>LONG vs SHORT BREAKDOWN</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {['Long', 'Short'].map(dir => {
            const t = trades.filter(x => x.direction === dir);
            const w = t.filter(x => x.result === 'Win').length;
            const wr = t.length ? (w / t.length) * 100 : 0;
            const pnl = t.reduce((a, x) => a + (parseFloat(x.pnl) || 0), 0);
            return (
              <div key={dir} style={{ padding: '16px', background: C.bg2, borderRadius: '10px', border: `1px solid ${dir === 'Long' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}` }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: dir === 'Long' ? C.green : C.red, marginBottom: '10px' }}>{dir === 'Long' ? '▲ LONG' : '▼ SHORT'}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                  <div><div style={{ ...S.mono, fontSize: '9px', color: C.text3, marginBottom: '3px' }}>TRADES</div><div style={{ fontWeight: 600, fontSize: '18px' }}>{t.length}</div></div>
                  <div><div style={{ ...S.mono, fontSize: '9px', color: C.text3, marginBottom: '3px' }}>WIN RATE</div><div style={{ fontWeight: 600, fontSize: '18px', color: dir === 'Long' ? C.green : C.red }}>{fmt(wr, 0)}%</div></div>
                  <div><div style={{ ...S.mono, fontSize: '9px', color: C.text3, marginBottom: '3px' }}>NET P&L</div><div style={{ fontWeight: 600, fontSize: '14px', color: pnl >= 0 ? C.green : C.red }}>{fmtPnl(pnl)}</div></div>
                </div>
                <Bar pct={wr} color={dir === 'Long' ? C.green : C.red} height={8} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Sessions({ trades, stats }) {
  if (!trades.length || !stats) return <div style={{ color: C.text3, textAlign: 'center', padding: '60px', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>Log trades to see session analytics.</div>;

  const sessData = SESSIONS.map(s => ({
    name: s,
    ...stats.bySess[s],
    wr: stats.bySess[s]?.total ? (stats.bySess[s].wins / stats.bySess[s].total) * 100 : 0,
  })).filter(s => s.total > 0).sort((a, b) => b.wr - a.wr);

  return (
    <div>
      <SectionHead title="Session Analytics" sub="Know exactly where your edge lives." />

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(sessData.length, 3)}, 1fr)`, gap: '12px', marginBottom: '18px' }}>
        {sessData.slice(0, 3).map(s => (
          <div key={s.name} style={{ ...S.card, borderColor: s.wr >= 60 ? 'rgba(34,197,94,0.2)' : s.wr >= 45 ? 'rgba(201,168,76,0.2)' : 'rgba(239,68,68,0.2)' }}>
            <div style={{ ...S.mono, fontSize: '10px', color: C.text3, marginBottom: '8px' }}>{s.name.toUpperCase()}</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: s.wr >= 60 ? C.green : s.wr >= 45 ? C.gold : C.red }}>{fmt(s.wr, 0)}%</div>
            <div style={{ fontSize: '11px', color: C.text3, marginTop: '4px' }}>{s.total} trades · {fmtPnl(s.pnl)}</div>
          </div>
        ))}
      </div>

      <div style={S.card}>
        <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '16px' }}>SESSION BREAKDOWN</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sessData.map(s => (
            <div key={s.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>{s.name}</span>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <span style={{ ...S.mono, fontSize: '11px', color: C.text3 }}>{s.total} trades</span>
                  <span style={{ ...S.mono, fontSize: '11px', color: s.pnl >= 0 ? C.green : C.red }}>{fmtPnl(s.pnl)}</span>
                  <span style={{ ...S.mono, fontSize: '13px', fontWeight: 700, color: s.wr >= 60 ? C.green : s.wr >= 45 ? C.gold : C.red, minWidth: '45px', textAlign: 'right' }}>{fmt(s.wr, 0)}%</span>
                </div>
              </div>
              <Bar pct={s.wr} color={s.wr >= 60 ? C.green : s.wr >= 45 ? C.gold : C.red} height={8} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Psychology({ trades, stats }) {
  if (!trades.length || !stats) return <div style={{ color: C.text3, textAlign: 'center', padding: '60px', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>Log trades to see psychology data.</div>;

  const emoData = Object.entries(stats.byEmo)
    .filter(([, v]) => v.total > 0)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([k, v]) => ({ name: k, ...v, wr: (v.wins / v.total) * 100 }));

  const mistakeData = Object.entries(stats.byMistake)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const fomaTrades = trades.filter(t => t.emotion_pre === 'FOMO').length;
  const revengeTrades = trades.filter(t => t.emotion_pre === 'Revenge Mode').length;
  const mistakeTrades = trades.filter(t => (t.mistakes || []).length > 0).length;

  return (
    <div>
      <SectionHead title="Psychology Tracker" sub="Your mind is your biggest edge — or your biggest leak." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '18px' }}>
        <StatCard label="DISCIPLINE SCORE" value={`${stats.consistencyScore}`} color={C.gold} />
        <StatCard label="MISTAKE TRADES" value={mistakeTrades} color={C.red} sub={`${fmt((mistakeTrades / trades.length) * 100, 0)}% of all trades`} />
        <StatCard label="FOMO ENTRIES" value={fomaTrades} color={C.red} sub={fomaTrades > 0 ? 'All likely losses' : 'Clean'} />
        <StatCard label="REVENGE TRADES" value={revengeTrades} color={C.red} sub={revengeTrades > 0 ? 'Stop immediately' : 'Clean'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        {/* Emotion win rate */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>WIN RATE BY EMOTIONAL STATE</div>
          {emoData.length === 0 ? (
            <div style={{ color: C.text3, fontSize: '12px', textAlign: 'center', padding: '20px' }}>Log emotion tags to see this data</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {emoData.map(e => (
                <div key={e.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: C.text2 }}>{e.name}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ ...S.mono, fontSize: '10px', color: C.text3 }}>{e.total} trades</span>
                      <span style={{ ...S.mono, fontSize: '11px', fontWeight: 700, color: e.wr >= 60 ? C.green : e.wr >= 45 ? C.gold : C.red }}>{fmt(e.wr, 0)}%</span>
                    </div>
                  </div>
                  <Bar pct={e.wr} color={e.wr >= 60 ? C.green : e.wr >= 45 ? C.gold : C.red} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mistakes */}
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '14px' }}>MISTAKE FREQUENCY</div>
          {mistakeData.length === 0 ? (
            <div style={{ color: C.text3, fontSize: '12px', textAlign: 'center', padding: '20px' }}>No mistakes logged yet — keep it that way!</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mistakeData.map(([m, count]) => {
                const maxCount = mistakeData[0][1];
                return (
                  <div key={m} style={{ padding: '10px 12px', background: C.bg2, borderRadius: '8px', borderLeft: `3px solid rgba(239,68,68,0.4)` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '12px', color: C.text2 }}>{m}</span>
                      <span style={{ ...S.mono, fontSize: '11px', color: C.red, fontWeight: 700 }}>{count}x</span>
                    </div>
                    <Bar pct={(count / maxCount) * 100} color={C.red} height={4} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Rules compliance */}
      <div style={S.card}>
        <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '16px' }}>RULE COMPLIANCE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {RULES.map(r => {
            const followed = trades.filter(t => (t.rules_checked || []).includes(r)).length;
            const pct = trades.length ? (followed / trades.length) * 100 : 0;
            return (
              <div key={r} style={{ padding: '12px', background: C.bg2, borderRadius: '9px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
                  <span style={{ fontSize: '12px', color: C.text2 }}>{r}</span>
                  <span style={{ ...S.mono, fontSize: '11px', color: pct >= 80 ? C.green : pct >= 60 ? C.gold : C.red }}>{fmt(pct, 0)}%</span>
                </div>
                <Bar pct={pct} color={pct >= 80 ? C.green : pct >= 60 ? C.gold : C.red} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AICoach({ trades, stats }) {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState(null);
  const [asked, setAsked] = useState(false);

  const generateInsights = useCallback(async () => {
    if (!stats || trades.length < 2) return;
    setLoading(true);
    setAsked(true);

    // Build compact summary for AI
    const summary = {
      total: trades.length,
      winRate: fmt(stats.winRate, 1),
      avgRR: fmt(stats.avgRR, 2),
      expectancy: fmt(stats.expectancy, 2),
      netPnl: fmt(stats.netPnl, 2),
      maxDD: fmt(stats.maxDD, 2),
      consistencyScore: stats.consistencyScore,
      topMistakes: Object.entries(stats.byMistake).sort(([, a], [, b]) => b - a).slice(0, 4).map(([k, v]) => `${k} (${v}x)`).join(', '),
      bestSession: Object.entries(stats.bySess).filter(([, v]) => v.total > 0).sort(([, a], [, b]) => (b.wins / b.total) - (a.wins / a.total))[0]?.[0] || 'None',
      worstSession: Object.entries(stats.bySess).filter(([, v]) => v.total > 0).sort(([, a], [, b]) => (a.wins / a.total) - (b.wins / b.total))[0]?.[0] || 'None',
      bestSetup: Object.entries(stats.bySetup).filter(([, v]) => v.total >= 2).sort(([, a], [, b]) => (b.wins / b.total) - (a.wins / a.total))[0]?.[0] || 'None',
      emotionWinRates: Object.entries(stats.byEmo).map(([k, v]) => `${k}: ${fmt((v.wins / v.total) * 100, 0)}%`).join(', '),
      recentTrades: trades.slice(-5).map(t => `${t.date} ${t.pair} ${t.direction} ${t.result} RR:${t.rr || '?'} PnL:${t.pnl || '?'} Mistakes:[${(t.mistakes || []).join(',')}]`).join('\n'),
    };

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are an elite trading coach — brutally honest, data-driven, zero fluff. Analyze this trader's journal data and give 4 specific, actionable insights.

Trading Stats:
- Trades: ${summary.total}, Win Rate: ${summary.winRate}%, Avg R:R: ${summary.avgRR}
- Net P&L: $${summary.netPnl}, Max Drawdown: -$${summary.maxDD}
- Expectancy: ${summary.expectancy}R per trade
- Consistency Score: ${summary.consistencyScore}/100
- Top Mistakes: ${summary.topMistakes || 'None logged'}
- Best Session: ${summary.bestSession}, Worst: ${summary.worstSession}
- Best Setup: ${summary.bestSetup}
- Emotion vs WR: ${summary.emotionWinRates || 'No data'}

Recent Trades:
${summary.recentTrades}

Respond with exactly 4 insights as JSON:
{"insights": [
  {"type": "strength|weakness|pattern|action", "title": "short title", "body": "2-3 sentences, specific, blunt, data-referenced. No generic advice.", "priority": "high|medium|low"},
  ...
]}

Only JSON. No preamble. Reference actual numbers from the data.`
          }],
        }),
      });

      const data = await res.json();
      let text = data.content?.[0]?.text || '';
      text = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(text);
      setInsights(parsed.insights);
    } catch (e) {
      setInsights([{
        type: 'action',
        title: 'Keep logging',
        body: `You have ${trades.length} trades logged. Your win rate is ${stats.winRate.toFixed(1)}% with avg ${stats.avgRR.toFixed(2)}R. Keep building the dataset for deeper AI analysis.`,
        priority: 'medium',
      }]);
    }
    setLoading(false);
  }, [trades, stats]);

  const typeColor = { strength: C.green, weakness: C.red, pattern: C.purple, action: C.gold };
  const typeIcon = { strength: '▲', weakness: '▼', pattern: '◈', action: '→' };

  return (
    <div>
      <SectionHead title="AI Coach" sub="Blunt, data-driven feedback. No generic advice." />

      {!asked ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>✦</div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>Ready to analyze your trades</div>
          <div style={{ fontSize: '13px', color: C.text3, marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
            {trades.length < 5 ? `You have ${trades.length} trade${trades.length !== 1 ? 's' : ''} logged. Log at least 5 for meaningful insights.` : `Analyzing ${trades.length} trades for patterns, leaks, and strengths.`}
          </div>
          <button onClick={generateInsights} disabled={trades.length < 2} style={{ ...S.btn, padding: '14px 32px', fontSize: '13px', opacity: trades.length < 2 ? 0.5 : 1 }}>
            ✦ ANALYZE MY TRADES
          </button>
        </div>
      ) : loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: C.text3, fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>
          <div style={{ fontSize: '28px', marginBottom: '16px' }}>◈</div>
          Analyzing {trades.length} trades...
        </div>
      ) : insights ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            {insights.map((ins, i) => (
              <div key={i} style={{
                ...S.card,
                borderLeft: `3px solid ${typeColor[ins.type] || C.gold}`,
                background: `linear-gradient(135deg, ${C.bg1}, ${C.bg2})`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <span style={{ ...S.mono, fontSize: '16px', color: typeColor[ins.type] || C.gold }}>{typeIcon[ins.type] || '→'}</span>
                  <span style={{ ...S.mono, fontSize: '11px', color: typeColor[ins.type] || C.gold, letterSpacing: '0.1em' }}>{ins.type?.toUpperCase()}</span>
                  <span style={{ marginLeft: 'auto', ...S.mono, fontSize: '9px', color: ins.priority === 'high' ? C.red : ins.priority === 'medium' ? C.gold : C.text3, background: ins.priority === 'high' ? 'rgba(239,68,68,0.1)' : C.bg3, padding: '2px 8px', borderRadius: '10px' }}>{ins.priority?.toUpperCase()}</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: C.text, marginBottom: '8px' }}>{ins.title}</div>
                <div style={{ fontSize: '13px', color: C.text2, lineHeight: 1.65 }}>{ins.body}</div>
              </div>
            ))}
          </div>
          <button onClick={generateInsights} style={{ ...S.btnGhost, width: '100%', padding: '12px' }}>↻ Refresh Analysis</button>
        </div>
      ) : null}
    </div>
  );
}

function Calendar({ trades }) {
  const year = new Date().getFullYear();
  const tradesByDate = useMemo(() => {
    const m = {};
    trades.forEach(t => { if (!m[t.date]) m[t.date] = []; m[t.date].push(t); });
    return m;
  }, [trades]);

  return (
    <div>
      <SectionHead title="Trade Calendar" sub={`${year} · Green = win day · Red = loss day · Mixed = both`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {Array.from({ length: 12 }, (_, m) => m).map(m => {
          const firstDay = new Date(year, m, 1).getDay();
          const daysInMonth = new Date(year, m + 1, 0).getDate();
          const monthName = new Date(year, m).toLocaleString('default', { month: 'short' }).toUpperCase();
          return (
            <div key={m} style={{ ...S.card, padding: '14px' }}>
              <div style={{ ...S.mono, fontSize: '10px', color: C.gold, marginBottom: '8px', letterSpacing: '0.1em' }}>{monthName}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
                {['S','M','T','W','T','F','S'].map((d, i) => (
                  <div key={i} style={{ fontSize: '8px', color: C.text3, textAlign: 'center', paddingBottom: '3px', fontFamily: 'DM Mono, monospace' }}>{d}</div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const dateStr = `${year}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayTrades = tradesByDate[dateStr] || [];
                  const hasWin = dayTrades.some(t => t.result === 'Win');
                  const hasLoss = dayTrades.some(t => t.result === 'Loss');
                  const bg = dayTrades.length === 0 ? 'transparent'
                    : hasWin && !hasLoss ? 'rgba(34,197,94,0.25)'
                    : !hasWin && hasLoss ? 'rgba(239,68,68,0.25)'
                    : 'rgba(201,168,76,0.25)';
                  const border = dayTrades.length > 0
                    ? `1px solid ${hasWin && !hasLoss ? 'rgba(34,197,94,0.4)' : hasLoss && !hasWin ? 'rgba(239,68,68,0.4)' : 'rgba(201,168,76,0.4)'}`
                    : `1px solid ${C.border}`;
                  return (
                    <div key={day} title={dayTrades.length > 0 ? `${dayTrades.length} trade(s)` : ''} style={{
                      aspectRatio: '1', borderRadius: '3px', background: bg, border,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '7px', fontFamily: 'DM Mono, monospace',
                      color: dayTrades.length > 0 ? C.text : C.border2,
                    }}>{day}</div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Progress({ trades, stats }) {
  if (!trades.length || !stats) return <div style={{ color: C.text3, textAlign: 'center', padding: '60px', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>Log trades to track your progress.</div>;

  const months = Object.entries(stats.byMonth).sort(([a], [b]) => a.localeCompare(b));
  const recentMonth = months.slice(-1)[0];
  const prevMonth = months.slice(-2, -1)[0];

  const improve = prevMonth && recentMonth ? {
    wr: ((recentMonth[1].wins / recentMonth[1].total) * 100) - ((prevMonth[1].wins / prevMonth[1].total) * 100),
    pnl: recentMonth[1].pnl - prevMonth[1].pnl,
  } : null;

  return (
    <div>
      <SectionHead title="Trader Progress" sub="Track improvement over time. Consistency is the edge." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '18px' }}>
        <StatCard label="CONSISTENCY SCORE" value={`${stats.consistencyScore}/100`} color={stats.consistencyScore >= 75 ? C.green : stats.consistencyScore >= 50 ? C.gold : C.red} sub={stats.consistencyScore >= 75 ? 'Professional level' : stats.consistencyScore >= 50 ? 'Developing' : 'Needs work'} />
        {improve && <>
          <StatCard label="WR CHANGE (MoM)" value={`${improve.wr >= 0 ? '+' : ''}${fmt(improve.wr, 1)}%`} color={improve.wr >= 0 ? C.green : C.red} sub="vs last month" />
          <StatCard label="PNL CHANGE (MoM)" value={fmtPnl(improve.pnl)} color={improve.pnl >= 0 ? C.green : C.red} sub="vs last month" />
        </>}
      </div>

      {/* Progress goals */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '16px' }}>PROGRESS GOALS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Win Rate Goal (65%)', current: stats.winRate, target: 65, color: C.gold },
              { label: 'Consistency (80%)', current: stats.consistencyScore, target: 80, color: C.blue },
              { label: 'Avg R:R Goal (2.5R)', current: (stats.avgRR / 2.5) * 100, target: 100, color: C.green, display: `${fmt(stats.avgRR, 2)}R / 2.5R` },
              { label: 'Trade Count (100)', current: (trades.length / 100) * 100, target: 100, color: C.purple, display: `${trades.length} / 100` },
            ].map(g => (
              <div key={g.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: C.text2 }}>{g.label}</span>
                  <span style={{ ...S.mono, fontSize: '11px', color: g.color }}>{g.display || `${fmt(g.current, 0)}%`}</span>
                </div>
                <Bar pct={Math.min(100, g.current)} color={g.color} height={8} />
              </div>
            ))}
          </div>
        </div>

        <div style={S.card}>
          <div style={{ ...S.mono, fontSize: '10px', color: C.text3, letterSpacing: '0.12em', marginBottom: '16px' }}>WHAT TO FIX NEXT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stats.winRate < 50 && (
              <div style={{ padding: '12px', background: 'rgba(239,68,68,0.07)', border: `1px solid rgba(239,68,68,0.15)`, borderRadius: '9px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: C.red, marginBottom: '4px' }}>Win rate below 50%</div>
                <div style={{ fontSize: '11px', color: C.text3 }}>Stop trading setups with low hit rate. Focus on only your top 2 setups until WR exceeds 55%.</div>
              </div>
            )}
            {stats.avgRR < 1.5 && (
              <div style={{ padding: '12px', background: 'rgba(201,168,76,0.07)', border: `1px solid rgba(201,168,76,0.15)`, borderRadius: '9px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: C.gold, marginBottom: '4px' }}>R:R below minimum</div>
                <div style={{ fontSize: '11px', color: C.text3 }}>Your avg R:R is {fmt(stats.avgRR, 2)}R. Only take trades with minimum 2R setup. No exceptions.</div>
              </div>
            )}
            {stats.byMistake['Moved Stop Loss'] >= 3 && (
              <div style={{ padding: '12px', background: 'rgba(239,68,68,0.07)', border: `1px solid rgba(239,68,68,0.15)`, borderRadius: '9px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: C.red, marginBottom: '4px' }}>Stop moving your stop loss</div>
                <div style={{ fontSize: '11px', color: C.text3 }}>You've moved your stop {stats.byMistake['Moved Stop Loss']}x. This is destroying your expectancy. Set it. Forget it.</div>
              </div>
            )}
            {stats.winRate >= 60 && stats.avgRR >= 2 && (
              <div style={{ padding: '12px', background: 'rgba(34,197,94,0.07)', border: `1px solid rgba(34,197,94,0.15)`, borderRadius: '9px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: C.green, marginBottom: '4px' }}>Strong foundation ✓</div>
                <div style={{ fontSize: '11px', color: C.text3 }}>WR {fmt(stats.winRate, 0)}% with {fmt(stats.avgRR, 2)}R avg. Focus on increasing position sizing on A+ setups only.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function JournalPage() {
  const [page, setPage] = useState('dashboard');
  const [trades, setTrades] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTrade, setEditTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    const { data } = await supabase.from('trades').select('*').eq('user_id', user.id).order('date', { ascending: false });
    if (data) setTrades(data.map(t => ({
      ...t,
      setup: Array.isArray(t.setup) ? t.setup : (t.concepts || []),
      market: Array.isArray(t.market) ? t.market : [],
      mistakes: Array.isArray(t.mistakes) ? t.mistakes : [],
      emotion_during: Array.isArray(t.emotion_during) ? t.emotion_during : [],
      rules_checked: Array.isArray(t.rules_checked) ? t.rules_checked : [],
    })));
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  const save = async (form) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const payload = {
      user_id: user.id,
      date: form.date, pair: form.pair, direction: form.direction, session: form.session,
      entry: form.entry || null, sl: form.sl || null, tp: form.tp || null,
      exit: form.exit || null, rr: form.rr || null, pnl: form.pnl || null,
      risk_pct: form.risk_pct || '1', result: form.result,
      setup: form.setup || [], market: form.market || [],
      mistakes: form.mistakes || [],
      emotion_pre: form.emotion_pre || '', emotion_during: form.emotion_during || [],
      emotion_post: form.emotion_post || '',
      rules_checked: form.rules_checked || [],
      notes_pre: form.notes_pre || '', notes_post: form.notes_post || '',
      screenshot_url: form.screenshot_url || '',
    };

    if (editTrade?.id) {
      await supabase.from('trades').update(payload).eq('id', editTrade.id);
    } else {
      await supabase.from('trades').insert(payload);
    }

    setShowForm(false);
    setEditTrade(null);
    load();
  };

  const del = async (id) => {
    if (!confirm('Delete this trade? This cannot be undone.')) return;
    await supabase.from('trades').delete().eq('id', id);
    load();
  };

  const stats = useStats(trades);
  const mistakeCount = trades.filter(t => (t.mistakes || []).length > 0 && !t.notes_post).length;

  const PAGES = [
    { id: 'dashboard', icon: '▦', label: 'Dashboard' },
    { id: 'trades', icon: '≡', label: 'Trade History' },
    { id: 'analytics', icon: '◎', label: 'Analytics' },
    { id: 'sessions', icon: '◷', label: 'Sessions' },
    { id: 'psychology', icon: '◉', label: 'Psychology' },
    { id: 'ai', icon: '✦', label: 'AI Coach' },
    { id: 'calendar', icon: '◫', label: 'Calendar' },
    { id: 'progress', icon: '↑', label: 'Progress' },
  ];

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
    * { box-sizing: border-box; }
    body { background: ${C.bg}; color: ${C.text}; font-family: 'DM Sans', sans-serif; margin: 0; }
    input, select, textarea { font-family: 'DM Sans', sans-serif; }
    input::placeholder, textarea::placeholder { color: ${C.text3}; }
    ::-webkit-scrollbar { width: 4px; height: 4px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${C.border2}; border-radius: 2px; }
    select option { background: ${C.bg2}; color: ${C.text}; }
    input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
    button { font-family: 'DM Sans', sans-serif; transition: opacity 0.15s; }
    button:hover { opacity: 0.85; }
    a { color: ${C.gold}; }
  `;

  return (
    <AuthGuard>
      <style>{globalStyles}</style>

      <div style={{ display: 'flex', minHeight: '100vh', background: C.bg }}>

        {/* ── SIDEBAR ─────────────────────────────────────────────────── */}
        <div style={{
          width: '220px', background: C.bg1, borderRight: `1px solid ${C.border}`,
          display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0,
        }}>
          {/* Logo */}
          <div style={{ padding: '22px 18px 16px', borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/ictflow-symbol.svg" alt="ICT Flow" style={{ width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: C.text, letterSpacing: '-0.3px' }}>ICT Flow Journal</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: C.text3, letterSpacing: '0.1em', marginTop: '1px' }}>TRADE JOURNAL</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
            {PAGES.map(p => (
              <NavBtn key={p.id} icon={p.icon} label={p.label}
                active={page === p.id} badge={p.id === 'ai' && mistakeCount > 0 ? mistakeCount : 0}
                onClick={() => setPage(p.id)} />
            ))}
          </div>

          {/* Bottom */}
          <div style={{ padding: '14px 12px', borderTop: `1px solid ${C.border}` }}>
            <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: '10px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: C.text3, letterSpacing: '0.1em' }}>DISCIPLINE SCORE</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: C.text3, marginTop: '1px' }}>This period</div>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: C.gold }}>
                {stats ? stats.consistencyScore : '—'}
              </div>
            </div>
            <button onClick={() => { setEditTrade(null); setShowForm(true); }} style={{ ...S.btn, width: '100%', marginTop: '10px', padding: '10px', fontSize: '11px' }}>
              + Log Trade
            </button>
          </div>
        </div>

        {/* ── MAIN ────────────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          <div style={{ maxWidth: '1100px', padding: '32px 36px', margin: '0 auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'DM Mono, monospace', fontSize: '12px', color: C.text3 }}>Loading your trades...</div>
            ) : (
              <>
                {page === 'dashboard' && <Dashboard trades={trades} stats={stats} onAdd={() => { setEditTrade(null); setShowForm(true); }} onPage={setPage} />}
                {page === 'trades' && <TradeHistory trades={trades} onEdit={(t) => { setEditTrade(t); setShowForm(true); }} onDelete={del} />}
                {page === 'analytics' && <Analytics trades={trades} stats={stats} />}
                {page === 'sessions' && <Sessions trades={trades} stats={stats} />}
                {page === 'psychology' && <Psychology trades={trades} stats={stats} />}
                {page === 'ai' && <AICoach trades={trades} stats={stats} />}
                {page === 'calendar' && <Calendar trades={trades} />}
                {page === 'progress' && <Progress trades={trades} stats={stats} />}
              </>
            )}
          </div>

          <div style={{ borderTop: `1px solid ${C.border}`, padding: '20px 36px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: C.text3 }}>
              ICT Flow Journal · {trades.length} trades · Track your edge. Every trade is data.
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: C.text3 }}>
              <a href="/courses" style={{ color: C.gold, textDecoration: 'none' }}>← Back to Courses</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── TRADE FORM MODAL ─────────────────────────────────────────── */}
      {showForm && (
        <TradeForm
          initial={editTrade}
          onSave={save}
          onCancel={() => { setShowForm(false); setEditTrade(null); }}
        />
      )}
    </AuthGuard>
  );
}
