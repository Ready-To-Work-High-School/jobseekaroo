import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, validateApplicationStatus, getRedirectUrl, getUserProfile, updateUserProfile } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { UserProfile } from '@/types/user';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  profileLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
  createApplication: (application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<string>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  getApplications: () => Promise<JobApplication[]>;
  deleteApplication: (applicationId: string) => Promise<void>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
    if (!userId) return;
    
    setProfileLoading(true);
    try {
      const profileData = await getUserProfile(userId);
      setUserProfile(profileData as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) throw new Error('User must be logged in to update profile');
    
    try {
      const updatedProfile = await updateUserProfile(user.id, profileData);
      setUserProfile(updatedProfile as UserProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signInWithApple = async () => {
    try {
      const redirectUrl = getRedirectUrl();
      console.log(`Redirecting to: ${redirectUrl}`);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: redirectUrl,
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Apple:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const saveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    
    try {
      const { data: existingData, error: checkError } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }
      
      if (existingData) return;
      
      const { error } = await supabase
        .from('saved_jobs')
        .insert([
          { user_id: user.id, job_id: jobId }
        ]);
      
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
      console.error('Error removing saved job:', error);
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
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking if job is saved:', error);
      return false;
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
      
      return data.map(item => item.job_id);
    } catch (error) {
      console.error('Error getting saved jobs:', error);
      return [];
    }
  };

  const createApplication = async (application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<string> => {
    if (!user) throw new Error('User must be logged in to create an application');
    
    try {
      const newApplication = {
        ...application,
        user_id: user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('job_applications')
        .insert([newApplication])
        .select('id')
        .single();
      
      if (error) throw error;
      
      return data.id;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus): Promise<void> => {
    if (!user) throw new Error('User must be logged in to update an application');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ 
          status, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', applicationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  const getApplications = async (): Promise<JobApplication[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      return data.map(app => ({
        ...app,
        status: validateApplicationStatus(app.status)
      })) as JobApplication[];
      
    } catch (error) {
      console.error('Error getting applications:', error);
      return [];
    }
  };

  const deleteApplication = async (applicationId: string): Promise<void> => {
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

  const value = {
    user,
    session,
    userProfile,
    isLoading,
    profileLoading,
    signIn,
    signUp,
    signOut,
    signInWithApple,
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
