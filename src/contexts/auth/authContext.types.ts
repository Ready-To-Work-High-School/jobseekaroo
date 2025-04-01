
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null; // Add this property that was missing
  
  // Auth methods
  signIn: (email: string, password: string, ipAddress?: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  
  // Profile methods
  updateProfile: (data: UserProfileUpdate) => Promise<void>;
  
  // Job methods
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  
  // Application methods
  submitApplication: (jobId: string, data: any) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  
  // Admin methods
  makeAdmin: () => Promise<void>;
  verifyEmployer: (employerId: string) => Promise<void>;
  
  // Redemption methods
  redeemCode: (code: string) => Promise<void>;
}
