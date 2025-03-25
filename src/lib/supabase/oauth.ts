
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
    
    // Add browser and environment diagnostic info
    console.log('Network info:', {
      online: navigator.onLine,
      userAgent: navigator.userAgent,
      secure: window.location.protocol === 'https:',
      hostname: window.location.hostname,
      googleConfigured: true,
      clientId: '435056018915-s4ut4m4sf1muj60eagpnoqatnh4kvl8u.apps.googleusercontent.com'
    });
    
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
