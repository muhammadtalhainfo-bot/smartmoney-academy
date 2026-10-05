'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { createClient } from '@/lib/supabase';

const TOOLS = [
  {
    id: 'checklist',
    emoji: '✅',
    title: 'ICT Risk Management Checklist',
    subtitle: 'Pre-Trade · Post-Trade · Weekly · Monthly',
    desc: 'A structured checklist for pre-trade, post-trade, weekly, and monthly review. Use it as a repeatable process and adapt the rules to your own tested plan.',
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
        title: 'EXAMPLE HARD RULES',
        items: [
          { label: 'EXAMPLE HARD RULES TO DEFINE IN YOUR PLAN', checks: [
            'Define a maximum risk per trade and do not exceed it',
            'Use a predefined stop-loss rule unless your documented strategy explicitly specifies otherwise',
            'Do not widen the stop after entry unless your tested rules explicitly allow it',
            'Do not revenge trade; pause and follow your recovery process',
            'Define whether killzones are required by your tested strategy',
            'Define how daily bias affects eligibility and what invalidates it',
            'Define a portfolio-heat ceiling appropriate to your account and strategy',
            'Record the trades required by your review process',
            'Define objective conditions for stepping away from the market',
            'Change rules through a documented review process rather than impulsively during live trading',
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

];

const PRO_TOOL = {
  id: 'plan',
  emoji: '📋',
  title: 'ICT Trading Plan Template',
  subtitle: 'Fill-in-the-blank · 10 Sections · Professional',
  desc: 'A written trading plan can help turn broad intentions into explicit, testable rules. Fill out this template and keep it available during your review process.',
  color: '#D4A843',
};

const styles = `

  .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
  .font-mono-c { font-family: 'DM Mono', monospace; }
  .font-body { font-family: 'DM Sans', sans-serif; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
`;

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState('checklist');
  const [checked, setChecked] = useState({});
  const [isPro, setIsPro] = useState(false);
  const [proLoading, setProLoading] = useState(true);
  const [planSections, setPlanSections] = useState([]);
  const [loadError, setLoadError] = useState('');
  const supabase = useMemo(() => createClient(), []);
  const tool = activeTool === 'plan' ? { ...PRO_TOOL, sections: planSections } : TOOLS.find(t => t.id === activeTool);

  useEffect(() => {
    let mounted = true;

    const loadAccess = async () => {
      setLoadError('');
      if (mounted) setProLoading(true);

      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;

        if (!user) {
          if (mounted) {
            setIsPro(false);
            setPlanSections([]);
          }
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        const pro = profile?.is_pro === true;
        if (mounted) setIsPro(pro);

        if (!pro) {
          if (mounted) setPlanSections([]);
          return;
        }

        const response = await fetch('/api/pro-tools/plan', { cache: 'no-store' });
        if (!response.ok) throw new Error('Unable to load the Pro trading plan.');
        const data = await response.json();

        if (mounted) {
          setPlanSections(Array.isArray(data.sections) ? data.sections : []);
        }
      } catch (error) {
        console.error('Tools access check failed:', error);
        if (mounted) {
          setLoadError('Unable to verify Pro access right now. Please refresh and try again.');
          setIsPro(false);
          setPlanSections([]);
        }
      } finally {
        if (mounted) setProLoading(false);
      }
    };

    loadAccess();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
        setTimeout(loadAccess, 0);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [supabase]);

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
          <p style={{ color: '#B9C1CC', fontSize: '15px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Professional trading tools for disciplined ICT study. The core checklist is free; the full trading-plan template is a Pro tool.
          </p>
        </section>

        {/* TOOL TABS */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {[...TOOLS, PRO_TOOL].map(t => (
              <button
                type="button"
                key={t.id}
                disabled={t.id === 'plan' && !isPro}
                aria-pressed={activeTool === t.id}
                onClick={() => { setActiveTool(t.id); setChecked({}); }}
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: `1px solid ${activeTool === t.id ? t.color : 'rgba(255,255,255,0.08)'}`,
                  background: activeTool === t.id ? `${t.color}18` : 'transparent',
                  color: activeTool === t.id ? t.color : '#AAB3BF',
                  cursor: t.id === 'plan' && !isPro ? 'not-allowed' : 'pointer',
                  opacity: t.id === 'plan' && !isPro ? 0.55 : 1,
                  fontSize: '13px',
                  fontFamily: 'DM Mono, monospace',
                  letterSpacing: '1px',
                  transition: 'all 0.2s',
                }}
              >
                {t.emoji} {t.title}{t.id === 'plan' && ' · PRO'}
              </button>
            ))}
          </div>

          {loadError && !proLoading ? (
            <div role="alert" style={{ padding: '14px 18px', marginBottom: '24px', borderRadius: '10px', border: '1px solid rgba(248,113,113,0.3)', background: 'rgba(248,113,113,0.08)', color: '#FCA5A5', fontSize: '13px' }}>
              {loadError}
            </div>
          ) : null}

          {activeTool === 'plan' && !proLoading && !isPro && !loadError ? (
            <div style={{ padding: '48px 28px', marginBottom: '28px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(212,168,67,0.08), rgba(212,168,67,0.02))', border: '1px solid rgba(232,197,71,0.35)', borderRadius: '16px' }}>
              <div style={{ fontSize: '34px', marginBottom: '12px' }}>🔒</div>
              <div className="font-mono-c" style={{ fontSize: '11px', letterSpacing: '2px', color: '#E8C547', marginBottom: '10px' }}>// PRO TOOL</div>
              <h2 className="font-display" style={{ fontSize: '38px', color: 'white', marginBottom: '10px' }}>ICT TRADING PLAN TEMPLATE</h2>
              <p style={{ color: '#B9C1CC', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.7, fontSize: '14px' }}>
                The checklist stays free. The full professional trading-plan template is included with Pro access, together with the advanced curriculum and ad-free experience.
              </p>
              <Link href="/pricing" style={{ display: 'inline-block', padding: '13px 26px', borderRadius: '10px', background: 'linear-gradient(135deg,#E8C547,#F0C96A)', color: '#080808', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em' }}>
                UNLOCK PRO — $19/MONTH →
              </Link>
            </div>
          ) : null}

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
                <p style={{ color: '#B9C1CC', fontSize: '14px', lineHeight: 1.6, maxWidth: '560px' }}>
                  {tool.desc}
                </p>
              </div>
              {activeTool === 'checklist' && (
                <div style={{ textAlign: 'center', minWidth: '80px' }}>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: tool.color }}>{progress}%</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.72)', fontFamily: 'DM Mono, monospace' }}>COMPLETE</div>
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
          {!(activeTool === 'plan' && !isPro) && tool.sections.map((section, si) => (
            <div key={si} style={{ marginBottom: '24px', background: '#0A0A0A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', background: 'rgba(212,168,67,0.05)', borderBottom: '1px solid rgba(212,168,67,0.08)' }}>
                <span className="font-mono-c" style={{ fontSize: '11px', letterSpacing: '2px', color: '#D4A843', textTransform: 'uppercase' }}>
                  {section.title}
                </span>
              </div>
              <div style={{ padding: '20px 24px' }}>
                {section.items.map((item, ii) => (
                  <div key={ii} style={{ marginBottom: ii < section.items.length - 1 ? '24px' : '0' }}>
                    <div className="font-mono-c" style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.72)', textTransform: 'uppercase', marginBottom: '12px' }}>
                      {item.label}
                    </div>
                    {(item.checks || []).map((check, ci) => {
                      const key = `${si}-${ii}-${ci}`;
                      return (
                        <button
                          type="button"
                          key={ci}
                          onClick={() => toggleCheck(key)}
                          aria-pressed={!!checked[key]}
                          style={{ display: 'flex', width: '100%', alignItems: 'flex-start', gap: '12px', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '4px', background: checked[key] ? 'rgba(52,211,153,0.05)' : 'transparent', border: 'none', color: 'inherit', textAlign: 'left', transition: 'background 0.15s' }}
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
                          <span style={{ fontSize: '14px', color: checked[key] ? '#B9C1CC' : 'rgba(255,255,255,0.75)', textDecoration: checked[key] ? 'line-through' : 'none', lineHeight: 1.5, transition: 'all 0.15s' }}>
                            {check}
                          </span>
                        </button>
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
                type="button"
                onClick={() => setChecked({})}
                style={{ padding: '10px 24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#B9C1CC', cursor: 'pointer', fontSize: '12px', fontFamily: 'DM Mono, monospace' }}
              >
                Reset Checklist
              </button>
            </div>
          )}

          {activeTool === 'plan' && isPro && (
            <div style={{ marginTop: '16px', padding: '20px 24px', background: 'rgba(212,168,67,0.05)', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                Print or save this plan, fill it out, and keep it available during your trading review process.<br />
                Review it before sessions and update it through your documented review process.<br />
                <span style={{ color: '#D4A843' }}>Use the plan as a written reference; change rules through deliberate review rather than during live trading.</span>
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
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '14px', marginBottom: '28px' }}>
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
