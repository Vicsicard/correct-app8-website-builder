import { createClient } from '@/utils/supabaseClient';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: string;
  published_at: string;
  thumbnail_url?: string;
  tags?: string[];
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return [
        {
          id: '1',
          title: 'Getting Started with Web Development',
          content: '# Getting Started\n\nWelcome to web development! This is a placeholder blog post while we connect to the database.',
          excerpt: 'Learn the basics of web development and start your journey.',
          slug: 'getting-started-web-dev',
          author: 'John Doe',
          published_at: new Date().toISOString(),
          thumbnail_url: 'https://placehold.co/800x400/darkgray/white?text=Web+Development',
          tags: ['webdev', 'beginners']
        },
        {
          id: '2',
          title: 'Understanding Modern JavaScript',
          content: '# Modern JavaScript\n\nExplore the latest features and best practices in JavaScript development.',
          excerpt: 'A deep dive into modern JavaScript features and patterns.',
          slug: 'modern-javascript',
          author: 'John Doe',
          published_at: new Date().toISOString(),
          thumbnail_url: 'https://placehold.co/800x400/darkgray/white?text=JavaScript',
          tags: ['javascript', 'programming']
        }
      ];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [
      {
        id: '1',
        title: 'Getting Started with Web Development',
        content: '# Getting Started\n\nWelcome to web development! This is a placeholder blog post while we connect to the database.',
        excerpt: 'Learn the basics of web development and start your journey.',
        slug: 'getting-started-web-dev',
        author: 'John Doe',
        published_at: new Date().toISOString(),
        thumbnail_url: 'https://placehold.co/800x400/darkgray/white?text=Web+Development',
        tags: ['webdev', 'beginners']
      },
      {
        id: '2',
        title: 'Understanding Modern JavaScript',
        content: '# Modern JavaScript\n\nExplore the latest features and best practices in JavaScript development.',
        excerpt: 'A deep dive into modern JavaScript features and patterns.',
        slug: 'modern-javascript',
        author: 'John Doe',
        published_at: new Date().toISOString(),
        thumbnail_url: 'https://placehold.co/800x400/darkgray/white?text=JavaScript',
        tags: ['javascript', 'programming']
      }
    ];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return {
        id: '1',
        title: 'Sample Blog Post',
        content: '# Sample Post\n\nThis is a placeholder blog post while we connect to the database.',
        excerpt: 'A sample blog post with placeholder content.',
        slug: slug,
        author: 'John Doe',
        published_at: new Date().toISOString(),
        thumbnail_url: 'https://placehold.co/800x400/darkgray/white?text=Sample+Post',
        tags: ['sample']
      };
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return {
      id: '1',
      title: 'Sample Blog Post',
      content: '# Sample Post\n\nThis is a placeholder blog post while we connect to the database.',
      excerpt: 'A sample blog post with placeholder content.',
      slug: slug,
      author: 'John Doe',
      published_at: new Date().toISOString(),
      thumbnail_url: 'https://placehold.co/800x400/darkgray/white?text=Sample+Post',
      tags: ['sample']
    };
  }
}
