
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
}

interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  user_type?: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  // Add other profile fields as needed
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<User | null>;
  signOut: () => Promise<void>;
  updateProfile: (data: ProfileUpdateData) => Promise<void>;
  refreshProfile: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check active session and fetch user profile
  useEffect(() => {
    const fetchUserAndSession = async () => {
      setIsLoading(true);
      
      // Get current session
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
    
    // Listen for auth changes
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
  
  // Fetch user profile from profiles table
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
      setUserProfile(data);
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  };
  
  // Update user profile
  const updateProfile = async (profileData: ProfileUpdateData) => {
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
      setUserProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      return data;
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };
  
  // Refresh user profile
  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };
  
  // Sign in user
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
  
  // Sign up user
  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName
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
  
  // Sign out user
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
