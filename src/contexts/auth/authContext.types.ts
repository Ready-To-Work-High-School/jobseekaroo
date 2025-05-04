
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
  updateProfile: (profileData: UserProfileUpdate) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  makeAdmin: (userId: string) => Promise<void>;
  verifyEmployer: (userId: string, status: 'approved' | 'rejected', notes?: string) => Promise<void>;
  redeemCode: (code: string) => Promise<any>;
  submitApplication: (jobId: string, data: any) => Promise<void>;
  // Add any additional job or application methods here
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  createJob?: (jobData: any) => Promise<any>;
  updateJob?: (jobId: string, jobData: any) => Promise<any>;
  createApplication?: (applicationData: any) => Promise<any>;
  updateApplicationStatus?: (applicationId: string, status: ApplicationStatus) => Promise<any>;
}
