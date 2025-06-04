
import { ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthContext } from '@/contexts/AuthContext';
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
  signInWithApple,
  verifyEmployerStatus
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
    let isFirstLoad = true;
    let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

    // Set up the auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        // Update user state synchronously
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Clear any existing timeouts to prevent multiple refreshes
          if (refreshTimeout) {
            clearTimeout(refreshTimeout);
          }
          
          // Defer profile fetch to avoid blocking render
          refreshTimeout = setTimeout(() => {
            console.log('Refreshing profile for user:', session.user?.id);
            refreshProfile().catch(err => {
              console.error('Background profile refresh failed:', err);
              // Only show toast on initial load, not on subsequent refreshes
              if (isFirstLoad) {
                toast({
                  title: "Profile loading issue",
                  description: "Some profile information might not be available",
                  variant: "destructive",
                });
                isFirstLoad = false;
              }
            });
          }, 0);
        } else {
          setUserProfile(null);
        }
        
        setIsLoading(false);
      }
    );
    
    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log('Found existing session, refreshing profile');
        refreshProfile().catch(err => {
          console.error('Initial profile refresh failed:', err);
          toast({
            title: "Profile loading issue",
            description: "Some profile information might not be available",
            variant: "destructive",
          });
        });
      }
      
      setIsLoading(false);
      isFirstLoad = false;
    });
    
    return () => {
      subscription.unsubscribe();
      if (refreshTimeout) {
        clearTimeout(refreshTimeout);
      }
    };
  }, [setUser, setUserProfile, setIsLoading, refreshProfile, toast]);

  const handleSignIn = async (email: string, password: string): Promise<User | null> => {
    try {
      console.log('AuthProvider: Starting sign in process for:', email);
      const { user, error } = await signIn(email, password);
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to sign in",
          variant: "destructive",
        });
        throw error;
      }
      if (user) {
        console.log('AuthProvider: Sign in successful for user:', user.id);
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
      console.log('AuthProvider: Starting sign up process for:', email);
      const { user, error } = await signUp({
        email, password, firstName, lastName, userType
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to create account",
          variant: "destructive",
        });
        throw error;
      }
      
      if (user) {
        console.log('AuthProvider: Sign up successful for user:', user.id);
        toast({
          title: "Success",
          description: "Your account has been created successfully",
        });
        
        // Force refresh profile after signup
        setTimeout(() => {
          refreshProfile();
        }, 500);
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
      
      if (data) {
        // Format the profile data to match UserProfile type
        const formattedProfile: UserProfile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          bio: data.bio,
          location: data.location,
          resume_url: data.resume_url,
          skills: data.skills || [],
          // Explicitly cast preferences to Record<string, any>
          preferences: data.preferences ? (typeof data.preferences === 'string' ? JSON.parse(data.preferences) : data.preferences) : {},
          // Cast user_type to the appropriate union type
          user_type: data.user_type as "student" | "employer" | "admin" | "teacher" | null,
          redeemed_at: data.redeemed_at,
          redeemed_code: data.redeemed_code,
          avatar_url: data.avatar_url,
          email: data.email,
          company_name: data.company_name,
          company_website: data.company_website,
          job_title: data.job_title,
          // Cast employer_verification_status to the appropriate union type
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
        error,
        signIn: handleSignIn,
        signUp: handleSignUp,
        signOut: async () => {
          const { error } = await signOut();
          if (error) throw error;
          return;
        },
        // Fix the return type mismatch for signInWithGoogle and signInWithApple
        // These functions return AuthResponse but we cast to User | null
        signInWithGoogle: async () => {
          const { user, error } = await signInWithGoogle();
          if (error) throw error;
          return user;
        },
        signInWithApple: async () => {
          const { user, error } = await signInWithApple();
          if (error) throw error;
          return user;
        },
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
        },
        // Add proper implementation of verifyEmployerStatus
        checkEmployerApproval: async (userId: string) => {
          try {
            return await verifyEmployerStatus(userId);
          } catch (err: any) {
            console.error('Error checking employer approval:', err);
            return { canPostJobs: false, message: err.message || 'Failed to verify employer status' };
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
