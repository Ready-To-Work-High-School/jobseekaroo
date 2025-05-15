
import { UserProfile } from '@/types/user';
import { JobApplication } from '@/types/job';

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
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  createApplication: (application: JobApplicationInput) => Promise<void>;
  updateApplication: (id: string, data: Partial<JobApplication>) => Promise<void>;
  deleteApplication?: (id: string) => Promise<void>;
  getApplications?: () => Promise<JobApplication[]>;
  resetPassword?: (email: string) => Promise<{ error: any }>;
}

// Create the auth context
import { createContext } from 'react';
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
