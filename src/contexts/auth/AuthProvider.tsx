
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { AuthContextType } from './authContext.types';
import { AuthContext } from './AuthContext';

// Import services
import { signIn as authSignIn, signUp as authSignUp, signInWithApple, signOut as authSignOut } from './authService';
import { userProfileService } from './userProfileService';
import { jobService } from './jobService';
import { applicationService } from './applicationService';
import { useAuthState } from './useAuthState';

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { 
    user, 
    session, 
    userProfile, 
    isLoading, 
    profileLoading, 
    setUserProfile,
    refreshProfile 
  } = useAuthState();

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) {
      console.error('User must be logged in to update profile');
      throw new Error('User must be logged in to update profile');
    }
    
    try {
      const updatedProfile = await userProfileService.updateProfile(user.id, profileData);
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
    saveJob: (jobId) => jobService.saveJob(user?.id || '', jobId),
    unsaveJob: (jobId) => jobService.unsaveJob(user?.id || '', jobId),
    isSavedJob: (jobId) => jobService.isSavedJob(user?.id || '', jobId),
    getSavedJobs: () => jobService.getSavedJobs(user?.id || ''),
    createApplication: (application) => applicationService.createApplication(user?.id || '', application),
    updateApplicationStatus: (applicationId, status) => applicationService.updateApplicationStatus(user?.id || '', applicationId, status),
    getApplications: () => applicationService.getApplications(user?.id || ''),
    deleteApplication: (applicationId) => applicationService.deleteApplication(user?.id || '', applicationId),
    updateProfile,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
