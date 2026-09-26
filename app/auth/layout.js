export const metadata = {
  title: 'Sign In — ICT Flow',
  description: 'Sign in or create your free ICT Flow account. Access your lessons, journal and progress dashboard.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Sign In | ICT Flow',
    description: 'Sign in or create your free ICT Flow account.',
    url: 'https://ictflow.com/auth',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Sign In' }],
  },
};
export default function Layout({ children }) { return children; }
