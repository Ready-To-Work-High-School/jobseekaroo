
import { createClient } from '@supabase/supabase-js';
import { normalizeJobs, normalizeJob } from '@/utils/jobAdapter';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export job-related functions from the jobs module
export * from './jobs';

// Re-export all necessary functions and types
export { normalizeJobs, normalizeJob };
