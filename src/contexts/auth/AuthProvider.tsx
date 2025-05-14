
import React, { createContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';
import { UserProfile } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state change event:", event);
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session);
        
        if (session?.user) {
          // Use setTimeout to prevent blocking renderer
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setUserProfile(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.id);
      
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else {
        console.log("User profile fetched:", data);
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error };
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async ({ 
    email, 
    password, 
    metadata 
  }: { 
    email: string; 
    password: string; 
    metadata?: { 
      first_name?: string;
      last_name?: string;
      user_type?: 'student' | 'employer' | 'admin';
    } 
  }) => {
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { data: metadata }
      });
      
      if (error) return { error };
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      if (error) return { error };
      return { success: true };
    } catch (error) {
      return { error };
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      if (!user) return { error: 'No user logged in' };
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) return { error };
      
      // Update local userProfile state
      setUserProfile({
        ...userProfile,
        ...updates
      } as UserProfile);
      
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const refreshSession = async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) return { error };
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    userProfile,
    loading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshSession,
    fetchUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
