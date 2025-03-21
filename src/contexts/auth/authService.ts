
import { supabase } from '@/lib/supabase';
import { AuthResponse } from '@supabase/supabase-js';

export const signIn = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  console.log('Auth service: signIn called with email:', email);
  
  try {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    console.log('Auth service: signIn response:', response);
    
    if (response.error) {
      console.error('Auth service: signIn error:', response.error);
      throw response.error;
    }
    
    return response;
  } catch (error) {
    console.error('Auth service: signIn caught error:', error);
    throw error;
  }
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> => {
  console.log('Auth service: signUp called with email:', email);
  
  try {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    
    console.log('Auth service: signUp response:', response);
    
    if (response.error) {
      console.error('Auth service: signUp error:', response.error);
      throw response.error;
    }
    
    return response;
  } catch (error) {
    console.error('Auth service: signUp caught error:', error);
    throw error;
  }
};

export const signInWithApple = async () => {
  console.log('Auth service: signInWithApple called');
  
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });
    
    if (error) {
      console.error('Auth service: signInWithApple error:', error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Auth service: signInWithApple caught error:', error);
    throw error;
  }
};

export const signOut = async () => {
  console.log('Auth service: signOut called');
  
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Auth service: signOut error:', error);
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Auth service: signOut caught error:', error);
    throw error;
  }
};
