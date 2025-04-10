import supabase from '../utils/supabaseClient';

export interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  tags?: string[];
  created_at: string;
  published_at?: string;
}

export async function getAllVideos(): Promise<Video[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    return [];
  }

  return data || [];
}

export async function getVideoById(id: string): Promise<Video | null> {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching video:', error);
    return null;
  }

  return data;
}

export async function getAllVideoIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from('videos')
    .select('id');

  if (error) {
    console.error('Error fetching video IDs:', error);
    return [];
  }

  return data.map((video: { id: string }) => video.id);
}
