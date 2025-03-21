
import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/user';
import { AuthContextType } from './authContext.types';
import { AuthContext } from './AuthContext';

// Import services
import { signIn as authSignIn, signUp as authSignUp, signInWithApple, signOut as authSignOut } from './authService';
import { 
  saveJob, 
  unsaveJob, 
  isSavedJob, 
  getSavedJobs 
} from './savedJobsService';
import {
  createApplication,
  updateApplicationStatus,
  getApplications,
  deleteApplication
} from './applicationService';
import { fetchUserProfile, handleUpdateProfile } from './profileService';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();

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
      const profile = await fetchUserProfile(userId);
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

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      console.error('User must be logged in to update profile');
      throw new Error('User must be logged in to update profile');
    }
    
    try {
      const updatedProfile = await handleUpdateProfile(user.id, profileData);
      setUserProfile(updatedProfile as UserProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    console.log('handleSignIn: Starting sign in with email:', email);
    
    try {
      const response = await authSignIn(email, password);
      console.log('handleSignIn: Sign in response received:', response);
      
      if (response.error) {
        console.error('handleSignIn: Sign in error:', response.error);
        throw response.error;
      }
      
      // Session will be handled by onAuthStateChange
      console.log('handleSignIn: Successfully signed in');
      
      return response;
    } catch (error) {
      console.error('handleSignIn: Sign in error caught:', error);
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    console.log('handleSignUp: Starting sign up with email:', email);
    
    try {
      const response = await authSignUp(email, password, firstName, lastName);
      console.log('handleSignUp: Sign up response received:', response);
      
      if (response.error) {
        console.error('handleSignUp: Sign up error:', response.error);
        throw response.error;
      }
      
      // Session will be handled by onAuthStateChange if auto-confirm is enabled
      console.log('handleSignUp: Successfully signed up');
      
      return response;
    } catch (error) {
      console.error('handleSignUp: Sign up error caught:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    console.log('handleSignOut: Starting sign out');
    
    try {
      const result = await authSignOut();
      console.log('handleSignOut: Sign out successful');
      // Session clean up will be handled by onAuthStateChange
      return result;
    } catch (error) {
      console.error('handleSignOut: Sign out error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    session,
    userProfile,
    isLoading,
    profileLoading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    signInWithApple,
    saveJob: (jobId) => {
      if (!user) {
        console.error('User must be logged in to save jobs');
        return Promise.reject(new Error('User must be logged in to save jobs'));
      }
      return saveJob(user.id, jobId);
    },
    unsaveJob: (jobId) => {
      if (!user) {
        console.error('User must be logged in to unsave jobs');
        return Promise.reject(new Error('User must be logged in to unsave jobs'));
      }
      return unsaveJob(user.id, jobId);
    },
    isSavedJob: (jobId) => {
      if (!user) {
        console.log('No user, job cannot be saved');
        return Promise.resolve(false);
      }
      return isSavedJob(user.id, jobId);
    },
    getSavedJobs: () => {
      if (!user) {
        console.log('No user, no saved jobs');
        return Promise.resolve([]);
      }
      return getSavedJobs(user.id);
    },
    createApplication: (application) => {
      if (!user) {
        console.error('User must be logged in to create an application');
        return Promise.reject(new Error('User must be logged in to create an application'));
      }
      return createApplication(user.id, application);
    },
    updateApplicationStatus: (applicationId, status) => {
      if (!user) {
        console.error('User must be logged in to update an application');
        return Promise.reject(new Error('User must be logged in to update an application'));
      }
      return updateApplicationStatus(user.id, applicationId, status);
    },
    getApplications: () => {
      if (!user) {
        console.log('No user, no applications');
        return Promise.resolve([]);
      }
      return getApplications(user.id);
    },
    deleteApplication: (applicationId) => {
      if (!user) {
        console.error('User must be logged in to delete an application');
        return Promise.reject(new Error('User must be logged in to delete an application'));
      }
      return deleteApplication(user.id, applicationId);
    },
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
