
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

// Modified to correctly return user object with proper typing
export const signIn = async (email: string, password: string, ipAddress?: string) => {
  // Apply rate limiting if IP is provided
  if (ipAddress && !checkRateLimit(ipAddress)) {
    // Log this security event
    await logSecurityEvent('rate_limit_exceeded', undefined, {
      ip_address: ipAddress,
      action: 'signin',
      email: email // We can include this as it's a security event
    });
    
    throw new Error("Too many requests. Please try again later.");
  }
  
  // Input validation
  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  
  // Basic input sanitization
  email = email.trim().toLowerCase();
  
  // Check for account lockout
  const { isLocked, minutesLeft } = checkAccountLockout(email);
  if (isLocked && minutesLeft) {
    // Log this security event
    await logSecurityEvent('account_lockout', undefined, {
      email: email,
      minutes_left: minutesLeft
    });
    
    throw new Error(`Too many failed login attempts. Please try again in ${minutesLeft} minutes.`);
  }
  
  try {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // Track failed attempt with IP if available
      trackFailedLoginAttempt(email, ipAddress);
      
      // Log the failed attempt for security purposes
      await logSecurityEvent('login_failure', undefined, {
        reason: error.message,
        email: email,
        ip_address: ipAddress
      });
      
      return { user: null, error };
    }
    
    // Reset failed attempts on successful login
    resetFailedLoginAttempts(email);
    
    // Log successful login
    await logAuthEvent('user_login', {
      user_id: data.user?.id,
      auth_provider: 'email',
      ip_address: ipAddress
    });
    
    return { user: data.user, error: null };
  } catch (error: any) {
    // Log the attempt for audit purposes, but don't expose specifics to client
    console.error(`Failed login attempt for ${email} from IP ${ipAddress || 'unknown'}`);
    
    // Don't expose specific errors to attacker
    if (error.message.includes("Invalid login credentials")) {
      return { user: null, error: new Error("Invalid email or password") };
    }
    return { user: null, error };
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
  // Apply rate limiting if IP is provided
  if (ipAddress && !checkRateLimit(ipAddress)) {
    // Log this security event
    await logSecurityEvent('rate_limit_exceeded', undefined, {
      ip_address: ipAddress,
      action: 'signup'
    });
    
    throw new Error("Too many requests. Please try again later.");
  }

  // Input validation
  if (!email || !password || !firstName || !lastName) {
    throw new Error("All fields are required");
  }
  
  // Sanitize inputs
  email = email.trim().toLowerCase();
  firstName = firstName.trim();
  lastName = lastName.trim();
  
  // Validate password strength
  const { isValid, errorMessage } = validatePasswordStrength(password);
  if (!isValid && errorMessage) {
    throw new Error(errorMessage);
  }
  
  // Special handling for employer accounts
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
          // For employers, set initial verification status
          employer_verification_status: requiresVerification ? 'pending' : null
        },
      },
    });
    
    if (error) {
      // Log the failure
      await logSecurityEvent('signup_failure', undefined, {
        reason: error.message,
        email: email,
        user_type: userType,
        ip_address: ipAddress
      });
      
      return { user: null, error };
    }
    
    // If email confirmation is required, send a welcome email
    if (data?.user && !data.user.confirmed_at) {
      try {
        // Store encrypted signup metadata for audit purposes
        if (data.user.id) {
          await storeEncryptedUserMetadata(data.user.id, {
            name: `${firstName} ${lastName}`,
            user_type: userType,
            signup_date: new Date().toISOString(),
            source: 'web_signup',
            ip_address: ipAddress
          });
        }
        
        // Log successful signup
        await logAuthEvent('user_signup', {
          user_id: data.user.id,
          user_type: userType,
          requires_verification: requiresVerification,
          ip_address: ipAddress
        });
        
        // For employers, send admin notification about new account needing verification
        if (requiresVerification) {
          try {
            await supabase.functions.invoke('send-email', {
              body: { 
                to: 'admin@yourplatform.com', // Replace with your admin email
                subject: 'New Employer Account Requires Verification',
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>New Employer Account Pending Verification</h2>
                    <p>A new employer account has been created and requires verification:</p>
                    <ul>
                      <li><strong>Name:</strong> ${firstName} ${lastName}</li>
                      <li><strong>Email:</strong> ${email}</li>
                      <li><strong>Date:</strong> ${new Date().toISOString()}</li>
                    </ul>
                    <p>Please review this account in the admin panel.</p>
                  </div>
                `,
              }
            });
          } catch (notifyError) {
            console.error('Failed to send admin notification:', notifyError);
            // Non-blocking error
          }
        }
        
        await supabase.functions.invoke('send-email', {
          body: {
            to: email,
            subject: `Welcome to Career Platform - ${requiresVerification ? 'Employer Account Pending' : 'Please Confirm Your Email'}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to Career Platform, ${firstName}!</h2>
                <p>Thank you for signing up as a ${userType}.</p>
                ${requiresVerification 
                  ? `<p><strong>Important:</strong> Your employer account requires verification before you can post jobs. Our team will review your account within 1-2 business days.</p>` 
                  : `<p>To complete your registration, please confirm your email address.</p>
                     <p>A confirmation email has been sent to you by our system. Please click the link in that email to verify your account.</p>`
                }
                <p>If you don't see the email, please check your spam folder.</p>
                <p>Thank you,<br/>The Career Platform Team</p>
              </div>
            `,
          },
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // We don't throw here as the signup was successful
      }
    }
    
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { user: null, error };
  }
};

/**
 * Verify if an employer account is approved to post jobs
 * @param userId Employer user ID
 * @returns Promise resolving to verification status
 */
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

// Export the OAuth methods with proper return types
export const signInWithApple = async () => {
  try {
    const result = await authSignInWithApple();
    return { user: result?.user || null, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await authSignInWithGoogle();
    return { user: result?.user || null, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};

// Export the signOut method
export { signOut };
