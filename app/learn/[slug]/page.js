import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SEO_PAGES } from '../seo-data'

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
  }

  return (
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

        <section style={{borderTop:'1px solid rgba(255,255,255,.12)',paddingTop:30,marginTop:48}}>
          <h2 style={{fontSize:26}}>Continue learning</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:10,marginTop:16}}>
            {page.related.map(slug => {
              const related=SEO_PAGES.find(p=>p.slug===slug)
              return related ? <Link key={slug} href={`/learn/${slug}`} style={{color:'#E8C547',border:'1px solid rgba(232,197,71,.25)',padding:'10px 14px',borderRadius:8,textDecoration:'none'}}>{related.title}</Link> : null
            })}
          </div>
          <p style={{marginTop:24}}><Link href="/courses" style={{color:'#E8C547'}}>Explore the full 38-module curriculum →</Link></p>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
      </article>
    </main>
  )
}
