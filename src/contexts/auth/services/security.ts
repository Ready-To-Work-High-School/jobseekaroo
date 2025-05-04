
import { supabase } from '@/lib/supabase';
import { encryptData } from '@/lib/supabase/encryption';

// Maximum failed login attempts before temporary lockout
const MAX_LOGIN_ATTEMPTS = 5;
// Lockout duration in milliseconds (15 minutes)
const LOCKOUT_DURATION = 15 * 60 * 1000;

// Track failed login attempts with IP tracking
const failedAttempts: Record<string, { 
  count: number; 
  lastAttempt: number;
  ipAddresses: Set<string>;
}> = {};

/**
 * Check for account lockout
 * @param email User's email
 * @returns Object containing lockout status and minutes left if locked
 */
export const checkAccountLockout = (email: string): { 
  isLocked: boolean; 
  minutesLeft?: number;
  suspiciousActivity?: boolean;
} => {
  const userAttempts = failedAttempts[email];
  if (!userAttempts) return { isLocked: false };
  
  const currentTime = Date.now();
  const timeSinceLastAttempt = currentTime - userAttempts.lastAttempt;
  
  if (userAttempts.count >= MAX_LOGIN_ATTEMPTS) {
    if (timeSinceLastAttempt < LOCKOUT_DURATION) {
      const minutesLeft = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000);
      return { 
        isLocked: true, 
        minutesLeft,
        suspiciousActivity: userAttempts.ipAddresses.size > 2
      };
    } else {
      // Reset if lockout period has passed
      delete failedAttempts[email];
    }
  }
  
  return { 
    isLocked: false,
    suspiciousActivity: userAttempts.ipAddresses.size > 2
  };
};

/**
 * Track failed login attempt
 * @param email User's email
 * @param ipAddress Optional IP address for tracking
 */
export const trackFailedLoginAttempt = (email: string, ipAddress?: string): void => {
  const userAttempts = failedAttempts[email] || { 
    count: 0, 
    lastAttempt: 0,
    ipAddresses: new Set()
  };
  
  userAttempts.count += 1;
  userAttempts.lastAttempt = Date.now();
  if (ipAddress) {
    userAttempts.ipAddresses.add(ipAddress);
  }
  
  failedAttempts[email] = userAttempts;
  
  // Log suspicious activity (multiple IPs)
  if (userAttempts.ipAddresses.size > 2) {
    console.warn(`Suspicious login activity detected for ${email} from multiple IPs:`, 
      Array.from(userAttempts.ipAddresses));
  }
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
  // Simplified password validation - just require 6+ characters
  if (password.length < 6) {
    return { 
      isValid: false, 
      errorMessage: "Password must be at least 6 characters long" 
    };
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

// Clean up old lockout entries periodically
setInterval(() => {
  const currentTime = Date.now();
  Object.keys(failedAttempts).forEach(email => {
    if (currentTime - failedAttempts[email].lastAttempt > LOCKOUT_DURATION) {
      delete failedAttempts[email];
    }
  });
}, LOCKOUT_DURATION);
