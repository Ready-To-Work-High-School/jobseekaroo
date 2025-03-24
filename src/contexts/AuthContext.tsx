
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from './auth/authContext.types';
import { useAuthMethods } from './auth/useAuthMethods';
import { useProfileManagement } from './auth/useProfileManagement';
import { useJobManagement } from './auth/useJobManagement';
import { useApplicationManagement } from './auth/useApplicationManagement';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  const { 
    userProfile, 
    profileLoading, 
    fetchUserProfile, 
    updateProfile, 
    refreshProfile 
  } = useProfileManagement(user);
  
  const { 
    handleSignIn, 
    handleSignUp, 
    handleSignOut, 
    handleSignInWithApple, 
    handleSignInWithGoogle 
  } = useAuthMethods(navigate, fetchUserProfile);
  
  const {
    handleSaveJob,
    handleUnsaveJob,
    handleIsSavedJob,
    handleGetSavedJobs
  } = useJobManagement(user);
  
  const {
    handleCreateApplication,
    handleUpdateApplicationStatus,
    handleGetApplications,
    handleDeleteApplication
  } = useApplicationManagement(user);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Debug log
      console.log("Auth state change event:", event, "Session:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        // User has signed out or is not authenticated
      }
      
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      // Debug log
      console.log("Initial session check:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  // Add debug log to show profile when it changes
  useEffect(() => {
    console.log("AuthContext - Current user profile:", userProfile);
  }, [userProfile]);

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
    signInWithGoogle: handleSignInWithGoogle,
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
