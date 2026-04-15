'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: '1px solid rgba(212,168,67,0.1)', background: '#080808', marginTop: '80px' }}>

      {/* DISCLAIMER BAR */}
      <div style={{ background: 'rgba(212,168,67,0.04)', borderBottom: '1px solid rgba(212,168,67,0.08)', padding: '16px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <span style={{ color: '#D4A843', fontSize: '16px', flexShrink: 0, marginTop: '1px' }}>⚠️</span>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, letterSpacing: '0.04em', margin: 0 }}>
            <span style={{ color: 'rgba(212,168,67,0.7)', fontWeight: 500 }}>RISK DISCLAIMER: </span>
            Trading foreign exchange, indices, commodities, and other financial instruments involves substantial risk of loss and is not suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade, you should carefully consider your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment. ICT Flow provides educational content only — nothing on this platform constitutes financial advice, investment advice, or a recommendation to buy or sell any financial instrument. Past performance is not indicative of future results. Always seek independent financial advice if required.
          </p>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>

          {/* BRAND */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/ictflow-symbol.svg" alt="ICT Flow" style={{ width: '34px', height: '34px', borderRadius: '8px' }} />
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '0.15em', color: 'white' }}>ICT FLOW</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#B8924A', letterSpacing: '0.2em' }}>ACADEMY</div>
              </div>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.7, marginBottom: '16px' }}>
              Free ICT & Smart Money Concepts education. Trade like institutions.
            </p>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.85)', letterSpacing: '0.1em' }}>
              © {year} ICT FLOW
            </div>
          </div>

          {/* LEARN */}
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.85)', letterSpacing: '0.15em', marginBottom: '16px' }}>LEARN</div>
            {[['/', 'Home'], ['/foundations', 'Trading Foundations'], ['/courses', 'Courses'], ['/mentorship', '2022 Mentorship'], ['/glossary', 'ICT Glossary']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: '10px' }}>
                <Link href={href} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '13px', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#D4A843'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>{label}</Link>
              </div>
            ))}
          </div>

          {/* TOOLS */}
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.85)', letterSpacing: '0.15em', marginBottom: '16px' }}>TOOLS</div>
            {[['/journal', 'Trade Journal'], ['/dashboard', 'Dashboard'], ['/practice', 'Daily Practice'], ['/resources', 'Resources']].map(([href, label]) => (
              <div key={href} style={{ marginBottom: '10px' }}>
                <Link href={href} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '13px', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#D4A843'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>{label}</Link>
              </div>
            ))}
          </div>

          {/* LEGAL */}
          <div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.85)', letterSpacing: '0.15em', marginBottom: '16px' }}>LEGAL</div>
            {[['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Service'], ['/cookies', 'Cookie Policy'], ['/resources', 'Affiliate Disclosure']].map(([href, label], i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <Link href={href} style={{ textDecoration: 'none', color: 'rgba(255,255,255,0.65)', fontSize: '13px', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#D4A843'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.65)'}>{label}</Link>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}>
            FOR EDUCATIONAL PURPOSES ONLY · NOT FINANCIAL ADVICE
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {[['𝕏', 'https://x.com/riskfirsttrad'], ['▶', 'https://youtube.com/@smart_money_academy0'], ['📱', 'https://www.tiktok.com/@smart.money.academy'], ['💬', 'https://discord.gg/bh2YK6vF']].map(([icon, href]) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(212,168,67,0.3)'; e.currentTarget.style.color = '#D4A843'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
