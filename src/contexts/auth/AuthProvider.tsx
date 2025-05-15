
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/client';
import { AuthContextType } from './AuthContext';
import { UserProfile } from '@/types/user';
import { JobApplication } from '@/types/job';

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context with default values
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        const session = data.session;
        setUser(session?.user || null);
        
        if (session?.user) {
          await getUserProfile(session.user.id);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();
    
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null);
      setLoading(true);
      
      if (session?.user) {
        await getUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Get the user profile
  const getUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUserProfile(data as UserProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUserProfile(null);
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      return { error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Update user profile
  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Update local profile state
      setUserProfile(prev => prev ? { ...prev, ...updates } : null);
      
      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  // Job application methods
  const createApplication = async (application: any) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          user_id: user.id,
          ...application,
        });
        
      if (error) throw error;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  };
  
  const updateApplication = async (id: string, data: Partial<JobApplication>) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .update(data)
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    createApplication,
    updateApplication,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
