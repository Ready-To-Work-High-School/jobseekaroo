
import { createContext } from 'react';
import { UserProfile, UserProfileUpdate } from '@/types/user';

export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: UserProfileUpdate) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getApplications: () => Promise<any[]>;
  getSavedJobs?: () => Promise<string[]>;
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  isSavedJob?: (jobId: string) => boolean;
  signInWithGoogle?: () => Promise<void>;
  signInWithApple?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateProfile: async () => {},
  resetPassword: async () => {},
  getApplications: async () => [],
});

export default AuthContext;
