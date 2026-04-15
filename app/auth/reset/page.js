'use client';
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
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); }
    else { setSuccess(true); setTimeout(() => router.push('/dashboard'), 2000); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'DM Sans, sans-serif' }}>
      <style>{'@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap");'}</style>
      <div style={{ background: '#0D0D0D', border: '1px solid rgba(212,168,67,0.25)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px' }}>
        <img src="/ictflow-symbol.svg" alt="ICT Flow" style={{ width: '48px', height: '48px', borderRadius: '12px', display: 'block', margin: '0 auto 20px' }} />
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: 'white', textAlign: 'center', marginBottom: '8px' }}>SET NEW PASSWORD</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(212,168,67,0.75)', textAlign: 'center', marginBottom: '28px', letterSpacing: '0.1em' }}>ICT FLOW — ACCOUNT RECOVERY</div>

        {success ? (
          <div style={{ textAlign: 'center', color: '#34D399', fontFamily: 'DM Mono, monospace', fontSize: '13px' }}>✓ Password updated! Redirecting...</div>
        ) : (
          <>
            <div style={{ marginBottom: '14px' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.8)', marginBottom: '6px', letterSpacing: '0.1em' }}>NEW PASSWORD</div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.8)', borderRadius: '8px', padding: '12px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(212,168,67,0.8)', marginBottom: '6px', letterSpacing: '0.1em' }}>CONFIRM PASSWORD</div>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat password"
                style={{ width: '100%', background: '#080808', border: '1px solid rgba(212,168,67,0.8)', borderRadius: '8px', padding: '12px 14px', color: 'white', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            {error && <div style={{ color: '#F87171', fontFamily: 'DM Mono, monospace', fontSize: '12px', marginBottom: '14px' }}>{error}</div>}
            <button onClick={handleReset} disabled={loading}
              style={{ width: '100%', background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', border: 'none', borderRadius: '10px', padding: '14px', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.1em' }}>
              {loading ? 'UPDATING...' : 'UPDATE PASSWORD'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
