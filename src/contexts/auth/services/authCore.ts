
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/supabase/email';
import { signInWithOAuth } from '@/lib/supabase/oauth';
import { User } from '@supabase/supabase-js';

// OAuth sign-in methods
export const signInWithApple = async () => {
  try {
    const result = await signInWithOAuth('apple');
    return { user: result?.user || null, error: result?.error || null };
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    return { user: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
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
    // First try to invalidate the session
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any stored auth data from localStorage and sessionStorage
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('redirectAfterLogin');
    sessionStorage.removeItem('csrfState');
    sessionStorage.removeItem('authSession');
    
    // Clear any session cookies by overwriting them with expired ones
    document.cookie = 'sb-access-token=; Max-Age=0; path=/; domain=' + window.location.hostname;
    document.cookie = 'sb-refresh-token=; Max-Age=0; path=/; domain=' + window.location.hostname;
    
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
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
