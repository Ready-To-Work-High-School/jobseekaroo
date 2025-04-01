import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithApple: () => Promise<User | null>;
  signInWithGoogle: () => Promise<User | null>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
  createApplication: (application: any) => Promise<string>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  getApplications: () => Promise<any[]>;
  deleteApplication: (applicationId: string) => Promise<void>;
  updateProfile: (data: UserProfileUpdate) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserAndSession = async () => {
      setIsLoading(true);
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setError(sessionError.message);
        setIsLoading(false);
        return;
      }
      
      if (session?.user) {
        setUser(session.user);
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      
      setIsLoading(false);
    };
    
    fetchUserAndSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      console.log('Fetched user profile:', data);
      
      const formattedData: UserProfile = {
        ...data,
        preferences: data.preferences 
          ? (typeof data.preferences === 'string' 
              ? JSON.parse(data.preferences) 
              : data.preferences)
          : null
      } as UserProfile;
      
      setUserProfile(formattedData);
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  };
  
  const updateProfile = async (profileData: UserProfileUpdate): Promise<UserProfile | null> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      console.log('Updating profile with data:', profileData);
      
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      console.log('Profile updated successfully:', data);
      
      const formattedData: UserProfile = {
        ...data,
        preferences: data.preferences 
          ? (typeof data.preferences === 'string' 
              ? JSON.parse(data.preferences) 
              : data.preferences)
          : null
      } as UserProfile;
      
      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      return formattedData;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };
  
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };
  
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email, 
        password
      });
      
      if (error) throw error;
      
      console.log('User signed in:', data.user);
      return data.user;
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      setError(error.message);
      return null;
    }
  };
  
  const signUp = async (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer' = 'student') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType
          }
        }
      });
      
      if (error) throw error;
      
      console.log('User signed up:', data.user);
      return data.user;
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      setError(error.message);
      return null;
    }
  };
  
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });
      
      if (error) throw error;
      
      return null;
    } catch (error: any) {
      console.error('Error signing in with Google:', error.message);
      setError(error.message);
      return null;
    }
  };
  
  const signInWithApple = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple'
      });
      
      if (error) throw error;
      
      return null;
    } catch (error: any) {
      console.error('Error signing in with Apple:', error.message);
      setError(error.message);
      return null;
    }
  };
  
  const saveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    
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
  
  const unsaveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to unsave jobs');
    
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
  
  const isSavedJob = async (jobId: string) => {
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
  
  const getSavedJobs = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      return data.map(item => item.job_id);
    } catch (error) {
      console.error('Error getting saved jobs:', error);
      return [];
    }
  };
  
  const createApplication = async (application: any) => {
    if (!user) throw new Error('User must be logged in to create an application');
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert({ ...application, user_id: user.id })
        .select()
        .single();
        
      if (error) throw error;
      
      return data.id;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  };
  
  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    if (!user) throw new Error('User must be logged in to update an application');
    
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
  
  const getApplications = async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });
        
      if (error) throw error;
      
      return data;
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
        .eq('id', applicationId)
        .eq('user_id', user.id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting application:', error);
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
        signInWithApple,
        signInWithGoogle,
        saveJob,
        unsaveJob,
        isSavedJob,
        getSavedJobs,
        createApplication,
        updateApplicationStatus,
        getApplications,
        deleteApplication,
        updateProfile,
        refreshProfile,
        error
      }}
    >
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
