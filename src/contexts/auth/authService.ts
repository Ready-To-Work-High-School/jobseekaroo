
import { supabase } from '@/lib/supabase';
import { sendEmail } from '@/lib/supabase/email';
import { signInWithOAuth } from '@/lib/supabase/oauth';

// Maximum failed login attempts before temporary lockout
const MAX_FAILED_ATTEMPTS = 5;
// Lockout duration in milliseconds (15 minutes)
const LOCKOUT_DURATION = 15 * 60 * 1000;

// Track failed login attempts
const failedAttempts: Record<string, { count: number; lastAttempt: number }> = {};

export const signIn = async (email: string, password: string) => {
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
      // Track failed attempt
      userAttempts.count += 1;
      userAttempts.lastAttempt = currentTime;
      failedAttempts[email] = userAttempts;
      
      throw error;
    }
    
    // Reset failed attempts on successful login
    delete failedAttempts[email];
  } catch (error) {
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
  lastName: string
) => {
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
    
    // Clear any stored auth data from localStorage
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('redirectAfterLogin');
    
    // Clear any session cookies by overwriting them with expired ones
    document.cookie = 'sb-access-token=; Max-Age=0; path=/; domain=' + window.location.hostname;
    document.cookie = 'sb-refresh-token=; Max-Age=0; path=/; domain=' + window.location.hostname;
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
