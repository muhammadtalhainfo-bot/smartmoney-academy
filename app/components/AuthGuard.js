'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        localStorage.setItem('redirectAfterLogin', pathname);
        router.push('/auth');
      } else {
        setChecking(false);
      }
    }
    check();

    // Listen for auth state changes — keeps session alive across pages
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        router.push('/auth');
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setChecking(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(212,168,67,0.5)', fontSize: '12px', letterSpacing: '0.2em' }}>
          CHECKING ACCESS...
        </div>
      </div>
    );
  }

  return children;
}
