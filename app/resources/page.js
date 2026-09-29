'use client';
import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

const PROP_FIRMS = [
  { name:'FTMO', logo:'🏆', color:'#F59E0B', tag:'MOST POPULAR', tagColor:'#F59E0B', desc:'FTMO offers simulated trading accounts of up to $200,000; current program terms and eligibility apply.', payout:'80–90% profit split', challenge:'See FTMO for current Challenge pricing', link:'https://ftmo.com/', features:['2-step evaluation','10% max drawdown','No time limit','Bi-weekly payouts'] },
  { name:'The Funded Trader', logo:'💎', color:'#8B5CF6', tag:'HIGH PAYOUT', tagColor:'#8B5CF6', desc:"Offers evaluation programs and profit-sharing terms that can change; review the provider's current terms before purchasing.", payout:'Up to 90% profit split', challenge:'See provider for current Challenge pricing', link:'https://thefundedtrader.com/', features:['Standard & Royal plans','Unlimited trading days','Weekend holding','Scaling options vary by program; see provider for current limits'] },
  { name:'E8 Funding', logo:'⚡', color:'#10B981', tag:'BEGINNER FRIENDLY', tagColor:'#10B981', desc:"Offers evaluation programs and payout terms; rules and pricing should be checked on the provider's current site.", payout:'80% profit split', challenge:'See provider for current Challenge pricing', link:'https://e8funding.com/', features:['1-step option available','No minimum trading days','Easy scaling plan','See provider for current drawdown rules'] },
  { name:'Apex Trader Funding', logo:'🚀', color:'#3B82F6', tag:'FUTURES FOCUS', tagColor:'#3B82F6', desc:"A futures-focused evaluation provider with published payout rules; compare its current terms with your requirements.", payout:'100% first $25K then 90%', challenge:'See provider for current evaluation pricing', link:'https://apextraderfunding.com/', features:['1-step evaluation','Futures only','100% first payout','Multiple accounts'] },
];
const BROKERS = [
  { name:'Pepperstone', logo:'🌶️', color:'#EF4444', desc:'Offers Standard and Razor account structures; spreads and commissions vary by instrument, account type and jurisdiction.', spread:'FX Razor spreads start from 0.0 points; see current instrument-specific pricing.', platforms:'MT4, MT5, cTrader', link:'https://pepperstone.com/' },
  { name:'IC Markets', logo:'📊', color:'#E8C547', desc:'Offers multiple account types and trading platforms; execution conditions, spreads and commissions vary by account and jurisdiction.', spread:'See broker for current instrument-specific spreads', platforms:'MT4, MT5, cTrader', link:'https://icmarkets.com/' },
];
const TOOLS = [
  { name:'TradingView', logo:'📈', color:'#2962FF', desc:'A charting platform that supports drawing tools, indicators and multi-market analysis.', price:'Plans and pricing vary; see TradingView for current pricing.', link:'https://www.tradingview.com/', highlight:'CHARTING' },
  { name:'ICT Mentorship (Official)', logo:'🎓', color:'#E8C547', desc:"Michael Huddleston's official YouTube channel. Free content — use alongside ICT Flow.", price:'Free on YouTube', link:'https://youtube.com/@InnerCircleTrader', highlight:'FREE' },
];

const styles = {
  card:{ textDecoration:'none', display:'block', background:'#111111', border:'1px solid var(--border)', borderRadius:'16px', padding:'28px', position:'relative', overflow:'hidden' },
  label:{ fontFamily:'DM Mono, monospace', fontSize:'9px', color:'rgba(255,255,255,0.65)', letterSpacing:'0.1em', marginBottom:'4px' },
};

export default function ResourcesPage() {
  const [activeTab,setActiveTab] = useState('prop');
  return <div style={{minHeight:'100vh',background:'#080808',color:'white',fontFamily:"'DM Sans',sans-serif"}}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      :root{--gold:#E8C547;--border:rgba(212,168,67,0.22)}
      .card-hover{transition:all .25s;cursor:pointer}.card-hover:hover{transform:translateY(-3px);border-color:rgba(212,168,67,.35)!important}
      .tab-btn{transition:all .2s}.shine{background:linear-gradient(135deg,#8A6B28 0%,#E8C547 40%,#F0C96A 60%,#E8C547 80%,#8A6B28 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
      .font-display{font-family:'Bebas Neue',sans-serif}.font-mono-c{font-family:'DM Mono',monospace}
    `}</style>
    <Navbar active="/resources"/>
    <section style={{padding:'80px 24px 60px',textAlign:'center',borderBottom:'1px solid var(--border)',position:'relative',overflow:'hidden'}}>
      <div style={{maxWidth:'700px',margin:'0 auto'}}>
        <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'6px 16px',borderRadius:'100px',border:'1px solid var(--border)',background:'rgba(212,168,67,.04)',fontFamily:'DM Mono,monospace',fontSize:'11px',letterSpacing:'.15em',color:'#E8C547',marginBottom:'24px'}}>TRADING RESOURCES</div>
        <h1 className="font-display shine" style={{fontSize:'clamp(52px,10vw,96px)',lineHeight:1,marginBottom:'20px'}}>TRADING RESOURCES</h1>
        <p style={{color:'rgba(255,255,255,.55)',fontSize:'16px',fontWeight:300,lineHeight:1.7,maxWidth:'500px',margin:'0 auto 12px'}}>A collection of external trading platforms and educational resources. Check each provider's current terms, pricing, and availability before using any service.</p>
        <p style={{color:'#E8C547',fontSize:'12px',fontFamily:'DM Mono,monospace',letterSpacing:'.1em'}}>⚠️ TRADING INVOLVES RISK — ONLY USE CAPITAL YOU CAN AFFORD TO LOSE</p>
      </div>
    </section>
    <section style={{position:'sticky',top:'64px',zIndex:30,background:'rgba(8,8,8,.97)',backdropFilter:'blur(20px)',borderBottom:'1px solid var(--border)',padding:'0 24px'}}>
      <div style={{maxWidth:'1100px',margin:'0 auto',display:'flex'}}>
        {[['prop','Prop Firms'],['brokers','Brokers'],['tools','Tools & Platforms']].map(([key,label])=><button key={key} className="tab-btn" onClick={()=>setActiveTab(key)} style={{padding:'16px 24px',background:'none',border:'none',fontFamily:'DM Mono,monospace',fontSize:'11px',letterSpacing:'.12em',textTransform:'uppercase',cursor:'pointer',color:activeTab===key?'#E8C547':'rgba(255,255,255,.7)',borderBottom:activeTab===key?'2px solid #E8C547':'2px solid transparent',marginBottom:'-1px'}}>{label}</button>)}
      </div>
    </section>
    <div style={{maxWidth:'1100px',margin:'0 auto',padding:'48px 24px'}}>
      {activeTab==='prop' && <ResourceGrid title="PROP TRADING FIRMS" subtitle="Get funded up to $200,000 — trade with their capital, keep the profits" items={PROP_FIRMS} primary="funded"/>}
      {activeTab==='brokers' && <ResourceGrid title="BROKERS" subtitle="For personal trading — execution conditions and account structures vary" items={BROKERS} primary="account"/>}
      {activeTab==='tools' && <ResourceGrid title="TOOLS & PLATFORMS" subtitle="Tools and platforms commonly used for charting and trading workflows" items={TOOLS} primary="started"/>}
      <div style={{marginTop:'64px',padding:'24px',background:'rgba(212,168,67,.03)',border:'1px solid rgba(232,197,71,.95)',borderRadius:'12px'}}>
        <p style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,.6)',lineHeight:1.8,letterSpacing:'.05em',margin:0}}><span style={{color:'#E8C547'}}>DISCLAIMER:</span> This page lists external resources for educational convenience. ICT Flow does not receive payments from these links. Provider terms, pricing, and availability can change. Trading financial instruments involves significant risk of loss and is not suitable for all investors. Past performance is not indicative of future results. This is not financial advice.</p>
      </div>
    </div>
    <Footer/>
  </div>;
}

function ResourceGrid({title,subtitle,items,primary}) {
  return <><div style={{marginBottom:'32px'}}><h2 className="font-display" style={{fontSize:'36px',color:'white',marginBottom:'8px'}}>{title}</h2><p style={{color:'rgba(255,255,255,.7)',fontSize:'14px',fontFamily:'DM Mono,monospace'}}>{subtitle}</p></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(440px,1fr))',gap:'20px'}}>
      {items.map(item=><a key={item.name} href={item.link} target="_blank" rel="noopener noreferrer" className="card-hover" style={styles.card}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
          <div style={{width:'48px',height:'48px',borderRadius:'12px',background:item.color+'15',border:'1px solid '+item.color+'30',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>{item.logo}</div>
          <div className="font-display" style={{fontSize:'24px',color:'white',letterSpacing:'.05em'}}>{item.name}</div>
          {item.highlight && <span style={{marginLeft:'auto',fontFamily:'DM Mono,monospace',fontSize:'10px',color:item.color,letterSpacing:'.1em'}}>{item.highlight}</span>}
        </div>
        <p style={{color:'rgba(255,255,255,.55)',fontSize:'14px',lineHeight:1.6,marginBottom:'20px'}}>{item.desc}</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'20px'}}>
          {item.payout && <Info label="Profit Split" value={item.payout}/>}
          {item.challenge && <Info label="Challenge Cost" value={item.challenge}/>}
          {item.spread && <Info label="Spreads" value={item.spread}/>}
          {item.platforms && <Info label="Platforms" value={item.platforms}/>}
          {item.price && <Info label="Pricing" value={item.price}/>}
        </div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'6px',marginBottom:'20px'}}>
          {item.features?.map(f=><span key={f} style={{fontSize:'11px',color:'rgba(255,255,255,.85)',background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.18)',borderRadius:'4px',padding:'3px 10px'}}>✓ {f}</span>)}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:'16px',borderTop:'1px solid var(--border)'}}>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'11px',color:'rgba(255,255,255,.6)',letterSpacing:'.1em'}}>OFFICIAL LINK</span>
          <span style={{fontFamily:'DM Mono,monospace',fontSize:'12px',color:item.color,letterSpacing:'.1em'}}>GET {primary.toUpperCase()} →</span>
        </div>
      </a>)}
    </div>
  </>;
}
