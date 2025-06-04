
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { UserProfile } from '@/types/user';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      console.log('refreshProfile: No user to refresh profile for');
      return;
    }
    
    try {
      console.log('refreshProfile: Fetching profile for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      console.log('refreshProfile: Profile data fetched:', data ? 'success' : 'null');
      
      if (data) {
        const formattedProfile: UserProfile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          location: data.location,
          resume_url: data.resume_url,
          skills: data.skills || [],
          preferences: data.preferences ? (typeof data.preferences === 'string' ? JSON.parse(data.preferences) : data.preferences) : {},
          user_type: data.user_type as "student" | "employer" | "admin" | "teacher" | null,
          redeemed_at: data.redeemed_at,
          redeemed_code: data.redeemed_code,
          avatar_url: data.avatar_url,
          email: data.email,
          company_name: data.company_name,
          company_website: data.company_website,
          job_title: data.job_title,
          employer_verification_status: data.employer_verification_status as "pending" | "approved" | "rejected" | null,
          verification_notes: data.verification_notes,
          resume_data_encrypted: data.resume_data_encrypted,
          contact_details_encrypted: data.contact_details_encrypted,
          created_at: data.created_at,
          updated_at: data.updated_at,
          badges: Array.isArray(data.badges) 
            ? data.badges.map(badge => ({ 
                id: (badge as any).id || '',
                name: (badge as any).name || '',
                earned_at: (badge as any).earned_at
              }))
            : []
        };
        
        setUserProfile(formattedProfile);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  useEffect(() => {
    let isFirstLoad = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            console.log('Refreshing profile for user:', session.user?.id);
            refreshProfile().catch(err => {
              console.error('Background profile refresh failed:', err);
            });
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('Found existing session, refreshing profile');
        refreshProfile().catch(err => {
          console.error('Initial profile refresh failed:', err);
        });
      }
      
      setIsLoading(false);
      isFirstLoad = false;
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<User | null> => {
    try {
      console.log('AuthContext: Starting sign in process for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }
      
      if (data.user) {
        console.log('AuthContext: Sign in successful for user:', data.user.id);
      }
      
      return data.user;
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw error;
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
      console.log('AuthContext: Starting sign up process for:', email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }
      
      if (data.user) {
        console.log('AuthContext: Sign up successful for user:', data.user.id);
        setTimeout(() => {
          refreshProfile();
        }, 500);
      }
      
      return data.user;
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      console.log('AuthContext: Starting sign out process');
      
      // Clear local state first
      setUser(null);
      setUserProfile(null);
      
      // Clear any stored session data
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('redirectAfterLogin');
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Supabase sign out error:', error);
        throw error;
      }
      
      console.log('AuthContext: Sign out completed successfully');
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: any): Promise<UserProfile | null> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const formattedProfile: UserProfile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          location: data.location,
          resume_url: data.resume_url,
          skills: data.skills || [],
          preferences: data.preferences ? (typeof data.preferences === 'string' ? JSON.parse(data.preferences) : data.preferences) : {},
          user_type: data.user_type as "student" | "employer" | "admin" | "teacher" | null,
          redeemed_at: data.redeemed_at,
          redeemed_code: data.redeemed_code,
          avatar_url: data.avatar_url,
          email: data.email,
          company_name: data.company_name,
          company_website: data.company_website,
          job_title: data.job_title,
          employer_verification_status: data.employer_verification_status as "pending" | "approved" | "rejected" | null,
          verification_notes: data.verification_notes,
          resume_data_encrypted: data.resume_data_encrypted,
          contact_details_encrypted: data.contact_details_encrypted,
          created_at: data.created_at,
          updated_at: data.updated_at,
          badges: Array.isArray(data.badges)
            ? data.badges.map(badge => ({
                id: (badge as any).id || '',
                name: (badge as any).name || '',
                earned_at: (badge as any).earned_at
              }))
            : []
        };
        
        setUserProfile(prev => prev ? { ...prev, ...formattedProfile } : formattedProfile);
        return formattedProfile;
      }
      return null;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
