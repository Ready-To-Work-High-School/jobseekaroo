
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/supabase/email';
import { signInWithOAuth } from '@/lib/supabase/oauth';
import { encryptData } from '@/lib/supabase/encryption';

// Maximum failed login attempts before temporary lockout
const MAX_FAILED_ATTEMPTS = 5;
// Lockout duration in milliseconds (15 minutes)
const LOCKOUT_DURATION = 15 * 60 * 1000;

// Track failed login attempts
const failedAttempts: Record<string, { count: number; lastAttempt: number; ipAddress?: string }> = {};

// Rate limiting - track request counts per IP
const rateLimiter: Record<string, { count: number; resetTime: number }> = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX = 20; // Max 20 requests per minute

/**
 * Apply rate limiting based on IP address
 * @param ipAddress User's IP address
 * @returns Boolean indicating if request should be allowed
 */
const checkRateLimit = (ipAddress: string): boolean => {
  const now = Date.now();
  
  if (!rateLimiter[ipAddress]) {
    rateLimiter[ipAddress] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return true;
  }
  
  if (now > rateLimiter[ipAddress].resetTime) {
    // Reset window
    rateLimiter[ipAddress] = { count: 1, resetTime: now + RATE_LIMIT_WINDOW };
    return true;
  }
  
  // Increment count
  rateLimiter[ipAddress].count += 1;
  
  // Check if over limit
  return rateLimiter[ipAddress].count <= RATE_LIMIT_MAX;
};

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
  const userAttempts = failedAttempts[email] || { count: 0, lastAttempt: 0 };
  const currentTime = Date.now();
  
  if (userAttempts.count >= MAX_FAILED_ATTEMPTS) {
    const timeSinceLast = currentTime - userAttempts.lastAttempt;
    if (timeSinceLast < LOCKOUT_DURATION) {
      const minutesLeft = Math.ceil((LOCKOUT_DURATION - timeSinceLast) / 60000);
      throw new Error(`Too many failed login attempts. Please try again in ${minutesLeft} minutes.`);
    } else {
      // Reset counter if lockout period has passed
      userAttempts.count = 0;
    }
  }
  
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // Track failed attempt with IP if available
      userAttempts.count += 1;
      userAttempts.lastAttempt = currentTime;
      if (ipAddress) {
        userAttempts.ipAddress = ipAddress;
      }
      failedAttempts[email] = userAttempts;
      
      throw error;
    }
    
    // Reset failed attempts on successful login
    delete failedAttempts[email];
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
  
  // Validate password strength (additional check beyond form validation)
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter, one lowercase letter, and one number");
  }
  
  // Additional security check - prevent common passwords
  const commonPasswords = ['password', 'password123', '123456', 'qwerty', 'letmein'];
  if (commonPasswords.includes(password.toLowerCase())) {
    throw new Error("Password is too common. Please choose a stronger password");
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
      // Use encryption for sensitive data being stored
      const sensitiveUserData = JSON.stringify({
        name: `${firstName} ${lastName}`,
        signup_date: new Date().toISOString(),
        source: 'web_signup'
      });
      
      // Store encrypted signup metadata for audit purposes
      if (data.user.id) {
        try {
          const encryptedData = await encryptData(sensitiveUserData);
          // Fix: Use an existing column from the profiles table instead of 'signup_metadata_encrypted'
          await supabase.from('profiles').update({
            resume_data_encrypted: encryptedData
          }).eq('id', data.user.id);
        } catch (encryptError) {
          console.error('Failed to encrypt signup metadata:', encryptError);
          // Non-blocking error, continue with signup
        }
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

// OAuth sign-in methods
export const signInWithApple = async (): Promise<void> => {
  await signInWithOAuth('apple');
};

export const signInWithGoogle = async (): Promise<void> => {
  await signInWithOAuth('google');
};

export const signOut = async () => {
  // Clear any local auth state before signing out
  try {
    // First try to invalidate the session
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Clear any stored auth data from localStorage and sessionStorage
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('redirectAfterLogin');
    sessionStorage.removeItem('csrfState');
    sessionStorage.removeItem('authSession');
    
    // Clear any session cookies by overwriting them with expired ones
    document.cookie = 'sb-access-token=; Max-Age=0; path=/; domain=' + window.location.hostname;
    document.cookie = 'sb-refresh-token=; Max-Age=0; path=/; domain=' + window.location.hostname;
    
    // Perform a security audit log
    try {
      await supabase.functions.invoke('audit-log', {
        body: { 
          action: 'user_logout',
          metadata: { timestamp: new Date().toISOString() }
        }
      });
    } catch (auditError) {
      console.error('Error logging audit event:', auditError);
      // Non-blocking error
    }
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
