'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export default function ProGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const check = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        if (!isMounted) return;

        if (!user) {
          localStorage.setItem('redirectAfterLogin', pathname);
          router.push('/auth');
          return;
        }

        const { data: profile, error: err } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .single();

        if (!isMounted) return;

        if (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to verify pro status');
          setIsPro(false);
        } else {
          setIsPro(profile?.is_pro === true);
        }
      } catch (err) {
        console.error('ProGuard error:', err);
        if (isMounted) { setError('Authentication error'); setIsPro(false); }
      } finally {
        if (isMounted) setChecking(false);
      }
    };

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_OUT') router.push('/auth');
    });

    return () => { isMounted = false; subscription?.unsubscribe(); };
  }, [pathname, router]);

  if (error) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div style={{ color: '#F87171', fontFamily: "'DM Mono', monospace" }}>{error}</div>
    </div>
  );

  if (checking) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(232,197,71,0.95)', fontSize: '12px', letterSpacing: '0.2em' }}>
        CHECKING ACCESS...
      </div>
    </div>
  );

  if (!isPro) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px', background: 'rgba(212,168,67,0.22)', border: '1px solid #E8C547' }}>🔒</div>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(232,197,71,0.95)', letterSpacing: '0.2em', marginBottom: '12px' }}>// PRO FEATURE</div>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', color: 'white', marginBottom: '16px', lineHeight: 1 }}>UPGRADE TO PRO</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', lineHeight: 1.7, marginBottom: '32px' }}>
          Discord community access and certificates are Pro features. Upgrade for $19/month to unlock everything.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href="/pricing" style={{ display: 'block', padding: '16px', borderRadius: '12px', fontFamily: 'DM Mono, monospace', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', background: 'linear-gradient(135deg, #E8C547, #F0C96A)', color: '#080808', fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>
            Upgrade to Pro →
          </Link>
          <Link href="/courses" style={{ display: 'block', padding: '12px', borderRadius: '12px', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', border: '1px solid #E8C547', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', textAlign: 'center' }}>
            Back to Free Courses
          </Link>
        </div>
      </div>
    </div>
  );

  return children;
}
