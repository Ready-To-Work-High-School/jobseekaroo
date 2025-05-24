
import { supabase } from './client';

export const generateRecommendationsForUser = async (userId: string) => {
  try {
    // This would typically call a Supabase Edge Function for ML-based recommendations
    // For now, we'll return a simple implementation
    const { data, error } = await supabase
      .from('job_recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};

export const getJobRecommendations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('job_recommendations')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('relevance_score', { ascending: false })
      .limit(10);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching job recommendations:', error);
    return [];
  }
};
