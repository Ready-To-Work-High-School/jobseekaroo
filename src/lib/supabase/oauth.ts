
import { supabase } from '@/lib/supabase';
import { Provider } from '@supabase/supabase-js';

// OAuth sign-in function
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

// MFA functions that were missing
export const checkMfaEnabled = async (userId: string) => {
  try {
    const { data, error } = await supabase.auth.mfa.listFactors();
    
    if (error) throw error;
    
    // Check if there are any verified factors
    return data.totp.some(factor => factor.status === 'verified');
  } catch (err) {
    console.error('Error checking MFA status:', err);
    return false;
  }
};

export const enrollMfa = async () => {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
    });
    
    if (error) throw error;
    
    return {
      factorId: data.id,
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      enrollUrl: data.totp.uri
    };
  } catch (err) {
    console.error('Error enrolling in MFA:', err);
    return null;
  }
};

export const verifyMfa = async (code: string, factorId: string) => {
  try {
    // Fix: Remove challengeType as it's not in the MFAChallengeAndVerifyParams type
    // Create a challenge first
    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
      factorId
    });
    
    if (challengeError) throw challengeError;
    
    // Then verify with the challenge ID
    const { data, error } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code
    });
    
    if (error) throw error;
    
    // Fix: The response doesn't have a success property directly
    return true; // If we get here without errors, verification was successful
  } catch (err) {
    console.error('Error verifying MFA:', err);
    return false;
  }
};

export const unenrollMfa = async (factorId: string) => {
  try {
    const { data, error } = await supabase.auth.mfa.unenroll({ factorId });
    
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error unenrolling MFA:', err);
    return false;
  }
};

// Optional helper to check network status for OAuth operations
export const checkNetworkStatus = () => {
  return navigator.onLine;
};
