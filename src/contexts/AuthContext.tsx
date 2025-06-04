
import { createContext, ReactNode, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { signIn, signUp, signOut, signInWithGoogle, signInWithApple } from './auth/authService';
import { UserProfile } from '@/types/user';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<User | null>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
  updateProfile: (data: any) => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  // Job actions
  saveJob?: (jobId: string) => Promise<void>;
  unsaveJob?: (jobId: string) => Promise<void>;
  isSavedJob?: (jobId: string) => Promise<boolean>;
  getSavedJobs?: () => Promise<any[]>;
  // Application actions
  createApplication?: (data: any) => Promise<void>;
  updateApplicationStatus?: (applicationId: string, status: string) => Promise<void>;
  getApplications?: () => Promise<any[]>;
  deleteApplication?: (applicationId: string) => Promise<void>;
  // Admin actions
  makeAdmin?: () => Promise<void>;
  verifyEmployer?: () => Promise<void>;
  redeemCode?: () => Promise<void>;
  submitApplication?: (jobId: string, data: any) => Promise<void>;
  checkEmployerApproval?: (userId: string) => Promise<{ canPostJobs: boolean; message: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        console.log('Profile fetched successfully:', data);
        setUserProfile(data as UserProfile);
      } else {
        console.log('No profile found, creating default profile');
        // Create a default profile if none exists
        const defaultProfile = {
          id: userId,
          user_type: 'student' as const,
          first_name: user?.user_metadata?.first_name || '',
          last_name: user?.user_metadata?.last_name || '',
          email: user?.email || ''
        };
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([defaultProfile])
          .select()
          .single();
          
        if (createError) {
          console.error('Error creating profile:', createError);
        } else if (newProfile) {
          console.log('Created new profile:', newProfile);
          setUserProfile(newProfile as UserProfile);
        }
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, 'User ID:', session?.user?.id);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          console.log('User is authenticated, fetching profile...');
          await fetchUserProfile(session.user.id);
        } else {
          console.log('User is not authenticated, clearing profile');
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session immediately
    const checkSession = async () => {
      console.log('Checking for existing session...');
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setIsLoading(false);
        return;
      }
      
      console.log('Initial session check:', session?.user?.id || 'No session');
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('Found existing session, fetching profile...');
        await fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    };

    checkSession();

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const handleSignIn = async (email: string, password: string): Promise<User | null> => {
    try {
      setError(null);
      const { user, error } = await signIn(email, password);
      if (error) throw error;
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const handleSignUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    userType: 'student' | 'employer' = 'student'
  ): Promise<User | null> => {
    try {
      setError(null);
      const { user, error } = await signUp({ email, password, firstName, lastName, userType });
      if (error) throw error;
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const handleSignOut = async (): Promise<void> => {
    try {
      setError(null);
      const { error } = await signOut();
      if (error) throw error;
      
      // Clear local state
      setUser(null);
      setUserProfile(null);
      setSession(null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const handleSignInWithGoogle = async (): Promise<User | null> => {
    try {
      setError(null);
      const { user, error } = await signInWithGoogle();
      if (error) throw error;
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const handleSignInWithApple = async (): Promise<User | null> => {
    try {
      setError(null);
      const { user, error } = await signInWithApple();
      if (error) throw error;
      return user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const updateProfile = async (data: any): Promise<UserProfile | null> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data: updatedData, error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      if (updatedData) {
        setUserProfile(updatedData as UserProfile);
        return updatedData as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      console.log('Refreshing profile for user:', user.id);
      await fetchUserProfile(user.id);
    }
  };

  // Application management functions
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

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', applicationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  const deleteApplication = async (applicationId: string) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        session,
        isLoading,
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: handleSignOut,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithApple: handleSignInWithApple,
        updateProfile,
        refreshProfile,
        // Job actions - placeholder functions
        saveJob: async () => {},
        unsaveJob: async () => {},
        isSavedJob: async () => false,
        getSavedJobs: async () => [],
        // Application actions
        createApplication: async () => {},
        updateApplicationStatus,
        getApplications,
        deleteApplication,
        // Admin actions - placeholder functions
        makeAdmin: async () => {},
        verifyEmployer: async () => {},
        redeemCode: async () => {},
        submitApplication: async () => {},
        checkEmployerApproval: async () => ({ canPostJobs: false, message: 'Not implemented' }),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook
export { useAuth } from '@/hooks/useAuth';
