
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  company_name?: string;
  avatar_url?: string;
  job_title?: string;
  location?: string;
  resume_url?: string;
  preferences?: any;
}

interface Application {
  id?: string;
  job_id: string;
  job_title: string;
  company: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
  applied_date: string;
  notes?: string;
  resume_url?: string;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer') => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  refreshSession: () => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  createApplication: (application: Application) => Promise<void>;
  signInWithApple?: () => Promise<void>;
  signInWithGoogle?: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication for demo
    setTimeout(() => {
      // Demo user for testing
      const demoUser = {
        id: '123',
        email: 'demo@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        phone: null,
        confirmation_sent_at: null,
        confirmed_at: null,
        email_confirmed_at: null,
        phone_confirmed_at: null,
        last_sign_in_at: null,
        role: 'authenticated',
        updated_at: new Date().toISOString()
      } as User;
      
      setUser(demoUser);
      
      setUserProfile({
        id: '123',
        first_name: 'Demo',
        last_name: 'User',
        user_type: 'student'
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    return { error: null };
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer') => {
    return { error: null };
  };

  const signOut = async () => {
    setUser(null);
    setUserProfile(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    return { error: null };
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
    return { error: null };
  };

  const refreshSession = async () => {
    return { error: null };
  };

  const refreshProfile = async () => {
    // Mock refresh profile
  };

  const createApplication = async (application: Application) => {
    // Mock create application
    console.log('Creating application:', application);
  };

  const signInWithApple = async () => {
    // Mock Apple sign in
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in
  };

  const contextValue: AuthContextType = {
    user,
    userProfile,
    session,
    loading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshSession,
    refreshProfile,
    createApplication,
    signInWithApple,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
