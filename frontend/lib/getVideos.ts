import { createClient } from '@/utils/supabaseClient';

export interface Video {
  id: string;
  section: string;
  title: string;
  body: string;
  excerpt: string;
  embed_url: string;
  tags?: string[];
  published_at: string;
  date: string;
}

export async function getAllVideos(): Promise<Video[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', 'video')
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      return [
        {
          id: '1',
          section: 'video',
          title: 'Getting Started with Next.js',
          body: 'Learn how to build modern web applications with Next.js',
          excerpt: 'A comprehensive guide to Next.js development',
          embed_url: 'https://www.youtube.com/embed/1234567890',
          tags: ['nextjs', 'react', 'tutorial'],
          published_at: new Date().toISOString(),
          date: new Date().toISOString()
        },
        {
          id: '2',
          section: 'video',
          title: 'Tailwind CSS Masterclass',
          body: 'Master Tailwind CSS and build beautiful websites',
          excerpt: 'Learn utility-first CSS with Tailwind',
          embed_url: 'https://www.youtube.com/embed/0987654321',
          tags: ['css', 'tailwind', 'tutorial'],
          published_at: new Date().toISOString(),
          date: new Date().toISOString()
        }
      ];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [
      {
        id: '1',
        section: 'video',
        title: 'Getting Started with Next.js',
        body: 'Learn how to build modern web applications with Next.js',
        excerpt: 'A comprehensive guide to Next.js development',
        embed_url: 'https://www.youtube.com/embed/1234567890',
        tags: ['nextjs', 'react', 'tutorial'],
        published_at: new Date().toISOString(),
        date: new Date().toISOString()
      },
      {
        id: '2',
        section: 'video',
        title: 'Tailwind CSS Masterclass',
        body: 'Master Tailwind CSS and build beautiful websites',
        excerpt: 'Learn utility-first CSS with Tailwind',
        embed_url: 'https://www.youtube.com/embed/0987654321',
        tags: ['css', 'tailwind', 'tutorial'],
        published_at: new Date().toISOString(),
        date: new Date().toISOString()
      }
    ];
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('content')
      .select('*')
      .eq('section', 'video')
      .eq('id', id)
      .not('published_at', 'is', null)
      .single();

    if (error) {
      console.error('Error fetching video:', error);
      return {
        id: '1',
        section: 'video',
        title: 'Sample Video',
        body: 'This is a sample video description',
        excerpt: 'A sample video with placeholder content',
        embed_url: 'https://www.youtube.com/embed/sample',
        tags: ['sample'],
        published_at: new Date().toISOString(),
        date: new Date().toISOString()
      };
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return {
      id: '1',
      section: 'video',
      title: 'Sample Video',
      body: 'This is a sample video description',
      excerpt: 'A sample video with placeholder content',
      embed_url: 'https://www.youtube.com/embed/sample',
      tags: ['sample'],
      published_at: new Date().toISOString(),
      date: new Date().toISOString()
    };
  }
}

export async function getAllVideoIds(): Promise<string[]> {
  const { data, error } = await createClient()
    .from('content')
    .select('id')
    .eq('section', 'video')
    .not('published_at', 'is', null);

  if (error) {
    console.error('Error fetching video IDs:', error);
    return [];
  }

  return data.map((video: { id: string }) => video.id);
}
