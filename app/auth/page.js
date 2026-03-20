'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../lib/supabase';
const supabase = createClient();

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const redirectTo = searchParams ? searchParams.get('redirect') || '/dashboard' : '/dashboard';

  const handleGoogle = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://smartmoney-academy.vercel.app/dashboard' }
    });
  };

  const handleAuth = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push(redirectTo);
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        // Save username to profiles
        if (username) {
          const { data: { user: newUser } } = await supabase.auth.getUser();
          if (newUser) {
            await supabase.from('profiles').upsert({ id: newUser.id, username: username.trim() }, { onConflict: 'id' });
          }
        }
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
              <button onClick={handleGoogle} style={{ width: '100%', padding: '13px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: 'white', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
              </div>
{!isLogin && (
              <div>
                <label style={{ fontFamily: 'DM Mono', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '8px' }}>Username</label>
                <input className="auth-input" type="text" placeholder="your_trader_name" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
            )}
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