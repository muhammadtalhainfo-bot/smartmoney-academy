export const metadata = {
  title: 'ICT Trading Certificate — ICT Flow',
  description: 'Earn your ICT trading certificate by completing the full ICT Flow curriculum. Proof of your ICT and Smart Money Concepts knowledge — shareable on LinkedIn.',
  alternates: { canonical: 'https://ictflow.com/certificate' },
  openGraph: {
    title: 'ICT Trading Certificate | ICT Flow',
    description: 'Complete the ICT Flow curriculum and earn your certificate. Shareable on LinkedIn.',
    url: 'https://ictflow.com/certificate',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Trading Certificate' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Trading Certificate | ICT Flow',
    description: 'Earn your ICT trading certificate. Shareable on LinkedIn.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
