'use client';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function CookiesPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#E8C547', letterSpacing: '0.2em', marginBottom: '12px' }}>// Legal</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', color: 'white', marginBottom: '8px', letterSpacing: '0.05em' }}>COOKIE POLICY</h1>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px' }}>Last updated: September 2026</div>
                <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>What Are Cookies</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Cookies are small text files stored on your device when you visit a website. We use cookies to keep you logged in and improve your experience.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Cookies We Use</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Authentication cookies (Supabase session), preference cookies, analytics technologies, and—when advertising is enabled—advertising cookies or similar technologies used by Google and its partners.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Third Party Cookies</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Stripe may set cookies for payment processing. Vercel may set cookies for performance optimization. Google may use advertising cookies or similar technologies when AdSense is enabled.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Managing Cookies</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>You can control cookies through your browser settings and any consent controls presented on the site. Disabling some cookies may affect login, analytics, or advertising functionality. In regions where additional consent is required for personalized advertising, ICT Flow must use the applicable Google-supported consent tooling before personalized ads are served.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Contact</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>For cookie-related questions, contact us via Discord at discord.gg/bh2YK6vF.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
