
import { supabase } from '@/lib/supabase';
import { AuthResponse } from '@supabase/supabase-js';

export const signIn = async (
  email: string, 
  password: string
): Promise<AuthResponse> => {
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (response.error) throw response.error;
  
  return response;
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
): Promise<AuthResponse> => {
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
  
  if (response.error) throw response.error;
  
  return response;
};

export const signInWithApple = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  
  if (error) throw error;
  return { success: true };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  
  return { success: true };
};
