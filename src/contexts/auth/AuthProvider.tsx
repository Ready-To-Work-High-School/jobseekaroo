
import React, { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';
import { UserProfile } from '@/types/user';
import { JobApplication, ApplicationStatus } from '@/types/application';

// Import services or create them inline
const saveJob = async (userId: string, jobId: string) => {
  try {
    const { error } = await supabase
      .from('saved_jobs')
      .insert({ user_id: userId, job_id: jobId });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

const unsaveJob = async (userId: string, jobId: string) => {
  try {
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .match({ user_id: userId, job_id: jobId });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error unsaving job:', error);
    throw error;
  }
};

const isSavedJob = async (userId: string, jobId: string) => {
  try {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('*')
      .eq('user_id', userId)
      .eq('job_id', jobId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking if job is saved:', error);
    return false;
  }
};

const getSavedJobs = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data.map(item => item.job_id);
  } catch (error) {
    console.error('Error getting saved jobs:', error);
    return [];
  }
};

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
        // Convert JSON into proper record if needed
        const processedData = {
          ...data,
          preferences: data.preferences ? (typeof data.preferences === 'string' ? JSON.parse(data.preferences) : data.preferences) : {}
        };
        setUserProfile(processedData as UserProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string, userType?: string) => {
    try {
      const metadata = {
        first_name: firstName,
        last_name: lastName,
        user_type: userType
      };
      
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: { data: metadata }
      });
      
      if (error) throw error;
      return data.user;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      return data.user || null;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };
  
  const signInWithApple = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      if (error) throw error;
      return data.user || null;
    } catch (error) {
      console.error('Error signing in with Apple:', error);
      throw error;
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

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) return { error: 'No user logged in' };
      
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) return { error };
      
      // Update local userProfile state
      setUserProfile(prev => prev ? {...prev, ...updates} : null);
      
      return { data };
    } catch (error) {
      return { error };
    }
  };
  
  // Application management methods
  const createApplication = async (application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('User must be logged in to create an application');
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert({
          ...application,
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  };
  
  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    if (!user) throw new Error('User must be logged in to update an application');
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .update({ status })
        .match({ id: applicationId, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };
  
  const getApplications = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting applications:', error);
      return [];
    }
  };
  
  const deleteApplication = async (applicationId: string) => {
    if (!user) throw new Error('User must be logged in to delete an application');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .match({ id: applicationId, user_id: user.id });
      
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  };

  // Job management methods
  const handleSaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    return saveJob(user.id, jobId);
  };

  const handleUnsaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to unsave jobs');
    return unsaveJob(user.id, jobId);
  };

  const handleIsSavedJob = async (jobId: string) => {
    if (!user) return false;
    return isSavedJob(user.id, jobId);
  };

  const handleGetSavedJobs = async () => {
    if (!user) return [];
    return getSavedJobs(user.id);
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
    fetchUserProfile,
    refreshProfile,
    signInWithGoogle,
    signInWithApple,
    
    // Application management
    createApplication,
    updateApplicationStatus,
    getApplications,
    deleteApplication,
    
    // Job management
    saveJob: handleSaveJob,
    unsaveJob: handleUnsaveJob,
    isSavedJob: handleIsSavedJob,
    getSavedJobs: handleGetSavedJobs
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
