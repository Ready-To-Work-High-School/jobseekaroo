
import { signInWithOAuth } from '@/lib/supabase/oauth';
import { AuthResponse } from './authTypes';

export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const result = await signInWithOAuth('google');
    return { user: result?.user || null, error: result?.error || null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export const signInWithApple = async (): Promise<AuthResponse> => {
  try {
    const result = await signInWithOAuth('apple');
    return { user: result?.user || null, error: result?.error || null };
  } catch (error: any) {
    return { user: null, error };
  }
};
