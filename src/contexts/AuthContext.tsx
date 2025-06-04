
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
  bio?: string;
  skills?: string[];
  company_website?: string;
  employer_verification_status?: 'pending' | 'approved' | 'rejected';
  verification_notes?: string;
  redeemed_at?: string;
  redeemed_code?: string;
  created_at?: string;
  updated_at?: string;
  badges?: any[];
  accessibility_settings?: {
    high_contrast: boolean;
    increased_font_size: boolean;
    reduce_motion: boolean;
    screen_reader_optimized: boolean;
  };
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
  updateApplicationStatus: (applicationId: string, status: string) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
  getSavedJobs: () => Promise<string[]>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getApplications: () => Promise<Application[]>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
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
        user_type: 'student',
        avatar_url: null,
        job_title: null,
        location: null,
        resume_url: null,
        bio: null,
        skills: [],
        company_name: null,
        company_website: null,
        employer_verification_status: null,
        verification_notes: null,
        redeemed_at: null,
        redeemed_code: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        badges: [],
        accessibility_settings: {
          high_contrast: false,
          increased_font_size: false,
          reduce_motion: false,
          screen_reader_optimized: false
        }
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

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    // Mock update application status
    console.log('Updating application status:', applicationId, status);
  };

  const deleteApplication = async (applicationId: string) => {
    // Mock delete application
    console.log('Deleting application:', applicationId);
  };

  const getSavedJobs = async () => {
    // Mock get saved jobs
    return [];
  };

  const isSavedJob = async (jobId: string) => {
    // Mock is saved job
    return false;
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
    updateApplicationStatus,
    deleteApplication,
    getSavedJobs,
    isSavedJob,
    getApplications,
    saveJob,
    unsaveJob,
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
