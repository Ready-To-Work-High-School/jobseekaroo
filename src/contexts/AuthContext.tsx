
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User, Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  // Save a job to user's bookmarks
  const saveJob = async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    
    try {
      // First check if this job is already saved
      const { data: existingData, error: checkError } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw checkError;
      }
      
      // If job is already saved, don't save it again
      if (existingData) return;
      
      // Save the job
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

  // Remove a job from user's bookmarks
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

  // Check if a job is saved by the user
  const isSavedJob = async (jobId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw error;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking if job is saved:', error);
      return false;
    }
  };

  // Get all saved jobs IDs for the user
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

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    saveJob,
    unsaveJob,
    isSavedJob,
    getSavedJobs,
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
