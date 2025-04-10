import { createClient } from '@/utils/supabaseClient';

export interface BlogPost {
  id: string;
  section: string;
  platform?: string;
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  tags?: string[];
  published: boolean;
  date: string;
  embed_url?: string;
}

const placeholderPosts: BlogPost[] = [
  {
    id: '1',
    section: 'blog',
    title: 'Getting Started with Web Development',
    slug: 'getting-started-web-dev',
    body: '# Getting Started\n\nWelcome to web development! This is a placeholder post while we connect to the database.',
    excerpt: 'Learn the basics of web development and start your journey.',
    tags: ['web development', 'getting started'],
    published: true,
    date: new Date().toISOString()
  }
];

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', 'blog')
      .eq('published', true)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching blog posts:', error);
      return placeholderPosts;
    }

    if (!data || data.length === 0) {
      return placeholderPosts;
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return placeholderPosts;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', 'blog')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      return placeholderPosts.find(post => post.slug === slug) || placeholderPosts[0];
    }

    if (!data) {
      return placeholderPosts.find(post => post.slug === slug) || placeholderPosts[0];
    }

    return data;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return placeholderPosts.find(post => post.slug === slug) || placeholderPosts[0];
  }
}
