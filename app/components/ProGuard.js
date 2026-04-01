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
  const supabase = createClient();

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) {
        localStorage.setItem('redirectAfterLogin', pathname);
        router.push('/auth');
        return;
      }
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', user.id)
        .single();
      setIsPro(profile?.is_pro === true);
      setChecking(false);
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

  if (!isPro) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center px-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)' }}>&#128274;</div>
          <div className="font-mono-c text-xs tracking-widest mb-3" style={{ color: 'rgba(212,168,67,0.5)', fontFamily: 'DM Mono, monospace' }}>// PRO FEATURE</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', color: 'white', marginBottom: '16px' }}>UPGRADE TO PRO</h1>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
            Discord community access and certificates are Pro features. Upgrade for $19/month to unlock everything.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/pricing" style={{ display: 'block', width: '100%', padding: '16px', borderRadius: '12px', fontFamily: 'DM Mono, monospace', fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', fontWeight: 700, background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808', textDecoration: 'none' }}>
              Upgrade to Pro
            </Link>
            <Link href="/courses" style={{ display: 'block', width: '100%', padding: '12px', borderRadius: '12px', fontFamily: 'DM Mono, monospace', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', border: '1px solid rgba(212,168,67,0.15)', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
              Back to Free Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
