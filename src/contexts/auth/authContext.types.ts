
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
  
  // Profile methods
  updateProfile: (profileData: UserProfileUpdate) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  
  // Job-related methods
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  getSavedJobs?: () => Promise<string[]>;
  isSavedJob?: (jobId: string) => Promise<boolean>;
  
  // Application methods
  createApplication?: (applicationData: any) => Promise<string>;
  updateApplicationStatus?: (applicationId: string, status: string) => Promise<void>;
  deleteApplication?: (applicationId: string) => Promise<void>;
  getApplications?: () => Promise<any[]>;
  submitApplication?: (jobId: string, data: any) => Promise<void>;
  
  // Admin methods
  makeAdmin?: (userId: string) => Promise<void>;
  verifyEmployer?: (userId: string, status: string, notes?: string) => Promise<void>;
  redeemCode?: (code: string) => Promise<boolean>;
}
