
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // We're using Navbar component directly in App.tsx now, so this component
  // is no longer needed but kept for backward compatibility
  return null;
};

export default Header;
