export const metadata = {
  title: 'ICT Practice Quiz — Test Your ICT & SMC Knowledge',
  description: 'Test your ICT and Smart Money Concepts knowledge with interactive quizzes. Market Structure, Liquidity, FVGs, Order Blocks, AMD and more. Track your score and improve.',
  keywords: ['ICT trading quiz', 'smart money concepts test', 'ICT knowledge test', 'trading quiz', 'ICT practice questions'],
  alternates: { canonical: 'https://ictflow.com/practice' },
  openGraph: {
    title: 'ICT Practice Quiz | ICT Flow',
    description: 'Test your ICT knowledge — Market Structure, FVGs, Order Blocks, AMD and more. Interactive quizzes.',
    url: 'https://ictflow.com/practice',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Practice Quiz' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Practice Quiz | ICT Flow',
    description: 'Test your ICT knowledge with interactive quizzes. Market Structure, FVGs, Order Blocks and more.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
