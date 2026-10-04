'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@/lib/supabase';

const CONSENT_KEY = 'cookies_accepted';
const CONSENT_EVENT = 'ictflow-cookie-consent';

export default function AdSlot({ slot, className = '' }) {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const syncConsent = () => {
      try {
        setConsent(window.localStorage.getItem(CONSENT_KEY) === 'true');
      } catch {
        setConsent(false);
      }
    };
    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function check() {
      if (!consent) {
        if (mounted) setShow(false);
        return;
      }

      const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
      const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT;
      if (!client || !adSlot) {
        if (mounted) setShow(false);
        return;
      }

      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        const isExpectedNoSession =
          !user &&
          authError &&
          (
            authError.name === 'AuthSessionMissingError' ||
            String(authError.message || '').toLowerCase().includes('session missing')
          );

        if (authError && !isExpectedNoSession) throw authError;

        let shouldShow = true;
        if (user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_pro')
            .eq('id', user.id)
            .maybeSingle();
          if (profileError) throw profileError;
          shouldShow = profile?.is_pro !== true;
        }

        if (mounted) setShow(shouldShow);
      } catch (error) {
        console.error('Ad eligibility check failed:', error);
        if (mounted) setShow(false);
      }
    }

    check();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      setTimeout(check, 0);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [slot, consent, supabase]);

  useEffect(() => {
    if (!show) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [show]);

  if (!show) return null;

  return (
    <div className={className} style={{ margin: '28px auto', maxWidth: '970px', minHeight: '90px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#9DA6B2', letterSpacing: '0.12em', marginBottom: '6px' }}>
        ADVERTISEMENT
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '90px' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot={slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
