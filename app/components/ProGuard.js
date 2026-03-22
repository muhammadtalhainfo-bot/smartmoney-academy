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
      const { data: { user } } = await supabase.auth.getUser();
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
        <style>{\`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Bebas+Neue&family=DM+Mono:wght@400;500&display=swap');
          .font-display { font-family: 'Bebas Neue', sans-serif; }
          .font-mono-c { font-family: 'DM Mono', monospace; }
        \`}</style>
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)' }}>🔒</div>
          <div className="font-mono-c text-xs tracking-widest mb-3" style={{ color: 'rgba(212,168,67,0.5)' }}>// PRO FEATURE</div>
          <h1 className="font-display text-5xl text-white mb-4">UPGRADE TO PRO</h1>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Live ICT signals, advanced analysis, and Discord access are Pro features. Upgrade for $19/month to unlock everything.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/pricing" className="block w-full py-4 rounded-xl font-mono-c text-sm tracking-widest uppercase text-center font-bold" style={{ background: 'linear-gradient(135deg, #D4A843, #F0C96A)', color: '#080808' }}>
              Upgrade to Pro →
            </Link>
            <Link href="/courses" className="block w-full py-3 rounded-xl font-mono-c text-xs tracking-widest uppercase text-center" style={{ border: '1px solid rgba(212,168,67,0.15)', color: 'rgba(255,255,255,0.4)' }}>
              ← Back to Free Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
