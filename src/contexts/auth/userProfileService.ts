
import { UserProfile } from '@/types/user';
import { fetchUserProfile, handleUpdateProfile } from './profileService';

/**
 * Service functions for handling user profile operations
 */
export const userProfileService = {
  refreshUserProfile: async (userId: string): Promise<UserProfile | null> => {
    try {
      const profile = await fetchUserProfile(userId);
      return profile;
    } catch (error) {
      console.error('Error refreshing user profile:', error);
      return null;
    }
  },

  updateProfile: async (userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | null> => {
    if (!userId) {
      console.error('User must be logged in to update profile');
      throw new Error('User must be logged in to update profile');
    }
    
    try {
      const updatedProfile = await handleUpdateProfile(userId, profileData);
      return updatedProfile as UserProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }
};
