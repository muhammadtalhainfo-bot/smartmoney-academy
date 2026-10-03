import Link from 'next/link'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import { notFound } from 'next/navigation'
import { SEO_PAGES } from '../seo-data'
import { serializeJsonLd } from '@/lib/jsonld'

export function generateStaticParams() {
  return SEO_PAGES.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = SEO_PAGES.find(p => p.slug === slug)
  if (!page) return { title: 'Guide Not Found' }
  return {
    title: page.title,
    description: page.meta,
    alternates: { canonical: `https://ictflow.com/learn/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.meta,
      url: `https://ictflow.com/learn/${page.slug}`,
      type: 'article',
      siteName: 'ICT Flow',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.meta,
      images: ['https://ictflow.com/og-image.png'],
      creator: '@riskfirsttrad',
    },
  }
}

export default async function SEOGuide({ params }) {
  const { slug } = await params
  const page = SEO_PAGES.find(p => p.slug === slug)
  if (!page) notFound()

  const schema = {
    '@context':'https://schema.org',
    '@type':'Article',
    headline:page.title,
    description:page.meta,
    url:`https://ictflow.com/learn/${page.slug}`,
    author:{'@type':'Organization',name:'ICT Flow',url:'https://ictflow.com'},
    publisher:{'@type':'Organization',name:'ICT Flow',url:'https://ictflow.com'},
    isPartOf:{'@type':'WebSite',name:'ICT Flow',url:'https://ictflow.com'},
  };

  const breadcrumbSchema = {
    '@context':'https://schema.org',
    '@type':'BreadcrumbList',
    itemListElement:[
      {'@type':'ListItem',position:1,name:'ICT Flow',item:'https://ictflow.com'},
      {'@type':'ListItem',position:2,name:'ICT Trading Guides',item:'https://ictflow.com/learn'},
      {'@type':'ListItem',position:3,name:page.title,item:`https://ictflow.com/learn/${page.slug}`},
    ],
  }

  return (
    <>
      <Navbar active="/learn" />
      <main style={{minHeight:'100vh',background:'#080808',color:'#fff',fontFamily:"'DM Sans',sans-serif",padding:'56px 24px 80px'}}>
      <article style={{maxWidth:820,margin:'0 auto'}}>
        <Link href="/learn" style={{color:'#E8C547',textDecoration:'none'}}>← All ICT guides</Link>
        <p style={{color:'#E8C547',fontFamily:'DM Mono,monospace',fontSize:11,letterSpacing:2,marginTop:42}}>{page.category}</p>
        <h1 style={{fontSize:'clamp(40px,7vw,68px)',lineHeight:1.04,margin:'12px 0 20px'}}>{page.title}</h1>
        <p style={{fontSize:19,lineHeight:1.7,color:'rgba(255,255,255,.72)',marginBottom:38}}>{page.intro}</p>

        <div style={{background:'#101010',border:'1px solid rgba(232,197,71,.2)',borderRadius:14,padding:'16px 18px',marginBottom:40,color:'rgba(255,255,255,.62)',lineHeight:1.6,fontSize:14}}>
          <strong style={{color:'#E8C547'}}>Educational note:</strong> ICT is a trading framework. Examples on this page are educational and do not guarantee a trading outcome. Test any rules before risking capital.
        </div>

        {page.sections.map(([heading,body]) => (
          <section key={heading} style={{marginBottom:38}}>
            <h2 style={{fontSize:30,lineHeight:1.2,marginBottom:12}}>{heading}</h2>
            {body.split('\n').map((p,i)=><p key={i} style={{fontSize:17,lineHeight:1.8,color:'rgba(255,255,255,.76)',margin:'0 0 14px'}}>{p}</p>)}
          </section>
        ))}

        <section style={{background:'linear-gradient(135deg,rgba(232,197,71,.10),rgba(232,197,71,.03))',border:'1px solid rgba(232,197,71,.24)',borderRadius:16,padding:'24px',marginTop:52}}>
          <p style={{fontFamily:'DM Mono,monospace',fontSize:11,letterSpacing:2,color:'#E8C547',marginBottom:8}}>FREE LEARNING PATH</p>
          <h2 style={{fontSize:28,lineHeight:1.2,margin:'0 0 10px'}}>Turn this concept into a complete trading framework.</h2>
          <p style={{fontSize:15,lineHeight:1.7,color:'rgba(255,255,255,.68)',margin:'0 0 18px'}}>Create a free account to track your progress through the ICT Flow curriculum, then continue from the foundations into 38 modules and 203+ lessons.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
            <Link href="/auth?redirect=/foundations?welcome=1" style={{background:'linear-gradient(135deg,#E8C547,#F0C96A)',color:'#080808',padding:'11px 16px',borderRadius:9,textDecoration:'none',fontWeight:700,fontSize:13}}>Start Free Learning →</Link>
            <Link href="/courses" style={{border:'1px solid rgba(232,197,71,.28)',color:'#E8C547',padding:'11px 16px',borderRadius:9,textDecoration:'none',fontSize:13}}>View Curriculum</Link>
          </div>
        </section>

        <section style={{borderTop:'1px solid rgba(255,255,255,.12)',paddingTop:30,marginTop:48}}>
          <h2 style={{fontSize:26}}>Continue learning</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,marginTop:16}}>
            {page.related.map(slug => {
              const related=SEO_PAGES.find(p=>p.slug===slug)
              return related ? <Link key={slug} href={`/learn/${slug}`} style={{color:'#E8C547',border:'1px solid rgba(232,197,71,.25)',padding:'10px 14px',borderRadius:8,textDecoration:'none'}}>{related.title}</Link> : null
            })}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,marginTop:24}}>
            <Link href="/courses" style={{color:'#E8C547',border:'1px solid rgba(232,197,71,.3)',padding:'11px 15px',borderRadius:8,textDecoration:'none'}}>Explore 38 Modules →</Link>
            <Link href="/tools" style={{color:'#E8C547',border:'1px solid rgba(232,197,71,.3)',padding:'11px 15px',borderRadius:8,textDecoration:'none'}}>Free Trading Tools →</Link>
            <Link href="/glossary" style={{color:'#E8C547',border:'1px solid rgba(232,197,71,.3)',padding:'11px 15px',borderRadius:8,textDecoration:'none'}}>ICT Glossary →</Link>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(schema)}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(breadcrumbSchema)}} />
      </article>
    </main>
      <Footer />
    </>
  )
}
