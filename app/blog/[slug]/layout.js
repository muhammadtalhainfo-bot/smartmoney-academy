import { POSTS } from '../posts';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find((item) => item?.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://ictflow.com/blog/${post.slug}`;
  const description = post.description || `Read ${post.title} on ICT Flow.`;
  const image = post.image
    ? (post.image.startsWith('http') ? post.image : `https://ictflow.com${post.image}`)
    : 'https://ictflow.com/og-image.png';

  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: post.title,
      description,
      siteName: 'ICT Flow',
      images: [{ url: image, alt: post.title }],
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostLayout({ children, params }) {
  const { slug } = await params;
  const post = POSTS.find((item) => item?.slug === slug);

  if (!post) return children;

  const canonical = `https://ictflow.com/blog/${post.slug}`;
  const published = post.date ? new Date(post.date).toISOString() : undefined;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [post.image
      ? (post.image.startsWith('http') ? post.image : `https://ictflow.com${post.image}`)
      : 'https://ictflow.com/og-image.png'],
    datePublished: published,
    dateModified: published,
    author: {
      '@type': 'Organization',
      name: 'ICT Flow',
      url: 'https://ictflow.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ICT Flow',
      url: 'https://ictflow.com',
      logo: { '@type': 'ImageObject', url: 'https://ictflow.com/favicon-96x96.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    articleSection: post.category,
    url: canonical,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
