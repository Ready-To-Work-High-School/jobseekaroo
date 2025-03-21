
import { supabase } from '@/lib/supabase';

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string
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
};

export const signInWithApple = async (): Promise<void> => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'apple',
  });
  
  if (error) throw error;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
