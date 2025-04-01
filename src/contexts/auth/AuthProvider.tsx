
import { ReactNode, useState, useEffect, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { ApplicationStatus } from '@/types/application';
import { AuthContext, initialAuthState } from './AuthContext';
import { formatUserProfile } from './utils';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Profile fetching
  const fetchUserProfile = useCallback(async (userId: string) => {
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
      const formattedProfile = formatUserProfile(data);
      setUserProfile(formattedProfile);
      
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  }, []);
  
  // Auth initialization
  useEffect(() => {
    const fetchUserAndSession = async () => {
      setIsLoading(true);
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Error getting session:', sessionError);
        setError(new Error(sessionError.message));
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
  }, [fetchUserProfile]);
  
  // Authentication methods
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
      setError(new Error(error.message));
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
      setError(new Error(error.message));
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
      setError(new Error(error.message));
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
      setError(new Error(error.message));
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
      setError(new Error(error.message));
      return null;
    }
  };
  
  // Profile management
  const updateProfile = async (profileData: UserProfileUpdate): Promise<UserProfile | null> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      console.log('Updating profile with data:', profileData);
      
      // Ensure we have a valid object to update
      let dataToUpdate: any = { ...profileData };
      
      // If user_type is present, ensure it's one of the valid types
      if (dataToUpdate.user_type && !['student', 'employer', 'admin', 'teacher'].includes(dataToUpdate.user_type)) {
        throw new Error(`Invalid user_type: ${dataToUpdate.user_type}`);
      }
      
      // If employer_verification_status is present, ensure it's one of the valid statuses
      if (dataToUpdate.employer_verification_status && 
          !['pending', 'approved', 'rejected'].includes(dataToUpdate.employer_verification_status)) {
        throw new Error(`Invalid employer_verification_status: ${dataToUpdate.employer_verification_status}`);
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .update(dataToUpdate)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }
      
      console.log('Profile updated successfully:', data);
      
      const formattedProfile = formatUserProfile(data);
      setUserProfile(prev => prev ? { ...prev, ...formattedProfile } : null);
      
      return formattedProfile;
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
  
  // Job management
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
  
  // Application management
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

  // Placeholder methods for admin and redemption functionality
  const makeAdmin = async () => {
    console.log('makeAdmin method called but not implemented');
  };

  const verifyEmployer = async (employerId: string) => {
    console.log('verifyEmployer method called but not implemented');
  };

  const redeemCode = async (code: string) => {
    console.log('redeemCode method called but not implemented');
  };

  const submitApplication = async (jobId: string, data: any) => {
    console.log('submitApplication method called but not implemented');
    await createApplication({
      job_id: jobId,
      ...data
    });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        error,
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
        makeAdmin,
        verifyEmployer,
        redeemCode,
        submitApplication
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
