
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
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const handleUpdateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('User must be logged in to update profile');
    
    try {
      const updatedProfile = await updateUserProfile(user.id, profileData);
      setUserProfile(updatedProfile as UserProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    const response = await authSignIn(email, password);
    navigate('/');
    return response;
  };

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await authSignUp(email, password, firstName, lastName);
    if (response.data.session) {
      navigate('/');
    }
    return response;
  };

  const handleSignOut = async () => {
    const result = await authSignOut();
    navigate('/');
    return result;
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
    saveJob: (jobId) => user ? saveJob(user.id, jobId) : Promise.reject(new Error('User must be logged in to save jobs')),
    unsaveJob: (jobId) => user ? unsaveJob(user.id, jobId) : Promise.reject(new Error('User must be logged in to unsave jobs')),
    isSavedJob: (jobId) => user ? isSavedJob(user.id, jobId) : Promise.resolve(false),
    getSavedJobs: () => user ? getSavedJobs(user.id) : Promise.resolve([]),
    createApplication: (application) => user ? createApplication(user.id, application) : Promise.reject(new Error('User must be logged in to create an application')),
    updateApplicationStatus: (applicationId, status) => user ? updateApplicationStatus(user.id, applicationId, status) : Promise.reject(new Error('User must be logged in to update an application')),
    getApplications: () => user ? getApplications(user.id) : Promise.resolve([]),
    deleteApplication: (applicationId) => user ? deleteApplication(user.id, applicationId) : Promise.reject(new Error('User must be logged in to delete an application')),
    updateProfile: handleUpdateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
