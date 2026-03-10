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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        // Save where they were trying to go
        localStorage.setItem('redirectAfterLogin', pathname);
        router.push('/auth');
      } else {
        setChecking(false);
      }
    }
    check();
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