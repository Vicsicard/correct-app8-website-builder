import { createClient } from '@/utils/supabaseClient';

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  github?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  title: string;
  bio: string;
  tagline?: string;
  quote?: string;
  email?: string;
  social_links?: SocialLinks;
}

export async function getProfile(): Promise<Profile | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return {
        id: '1',
        full_name: 'John Doe',
        title: 'Software Developer',
        bio: 'Welcome to my website! This is a placeholder bio while we connect to the database.',
        tagline: 'Building the future of web development',
      };
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return {
      id: '1',
      full_name: 'John Doe',
      title: 'Software Developer',
      bio: 'Welcome to my website! This is a placeholder bio while we connect to the database.',
      tagline: 'Building the future of web development',
    };
  }
}
