export const metadata = {
  title: 'ICT Curriculum — All 38 Modules',
  description: 'The complete ICT trading curriculum — 38 modules covering Market Structure, Liquidity, FVGs, Order Blocks, AMD, IPDA, SMT Divergence and more. Free access to the first three modules.',
  alternates: { canonical: 'https://ictflow.com/courses' },
  openGraph: {
    title: 'Complete ICT Curriculum — 38 Modules | ICT Flow',
    description: 'Every ICT concept from beginner to advanced. 38 modules, 203+ lessons. Start with the first three modules free.',
    url: 'https://ictflow.com/courses',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Course Curriculum' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Curriculum — 38 Modules | ICT Flow',
    description: 'Every ICT concept from beginner to advanced. 38 modules, 203+ lessons. Start free.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
