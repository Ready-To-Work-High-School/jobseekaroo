
import { supabase } from '@/lib/supabase';
import { formatUserProfile } from './utils';

export const getUserProfile = async (userId: string) => {
  try {
    console.log('Fetching user profile for ID:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
    
    console.log('Raw profile data:', data);
    return formatUserProfile(data);
  } catch (err) {
    console.error('Unexpected error in getUserProfile:', err);
    return null;
  }
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    console.log('Updating profile for user ID:', userId, 'with data:', profileData);
    
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
    
    console.log('Profile update result:', data);
    return formatUserProfile(data);
  } catch (err) {
    console.error('Error in updateUserProfile:', err);
    throw err;
  }
};
