
import { UserProfile } from '@/types/user';
import { JobApplication } from '@/types/application';

export interface JobApplicationInput {
  job_id: string;
  job_title: string;
  company: string;
  status: string;
  applied_date: string;
  contact_name?: string;
  contact_email?: string;
  next_step?: string;
  next_step_date?: string;
  notes?: string;
}

export interface AuthContextType {
  user: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithGoogle?: () => Promise<any>;
  signInWithApple?: () => Promise<any>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  refreshProfile?: () => Promise<void>;
  createApplication: (application: JobApplicationInput) => Promise<void>;
  updateApplication: (id: string, data: Partial<JobApplication>) => Promise<void>;
  deleteApplication?: (id: string) => Promise<void>;
  getApplications?: () => Promise<JobApplication[]>;
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  isSavedJob?: (jobId: string) => Promise<boolean>;
  resetPassword?: (email: string) => Promise<{ error: any }>;
}
