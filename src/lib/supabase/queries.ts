
import { supabase } from './index';
import { UserProfile } from '@/types/user';

/**
 * Fetch user by ID
 */
export async function getUserById(userId: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as UserProfile;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * Fetch users by type
 */
export async function getUsersByType(userType: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_type', userType);

    if (error) throw error;
    return data as UserProfile[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    return false;
  }
}

/**
 * Delete user
 */
export async function deleteUser(userId: string) {
  try {
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

/**
 * Grant premium access to a user
 */
export async function grantPremiumAccess(userId: string, premiumType: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ premium_status: premiumType })
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error granting premium access:', error);
    return false;
  }
}

/**
 * Revoke premium access from a user
 */
export async function revokePremiumAccess(userId: string) {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ premium_status: null })
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error revoking premium access:', error);
    return false;
  }
}

/**
 * Fetch premium users
 */
export async function fetchPremiumUsers() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .not('premium_status', 'is', null);

    if (error) throw error;
    return data as UserProfile[];
  } catch (error) {
    console.error('Error fetching premium users:', error);
    return [];
  }
}
