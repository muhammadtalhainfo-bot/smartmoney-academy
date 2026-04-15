'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const STRATEGIES = [
  {
    slug: 'silver-bullet',
    title: 'The ICT Silver Bullet',
    creator: 'Michael J. Huddleston (ICT)',
    avatar: 'ICT',
    color: '#D4A843',
    tags: ['Forex', 'Indices'],
    description: 'A precision intraday strategy using three specific one-hour windows. Requires a liquidity sweep followed by a 1-minute FVG entry. Consistent 3:1+ risk-reward with tight stops.',
    stats: { winRate: '62%', rr: '3.2:1', trades: 'Daily', type: 'Intraday' },
    content: [
      { heading: 'Overview', text: 'The Silver Bullet is ICT\'s most structured intraday model. It operates in three specific windows: 3-4 AM EST, 10-11 AM EST, and 2-3 PM EST. Within each window, you wait for a liquidity sweep followed by displacement and a 1-minute FVG entry.' },
      { heading: 'Entry Conditions', items: ['Liquidity sweep of session high or low must occur first', 'A displacement candle creates a 1-minute FVG', 'Enter inside the FVG — ideally at the 50% midpoint', 'Stop loss below the sweep wick (bullish) or above (bearish)', 'Target: next opposing liquidity pool'] },
      { heading: 'Best Instruments', text: 'NAS100, S&P500, EURUSD, GBPUSD, XAUUSD. Works best on highly liquid instruments where the algorithm is most consistent.' },
      { heading: 'Time Windows', items: ['3:00-4:00 AM EST — London session (optional)', '10:00-11:00 AM EST — Primary NY macro window', '2:00-3:00 PM EST — Afternoon session'] },
      { heading: 'Rules', items: ['No trade if no liquidity sweep occurs in the window', 'One trade per window maximum', 'Do not carry trades between windows', 'If target not reached by end of window, manage manually'] },
    ],
  },
  {
    slug: 'amd-model',
    title: 'AMD Model (Power of Three)',
    creator: 'Michael J. Huddleston (ICT)',
    avatar: 'ICT',
    color: '#8B5CF6',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'Trade the three-phase daily cycle: Accumulation (Asia), Manipulation (London Judas Swing), Distribution (NY real move). Enter after the Judas Swing confirms with a ChoCH.',
    stats: { winRate: '58%', rr: '4.1:1', trades: 'Daily', type: 'Intraday' },
    content: [
      { heading: 'Overview', text: 'The AMD model describes how institutional money moves price every day. Asia accumulates liquidity, London manipulates (Judas Swing), and New York distributes in the true direction. Trading the distribution phase after confirmed manipulation is the core of this strategy.' },
      { heading: 'Setup Rules', items: ['Identify the daily bias from HTF analysis (bullish or bearish)', 'Wait for London session to create the Judas Swing', 'Judas Swing sweeps the Asian session high or low', 'Drop to 5M or 1M — wait for ChoCH confirming reversal', 'Enter in the true direction with an FVG or OB entry', 'Target: daily draw on liquidity (opposing session high/low)'] },
      { heading: 'Risk Management', items: ['Risk 1% per trade maximum', 'Stop beyond the Judas Swing wick', 'Move to break-even at 1:1', 'Scale out at 2:1, let remainder run to 4:1+'] },
      { heading: 'What to Avoid', items: ['Do not trade during NY lunch (12-1:30 PM EST)', 'Do not enter before the Judas Swing is confirmed complete', 'Do not trade against the HTF daily bias'] },
    ],
  },
  {
    slug: 'ote-entry-model',
    title: 'OTE Entry Model',
    creator: 'Michael J. Huddleston (ICT)',
    avatar: 'ICT',
    color: '#10B981',
    tags: ['Forex', 'Indices', 'Crypto'],
    description: 'Enter at the 62-79% Fibonacci retracement (Optimal Trade Entry) after a liquidity sweep and market structure shift. Works on all timeframes with clear invalidation.',
    stats: { winRate: '55%', rr: '3.5:1', trades: 'Swing/Intraday', type: 'Multi-TF' },
    content: [
      { heading: 'Overview', text: 'The OTE (Optimal Trade Entry) model enters trades at the 62-79% Fibonacci retracement of a prior swing. Combined with a liquidity sweep, market structure shift, and discount/premium analysis, it provides one of the best risk-reward entries in ICT.' },
      { heading: 'Setup Steps', items: ['Identify a significant swing high to low (bullish setup = low to high)', 'Apply Fibonacci from swing low to swing high', 'Wait for price to retrace to the 62-79% zone', 'Look for an OB or FVG within the OTE zone', 'Confirm with LTF ChoCH inside the OTE zone', 'Enter at the OTE — stop below the swing low'] },
      { heading: 'Key Levels', items: ['50% = Equilibrium (neutral — not ideal entry)', '62% = Start of OTE zone', '70.5% = Golden pocket', '79% = End of OTE zone', 'Beyond 79% = Setup is weakening'] },
    ],
  },
  {
    slug: 'fvg-liquidity-sweep',
    title: 'FVG + Liquidity Sweep',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#3B82F6',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'Wait for a liquidity sweep of a key level, then enter at the nearest Fair Value Gap created by the displacement candle. Simple, structured, high-probability setup.',
    stats: { winRate: '60%', rr: '2.8:1', trades: 'Daily', type: 'Intraday' },
    content: [
      { heading: 'Overview', text: 'This is the most fundamental ICT entry model. A liquidity sweep clears the stops, displacement creates an FVG, and price returns to fill the FVG before continuing. The sweep + FVG combination is the backbone of ICT trading.' },
      { heading: 'Entry Conditions', items: ['Key liquidity level identified (equal highs/lows, swing points)', 'Price sweeps the level with a clear wick or close beyond', 'Displacement candle moves rapidly away — creating an FVG', 'Price retraces into the FVG', 'Enter at FVG — ideally at the 50% midpoint', 'Stop beyond the sweep wick'] },
      { heading: 'Filters', items: ['Only take in direction of HTF bias', 'FVG must be in discount (for buys) or premium (for sells)', 'Best results during killzone hours', 'Avoid taking if FVG is too small (less than 5 pips for forex)'] },
    ],
  },
  {
    slug: 'breaker-block-model',
    title: 'Breaker Block Model',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#EF4444',
    tags: ['Forex', 'Indices'],
    description: 'Trade the flip of a failed order block. When an OB fails and price trades through it, re-enter at the breaker block for the continuation move. High RR with clear invalidation.',
    stats: { winRate: '52%', rr: '4.5:1', trades: 'Swing', type: 'Swing' },
    content: [
      { heading: 'Overview', text: 'A breaker block forms when a prior order block fails — price completely trades through it. The failed OB now acts as the opposite bias. A bearish OB that fails becomes a bullish breaker, and vice versa. These levels often produce the sharpest reactions.' },
      { heading: 'Setup Rules', items: ['Identify a prior OB that was completely violated by price', 'Mark the breaker zone (same as the original OB body)', 'Wait for price to return to the breaker zone', 'Look for LTF confirmation (ChoCH or FVG at breaker)', 'Enter at the breaker — stop beyond the breaker zone', 'Target: next major liquidity or OB in the direction'] },
      { heading: 'Why It Works', text: 'The breaker represents a failed institutional attempt — their orders were absorbed. When price returns to this level, the market remembers the failure and typically accelerates away from it.' },
    ],
  },
  {
    slug: 'turtle-soup',
    title: 'Turtle Soup Strategy',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#F59E0B',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'Fade false breakouts by entering opposite to a liquidity sweep. When price makes a new high/low then immediately reverses, enter the reversal with the next liquidity pool as target.',
    stats: { winRate: '56%', rr: '3.0:1', trades: 'Daily', type: 'Counter-trend' },
    content: [
      { heading: 'Overview', text: 'The Turtle Soup is a counter-trend strategy that trades against false breakouts. When price makes a new high or low but immediately reverses, it signals that the breakout was a liquidity sweep — not a real continuation. This reversal often produces fast, high-RR moves.' },
      { heading: 'Entry Conditions', items: ['Price makes a new swing high or low (breakout)', 'Price immediately reverses — closing back inside the range', 'Displacement candle in the opposite direction', 'Enter on the first pullback after the displacement', 'Stop beyond the false breakout wick', 'Target: opposite end of the range + liquidity beyond'] },
      { heading: 'Best Market Conditions', items: ['Ranging markets with clear equal highs/lows', 'Just before major session opens (pre-London, pre-NY)', 'When higher TF structure suggests reversal is due'] },
    ],
  },
  {
    slug: 'smt-divergence-entry',
    title: 'SMT Divergence Entry',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#14B8A6',
    tags: ['Forex', 'Indices'],
    description: 'Use Smart Money Technique divergence between correlated pairs (EURUSD/GBPUSD or NAS100/SP500) to confirm reversals at key ICT levels. Adds confluence to any setup.',
    stats: { winRate: '64%', rr: '2.9:1', trades: 'Daily', type: 'Confirmation' },
    content: [
      { heading: 'Overview', text: 'SMT Divergence occurs when two correlated instruments fail to confirm each other\'s move. When EURUSD makes a new low but GBPUSD does not, it signals bullish divergence — institutional strength in EURUSD. This divergence at a key ICT level (OB, FVG, OTE) creates very high probability setups.' },
      { heading: 'How to Use SMT', items: ['Open two correlated charts side by side (EURUSD + GBPUSD or NAS100 + SP500)', 'Mark the same swing highs and lows on both', 'Look for divergence: one makes a new high/low, the other does not', 'The stronger instrument (that did NOT make new extremes) is your buy/sell', 'Combine with OB, FVG, or OTE at the divergence level', 'Enter on the stronger instrument with LTF confirmation'] },
      { heading: 'Correlated Pairs', items: ['EURUSD ↔ GBPUSD (USD base pairs)', 'NAS100 ↔ S&P500 (US indices)', 'AUDUSD ↔ NZDUSD (commodity currencies)', 'XAUUSD ↔ DXY (inverse — gold vs dollar)'] },
    ],
  },
  {
    slug: 'midnight-open-model',
    title: 'Midnight Open Model',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#6366F1',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'Use the 12 AM EST candle open as a key reference level. Price often returns to the midnight open during the trading day. Trade rejections and sweeps of this level.',
    stats: { winRate: '57%', rr: '2.5:1', trades: 'Daily', type: 'Level-based' },
    content: [
      { heading: 'Overview', text: 'The Midnight Open (12 AM EST) is a key ICT reference level. The algorithm frequently returns to this level during the trading day, creating predictable reactions. Combined with session analysis, this level provides clear entry and exit points.' },
      { heading: 'How to Trade It', items: ['Mark the 12 AM EST candle open price at the start of each day', 'Price above midnight open = bullish bias for the day', 'Price below midnight open = bearish bias for the day', 'Look for price to sweep the midnight open and reverse', 'Or look for price to consolidate above/below and break with momentum', 'Use killzone timing for entries'] },
      { heading: 'Combining with Other Concepts', text: 'The midnight open is most powerful when it aligns with an FVG, OB, or OTE zone. A midnight open that sits inside a daily bullish FVG, for example, creates extremely strong confluence for a buy.' },
    ],
  },
];

const ALL_TAGS = ['All', 'Forex', 'Indices', 'Futures', 'Stocks', 'Crypto'];

export default function StrategiesPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = activeTag === 'All' ? STRATEGIES : STRATEGIES.filter(s => s.tags.includes(activeTag));
  const strategy = selected ? STRATEGIES.find(s => s.slug === selected) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .strat-card { transition: all 0.2s; cursor: pointer; }
        .strat-card:hover { border-color: rgba(212,168,67,0.8) !important; transform: translateY(-2px); }
      `}</style>

      <Navbar active="/strategies" />

      {!strategy ? (
        <>
          {/* HERO */}
          <section style={{ padding: '64px 24px 40px', textAlign: 'center', borderBottom: '1px solid rgba(212,168,67,0.75)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 300px at 50% 100%, rgba(212,168,67,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.75)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '20px' }}>
                ICT STRATEGY LIBRARY
              </div>
              <h1 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
                <span style={{ color: 'white' }}>PROVEN </span><span className="shine">STRATEGIES</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300 }}>
                Skip the guesswork. Start with ready-made ICT strategy playbooks with clear entry rules, risk management, and examples.
              </p>
            </div>
          </section>

          {/* FILTERS */}
          <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {ALL_TAGS.map(tag => (
                <button key={tag} onClick={() => setActiveTag(tag)} style={{ padding: '8px 18px', borderRadius: '100px', border: `1px solid ${activeTag === tag ? '#D4A843' : 'rgba(255,255,255,0.2)'}`, background: activeTag === tag ? 'rgba(212,168,67,0.75)' : 'transparent', color: activeTag === tag ? '#D4A843' : 'rgba(255,255,255,0.85)', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {filtered.map(s => (
                <div key={s.slug} className="strat-card" onClick={() => setSelected(s.slug)} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `${s.color}20`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '9px', color: s.color, fontWeight: 600, flexShrink: 0 }}>{s.avatar}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'white' }}>{s.title}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>{s.creator}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 300, marginBottom: '16px' }}>{s.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '16px' }}>
                    {[['Win Rate', s.stats.winRate], ['R:R', s.stats.rr], ['Freq', s.stats.trades], ['Type', s.stats.type]].map(([label, val]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: s.color }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>{tag}</span>
                    ))}
                  </div>
                  <button style={{ width: '100%', padding: '10px', background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: '8px', color: s.color, fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer' }}>
                    VIEW PLAYBOOK →
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* PLAYBOOK DETAIL */
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px' }}>
          <button onClick={() => setSelected(null)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', letterSpacing: '0.1em' }}>← BACK TO STRATEGIES</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `${strategy.color}20`, border: `1px solid ${strategy.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: strategy.color, fontWeight: 600 }}>{strategy.avatar}</div>
            <div>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: 'white', lineHeight: 1, letterSpacing: '0.05em' }}>{strategy.title}</h1>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>by {strategy.creator}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '32px' }}>
            {[['Win Rate', strategy.stats.winRate], ['R:R Avg', strategy.stats.rr], ['Frequency', strategy.stats.trades], ['Type', strategy.stats.type]].map(([label, val]) => (
              <div key={label} style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', marginBottom: '6px' }}>{label}</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: strategy.color }}>{val}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: 300, marginBottom: '32px', borderLeft: `3px solid ${strategy.color}`, paddingLeft: '16px' }}>{strategy.description}</p>

          {strategy.content.map((block, i) => (
            <div key={i} style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'white', letterSpacing: '0.05em', marginBottom: '12px' }}>{block.heading}</h2>
              {block.text && <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontWeight: 300 }}>{block.text}</p>}
              {block.items && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {block.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
                      <span style={{ color: strategy.color, flexShrink: 0 }}>→</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(212,168,67,0.04)', border: '1px solid rgba(212,168,67,0.22)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginBottom: '16px', fontWeight: 300 }}>Practice this strategy with our daily challenges</p>
            <Link href="/practice" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '8px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}>
              START DAILY PRACTICE →
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
