import { supabase } from '@/lib/supabase';
import { 
  checkRateLimit 
} from './services/rateLimit';
import {
  checkAccountLockout,
  trackFailedLoginAttempt,
  resetFailedLoginAttempts,
  validatePasswordStrength,
  storeEncryptedUserMetadata
} from './services/security';
import {
  signInWithApple as authSignInWithApple,
  signInWithGoogle as authSignInWithGoogle,
  signOut
} from './services/authCore';
import { 
  logAuthEvent,
  logSecurityEvent
} from './services/auditService';
import { checkEmployerVerification } from '@/lib/supabase/encryption/file-security';

export const signIn = async (email: string, password: string, ipAddress?: string) => {
  if (ipAddress && !checkRateLimit(ipAddress)) {
    await logSecurityEvent('rate_limit_exceeded', undefined, {
      ip_address: ipAddress,
      action: 'signin',
      email: email
    });
    
    throw new Error("Too many requests. Please try again later.");
  }

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  email = email.trim().toLowerCase();
  
  const { isLocked, minutesLeft, suspiciousActivity } = checkAccountLockout(email);
  if (isLocked && minutesLeft) {
    await logSecurityEvent('account_lockout', undefined, {
      email: email,
      minutes_left: minutesLeft,
      suspicious_activity: suspiciousActivity
    });
    
    throw new Error(`Account temporarily locked. Please try again in ${minutesLeft} minutes.`);
  }

  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      trackFailedLoginAttempt(email, ipAddress);
      await logSecurityEvent('login_failure', undefined, {
        reason: error.message,
        email: email,
        ip_address: ipAddress
      });
      
      let enhancedErrorMessage = error.message;
      
      if (error.message.includes("Invalid login credentials")) {
        enhancedErrorMessage = "Incorrect email or password. Please note that multiple failed attempts will temporarily lock your account.";
      } else if (error.message.includes("Email not confirmed")) {
        enhancedErrorMessage = "Please verify your email address before signing in. Check your inbox for a confirmation link.";
      } else if (error.message.includes("User not found")) {
        enhancedErrorMessage = "No account found with this email. Please check your email or create a new account.";
      }
      
      return { user: null, error: { ...error, message: enhancedErrorMessage } };
    }
    
    resetFailedLoginAttempts(email);
    
    await logAuthEvent('user_login', {
      user_id: data.user?.id,
      auth_provider: 'email',
      ip_address: ipAddress
    });
    
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error(`Failed login attempt for ${email}:`, error);
    return { 
      user: null, 
      error: new Error("An unexpected error occurred. Please try again later.") 
    };
  }
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string,
  userType: 'student' | 'employer' = 'student',
  ipAddress?: string
) => {
  if (ipAddress && !checkRateLimit(ipAddress)) {
    await logSecurityEvent('rate_limit_exceeded', undefined, {
      ip_address: ipAddress,
      action: 'signup'
    });
    
    throw new Error("Too many requests. Please try again later.");
  }

  if (!email || !password || !firstName || !lastName) {
    throw new Error("All fields are required");
  }
  
  email = email.trim().toLowerCase();
  firstName = firstName.trim();
  lastName = lastName.trim();
  
  const { isValid, errorMessage } = validatePasswordStrength(password);
  if (!isValid) {
    throw new Error(errorMessage);
  }
  
  const requiresVerification = userType === 'employer';

  try {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
          employer_verification_status: requiresVerification ? 'pending' : null
        },
      },
    });
    
    if (error) {
      await logSecurityEvent('signup_failure', undefined, {
        reason: error.message,
        email: email,
        user_type: userType,
        ip_address: ipAddress
      });
      
      return { user: null, error };
    }
    
    if (data?.user) {
      try {
        if (data.user.id) {
          await storeEncryptedUserMetadata(data.user.id, {
            name: `${firstName} ${lastName}`,
            user_type: userType,
            signup_date: new Date().toISOString(),
            source: 'web_signup',
            ip_address: ipAddress
          });
        }
        
        await logAuthEvent('user_signup', {
          user_id: data.user.id,
          user_type: userType,
          requires_verification: requiresVerification,
          ip_address: ipAddress
        });
      } catch (metadataError) {
        console.error('Failed to store user metadata:', metadataError);
      }
    }
    
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Registration error:', error);
    return { user: null, error };
  }
};

export const verifyEmployerStatus = async (userId: string): Promise<{
  canPostJobs: boolean;
  message: string;
}> => {
  try {
    const verificationStatus = await checkEmployerVerification(userId);
    
    return {
      canPostJobs: verificationStatus.isVerified,
      message: verificationStatus.message || 'Unknown verification status'
    };
  } catch (error) {
    console.error('Error verifying employer status:', error);
    return {
      canPostJobs: false,
      message: 'Error checking verification status'
    };
  }
};

export const signInWithApple = async () => {
  try {
    const result = await authSignInWithApple();
    return { user: result?.user || null, error: result?.error || null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await authSignInWithGoogle();
    return { user: result?.user || null, error: result?.error || null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export { signOut };
