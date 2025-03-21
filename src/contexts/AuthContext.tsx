
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { UserProfile } from '@/types/user';
import { AuthContextType } from './auth/authContext.types';

// Import services
import { signIn, signUp, signInWithApple, signOut } from './auth/authService';
import { 
  saveJob, 
  unsaveJob, 
  isSavedJob, 
  getSavedJobs 
} from './auth/savedJobsService';
import {
  createApplication as createAppService,
  updateApplicationStatus as updateAppStatusService,
  getApplications as getAppsService,
  deleteApplication as deleteAppService
} from './auth/applicationService';
import { 
  getUserProfile as getUserProfileService, 
  updateUserProfile 
} from './auth/authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
      const profileData = await getUserProfileService(userId);
      setUserProfile(profileData as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
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

  // Auth methods that use the navigator
  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      await signUp(email, password, firstName, lastName);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const handleSignInWithApple = async () => {
    try {
      await signInWithApple();
      // Note: No need to navigate since OAuth redirects
    } catch (error) {
      throw error;
    }
  };

  // Methods that require the user id
  const handleSaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    await saveJob(user.id, jobId);
  };

  const handleUnsaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to unsave jobs');
    await unsaveJob(user.id, jobId);
  };

  const handleIsSavedJob = async (jobId: string) => {
    if (!user) return false;
    return isSavedJob(user.id, jobId);
  };

  const handleGetSavedJobs = async () => {
    if (!user) return [];
    return getSavedJobs(user.id);
  };

  const handleCreateApplication = async (
    application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>
  ) => {
    if (!user) throw new Error('User must be logged in to create an application');
    return createAppService(user.id, application);
  };

  const handleUpdateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    if (!user) throw new Error('User must be logged in to update an application');
    return updateAppStatusService(user.id, applicationId, status);
  };

  const handleGetApplications = async () => {
    if (!user) return [];
    return getAppsService(user.id);
  };

  const handleDeleteApplication = async (applicationId: string) => {
    if (!user) throw new Error('User must be logged in to delete an application');
    return deleteAppService(user.id, applicationId);
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
    signInWithApple: handleSignInWithApple,
    saveJob: handleSaveJob,
    unsaveJob: handleUnsaveJob,
    isSavedJob: handleIsSavedJob,
    getSavedJobs: handleGetSavedJobs,
    createApplication: handleCreateApplication,
    updateApplicationStatus: handleUpdateApplicationStatus,
    getApplications: handleGetApplications,
    deleteApplication: handleDeleteApplication,
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
