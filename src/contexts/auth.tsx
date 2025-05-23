import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
}

interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  preferences?: any;
}

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock authentication for demo
    setTimeout(() => {
      // Demo user for testing
      const demoUser = {
        id: '123',
        email: 'demo@example.com'
      };
      setUser(demoUser);
      
      setUserProfile({
        id: '123',
        first_name: 'Demo',
        last_name: 'User',
        user_type: 'student'
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// We keep this here for backward compatibility but the primary import
// should be from ./hooks/useAuth.tsx
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
