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
  alternates: { canonical: 'https://ictflow.com' },
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
    description: 'Study ICT & Smart Money Concepts with a structured 38-module curriculum and 203+ lessons. All core lessons are free; Pro adds premium tools and an ad-free experience.',
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
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://ictflow.com/#organization',
      name: 'ICT Flow',
      url: 'https://ictflow.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ictflow.com/favicon-96x96.png',
      },
      sameAs: [
        'https://x.com/riskfirsttrad',
        'https://youtube.com/@smart_money_academy0',
        'https://www.tiktok.com/@smart.money.academy',
        'https://discord.gg/bh2YK6vF',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://ictflow.com/#website',
      name: 'ICT Flow',
      url: 'https://ictflow.com',
      publisher: { '@id': 'https://ictflow.com/#organization' },
      inLanguage: 'en-US',
    },
    {
      '@type': 'EducationalOrganization',
      '@id': 'https://ictflow.com/#educational-organization',
      name: 'ICT Flow',
      url: 'https://ictflow.com',
      description: 'Structured ICT and Smart Money Concepts education with 38 modules and 203+ lessons covering market structure, liquidity, execution, risk management and related trading frameworks.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'ICT Trading Courses',
        itemListElement: [
          { '@type': 'Course', name: 'Market Structure', description: 'HH/HL, BOS, ChoCH, MSS and market structure foundations', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'Liquidity Concepts', description: 'BSL, SSL, equal highs and lows, and liquidity analysis', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'Fair Value Gaps', description: 'BISI, SIBI, Consequent Encroachment and imbalance concepts', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'Order Blocks', description: 'Order Blocks, Breakers and Mitigation Blocks', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'Killzones & Macro Times', description: 'London, New York and Silver Bullet timing concepts', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'Power of Three (AMD)', description: 'Accumulation, Manipulation and Distribution framework', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'ICT Entry Models', description: '2022 Model, Unicorn and related entry frameworks', provider: { '@type': 'Organization', name: 'ICT Flow' } },
          { '@type': 'Course', name: 'Premium & Discount Arrays', description: 'Dealing ranges, premium/discount and PD array concepts', provider: { '@type': 'Organization', name: 'ICT Flow' } },
        ],
      },
    },
  ],
};
