
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  email: string;
  username?: string;
};

// Extending the UserProfile type to include all the properties needed
type UserProfile = {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  accessibility_settings?: {
    high_contrast: boolean;
    increased_font_size: boolean;
    reduce_motion: boolean;
    screen_reader_optimized: boolean;
  };
  saved_searches?: any[];
};

// Application status enum
type ApplicationStatus = 'applied' | 'interviewing' | 'offered' | 'accepted' | 'rejected' | 'withdrawn';

// Extended AuthContextType with all the missing methods and properties
type AuthContextType = {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string, firstName?: string, lastName?: string, userType?: string) => Promise<void>;
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
    // Check if user is logged in on page load
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
            setUser(data.user);
            // Set the userProfile with the user data as a simple implementation
            setUserProfile({
              ...data.user,
              first_name: data.user.username?.split(' ')[0],
              last_name: data.user.username?.split(' ')[1] || '',
              user_type: 'student' // Default type for demo
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
        username: data.user.username
      };
      
      setUser(userData);
      
      // Set the userProfile with the user data
      setUserProfile({
        ...userData,
        first_name: data.user.username?.split(' ')[0],
        last_name: data.user.username?.split(' ')[1] || '',
        user_type: 'student' // Default type for demo
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (username: string, email: string, password: string, firstName?: string, lastName?: string, userType?: string) => {
    setIsLoading(true);
    try {
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
        username: data.user.username
      };
      
      setUser(userData);
      
      // Set the userProfile with the user data and additional info
      setUserProfile({
        ...userData,
        first_name: firstName || data.user.username?.split(' ')[0],
        last_name: lastName || data.user.username?.split(' ')[1] || '',
        user_type: userType || 'student' // Default type for demo
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

  // Mock implementation of update profile
  const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile | null> => {
    try {
      if (!user) throw new Error('User must be logged in to update profile');
      
      // In a real app, this would call an API endpoint
      // For now, we'll just update the state
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

  // Mock implementation of job application functionality
  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus): Promise<void> => {
    console.log(`Updating application ${applicationId} status to ${status}`);
    // Would call an API in a real implementation
  };

  const deleteApplication = async (applicationId: string): Promise<void> => {
    console.log(`Deleting application ${applicationId}`);
    // Would call an API in a real implementation
  };

  const createApplication = async (application: any): Promise<string> => {
    console.log('Creating application:', application);
    // Would call an API in a real implementation
    return 'mock-app-id-' + Math.random().toString(36).substring(2, 9);
  };

  const getApplications = async (): Promise<any[]> => {
    // Would call an API in a real implementation
    return [];
  };

  // Mock implementation of job saving functionality
  const saveJob = async (jobId: string): Promise<void> => {
    console.log(`Saving job ${jobId}`);
    // Would call an API in a real implementation
  };

  const unsaveJob = async (jobId: string): Promise<void> => {
    console.log(`Unsaving job ${jobId}`);
    // Would call an API in a real implementation
  };

  const isSavedJob = async (jobId: string): Promise<boolean> => {
    // Would call an API in a real implementation
    return false;
  };

  const getSavedJobs = async (): Promise<string[]> => {
    // Would call an API in a real implementation
    return [];
  };

  // Mock implementations of social sign-in
  const signInWithGoogle = async (): Promise<User | null> => {
    console.log('Sign in with Google clicked');
    // Mock implementation
    return null;
  };

  const signInWithApple = async (): Promise<User | null> => {
    console.log('Sign in with Apple clicked');
    // Mock implementation
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
