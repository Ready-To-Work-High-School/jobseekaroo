
import { supabase } from '@/lib/supabase';
import { encryptData } from '@/lib/supabase/encryption';

// Maximum failed login attempts before temporary lockout
const MAX_FAILED_ATTEMPTS = 5;
// Lockout duration in milliseconds (15 minutes)
const LOCKOUT_DURATION = 15 * 60 * 1000;

// Track failed login attempts
const failedAttempts: Record<string, { count: number; lastAttempt: number; ipAddress?: string }> = {};

/**
 * Check for account lockout
 * @param email User's email
 * @returns Object containing lockout status and minutes left if locked
 */
export const checkAccountLockout = (email: string): { isLocked: boolean; minutesLeft?: number } => {
  const userAttempts = failedAttempts[email] || { count: 0, lastAttempt: 0 };
  const currentTime = Date.now();
  
  if (userAttempts.count >= MAX_FAILED_ATTEMPTS) {
    const timeSinceLast = currentTime - userAttempts.lastAttempt;
    if (timeSinceLast < LOCKOUT_DURATION) {
      const minutesLeft = Math.ceil((LOCKOUT_DURATION - timeSinceLast) / 60000);
      return { isLocked: true, minutesLeft };
    } else {
      // Reset counter if lockout period has passed
      userAttempts.count = 0;
      return { isLocked: false };
    }
  }
  
  return { isLocked: false };
};

/**
 * Track failed login attempt
 * @param email User's email
 * @param ipAddress Optional IP address for tracking
 */
export const trackFailedLoginAttempt = (email: string, ipAddress?: string): void => {
  const userAttempts = failedAttempts[email] || { count: 0, lastAttempt: 0 };
  userAttempts.count += 1;
  userAttempts.lastAttempt = Date.now();
  if (ipAddress) {
    userAttempts.ipAddress = ipAddress;
  }
  failedAttempts[email] = userAttempts;
};

/**
 * Reset failed login attempts for a user
 * @param email User's email
 */
export const resetFailedLoginAttempts = (email: string): void => {
  delete failedAttempts[email];
};

/**
 * Validate password strength
 * @param password Password to validate
 * @returns Object containing validation result and error message
 */
export const validatePasswordStrength = (password: string): { isValid: boolean; errorMessage?: string } => {
  if (password.length < 8) {
    return { isValid: false, errorMessage: "Password must be at least 8 characters" };
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { 
      isValid: false, 
      errorMessage: "Password must contain at least one uppercase letter, one lowercase letter, and one number" 
    };
  }
  
  // Check against common passwords
  const commonPasswords = ['password', 'password123', '123456', 'qwerty', 'letmein'];
  if (commonPasswords.includes(password.toLowerCase())) {
    return { isValid: false, errorMessage: "Password is too common. Please choose a stronger password" };
  }
  
  return { isValid: true };
};

/**
 * Store encrypted user metadata
 * @param userId User ID
 * @param data Data to encrypt and store
 */
export const storeEncryptedUserMetadata = async (userId: string, data: any): Promise<void> => {
  try {
    const sensitiveUserData = JSON.stringify(data);
    const encryptedData = await encryptData(sensitiveUserData);
    
    await supabase.from('profiles').update({
      resume_data_encrypted: encryptedData
    }).eq('id', userId);
  } catch (error) {
    console.error('Failed to encrypt user metadata:', error);
    // Non-blocking error, don't throw
  }
};
