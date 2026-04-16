'use client';

const TESTIMONIALS = [
  {
    name: 'Ahmed K.',
    handle: '@ahmedfx_trades',
    avatar: 'A',
    color: '#6366F1',
    text: 'Finally understood what FVGs actually are after 2 years of confusion. The way ICT Flow breaks down ICT concepts is cleaner than anything on YouTube. Module 3 alone changed how I see every chart.',
    tag: 'Module 3 — Fair Value Gaps',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    handle: '@sarahtrades_nx',
    avatar: 'S',
    color: '#EC4899',
    text: 'Passed my FTMO challenge on my second attempt after going through the killzones and AMD modules. The session timing breakdowns are incredibly detailed. This is genuinely free?',
    tag: 'Module 5 & 6',
    stars: 5,
  },
  {
    name: 'Daniel R.',
    handle: '@danielr_ict',
    avatar: 'D',
    color: '#10B981',
    text: 'I\'ve paid for multiple trading courses. ICT Flow covers more ICT content for free than courses I paid $300+ for. The order blocks module is exceptional.',
    tag: 'Module 4 — Order Blocks',
    stars: 5,
  },
  {
    name: 'Umar F.',
    handle: '@umarforex',
    avatar: 'U',
    color: '#F59E0B',
    text: 'The trade journal feature is underrated. Being able to tag ICT concepts on each trade and see my win rate by concept completely changed how I review my trades.',
    tag: 'Trade Journal',
    stars: 5,
  },
  {
    name: 'James T.',
    handle: '@jtrades_smc',
    avatar: 'J',
    color: '#3B82F6',
    text: 'Started as a complete beginner in January. By March I was consistently identifying daily bias using the higher timeframe analysis module. The progression from beginner to advanced is perfectly structured.',
    tag: 'Module 10 — SMT Divergence',
    stars: 5,
  },
  {
    name: 'Fatima A.',
    handle: '@fatimatrading',
    avatar: 'F',
    color: '#E8C547',
    text: 'The ICT glossary alone is worth bookmarking. 75+ terms with clear definitions. I used to google every term during ICT videos — now I just check the glossary. Game changer.',
    tag: 'ICT Glossary',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '80px 24px', borderTop: '1px solid rgba(232,197,71,0.95)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 800px 400px at 50% 50%, rgba(212,168,67,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(232,197,71,0.95)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#E8C547', marginBottom: '20px' }}>
            ★★★★★ STUDENT RESULTS
          </div>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 7vw, 72px)', color: 'white', lineHeight: 1, marginBottom: '12px' }}>
            TRADERS ARE
            <span style={{ background: 'linear-gradient(135deg, #8A6B28 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #8A6B28 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}> WINNING</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', fontWeight: 300, maxWidth: '400px', margin: '0 auto' }}>
            Real feedback from students who applied what they learned.
          </p>
        </div>

        {/* GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', transition: 'border-color 0.2s' }}
              onMouseOver={e => e.currentTarget.style.borderColor = '#E8C547'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}>

              {/* STARS */}
              <div style={{ color: '#E8C547', fontSize: '13px', letterSpacing: '2px' }}>{'★'.repeat(t.stars)}</div>

              {/* TEXT */}
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.7, fontWeight: 300, flex: 1 }}>
                "{t.text}"
              </p>

              {/* TAG */}
              <div style={{ display: 'inline-flex', alignSelf: 'flex-start', padding: '4px 10px', borderRadius: '4px', background: `${t.color}15`, border: `1px solid ${t.color}25`, fontFamily: 'DM Mono, monospace', fontSize: '10px', color: t.color, letterSpacing: '0.08em' }}>
                {t.tag}
              </div>

              {/* AUTHOR */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `${t.color}25`, border: `1px solid ${t.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', color: t.color, flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: 'white', fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>{t.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <p style={{ textAlign: 'center', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginTop: '40px' }}>
          RESULTS MAY VARY · TRADING INVOLVES RISK · THESE ARE INDIVIDUAL EXPERIENCES
        </p>
      </div>
    </section>
  );
}
