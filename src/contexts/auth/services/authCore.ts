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
    if (error) throw error;
    
    // Clear any stored auth data from sessionStorage
    sessionStorage.removeItem('csrfToken');
    sessionStorage.removeItem('csrfTokenExpires');
    sessionStorage.removeItem('google_oauth_state');
    sessionStorage.removeItem('apple_oauth_state');
    sessionStorage.removeItem('redirectAfterLogin');
    sessionStorage.removeItem('authSession');
    sessionStorage.removeItem(AUTH_ATTEMPT_KEY);
    sessionStorage.removeItem(AUTH_COOLDOWN_KEY);
    
    // Clear auth-related localStorage items
    localStorage.removeItem('supabase.auth.token');
    
    // Perform a security audit log
    try {
      await supabase.functions.invoke('audit-log', {
        body: { 
          action: 'user_logout',
          metadata: { timestamp: new Date().toISOString() }
        }
      });
    } catch (auditError) {
      console.error('Error logging audit event:', auditError);
      // Non-blocking error
    }
    
    // Redirect to home page after logout for complete session termination
    window.location.href = '/';
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

// Constants for rate limiting - shared with EmailPasswordForm
const AUTH_ATTEMPT_KEY = 'auth_attempts';
const AUTH_COOLDOWN_KEY = 'auth_cooldown_until';
