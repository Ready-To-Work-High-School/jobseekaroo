
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { UserProfile } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { ApplicationStatus } from '@/types/application';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: any) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  getSavedJobs: () => Promise<string[]>;
  createApplication: (applicationData: any) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getApplications: () => Promise<any[]>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const refreshProfile = async () => {
    if (!user) {
      setUserProfile(null);
      return;
    }

    try {
      console.log('AuthContext: Refreshing profile for user:', user.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('AuthContext: No profile found, this might be a new user');
          setUserProfile(null);
          return;
        }
        throw error;
      }

      if (data) {
        const formattedProfile: UserProfile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          location: data.location,
          resume_url: data.resume_url,
          skills: data.skills || [],
          preferences: data.preferences || {},
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
        
        console.log('AuthContext: Profile refreshed successfully:', formattedProfile);
        setUserProfile(formattedProfile);
      }
    } catch (error: any) {
      console.error('AuthContext: Error refreshing profile:', error);
      // Don't throw here to prevent breaking auth flow
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
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
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      console.log('AuthContext: Starting sign in process for:', email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      console.log('AuthContext: Sign in successful');
      toast({
        title: "Success",
        description: "You have successfully signed in",
      });
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string
  ): Promise<void> => {
    try {
      console.log('AuthContext: Starting sign up process for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        console.error('Sign up error:', error);
        throw error;
      }

      console.log('AuthContext: Sign up successful');
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
    } catch (error: any) {
      console.error('Error signing up:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      console.log('AuthContext: Starting sign out process');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      console.log('AuthContext: Sign out completed successfully');
    } catch (error: any) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw error;
    }
  };

  const signInWithApple = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Apple sign in error:', error);
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
          preferences: data.preferences || {},
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

  const getSavedJobs = async (): Promise<string[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      return data?.map(item => item.job_id) || [];
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      return [];
    }
  };

  const createApplication = async (applicationData: any): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          user_id: user.id,
          ...applicationData
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  const deleteApplication = async (applicationId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', applicationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  };

  const saveJob = async (jobId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({ user_id: user.id, job_id: jobId });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  };

  const unsaveJob = async (jobId: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', user.id)
        .eq('job_id', jobId);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error unsaving job:', error);
      throw error;
    }
  };

  const isSavedJob = async (jobId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking if job is saved:', error);
      return false;
    }
  };

  const getApplications = async (): Promise<any[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting applications:', error);
      return [];
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
        refreshProfile,
        getSavedJobs,
        createApplication,
        signInWithGoogle,
        signInWithApple,
        updateApplicationStatus,
        deleteApplication,
        saveJob,
        unsaveJob,
        isSavedJob,
        getApplications
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook directly from this file
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
