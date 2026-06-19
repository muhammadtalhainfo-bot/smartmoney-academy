export const metadata = {
  title: 'ICT Curriculum — All 28 Modules',
  description: 'The complete ICT trading curriculum — 28 modules covering Market Structure, Liquidity, FVGs, Order Blocks, AMD, IPDA, SMT Divergence and more. Free access to beginner modules.',
  alternates: { canonical: 'https://ictflow.com/courses' },
  openGraph: {
    title: 'Complete ICT Curriculum — 28 Modules | ICT Flow',
    description: 'Every ICT concept from beginner to advanced. 28 modules, 80+ lessons. Free to start.',
    url: 'https://ictflow.com/courses',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Course Curriculum' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Curriculum — 28 Modules | ICT Flow',
    description: 'Every ICT concept from beginner to advanced. 28 modules, 80+ lessons. Free.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
