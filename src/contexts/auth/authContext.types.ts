
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithApple: () => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
  createApplication: (application: any) => Promise<string>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  getApplications: () => Promise<any[]>;
  deleteApplication: (applicationId: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>, sensitiveUpdates?: {
    resumeData?: string;
    contactDetails?: string;
  }) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  
  // MFA related methods
  isMfaEnabled: boolean;
  isMfaLoading: boolean;
  enrollMfa: () => Promise<{ qrCode: string } | null>;
  verifyMfa: (code: string, factorId: string) => Promise<boolean>;
  unenrollMfa: (factorId: string) => Promise<boolean>;
  mfaFactors: Array<{
    id: string;
    type: string;
    friendly_name?: string;
  }>;
  refreshMfaStatus: () => Promise<void>;
}
