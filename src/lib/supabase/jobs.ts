
import { supabase } from '@/lib/supabase';

export const getAllJobs = async () => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const generateRecommendationsForUser = async (userId: string) => {
  // Mock implementation for now
  console.log('Generating recommendations for user:', userId);
  return [];
};
