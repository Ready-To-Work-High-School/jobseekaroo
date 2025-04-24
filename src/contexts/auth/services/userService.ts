
import { supabase } from '@/lib/supabase';
import { storeEncryptedUserMetadata } from './security';

export const createUserProfile = async (
  userId: string,
  profileData: Record<string, any>
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .upsert([{ id: userId, ...profileData }])
      .select()
      .single();

    if (error) throw error;

    // Store sensitive data with encryption
    await storeEncryptedUserMetadata(userId, {
      signup_date: new Date().toISOString(),
      ...profileData
    });

    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Record<string, any>
) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
