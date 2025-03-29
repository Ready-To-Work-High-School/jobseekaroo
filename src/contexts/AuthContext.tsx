import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { AuthContextType } from './auth/authContext.types';
import { useAuthMethods } from './auth/useAuthMethods';
import { useProfileManagement } from './auth/useProfileManagement';
import { useJobManagement } from './auth/useJobManagement';
import { useApplicationManagement } from './auth/useApplicationManagement';
import { 
  checkMfaEnabled, 
  enrollMfa as enrollMfaService, 
  verifyMfa as verifyMfaService,
  unenrollMfa as unenrollMfaService 
} from '@/lib/supabase/oauth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // MFA state
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [isMfaLoading, setIsMfaLoading] = useState(false);
  const [mfaFactors, setMfaFactors] = useState<Array<{id: string; type: string; friendly_name?: string}>>([]);
  
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

  // Check MFA status
  const refreshMfaStatus = async () => {
    if (!user) {
      setIsMfaEnabled(false);
      setMfaFactors([]);
      return;
    }
    
    setIsMfaLoading(true);
    try {
      const { data, error } = await supabase.auth.mfa.listFactors();
      
      if (error) {
        console.error('Error fetching MFA factors:', error);
        setIsMfaEnabled(false);
        setMfaFactors([]);
        return;
      }
      
      // Check if there are any verified factors
      const verifiedFactors = data.totp.filter(factor => factor.status === 'verified');
      setIsMfaEnabled(verifiedFactors.length > 0);
      setMfaFactors(data.totp);
    } catch (err) {
      console.error('Unexpected error fetching MFA status:', err);
      setIsMfaEnabled(false);
      setMfaFactors([]);
    } finally {
      setIsMfaLoading(false);
    }
  };

  // MFA enrollment handler
  const handleEnrollMfa = async () => {
    try {
      const result = await enrollMfaService();
      if (!result) return null;
      
      await refreshMfaStatus();
      return { qrCode: result.enrollUrl };
    } catch (err) {
      console.error('Error enrolling in MFA:', err);
      return null;
    }
  };

  // MFA verification handler
  const handleVerifyMfa = async (code: string, factorId: string) => {
    try {
      const verified = await verifyMfaService(code, factorId);
      if (verified) {
        await refreshMfaStatus();
      }
      return verified;
    } catch (err) {
      console.error('Error verifying MFA:', err);
      return false;
    }
  };

  // MFA unenrollment handler
  const handleUnenrollMfa = async (factorId: string) => {
    try {
      const success = await unenrollMfaService(factorId);
      if (success) {
        await refreshMfaStatus();
      }
      return success;
    } catch (err) {
      console.error('Error unenrolling from MFA:', err);
      return false;
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Debug log
      console.log("Auth state change event:", event, "Session:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Use setTimeout to prevent blocking renderer
        setTimeout(() => {
          fetchUserProfile(session.user.id);
          refreshMfaStatus();
        }, 0);
      } else {
        // User has signed out or is not authenticated
        setIsMfaEnabled(false);
        setMfaFactors([]);
      }
      
      setIsLoading(false);
    });

    // First check for an existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Debug log
      console.log("Initial session check:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
        refreshMfaStatus();
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

  // Add debug log to show profile when it changes
  useEffect(() => {
    console.log("AuthContext - Current user profile:", userProfile);
  }, [userProfile]);

  // Check for TLS/HTTPS in production
  useEffect(() => {
    // Only check in production environments
    if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
      console.warn('WARNING: Secure connection (HTTPS) is recommended for authentication.');
    }
  }, []);

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
    enrollMfa: handleEnrollMfa,
    verifyMfa: handleVerifyMfa,
    unenrollMfa: handleUnenrollMfa,
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
