
import { checkEmployerVerification } from '@/lib/supabase/encryption/file-security';
import { 
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle as socialSignInWithGoogle,
  signInWithApple as socialSignInWithApple,
  signOut as authSignOut,
  AuthResponse
} from './services';

// Re-export functions with properly typed signatures
export const signIn = signInWithEmail;
export const signUp = signUpWithEmail;
export const signOut = authSignOut;
export const signInWithGoogle = socialSignInWithGoogle;
export const signInWithApple = socialSignInWithApple;

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
