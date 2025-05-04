
import { supabase } from '@/lib/supabase';
import { AuthResponse, SignUpData } from './authTypes';
import { 
  checkAccountLockout, 
  trackFailedLoginAttempt, 
  resetFailedLoginAttempts,
  validatePasswordStrength 
} from './security';
import { logAuthEvent, logSecurityEvent } from './auditService';
import { createUserProfile } from './userService';
import { createAdminNotification } from './notificationService';

export const signInWithEmail = async (
  email: string, 
  password: string, 
  ipAddress?: string
): Promise<AuthResponse> => {
  try {
    const { isLocked, minutesLeft, suspiciousActivity } = checkAccountLockout(email);
    
    if (isLocked && minutesLeft) {
      await logSecurityEvent('account_lockout', undefined, {
        email,
        minutes_left: minutesLeft,
        suspicious_activity: suspiciousActivity
      });
      
      throw new Error(`Account temporarily locked. Please try again in ${minutesLeft} minutes.`);
    }

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
      }
      
      return { user: null, error: new Error(enhancedErrorMessage) };
    }
    
    resetFailedLoginAttempts(email);
    
    await logAuthEvent('user_login', {
      user_id: data.user?.id,
      auth_provider: 'email',
      ip_address: ipAddress
    });
    
    return { user: data.user, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};

export const signUpWithEmail = async (data: SignUpData): Promise<AuthResponse> => {
  try {
    const { email, password, firstName, lastName, userType = 'student', additionalData = {} } = data;
    
    const { isValid, errorMessage } = validatePasswordStrength(password);
    if (!isValid) {
      throw new Error(errorMessage);
    }

    const { error, data: authData } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
          employer_verification_status: userType === 'employer' ? 'pending' : null
        },
      },
    });
    
    if (error) {
      await logSecurityEvent('signup_failure', undefined, {
        reason: error.message,
        email,
        user_type: userType
      });
      return { user: null, error };
    }
    
    if (authData?.user?.id) {
      await createUserProfile(authData.user.id, {
        first_name: firstName,
        last_name: lastName,
        user_type: userType,
        ...additionalData
      });

      await logAuthEvent('user_signup', {
        user_id: authData.user.id,
        user_type: userType,
        requires_verification: userType === 'employer'
      });

      // Create admin notification about new user registration
      await createAdminNotification({
        title: 'New User Registration',
        message: `${firstName} ${lastName} (${email}) has registered as a ${userType}.`,
        type: 'registration',
        link: userType === 'employer' ? '/admin/employer-verifications' : '/admin/users'
      });
    }
    
    return { user: authData.user, error: null };
  } catch (error: any) {
    return { user: null, error };
  }
};
