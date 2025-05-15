
import { createContext } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';
import { AuthContextType } from './authContext.types';

// Create context with default undefined value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default initial state for use in provider
export const initialAuthState = {
  user: null,
  userProfile: null,
  isLoading: true,
  error: null
};
