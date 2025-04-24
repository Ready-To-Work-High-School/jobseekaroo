
import { checkEmployerVerification } from '@/lib/supabase/encryption/file-security';
import { 
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithApple,
  signOut as authSignOut,
  AuthResponse,
  SignUpData
} from './services';

export const signIn = signInWithEmail;
export const signUp = signUpWithEmail;
export const signOut = authSignOut;

export const verifyEmployerStatus = async (userId: string) => {
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

export { signInWithGoogle, signInWithApple };
