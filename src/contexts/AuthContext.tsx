
import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from './auth/authContext.types';
import { useAuthState } from './auth/useAuthState';
import { useAuthMethods } from './auth/useAuthMethods';
import { useProfileManagement } from './auth/useProfileManagement';
import { useJobManagement } from './auth/useJobManagement';
import { useApplicationManagement } from './auth/useApplicationManagement';
import { useMfaManagement } from './auth/useMfaManagement';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  
  const { 
    userProfile, 
    profileLoading, 
    fetchUserProfile, 
    updateProfile, 
    refreshProfile 
  } = useProfileManagement(null); // We'll update this after setting up auth state
  
  const { 
    user,
    session,
    isLoading 
  } = useAuthState(fetchUserProfile);
  
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
  
  const {
    isMfaEnabled,
    isMfaLoading,
    mfaFactors,
    refreshMfaStatus,
    enrollMfa,
    verifyMfa,
    unenrollMfa
  } = useMfaManagement(user);

  // Refresh MFA status when user changes
  useEffect(() => {
    if (user) {
      refreshMfaStatus();
    }
  }, [user]);

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
    // MFA related
    isMfaEnabled,
    isMfaLoading,
    enrollMfa,
    verifyMfa,
    unenrollMfa,
    mfaFactors,
    refreshMfaStatus
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
