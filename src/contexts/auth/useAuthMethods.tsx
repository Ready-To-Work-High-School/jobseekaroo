
import { useCallback } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { signIn, signUp, signInWithApple, signInWithGoogle, signOut } from './authService';

/**
 * Generates a cryptographically secure CSRF token
 * @returns Secure random token string
 */
function generateCSRFToken(): string {
  // Generate a crypto-secure random value
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Validates CSRF token to protect against CSRF attacks
 * @param token Token to validate
 * @returns Boolean indicating if token is valid
 */
function validateCSRFToken(token: string): boolean {
  const storedToken = localStorage.getItem('csrfToken');
  const sessionToken = sessionStorage.getItem('csrfState');
  const tokenExpiration = parseInt(localStorage.getItem('csrfTokenExpires') || '0');
  
  // Check if token is valid and not expired
  return (
    token === storedToken && 
    token === sessionToken && 
    Date.now() < tokenExpiration
  );
}

export function useAuthMethods(
  navigate: NavigateFunction,
  fetchUserProfile: (userId: string) => Promise<void>
) {
  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      // Get client IP for security monitoring
      const clientIP = localStorage.getItem('lastClientIP');
      
      await signIn(email, password, clientIP);
      
      // Check if there's a saved redirect URL
      const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectUrl);
      } else {
        navigate('/');
      }
      
      // Record successful login in audit log
      try {
        await supabase.functions.invoke('audit-log', {
          body: { 
            action: 'user_login',
            metadata: { method: 'email', timestamp: new Date().toISOString() }
          }
        });
      } catch (auditError) {
        console.error('Error logging audit event:', auditError);
        // Non-blocking error
      }
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const handleSignUp = useCallback(async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // Get client IP for security monitoring
      const clientIP = localStorage.getItem('lastClientIP');
      
      await signUp(email, password, firstName, lastName, clientIP);
      
      // Generate new CSRF token after signup
      const newToken = generateCSRFToken();
      localStorage.setItem('csrfToken', newToken);
      sessionStorage.setItem('csrfState', newToken);
      const newExpiration = Date.now() + (10 * 60 * 1000);
      localStorage.setItem('csrfTokenExpires', newExpiration.toString());
      
      navigate('/');
      
      // Record successful signup in audit log
      try {
        await supabase.functions.invoke('audit-log', {
          body: { 
            action: 'user_signup',
            metadata: { method: 'email', timestamp: new Date().toISOString() }
          }
        });
      } catch (auditError) {
        console.error('Error logging audit event:', auditError);
        // Non-blocking error
      }
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      
      // Clear any CSRF tokens on logout
      localStorage.removeItem('csrfToken');
      localStorage.removeItem('csrfTokenExpires');
      sessionStorage.removeItem('csrfState');
      
      navigate('/');
    } catch (error) {
      throw error;
    }
  }, [navigate]);

  const handleSignInWithApple = useCallback(async () => {
    try {
      // Generate state parameter for OAuth to prevent CSRF
      const stateParam = generateCSRFToken();
      sessionStorage.setItem('oauthState', stateParam);
      
      await signInWithApple();
      // Note: No need to navigate since OAuth redirects
    } catch (error) {
      throw error;
    }
  }, []);

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      // Generate state parameter for OAuth to prevent CSRF
      const stateParam = generateCSRFToken();
      sessionStorage.setItem('oauthState', stateParam);
      
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
    handleSignInWithGoogle,
    validateCSRFToken
  };
}
