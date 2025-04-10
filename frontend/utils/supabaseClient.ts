import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY ?? '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables');
}

export const createClient = () => createSupabaseClient(
  supabaseUrl,
  supabaseKey
);

export default createClient;
