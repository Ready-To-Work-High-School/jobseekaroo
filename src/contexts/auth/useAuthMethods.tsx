
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { signIn, signUp, signInWithApple, signInWithGoogle, signOut } from './authService';

export function useAuthMethods(
  navigate: NavigateFunction,
  fetchUserProfile: (userId: string) => Promise<void>
) {
  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      await signIn(email, password);
      
      // Check if there's a saved redirect URL
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);
      } else {
        navigate('/');
      }
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const handleSignUp = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      await signUp(email, password, firstName, lastName);
      navigate('/');
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      await signInWithApple();
      // Note: No need to navigate since OAuth redirects
    } catch (error) {
      throw error;
    }
  }, []);

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      await signInWithGoogle();
      // Note: No need to navigate since OAuth redirects
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleSignInWithApple,
    handleSignInWithGoogle
  };
}
