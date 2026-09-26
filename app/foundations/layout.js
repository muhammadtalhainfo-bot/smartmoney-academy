export const metadata = {
  title: 'Trading Foundations — Start Here Before ICT',
  description: 'New to trading? Start here. Learn the fundamentals — what markets are, how trading works, risk basics, and the mindset you need before diving into ICT concepts.',
  alternates: { canonical: 'https://ictflow.com/foundations' },
  openGraph: {
    title: 'Trading Foundations | ICT Flow',
    description: 'New to trading? Start here. Learn markets, risk basics, and the mindset needed before ICT.',
    url: 'https://ictflow.com/foundations',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'Trading Foundations — ICT Flow' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trading Foundations | ICT Flow',
    description: 'New to trading? Start here. Learn markets, risk basics, and trading mindset.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function FoundationsLayout({ children }) { return children; }
