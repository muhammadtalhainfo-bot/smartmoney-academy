import "./globals.css";
import CookieBanner from '@/app/components/CookieBanner';

export const metadata = {
  metadataBase: new URL('https://ictflow.com'),
  title: {
    default: 'ICT Flow — Free ICT & Smart Money Concepts Trading Education',
    template: '%s | ICT Flow',
  },
  description: 'Study ICT and Smart Money Concepts with a structured 38-module curriculum covering market structure, liquidity, fair value gaps, order blocks, timing, execution and risk management. 203+ lessons.',
  keywords: ['ICT trading', 'Smart Money Concepts', 'Inner Circle Trader', 'market structure', 'fair value gap', 'order blocks', 'liquidity', 'NAS100', 'forex trading', 'prop firm', 'trading education', 'free trading course', 'ICT mentorship', 'silver bullet strategy', 'AMD model'],
  alternates: {
    canonical: 'https://ictflow.com',
  },
  authors: [{ name: 'ICT Flow' }],
  creator: 'ICT Flow',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ictflow.com',
    siteName: 'ICT Flow',
    title: 'ICT Flow — Free ICT Trading Education',
    description: 'Structured ICT & Smart Money Concepts education. 38 modules and 203+ lessons covering concepts, practice and risk-aware execution.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ICT Flow — Structured ICT Trading Education' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Flow — Free ICT Trading Education',
    description: 'Study ICT & Smart Money Concepts with a 38-module curriculum and 203+ lessons. Start with the first three modules free.',
    images: ['/og-image.png'],
    creator: '@riskfirsttrad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'ICT Flow',
  url: 'https://ictflow.com',
  description: 'Structured ICT and Smart Money Concepts education with 38 modules and 203+ lessons covering market structure, liquidity, execution, risk management and related trading frameworks.',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'ICT Trading Courses',
    itemListElement: [
      { '@type': 'Course', name: 'Market Structure', description: 'HH/HL, BOS, ChoCH, MSS — the foundation of ICT', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Liquidity Concepts', description: 'Stop hunts, BSL/SSL, equal highs and lows', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Fair Value Gaps (FVG)', description: 'BISI, SIBI, Consequent Encroachment, BPR', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Order Blocks', description: 'OB, Breaker Blocks, Mitigation Blocks', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Killzones & Macro Times', description: 'London, New York, Silver Bullet windows', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Power of Three (AMD)', description: 'Accumulate, Manipulate, Distribute daily model', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'ICT Entry Models', description: '2022 Model, Unicorn, Silver Bullet setups', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Premium & Discount Arrays', description: 'PD Array Matrix, dealing ranges, OTE', provider: { '@type': 'Organization', name: 'ICT Flow' } },
    ],
  },
  sameAs: [
    'https://x.com/riskfirsttrad',
    'https://youtube.com/@smart_money_academy0',
    'https://www.tiktok.com/@smart.money.academy',
    'https://discord.gg/bh2YK6vF',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#E8C547" />
        <link rel="manifest" href="/manifest.json" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HRGZYFXQ5W"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HRGZYFXQ5W', {
  'user_id': typeof window !== 'undefined' && window.__USER_ID__ ? window.__USER_ID__ : undefined
});
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        ) : null}

        <script src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js" defer />
        <script dangerouslySetInnerHTML={{ __html: `
          window.OneSignalDeferred = window.OneSignalDeferred || [];
          OneSignalDeferred.push(async function(OneSignal) {
            await OneSignal.init({
              appId: "7091f3f0-0cf1-4afa-9587-0c3040b520c7",
              notifyButton: { enable: true },
              allowLocalhostAsSecureOrigin: false,
              serviceWorkerPath: "/OneSignalSDKWorker.js",
            });
          });
        ` }} />
        <link rel="preconnect" href="https://api.onesignal.com" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</head>
      <body>
        <main id="main-content">{children}</main>
        <CookieBanner />
      </body>
    </html>
  );
}
