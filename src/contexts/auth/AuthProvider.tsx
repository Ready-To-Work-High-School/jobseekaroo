
import { ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';
import { useAuthState } from './hooks/useAuthState';
import { useJobActions } from './hooks/useJobActions';
import { useApplications } from './hooks/useApplications';
import { User } from '@supabase/supabase-js';
import { UserProfile, UserProfileUpdate } from '@/types/user';
import { useToast } from '@/hooks/use-toast';
import { signIn, signUp, signOut, signInWithGoogle, signInWithApple, verifyEmployerStatus } from './authService';

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
    console.log('Setting up auth state listener');
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            refreshProfile();
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
        refreshProfile();
      }
      
      setIsLoading(false);
    });
    
    return () => {
      console.log('Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, [setUser, setUserProfile, setIsLoading, refreshProfile]);

  const handleSignIn = async (email: string, password: string): Promise<User | null> => {
    try {
      // Fix for error TS2554: Expected 1 arguments, but got 5
      const { user, error } = await signIn(email, password);
      
      if (error) {
        console.error('Error signing in:', error);
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
      toast({
        title: "Error",
        description: error.message || "Failed to sign in",
        variant: "destructive",
      });
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
      // Fix the structure to match authService.ts expectations
      const { user, error } = await signUp({
        email, 
        password, 
        firstName, 
        lastName, 
        userType
      });
      
      if (error) {
        console.error('Error signing up:', error);
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
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProfile = async (profileData: UserProfileUpdate): Promise<UserProfile | null> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      console.log('Updating profile with data:', profileData);
      
      let dataToUpdate: any = { ...profileData };
      
      if (dataToUpdate.user_type && !['student', 'employer', 'admin', 'teacher'].includes(dataToUpdate.user_type)) {
        throw new Error(`Invalid user_type: ${dataToUpdate.user_type}`);
      }
      
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
      
      const formattedProfile = data as unknown as UserProfile;
      setUserProfile(prev => prev ? { ...prev, ...formattedProfile } : formattedProfile);
      
      return formattedProfile;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const makeAdmin = async () => {
    console.log('makeAdmin method called but not implemented');
  };

  const verifyEmployer = async (employerId: string) => {
    console.log('verifyEmployer method called but not implemented');
  };

  const redeemCode = async (code: string) => {
    console.log('redeemCode method called but not implemented');
  };

  // Convert AuthResponse to User type where necessary
  const handleSignInWithGoogle = async (): Promise<User | null> => {
    const { user, error } = await signInWithGoogle();
    if (error) throw error;
    return user;
  };

  const handleSignInWithApple = async (): Promise<User | null> => {
    const { user, error } = await signInWithApple();
    if (error) throw error;
    return user;
  };

  const handleSignOut = async (): Promise<void> => {
    // Fix for error TS2339: Property 'error' does not exist on type 'void'
    try {
      await signOut();
      // No error property to check since signOut returns void
    } catch (error) {
      console.error('Error signing out:', error);
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
        signOut: handleSignOut,
        signInWithApple: handleSignInWithApple,
        signInWithGoogle: handleSignInWithGoogle,
        ...jobActions,
        ...applicationActions,
        updateProfile,
        refreshProfile,
        makeAdmin,
        verifyEmployer,
        redeemCode,
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
