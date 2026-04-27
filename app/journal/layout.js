export const metadata = {
  title: 'Free Trading Journal — ICT Flow | Log, Analyze & Improve Your Trades',
  description:
    'The most powerful free trading journal for ICT & Smart Money traders. Log trades, track win rate, P&L, R:R, psychology, and get AI-powered coaching insights. No credit card. Forever free.',
  keywords: 'free trading journal, trading journal free, online trading journal, free trading journal online, ICT trading journal, smart money trading journal, forex trading journal free, trading journal app, trade log, trading journal tracker, free trade journal, best free trading journal, trading performance tracker, win rate tracker, trade analytics free',
  openGraph: {
    title: 'Free Trading Journal — ICT Flow',
    description: 'Log trades, track win rate, R:R & psychology. Get AI coaching insights. The best free trading journal for ICT & Smart Money traders.',
    url: 'https://ictflow.com/journal',
    siteName: 'ICT Flow Academy',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Free Trading Journal' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Trading Journal — ICT Flow',
    description: 'The most powerful free ICT trading journal. Track trades, win rate, psychology & get AI insights.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
  alternates: { canonical: 'https://ictflow.com/journal' },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function JournalLayout({ children }) {
  return children;
}
