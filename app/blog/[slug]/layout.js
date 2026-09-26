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

export default function BlogPostLayout({ children }) {
  return children;
}
