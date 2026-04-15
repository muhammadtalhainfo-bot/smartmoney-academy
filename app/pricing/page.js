'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const FREE_FEATURES = [
  { text: 'Modules 1–3 (Market Structure, Liquidity, FVG)', included: true },
  { text: 'ICT Glossary (75+ terms)', included: true },
  { text: 'Basic practice questions', included: true },
  { text: 'Trade Journal', included: true },
  { text: 'Modules 4–14 (Advanced curriculum)', included: false },
  
  { text: 'AI-generated daily challenges', included: false },
  { text: 'Certificate of completion', included: false },
  { text: 'Discord community access', included: false },
  { text: 'Weekly market breakdown', included: false },
];

const PRO_FEATURES = [
  { text: 'Everything in Free', included: true },
  { text: 'All 14 modules unlocked', included: true },
  
  { text: 'AI-generated daily challenges', included: true },
  { text: 'Certificate of completion', included: true },
  { text: 'Discord community access', included: true },
  { text: 'Weekly market breakdown', included: true },
  { text: 'Priority support', included: true },
  { text: 'Early access to new modules', included: true },
  { text: 'Cancel anytime', included: true },
];

const FAQS = [
  { q: 'Can I try before I pay?', a: 'Yes — the first 3 modules are completely free with no credit card required. Sign up and start learning immediately.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards and PayPal. Payments are processed securely via Stripe.' },
  { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel with one click from your dashboard. No questions asked, no cancellation fees.' },
  { q: 'Is this suitable for complete beginners?', a: 'Yes. The curriculum starts from zero — market structure basics — and progressively builds to advanced ICT models. No prior trading knowledge needed.' },
  { q: 'What is ICT / Smart Money Concepts?', a: "ICT (Inner Circle Trader) is a trading methodology developed by Michael Huddleston that focuses on how institutional money moves markets. It's one of the most popular trading approaches in 2024–2025." },
  { q: 'Do I get lifetime access?', a: 'Pro is a monthly or annual subscription. As long as your subscription is active, you have full access including all future modules added.' },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const priceId = annual
        ? process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE
        : process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE;
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (e) {
      alert('Something went wrong. Please try again.');
    }
    setCheckoutLoading(false);
  }

  const monthlyPrice = 19;
  const annualPrice = 149;
  const annualMonthly = (annualPrice / 12).toFixed(2);
  const savings = Math.round(100 - (annualPrice / (monthlyPrice * 12)) * 100);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #D4A843; --border: rgba(212,168,67,0.22); }
        .font-display { font-family: 'Bebas Neue', sans-serif; }
        .font-mono-c { font-family: 'DM Mono', monospace; }
        .shine { background: linear-gradient(135deg, #8A6B28 0%, #D4A843 40%, #F0C96A 60%, #D4A843 80%, #8A6B28 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .card-pro { background: linear-gradient(135deg, rgba(212,168,67,0.06) 0%, rgba(212,168,67,0.02) 100%); border: 1px solid rgba(212,168,67,0.8); }
        .card-free { background: #0D0D0D; border: 1px solid rgba(255,255,255,0.18); }
        .toggle-pill { transition: all 0.25s; }
        .faq-item { border-bottom: 1px solid rgba(255,255,255,0.15); }
      `}</style>

      <Navbar active="/pricing" />

      {/* HERO */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 700px 400px at 50% 0%, rgba(212,168,67,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid var(--border)', background: 'rgba(212,168,67,0.04)', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#D4A843', marginBottom: '24px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
            SIMPLE PRICING
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(48px, 9vw, 88px)', lineHeight: 1, marginBottom: '16px' }}>
            <span className="shine">INVEST IN YOUR</span><br />
            <span style={{ color: 'white' }}>TRADING EDGE</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '16px', lineHeight: 1.7, fontWeight: 300, marginBottom: '40px' }}>
            Start free. Upgrade when you're ready. No hidden fees, no lock-ins.
          </p>

          {/* BILLING TOGGLE */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '100px', padding: '6px 8px' }}>
            <button onClick={() => setAnnual(false)} style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', transition: 'all 0.2s', background: !annual ? '#D4A843' : 'transparent', color: !annual ? 'black' : 'rgba(255,255,255,0.85)' }}>
              MONTHLY
            </button>
            <button onClick={() => setAnnual(true)} style={{ padding: '8px 20px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em', transition: 'all 0.2s', background: annual ? '#D4A843' : 'transparent', color: annual ? 'black' : 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ANNUAL
              <span style={{ background: annual ? 'rgba(0,0,0,0.2)' : 'rgba(52,211,153,0.15)', color: annual ? 'black' : '#34D399', fontSize: '9px', padding: '2px 7px', borderRadius: '100px', fontWeight: 600 }}>SAVE {savings}%</span>
            </button>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px', alignItems: 'start' }}>

        {/* FREE */}
        <div className="card-free" style={{ borderRadius: '20px', padding: '36px' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', marginBottom: '16px' }}>FREE FOREVER</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '8px' }}>
            <span className="font-display" style={{ fontSize: '64px', lineHeight: 1, color: 'white' }}>$0</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', marginBottom: '28px', lineHeight: 1.6 }}>
            Start your ICT journey with the fundamentals. No credit card required.
          </p>
          <Link href="/auth" style={{ display: 'block', textAlign: 'center', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', marginBottom: '28px', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}>
            GET STARTED FREE →
          </Link>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FREE_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: f.included ? 1 : 0.3 }}>
                <span style={{ fontSize: '14px', color: f.included ? '#34D399' : 'rgba(255,255,255,0.85)', flexShrink: 0 }}>{f.included ? '✓' : '✗'}</span>
                <span style={{ fontSize: '13px', color: f.included ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.6)', textDecoration: f.included ? 'none' : 'none' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRO */}
        <div className="card-pro" style={{ borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(212,168,67,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

          {/* POPULAR BADGE */}
          <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '6px', padding: '4px 12px', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'black', fontWeight: 600, letterSpacing: '0.1em' }}>POPULAR</div>

          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.2em', color: '#D4A843', marginBottom: '16px' }}>PRO ACCESS</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginBottom: '4px' }}>
            <span className="font-display" style={{ fontSize: '64px', lineHeight: 1, color: 'white' }}>
              ${annual ? annualMonthly : monthlyPrice}
            </span>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '12px', color: 'rgba(255,255,255,0.7)', paddingBottom: '12px' }}>/month</span>
          </div>
          {annual && (
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
              Billed as <span style={{ color: '#D4A843' }}>${annualPrice}/year</span>
            </div>
          )}
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px', marginBottom: '28px', lineHeight: 1.6 }}>
            Full access to everything. Trade smarter, faster, with institutional precision.
          </p>

          <button style={{ display: 'block', width: '100%', textAlign: 'center', padding: '15px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', color: 'black', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600, cursor: 'pointer', marginBottom: '28px', transition: 'opacity 0.2s' }}
            onClick={handleCheckout} disabled={checkoutLoading}
            onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}>
            {checkoutLoading ? 'LOADING...' : annual ? `START FOR $${annualPrice}/YEAR →` : `START FOR $${monthlyPrice}/MONTH →`}
          </button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '14px', color: '#D4A843', flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '40px 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px', textAlign: 'center' }}>
          {[['500+', 'Active Students'], ['14', 'ICT Modules'], ['75+', 'Glossary Terms'], ['Free', 'To Start']].map(([val, label]) => (
            <div key={label}>
              <div className="font-display shine" style={{ fontSize: '48px', lineHeight: 1 }}>{val}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.15em', marginTop: '6px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '80px 24px' }}>
        <h2 className="font-display" style={{ fontSize: '48px', color: 'white', textAlign: 'center', marginBottom: '48px' }}>
          COMMON <span className="shine">QUESTIONS</span>
        </h2>
        {FAQS.map((faq, i) => (
          <div key={i} className="faq-item" style={{ padding: '20px 0', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{faq.q}</span>
              <span style={{ color: '#D4A843', fontSize: '18px', flexShrink: 0, transition: 'transform 0.2s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
            </div>
            {openFaq === i && (
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.7, marginTop: '12px', fontWeight: 300 }}>{faq.a}</p>
            )}
          </div>
        ))}
      </section>

      {/* BOTTOM CTA */}
      <section style={{ padding: '0 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '48px', background: 'rgba(212,168,67,0.04)', border: '1px solid rgba(212,168,67,0.75)', borderRadius: '20px' }}>
          <div className="font-display shine" style={{ fontSize: '40px', marginBottom: '12px' }}>START FREE TODAY</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '24px', fontWeight: 300 }}>No credit card. No commitment. Just ICT education.</p>
          <Link href="/auth" style={{ display: 'inline-block', padding: '14px 36px', background: 'linear-gradient(135deg,#D4A843,#8A6B28)', borderRadius: '10px', color: 'black', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.12em', fontWeight: 600 }}>
            CREATE FREE ACCOUNT →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
