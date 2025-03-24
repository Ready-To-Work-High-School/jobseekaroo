
import { supabase } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';

export const signInWithOAuth = async (provider: Provider): Promise<void> => {
  console.log(`Initiating ${provider} sign-in`);
  
  try {
    // Store redirect info in session storage to handle auth redirects
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const currentPath = sessionStorage.getItem('redirectAfterLogin') || '/';
    
    // Always update the stored path in case user navigated before clicking login
    sessionStorage.setItem('redirectAfterLogin', currentPath);
    
    console.log(`${provider} redirect URL:`, redirectUrl);
    console.log(`Will redirect back to:`, currentPath);
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
        queryParams: provider === 'google' ? {
          access_type: 'offline',
          prompt: 'consent',
        } : undefined,
      },
    });
    
    console.log(`${provider} sign-in response:`, { data, error });
    
    if (error) {
      console.error(`${provider} sign-in error:`, error);
      throw error;
    }
  } catch (err) {
    console.error(`${provider} sign-in unexpected error:`, err);
    throw err;
  }
};
