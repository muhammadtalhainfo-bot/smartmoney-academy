import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://smartmoney-academy.vercel.app'),
  title: {
    default: 'SmartMoney Academy — Free ICT & Smart Money Concepts Trading Education',
    template: '%s | SmartMoney Academy',
  },
  description: 'Master ICT (Inner Circle Trader) and Smart Money Concepts for free. Learn market structure, liquidity, fair value gaps, order blocks, killzones and more. 14 modules, 80+ lessons.',
  keywords: ['ICT trading', 'Smart Money Concepts', 'Inner Circle Trader', 'market structure', 'fair value gap', 'order blocks', 'liquidity', 'NAS100', 'forex trading', 'prop firm', 'trading education', 'free trading course'],
  authors: [{ name: 'SmartMoney Academy' }],
  creator: 'SmartMoney Academy',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://smartmoney-academy.vercel.app',
    siteName: 'SmartMoney Academy',
    title: 'SmartMoney Academy — Free ICT Trading Education',
    description: 'Master ICT & Smart Money Concepts for free. 14 modules, 80+ lessons. Learn to trade like institutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartMoney Academy — Trade Like Institutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartMoney Academy — Free ICT Trading Education',
    description: 'Master ICT & Smart Money Concepts for free. 14 modules, 80+ lessons.',
    images: ['/og-image.png'],
    creator: '@SmartMoneyAcad',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4A843" />
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer="true"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "7091f3f0-0cf1-4afa-9587-0c3040b520c7",
                  safari_web_id: "web.onesignal.auto.0a3a2b3c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
                  notifyButton: { enable: false },
                });
              });
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
