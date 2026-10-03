import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { SEO_PAGES } from './seo-data'

export const metadata = {
  title: 'ICT Trading Guides: FVG, Liquidity, Order Blocks & More',
  description: 'Free, practical ICT and Smart Money Concepts trading guides covering market structure, liquidity, fair value gaps, order blocks, Silver Bullet and risk management.',
  alternates: { canonical: 'https://ictflow.com/learn' },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Trading Guides | ICT Flow',
    description: 'Free guides to ICT and Smart Money Concepts, from market structure and liquidity to FVGs, order blocks and Silver Bullet.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
  openGraph: {
    title: 'ICT Trading Guides | ICT Flow',
    description: 'Free guides to ICT and Smart Money Concepts, from market structure and liquidity to FVGs, order blocks and Silver Bullet.',
    url: 'https://ictflow.com/learn',
    type: 'website',
  },
}

export default function LearnHub() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ICT Trading Guides',
    description: 'Free ICT and Smart Money Concepts educational guides from ICT Flow.',
    itemListElement: SEO_PAGES.map((page, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: page.title,
      url: `https://ictflow.com/learn/${page.slug}`,
    })),
  }

  return (
    <>
      <Navbar active="/learn" />
      <main style={{minHeight:'100vh',background:'#080808',color:'#fff',fontFamily:"'DM Sans',sans-serif",padding:'64px 24px'}}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <Link href="/" style={{color:'#E8C547',textDecoration:'none'}}>← ICT Flow</Link>
        <header style={{margin:'48px 0'}}>
          <p style={{color:'#E8C547',fontFamily:'DM Mono,monospace',fontSize:12,letterSpacing:2}}>FREE TRADING EDUCATION</p>
          <h1 style={{fontSize:'clamp(42px,7vw,76px)',lineHeight:1,margin:'14px 0'}}>ICT TRADING GUIDES</h1>
          <p style={{maxWidth:720,color:'rgba(255,255,255,.7)',fontSize:18,lineHeight:1.7}}>
            Clear explanations of ICT and Smart Money Concepts, with practical rules, examples and limitations. Learn the framework, then test ideas yourself.
          </p>
        </header>
        <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))',gap:18}}>
          {SEO_PAGES.map(p => (
            <Link key={p.slug} href={`/learn/${p.slug}`} style={{textDecoration:'none',color:'inherit'}}>
              <article style={{height:'100%',boxSizing:'border-box',background:'#111',border:'1px solid rgba(232,197,71,.2)',borderRadius:16,padding:24}}>
                <p style={{color:'#E8C547',fontFamily:'DM Mono,monospace',fontSize:11,letterSpacing:1.5,textTransform:'uppercase'}}>{p.category}</p>
                <h2 style={{fontSize:25,lineHeight:1.2,margin:'10px 0'}}>{p.title}</h2>
                <p style={{color:'rgba(255,255,255,.65)',lineHeight:1.6}}>{p.description}</p>
                <span style={{color:'#E8C547'}}>Read guide →</span>
              </article>
            </Link>
          ))}
        </section>
      </div>
      </main>
      <Footer />
    </>
  )
}
