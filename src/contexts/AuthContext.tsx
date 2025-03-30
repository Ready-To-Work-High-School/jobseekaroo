import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/user';
import { ApplicationStatus } from '@/types/application';

type User = {
  id: string;
  email: string;
  username?: string;
  app_metadata: any;
  user_metadata: any;
  aud: string;
  created_at: string;
};

type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'student' | 'employer') => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<UserProfile | null>;
  updateApplicationStatus: (applicationId: string, status: ApplicationStatus) => Promise<void>;
  deleteApplication: (applicationId: string) => Promise<void>;
  createApplication: (application: any) => Promise<string>;
  getApplications: () => Promise<any[]>;
  saveJob: (jobId: string) => Promise<void>;
  unsaveJob: (jobId: string) => Promise<void>;
  isSavedJob: (jobId: string) => Promise<boolean>;
  getSavedJobs: () => Promise<string[]>;
  signInWithGoogle: () => Promise<User | null>;
  signInWithApple: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('/api/users/me', {
            headers: {
              'x-auth-token': token
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            
            setUser({
              id: data.user.id,
              email: data.user.email,
              username: data.user.username,
              app_metadata: data.user.app_metadata || {},
              user_metadata: data.user.user_metadata || {},
              aud: data.user.aud || 'authenticated',
              created_at: data.user.created_at || new Date().toISOString()
            });
            
            setUserProfile({
              id: data.user.id,
              first_name: data.user.username?.split(' ')[0] || '',
              last_name: data.user.username?.split(' ')[1] || '',
              bio: null,
              location: null,
              resume_url: null,
              skills: null,
              preferences: null,
              user_type: 'student',
              saved_searches: [],
              accessibility_settings: {
                high_contrast: false,
                increased_font_size: false,
                reduce_motion: false,
                screen_reader_optimized: false
              },
              redeemed_at: null,
              redeemed_code: null,
              avatar_url: null,
              created_at: data.user.created_at || new Date().toISOString(),
              updated_at: data.user.created_at || new Date().toISOString(),
              email: data.user.email
            });
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      const userData = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
        app_metadata: data.user.app_metadata || {},
        user_metadata: data.user.user_metadata || {},
        aud: data.user.aud || 'authenticated',
        created_at: data.user.created_at || new Date().toISOString()
      };
      
      setUser(userData);
      
      setUserProfile({
        id: data.user.id,
        first_name: data.user.username?.split(' ')[0] || '',
        last_name: data.user.username?.split(' ')[1] || '',
        bio: null,
        location: null,
        resume_url: null,
        skills: null,
        preferences: null,
        user_type: 'student',
        saved_searches: [],
        accessibility_settings: {
          high_contrast: false,
          increased_font_size: false,
          reduce_motion: false,
          screen_reader_optimized: false
        },
        redeemed_at: null,
        redeemed_code: null,
        avatar_url: null,
        created_at: data.user.created_at || new Date().toISOString(),
        updated_at: data.user.created_at || new Date().toISOString(),
        email: data.user.email
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string, userType: 'student' | 'employer' = 'student') => {
    setIsLoading(true);
    try {
      const username = `${firstName} ${lastName}`;
      
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      
      const userData = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
        app_metadata: data.user.app_metadata || {},
        user_metadata: data.user.user_metadata || {},
        aud: data.user.aud || 'authenticated',
        created_at: data.user.created_at || new Date().toISOString()
      };
      
      setUser(userData);
      
      setUserProfile({
        id: data.user.id,
        first_name: firstName || '',
        last_name: lastName || '',
        bio: null,
        location: null,
        resume_url: null,
        skills: null,
        preferences: null,
        user_type: userType || 'student',
        saved_searches: [],
        accessibility_settings: {
          high_contrast: false,
          increased_font_size: false,
          reduce_motion: false,
          screen_reader_optimized: false
        },
        redeemed_at: null,
        redeemed_code: null,
        avatar_url: null,
        created_at: data.user.created_at || new Date().toISOString(),
        updated_at: data.user.created_at || new Date().toISOString(),
        email: data.user.email,
        company_name: userType === 'employer' ? '' : undefined,
        company_website: userType === 'employer' ? '' : undefined,
        job_title: userType === 'employer' ? '' : undefined,
        employer_verification_status: userType === 'employer' ? 'pending' : undefined
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserProfile(null);
    navigate('/login');
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile | null> => {
    try {
      if (!user) throw new Error('User must be logged in to update profile');
      
      setUserProfile(prev => {
        if (!prev) return null;
        const updated = { ...prev, ...data };
        return updated;
      });
      
      return userProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus): Promise<void> => {
    console.log(`Updating application ${applicationId} status to ${status}`);
  };

  const deleteApplication = async (applicationId: string): Promise<void> => {
    console.log(`Deleting application ${applicationId}`);
  };

  const createApplication = async (application: any): Promise<string> => {
    console.log('Creating application:', application);
    return 'mock-app-id-' + Math.random().toString(36).substring(2, 9);
  };

  const getApplications = async (): Promise<any[]> => {
    return [];
  };

  const saveJob = async (jobId: string): Promise<void> => {
    console.log(`Saving job ${jobId}`);
  };

  const unsaveJob = async (jobId: string): Promise<void> => {
    console.log(`Unsaving job ${jobId}`);
  };

  const isSavedJob = async (jobId: string): Promise<boolean> => {
    return false;
  };

  const getSavedJobs = async (): Promise<string[]> => {
    return [];
  };

  const signInWithGoogle = async (): Promise<User | null> => {
    console.log('Sign in with Google clicked');
    return null;
  };

  const signInWithApple = async (): Promise<User | null> => {
    console.log('Sign in with Apple clicked');
    return null;
  };

  const value = {
    user,
    userProfile,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateApplicationStatus,
    deleteApplication,
    createApplication,
    getApplications,
    saveJob,
    unsaveJob,
    isSavedJob,
    getSavedJobs,
    signInWithGoogle,
    signInWithApple
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
