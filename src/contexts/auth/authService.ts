
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { SignUpData } from './services/authTypes';

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export interface EmployerVerificationResult {
  canPostJobs: boolean;
  message: string;
}

// Helper to check if we're experiencing a network issue
const isNetworkError = (error: any): boolean => {
  if (!navigator.onLine) return true;
  
  const errorMsg = error?.message?.toLowerCase() || '';
  return (
    errorMsg.includes('network') ||
    errorMsg.includes('failed to fetch') ||
    errorMsg.includes('connection') ||
    errorMsg.includes('internet') ||
    errorMsg.includes('offline') ||
    errorMsg.includes('unreachable') ||
    errorMsg.includes('timeout')
  );
};

// Helper to log and standardize network errors
const handleNetworkError = (operation: string, error: any): Error => {
  const isOffline = !navigator.onLine;
  const message = isOffline
    ? 'You are offline. Please check your internet connection and try again.'
    : 'Network error. There might be an issue with your connection or our servers. Please try again.';
  
  console.error(`Network error during ${operation}:`, error);
  return new Error(message);
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  if (!navigator.onLine) {
    return { 
      user: null, 
      error: new Error('You are offline. Please check your internet connection and try again.') 
    };
  }
  
  try {
    console.log('Attempting sign in for:', email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error('Supabase sign in error:', error);
      return { user: null, error: new Error(error.message) };
    }
    
    console.log('Sign in successful:', data.user?.id);
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    
    if (isNetworkError(error)) {
      return { user: null, error: handleNetworkError('sign in', error) };
    }
    
    return { user: null, error: new Error(error.message || 'Unknown error during sign in') };
  }
};

export const signUp = async (signUpData: SignUpData): Promise<AuthResponse> => {
  if (!navigator.onLine) {
    return { 
      user: null, 
      error: new Error('You are offline. Please check your internet connection and try again.') 
    };
  }
  
  const { email, password, firstName, lastName, userType } = signUpData;
  
  try {
    console.log('Attempting sign up for:', email);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType || 'student'
        }
      }
    });
    
    if (error) {
      console.error('Supabase sign up error:', error);
      return { user: null, error: new Error(error.message) };
    }
    
    console.log('Sign up successful, user created:', data.user?.id);
    
    // Create a profile record for the new user
    if (data.user) {
      try {
        // First check if profile already exists to avoid multiple rows error
        const { data: existingProfile, error: checkError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle();
          
        if (checkError) {
          // Only log an error if it's not a "no rows" result (which is expected for new users)
          if (!checkError.message.includes('No rows')) {
            console.error('Error checking for existing profile:', checkError);
          }
        }
        
        // Only insert a new profile if one doesn't exist
        if (!existingProfile) {
          console.log('Creating profile for new user:', data.user.id);
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              first_name: firstName,
              last_name: lastName,
              user_type: userType || 'student',
              email: email
            });
          
          if (profileError) {
            console.error('Error creating profile:', profileError);
            // Don't fail the signup if profile creation has issues
          } else {
            console.log('Profile created successfully');
          }
        } else {
          console.log('Profile already exists for user, skipping creation');
        }
      } catch (profileErr: any) {
        console.error('Profile creation error:', profileErr);
        // Don't fail the signup if profile creation has issues
      }
    }
    
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    
    if (isNetworkError(error)) {
      return { user: null, error: handleNetworkError('sign up', error) };
    }
    
    return { user: null, error: new Error(error.message || 'Unknown error during sign up') };
  }
};

export const signOut = async (): Promise<{ error: Error | null }> => {
  if (!navigator.onLine) {
    return { error: new Error('You are offline. Please check your internet connection and try again.') };
  }
  
  try {
    console.log('Attempting sign out');
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Supabase sign out error:', error);
      return { error: new Error(error.message) };
    }
    
    console.log('Sign out successful');
    return { error: null };
  } catch (error: any) {
    console.error('Sign out error:', error);
    
    if (isNetworkError(error)) {
      return { error: handleNetworkError('sign out', error) };
    }
    
    return { error: new Error(error.message || 'Unknown error during sign out') };
  }
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  if (!navigator.onLine) {
    return { 
      user: null, 
      error: new Error('You are offline. Please check your internet connection and try again.') 
    };
  }
  
  try {
    console.log('Attempting Google sign-in');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    // OAuth redirects, so we won't actually reach this point in normal flow
    if (error) {
      console.error('Google OAuth error:', error);
      return { user: null, error: new Error(error.message) };
    }
    
    console.log('OAuth sign-in initiated successfully');
    // The OAuth sign-in just returns a URL, not a user directly
    return { user: null, error: null };
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    
    if (isNetworkError(error)) {
      return { user: null, error: handleNetworkError('Google sign in', error) };
    }
    
    return { user: null, error: new Error(error.message || 'Unknown error during Google sign in') };
  }
};

export const signInWithApple = async (): Promise<AuthResponse> => {
  if (!navigator.onLine) {
    return { 
      user: null, 
      error: new Error('You are offline. Please check your internet connection and try again.') 
    };
  }
  
  try {
    console.log('Attempting Apple sign-in');
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    // OAuth redirects, so we won't actually reach this point in normal flow
    if (error) {
      console.error('Apple OAuth error:', error);
      return { user: null, error: new Error(error.message) };
    }
    
    console.log('OAuth sign-in initiated successfully');
    // The OAuth sign-in just returns a URL, not a user directly
    return { user: null, error: null };
  } catch (error: any) {
    console.error('Apple sign-in error:', error);
    
    if (isNetworkError(error)) {
      return { user: null, error: handleNetworkError('Apple sign in', error) };
    }
    
    return { user: null, error: new Error(error.message || 'Unknown error during Apple sign in') };
  }
};

// Add the employer verification function
export const verifyEmployerStatus = async (userId: string): Promise<EmployerVerificationResult> => {
  if (!navigator.onLine) {
    return {
      canPostJobs: false,
      message: 'Network offline. Please check your internet connection.'
    };
  }
  
  try {
    console.log('Verifying employer status for user:', userId);
    const { data, error } = await supabase
      .from('profiles')
      .select('employer_verification_status')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking employer status:', error);
      
      if (error.message.includes('multiple') || error.message.includes('rows')) {
        return {
          canPostJobs: false,
          message: 'Account verification issue detected. Please contact support.'
        };
      }
      
      throw error;
    }
    
    const status = data?.employer_verification_status;
    const canPostJobs = status === 'approved';
    
    return {
      canPostJobs,
      message: canPostJobs 
        ? 'Account approved for job posting' 
        : status === 'pending' 
          ? 'Your account verification is pending approval' 
          : 'Your account has not been approved for job posting'
    };
  } catch (error: any) {
    console.error('Error checking employer status:', error);
    
    if (isNetworkError(error)) {
      return {
        canPostJobs: false,
        message: 'Network error. Please check your internet connection and try again.'
      };
    }
    
    return {
      canPostJobs: false,
      message: 'Unable to verify employer status'
    };
  }
};
