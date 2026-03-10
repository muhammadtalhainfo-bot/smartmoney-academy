'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../lib/supabase';
const supabase = createClient();

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Account created! Check your email to confirm, then log in.');
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', sans-serif", padding: '24px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
        .auth-input { background: #141414; border: 1px solid rgba(212,168,67,0.2); border-radius: 10px; color: #F5F5F5; padding: 12px 16px; font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none; width: 100%; transition: border-color 0.2s; }
        .auth-input:focus { border-color: #D4A843; }
        .auth-input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>

      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', textDecoration: 'none', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #D4A843, #8A6B28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Bebas Neue', fontSize: '20px', color: '#080808' }}>S</div>
          <div>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: '20px', letterSpacing: '0.15em', color: '#F5F5F5' }}>SMARTMONEY</div>
            <div style={{ fontFamily: 'DM Mono', fontSize: '9px', color: '#8A6B28', letterSpacing: '0.2em' }}>ACADEMY</div>
          </div>
        </Link>

        {/* Card */}
        <div style={{ background: '#0F0F0F', border: '1px solid rgba(212,168,67,0.12)', borderRadius: '20px', padding: '36px' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', background: '#141414', borderRadius: '12px', padding: '4px', marginBottom: '28px' }}>
            {['Login', 'Sign Up'].map((tab, i) => (
              <button key={tab} onClick={() => { setIsLogin(i === 0); setError(''); setSuccess(''); }}
                style={{ flex: 1, padding: '10px', borderRadius: '9px', border: 'none', cursor: 'pointer', fontFamily: 'DM Mono', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'all 0.2s',
                  background: isLogin === (i === 0) ? 'linear-gradient(135deg, #D4A843, #F0C96A)' : 'transparent',
                  color: isLogin === (i === 0) ? '#080808' : 'rgba(255,255,255,0.4)',
                  fontWeight: isLogin === (i === 0) ? '700' : '400',
                }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Email */}
            <div>
              <label style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Email</label>
              <input className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input className="auth-input" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: '44px' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: 'rgba(255,255,255,0.4)', padding: '4px' }}>
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error / Success */}
            {error && <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '12px', color: '#F87171', fontSize: '13px' }}>{error}</div>}
            {success && <div style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: '8px', padding: '12px', color: '#4ADE80', fontSize: '13px' }}>{success}</div>}

            {/* Submit */}
            <button onClick={handleAuth} disabled={loading}
              style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '12px', padding: '14px', fontFamily: 'DM Mono', fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '4px' }}>
              {loading ? 'Please wait...' : isLogin ? 'Login →' : 'Create Account →'}
            </button>

          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontFamily: 'DM Mono', fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>
          Free access to all beginner modules
        </p>

      </div>
    </div>
  );
}