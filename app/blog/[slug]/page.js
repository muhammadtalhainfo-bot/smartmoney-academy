import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { getPublishedBlogPosts } from '@/lib/blog-data';
import { getRelatedBlogPosts } from '@/lib/related-blog-posts';
import { serializeJsonLd } from '@/lib/jsonld';
import AdSlot from '@/app/components/AdSlot';

function renderContent(content) {
  if (typeof content === 'string') {
    return content.split(/\n\n+/).map((para, i) => (
      <p key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>{para.trim()}</p>
    ));
  }
  if (Array.isArray(content)) {
    return content.map((block, i) => {
      if (block.type === 'intro') return (
        <p key={i} style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px', borderLeft: '3px solid #E8C547', paddingLeft: '20px' }}>{block.text}</p>
      );
      if (block.type === 'heading') return (
        <h2 key={i} style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: 'white', letterSpacing: '0.05em', marginTop: '40px', marginBottom: '16px' }}>{block.text}</h2>
      );
      if (block.type === 'paragraph') return (
        <p key={i} style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontWeight: 300, marginBottom: '20px' }}>{block.text}</p>
      );
      if (block.type === 'list') return (
        <ul key={i} style={{ marginBottom: '24px', paddingLeft: '0', listStyle: 'none' }}>
          {block.items.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px', fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontWeight: 300 }}>
              <span aria-hidden="true" style={{ color: '#E8C547', flexShrink: 0, marginTop: '4px' }}>&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      if (block.type === 'highlight') return (
        <div key={i} style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(232,197,71,0.95)', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, fontWeight: 400, margin: 0 }}>{block.text}</p>
        </div>
      );
      return null;
    });
  }
  return null;
}

export const revalidate = 300;

function absoluteImageUrl(image) {
  const value = typeof image === 'string' ? image.trim() : '';
  if (!value) return 'https://ictflow.com/og-image.png';

  if (value.startsWith('/') && !value.startsWith('//')) {
    try {
      return new URL(value, 'https://ictflow.com').toString();
    } catch {
      return 'https://ictflow.com/og-image.png';
    }
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' ? parsed.toString() : 'https://ictflow.com/og-image.png';
  } catch {
    return 'https://ictflow.com/og-image.png';
  }
}

function isLocalImage(image) {
  return typeof image === 'string' && image.startsWith('/') && !image.startsWith('//');
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const posts = await getPublishedBlogPosts();
  const post = posts.find((item) => item && item.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | ICT Flow',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://ictflow.com/blog/${post.slug}`;
  const title = post.metaTitle || `${post.title} | ICT Flow`;
  const description = post.metaDesc || post.description || 'ICT Flow trading education article.';
  const image = absoluteImageUrl(post.image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'ICT Flow',
      type: 'article',
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@riskfirsttrad',
    },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  if (!slug) return <div style={{ minHeight: '100vh', background: '#080808' }} />;

  const posts = await getPublishedBlogPosts();
  const post = posts.find(p => p && p.slug === slug) || null;

  if (!post) notFound();

  const canonical = `https://ictflow.com/blog/${post.slug}`;
  const coverImage = post.image || '/images/market-structure.png';
  const relatedPosts = getRelatedBlogPosts(post, posts);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description || '',
    image: [absoluteImageUrl(post.image)],
    mainEntityOfPage: canonical,
    author: { '@type': 'Organization', name: 'ICT Flow', url: 'https://ictflow.com' },
    publisher: { '@type': 'Organization', name: 'ICT Flow', url: 'https://ictflow.com' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: 'white', fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }} />
      <style>{`

      `}</style>

      <Navbar active="/blog" />

      <div style={{ height: '320px', overflow: 'hidden', position: 'relative', background: '#111111' }}>
        {isLocalImage(coverImage) ? (
          <Image
            src={coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover', opacity: 0.4 }}
          />
        ) : (
          <img
            src={coverImage}
            alt={post.title}
            width="1600"
            height="640"
            loading="eager"
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, #080808)' }} />
      </div>

      <article style={{ maxWidth: '720px', margin: '-80px auto 0', padding: '0 24px 80px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#E8C547', background: 'rgba(212,168,67,0.22)', padding: '4px 12px', borderRadius: '4px', letterSpacing: '0.1em' }}>{post.category}</span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{post.readTime}</span>
          {post.date && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: 'rgba(255,255,255,0.65)' }}>{post.date}</span>}
        </div>

        <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(36px, 6vw, 56px)', color: 'white', lineHeight: 1.1, marginBottom: '32px', letterSpacing: '0.02em' }}>{post.title}</h1>

        {post.description && (
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontWeight: 300, marginBottom: '32px', borderLeft: '3px solid #E8C547', paddingLeft: '20px' }}>{post.description}</p>
        )}

        <div role="note" aria-label="ICT methodology note" style={{ background: '#101010', border: '1px solid rgba(232,197,71,0.22)', borderRadius: '10px', padding: '16px 18px', marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, margin: 0 }}>
            <strong style={{ color: '#E8C547' }}>Framework note:</strong> ICT terms are interpretations of price action, not proof of institutional motives or a market algorithm’s intent. No setup is guaranteed. Test clearly defined rules, account for costs and slippage, and use risk limits before risking capital.{' '}
            <Link href="/editorial-policy" style={{ color: '#E8C547', textDecoration: 'underline' }}>Read our editorial policy.</Link>
          </p>
        </div>

        <AdSlot />

        <div>{renderContent(post.content)}</div>

        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-reading-heading" style={{ marginTop: '56px', paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
            <h2 id="related-reading-heading" style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '30px', color: 'white', letterSpacing: '0.04em', marginBottom: '8px' }}>
              RELATED READING
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              Continue with guides selected for overlapping concepts and practical context.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '14px' }}>
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={\x60/blog/\x24{related.slug}\x60}
                  style={{ display: 'block', padding: '18px', borderRadius: '10px', border: '1px solid rgba(232,197,71,0.22)', background: '#101010', textDecoration: 'none', minHeight: '150px' }}
                >
                  <span style={{ display: 'block', color: '#E8C547', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {related.category || 'Trading education'}{related.readTime ? ' · ' + related.readTime : ''}
                  </span>
                  <span style={{ display: 'block', color: 'white', fontSize: '16px', lineHeight: 1.45, fontWeight: 600, marginBottom: '8px' }}>
                    {related.title}
                  </span>
                  <span style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3, overflow: 'hidden', color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.6 }}>
                    {related.description || 'Explore this related ICT trading concept and its practical limits.'}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div style={{ marginTop: '64px', padding: '32px', background: '#111111', border: '1px solid rgba(212,168,67,0.22)', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '28px', color: 'white', marginBottom: '8px' }}>READY TO APPLY THIS?</div>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '24px' }}>38 free ICT modules. Structured learning. Zero fluff.</p>
          <Link href="/courses" style={{ background: 'linear-gradient(135deg,#E8C547,#F0C96A)', color: '#080808', padding: '12px 32px', borderRadius: '8px', fontFamily: 'DM Mono, monospace', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textDecoration: 'none' }}>
            START LEARNING FREE
          </Link>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <Link href="/blog" style={{ color: '#E8C547', textDecoration: 'none', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '0.1em' }}>
            BACK TO BLOG
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}