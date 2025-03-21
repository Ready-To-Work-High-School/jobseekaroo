
import { supabase } from '@/lib/supabase';
import { NavigateFunction } from 'react-router-dom';

export const signIn = async (
  email: string, 
  password: string,
  navigate: NavigateFunction
) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Ensure navigate is called only after authentication completes successfully
  navigate('/');
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string,
  navigate: NavigateFunction
) => {
  const { error } = await supabase.auth.signUp({
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
  
  // Ensure navigation happens after successful signup
  // Add a small delay to ensure state updates before navigation
  setTimeout(() => {
    navigate('/');
  }, 100);
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
