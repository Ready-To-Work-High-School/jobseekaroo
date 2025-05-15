
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { JobApplication, ApplicationStatus } from '@/types/application';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  
  // Authentication methods
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, userType?: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success?: boolean; error?: any }>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
  
  // Profile methods
  updateProfile: (updates: Partial<UserProfile>) => Promise<any>;
  fetchUserProfile: (userId: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  
  // Application methods
  createApplication: (application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<any>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<any>;
  updateApplication: (id: string, updates: Partial<JobApplication>) => Promise<any>; // Add missing method
  getApplications: () => Promise<any[]>;
  deleteApplication: (applicationId: string) => Promise<any>;
  
  // Job management methods
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
}
