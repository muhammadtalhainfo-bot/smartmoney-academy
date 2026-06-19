export const metadata = {
  title: 'About ICT Flow — Free ICT Trading Education for Everyone',
  description: 'ICT Flow is a free trading education platform built to make ICT and Smart Money Concepts accessible to every trader worldwide. No gatekeeping. No upsells. Just education.',
  alternates: { canonical: 'https://ictflow.com/about' },
  openGraph: {
    title: 'About ICT Flow',
    description: 'Free ICT and Smart Money Concepts education for every trader. 28 modules, 80+ lessons. No gatekeeping.',
    url: 'https://ictflow.com/about',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'About ICT Flow' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ICT Flow',
    description: 'Free ICT and Smart Money Concepts education. 28 modules, no gatekeeping.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
