import { supabase } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';

export const signInWithOAuth = async (provider: Provider) => {
  console.log(`Initiating ${provider} sign-in`);
  
  try {
    // Ensure we're on HTTPS in production
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      throw new Error("Secure connection required. Please use HTTPS for authentication.");
    }
    
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
    
    // Initiate OAuth sign-in with PKCE for enhanced security
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        ...options,
        skipBrowserRedirect: false // Ensure browser redirection
      }
    });
    
    console.log(`${provider} sign-in response:`, { data, error });
    
    if (error) {
      console.error(`${provider} sign-in error:`, error);
      return { user: null, error };
    }
    
    // If we have a URL, redirect the user
    if (data?.url) {
      console.log(`Redirecting to ${provider} auth URL:`, data.url);
      window.location.href = data.url;
      return { user: null, error: null }; // Return an object to maintain consistent return type
    } else {
      console.error(`No redirect URL returned from ${provider} sign-in`);
      return { user: null, error: new Error(`Authentication failed: No redirect URL from ${provider}`) };
    }
  } catch (err) {
    console.error(`${provider} sign-in unexpected error:`, err);
    return { user: null, error: err };
  }
};

// Helper function to check if MFA is enabled for a user
export const checkMfaEnabled = async (): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;
    
    // Check if user has MFA factors enrolled
    const { data, error } = await supabase.auth.mfa.listFactors();
    
    if (error) {
      console.error('Error checking MFA status:', error);
      return false;
    }
    
    // Check if there are any verified factors in the 'totp' array
    return data.totp.some(factor => factor.status === 'verified');
  } catch (err) {
    console.error('Error checking MFA status:', err);
    return false;
  }
};

// Function to enroll in MFA
export const enrollMfa = async (): Promise<{ enrollUrl: string } | null> => {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp'
    });
    
    if (error) {
      console.error('MFA enrollment error:', error);
      return null;
    }
    
    return {
      enrollUrl: data.totp.qr_code
    };
  } catch (err) {
    console.error('MFA enrollment unexpected error:', err);
    return null;
  }
};

// Function to verify MFA challenge
export const verifyMfa = async (code: string, factorId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code
    });
    
    if (error) {
      console.error('MFA verification error:', error);
      return false;
    }
    
    // The API returns a session object, so we consider this successful if there's no error
    return !error && !!data;
  } catch (err) {
    console.error('MFA verification unexpected error:', err);
    return false;
  }
};

// Function to unenroll from MFA
export const unenrollMfa = async (factorId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.mfa.unenroll({
      factorId
    });
    
    if (error) {
      console.error('MFA unenrollment error:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('MFA unenrollment unexpected error:', err);
    return false;
  }
};
