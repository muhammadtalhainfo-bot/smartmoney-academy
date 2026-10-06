import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
const MarketTicker = dynamic(() => import('@/app/components/MarketTicker'));
const EmailCapture = dynamic(() => import('@/app/components/EmailCapture'));
import Footer from '@/app/components/Footer';
import { MODULES, CURRICULUM_STATS } from '@/lib/curriculum';


const COURSES = MODULES.slice(0, 12);
const RECENT_MODULES = MODULES.filter((m) => m.isNew).slice(-2);

const LEVEL_STYLE = {
  Beginner: { color: '#34D399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  Intermediate: { color: '#E8C547', bg: 'rgba(232,197,71,0.08)', border: 'rgba(232,197,71,0.2)' },
  Advanced: { color: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
};


const STEPS = [
  { num: '01', title: 'Start with Foundations', desc: 'New to trading? Begin with Trading Foundations — what markets are, how sessions work, risk basics. No jargon.', href: '/foundations', cta: 'Start Foundations' },
  { num: '02', title: 'Study the ICT Modules', desc: '38 modules spanning market structure, liquidity, execution, risk, indices, gold and crypto. Each module is structured for deliberate study.', href: '/courses', cta: 'Browse Modules' },
  { num: '03', title: 'Practice & Apply', desc: 'Use the Trade Journal to log trades. Take daily quizzes to test your knowledge. Track progress on your dashboard.', href: '/journal', cta: 'Open Journal' },
];

const PLATFORM_HIGHLIGHTS = [
  { icon: '01', title: 'Structured curriculum', desc: '38 modules arranged from foundations through advanced concepts, execution and risk.' },
  { icon: '02', title: 'Lessons with checks', desc: 'Readable lessons, examples and knowledge checks make passive watching more active study.' },
  { icon: '03', title: 'Practice tools', desc: 'Use the journal, glossary and quizzes to turn concepts into a repeatable study process.' },
  { icon: '04', title: 'Built for independent study', desc: 'Original explanations and navigation keep the learning path usable without hunting through scattered videos.' },
];

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', overflowX: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
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
        .hero-outline:hover { border-color:#E8C547!important; color:#E8C547!important; }
        .card-hover:hover { border-color: rgba(232,197,71,0.4); transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,0.4); }
        .gold-text { background: linear-gradient(135deg, #D4A843 0%, #E8C547 40%, #F0C96A 60%, #E8C547 80%, #D4A843 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .gold-glow { box-shadow: 0 0 40px rgba(232,197,71,0.12), 0 0 80px rgba(212,168,67,0.05); }
        @media (max-width: 768px) { .hide-mob { display:none!important; } }
        @media (min-width: 769px) { .show-mob { display:none!important; } }
      `}</style>

      <MarketTicker />

      <Navbar active="/" />

      {/* ── HERO ── */}
      <section className="grid-bg" style={{ position:'relative', zIndex:10, minHeight:'90vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'80px 24px' }}>
        <div style={{ position:'absolute', top:'35%', left:'50%', transform:'translate(-50%,-50%)', width:'min(700px,90vw)', height:'min(700px,90vw)', background:'radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 65%)', pointerEvents:'none' }} />

        {/* Live badge */}
        <div className="fade-up d1" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'100px', border:'1px solid rgba(232,197,71,0.3)', background:'rgba(232,197,71,0.04)', marginBottom:'28px' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'#E8C547', display:'inline-block', animation:'pulse 2s infinite' }} />
          <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#E8C547', letterSpacing:'0.15em' }}>FREE ICT & SMART MONEY EDUCATION</span>
        </div>

        <h1 className="fade-up d2 font-display" style={{ fontSize:'clamp(56px, 10vw, 120px)', lineHeight:0.9, marginBottom:'24px', maxWidth:'1100px' }}>
          <span style={{ display:'block', color:'white' }}>LEARN ICT</span>
          <span className="gold-text" style={{ display:'block' }}>WITH STRUCTURE</span>
        </h1>

        <p className="fade-up d3" style={{ color:'rgba(255,255,255,0.6)', fontSize:'clamp(15px, 2vw, 18px)', maxWidth:'520px', lineHeight:1.7, marginBottom:'12px', fontWeight:300 }}>
          Study a structured 38-module ICT curriculum — from market structure and liquidity to execution, risk management, indices, gold and crypto.
          <strong style={{ color:'rgba(255,255,255,0.9)', fontWeight:500 }}> Start free, then choose whether Pro tools are useful to you.</strong>
        </p>

        <p className="fade-up d3" style={{ color:'rgba(232,197,71,0.7)', fontFamily:'DM Mono,monospace', fontSize:'11px', letterSpacing:'0.12em', marginBottom:'36px' }}>
          A GROWING COMMUNITY OF TRADERS
        </p>

        <div className="fade-up d4" style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center', marginBottom:'56px' }}>
          <Link href="/lesson/1" className="btn-gold" style={{ padding:'16px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
            Start Lesson 1 — Free →
          </Link>
          <Link href="/courses" style={{ padding:'16px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(232,197,71,0.3)', color:'rgba(255,255,255,0.7)', transition:'all 0.2s', display:'inline-block' }}
            className="hero-outline">
            Explore 38 Modules
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-up d5" style={{ display:'flex', gap:'48px', flexWrap:'wrap', justifyContent:'center' }}>
          {[[String(CURRICULUM_STATS.moduleCount), 'ICT Modules'], [`${CURRICULUM_STATS.lessonCount}+`, 'Lessons'], ['$0', 'Cost'], ['2026', 'Updated']].map(([v, l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div className="font-display gold-text" style={{ fontSize:'42px' }}>{v}</div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#C5CCD6', letterSpacing:'0.15em', textTransform:'uppercase', marginTop:'4px' }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent, rgba(232,197,71,0.3), transparent)' }} />
      </section>

      {/* ── WHY FREE ── */}
      <section style={{ position:'relative', zIndex:10, background:'#0A0A0A', borderBottom:'1px solid rgba(232,197,71,0.1)', padding:'48px 24px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'32px' }}>
            <span style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em' }}>// WHY IS IT FREE?</span>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'16px' }}>
            {[
              { icon:'📖', title:'Knowledge, organized', desc:'ICT and SMC concepts are widely available in fragmented formats. ICT Flow turns them into a structured study path with practice and review tools.' },

              { icon:'⚡', title:'Pro plan for serious traders', desc:'Advanced traders can unlock extra tools with Pro. But every lesson, every module? Always free.' },
            ].map((item, i) => (
              <div key={i} className="card-hover" style={{ padding:'20px', borderRadius:'14px', background:'rgba(232,197,71,0.02)' }}>
                <div style={{ fontSize:'22px', marginBottom:'10px' }}>{item.icon}</div>
                <div style={{ fontWeight:600, fontSize:'14px', color:'white', marginBottom:'6px' }}>{item.title}</div>
                <div style={{ fontSize:'13px', color:'#C5CCD6', lineHeight:1.6, fontWeight:300 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#080808' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'12px' }}>// HOW IT WORKS</div>
            <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1 }}>THREE STEPS TO<span className="gold-text"> ICT</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'24px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="card-hover" style={{ padding:'28px', borderRadius:'16px', background:'#0F0F0F', position:'relative', overflow:'hidden' }}>
                <div className="font-display" style={{ fontSize:'80px', color:'rgba(232,197,71,0.04)', position:'absolute', top:'-10px', right:'16px', lineHeight:1, userSelect:'none' }}>{s.num}</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'rgba(232,197,71,0.7)', letterSpacing:'0.15em', marginBottom:'12px' }}>STEP {s.num}</div>
                <h3 style={{ fontWeight:600, fontSize:'17px', color:'white', marginBottom:'10px' }}>{s.title}</h3>
                <p style={{ fontSize:'13px', color:'#C5CCD6', lineHeight:1.7, fontWeight:300, marginBottom:'20px' }}>{s.desc}</p>
                <Link href={s.href} style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#E8C547', textDecoration:'none', letterSpacing:'0.1em', textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap:'6px' }}>
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#0A0A0A', borderTop:'1px solid rgba(232,197,71,0.08)', borderBottom:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'52px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'12px' }}>// THE PLATFORM</div>
            <h2 className="font-display" style={{ fontSize:'clamp(38px, 6vw, 70px)', color:'white', lineHeight:1, marginBottom:'14px' }}>
              BUILT FOR <span className="gold-text">DELIBERATE STUDY</span>
            </h2>
            <p style={{ maxWidth:'680px', margin:'0 auto', fontSize:'14px', lineHeight:1.8, color:'#C5CCD6', fontWeight:300 }}>
              Less tab-hopping. More structured learning. ICT Flow combines the curriculum, reference material and practice tools in one place.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px' }}>
            {PLATFORM_HIGHLIGHTS.map((item) => (
              <div key={item.icon} className="card-hover" style={{ background:'#0F0F0F', borderRadius:'18px', padding:'26px', minHeight:'200px', position:'relative', overflow:'hidden' }}>
                <div className="font-mono" style={{ fontSize:'11px', letterSpacing:'0.15em', color:'#E8C547', marginBottom:'34px' }}>{item.icon}</div>
                <h3 style={{ color:'white', fontSize:'17px', fontWeight:600, marginBottom:'10px' }}>{item.title}</h3>
                <p style={{ color:'#C5CCD6', fontSize:'13px', lineHeight:1.7, fontWeight:300 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ADDITIONS ── */}
      <section style={{ position:'relative', zIndex:10, padding:'72px 24px', background:'#080808', borderTop:'1px solid rgba(232,197,71,0.06)', borderBottom:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'24px', flexWrap:'wrap', marginBottom:'28px' }}>
            <div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'10px' }}>// RECENT ADDITIONS</div>
              <h2 className="font-display" style={{ fontSize:'clamp(38px, 6vw, 64px)', color:'white', lineHeight:1 }}>NEW TO THE <span className="gold-text">CURRICULUM.</span></h2>
            </div>
            <p style={{ maxWidth:'420px', color:'#C5CCD6', fontSize:'13px', lineHeight:1.7, fontWeight:300, margin:0 }}>
              The latest additions focus on turning concepts into a repeatable review process and a more disciplined response to scheduled news and fast markets.
            </p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'16px' }}>
            {RECENT_MODULES.map((m) => (
              <Link key={m.id} href={`/lesson/${m.id}`} style={{ textDecoration:'none' }}>
                <div className="card-hover" style={{ padding:'22px', borderRadius:'16px', background:'linear-gradient(145deg, rgba(232,197,71,0.05), rgba(255,255,255,0.01))', height:'100%' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
                    <span style={{ fontFamily:'DM Mono,monospace', fontSize:'9px', letterSpacing:'0.16em', color:'#E8C547' }}>MODULE {m.module}</span>
                    <span style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#C5CCD6' }}>{m.lessons} LESSONS</span>
                  </div>
                  <h3 style={{ fontFamily:'Bebas Neue, sans-serif', fontSize:'27px', letterSpacing:'0.03em', color:'white', margin:'0 0 10px' }}>{m.title}</h3>
                  <p style={{ color:'#C5CCD6', fontSize:'13px', lineHeight:1.7, margin:'0 0 18px' }}>{m.desc}</p>
                  <span style={{ color:'#E8C547', fontFamily:'DM Mono,monospace', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase' }}>Open module →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES ── */}
      <section className="grid-bg" style={{ position:'relative', zIndex:10, padding:'96px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'56px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'12px' }}>// CURRICULUM</div>
            <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1, marginBottom:'12px' }}>WHAT YOU'LL LEARN</h2>
            <p style={{ fontSize:'15px', color:'#C5CCD6', fontWeight:300 }}>38 modules. Structured independently around ICT and SMC concepts, with original explanations and practice.</p>
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
                    <p style={{ fontSize:'13px', color:'#C5CCD6', lineHeight:1.6, fontWeight:300, flex:1 }}>{c.desc}</p>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'14px', paddingTop:'12px', borderTop:'1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#D8B94F', letterSpacing:'0.08em' }}>{c.lessons} LESSONS</span>
                      <span style={{ color:'#E8C547', fontSize:'14px' }}>→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign:'center' }}>
            <Link href="/courses" className="btn-gold" style={{ padding:'14px 32px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
              Explore 38 Modules →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SESSION MAP ── */}
      <section style={{ position:'relative', zIndex:10, borderTop:'1px solid rgba(232,197,71,0.08)', borderBottom:'1px solid rgba(232,197,71,0.08)', background:'#0A0A0A', padding:'72px 24px' }}>
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'10px' }}>// ICT DAILY BLUEPRINT</div>
            <h2 className="font-display" style={{ fontSize:'clamp(32px, 5vw, 56px)', color:'white' }}>A DAILY ICT-STYLE FRAMEWORK</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'12px' }}>
            {[
              { time:'8PM–12AM EST', zone:'Asian', phase:'ACCUMULATION', desc:'Traders may study the Asian Range as context for session highs, lows and potential liquidity.', color:'#6366F1', bg:'rgba(99,102,241,0.06)' },
              { time:'2AM–5AM EST', zone:'London', phase:'MANIPULATION', desc:'An opposite-direction move may be studied as a possible Judas Swing or liquidity sweep; participant intent cannot be confirmed from the chart.', color:'#F87171', bg:'rgba(248,113,113,0.06)' },
              { time:'7AM–12PM EST', zone:'New York AM', phase:'DISTRIBUTION', desc:'Some ICT traders focus on this window for execution; setup quality and outcomes vary by market and day.', color:'#E8C547', bg:'rgba(232,197,71,0.06)' },
              { time:'10AM–12PM EST', zone:'London Close', phase:'REVERSAL', desc:'Activity can change around the close as positions are adjusted; treat the move as a hypothesis, not a guarantee.', color:'#34D399', bg:'rgba(52,211,153,0.06)' },
            ].map((s, i) => (
              <div key={i} className="card-hover" style={{ padding:'20px', borderRadius:'14px', background:s.bg, textAlign:'center' }}>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'9px', letterSpacing:'0.15em', color:s.color, marginBottom:'8px' }}>{s.phase}</div>
                <div style={{ fontWeight:700, fontSize:'15px', color:'white', marginBottom:'4px' }}>{s.zone}</div>
                <div style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#C5CCD6', marginBottom:'10px' }}>{s.time}</div>
                <div style={{ fontSize:'12px', color:'#C5CCD6', lineHeight:1.6, fontWeight:300 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE SEO GUIDES ── */}
      <section style={{ position:'relative', zIndex:10, padding:'80px 24px', background:'#0A0A0A', borderTop:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'20px', flexWrap:'wrap', marginBottom:'28px' }}>
            <div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'10px' }}>// FREE ICT GUIDES</div>
              <h2 className="font-display" style={{ fontSize:'clamp(36px, 5vw, 58px)', color:'white', lineHeight:1 }}>LEARN THE <span className="gold-text">CORE CONCEPTS</span></h2>
            </div>
            <Link href="/learn" style={{ color:'#E8C547', fontFamily:'DM Mono,monospace', fontSize:'11px', letterSpacing:'0.1em', textDecoration:'none', textTransform:'uppercase' }}>View all guides →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'12px' }}>
            {[
              ['What Is ICT Trading?', '/learn/what-is-ict-trading'],
              ['Market Structure', '/learn/ict-market-structure'],
              ['Liquidity & Sweeps', '/learn/ict-liquidity'],
              ['Fair Value Gaps', '/learn/fair-value-gap-trading'],
              ['Order Blocks', '/learn/ict-order-block'],
              ['ICT 2022 Model', '/learn/ict-2022-model'],
            ].map(([title, href]) => (
              <Link key={href} href={href} className="card-hover" style={{ padding:'18px', borderRadius:'14px', background:'#0F0F0F', textDecoration:'none' }}>
                <div style={{ color:'white', fontSize:'14px', fontWeight:600, lineHeight:1.4 }}>{title}</div>
                <div style={{ color:'#E8C547', fontFamily:'DM Mono,monospace', fontSize:'9px', letterSpacing:'0.12em', marginTop:'10px', textTransform:'uppercase' }}>Read guide →</div>
              </Link>
            ))}
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
          <p style={{ fontFamily:'DM Mono,monospace', fontSize:'10px', color:'#B9C1CC', letterSpacing:'0.2em' }}>— MICHAEL J. HUDDLESTON (ICT)</p>
        </div>
      </section>

      {/* ── STUDY STACK ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', borderTop:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'24px', flexWrap:'wrap', marginBottom:'40px' }}>
            <div>
              <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'12px' }}>// STUDY STACK</div>
              <h2 className="font-display" style={{ fontSize:'clamp(38px, 6vw, 68px)', color:'white', lineHeight:1 }}>ONE PLACE. <span className="gold-text">FOUR TOOLS.</span></h2>
            </div>
            <Link href="/courses" style={{ color:'#E8C547', fontFamily:'DM Mono,monospace', fontSize:'11px', letterSpacing:'0.1em', textDecoration:'none', textTransform:'uppercase' }}>Browse curriculum →</Link>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'16px' }}>
            {[
              ['CURRICULUM', '38 modules', 'Progress from trading foundations to advanced ICT and SMC concepts.'],
              ['GLOSSARY', '97 terms', 'Quick definitions for the vocabulary used throughout the lessons.'],
              ['PRACTICE', 'Daily checks', 'Use quizzes to test recall instead of rereading everything.'],
              ['JOURNAL', 'Trade review', 'Record setups, outcomes and observations in a dedicated workspace.'],
            ].map(([k, v, d]) => (
              <div key={k} className="card-hover" style={{ padding:'24px', borderRadius:'16px', background:'#0F0F0F', display:'grid', gridTemplateColumns:'120px 1fr', gap:'18px', alignItems:'start' }}>
                <div className="font-mono" style={{ fontSize:'10px', letterSpacing:'0.14em', color:'#E8C547' }}>{k}</div>
                <div><div style={{ color:'white', fontSize:'17px', fontWeight:600, marginBottom:'6px' }}>{v}</div><p style={{ color:'#C5CCD6', fontSize:'13px', lineHeight:1.7, margin:0 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ position:'relative', zIndex:10, padding:'96px 24px', background:'#0A0A0A', borderTop:'1px solid rgba(232,197,71,0.08)' }}>
        <div style={{ maxWidth:'640px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontFamily:'DM Mono,monospace', fontSize:'11px', color:'#D8B94F', letterSpacing:'0.15em', marginBottom:'16px' }}>// BEGIN NOW</div>
          <h2 className="font-display" style={{ fontSize:'clamp(40px, 7vw, 72px)', color:'white', lineHeight:1, marginBottom:'16px' }}>
            READY TO BUILD<br /><span className="gold-text">A STRUCTURED PROCESS?</span>
          </h2>
          <p style={{ color:'#C5CCD6', fontSize:'15px', lineHeight:1.7, fontWeight:300, marginBottom:'36px' }}>
            Build a structured trading study process around concepts, practice and review. 38 modules. 203+ lessons. Start free.
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'12px', justifyContent:'center' }}>
            <Link href="/lesson/1" className="btn-gold" style={{ padding:'16px 36px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'13px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', display:'inline-block' }}>
              Start Lesson 1 Now — Free →
            </Link>
            <Link href="/glossary" style={{ padding:'16px 28px', borderRadius:'12px', fontFamily:'DM Mono,monospace', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', textDecoration:'none', border:'1px solid rgba(232,197,71,0.2)', color:'#C5CCD6', display:'inline-block' }}>
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
