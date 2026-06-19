export const metadata = {
  title: 'My Dashboard — ICT Flow',
  description: 'Track your ICT learning progress — lessons completed, quiz scores, streak, and your path to the certificate. Your personal ICT Flow dashboard.',
  alternates: { canonical: 'https://ictflow.com/dashboard' },
  robots: { index: false, follow: false },
  openGraph: {
    title: 'My Dashboard | ICT Flow',
    description: 'Track your ICT learning progress, lessons completed and quiz scores.',
    url: 'https://ictflow.com/dashboard',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Dashboard' }],
  },
};
export default function Layout({ children }) { return children; }
