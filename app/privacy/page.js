import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`

      `}</style>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#E8C547', letterSpacing: '0.2em', marginBottom: '12px' }}>// Legal</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '56px', color: 'white', marginBottom: '8px', letterSpacing: '0.05em' }}>PRIVACY POLICY</h1>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '48px' }}>Last updated: October 2026</div>
                <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Information We Collect</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>We collect your email address and name when you create an account. We also collect trade journal data you voluntarily enter, lesson completion data, and XP progress. We do not collect payment card details — these are handled securely by Stripe.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>How We Use Your Information</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Your information is used to provide and improve ICT Flow services, track your learning progress, send educational updates if you opt in, and process payments via Stripe.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Data Storage</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>Your data is stored securely on Supabase (PostgreSQL). Your account data and trade journal entries are protected by account-level access controls; authorized ICT Flow administrators may access operational data when needed for support, account management, or site operations.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Third Party Services</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>We use Supabase (database and authentication), Stripe (payments), Vercel (hosting), OneSignal (push notifications), Anthropic (AI Coach processing), and Google Analytics/Google advertising services when enabled. Each provider has its own privacy policy.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>AI Coach</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>When you use AI Coach, selected journal statistics and recent-trade summaries you submit are sent to Anthropic's API to generate educational coaching insights. The AI Coach route only sends the fields selected for analysis; it does not send your Supabase authentication credentials or Stripe payment details.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Google Advertising</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>If advertising is enabled, Google and its advertising partners may use cookies or similar technologies to serve and measure ads, including ads based on prior visits to this or other websites. Users can manage personalized advertising through <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. We may use Google AdSense on eligible pages after Google approves the site.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Your Rights</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>You can delete your account at any time by contacting us. You can export your trade journal data from the journal page. You can unsubscribe from emails at any time.</p>
        </div>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: '#E8C547', marginBottom: '12px', letterSpacing: '0.05em' }}>Contact</h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', fontSize: '15px' }}>For privacy concerns, please contact the ICT Flow team.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
