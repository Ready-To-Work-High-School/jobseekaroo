
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const App: React.FC = () => {
  const { user, userProfile, isLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // This effect handles profile refreshing when auth state changes
  useEffect(() => {
    if (user && !userProfile) {
      console.log('User authenticated but profile not loaded, refreshing profile');
      refreshProfile().catch(err => {
        console.error('Failed to refresh profile:', err);
        toast({
          title: "Profile Loading Issue",
          description: "There was a problem loading your profile data.",
          variant: "destructive",
        });
      });
    }
  }, [user, userProfile, refreshProfile, toast]);

  // This effect adds basic auth protection for specific routes
  useEffect(() => {
    // List of routes that require authentication
    const authProtectedRoutes = [
      '/profile',
      '/credentials',
      '/personalized-assessment'
    ];
    
    // Check if current route needs authentication
    const needsAuth = authProtectedRoutes.some(route => 
      location.pathname.startsWith(route)
    );
    
    // If route needs auth and user is not logged in (and we're done loading)
    if (needsAuth && !user && !isLoading) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page.",
        variant: "destructive",
      });
      navigate('/sign-in', { state: { from: location.pathname } });
    }
  }, [user, location.pathname, navigate, isLoading, toast]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
