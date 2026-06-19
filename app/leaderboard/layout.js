export const metadata = {
  title: 'ICT Leaderboard — Top ICT Flow Students',
  description: 'See the top ICT Flow students ranked by lessons completed, quiz scores and trading journal entries. Compete, improve and track your progress on the leaderboard.',
  alternates: { canonical: 'https://ictflow.com/leaderboard' },
  openGraph: {
    title: 'ICT Flow Leaderboard — Top Students',
    description: 'See top ICT Flow students ranked by lessons completed, quiz scores and journal entries.',
    url: 'https://ictflow.com/leaderboard',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Leaderboard' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Flow Leaderboard',
    description: 'Top ICT Flow students ranked by lessons completed and quiz scores.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
