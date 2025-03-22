
import { useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { getUserProfile, updateUserProfile } from './authUtils';

export function useProfileManagement(user: User | null) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const fetchUserProfile = useCallback(async (userId: string) => {
    if (!userId) return;
    
    setProfileLoading(true);
    try {
      const profileData = await getUserProfile(userId);
      setUserProfile(profileData as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('User must be logged in to update profile');
    
    try {
      const updatedProfile = await updateUserProfile(user.id, profileData);
      setUserProfile(updatedProfile as UserProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  return {
    userProfile,
    profileLoading,
    fetchUserProfile,
    updateProfile,
    refreshProfile
  };
}
