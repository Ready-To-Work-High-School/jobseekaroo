
import { supabase } from '@/lib/supabase';
import { AuthResponse } from '@supabase/supabase-js';

export const signIn = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  console.log('Auth service: signIn called with email:', email);
  
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  console.log('Auth service: signIn response:', response);
  
  return response;
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> => {
  console.log('Auth service: signUp called with email:', email);
  
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
  
  return response;
};

export const signInWithApple = async () => {
  console.log('Auth service: signInWithApple called');
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  
  if (error) {
    console.error('Auth service: signInWithApple error:', error);
    throw error;
  }
  
  return { success: true, data };
};

export const signOut = async () => {
  console.log('Auth service: signOut called');
  
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Auth service: signOut error:', error);
    throw error;
  }
  
  return { success: true };
};
