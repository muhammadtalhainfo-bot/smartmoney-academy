'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const TOOLS = [
  {
    id: 'checklist',
    emoji: '✅',
    title: 'ICT Risk Management Checklist',
    subtitle: 'Pre-Trade · Post-Trade · Weekly · Monthly',
    desc: 'The complete checklist professional ICT traders use before every trade, after every session, and for weekly and monthly reviews. Takes 30 seconds and saves accounts.',
    color: '#34D399',
    sections: [
      {
        title: 'PRE-TRADE CHECKLIST (30 Seconds)',
        items: [
          { label: 'MARKET CONTEXT', checks: [
            'Checked economic calendar for news in next 2 hours',
            'Identified daily bias (bullish / bearish / neutral)',
            'Marked higher timeframe structure (4H / Daily)',
            'Identified nearest BSL and SSL',
            'Noted current killzone timing',
          ]},
          { label: 'SETUP QUALITY', checks: [
            'Price is at a valid PD Array (OB, FVG, BB, etc.)',
            'Setup is in premium (short) or discount (long)',
            'Minimum 3 confluences present',
            'Killzone alignment confirmed',
            'Daily bias alignment confirmed',
          ]},
          { label: 'RISK CALCULATION', checks: [
            'Stop loss placed at technical invalidation',
            'Position size calculated for 1% risk',
            'R:R is minimum 1:2 (preferably 1:3+)',
            'Portfolio heat under 6% (including this trade)',
          ]},
          { label: 'EMOTIONAL STATE', checks: [
            'Calm and focused (not excited, fearful, or revengeful)',
            'Not trading after 2+ consecutive losses',
            'No FOMO or urgency to enter',
          ]},
        ],
      },
      {
        title: 'POST-TRADE CHECKLIST (2 Minutes)',
        items: [
          { label: 'IMMEDIATE', checks: [
            'Recorded entry, exit, and result in journal',
            'Screenshot of trade result taken',
            'Noted if all rules were followed (yes/no)',
            'Noted emotional state during the trade',
          ]},
          { label: 'END OF DAY (5 minutes)', checks: [
            'Total P&L for the day calculated',
            'Did I hit daily loss limit? (3%)',
            'Did I follow my plan on every trade?',
            'Lessons learned written down',
          ]},
        ],
      },
      {
        title: 'THE NON-NEGOTIABLES',
        items: [
          { label: 'THESE ARE NEVER BROKEN', checks: [
            'NEVER risk more than 2% per trade',
            'NEVER trade without a stop loss',
            'NEVER move your stop loss further away after entry',
            'NEVER revenge trade',
            'NEVER trade outside killzones',
            'NEVER trade against daily bias',
            'NEVER risk more than 6% portfolio heat total',
            'NEVER skip journaling',
            'NEVER trade when emotional',
            'NEVER change strategy mid-month',
          ]},
        ],
      },
      {
        title: 'EMERGENCY PROTOCOLS',
        items: [
          { label: 'IF YOU HIT DAILY LOSS LIMIT (3%)', checks: [
            'Close ALL positions immediately',
            'Close TradingView and all charts',
            'Step away for minimum 2 hours',
            'Do NOT return to charts today',
            'Journal what went wrong',
            'Review tomorrow with fresh eyes',
          ]},
          { label: 'IF YOU FEEL REVENGE TRADING URGE', checks: [
            'Close charts immediately',
            'Do 20 pushups or take a cold shower',
            'Call or text your accountability partner',
            'Write: I will not revenge trade today',
            'Return tomorrow only if fully calm',
          ]},
        ],
      },
    ],
  },
  {
    id: 'plan',
    emoji: '📋',
    title: 'ICT Trading Plan Template',
    subtitle: 'Fill-in-the-blank · 10 Sections · Professional',
    desc: 'A professional trading plan is your roadmap to consistency. Without it, you are not a trader -- you are a gambler. Fill out this template and post it next to your monitor.',
    color: '#D4A843',
    sections: [
      {
        title: 'PART 1: TRADER PROFILE',
        items: [
          { label: 'YOUR INFORMATION', fields: [
            'Trading Experience: Beginner (0-1yr) / Intermediate (1-3yr) / Advanced (3+yr)',
            'Available Capital: $_______________',
            'Risk Tolerance: Conservative (0.5%) / Moderate (1%) / Aggressive (2%)',
            'Trading Style: Scalping / Day Trading / Swing Trading',
            'Available Time: Full-time (6+ hrs) / Part-time (2-4 hrs) / Limited (1-2 hrs)',
          ]},
        ],
      },
      {
        title: 'PART 2: MARKET SELECTION',
        items: [
          { label: 'INSTRUMENTS I TRADE', fields: [
            'Primary: Forex / Indices (NAS100, US30) / Gold / Crypto',
            'Specific pairs: 1. _____________ 2. _____________ 3. _____________',
            'Pairs I NEVER trade: 1. _____________ 2. _____________',
          ]},
        ],
      },
      {
        title: 'PART 3: STRATEGY DEFINITION',
        items: [
          { label: 'ENTRY CRITERIA (ALL must be met)', fields: [
            '1. Daily bias is: _______________',
            '2. Killzone: _______________',
            '3. PD Array type: _______________',
            '4. Premium or Discount: _______________',
            '5. Minimum confluences required: _____',
            '6. Maximum risk per trade: _____%',
          ]},
          { label: 'EXIT CRITERIA', fields: [
            'Stop loss placement rule: _______________',
            'Take profit 1 at R:R: _____',
            'Take profit 2 at R:R: _____',
            'Trailing stop rule: _______________',
          ]},
        ],
      },
      {
        title: 'PART 4: RISK MANAGEMENT RULES',
        items: [
          { label: 'HARD LIMITS', fields: [
            'Risk per trade: _____%',
            'Maximum risk per day: _____%',
            'Maximum risk per week: _____%',
            'Maximum open positions at once: _____',
            'Daily loss limit (stop trading after): _____%',
            'Weekly loss limit: _____%',
            'Monthly loss limit: _____%',
            'Consecutive losses before stopping for day: _____',
          ]},
        ],
      },
      {
        title: 'PART 5: TRADING SCHEDULE',
        items: [
          { label: 'TRADING WINDOWS', fields: [
            'Trading days: Mon / Tue / Wed / Thu / Fri',
            'Pre-market analysis time: _____ to _____',
            'London session: _____ to _____ (local time)',
            'New York session: _____ to _____ (local time)',
            'Maximum trading hours per day: _____ hours',
          ]},
          { label: 'NO-TRADE CONDITIONS', fields: [
            'Before high-impact news (30 min): YES / NO',
            'When daily loss limit is hit: YES / NO',
            'When 3 consecutive losses occur: YES / NO',
            'When emotionally compromised: YES / NO',
          ]},
        ],
      },
      {
        title: 'PART 6: PSYCHOLOGY RULES',
        items: [
          { label: 'PRE-TRADE ROUTINE', fields: [
            '1. _______________',
            '2. _______________',
            '3. _______________',
          ]},
          { label: 'AFTER A LOSS', fields: [
            '1. _______________',
            '2. _______________',
          ]},
          { label: 'ACCOUNTABILITY', fields: [
            'Trading partner or mentor: _______________',
            'Check-in frequency: _______________',
          ]},
        ],
      },
      {
        title: 'PART 7: GOALS & METRICS',
        items: [
          { label: 'MONTHLY PROCESS GOALS', fields: [
            'Win rate target: _____%',
            'Average R:R target: _____',
            'Maximum trades per week: _____',
            'Journal consistency target: _____%',
          ]},
          { label: 'QUARTERLY REVIEW QUESTIONS', fields: [
            'Did I follow my plan? _____%',
            'Biggest improvement this quarter: _______________',
            'Biggest weakness: _______________',
            'Focus for next quarter: _______________',
          ]},
        ],
      },
    ],
  },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
  .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
  .font-mono-c { font-family: 'DM Mono', monospace; }
  .font-body { font-family: 'DM Sans', sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
`;

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState('checklist');
  const [checked, setChecked] = useState({});
  const tool = TOOLS.find(t => t.id === activeTool);

  const toggleCheck = (key) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalChecks = tool.sections.reduce((acc, s) =>
    acc + s.items.reduce((a, i) => a + ((i.checks || i.fields || []).length), 0), 0);
  const doneChecks = Object.values(checked).filter(Boolean).length;
  const progress = totalChecks > 0 ? Math.round((doneChecks / totalChecks) * 100) : 0;

  return (
    <>
      <style>{styles}</style>
      <div className="font-body" style={{ background: '#080808', minHeight: '100vh', color: 'white' }}>
        <Navbar />

        {/* HERO */}
        <section style={{ paddingTop: '100px', paddingBottom: '60px', textAlign: 'center', borderBottom: '1px solid rgba(212,168,67,0.08)' }}>
          <div className="font-mono-c" style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(212,168,67,0.7)', marginBottom: '16px', textTransform: 'uppercase' }}>// Trader Tools</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(42px,7vw,80px)', color: 'white', lineHeight: 1, marginBottom: '16px' }}>
            TRADING<br />
            <span style={{ color: '#D4A843' }}>TOOLS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Professional checklists and templates used by disciplined ICT traders. Free. No signup required.
          </p>
        </section>

        {/* TOOL TABS */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {TOOLS.map(t => (
              <button
                key={t.id}
                onClick={() => { setActiveTool(t.id); setChecked({}); }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: `1px solid ${activeTool === t.id ? t.color : 'rgba(255,255,255,0.08)'}`,
                  background: activeTool === t.id ? `${t.color}18` : 'transparent',
                  color: activeTool === t.id ? t.color : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '1px',
                  transition: 'all 0.2s',
                }}
              >
                {t.emoji} {t.title}
              </button>
            ))}
          </div>

          {/* TOOL HEADER */}
          <div style={{ background: '#0D0D0D', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '28px 32px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div className="font-mono-c" style={{ fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
                  {tool.subtitle}
                </div>
                <h2 className="font-display" style={{ fontSize: '32px', color: 'white', marginBottom: '8px' }}>
                  {tool.emoji} {tool.title}
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, maxWidth: '560px' }}>
                  {tool.desc}
                </p>
              </div>
              {activeTool === 'checklist' && (
                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: tool.color }}>{progress}%</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Mono, monospace' }}>COMPLETE</div>
                </div>
              )}
            </div>
            {activeTool === 'checklist' && (
              <div style={{ marginTop: '16px', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px' }}>
                <div style={{ height: '4px', width: `${progress}%`, background: tool.color, borderRadius: '2px', transition: 'width 0.3s' }} />
              </div>
            )}
          </div>

          {/* SECTIONS */}
          {tool.sections.map((section, si) => (
            <div key={si} style={{ marginBottom: '24px', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', background: 'rgba(212,168,67,0.05)', borderBottom: '1px solid rgba(212,168,67,0.08)' }}>
                <span className="font-mono-c" style={{ fontSize: '11px', letterSpacing: '2px', color: '#D4A843', textTransform: 'uppercase' }}>
                  {section.title}
                </span>
              </div>
              <div style={{ padding: '20px 24px' }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ marginBottom: ii < section.items.length - 1 ? '24px' : '0' }}>
                    <div className="font-mono-c" style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '12px' }}>
                      {item.label}
                    </div>
                    {(item.checks || []).map((check, ci) => {
                      const key = `${si}-${ii}-${ci}`;
                      return (
                        <div
                          key={ci}
                          onClick={() => toggleCheck(key)}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px', background: checked[key] ? 'rgba(52,211,153,0.05)' : 'transparent', transition: 'background 0.15s' }}
                        >
                          <div style={{
                            width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                            border: `1.5px solid ${checked[key] ? '#34D399' : 'rgba(255,255,255,0.2)'}`,
                            background: checked[key] ? '#34D399' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.15s',
                          }}>
                            {checked[key] && <span style={{ color: '#080808', fontSize: '12px', fontWeight: 700 }}>✓</span>}
                          </div>
                          <span style={{ fontSize: '14px', color: checked[key] ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.75)', textDecoration: checked[key] ? 'line-through' : 'none', lineHeight: 1.5, transition: 'all 0.15s' }}>
                            {check}
                          </span>
                        </div>
                      );
                    })}
                    {(item.fields || []).map((field, fi) => (
                      <div key={fi} style={{ padding: '9px 14px', marginBottom: '6px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                        <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{field}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* RESET / NOTE */}
          {activeTool === 'checklist' && (
            <div style={{ textAlign: 'center', paddingTop: '16px' }}>
              <button
                onClick={() => setChecked({})}
                style={{ padding: '10px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '12px', fontFamily: 'DM Mono, monospace' }}
              >
                Reset Checklist
              </button>
            </div>
          )}

          {activeTool === 'plan' && (
            <div style={{ marginTop: '16px', padding: '20px 24px', background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                Print this plan, fill it out by hand, and post it next to your monitor.<br />
                Read it before every session. Update it monthly as you grow.<br />
                <span style={{ color: '#D4A843' }}>This plan is your contract with yourself. Break it and you break your account.</span>
              </p>
            </div>
          )}
        </section>

        {/* BOTTOM CTA */}
        <section style={{ textAlign: 'center', padding: '60px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="font-mono-c" style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(212,168,67,0.7)', marginBottom: '16px', textTransform: 'uppercase' }}>// Apply These Rules</div>
          <h2 className="font-display" style={{ fontSize: '48px', color: 'white', marginBottom: '16px' }}>
            START YOUR<br /><span style={{ color: '#D4A843' }}>ICT JOURNEY</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '28px' }}>
            These tools mean nothing without the knowledge behind them. Start with Module 1 free.
          </p>
          <Link href="/lesson/1">
            <span style={{ display: 'inline-block', padding: '14px 32px', background: 'linear-gradient(135deg,#D4A843,#F0C96A)', color: '#080808', borderRadius: '10px', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Start Module 1 Free →
            </span>
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
