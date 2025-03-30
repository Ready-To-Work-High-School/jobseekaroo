
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/supabase/email';
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
  signInWithApple,
  signInWithGoogle,
  signOut
} from './services/authCore';
import { logAuthEvent } from './services/auditService';

export const signIn = async (email: string, password: string, ipAddress?: string) => {
  // Apply rate limiting if IP is provided
  if (ipAddress && !checkRateLimit(ipAddress)) {
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
    throw new Error(`Too many failed login attempts. Please try again in ${minutesLeft} minutes.`);
  }
  
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // Track failed attempt with IP if available
      trackFailedLoginAttempt(email, ipAddress);
      throw error;
    }
    
    // Reset failed attempts on successful login
    resetFailedLoginAttempts(email);
  } catch (error) {
    // Log the attempt for audit purposes, but don't expose specifics to client
    console.error(`Failed login attempt for ${email} from IP ${ipAddress || 'unknown'}`);
    
    // Don't expose specific errors to attacker
    if (error.message.includes("Invalid login credentials")) {
      throw new Error("Invalid email or password");
    }
    throw error;
  }
};

export const signUp = async (
  email: string, 
  password: string,
  firstName: string,
  lastName: string,
  ipAddress?: string
) => {
  // Apply rate limiting if IP is provided
  if (ipAddress && !checkRateLimit(ipAddress)) {
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
  
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });
  
  if (error) throw error;
  
  // If email confirmation is required, send a welcome email
  if (data?.user && !data.user.confirmed_at) {
    try {
      // Store encrypted signup metadata for audit purposes
      if (data.user.id) {
        await storeEncryptedUserMetadata(data.user.id, {
          name: `${firstName} ${lastName}`,
          signup_date: new Date().toISOString(),
          source: 'web_signup'
        });
      }
      
      await sendEmail({
        to: email,
        subject: 'Welcome to Career Platform - Please Confirm Your Email',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to Career Platform, ${firstName}!</h2>
            <p>Thank you for signing up. To complete your registration, please confirm your email address.</p>
            <p>A confirmation email has been sent to you by our system. Please click the link in that email to verify your account.</p>
            <p>If you don't see the email, please check your spam folder.</p>
            <p>Thank you,<br/>The Career Platform Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // We don't throw here as the signup was successful
    }
  }
};

// Export the OAuth methods
export { signInWithApple, signInWithGoogle, signOut };
