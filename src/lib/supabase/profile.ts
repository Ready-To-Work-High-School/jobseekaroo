
import { supabase } from './index';
import { UserProfile } from '@/types/user';

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

export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) {
  // Create a new object with the profile data, handling badges specially
  const updateData: Record<string, any> = {
    ...profileData,
    updated_at: new Date().toISOString()
  };
  
  // If badges is included in the update, ensure it's in the correct format for Supabase
  if (profileData.badges) {
    // We're ensuring badges is stored in a format compatible with Supabase's Json type
    // by converting it to a plain object array
    updateData.badges = profileData.badges.map(badge => ({
      id: badge.id,
      name: badge.name,
      earned_at: badge.earned_at
    }));
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
}
