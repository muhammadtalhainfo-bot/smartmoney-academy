export const metadata = {
  title: 'About ICT Flow — Structured ICT Trading Education',
  description: 'ICT Flow is a trading education platform built to make ICT and Smart Money Concepts easier to study. The first three modules are free, with optional Pro access for the full curriculum and tools.',
  alternates: { canonical: 'https://ictflow.com/about' },
  openGraph: {
    title: 'About ICT Flow',
    description: 'Structured ICT and Smart Money Concepts education with 38 modules and 203+ lessons. Start with the first three modules free.',
    url: 'https://ictflow.com/about',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'About ICT Flow' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ICT Flow',
    description: 'Structured ICT and Smart Money Concepts education. 38 modules, 203+ lessons, with a free starting path.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
