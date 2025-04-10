import { getAllBlogPosts } from '@/lib/getBlogPost';
import BlogCard from '@/components/BlogCard';

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
