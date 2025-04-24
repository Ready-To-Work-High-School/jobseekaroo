
import { useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { 
  signIn, 
  signUp, 
  signOut as authSignOut,
  signInWithGoogle,
  signInWithApple,
  verifyEmployerStatus
} from './authService';
import { useProfileManagement } from './useProfileManagement';

export function useAuthMethods(setUser: (user: User | null) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchUserProfile, updateProfile } = useProfileManagement(null);
  
  const handleSignIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user, error: signInError } = await signIn(email, password);
      
      if (signInError) {
        throw signInError;
      }
      
      setUser(user);
      
      if (user) {
        await fetchUserProfile(user.id);
      }
      
      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, fetchUserProfile]);
  
  const handleSignUp = useCallback(async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    userType: 'student' | 'employer' = 'student'
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user, error: signUpError } = await signUp({
        email, 
        password, 
        firstName, 
        lastName, 
        userType
      });
      
      if (signUpError) {
        throw signUpError;
      }
      
      if (user) {
        setUser(user);
        await fetchUserProfile(user.id);
      }
      
      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, fetchUserProfile]);
  
  const handleSignOut = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await authSignOut();
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);
  
  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user, error: googleError } = await signInWithGoogle();
      
      if (googleError) {
        throw googleError;
      }
      
      if (user) {
        setUser(user);
        await fetchUserProfile(user.id);
      }
      
      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [setUser, fetchUserProfile]);
  
  const handleAppleSignIn = useCallback(async () => {
    setIsAppleLoading(true);
    setError(null);
    
    try {
      const { user, error: appleError } = await signInWithApple();
      
      if (appleError) {
        throw appleError;
      }
      
      if (user) {
        setUser(user);
        await fetchUserProfile(user.id);
      }
      
      return user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsAppleLoading(false);
    }
  }, [setUser, fetchUserProfile]);
  
  const checkEmployerApproval = useCallback(async (userId: string) => {
    try {
      return await verifyEmployerStatus(userId);
    } catch (err: any) {
      console.error('Error checking employer approval:', err);
      return { canPostJobs: false, message: err.message || 'Failed to verify employer status' };
    }
  }, []);

  return {
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    signInWithGoogle: handleGoogleSignIn,
    signInWithApple: handleAppleSignIn,
    checkEmployerApproval,
    isLoading,
    isAppleLoading,
    error,
    updateProfile
  };
}
