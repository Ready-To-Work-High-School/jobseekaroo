
import { createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
  updateProfile: (profileData: UserProfileUpdate) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  getSavedJobs: () => Promise<string[]>;
  createApplication: (jobId: string, applicationData?: any) => Promise<void>;
  getApplications: () => Promise<any[]>;
  updateApplication: (applicationId: string, updates: any) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
  submitApplication: (jobId: string, data: any) => Promise<void>;
  makeAdmin: () => Promise<void>;
  verifyEmployer: () => Promise<void>;
  redeemCode: (code: string) => Promise<void>;
  checkEmployerApproval: (userId: string) => Promise<{ canPostJobs: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
