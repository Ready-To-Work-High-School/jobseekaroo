
import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/user';
import { AuthContextType } from './authContext.types';

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
import { 
  getUserProfile, 
  updateUserProfile 
} from './authUtils';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
    if (!userId) {
      console.log('fetchUserProfile: No user ID provided');
      return;
    }
    
    console.log('fetchUserProfile: Fetching profile for user ID:', userId);
    setProfileLoading(true);
    try {
      const profileData = await getUserProfile(userId);
      console.log('fetchUserProfile: Profile data received:', profileData);
      setUserProfile(profileData as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('Auth state change: user is logged in, fetching profile');
        fetchUserProfile(session.user.id);
      } else {
        console.log('Auth state change: no user, clearing profile');
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('Initial session: user is logged in, fetching profile');
        fetchUserProfile(session.user.id);
      } else {
        console.log('Initial session: no user');
      }
      
      setIsLoading(false);
    });

    return () => {
      console.log('Cleaning up auth state listener');
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    console.log('refreshProfile called');
    if (user) {
      await fetchUserProfile(user.id);
    } else {
      console.log('refreshProfile: No user to refresh profile for');
    }
  };

  const handleUpdateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      console.error('User must be logged in to update profile');
      throw new Error('User must be logged in to update profile');
    }
    
    try {
      console.log('handleUpdateProfile: Updating profile for user:', user.id);
      const updatedProfile = await updateUserProfile(user.id, profileData);
      console.log('handleUpdateProfile: Profile updated:', updatedProfile);
      setUserProfile(updatedProfile as UserProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      console.log('handleSignIn: Signing in with email:', email);
      const response = await authSignIn(email, password);
      console.log('handleSignIn: Sign in response:', response);
      
      if (response.data.session) {
        console.log('handleSignIn: Successfully signed in, navigating to home');
        navigate('/');
      }
      
      return response;
    } catch (error) {
      console.error('handleSignIn: Sign in error:', error);
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log('handleSignUp: Signing up with email:', email);
      const response = await authSignUp(email, password, firstName, lastName);
      console.log('handleSignUp: Sign up response:', response);
      
      if (response.data.session) {
        console.log('handleSignUp: Session created, navigating to home');
        navigate('/');
      } else if (!response.error) {
        console.log('handleSignUp: Successful signup but email confirmation required');
        // Could redirect to a confirmation page here
      }
      
      return response;
    } catch (error) {
      console.error('handleSignUp: Sign up error:', error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('handleSignOut: Signing out');
      const result = await authSignOut();
      console.log('handleSignOut: Sign out successful');
      navigate('/');
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
    updateProfile: handleUpdateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
