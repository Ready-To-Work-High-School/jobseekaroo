
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  preferences?: any;
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
    return { error: null };
  };

  const refreshSession = async () => {
    return { error: null };
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
    refreshSession
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
