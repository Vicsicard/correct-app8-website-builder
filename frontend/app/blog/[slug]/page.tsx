import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPost, getAllBlogPosts, type BlogPost } from '../../../src/lib/getBlogPost';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts: BlogPost[] = await getAllBlogPosts();
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const post: BlogPost | null = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const publishDate = post.published_at 
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {post.featured_image && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover rounded-lg shadow-lg"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        {publishDate && (
          <time className="text-gray-500">
            Published on {publishDate}
          </time>
        )}
      </header>

      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {post.content}
      </div>
    </article>
  );
}
