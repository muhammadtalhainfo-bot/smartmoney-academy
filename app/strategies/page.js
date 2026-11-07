'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const STRATEGIES = [
  {
    slug: 'silver-bullet',
    title: 'The ICT Silver Bullet',
    creator: 'Michael J. Huddleston (ICT)',
    avatar: 'ICT',
    color: '#E8C547',
    tags: ['Forex', 'Indices'],
    description: 'A model-specific intraday framework often studied around New York-time windows. One testable variant combines a defined liquidity-sweep rule, displacement and a 1-minute FVG; the pattern alone does not establish an edge.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Intraday' },
    content: [
      { heading: 'Overview', text: 'The Silver Bullet is an ICT intraday model commonly described with named time windows and setup conditions. Sources and variants can differ, so verify the New York-time convention and daylight-saving period. The rules below describe one testable variant—not a universal sequence or evidence that the setup will be profitable.' },
      { heading: 'Entry Conditions', items: ['For this variant, define a sweep of a selected session high/low as a required condition; compare it with a baseline without the filter if you want to measure its contribution', 'Define displacement and the 1-minute FVG boundaries before testing; the pattern is a candidate reference, not proof of institutional activity', 'If the entry uses an FVG, predefine whether the trigger is its boundary, midpoint or another rule; do not assume the 50% midpoint is superior', 'Place invalidation according to the chosen setup rule; a stop beyond the sweep wick is one variant to test, not a universal placement rule', 'Choose and record the target rule before the test; an opposing liquidity reference is a hypothesis, not a guaranteed destination'] },
      { heading: 'Best Instruments', text: 'NAS100, S&P500, EURUSD, GBPUSD, XAUUSD. It is commonly studied on liquid instruments; test suitability on your chosen market.' },
      { heading: 'Time Windows', items: ['3:00–4:00 AM New York local time (ET) — example window used by some sources; verify the convention', '10:00–11:00 AM New York local time (ET) — example window used by some sources; not a universal definition', '2:00–3:00 PM New York local time (ET) — example window used by some sources; verify the convention'] },
      { heading: 'Rules', items: ['Skip the trade if the sweep required by this prewritten variant does not occur', 'Set any trade-count limit in advance and evaluate it as part of the model', 'Use a prewritten exit/time-stop rule; do not improvise an exit merely because a named window ends', 'Define any time-based exit before testing; do not replace the rule with discretionary management after entry'] },
    ],
  },
  {
    slug: 'amd-model',
    title: 'AMD Model (Power of Three)',
    creator: 'Michael J. Huddleston (ICT)',
    avatar: 'ICT',
    color: '#8B5CF6',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'Study the three-phase AMD framework: Accumulation, Manipulation, and Distribution. The framework can be used to organize session context and test entry conditions around liquidity and market structure.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Intraday' },
    content: [
      { heading: 'Overview', text: 'The AMD model is an ICT framework for organizing a three-phase price narrative: accumulation, manipulation, and distribution. Traders can use it to structure observations and test trade conditions; it does not establish that every trading day follows the same sequence.' },
      { heading: 'Setup Rules', items: ['If the variant uses higher-timeframe context, define the rule in advance and allow the directional hypothesis to be wrong', 'If London-session behavior is part of the variant, define the time window; do not assume a Judas Swing must occur', 'If using the Asian range, define its timezone and boundaries, then specify whether crossing neither, one or both sides qualifies', 'If using 5M/1M execution, state why that timeframe is part of the model and define the ChoCH/MSS swing and wick/close rule; the label is not proof of reversal', 'Predefine whether an FVG or OB is required and how its entry trigger is measured; these labels alone are not entry signals', 'Predefine the target and exit rules; a draw-on-liquidity level is a candidate target, not a guaranteed destination'] },
      { heading: 'Risk Management', items: ['Use a predefined risk limit per trade that fits the account and tested strategy', 'Place the stop beyond the setup invalidation point', 'Manage break-even decisions according to the tested trade plan', 'Manage exits according to the tested trade plan rather than assuming a fixed reward target'] },
      { heading: 'What to Avoid', items: ['Be cautious during low-liquidity periods such as NY lunch', 'Do not enter before the setup conditions are confirmed', 'Avoid trades that conflict with the higher-timeframe context unless the plan explicitly allows them'] },
    ],
  },
  {
    slug: 'ote-entry-model',
    title: 'OTE Entry Model',
    creator: 'Michael J. Huddleston (ICT)',
    avatar: 'ICT',
    color: '#10B981',
    tags: ['Forex', 'Indices', 'Crypto'],
    description: 'A retracement framework commonly defined around the 62–79% Fibonacci area. Treat the zone as a candidate reference, not an entry signal; test swing selection, confirmation and invalidation rules on the chosen market and timeframe.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Multi-TF' },
    content: [
      { heading: 'Overview', text: 'The OTE (Optimal Trade Entry) label is commonly used for a 62–79% Fibonacci retracement of a selected swing. Swing selection, directional mapping and confirmation rules vary; the zone can be tested as one input, but entering solely because price reaches it is not a complete trading rule.' },
      { heading: 'Setup Steps', items: ['Select the swing using a written rule and state the Fibonacci direction convention for bullish and bearish cases', 'Apply Fibonacci according to the selected swing and the model’s stated direction convention', 'If the variant uses the 62–79% zone, record a touch as a candidate condition rather than an automatic entry', 'If an OB or FVG is a filter, define its boundaries and test whether it adds value beyond the retracement rule alone', 'If using lower-timeframe ChoCH/MSS, define the swing and wick/close rule; the label alone does not confirm a reversal', 'Define invalidation relative to the swing structure'] },
      { heading: 'Key Levels', items: ['50% = equilibrium under one common range convention; this label does not show whether an entry is attractive', '62% = commonly used lower reference for this OTE convention', '70.5% = a level highlighted by some variants; the label does not establish superior precision or performance', '79% = commonly used upper reference for this OTE convention', 'Beyond 79% = follow the prewritten invalidation rule; crossing this reference does not universally invalidate every variant'] },
    ],
  },
  {
    slug: 'fvg-liquidity-sweep',
    title: 'FVG + Liquidity Sweep',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#3B82F6',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'One testable variant combines a defined break-and-return condition at a reference level with a displacement FVG. Specify the sweep, gap and entry rules in advance; effectiveness requires testing rather than assumption.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Intraday' },
    content: [
      { heading: 'Overview', text: 'This is a commonly taught ICT-style entry model. A liquidity sweep may interact with stop orders, displacement can create an FVG, and price may later revisit that gap. The sweep + FVG combination is one framework used in ICT-style trading; the sequence and outcome are not guaranteed.' },
      { heading: 'Entry Conditions', items: ['Key liquidity level identified (equal highs/lows, swing points)', 'Define in advance whether the sweep rule uses a wick, a close beyond the level, or another observable condition', 'Displacement candle moves rapidly away — creating an FVG', 'Price retraces into the FVG', 'Consider the FVG, including its 50% midpoint, as a testable entry reference rather than a standalone signal', 'Stop beyond the sweep wick'] },
      { heading: 'Filters', items: ['Prefer setups aligned with the higher-timeframe bias defined in the tested plan', 'For this framework, test FVGs in discount for buys or premium for sells as a defined filter', 'Often studied during killzone hours; test whether session timing improves your results', 'If using a minimum-gap-size filter, define a market- and timeframe-appropriate measure in advance; do not apply one unvalidated 5-pip cutoff to every FX pair'] },
    ],
  },
  {
    slug: 'breaker-block-model',
    title: 'Breaker Block Model',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#EF4444',
    tags: ['Forex', 'Indices'],
    description: 'A testable model variant studies whether a violated order-block zone behaves differently on a revisit. Define the violation and zone boundaries in advance; failure does not guarantee a polarity flip or continuation.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Swing' },
    content: [
      { heading: 'Overview', text: 'Some ICT variants reclassify a violated order-block area as a breaker and test its behavior on a later revisit. Whether a wick or close counts as a violation, and how the breaker boundaries are drawn, should be defined in advance. A role reversal is a hypothesis, not automatic support/resistance or a prediction.' },
      { heading: 'Setup Rules', items: ['Mark the candidate order block and specify whether a wick, close or other rule counts as a violation', 'Draw the candidate breaker zone using the chosen variant’s explicit boundary convention', 'Treat a revisit as a possible test condition; no revisit means no entry under this variant', 'If using LTF confirmation, define the ChoCH/FVG rule before testing; neither label guarantees a reaction', 'Use a predefined entry trigger and invalidation rule rather than entering solely because price reaches the zone', 'Set a target rule before entry and evaluate missed, failed and successful outcomes; the next liquidity reference is not a guaranteed destination'] },
      { heading: 'How It Is Interpreted', text: 'The breaker label describes one way traders classify a failed price area. Whether the level acts as support, resistance or has no useful reaction is an empirical question for the defined model.' },
    ],
  },
  {
    slug: 'turtle-soup',
    title: 'Turtle Soup Strategy',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#F59E0B',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'A counter-trend false-breakout framework. One testable variant defines a reference high/low, an observable break and a close or other trigger back inside; neither a reversal nor a liquidity target is guaranteed.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Counter-trend' },
    content: [
      { heading: 'Overview', text: 'The Turtle Soup is a counter-trend framework that studies potential false breakouts. When price makes a new high or low and then reverses, the setup can be interpreted as a potential false breakout or liquidity sweep within this framework; the chart alone cannot establish the underlying cause. This reversal can produce fast moves, but outcomes vary by market and conditions.' },
      { heading: 'Entry Conditions', items: ['Define the reference high/low and lookback window before testing what counts as a breakout', 'Specify the return trigger (for example, a close back inside within a fixed number of bars) rather than relying on the vague word immediately', 'If displacement is required, define its observable threshold and direction in advance', 'If the model uses a pullback entry, define the pullback trigger and the condition that cancels the setup', 'Set invalidation from the tested setup definition; a stop beyond the extreme is one possible rule', 'Predefine the target and exit rule; do not assume price will reach the opposite range edge or liquidity beyond it'] },
      { heading: 'Candidate Filters to Test', items: ['Define and test a range condition, if the strategy uses one', 'Compare pre-session timing with other windows rather than assuming it improves results', 'Test any higher-timeframe context filter against the same baseline'] },
    ],
  },
  {
    slug: 'smt-divergence-entry',
    title: 'SMT Divergence Entry',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#14B8A6',
    tags: ['Forex', 'Indices'],
    description: 'Use Smart Money Technique divergence between correlated pairs (EURUSD/GBPUSD or NAS100/SP500) as potential confirmation at key ICT levels. It can add confluence, but should not be treated as proof of a reversal.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Confirmation' },
    content: [
      { heading: 'Overview', text: 'SMT Divergence occurs when two correlated instruments fail to confirm each other\'s move. When EURUSD makes a new low but GBPUSD does not, it can be treated as bullish divergence within this framework; it does not by itself establish institutional positioning. This divergence at a key ICT level (OB, FVG, OTE) can provide additional confluence, but its effectiveness should be evaluated with your own testing.' },
      { heading: 'How to Use SMT', items: ['Open two correlated charts side by side (EURUSD + GBPUSD or NAS100 + SP500)', 'Mark the same swing highs and lows on both', 'Look for divergence: one makes a new high/low, the other does not', 'If the instruments diverge, use the non-confirming instrument only as an input under a prewritten rule; do not treat it as an automatic directional signal', 'Combine with OB, FVG, or OTE at the divergence level', 'Enter on the stronger instrument with LTF confirmation'] },
      { heading: 'Correlated Pairs', items: ['EURUSD ↔ GBPUSD (USD base pairs)', 'NAS100 ↔ S&P500 (US indices)', 'AUDUSD ↔ NZDUSD (commodity currencies)', 'XAUUSD and DXY are often discussed as inversely related, but the relationship can vary by period and market conditions'] },
    ],
  },
  {
    slug: 'midnight-open-model',
    title: 'Midnight Open Model',
    creator: 'ICT Flow',
    avatar: 'SMA',
    color: '#6366F1',
    tags: ['Forex', 'Indices', 'Futures'],
    description: 'Use the 12:00 AM New York local-time open as a reference level in a testable model. Some traders study revisits, but a rejection or sweep is not an entry signal unless it meets prewritten conditions.',
    stats: { winRate: 'Not verified', rr: 'Not verified', trades: 'Varies', type: 'Level-based' },
    content: [
      { heading: 'Overview', text: 'The Midnight Open (12:00 AM New York local time, ET) is a reference level used in some ICT-style frameworks. Some traders study this level during the trading day; its usefulness should be evaluated through testing. Combined with session analysis, it can serve as a reference in a testable entry and exit plan.' },
      { heading: 'How to Trade It', items: ['Mark the 12:00 AM New York local-time candle open for the selected trading day, using a consistent provider/session boundary', 'Use price relative to the midnight open as one contextual input rather than a standalone bias rule', 'A sweep-and-return can be defined as one entry hypothesis; predefine the return trigger and invalidation', 'A consolidation-break trigger is a separate hypothesis; define consolidation, momentum and invalidation before comparing it with the sweep variant', 'Treat killzone timing as an optional filter and measure whether it improves results over the same baseline'] },
      { heading: 'Combining with Other Concepts', text: 'Some variants combine the midnight open with an FVG, OB or OTE. Define each filter and compare the combined rule with a baseline; visual overlap alone does not establish extra predictive value.' }
    ],
  },
];

const ALL_TAGS = ['All', 'Forex', 'Indices', 'Futures', 'Stocks', 'Crypto'];

export default function StrategiesPage() {
  const [activeTag, setActiveTag] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => activeTag === 'All' ? STRATEGIES : STRATEGIES.filter(s => s.tags.includes(activeTag)), [activeTag]);
  const strategy = selected ? STRATEGIES.find(s => s.slug === selected) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .strat-card { transition: all 0.2s; cursor: pointer; }
        .strat-card:hover { border-color: #E8C547 !important; transform: translateY(-2px); }
      `}</style>

      <Navbar active="/strategies" />

      {!strategy ? (
        <>
          {/* HERO */}
          <section style={{ padding: '64px 24px 40px', textAlign: 'center', borderBottom: '1px solid rgba(232,197,71,0.95)', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 600px 300px at 50% 100%, rgba(212,168,67,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(232,197,71,0.95)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#E8C547', marginBottom: '20px' }}>
                ICT STRATEGY LIBRARY
              </div>
              <h1 className="font-display" style={{ fontSize: 'clamp(48px, 8vw, 80px)', lineHeight: 1, marginBottom: '12px' }}>
                <span style={{ color: 'white' }}>ICT </span><span className="shine">STRATEGIES</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300 }}>
                Skip the guesswork. Start with structured ICT strategy playbooks with entry rules, risk management, and examples. Performance figures are not presented as independently verified results.
              </p>
            </div>
          </section>

          {/* FILTERS */}
          <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {ALL_TAGS.map(tag => (
                <button type="button" key={tag} onClick={() => setActiveTag(tag)} aria-pressed={activeTag === tag} style={{ padding: '8px 18px', borderRadius: '100px', border: `1px solid ${activeTag === tag ? '#E8C547' : 'rgba(255,255,255,0.6)'}`, background: activeTag === tag ? 'rgba(232,197,71,0.95)' : 'transparent', color: activeTag === tag ? '#080808' : 'rgba(255,255,255,0.90)', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', cursor: 'pointer' }}>
                  {tag}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,320px), 1fr))', gap: '16px' }}>
              {filtered.map(s => (
                <button type="button" key={s.slug} className="strat-card" onClick={() => setSelected(s.slug)} aria-label={`Open ${s.title} strategy playbook`} style={{ width: '100%', textAlign: 'left', color: 'inherit', background: '#111111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `${s.color}20`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: s.color, fontWeight: 600, flexShrink: 0 }}>{s.avatar}</div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: 'white' }}>{s.title}</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.78)', marginTop: '2px' }}>{s.creator}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, fontWeight: 300, marginBottom: '16px' }}>{s.description}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '6px', marginBottom: '16px' }}>
                    {[['Win Rate', s.stats.winRate], ['R:R', s.stats.rr], ['Freq', s.stats.trades], ['Type', s.stats.type]].map(([label, val]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.78)', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: s.color }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {s.tags.map(tag => (
                      <span key={tag} style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.82)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>{tag}</span>
                    ))}
                  </div>
                  <span aria-hidden="true" style={{ display: 'block', width: '100%', boxSizing: 'border-box', padding: '10px', background: `${s.color}15`, border: `1px solid ${s.color}30`, borderRadius: '8px', color: s.color, fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', textAlign: 'center' }}>
                    VIEW PLAYBOOK →
                  </span>
                </button>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* PLAYBOOK DETAIL */
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px 80px' }}>
          <button type="button" onClick={() => setSelected(null)} style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px', letterSpacing: '0.1em' }}>← BACK TO STRATEGIES</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: `${strategy.color}20`, border: `1px solid ${strategy.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: strategy.color, fontWeight: 600 }}>{strategy.avatar}</div>
            <div>
              <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '36px', color: 'white', lineHeight: 1, letterSpacing: '0.05em' }}>{strategy.title}</h1>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.65)', marginTop: '4px' }}>by {strategy.creator}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginBottom: '32px' }}>
            {[['Win Rate', strategy.stats.winRate], ['R:R Avg', strategy.stats.rr], ['Frequency', strategy.stats.trades], ['Type', strategy.stats.type]].map(([label, val]) => (
              <div key={label} style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.78)', letterSpacing: '0.1em', marginBottom: '6px' }}>{label}</div>
                <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: strategy.color }}>{val}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, fontWeight: 300, marginBottom: '32px', borderLeft: `3px solid ${strategy.color}`, paddingLeft: '16px' }}>{strategy.description}</p>

          {strategy.content.map((block, i) => (
            <div key={i} style={{ marginBottom: '28px' }}>
              <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: 'white', letterSpacing: '0.05em', marginBottom: '12px' }}>{block.heading}</h2>
              {block.text && <p style={{ fontSize: '14px', color: '#c5ccd6', lineHeight: 1.8, fontWeight: 300 }}>{block.text}</p>}
              {block.items && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {block.items.map((item, j) => (
                    <li key={j} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '14px', color: '#c5ccd6', lineHeight: 1.6 }}>
                      <span style={{ color: strategy.color, flexShrink: 0 }}>→</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(212,168,67,0.04)', border: '1px solid rgba(212,168,67,0.22)', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginBottom: '16px', fontWeight: 300 }}>Practice this strategy with our daily challenges</p>
            <Link href="/practice" style={{ display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#E8C547,#8A6B28)', borderRadius: '8px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 600 }}>
              START DAILY PRACTICE →
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
