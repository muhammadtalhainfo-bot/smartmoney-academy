'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const PROP_FIRMS = [
  {
    name: 'FTMO',
    logo: '🏆',
    color: '#F59E0B',
    tag: 'MOST POPULAR',
    tagColor: '#F59E0B',
    desc: 'The gold standard of prop firms. Trusted by 100,000+ traders globally. Up to $200,000 funded accounts.',
    commission: '$100–$200 per referral',
    payout: '80–90% profit split',
    challenge: '$155 for $10K account',
    link: 'https://ftmo.com/?affiliates=ictflow',
    features: ['2-step evaluation', '10% max drawdown', 'No time limit', 'Bi-weekly payouts'],
  },
  {
    name: 'The Funded Trader',
    logo: '💎',
    color: '#8B5CF6',
    tag: 'HIGH PAYOUT',
    tagColor: '#8B5CF6',
    desc: 'Up to 90% profit split with flexible evaluation options. Perfect for ICT traders using daily setups.',
    commission: '$75–$150 per referral',
    payout: 'Up to 90% profit split',
    challenge: '$135 for $10K account',
    link: 'https://thefundedtrader.com/?ref=ictflow',
    features: ['Standard & Royal plans', 'Unlimited trading days', 'Weekend holding', 'Scaling up to $1.5M'],
  },
  {
    name: 'E8 Funding',
    logo: '⚡',
    color: '#10B981',
    tag: 'BEGINNER FRIENDLY',
    tagColor: '#10B981',
    desc: 'Simple rules, transparent payouts. Great starting point for traders new to prop trading.',
    commission: '$50–$100 per referral',
    payout: '80% profit split',
    challenge: '$128 for $10K account',
    link: 'https://e8funding.com/?ref=ictflow',
    features: ['1-step option available', 'No minimum trading days', 'Easy scaling plan', '8% max drawdown'],
  },
  {
    name: 'Apex Trader Funding',
    logo: '🚀',
    color: '#3B82F6',
    tag: 'FUTURES FOCUS',
    tagColor: '#3B82F6',
    desc: 'Best prop firm for futures traders. Simple 1-step evaluation with generous payout rules.',
    commission: '$50–$120 per referral',
    payout: '100% first $25K then 90%',
    challenge: '$97/month for $50K',
    link: 'https://apextraderfunding.com/?ref=ictflow',
    features: ['1-step evaluation', 'Futures only', '100% first payout', 'Multiple accounts'],
  },
];

const BROKERS = [
  {
    name: 'Pepperstone',
    logo: '🌶️',
    color: '#EF4444',
    desc: 'Razor-thin spreads on NAS100 and Gold. Perfect for ICT traders needing precision entries.',
    commission: 'Up to $600 per referral',
    spread: 'From 0.0 pips (Razor)',
    platforms: 'MT4, MT5, cTrader',
    link: 'https://pepperstone.com/?ref=ictflow',
  },
  {
    name: 'IC Markets',
    logo: '📊',
    color: '#D4A843',
    desc: 'Institutional-grade liquidity. Lowest latency execution for scalpers and day traders.',
    commission: 'Up to $400 per referral',
    spread: 'From 0.0 pips (Raw)',
    platforms: 'MT4, MT5, cTrader',
    link: 'https://icmarkets.com/?ref=ictflow',
  },
];

const TOOLS = [
  {
    name: 'TradingView',
    logo: '📈',
    color: '#2962FF',
    desc: 'The best charting platform for ICT analysis. Draw OBs, FVGs, and structure with precision.',
    commission: '30% recurring commission',
    price: 'Free–$59.95/month',
    link: 'https://www.tradingview.com/?aff_id=ictflow',
    highlight: 'BEST RECURRING',
  },
  {
    name: 'ICT Mentorship (Official)',
    logo: '🎓',
    color: '#D4A843',
    desc: "Michael Huddleston's official YouTube channel. Free content — use alongside ICT Flow.",
    commission: 'Free resource',
    price: 'Free on YouTube',
    link: 'https://youtube.com/@InnerCircleTrader',
    highlight: 'FREE',
  },
];

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState('prop');

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --gold-light: #F0C96A; --gold-dim: #8A6B28; --border: rgba(212,168,67,0.12); }
        .card-hover { transition: all 0.25s; cursor: pointer; }
        .card-hover:hover { transform: translateY(-3px); border-color: rgba(212,168,67,0.35) !important; }
        .tab-btn { transition: all 0.2s; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-c { font-family: 'DM Mono', monospace; }
      `}</style>

      <Navbar active="/resources" />

      {/* HERO */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 300px at 50% 100%, rgba(212,168,67,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '100px', border: '1px solid var(--border)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '24px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4A843', display: 'inline-block' }} />
            AFFILIATE RESOURCES
          </div>
          <h1 className="font-display shine" style={{ fontSize: 'clamp(52px, 10vw, 96px)', lineHeight: 1, marginBottom: '20px' }}>
            TOOLS THAT PAY
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', fontWeight: 300, lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 12px' }}>
            Every link below is an affiliate link. If you sign up through here, we earn a commission at no extra cost to you — it's how we keep this academy free.
          </p>
          <p style={{ color: 'rgba(212,168,67,0.6)', fontSize: '12px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.1em' }}>
            ⚠️ TRADING INVOLVES RISK — ONLY USE CAPITAL YOU CAN AFFORD TO LOSE
          </p>
        </div>
      </section>

      {/* TABS */}
      <section style={{ position: 'sticky', top: '64px', zIndex: 30, background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '0' }}>
          {[['prop', 'Prop Firms'], ['brokers', 'Brokers'], ['tools', 'Tools & Platforms']].map(([key, label]) => (
            <button key={key} className="tab-btn" onClick={() => setActiveTab(key)} style={{ padding: '16px 24px', background: 'none', border: 'none', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', color: activeTab === key ? '#D4A843' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === key ? '2px solid #D4A843' : '2px solid transparent', marginBottom: '-1px' }}>
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>

        {/* PROP FIRMS */}
        {activeTab === 'prop' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="font-display" style={{ fontSize: '36px', color: 'white', marginBottom: '8px' }}>PROP TRADING FIRMS</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'DM Mono, monospace' }}>Get funded up to $200,000 — trade with their capital, keep the profits</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: '20px' }}>
              {PROP_FIRMS.map((firm) => (
                <a key={firm.name} href={firm.link} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ textDecoration: 'none', display: 'block', background: '#0D0D0D', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: `radial-gradient(circle, ${firm.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${firm.color}15`, border: `1px solid ${firm.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{firm.logo}</div>
                      <div>
                        <div className="font-display" style={{ fontSize: '22px', color: 'white', letterSpacing: '0.05em' }}>{firm.name}</div>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: firm.tagColor, letterSpacing: '0.15em' }}>{firm.tag}</div>
                      </div>
                    </div>
                    <div style={{ background: `${firm.color}15`, border: `1px solid ${firm.color}30`, borderRadius: '8px', padding: '6px 12px', textAlign: 'right' }}>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '2px' }}>COMMISSION</div>
                      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: firm.color, fontWeight: 500 }}>{firm.commission}</div>
                    </div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{firm.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                    {[['Profit Split', firm.payout], ['Challenge Cost', firm.challenge]].map(([label, val]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 14px' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {firm.features.map(f => (
                      <span key={f} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px', padding: '3px 10px' }}>✓ {f}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>AFFILIATE LINK</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: firm.color, letterSpacing: '0.1em' }}>GET FUNDED →</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* BROKERS */}
        {activeTab === 'brokers' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="font-display" style={{ fontSize: '36px', color: 'white', marginBottom: '8px' }}>BROKERS</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'DM Mono, monospace' }}>For personal trading — tight spreads, fast execution</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '20px' }}>
              {BROKERS.map((broker) => (
                <a key={broker.name} href={broker.link} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ textDecoration: 'none', display: 'block', background: '#0D0D0D', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: `radial-gradient(circle, ${broker.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${broker.color}15`, border: `1px solid ${broker.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{broker.logo}</div>
                    <div className="font-display" style={{ fontSize: '26px', color: 'white', letterSpacing: '0.05em' }}>{broker.name}</div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{broker.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '20px' }}>
                    {[['Commission', broker.commission], ['Spreads', broker.spread], ['Platforms', broker.platforms]].map(([label, val]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 14px' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>AFFILIATE LINK</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: broker.color, letterSpacing: '0.1em' }}>OPEN ACCOUNT →</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* TOOLS */}
        {activeTab === 'tools' && (
          <>
            <div style={{ marginBottom: '32px' }}>
              <h2 className="font-display" style={{ fontSize: '36px', color: 'white', marginBottom: '8px' }}>TOOLS & PLATFORMS</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', fontFamily: 'DM Mono, monospace' }}>Software every serious ICT trader uses daily</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))', gap: '20px' }}>
              {TOOLS.map((tool) => (
                <a key={tool.name} href={tool.link} target="_blank" rel="noopener noreferrer" className="card-hover" style={{ textDecoration: 'none', display: 'block', background: '#0D0D0D', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: `radial-gradient(circle, ${tool.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />
                  {tool.highlight && (
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: `${tool.color}20`, border: `1px solid ${tool.color}40`, borderRadius: '6px', padding: '4px 10px', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: tool.color, letterSpacing: '0.1em' }}>{tool.highlight}</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${tool.color}15`, border: `1px solid ${tool.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{tool.logo}</div>
                    <div className="font-display" style={{ fontSize: '22px', color: 'white', letterSpacing: '0.05em' }}>{tool.name}</div>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>{tool.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                    {[['Commission', tool.commission], ['Pricing', tool.price]].map(([label, val]) => (
                      <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 14px' }}>
                        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '4px' }}>{label}</div>
                        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>AFFILIATE LINK</span>
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: tool.color, letterSpacing: '0.1em' }}>GET STARTED →</span>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {/* DISCLAIMER */}
        <div style={{ marginTop: '64px', padding: '24px', background: 'rgba(212,168,67,0.03)', border: '1px solid rgba(212,168,67,0.1)', borderRadius: '12px' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, letterSpacing: '0.05em' }}>
            <span style={{ color: 'rgba(212,168,67,0.6)' }}>DISCLAIMER:</span> This page contains affiliate links. ICT Flow may earn a commission when you sign up through these links at no additional cost to you. All products listed are ones we genuinely recommend for ICT traders. Trading financial instruments involves significant risk of loss and is not suitable for all investors. Past performance is not indicative of future results. This is not financial advice.
          </p>
        </div>
      </div>
    <Footer />
    </div>
  );
}
