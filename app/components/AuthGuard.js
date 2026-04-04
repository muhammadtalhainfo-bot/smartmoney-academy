'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!isMounted) return;
        if (session) { setReady(true); return; }

        const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
        if (!isMounted) return;

        if (refreshedSession) {
          setReady(true);
        } else {
          localStorage.setItem('redirectAfterLogin', pathname);
          router.push('/auth');
        }
      } catch (err) {
        console.error('AuthGuard error:', err);
        if (isMounted) {
          setError('Failed to verify authentication');
          router.push('/auth');
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setReady(true);
      } else if (event === 'SIGNED_OUT') {
        router.push('/auth');
      }
    });

    return () => { isMounted = false; subscription?.unsubscribe(); };
  }, [pathname, router]);

  if (error) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div style={{ color: '#F87171', fontFamily: "'DM Mono', monospace" }}>{error}</div>
    </div>
  );

  if (!ready) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(212,168,67,0.5)', fontSize: '12px', letterSpacing: '0.2em' }}>
        VERIFYING AUTHENTICATION...
      </div>
    </div>
  );

  return children;
}
