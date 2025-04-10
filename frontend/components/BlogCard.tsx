import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/getBlogPost';

export default function BlogCard({ post }: { post: BlogPost }) {
  const thumbnailUrl = post.thumbnail_url || 'https://placehold.co/800x400/darkgray/white?text=Blog+Post';

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-2 mb-2">{post.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.published_at).toLocaleDateString()}</span>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
