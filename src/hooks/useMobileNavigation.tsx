
import { useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { useToast } from '@/hooks/use-toast';

export const useMobileNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoize auth paths to prevent recreation on every render
  const authPaths = useMemo(() => [
    '/sign-in', '/sign-up', '/forgot-password', '/reset-password', '/auth/callback'
  ], []);

  const shouldHideNavigation = useMemo(() => 
    authPaths.includes(location.pathname), 
    [location.pathname, authPaths]
  );

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
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

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const getPath = useCallback((path: string) => {
    return user ? path : "/sign-in";
  }, [user]);

  const isActivePath = useCallback((path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  }, [location.pathname]);

  return {
    user,
    isAdmin,
    isCeo,
    isMenuOpen,
    setIsMenuOpen,
    shouldHideNavigation,
    handleSignOut,
    closeMenu,
    getPath,
    isActivePath,
    currentPath: location.pathname
  };
};
