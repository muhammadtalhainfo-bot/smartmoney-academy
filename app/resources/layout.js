export const metadata = {
  title: 'ICT Trading Resources — Prop Firms, Brokers & Tools',
  description: 'Curated external resources for ICT and Smart Money traders, including prop-firm providers, brokers, charting tools, and educational platforms. Terms and pricing can change.'',
  keywords: ['prop firms', 'prop firm resources', 'ICT trader resources', 'funded trader program', 'forex brokers', 'TradingView ICT'],
  alternates: { canonical: 'https://ictflow.com/resources' },
  openGraph: {
    title: 'ICT Trading Resources | ICT Flow',
    description: 'External prop-firm, broker, and trading-tool resources for ICT traders. Check each provider for current terms and pricing.',
    url: 'https://ictflow.com/resources',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Trading Resources' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Trading Resources | ICT Flow',
    description: 'Top prop firms, brokers, and tools for ICT traders.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
