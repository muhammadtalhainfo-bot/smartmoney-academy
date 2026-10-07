import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function CookiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

      `}</style>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#E8C547', letterSpacing: '0.2em', marginBottom: '12px' }}>{'// Legal'}</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', color: 'white', marginBottom: '8px', letterSpacing: '0.05em' }}>COOKIE POLICY</h1>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px' }}>Last updated: October 2026</div>
                <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>What Are Cookies</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Cookies are small text files stored on your device when you visit a website. We use cookies to keep you logged in and improve your experience.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Cookies We Use</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Authentication cookies (Supabase session), consent preferences, and consent-gated analytics technologies such as Google Analytics. When advertising is enabled, Google and its partners may use advertising cookies or similar technologies as described in their policies.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Third Party Cookies</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Third-party providers may use cookies or similar storage technologies as part of their services. ICT Flow loads Google Analytics, Google advertising services when enabled, and OneSignal only after the applicable site consent is accepted.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Managing Cookies</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>You can control cookies through your browser settings and any consent controls presented on the site. Disabling some cookies may affect login, analytics, or advertising functionality. In regions where additional consent is required for personalized advertising, ICT Flow must use the applicable Google-supported consent tooling before personalized ads are served.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Contact</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>For cookie-related questions, please contact the ICT Flow team.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
