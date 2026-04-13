import "./globals.css";
import CookieBanner from '@/app/components/CookieBanner';

export const metadata = {
  metadataBase: new URL('https://ictflow.com'),
  title: {
    default: 'ICT Flow — Free ICT & Smart Money Concepts Trading Education',
    template: '%s | ICT Flow',
  },
  description: 'Master ICT (Inner Circle Trader) and Smart Money Concepts for free. Learn market structure, liquidity, fair value gaps, order blocks, killzones and more. 14 modules, 80+ lessons.',
  keywords: ['ICT trading', 'Smart Money Concepts', 'Inner Circle Trader', 'market structure', 'fair value gap', 'order blocks', 'liquidity', 'NAS100', 'forex trading', 'prop firm', 'trading education', 'free trading course', 'ICT mentorship', 'silver bullet strategy', 'AMD model'],
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
    description: 'Master ICT & Smart Money Concepts for free. 14 modules, 80+ lessons. Learn to trade like institutions.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ICT Flow — Trade Like Institutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Flow — Free ICT Trading Education',
    description: 'Master ICT & Smart Money Concepts for free. 14 modules, 80+ lessons.',
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
  description: 'Free ICT and Smart Money Concepts trading education platform. 14 modules, 80+ lessons.',
  educationalCredentialAwarded: 'ICT Trading Certificate',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'ICT Trading Courses',
    itemListElement: [
      { '@type': 'Course', name: 'Market Structure', description: 'Learn HH/HL, BOS, ChoCH, MSS', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Liquidity Concepts', description: 'Stop hunts, BSL/SSL, equal highs/lows', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Fair Value Gaps', description: 'BISI, SIBI, CE, BPR', provider: { '@type': 'Organization', name: 'ICT Flow' } },
      { '@type': 'Course', name: 'Order Blocks', description: 'OB, Breaker, Mitigation', provider: { '@type': 'Organization', name: 'ICT Flow' } },
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
        <meta name="theme-color" content="#D4A843" />
        <link rel="manifest" href="/manifest.json" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HRGZYFXQ5W"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HRGZYFXQ5W');
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
