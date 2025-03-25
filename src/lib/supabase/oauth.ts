
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
    const currentPath = sessionStorage.getItem('redirectAfterLogin') || '/';
    
    // Always update the stored path in case user navigated before clicking login
    sessionStorage.setItem('redirectAfterLogin', currentPath);
    
    console.log(`${provider} redirect URL:`, redirectUrl);
    console.log(`Will redirect back to:`, currentPath);
    
    // Add browser and environment diagnostic info
    console.log('Network info:', {
      online: navigator.onLine,
      userAgent: navigator.userAgent,
      secure: window.location.protocol === 'https:',
      hostname: window.location.hostname
    });
    
    // Try a simple fetch to Google to test connectivity before OAuth attempt
    try {
      await fetch('https://accounts.google.com/gsi/status', { 
        method: 'HEAD',
        mode: 'no-cors', // This allows us to check connectivity without CORS issues
        cache: 'no-cache'
      });
      console.log(`Google connectivity test completed`);
    } catch (connErr) {
      console.error('Connection to Google failed:', connErr);
      // Continue anyway since the no-cors mode might not give us a proper response
    }
    
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
    
    // If we have a URL, redirect the user (this typically happens automatically)
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
