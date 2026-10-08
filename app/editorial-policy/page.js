import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export const metadata = {
  title: 'Editorial Standards | ICT Flow',
  description: 'How ICT Flow researches, writes, reviews, updates, and presents its independent trading education content.',
  alternates: { canonical: 'https://ictflow.com/editorial-policy' },
  robots: { index: true, follow: true },
};

const sections = [
  ['What ICT Flow is', [
    'ICT Flow is an independent educational resource focused on ICT and Smart Money Concepts. It is not affiliated with or endorsed by Inner Circle Trader or any individual educator.',
    'Our goal is to organize widely discussed trading concepts into a structured study path that is easier to read, practice, review, and test.',
  ]],
  ['How we write lessons', [
    'Lessons are written to explain a concept, define its terminology, show how traders commonly apply the framework, and identify conditions that can be tested. We aim to distinguish an educational model from a claim about what banks, institutions, or market algorithms are actually doing.',
    'Trading examples are educational illustrations. They are not promises of profitability, signals, or recommendations to buy or sell a financial instrument.',
  ]],
  ['Sources and attribution', [
    'ICT Flow studies publicly available educational material, including concepts discussed in ICT-related videos and mentorship material. We organize and explain those concepts independently rather than presenting third-party material as our own proprietary methodology.',
    'Where a concept is a framework or interpretation rather than an independently verifiable market mechanism, our wording is intended to make that distinction clear.',
  ]],
  ['Updates and corrections', [
    'The curriculum is updated as new modules, lessons, examples, and risk-management material are added. We also correct outdated wording when a page no longer matches the current curriculum or our editorial standards.',
    'If you find an inaccurate statement, broken link, outdated lesson, or misleading claim, please report it through the site owner’s available contact channel so it can be reviewed.',
  ]],
  ['Independence and commercial disclosures', [
    'ICT Flow may use advertising and paid features to support the platform. Advertising does not determine educational conclusions or lesson content.',
    'Pro features are optional. Core curriculum access is presented separately from commercial offers so readers can study the educational material without purchasing a product.',
  ]],
  ['Risk and financial disclaimer', [
    'Trading foreign exchange, indices, commodities, crypto, and other financial instruments involves substantial risk. Nothing on ICT Flow is financial, investment, or trading advice. Readers should independently evaluate any strategy, use appropriate risk controls, and seek qualified professional advice where appropriate.',
  ]],
];

export default function EditorialPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>
      <Navbar active="/editorial-policy" />
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '72px 24px 100px' }}>
        <p style={{ color: '#E8C547', fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: 2 }}>EDITORIAL TRANSPARENCY</p>
        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(48px, 8vw, 84px)', lineHeight: 1, margin: '12px 0 20px' }}>EDITORIAL STANDARDS</h1>
        <p style={{ maxWidth: 720, color: 'rgba(255,255,255,.72)', fontSize: 18, lineHeight: 1.75, marginBottom: 56 }}>
          How ICT Flow creates, reviews, updates, and presents its free trading education content.
        </p>

        {sections.map(([heading, paragraphs]) => (
          <section key={heading} style={{ marginBottom: 42 }}>
            <h2 style={{ fontSize: 28, lineHeight: 1.25, marginBottom: 14 }}>{heading}</h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} style={{ color: 'rgba(255,255,255,.72)', fontSize: 16, lineHeight: 1.85, margin: '0 0 14px' }}>{paragraph}</p>
            ))}
          </section>
        ))}

        <div style={{ borderTop: '1px solid rgba(232,197,71,.2)', paddingTop: 28, marginTop: 52 }}>
          <Link href="/about" style={{ color: '#E8C547', marginRight: 18 }}>About ICT Flow →</Link>
          <Link href="/courses" style={{ color: '#E8C547' }}>Explore the curriculum →</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
