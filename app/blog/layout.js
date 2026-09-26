export const metadata = {
  title: 'ICT Trading Blog — Strategies, Analysis & Education',
  description: 'ICT trading articles, market analysis and strategy guides. Learn ICT concepts deeper — Fair Value Gaps, Order Blocks, AMD, Silver Bullet setups and real trade breakdowns.',
  keywords: ['ICT trading blog', 'smart money concepts blog', 'ICT strategy articles', 'forex trading education', 'ICT market analysis'],
  alternates: { canonical: 'https://ictflow.com/blog' },
  openGraph: {
    title: 'ICT Trading Blog | ICT Flow',
    description: 'ICT trading articles, market analysis and strategy guides. FVGs, Order Blocks, AMD and more.',
    url: 'https://ictflow.com/blog',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Trading Blog' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Trading Blog | ICT Flow',
    description: 'ICT trading articles, market analysis and strategy guides.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
