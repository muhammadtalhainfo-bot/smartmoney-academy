import { CURRICULUM_STATS } from '@/lib/curriculum';

export const metadata = {
  title: 'ICT Flow Pricing — Free Curriculum & Pro Tools',
  description: `Study all ${CURRICULUM_STATS.moduleCount} ICT modules and ${CURRICULUM_STATS.lessonCount}+ lessons for free. Pro adds optional advanced tools and an ad-free experience.`,
  alternates: { canonical: 'https://ictflow.com/pricing' },
  openGraph: {
    title: 'ICT Flow Pricing — Free Curriculum & Pro Tools',
    description: `The full ${CURRICULUM_STATS.moduleCount}-module curriculum is free; Pro adds optional premium tools and an ad-free experience.`,
    url: 'https://ictflow.com/pricing',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Pro Pricing' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Flow Pricing — Free + Pro',
    description: 'All core lessons are free, with optional Pro tools for learners who want them.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
