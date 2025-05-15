
import { createContext } from 'react';
import { AuthContextType } from './authContext.types';

// Create context with default values to avoid undefined errors
export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  userProfile: null,
  loading: true,
  isAuthenticated: false,
  
  // Authentication methods
  signIn: async () => null,
  signUp: async () => null,
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
  signInWithGoogle: async () => null,
  signInWithApple: async () => null,
  
  // Profile methods
  updateProfile: async () => ({}),
  fetchUserProfile: async () => {},
  refreshProfile: async () => {},
  
  // Application methods
  createApplication: async () => ({}),
  updateApplicationStatus: async () => ({}),
  getApplications: async () => [],
  deleteApplication: async () => ({}),
  
  // Job management methods
  saveJob: async () => {},
  unsaveJob: async () => {},
  isSavedJob: async () => false,
  getSavedJobs: async () => [],
});
