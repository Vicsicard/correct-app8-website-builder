import supabase from '../utils/supabaseClient';

export interface ProfileInfo {
  id: number;
  created_at?: string;
  full_name: string;
  title: string;
  bio: string;
  tagline: string;
  quote: string;
  email: string;
  avatar_url?: string;
  social_links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export async function getProfile(): Promise<ProfileInfo | null> {
  try {
    const { data, error } = await supabase
      .from('profile_info')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching profile:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
