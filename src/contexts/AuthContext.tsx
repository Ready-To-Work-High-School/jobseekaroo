
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/types/user';

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  signIn?: (email: string, password: string) => Promise<User | null>;
  signUp?: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer', additionalData?: Record<string, any>) => Promise<User | null>;
  signOut?: () => Promise<void>;
  updateProfile?: (data: any) => Promise<UserProfile | null>;
  refreshProfile?: () => Promise<void>;
  signInWithGoogle?: () => Promise<null>;
  signInWithApple?: () => Promise<null>;
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  isSavedJob?: (jobId: string) => Promise<boolean>;
  getSavedJobs?: () => Promise<string[]>;
  createApplication?: (application: any) => Promise<string>;
  updateApplicationStatus?: (applicationId: string, status: string) => Promise<void>;
  getApplications?: () => Promise<any[]>;
  deleteApplication?: (applicationId: string) => Promise<void>;
  makeAdmin?: () => Promise<void>;
  verifyEmployer?: (employerId: string) => Promise<void>;
  redeemCode?: (code: string) => Promise<void>;
  submitApplication?: (jobId: string, data: any) => Promise<void>;
}

// Create context with default undefined value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  isLoading: true,
  error: null
});

// Create a provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // For demo purposes to prevent white screen
  useEffect(() => {
    // Simulate auth loading completion after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      isLoading,
      error,
      // All the auth methods would be implemented here
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
