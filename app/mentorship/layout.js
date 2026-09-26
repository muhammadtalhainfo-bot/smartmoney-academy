export const metadata = {
  title: 'ICT 2022 Mentorship — All Episodes Summarised | ICT Flow',
  description: 'Every ICT 2022 YouTube mentorship episode summarised with key concepts, timestamps and takeaways. The fastest way to absorb the full ICT 2022 curriculum.',
  keywords: ['ICT 2022 mentorship', 'ICT Michael Huddleston mentorship', 'ICT 2022 episodes', 'inner circle trader 2022', 'ICT mentorship summary'],
  alternates: { canonical: 'https://ictflow.com/mentorship' },
  openGraph: {
    title: 'ICT 2022 Mentorship Summaries | ICT Flow',
    description: 'Every ICT 2022 mentorship episode summarised — key concepts, timestamps and takeaways.',
    url: 'https://ictflow.com/mentorship',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT 2022 Mentorship Summaries' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT 2022 Mentorship Summaries | ICT Flow',
    description: 'Every ICT 2022 mentorship episode — key concepts and takeaways.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};
export default function Layout({ children }) { return children; }
