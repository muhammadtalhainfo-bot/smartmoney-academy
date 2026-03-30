'use client';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const STATS = [
  { value: '14', label: 'ICT Modules' },
  { value: '80+', label: 'Lessons Built' },
  { value: '500+', label: 'Students Enrolled' },
  { value: '100%', label: 'Free to Start' },
];

const VALUES = [
  {
    icon: '📚',
    title: 'Education First',
    desc: 'Every concept is explained from first principles. No jargon without explanation. No gatekeeping.',
  },
  {
    icon: '🏦',
    title: 'Institutional Thinking',
    desc: 'We teach how smart money actually moves markets — not retail indicators or lagging signals.',
  },
  {
    icon: '🆓',
    title: 'Free Forever',
    desc: 'The core curriculum stays free. We believe financial education should be accessible to everyone.',
  },
  {
    icon: '🎯',
    title: 'Practical Over Theoretical',
    desc: 'Every lesson includes real trade setups, quizzes, and journal tools to apply what you learn.',
  },
];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>

      <Navbar active="/about" />

      {/* HERO */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', borderBottom: '1px solid rgba(212,168,67,0.1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 400px at 50% 100%, rgba(212,168,67,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(212,168,67,0.15)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '24px' }}>
            OUR MISSION
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(52px, 9vw, 96px)', lineHeight: 1, marginBottom: '24px' }}>
            <span style={{ color: 'white' }}>TRADE LIKE</span><br />
            <span className="shine">INSTITUTIONS</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '17px', lineHeight: 1.8, fontWeight: 300, maxWidth: '560px', margin: '0 auto' }}>
            ICT Flow was built with one goal: make ICT and Smart Money Concepts accessible to every trader — regardless of background or budget. No $500 courses. No gatekeeping. Just the cleanest ICT education on the internet, free.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderBottom: '1px solid rgba(212,168,67,0.08)', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div className="font-display shine" style={{ fontSize: '52px', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.2em', marginBottom: '20px' }}>THE STORY</div>
        <h2 className="font-display" style={{ fontSize: '48px', color: 'white', marginBottom: '32px', lineHeight: 1 }}>
          WHY WE <span className="shine">BUILT THIS</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.8, fontWeight: 300 }}>
          <p>
            When we first discovered ICT's methodology, we spent hundreds of hours scattered across YouTube videos, old forum posts, and paid courses trying to piece it together. There was no single resource that laid it all out clearly.
          </p>
          <p>
            We built ICT Flow to be that resource — a structured, progressive curriculum that takes a complete beginner from market structure basics all the way to advanced IPDA theory and trade management. Built from ICT's official YouTube content and mentorship material.
          </p>
          <p>
            We're traders who got tired of seeing beginners pay $300+ for information that should be free. ICT himself gives his content away on YouTube. We just organized it into a proper learning path.
          </p>
          <p style={{ color: 'rgba(212,168,67,0.7)', fontStyle: 'italic' }}>
            "Stop trying to predict. Start reading the algorithm." — ICT
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ borderTop: '1px solid rgba(212,168,67,0.08)', padding: '80px 24px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="font-display" style={{ fontSize: '48px', color: 'white', lineHeight: 1 }}>
              WHAT WE <span className="shine">STAND FOR</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '20px' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '28px', display: 'flex', gap: '16px' }}>
                <div style={{ fontSize: '28px', flexShrink: 0 }}>{v.icon}</div>
                <div>
                  <div className="font-display" style={{ fontSize: '22px', color: 'white', marginBottom: '8px', letterSpacing: '0.05em' }}>{v.title}</div>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 className="font-display shine" style={{ fontSize: '52px', lineHeight: 1, marginBottom: '16px' }}>START LEARNING TODAY</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '15px', marginBottom: '32px', fontWeight: 300 }}>
            Join 500+ traders learning to think like smart money. Free forever.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/courses" style={{ padding: '14px 32px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '10px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600 }}>
              VIEW CURRICULUM →
            </Link>
            <Link href="/auth" style={{ padding: '14px 32px', background: 'transparent', borderRadius: '10px', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em' }}>
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
