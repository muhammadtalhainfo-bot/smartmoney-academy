import { POSTS } from '../posts';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = POSTS.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Blog Post | ICT Flow',
      robots: { index: false, follow: false },
    };
  }

  const introBlock = Array.isArray(post.content)
    ? post.content.find(b => b.type === 'intro' || b.type === 'paragraph')?.text
    : null;
  const desc = post.description || (introBlock ? introBlock.slice(0, 155) + '…' : '');

  return {
    title: post.title,
    description: desc,
    alternates: { canonical: `https://ictflow.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: desc,
      url: `https://ictflow.com/blog/${slug}`,
      siteName: 'ICT Flow',
      type: 'article',
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
      authors: ['ICT Flow'],
      images: [
        post.image
          ? { url: `https://ictflow.com${post.image}`, width: 1200, height: 630, alt: post.title }
          : { url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: desc,
      images: [post.image ? `https://ictflow.com${post.image}` : 'https://ictflow.com/og-image.png'],
      creator: '@riskfirsttrad',
    },
  };
}

export default function BlogPostLayout({ children }) {
  return children;
}
