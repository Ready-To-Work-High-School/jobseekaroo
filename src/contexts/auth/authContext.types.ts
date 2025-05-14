
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<{ data?: any; error?: any }>;
  signUp: (credentials: { 
    email: string; 
    password: string; 
    metadata?: {
      first_name?: string;
      last_name?: string;
      user_type?: 'student' | 'employer' | 'admin';
    } 
  }) => Promise<{ data?: any; error?: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success?: boolean; error?: any }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data?: any; error?: any }>;
  refreshSession: () => Promise<{ data?: any; error?: any }>;
  fetchUserProfile: (userId: string) => Promise<void>;
}
