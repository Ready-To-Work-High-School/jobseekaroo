
import { UserProfile } from '@/types/user';
import { getUserProfile, updateUserProfile } from './authUtils';

export const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (!userId) {
    console.log('fetchUserProfile: No user ID provided');
    return null;
  }
  
  console.log('fetchUserProfile: Fetching profile for user ID:', userId);
  try {
    const profileData = await getUserProfile(userId);
    console.log('fetchUserProfile: Profile data received:', profileData);
    return profileData as UserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

export const handleUpdateProfile = async (userId: string, profileData: Partial<UserProfile>): Promise<UserProfile | null> => {
  if (!userId) {
    console.error('User must be logged in to update profile');
    throw new Error('User must be logged in to update profile');
  }
  
  try {
    console.log('handleUpdateProfile: Updating profile for user:', userId);
    const updatedProfile = await updateUserProfile(userId, profileData);
    console.log('handleUpdateProfile: Profile updated:', updatedProfile);
    return updatedProfile as UserProfile;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
