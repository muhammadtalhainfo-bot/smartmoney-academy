'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import EmailCapture from '@/app/components/EmailCapture';
import Footer from '@/app/components/Footer';

const FINNHUB_KEY = 'd704rgpr01qtb4r9fvmgd704rgpr01qtb4r9fvn0';
const DEFAULT_TICKER = [
  { pair: 'EURUSD', price: '1.08432', change: '+0.12%', up: true },
  { pair: 'XAUUSD', price: '2,341.50', change: '+0.84%', up: true },
  { pair: 'NAS100', price: '18,204.25', change: '-0.23%', up: false },
  { pair: 'GBPUSD', price: '1.26718', change: '+0.07%', up: true },
  { pair: 'BTCUSD', price: '67,842.00', change: '+1.42%', up: true },
  { pair: 'US30', price: '38,910.50', change: '-0.18%', up: false },
  { pair: 'USDJPY', price: '151.824', change: '+0.31%', up: true },
];

const COURSES = [
  { id: 1, emoji: '📊', title: 'Market Structure', level: 'Beginner', lessons: 6, desc: 'HH/HL, BOS, ChoCH, MSS — the foundation of every trade.' },
  { id: 2, emoji: '💧', title: 'Liquidity Concepts', level: 'Beginner', lessons: 5, desc: 'Stop hunts, BSL/SSL, equal highs/lows — why price really moves.' },
  { id: 3, emoji: '🎯', title: 'Fair Value Gaps', level: 'Beginner', lessons: 5, desc: 'BISI, SIBI, CE, BPR — the most-traded ICT concept explained.' },
  { id: 4, emoji: '🧱', title: 'Order Blocks', level: 'Intermediate', lessons: 6, desc: 'OB, Breaker, Mitigation — the institutional footprint on charts.' },
  { id: 5, emoji: '⏰', title: 'Killzones & Macros', level: 'Intermediate', lessons: 4, desc: 'London, NY AM, Silver Bullet windows — time is your edge.' },
  { id: 6, emoji: '🔱', title: 'Power of Three (AMD)', level: 'Intermediate', lessons: 5, desc: 'Accumulate, Manipulate, Distribute — the daily market script.' },
  { id: 7, emoji: '📐', title: 'Premium & Discount', level: 'Intermediate', lessons: 4, desc: 'Institutions only buy cheap and sell expensive — the Fibonacci framework.' },
  { id: 8, emoji: '🎲', title: 'ICT Entry Models', level: 'Intermediate', lessons: 7, desc: 'Silver Bullet, 2022 Model, Unicorn — the official ICT trade setups.' },
  { id: 9, emoji: '🏦', title: 'Market Maker Models', level: 'Advanced', lessons: 5, desc: 'MMBM and MMSM — how banks build and unwind massive positions.' },
  { id: 10, emoji: '🔀', title: 'SMT Divergence', level: 'Advanced', lessons: 4, desc: 'Smart Money Technique — catch institutional divergence before moves.' },
  { id: 11, emoji: '🤖', title: 'IPDA & CRT', level: 'Advanced', lessons: 5, desc: 'The algorithm itself — IPDA data ranges and Candle Range Theory.' },
  { id: 12, emoji: '🆕', title: 'ICT 2024 Mentorship', level: 'Advanced', lessons: 8, desc: 'Venom Model, Propulsion Blocks, Quarterly Shifts — newest ICT concepts.' },
];

const LEVEL_STYLE = {
  Beginner: { color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  Intermediate: { color: '#E8C547', bg: 'rgba(232,197,71,0.08)', border: 'rgba(232,197,71,0.2)' },
  Advanced: { color: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
};

const COMPARISON = [
  { feature: 'Market Structure (BOS, ChoCH)', us: true, them: '$97+' },
  { feature: 'Liquidity & Stop Hunt Theory', us: true, them: '$97+' },
  { feature: 'Fair Value Gaps (FVG)', us: true, them: '$147+' },
  { feature: 'Order Blocks & Breakers', us: true, them: '$147+' },
  { feature: 'Killzones & Macro Times', us: true, them: 'Paid Tier' },
  { feature: 'AMD / Power of Three', us: true, them: 'Paid Tier' },
  { feature: 'ICT Entry Models', us: true, them: '$297+' },
  { feature: 'IPDA & Algorithm Theory', us: true, them: '$297+' },
  { feature: 'Trade Journal', us: true, them: 'Not Included' },
  { feature: '80+ Term Glossary', us: true, them: 'Not Included' },
  { feature: 'Practice Quizzes', us: true, them: 'Not Included' },
  { feature: 'ICT 2024 Updates', us: true, them: 'Extra Cost' },
];

const STEPS = [
  { num: '01', title: 'Start with Foundations', desc: 'New to trading? Begin with Trading Foundations — what markets are, how sessions work, risk basics. No jargon.', href: '/foundations', cta: 'Start Foundations' },
  { num: '02', title: 'Study the ICT Modules', desc: '28 modules from Market Structure to Advanced IPDA. Each lesson has examples, quizzes, and real chart context.', href: '/courses', cta: 'Browse Modules' },
  { num: '03', title: 'Practice & Apply', desc: 'Use the Trade Journal to log trades. Take daily quizzes to test your knowledge. Track progress on your dashboard.', href: '/journal', cta: 'Open Journal' },
];

const TESTIMONIALS = [
  { name: 'Ahmed K.', handle: '@ahmedfx_trades', initials: 'AK', color: '#6366F1', text: 'Finally understood FVGs after 2 years of confusion. Module 3 alone changed how I see every chart. This is cleaner than anything on YouTube.', tag: 'Fair Value Gaps' },
  { name: 'Sarah M.', handle: '@sarahtrades_nx', initials: 'SM', color: '#EC4899', text: 'Passed my FTMO challenge after going through the killzones and AMD modules. The session timing breakdowns are incredibly detailed. This is genuinely free?', tag: 'FTMO Passed ✓' },
  { name: 'Daniel R.', handle: '@danielr_ict', initials: 'DR', color: '#10B981', text: 'I\'ve paid for multiple trading courses. ICT Flow covers more ICT content for free than courses I paid $300+ for. The order blocks module is exceptional.', tag: 'Saved $300+' },
  { name: 'Umar F.', handle: '@umarforex', initials: 'UF', color: '#F59E0B', text: 'The trade journal feature is underrated. Being able to tag ICT concepts on each trade and see my win rate by concept completely changed how I review.', tag: 'Trade Journal' },
  { name: 'James T.', handle: '@jtrades_smc', initials: 'JT', color: '#3B82F6', text: 'Started as a complete beginner in January. By March I was consistently identifying daily bias. The progression from beginner to advanced is perfectly structured.', tag: 'Beginner → Consistent' },
  { name: 'Fatima A.', handle: '@fatimatrading', initials: 'FA', color: '#E8C547', text: 'The ICT glossary alone is worth bookmarking. 80+ terms with clear definitions. I used to Google every term during ICT videos — now I just check the glossary.', tag: 'ICT Glossary' },
];

export default function HomePage() {
  const [ticker, setTicker] = useState(DEFAULT_TICKER);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    async function fetchPrices() {
      try {
        const res = await fetch('/api/ticker');
        const json = await res.json();
        if (json.data?.length > 0) setTicker(json.data);
      } catch(e) {}
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        :root { --gold: #E8C547; --gold2: #F0C96A; --gold-dim: #8A6B28; --bg2: #0F0F0F; --bg3: #141414; --border: rgba(232,197,71,0.15); }
        * { box-sizing: border-box; }
        .font-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .font-mono { font-family: 'DM Mono', monospace; }
        body { overflow-x: hidden; }
        body::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); pointer-events:none; z-index:0; opacity:0.4; }
        @keyframes ticker { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ticker-track { animation: ticker 30s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.6s ease forwards; opacity:0; }
        .d1{animation-delay:0.1s} .d2{animation-delay:0.25s} .d3{animation-delay:0.4s} .d4{animation-delay:0.55s} .d5{animation-delay:0.7s}
        .grid-bg { background-image: linear-gradient(rgba(212,168,67,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        .btn-gold { background: linear-gradient(135deg, #E8C547 0%, #F0C96A 50%, #E8C547 100%); background-size:200% 200%; color:#080808; font-weight:700; transition:all 0.3s ease; }
        .btn-gold:hover { transform:translateY(-2px); box-shadow:0 8px 30px rgba(232,197,71,0.35); }
        .card-hover { transition: all 0.25s ease; border: 1px solid rgba(232,197,71,0.12); }
        .card-hover:hover { border-color: rgba(232,197,71,0.4); transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
        .gold-text { background: linear-gradient(135deg, #D4A843 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #D4A843 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .gold-glow { box-shadow: 0 0 40px rgba(232,197,71,0.12), 0 0 80px rgba(212,168,67,0.05); }
        @media (max-width: 768px) { .hide-mob { display:none!important; } }
        @media (min-width: 769px) { .show-mob { display:none!important; } }
      `}</style>

      {/* ── TICKER ── */}
      <div style={{ position:'relative', zIndex:10, borderBottom:'1px solid rgba(232,197,71,0.12)', background:'#050505', padding:'10px 0', overflow:'hidden' }}>
        <div className="ticker-track" style={{ display:'flex', whiteSpace:'nowrap' }}>
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'0 24px', fontFamily:'DM Mono,monospace', fontSize:'11px' }}>
              <span style={{ color:'#E8C547', fontWeight:500 }}>{item.pair}</span>
              <span style={{ color:'rgba(255,255,255,0.85)' }}>{item.price}</span>
              <span style={{ color: item.up ? '#34D399' : '#F87171' }}>{item.up ? '▲' : '▼'} {item.change}</span>
              <span style={{ color:'rgba(255,255,255,0.15)' }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <Navbar active="/" />

      {/* ── HERO ── */}
      <section className="grid-bg" style={{ position:'relative', zIndex:10, minHeight:'90vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px' }}>
        <div style={{ position:'absolute', top:'35%', left:'50%', transform:'translate(-50%,-50%)', width:'min(700px,90vw)', height:'min(700px,90vw)', background:'radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />

        {/* Live badge */}
        <div className="fade-up d1" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'100px', border:'1px solid rgba(232,197,71,0.3)', background:'rgba(232,197,71,0.04)', marginBottom:'28px' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#E8C547', display:'inline-block', animation:'pulse 2s infinite' }} />
          <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#E8C547', letterSpacing:'0.15em' }}>FREE ICT & SMART MONEY EDUCATION</span>
        </div>

        <h1 className="fade-up d2 font-display" style={{ fontSize:'clamp(60px, 11vw, 130px)', lineHeight:0.9, marginBottom:'24px' }}>
          <span style={{ display:'block', color:'white' }}>STOP PAYING</span>
          <span className="gold-text" style={{ display:'block' }}>$300 COURSES</span>
        </h1>

        <p className="fade-up d3" style={{ color:'rgba(255,255,255,0.6)', fontSize:'clamp(15px, 2vw, 18px)', maxWidth:'520px', lineHeight:1.7, marginBottom:'12px', fontWeight:300 }}>
          Master ICT in full — Market Structure, Liquidity, FVGs, Order Blocks, IPDA, AMD and 28 more modules.
          <strong style={{ color:'rgba(255,255,255,0.9)', fontWeight:500 }}> Completely free. No paywall. No tricks.</strong>
        </p>

        <p className="fade-up d3" style={{ color:'rgba(232,197,71,0.7)', fontFamily:'DM Mono,monospace', fontSize:'11px', letterSpacing:'0.12em', marginBottom:'36px' }}>
          JOIN 500+ TRADERS LEARNING RIGHT NOW
        </p>

        <div className="fade-up d4" style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center', marginBottom:'56px' }}>
          <Link href="/lesson/1" className="btn-gold" style={{ padding:'16px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
            Start Lesson 1 — Free →
          </Link>
          <Link href="/courses" style={{ padding:'16px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(232,197,71,0.3)', color:'rgba(255,255,255,0.7)', transition:'all 0.2s', display:'inline-block' }}
            onMouseOver={e=>{e.currentTarget.style.borderColor='#E8C547';e.currentTarget.style.color='#E8C547'}}
            onMouseOut={e=>{e.currentTarget.style.borderColor='rgba(232,197,71,0.3)';e.currentTarget.style.color='rgba(255,255,255,0.7)'}}>
            View All 28 Modules
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-up d5" style={{ display:'flex', gap:'48px', flexWrap:'wrap', justifyContent:'center' }}>
          {[['28', 'ICT Modules'], ['80+', 'Lessons'], ['$0', 'Cost'], ['2026', 'Updated']].map(([v, l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div className="font-display gold-text" style={{ fontSize:'42px' }}>{v}</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'rgba(255,255,255,0.4)', letterSpacing:'0.15em', textTransform:'uppercase', marginTop:'4px' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(232,197,71,0.3), transparent)' }} />
      </section>

      {/* ── WHY FREE ── */}
      <section style={{ position:'relative', zIndex:10, background:'#0A0A0A', borderBottom:'1px solid rgba(232,197,71,0.1)', padding:'48px 24px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'32px' }}>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em' }}>// WHY IS IT FREE?</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'16px' }}>
            {[
              { icon:'📖', title:'Knowledge should be free', desc:'ICT himself shared 1,000+ hours of content for free on YouTube. We built the structured platform he never built.' },
              { icon:'🏦', title:'We earn from prop firm referrals', desc:'If you use FTMO or other prop firms through our Resources page, we earn a referral fee. You pay nothing extra.' },
              { icon:'⚡', title:'Pro plan for serious traders', desc:'Advanced traders can unlock extra tools with Pro. But every lesson, every module? Always free.' },
            ].map((item, i) => (
              <div key={i} className="card-hover" style={{ padding:'20px', borderRadius:'14px', background:'rgba(232,197,71,0.02)' }}>
                <div style={{ fontSize:'22px', marginBottom:'10px' }}>{item.icon}</div>
                <div style={{ fontWeight:600, fontSize:'14px', color:'white', marginBottom:'6px' }}>{item.title}</div>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:1.6, fontWeight:300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#080808' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em', marginBottom:'12px' }}>// HOW IT WORKS</div>
            <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1 }}>THREE STEPS TO<span className="gold-text"> ICT</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'24px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="card-hover" style={{ padding:'28px', borderRadius:'16px', background:'#0F0F0F', position:'relative', overflow:'hidden' }}>
                <div className="font-display" style={{ fontSize:'80px', color:'rgba(232,197,71,0.04)', position:'absolute', top:'-10px', right:'16px', lineHeight:1, userSelect:'none' }}>{s.num}</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.7)', letterSpacing:'0.15em', marginBottom:'12px' }}>STEP {s.num}</div>
                <h3 style={{ fontWeight:600, fontSize:'17px', color:'white', marginBottom:'10px' }}>{s.title}</h3>
                <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.5)', lineHeight:1.7, fontWeight:300, marginBottom:'20px' }}>{s.desc}</p>
                <Link href={s.href} style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#E8C547', textDecoration:'none', letterSpacing:'0.1em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'6px' }}>
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VS PAID COURSES ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#0A0A0A', borderTop:'1px solid rgba(232,197,71,0.08)', borderBottom:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'760px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em', marginBottom:'12px' }}>// THE COMPARISON</div>
            <h2 className="font-display" style={{ fontSize:'clamp(36px, 6vw, 64px)', color:'white', lineHeight:1, marginBottom:'12px' }}>
              WHY PAY <span className="gold-text">$300</span><br/>FOR THIS?
            </h2>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', fontWeight:300 }}>Everything below is free on ICT Flow. Zero credit card required.</p>
          </div>

          <div style={{ border:'1px solid rgba(232,197,71,0.15)', borderRadius:'20px', overflow:'hidden' }}>
            {/* Header */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 140px 140px', background:'rgba(232,197,71,0.05)', borderBottom:'1px solid rgba(232,197,71,0.12)', padding:'14px 20px' }}>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em' }}>FEATURE</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#E8C547', letterSpacing:'0.1em', textAlign:'center' }}>ICT FLOW</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'rgba(255,255,255,0.4)', letterSpacing:'0.1em', textAlign:'center' }}>PAID COURSES</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 140px 140px', padding:'13px 20px', borderBottom: i < COMPARISON.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                <div style={{ fontSize:'13px', color:'rgba(255,255,255,0.7)', fontWeight:300 }}>{row.feature}</div>
                <div style={{ textAlign:'center' }}>
                  <span style={{ color:'#34D399', fontSize:'15px', fontWeight:600 }}>✓ Free</span>
                </div>
                <div style={{ textAlign:'center', fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(248,113,113,0.8)' }}>{row.them}</div>
              </div>
            ))}
            {/* Total row */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 140px 140px', padding:'16px 20px', background:'rgba(232,197,71,0.04)', borderTop:'1px solid rgba(232,197,71,0.15)' }}>
              <div className="font-display" style={{ fontSize:'18px', color:'white', letterSpacing:'0.05em' }}>TOTAL COST</div>
              <div style={{ textAlign:'center' }}>
                <span className="font-display gold-text" style={{ fontSize:'24px' }}>$0</span>
              </div>
              <div style={{ textAlign:'center', fontFamily:'DM Mono,monospace', fontSize:'13px', color:'rgba(248,113,113,0.9)', fontWeight:600 }}>$300–500+</div>
            </div>
          </div>

          <div style={{ textAlign:'center', marginTop:'32px' }}>
            <Link href="/lesson/1" className="btn-gold" style={{ padding:'14px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
              Start For Free — No Card Needed →
            </Link>
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="grid-bg" style={{ position:'relative', zIndex:10, padding:'96px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em', marginBottom:'12px' }}>// CURRICULUM</div>
            <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1, marginBottom:'12px' }}>WHAT YOU'LL LEARN</h2>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.45)', fontWeight:300 }}>28+ modules. Built from ICT's YouTube — updated through 2026.</p>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'16px', marginBottom:'40px' }}>
            {COURSES.map((c) => {
              const ls = LEVEL_STYLE[c.level] || LEVEL_STYLE.Advanced;
              return (
                <Link key={c.id} href={`/lesson/${c.id}`} style={{ textDecoration:'none' }}>
                  <div className="card-hover" style={{ padding:'20px', borderRadius:'16px', background:'#0F0F0F', height:'100%', display:'flex', flexDirection:'column', cursor:'pointer' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:'14px' }}>
                      <div style={{ width:44, height:44, borderRadius:'12px', background:'rgba(232,197,71,0.06)', border:'1px solid rgba(232,197,71,0.12)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'20px', flexShrink:0 }}>
                        {c.emoji}
                      </div>
                      <span style={{ padding:'3px 10px', borderRadius:'6px', fontSize:'10px', fontFamily:'DM Mono,monospace', color:ls.color, background:ls.bg, border:`1px solid ${ls.border}` }}>
                        {c.level}
                      </span>
                    </div>
                    <h3 style={{ fontWeight:600, fontSize:'15px', color:'white', marginBottom:'6px' }}>{c.title}</h3>
                    <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.45)', lineHeight:1.6, fontWeight:300, flex:1 }}>{c.desc}</p>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'14px', paddingTop:'12px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.08em' }}>{c.lessons} LESSONS</span>
                      <span style={{ color:'#E8C547', fontSize:'14px' }}>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link href="/courses" className="btn-gold" style={{ padding:'14px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
              View All 28 Modules →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SESSION MAP ── */}
      <section style={{ position:'relative', zIndex:10, borderTop:'1px solid rgba(232,197,71,0.08)', borderBottom:'1px solid rgba(232,197,71,0.08)', background:'#0A0A0A', padding:'72px 24px' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em', marginBottom:'10px' }}>// ICT DAILY BLUEPRINT</div>
            <h2 className="font-display" style={{ fontSize:'clamp(32px, 5vw, 56px)', color:'white' }}>EVERY DAY FOLLOWS THIS SCRIPT</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'12px' }}>
            {[
              { time:'8PM–12AM EST', zone:'Asian', phase:'ACCUMULATION', desc:'Price builds the Asian Range. Highs and lows become the liquidity targets.', color:'#6366F1', bg:'rgba(99,102,241,0.06)' },
              { time:'2AM–5AM EST', zone:'London', phase:'MANIPULATION', desc:'Judas Swing. Price sweeps Asian high or low, trapping retail.', color:'#F87171', bg:'rgba(248,113,113,0.06)' },
              { time:'7AM–12PM EST', zone:'New York AM', phase:'DISTRIBUTION', desc:'The real directional move. Highest probability ICT setups happen here.', color:'#E8C547', bg:'rgba(232,197,71,0.06)' },
              { time:'10AM–12PM EST', zone:'London Close', phase:'REVERSAL', desc:'Banks close books. Profit taking creates reliable counter-moves.', color:'#34D399', bg:'rgba(52,211,153,0.06)' },
            ].map((s, i) => (
              <div key={i} className="card-hover" style={{ padding:'20px', borderRadius:'14px', background:s.bg, textAlign:'center' }}>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'9px', letterSpacing:'0.15em', color:s.color, marginBottom:'8px' }}>{s.phase}</div>
                <div style={{ fontWeight:700, fontSize:'15px', color:'white', marginBottom:'4px' }}>{s.zone}</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'9px', color:'rgba(255,255,255,0.35)', marginBottom:'10px' }}>{s.time}</div>
                <div style={{ fontSize:'12px', color:'rgba(255,255,255,0.5)', lineHeight:1.6, fontWeight:300 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCORD CTA ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#080808' }}>
        <div style={{ maxWidth:'700px', margin:'0 auto' }}>
          <div className="gold-glow" style={{ border:'1px solid rgba(232,197,71,0.2)', borderRadius:'24px', padding:'56px 40px', textAlign:'center', background:'linear-gradient(135deg, rgba(232,197,71,0.04) 0%, rgba(8,8,8,0) 100%)' }}>
            <div style={{ fontSize:'48px', marginBottom:'16px' }}>💬</div>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em', marginBottom:'16px' }}>// COMMUNITY</div>
            <h2 className="font-display" style={{ fontSize:'clamp(36px, 6vw, 60px)', color:'white', lineHeight:1, marginBottom:'16px' }}>
              JOIN THE<span className="gold-text"> DISCORD</span>
            </h2>
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'14px', lineHeight:1.7, fontWeight:300, marginBottom:'32px' }}>
              Daily market analysis. Live trade reviews. ICT concept discussions. 500+ traders sharing setups and helping each other grow.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
              <a href="https://discord.gg/bh2YK6vF" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding:'14px 28px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
                Join Discord — Free →
              </a>
              <Link href="/lesson/1" style={{ padding:'14px 28px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(232,197,71,0.25)', color:'rgba(255,255,255,0.6)', display:'inline-block' }}>
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section style={{ position:'relative', zIndex:10, padding:'80px 24px', textAlign:'center', borderTop:'1px solid rgba(232,197,71,0.08)', background:'#0A0A0A' }}>
        <div style={{ maxWidth:'800px', margin:'0 auto' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.5)', letterSpacing:'0.15em', marginBottom:'28px' }}>// ICT</div>
          <blockquote className="font-display" style={{ fontSize:'clamp(28px, 5vw, 52px)', color:'white', lineHeight:1.2, marginBottom:'20px' }}>
            "STOP TRYING TO PREDICT.<br />
            <span className="gold-text">START READING THE ALGORITHM."</span>
          </blockquote>
          <p style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'rgba(255,255,255,0.3)', letterSpacing:'0.2em' }}>— MICHAEL J. HUDDLESTON (ICT)</p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', borderTop:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', padding:'5px 14px', borderRadius:'100px', border:'1px solid rgba(232,197,71,0.2)', background:'rgba(232,197,71,0.04)', fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#E8C547', letterSpacing:'0.12em', marginBottom:'20px' }}>
              ★★★★★ STUDENT RESULTS
            </div>
            <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1 }}>
              TRADERS ARE<span className="gold-text"> WINNING</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(310px, 1fr))', gap:'16px' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card-hover" style={{ padding:'24px', borderRadius:'16px', background:'#111', display:'flex', flexDirection:'column', gap:'14px' }}>
                <div style={{ color:'#E8C547', fontSize:'13px', letterSpacing:'3px' }}>★★★★★</div>
                <p style={{ color:'rgba(255,255,255,0.65)', fontSize:'13px', lineHeight:1.75, fontWeight:300, flex:1 }}>"{t.text}"</p>
                <div style={{ display:'inline-flex', alignSelf:'flex-start', padding:'3px 10px', borderRadius:'4px', background:`${t.color}12`, border:`1px solid ${t.color}22`, fontFamily:'DM Mono,monospace', fontSize:'10px', color:t.color, letterSpacing:'0.06em' }}>
                  {t.tag}
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', paddingTop:'12px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:`${t.color}18`, border:`1px solid ${t.color}35`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Bebas Neue,sans-serif', fontSize:'14px', color:t.color, flexShrink:0 }}>
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontSize:'13px', color:'white', fontWeight:500 }}>{t.name}</div>
                    <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>{t.handle}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#0A0A0A', borderTop:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'640px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.6)', letterSpacing:'0.15em', marginBottom:'16px' }}>// BEGIN NOW</div>
          <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1, marginBottom:'16px' }}>
            READY TO THINK<br /><span className="gold-text">LIKE SMART MONEY?</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'14px', lineHeight:1.7, fontWeight:300, marginBottom:'36px' }}>
            Join 500+ traders who stopped guessing and started reading institutional footprints. 28 modules. 80+ lessons. $0 forever.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <Link href="/lesson/1" className="btn-gold" style={{ padding:'16px 36px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'13px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
              Start Lesson 1 Now — Free →
            </Link>
            <Link href="/glossary" style={{ padding:'16px 28px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(232,197,71,0.2)', color:'rgba(255,255,255,0.55)', display:'inline-block' }}>
              ICT Glossary
            </Link>
          </div>
        </div>
      </section>

      <EmailCapture />
      <Footer />
    </div>
  );
}
