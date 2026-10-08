'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const CONSENT_KEY = 'cookies_accepted';
const CONSENT_EVENT = 'ictflow-cookie-consent';
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-4615893071983318';

export default function ThirdPartyScripts() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const sync = () => {
      try {
        setConsent(window.localStorage.getItem(CONSENT_KEY) === 'true');
      } catch {
        setConsent(false);
      }
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!consent) return null;

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-HRGZYFXQ5W"
      />
      <Script id="google-analytics-init" strategy="lazyOnload">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HRGZYFXQ5W');
      `}</Script>

      {process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? (
        <Script
          strategy="lazyOnload"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      ) : null}

      <Script
        src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
        strategy="lazyOnload"
      />
      <Script id="onesignal-init" strategy="lazyOnload">{`
        window.OneSignalDeferred = window.OneSignalDeferred || [];
        OneSignalDeferred.push(async function(OneSignal) {
          await OneSignal.init({
            appId: "7091f3f0-0cf1-4afa-9587-0c3040b520c7",
            notifyButton: { enable: true },
            allowLocalhostAsSecureOrigin: false,
            serviceWorkerPath: "/OneSignalSDKWorker.js",
          });
        });
      `}</Script>
    </>
  );
}
