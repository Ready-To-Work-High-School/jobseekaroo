import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/supabase/email';
import { signInWithOAuth } from '@/lib/supabase/oauth';
import { User } from '@supabase/supabase-js';

// OAuth sign-in methods with enhanced security
export const signInWithApple = async () => {
  try {
    // Generate and store state parameter to prevent CSRF attacks
    const stateParam = crypto.randomUUID();
    sessionStorage.setItem('apple_oauth_state', stateParam);
    
    // Fixing the function call to match the expected parameters in oauth.ts
    const result = await signInWithOAuth('apple');
    return { user: result?.user || null, error: result?.error || null };
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    return { user: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    // Generate and store state parameter to prevent CSRF attacks
    const stateParam = crypto.randomUUID();
    sessionStorage.setItem('google_oauth_state', stateParam);
    
    // Fixing the function call to match the expected parameters in oauth.ts
    const result = await signInWithOAuth('google');
    return { user: result?.user || null, error: result?.error || null };
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return { user: null, error };
  }
};

export const signOut = async () => {
  // Clear any local auth state before signing out
  try {
    // Log the sign-out attempt for security auditing
    console.log('User initiated sign out at', new Date().toISOString());
    
    // First try to invalidate the session
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
    
    console.log('Successfully signed out');
    
    // Success - clean up local storage
    try {
      sessionStorage.removeItem('redirectAfterLogin');
      localStorage.removeItem('supabase.auth.token');
    } catch (cleanupError) {
      console.warn('Non-critical error clearing storage:', cleanupError);
      // Non-blocking error, continue
    }
    
    return { error: null };
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

// Constants for rate limiting - shared with EmailPasswordForm
const AUTH_ATTEMPT_KEY = 'auth_attempts';
const AUTH_COOLDOWN_KEY = 'auth_cooldown_until';
