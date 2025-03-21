
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import { ApplicationStatus } from '@/types/application';

// Export the already configured supabase client
export const supabase = supabaseClient;

// Helper function to validate application status
export function validateApplicationStatus(status: string): ApplicationStatus {
  const validStatuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
  
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  
  // Default to 'applied' if an invalid status is provided
  return 'applied';
}

// Get the base URL for authentication redirects
export function getRedirectUrl(): string {
  // In production, use the actual deployed URL
  // For local development, use localhost
  return `${window.location.origin}/`;
}

// Helper to get user profile data
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}

// Helper to update user profile data
export async function updateUserProfile(userId: string, profileData: Partial<{
  first_name: string;
  last_name: string;
  bio: string;
  location: string;
  resume_url: string;
  skills: string[];
  preferences: Record<string, any>;
}>) {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...profileData,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
}

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
