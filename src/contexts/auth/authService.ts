
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { SignUpData } from './services/authTypes';

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) return { user: null, error: new Error(error.message) };
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: new Error(error.message || 'Unknown error during sign in') };
  }
};

export const signUp = async (signUpData: SignUpData): Promise<AuthResponse> => {
  const { email, password, firstName, lastName, userType } = signUpData;
  
  try {
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
    
    if (error) return { user: null, error: new Error(error.message) };
    
    // Create a profile record for the new user
    if (data.user) {
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
        // Continue despite profile creation error
      }
    }
    
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: new Error(error.message || 'Unknown error during sign up') };
  }
};

export const signOut = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) return { error: new Error(error.message) };
    return { error: null };
  } catch (error: any) {
    return { error: new Error(error.message || 'Unknown error during sign out') };
  }
};

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    // OAuth redirects, so we won't actually reach this point in normal flow
    if (error) return { user: null, error: new Error(error.message) };
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: new Error(error.message || 'Unknown error during Google sign in') };
  }
};

export const signInWithApple = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });
    
    // OAuth redirects, so we won't actually reach this point in normal flow
    if (error) return { user: null, error: new Error(error.message) };
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error: new Error(error.message || 'Unknown error during Apple sign in') };
  }
};
