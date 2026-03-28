'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      } else {
        supabase.auth.refreshSession().then(({ data: { session: s } }) => {
          if (s) {
            setReady(true);
          } else {
            localStorage.setItem('redirectAfterLogin', pathname);
            router.push('/auth');
          }
        });
      }
    });
  }, []);

  if (!ready) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(212,168,67,0.5)', fontSize: '12px', letterSpacing: '0.2em' }}>
        LOADING...
      </div>
    </div>
  );

  return children;
}
