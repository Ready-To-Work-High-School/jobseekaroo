
import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { UserProfile, UserProfileUpdate } from '@/types/user';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  useEffect(() => {
    // Initialize auth state here
    // This would typically involve checking for an existing session
    const checkAuthState = async () => {
      try {
        // Mock authentication check for now
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock sign in logic
      setUser({ id: '1', email, user_type: 'student' });
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    setLoading(true);
    try {
      // Mock sign up logic
      setUser({ id: '1', email, ...userData });
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Mock sign out logic
      setUser(null);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const updateProfile = async (data: UserProfileUpdate) => {
    setLoading(true);
    try {
      // Mock update profile logic
      if (user) {
        setUser({ ...user, ...data });
      }
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      // Mock password reset logic
      console.log('Password reset email sent to:', email);
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const getApplications = async () => {
    // Mock getting applications
    return [];
  };

  const getSavedJobs = async () => {
    // Mock getting saved jobs
    return savedJobs;
  };

  const saveJob = async (jobId: string) => {
    setSavedJobs(prevSavedJobs => [...prevSavedJobs, jobId]);
  };

  const unsaveJob = async (jobId: string) => {
    setSavedJobs(prevSavedJobs => prevSavedJobs.filter(id => id !== jobId));
  };

  const isSavedJob = (jobId: string) => {
    return savedJobs.includes(jobId);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Mock Google sign in
      setUser({ id: '1', email: 'google@example.com', user_type: 'student' });
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  const signInWithApple = async () => {
    setLoading(true);
    try {
      // Mock Apple sign in
      setUser({ id: '1', email: 'apple@example.com', user_type: 'student' });
      setLoading(false);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      signIn,
      signUp,
      signOut,
      updateProfile,
      resetPassword,
      getApplications,
      getSavedJobs,
      saveJob,
      unsaveJob,
      isSavedJob,
      signInWithGoogle,
      signInWithApple
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
