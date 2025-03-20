
import { createClient } from '@supabase/supabase-js';

// Use default values for local development if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-test-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-test-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
