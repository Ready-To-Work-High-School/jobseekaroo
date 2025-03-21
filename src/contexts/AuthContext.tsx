
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './auth/AuthProvider';
import { AuthContextType } from './auth/authContext.types';

// Export the hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export the provider component
export { AuthProvider };
