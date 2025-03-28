
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
    
    // Configure options based on provider for better error handling
    const options = {
      redirectTo: redirectUrl,
      queryParams: {}
    };
    
    // If provider is apple, add enhanced logging and specific configuration
    if (provider === 'apple') {
      options.queryParams = {
        scope: 'name email'
      };
      
      // Enhanced debugging information for Apple Sign-In
      console.log("Domain being used for Apple sign-in:", window.location.hostname);
      console.log("Full redirect URL for Apple:", redirectUrl);
      console.log("Browser user agent:", navigator.userAgent);
      console.log("Protocol:", window.location.protocol);
      
      // Log configured Apple domain in Supabase for comparison
      // This can help debug domain mismatch issues
      try {
        const configData = await fetch('/api/get-supabase-config')
          .catch(() => null);
        if (configData) {
          const config = await configData.json().catch(() => ({}));
          console.log("Configured domains in Supabase:", config.domains || "Unknown");
        }
      } catch (e) {
        console.log("Could not fetch Supabase config for comparison");
      }
    }
    
    // Initiate OAuth sign-in
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options
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
