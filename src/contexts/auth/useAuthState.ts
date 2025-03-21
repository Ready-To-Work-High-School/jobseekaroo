
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { userProfileService } from './userProfileService';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log('Auth state change event:', event);
      console.log('Auth state change session:', newSession?.user?.id);
      
      setSession(newSession);
      setUser(newSession?.user ?? null);
      
      if (newSession?.user) {
        console.log('Auth state change: user is logged in, fetching profile');
        refreshUserProfile(newSession.user.id);
      } else {
        console.log('Auth state change: no user, clearing profile');
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      console.log('Initial session check:', existingSession?.user?.id);
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession?.user) {
        console.log('Initial session: user is logged in, fetching profile');
        refreshUserProfile(existingSession.user.id);
      } else {
        console.log('Initial session: no user');
        setProfileLoading(false);
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      subscription.unsubscribe();
    };
  }, []);

  const refreshUserProfile = async (userId: string) => {
    setProfileLoading(true);
    try {
      const profile = await userProfileService.refreshUserProfile(userId);
      setUserProfile(profile);
    } finally {
      setProfileLoading(false);
    }
  };
  
  const refreshProfile = async () => {
    console.log('refreshProfile called');
    if (user) {
      await refreshUserProfile(user.id);
    } else {
      console.log('refreshProfile: No user to refresh profile for');
    }
  };

  return {
    user,
    session,
    userProfile,
    isLoading,
    profileLoading,
    setUserProfile,
    refreshUserProfile,
    refreshProfile
  };
}
