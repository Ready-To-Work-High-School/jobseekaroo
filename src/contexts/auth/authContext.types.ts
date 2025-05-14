
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<{ data?: any; error?: any }>;
  signUp: (credentials: { email: string; password: string; metadata?: object }) => Promise<{ data?: any; error?: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success?: boolean; error?: any }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ data?: any; error?: any }>;
  refreshSession: () => Promise<{ data?: any; error?: any }>;
}

export interface AuthState {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: any | null;
}

export const initialAuthState: AuthState = {
  user: null,
  userProfile: null,
  isLoading: true,
  error: null
};
