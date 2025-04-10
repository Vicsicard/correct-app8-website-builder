import { createClient } from '@/utils/supabaseClient';
import Image from 'next/image';

interface SocialPost {
  id: string;
  section: string;
  platform: string;
  title: string;
  body: string;
  excerpt: string;
  published_at: string;
  embed_url?: string;
  tags?: string[];
}

async function getSocialPosts(): Promise<SocialPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', 'social')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching social posts:', error);
      return [
        {
          id: '1',
          section: 'social',
          platform: 'twitter',
          title: 'Web Development Thoughts',
          body: 'Excited to share my latest thoughts on web development and the future of technology! #webdev #tech',
          excerpt: 'Thoughts on web development',
          published_at: new Date().toISOString(),
          tags: ['webdev', 'tech']
        },
        {
          id: '2',
          section: 'social',
          platform: 'linkedin',
          title: 'Tech Meetup',
          body: 'Behind the scenes at our latest tech meetup! 📱 #techmeetup #coding #developer',
          excerpt: 'Tech meetup highlights',
          published_at: new Date().toISOString(),
          tags: ['techmeetup', 'coding', 'developer']
        }
      ];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function SocialPage() {
  const posts = await getSocialPosts();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Social Updates</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Image
                src={`/${post.platform}.svg`}
                alt={post.platform}
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-gray-600 text-sm">
                {new Date(post.published_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-800 mb-4">{post.body}</p>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
