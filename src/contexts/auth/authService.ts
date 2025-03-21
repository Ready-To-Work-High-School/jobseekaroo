
import { supabase } from '@/lib/supabase';
import { getRedirectUrl } from './authUtils';

export const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signUp = async (
  email: string, 
  password: string, 
  firstName: string, 
  lastName: string
) => {
  try {
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
    return true;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signInWithApple = async () => {
  try {
    const redirectUrl = getRedirectUrl();
    console.log(`Redirecting to: ${redirectUrl}`);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: redirectUrl,
      },
    });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error signing in with Apple:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};
