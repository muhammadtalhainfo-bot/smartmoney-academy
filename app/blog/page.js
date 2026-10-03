import BlogIndexClient from './BlogIndexClient';
import { getPublishedBlogPosts } from '@/lib/blog-data';

export const metadata = {
  title: 'ICT Trading Blog — Strategies, Analysis & Education',
  description: 'ICT trading articles, strategy guides, risk-aware execution notes and educational insights from ICT Flow.',
  alternates: { canonical: 'https://ictflow.com/blog' },
  openGraph: {
    title: 'ICT Trading Blog | ICT Flow',
    description: 'ICT trading articles, strategy guides and educational insights from ICT Flow.',
    url: 'https://ictflow.com/blog',
    siteName: 'ICT Flow',
    images: [{ url: 'https://ictflow.com/og-image.png', width: 1200, height: 630, alt: 'ICT Flow Trading Blog' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ICT Trading Blog | ICT Flow',
    description: 'ICT trading articles, strategy guides and educational insights from ICT Flow.',
    images: ['https://ictflow.com/og-image.png'],
    creator: '@riskfirsttrad',
  },
};

export const revalidate = 300;

export default async function BlogPage() {
  const publishedPosts = await getPublishedBlogPosts();
  const posts = publishedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    category: p.category || 'Beginner',
    readTime: p.readTime || '5 min read',
    date: p.date || '',
    image: p.image || '/images/market-structure.png',
    featured: p.featured || false,
  }));

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'ICT Trading Blog',
    description: 'ICT trading articles, strategy guides and educational insights from ICT Flow.',
    url: 'https://ictflow.com/blog',
    isPartOf: { '@type': 'WebSite', name: 'ICT Flow', url: 'https://ictflow.com' },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: post.title,
        url: `https://ictflow.com/blog/${post.slug}`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <BlogIndexClient posts={posts} />
    </>
  );
}
