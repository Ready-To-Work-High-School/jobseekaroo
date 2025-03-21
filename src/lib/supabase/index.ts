
import { supabaseClient } from '@/integrations/supabase/client';

// Export the already configured supabase client
export const supabase = supabaseClient;

// Re-export all functionality from our modules
export * from './profiles';
export * from './jobs';
export * from './skills';
export * from './applications';
export * from './recommendations';
export * from './utils';
