
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: any;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<{ user: User | null; error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updateProfile: (data: UserProfileUpdate) => Promise<{ error: any }>;
  refreshSession: () => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
  createApplication: (data: any) => Promise<void>;
  updateApplicationStatus: (id: string, status: string) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  getSavedJobs: () => Promise<any[]>;
  getApplications: () => Promise<any[]>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
}

// Create and export the AuthContext
export const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => null,
  signUp: async () => ({ user: null, error: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
  updateProfile: async () => ({ error: null }),
  refreshSession: async () => ({ error: null }),
  refreshProfile: async () => {},
  createApplication: async () => {},
  updateApplicationStatus: async () => {},
  deleteApplication: async () => {},
  getSavedJobs: async () => [],
  getApplications: async () => [],
  saveJob: async () => {},
  unsaveJob: async () => {},
  isSavedJob: async () => false,
  signInWithGoogle: async () => null,
  signInWithApple: async () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user for development - using proper Supabase User type
    const mockUser: User = {
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
    };

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

  const signIn = async (email: string, password: string): Promise<User | null> => {
    // Mock sign in - return the user object directly
    const mockUser: User = {
      id: 'mock-user-id',
      email,
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
    };
    
    setUser(mockUser);
    return mockUser;
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer' = 'student') => {
    // Mock sign up - return user object along with error
    const mockUser: User = {
      id: 'new-user-id',
      email,
      app_metadata: {},
      user_metadata: { first_name: firstName, last_name: lastName },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
      email_confirmed_at: new Date().toISOString(),
      phone_confirmed_at: null,
      last_sign_in_at: new Date().toISOString(),
      role: 'authenticated',
      updated_at: new Date().toISOString(),
    };
    
    setUser(mockUser);
    return { user: mockUser, error: null };
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

  const getApplications = async () => {
    // Mock get applications
    return [];
  };

  const saveJob = async (jobId: string) => {
    // Mock save job
    console.log('Saving job:', jobId);
  };

  const unsaveJob = async (jobId: string) => {
    // Mock unsave job
    console.log('Unsaving job:', jobId);
  };

  const isSavedJob = async (jobId: string) => {
    // Mock check if job is saved
    return false;
  };

  const signInWithGoogle = async (): Promise<User | null> => {
    // Mock Google sign in
    const mockUser: User = {
      id: 'google-user-id',
      email: 'google@example.com',
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
    };
    
    setUser(mockUser);
    return mockUser;
  };

  const signInWithApple = async (): Promise<User | null> => {
    // Mock Apple sign in
    const mockUser: User = {
      id: 'apple-user-id',
      email: 'apple@example.com',
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
    };
    
    setUser(mockUser);
    return mockUser;
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
    getApplications,
    saveJob,
    unsaveJob,
    isSavedJob,
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
