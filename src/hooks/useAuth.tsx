
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '@/contexts/auth/AuthContext';

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context || Object.keys(context).length === 0) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
