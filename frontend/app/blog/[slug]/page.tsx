import { getBlogPostBySlug, getAllBlogPosts, type BlogPost } from '@/lib/getBlogPost';
import { notFound } from 'next/navigation';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto prose lg:prose-xl">
      <h1>{post.title}</h1>
      <div className="flex items-center text-gray-600 mb-8">
        <time>{new Date(post.date).toLocaleDateString()}</time>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </article>
  );
}
