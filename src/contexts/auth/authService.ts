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
  lastName: string,
  navigate: NavigateFunction
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
  
  // If email confirmation is enabled, tell the user to check their email
  // Otherwise, sign them in directly after signup
  if (data.session) {
    // If we have a session, user was auto-signed in
    navigate('/');
  } else {
    // Otherwise, they might need to confirm their email
    // We'll still redirect them to home, and they can sign in later
    navigate('/');
  }
  
  return data;
};

export const signInWithApple = async (): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  
  if (error) throw error;
};

export const signOut = async (navigate: NavigateFunction) => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  
  // Ensure navigation happens after successful signout
  navigate('/');
};
