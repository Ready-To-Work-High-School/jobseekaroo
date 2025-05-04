
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/AuthContext';
import { AuthContextType } from '@/contexts/auth/authContext.types';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
