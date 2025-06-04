
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
  getSavedJobs: () => Promise<any[]>;
  createApplication: (jobId: string, applicationData: any) => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: string) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => boolean;
  getApplications: () => Promise<any[]>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (!mounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && mounted) {
          // Use setTimeout to defer profile fetch and prevent blocking
          setTimeout(async () => {
            if (!mounted) return;
            
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
              
              if (mounted && profile && !error) {
                setUserProfile(profile);
              } else if (error && error.code !== 'PGRST116') {
                console.error('Error fetching user profile:', error);
              }
            } catch (error) {
              console.error('Error fetching user profile:', error);
            }
          }, 0);
        } else if (mounted) {
          setUserProfile(null);
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
      }
      
      if (mounted) {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw new Error(error.message);
      }
      
      if (!data.user) {
        throw new Error('Sign in failed: No user returned');
      }
      
      return data.user;
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    userType: 'student' | 'employer' = 'student'
  ): Promise<User | null> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            user_type: userType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        throw new Error(error.message);
      }
      
      return data.user;
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      console.log('Starting sign out process...');
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw new Error(error.message);
      }
      
      // Clear local state immediately
      setUser(null);
      setUserProfile(null);
      setSession(null);
      
      // Clear any stored tokens
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('redirectAfterLogin');
      
      console.log('Sign out completed successfully');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const signInWithApple = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Apple sign in error:', error);
        throw new Error(error.message);
      }
    } catch (error: any) {
      console.error('Apple sign in error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error('No authenticated user');
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profile && !error) {
        setUserProfile(profile);
      } else if (error && error.code !== 'PGRST116') {
        console.error('Error refreshing profile:', error);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  // Mock implementations for now - these would connect to actual Supabase tables
  const getSavedJobs = async (): Promise<any[]> => {
    // This would query the saved_jobs table
    return [];
  };

  const createApplication = async (jobId: string, applicationData: any): Promise<void> => {
    // This would insert into the applications table
    console.log('Creating application for job:', jobId, applicationData);
  };

  const updateApplicationStatus = async (applicationId: string, status: string): Promise<void> => {
    // This would update the application status
    console.log('Updating application status:', applicationId, status);
  };

  const deleteApplication = async (applicationId: string): Promise<void> => {
    // This would delete the application
    console.log('Deleting application:', applicationId);
  };

  const saveJob = async (jobId: string): Promise<void> => {
    // This would save a job to the saved_jobs table
    console.log('Saving job:', jobId);
  };

  const unsaveJob = async (jobId: string): Promise<void> => {
    // This would remove a job from saved_jobs table
    console.log('Unsaving job:', jobId);
  };

  const isSavedJob = (jobId: string): boolean => {
    // This would check if a job is saved
    return false;
  };

  const getApplications = async (): Promise<any[]> => {
    // This would query the applications table
    return [];
  };

  const value: AuthContextType = {
    user,
    userProfile,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
    updateProfile,
    refreshProfile,
    getSavedJobs,
    createApplication,
    updateApplicationStatus,
    deleteApplication,
    saveJob,
    unsaveJob,
    isSavedJob,
    getApplications,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
