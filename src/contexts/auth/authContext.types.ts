
import { User, Session } from '@supabase/supabase-js';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { UserProfile } from '@/types/user';
import { NavigateFunction } from 'react-router-dom';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, firstName: string, lastName: string, navigate: NavigateFunction) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
  createApplication: (application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<string>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  getApplications: () => Promise<JobApplication[]>;
  deleteApplication: (applicationId: string) => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}
