
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null; // Add this property that was missing
  
  // Auth methods
  signIn: (email: string, password: string, ipAddress?: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  
  // Profile methods
  updateProfile: (data: UserProfileUpdate) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  
  // Job methods
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
  
  // Application methods
  submitApplication: (jobId: string, data: any) => Promise<void>;
  createApplication: (application: any) => Promise<string>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  getApplications: () => Promise<any[]>;
  deleteApplication: (applicationId: string) => Promise<void>;
  
  // Admin methods
  makeAdmin: () => Promise<void>;
  verifyEmployer: (employerId: string) => Promise<void>;
  
  // Redemption methods
  redeemCode: (code: string) => Promise<void>;
}
