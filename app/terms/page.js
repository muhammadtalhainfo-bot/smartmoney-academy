'use client';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(212,168,67,0.6)', letterSpacing: '0.2em', marginBottom: '12px' }}>// Legal</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', color: 'white', marginBottom: '8px', letterSpacing: '0.05em' }}>TERMS OF SERVICE</h1>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '48px' }}>Last updated: March 2026</div>
                <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>Acceptance of Terms</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>By accessing ICT Flow, you agree to these terms. If you do not agree, please do not use the platform.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>Educational Purpose Only</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>ICT Flow provides educational content about trading concepts only. Nothing on this platform constitutes financial advice, investment advice, or a recommendation to buy or sell any financial instrument.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>User Accounts</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>You are responsible for maintaining the security of your account. You must provide accurate information when creating an account. You must be 18 years or older to use this platform.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>Pro Subscription</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Pro subscriptions are billed monthly or annually via Stripe. You can cancel at any time. Refunds are handled on a case-by-case basis within 7 days of purchase.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>Prohibited Use</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>You may not resell or redistribute our content, use automated tools to scrape content, share your account with others, or use the platform for any unlawful purpose.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>Disclaimer of Liability</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>ICT Flow is not liable for any trading losses. Trading involves substantial risk. Past performance shown in examples does not guarantee future results.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#D4A843', marginBottom: '12px', letterSpacing: '0.05em' }}>Changes to Terms</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>We may update these terms at any time. Continued use of the platform constitutes acceptance of updated terms.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
