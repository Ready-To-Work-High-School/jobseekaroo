
import { createContext } from 'react';
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
  updateProfile: (data: UserProfileUpdate) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<UserProfile | null>;
  makeAdmin?: (userId: string) => Promise<void>;
  verifyEmployer?: (employerId: string, status: string) => Promise<void>;
  redeemCode?: (code: string) => Promise<void>;
  
  // Job management functions
  createJob?: (jobData: any) => Promise<any>;
  updateJob?: (jobId: string, jobData: any) => Promise<any>;
  deleteJob?: (jobId: string) => Promise<void>;
  getJobs?: () => Promise<any[]>;
  getJobById?: (jobId: string) => Promise<any>;
  
  // Saved jobs functions
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  getSavedJobs?: () => Promise<string[]>;
  isSavedJob?: (jobId: string) => Promise<boolean>;
  
  // Application management functions
  createApplication?: (applicationData: any) => Promise<any>;
  getApplications?: () => Promise<any[]>;
  getApplicationById?: (applicationId: string) => Promise<any>;
  updateApplicationStatus?: (applicationId: string, status: ApplicationStatus) => Promise<any>;
  deleteApplication?: (applicationId: string) => Promise<void>;
  submitApplication?: (jobId: string, data: any) => Promise<any>;
}

// Create context with default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default initial state for use in provider
export const initialAuthState = {
  user: null,
  userProfile: null,
  isLoading: true,
  error: null
};
