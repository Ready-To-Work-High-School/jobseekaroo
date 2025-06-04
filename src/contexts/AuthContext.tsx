
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: any;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (data: UserProfileUpdate) => Promise<{ error: any }>;
  refreshSession: () => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  createApplication: (data: any) => Promise<void>;
  updateApplicationStatus: (id: string, status: string) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  getSavedJobs: () => Promise<any[]>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
  updateProfile: async () => ({ error: null }),
  refreshSession: async () => ({ error: null }),
  refreshProfile: async () => {},
  createApplication: async () => {},
  updateApplicationStatus: async () => {},
  deleteApplication: async () => {},
  getSavedJobs: async () => [],
  signInWithGoogle: async () => null,
  signInWithApple: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user for development
    const mockUser = {
      id: 'mock-user-id',
      email: 'user@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      phone_confirmed_at: null,
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString(),
    } as User;

    const mockProfile: UserProfile = {
      id: 'mock-user-id',
      first_name: 'John',
      last_name: 'Doe',
      bio: 'Software developer with a passion for learning',
      location: 'New York, NY',
      resume_url: null,
      skills: ['JavaScript', 'React', 'Node.js'],
      preferences: { theme: 'light', notifications: true },
      user_type: 'student',
      redeemed_at: null,
      redeemed_code: null,
      avatar_url: null,
      email: 'user@example.com',
      company_name: null,
      company_website: null,
      job_title: null,
      employer_verification_status: null,
      verification_notes: null,
      resume_data_encrypted: null,
      contact_details_encrypted: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      badges: [],
    };

    setUser(mockUser);
    setUserProfile(mockProfile);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    // Mock sign up
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

  const updateProfile = async (data: UserProfileUpdate) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data });
    }
    return { error: null };
  };

  const refreshSession = async () => {
    return { error: null };
  };

  const refreshProfile = async () => {
    // Mock refresh profile
  };

  const createApplication = async (data: any) => {
    // Mock create application
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    // Mock update application status
  };

  const deleteApplication = async (id: string) => {
    // Mock delete application
  };

  const getSavedJobs = async () => {
    // Mock get saved jobs
    return [];
  };

  const signInWithGoogle = async () => {
    // Mock Google sign in
    return null;
  };

  const signInWithApple = async () => {
    // Mock Apple sign in
    return null;
  };

  const value = {
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
    updateApplicationStatus,
    deleteApplication,
    getSavedJobs,
    signInWithGoogle,
    signInWithApple,
  };

  return (
    <AuthContext.Provider value={value}>
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
