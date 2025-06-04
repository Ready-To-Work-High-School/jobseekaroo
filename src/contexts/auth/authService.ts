
import { supabase } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'student' | 'employer';
}

export interface EmployerVerificationResult {
  canPostJobs: boolean;
  message: string;
}

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
      return { user: null, error };
    }
    
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error };
  }
};

export const signUp = async ({ email, password, firstName, lastName, userType }: SignUpData) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Sign up error:', error);
      return { user: null, error };
    }
    
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Sign out error:', error);
      return { error };
    }
    
    // Clear local storage
    localStorage.removeItem('supabase.auth.token');
    sessionStorage.removeItem('redirectAfterLogin');
    
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Google sign in error:', error);
      return { user: null, error };
    }
    
    // For OAuth, user will be null initially as redirect happens
    return { user: null, error: null };
  } catch (error) {
    console.error('Google sign in error:', error);
    return { user: null, error };
  }
};

export const signInWithApple = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Apple sign in error:', error);
      return { user: null, error };
    }
    
    // For OAuth, user will be null initially as redirect happens
    return { user: null, error: null };
  } catch (error) {
    console.error('Apple sign in error:', error);
    return { user: null, error };
  }
};

export const verifyEmployerStatus = async (userId: string): Promise<EmployerVerificationResult> => {
  try {
    // This would typically check the user's employer verification status
    // For now, return a basic response
    return { canPostJobs: false, message: 'Employer verification required' };
  } catch (error) {
    console.error('Error verifying employer status:', error);
    return { canPostJobs: false, message: 'Failed to verify employer status' };
  }
};
