
import { useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { UserProfile, UserProfileUpdate, UserBadge } from '@/types/user';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      // Format the profile data to match UserProfile type
      if (data) {
        const badges: UserBadge[] = Array.isArray(data.badges) 
          ? data.badges.map((badge: any) => ({ 
              id: badge.id || '',
              name: badge.name || '',
              earned_at: badge.earned_at
            }))
          : [];

        // Ensure proper typecasting
        const formattedProfile: UserProfile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          location: data.location,
          resume_url: data.resume_url,
          skills: data.skills || [],
          preferences: data.preferences ? (typeof data.preferences === 'string' ? JSON.parse(data.preferences) : data.preferences) : {},
          user_type: data.user_type as "student" | "employer" | "admin" | "teacher" | undefined,
          redeemed_at: data.redeemed_at,
          redeemed_code: data.redeemed_code,
          avatar_url: data.avatar_url,
          email: data.email,
          company_name: data.company_name,
          company_website: data.company_website,
          job_title: data.job_title,
          employer_verification_status: data.employer_verification_status,
          verification_notes: data.verification_notes,
          resume_data_encrypted: data.resume_data_encrypted,
          contact_details_encrypted: data.contact_details_encrypted,
          created_at: data.created_at,
          updated_at: data.updated_at,
          accessibility_settings: data.accessibility_settings || {
            highContrast: false,
            largeText: false,
            screenReader: false,
            reducedMotion: false,
            dyslexicFont: false
          },
          badges: badges,
          student_badges: Array.isArray(data.student_badges) 
            ? data.student_badges
            : []
        };
        
        setUserProfile(formattedProfile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
      // Don't show toast on every refresh attempt, only log to console
      // This prevents multiple toast notifications
      setError(error instanceof Error ? error : new Error('Failed to refresh profile'));
    }
  }, [user]);

  return {
    user,
    setUser,
    userProfile,
    setUserProfile,
    isLoading,
    setIsLoading,
    error,
    setError,
    refreshProfile
  };
};
