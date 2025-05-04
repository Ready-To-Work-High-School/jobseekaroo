
import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useMobileMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const isAdmin = userProfile?.user_type === 'admin';
  
  const getPath = (path: string) => {
    return user ? path : "/sign-in";
  };
  
  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      navigate('/');
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  }, [signOut, toast, navigate]);
  
  return {
    user,
    userProfile,
    isAdmin,
    getPath,
    handleSignOut,
  };
};
