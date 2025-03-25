
import { supabase } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';

export const signInWithOAuth = async (provider: Provider): Promise<void> => {
  console.log(`Initiating ${provider} sign-in`);
  
  try {
    // Check connectivity before attempting to sign in
    if (!navigator.onLine) {
      throw new Error("You appear to be offline. Please check your internet connection.");
    }
    
    // Store redirect info in session storage to handle auth redirects
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const currentPath = window.location.pathname;
    
    // Always update the stored path in case user navigated before clicking login
    sessionStorage.setItem('redirectAfterLogin', currentPath);
    
    console.log(`${provider} redirect URL:`, redirectUrl);
    console.log(`Will redirect back to:`, currentPath);
    
    // Simplified provider options to avoid connection issues
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectUrl,
      },
    });
    
    console.log(`${provider} sign-in response:`, { data, error });
    
    if (error) {
      console.error(`${provider} sign-in error:`, error);
      throw error;
    }
    
    // If we have a URL, redirect the user
    if (data?.url) {
      console.log(`Redirecting to ${provider} auth URL:`, data.url);
      window.location.href = data.url;
    } else {
      console.error(`No redirect URL returned from ${provider} sign-in`);
      throw new Error(`Authentication failed: No redirect URL from ${provider}`);
    }
  } catch (err) {
    console.error(`${provider} sign-in unexpected error:`, err);
    throw err;
  }
};
