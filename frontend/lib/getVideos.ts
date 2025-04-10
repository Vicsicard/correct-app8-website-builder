import { createClient } from '@/utils/supabaseClient';

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail_url?: string;
  published_at: string;
  views: number;
}

export async function getAllVideos(): Promise<Video[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Error fetching videos:', error);
      return [
        {
          id: '1',
          title: 'Getting Started with Next.js',
          description: 'Learn how to build modern web applications with Next.js',
          url: 'https://www.youtube.com/watch?v=example1',
          thumbnail_url: 'https://placehold.co/320x180/darkgray/white?text=Next.js+Tutorial',
          published_at: new Date().toISOString(),
          views: 1234
        },
        {
          id: '2',
          title: 'Building with Tailwind CSS',
          description: 'Master utility-first CSS with Tailwind',
          url: 'https://www.youtube.com/watch?v=example2',
          thumbnail_url: 'https://placehold.co/320x180/darkgray/white?text=Tailwind+CSS',
          published_at: new Date().toISOString(),
          views: 987
        }
      ];
    }

    return data || [];
  } catch (error) {
    console.error('Error:', error);
    return [
      {
        id: '1',
        title: 'Getting Started with Next.js',
        description: 'Learn how to build modern web applications with Next.js',
        url: 'https://www.youtube.com/watch?v=example1',
        thumbnail_url: 'https://placehold.co/320x180/darkgray/white?text=Next.js+Tutorial',
        published_at: new Date().toISOString(),
        views: 1234
      },
      {
        id: '2',
        title: 'Building with Tailwind CSS',
        description: 'Master utility-first CSS with Tailwind',
        url: 'https://www.youtube.com/watch?v=example2',
        thumbnail_url: 'https://placehold.co/320x180/darkgray/white?text=Tailwind+CSS',
        published_at: new Date().toISOString(),
        views: 987
      }
    ];
  }
}

export async function getVideoById(id: string): Promise<Video | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching video:', error);
      return {
        id: id,
        title: 'Sample Video',
        description: 'This is a placeholder video while we connect to the database.',
        url: 'https://www.youtube.com/watch?v=example1',
        thumbnail_url: 'https://placehold.co/320x180/darkgray/white?text=Sample+Video',
        published_at: new Date().toISOString(),
        views: 1234
      };
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return {
      id: id,
      title: 'Sample Video',
      description: 'This is a placeholder video while we connect to the database.',
      url: 'https://www.youtube.com/watch?v=example1',
      thumbnail_url: 'https://placehold.co/320x180/darkgray/white?text=Sample+Video',
      published_at: new Date().toISOString(),
      views: 1234
    };
  }
}

export async function getAllVideoIds(): Promise<string[]> {
  const { data, error } = await createClient()
    .from('videos')
    .select('id');

  if (error) {
    console.error('Error fetching video IDs:', error);
    return [];
  }

  return data.map((video: { id: string }) => video.id);
}
