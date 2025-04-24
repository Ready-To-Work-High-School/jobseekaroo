
import { ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';
import { useAuthState } from './hooks/useAuthState';
import { useJobActions } from './hooks/useJobActions';
import { useApplications } from './hooks/useApplications';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { 
  signIn, 
  signUp, 
  signOut, 
  signInWithGoogle, 
  signInWithApple 
} from './authService';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    user,
    setUser,
    userProfile,
    setUserProfile,
    isLoading,
    setIsLoading,
    error,
    setError,
    refreshProfile
  } = useAuthState();
  
  const jobActions = useJobActions(user);
  const applicationActions = useApplications(user);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(() => refreshProfile(), 0);
        } else {
          setUserProfile(null);
        }
        setIsLoading(false);
      }
    );
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        refreshProfile();
      }
      setIsLoading(false);
    });
    
    return () => subscription.unsubscribe();
  }, [setUser, setUserProfile, setIsLoading, refreshProfile]);

  const handleSignIn = async (email: string, password: string): Promise<User | null> => {
    try {
      const { user, error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to sign in",
          variant: "destructive",
        });
        throw error;
      }
      if (user) {
        toast({
          title: "Success",
          description: "You have successfully signed in",
        });
      }
      return user;
    } catch (error: any) {
      console.error('Error signing in:', error);
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
      const { user, error } = await signUp({
        email, password, firstName, lastName, userType
      });
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to create account",
          variant: "destructive",
        });
        throw error;
      }
      if (user) {
        toast({
          title: "Success",
          description: "Your account has been created successfully",
        });
      }
      return user;
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const updateProfile = async (profileData: UserProfileUpdate): Promise<UserProfile | null> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();
      
      if (error) throw error;
      
      const formattedProfile = data as UserProfile;
      setUserProfile(prev => prev ? { ...prev, ...formattedProfile } : formattedProfile);
      return formattedProfile;
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
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut,
        signInWithGoogle,
        signInWithApple,
        ...jobActions,
        ...applicationActions,
        updateProfile,
        refreshProfile,
        makeAdmin: async () => console.log('makeAdmin method called but not implemented'),
        verifyEmployer: async () => console.log('verifyEmployer method called but not implemented'),
        redeemCode: async () => console.log('redeemCode method called but not implemented'),
        submitApplication: async (jobId: string, data: any) => {
          await applicationActions.createApplication({
            job_id: jobId,
            ...data
          });
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
