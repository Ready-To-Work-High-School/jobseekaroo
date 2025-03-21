
import { supabase } from '@/lib/supabase';
import { NavigateFunction } from 'react-router-dom';

export const signIn = async (
  email: string, 
  password: string,
  navigate: NavigateFunction
) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Ensure navigation happens after successful authentication
  navigate('/');
  return data;
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  
  if (error) throw error;
  
  return data;
};

export const signInWithApple = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  
  if (error) throw error;
  return { success: true };
};

export const signOut = async (navigate: NavigateFunction) => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  
  // Ensure navigation happens after successful signout
  navigate('/');
  return { success: true };
};
