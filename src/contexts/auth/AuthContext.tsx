
import { createContext } from 'react';

// Define a default context value to avoid undefined errors
export const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
  updateProfile: async () => ({ error: null }),
  refreshSession: async () => ({ error: null }),
});
