
import { createContext, useContext } from 'react';
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
  createApplication: (application: JobApplicationInput) => Promise<void>;
  updateApplication: (id: string, data: Partial<JobApplication>) => Promise<void>;
  // Add other properties that exist in your auth context
}

// Create the context
export const AuthContext = createContext<AuthContextType | null>(null);

// Create the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
