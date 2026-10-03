'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';

const CONSENT_KEY = 'cookies_accepted';
const CONSENT_EVENT = 'ictflow-cookie-consent';

export default function AdSlot({ slot, className = '' }) {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const syncConsent = () => setConsent(window.localStorage.getItem(CONSENT_KEY) === 'true');
    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, []);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    async function check() {
      if (!consent) {
        if (mounted) setShow(false);
        return;
      }
      const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
      const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT;
      if (!client || !adSlot) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_pro')
          .eq('id', user.id)
          .maybeSingle();
        if (profile?.is_pro === true) return;
      }

      if (mounted) setShow(true);
    }

    check();
    return () => { mounted = false; };
  }, [slot, consent]);

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
