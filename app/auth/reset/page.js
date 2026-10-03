'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError('Unable to update your password. Please request a new reset link and try again.');
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', flexDirection: 'column', fontFamily: 'DM Sans, sans-serif' }}>
      <h1 className="font-display text-4xl md:text-6xl text-white mb-8 text-center">Reset Password</h1>
      <div style={{ background: '#111111', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px' }}>
        <Image src="/ictflow-symbol.svg" alt="ICT Flow" width={48} height={48} priority style={{ borderRadius: '12px', display: 'block', margin: '0 auto 20px' }} />
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>SET NEW PASSWORD</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(232,197,71,0.95)', textAlign: 'center', marginBottom: '28px', letterSpacing: '0.1em' }}>ICT FLOW — ACCOUNT RECOVERY</div>

        {success ? (
          <div role="status" aria-live="polite" style={{ textAlign: 'center', color: '#34D399', fontFamily: 'DM Mono, monospace', fontSize: '13px' }}>✓ Password updated! Redirecting...</div>
        ) : (
          <>
            <div style={{ marginBottom: '14px' }}>
              <label htmlFor="new-password" style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#E8C547', marginBottom: '6px', letterSpacing: '0.1em' }}>NEW PASSWORD</label>
              <input id="new-password" type="password" value={password} onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                placeholder="Min 8 characters"
                style={{ width: '100%', background: '#080808', border: '1px solid #E8C547', borderRadius: '8px', padding: '12px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="confirm-password" style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#E8C547', marginBottom: '6px', letterSpacing: '0.1em' }}>CONFIRM PASSWORD</label>
              <input id="confirm-password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                autoComplete="new-password"
                placeholder="Repeat password"
                style={{ width: '100%', background: '#080808', border: '1px solid #E8C547', borderRadius: '8px', padding: '12px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            {error && <div role="alert" aria-live="assertive" style={{ color: '#FCA5A5', fontFamily: 'DM Mono, monospace', fontSize: '12px', marginBottom: '14px' }}>{error}</div>}
            <button type="button" onClick={handleReset} disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808', border: 'none', borderRadius: '10px', padding: '14px', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.1em' }}>
              {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
