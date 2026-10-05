import { POSTS } from '../posts';
import { getPublishedBlogPosts } from '@/lib/blog-data';
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

function safeIsoDate(value) {
  if (!value) return undefined;
  const timestamp = Date.parse(String(value));
  return Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : undefined;
}

export function generateStaticParams() {
  return POSTS.filter((post) => post?.slug).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await getPublishedBlogPosts()).find((item) => item?.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      robots: { index: false, follow: false },
    };
  }

  const canonical = `https://ictflow.com/blog/${post.slug}`;
  const description = post.description || `Read ${post.title} on ICT Flow.`;
  const image = absoluteImageUrl(post.image);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDesc || description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title: post.metaTitle || post.title,
      description: post.metaDesc || description,
      siteName: 'ICT Flow',
      images: [{ url: image, alt: post.title }],
      publishedTime: safeIsoDate(post.date),
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDesc || description,
      images: [image],
    },
  };
}

export default async function BlogPostLayout({ children, params }) {
  const { slug } = await params;
  const post = (await getPublishedBlogPosts()).find((item) => item?.slug === slug);

  if (!post) return children;

  return children;
}
