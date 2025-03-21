
import { supabase } from './index';

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
