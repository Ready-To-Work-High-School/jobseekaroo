
import { useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { getUserProfile, updateUserProfile } from './authUtils';
import { storeEncryptedProfileData, getDecryptedProfileData } from '@/lib/supabase/encryption';

export function useProfileManagement(user: User | null) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [sensitiveData, setSensitiveData] = useState<{
    resumeData: string | null;
    contactDetails: string | null;
  }>({ resumeData: null, contactDetails: null });

  const fetchUserProfile = useCallback(async (userId: string) => {
    if (!userId) return;
    
    setProfileLoading(true);
    try {
      const profileData = await getUserProfile(userId);
      setUserProfile(profileData as UserProfile);
      
      // Also fetch and decrypt sensitive data
      const decryptedData = await getDecryptedProfileData(userId);
      if (decryptedData) {
        setSensitiveData(decryptedData);
      }
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

  const updateProfile = async (profileData: Partial<UserProfile>, sensitiveUpdates?: {
    resumeData?: string;
    contactDetails?: string;
  }) => {
    if (!user) throw new Error('User must be logged in to update profile');
    
    try {
      const updatedProfile = await updateUserProfile(user.id, profileData);
      setUserProfile(updatedProfile as UserProfile);
      
      // Handle sensitive data separately with encryption
      if (sensitiveUpdates) {
        const success = await storeEncryptedProfileData(
          user.id,
          sensitiveUpdates.resumeData,
          sensitiveUpdates.contactDetails
        );
        
        if (success && sensitiveUpdates.resumeData) {
          setSensitiveData(prev => ({ ...prev, resumeData: sensitiveUpdates.resumeData }));
        }
        
        if (success && sensitiveUpdates.contactDetails) {
          setSensitiveData(prev => ({ ...prev, contactDetails: sensitiveUpdates.contactDetails }));
        }
      }
      
      return updatedProfile;
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
    refreshProfile,
    sensitiveData
  };
}
