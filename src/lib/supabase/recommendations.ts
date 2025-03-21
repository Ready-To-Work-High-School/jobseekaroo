
import { supabase } from './index';

// Helper to get job recommendations for a user
export async function getJobRecommendations(userId: string) {
  try {
    const { data, error } = await supabase
      .from('job_recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('score', { ascending: false });
    
    if (error) {
      console.error('Error fetching job recommendations:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching job recommendations:', error);
    return [];
  }
}

// Helper to manually trigger recommendation generation for a user
export async function generateRecommendationsForUser(userId: string) {
  try {
    const { data, error } = await supabase
      .rpc('generate_job_recommendations', { user_id_param: userId });
    
    if (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Exception generating recommendations:', error);
    throw error;
  }
}
