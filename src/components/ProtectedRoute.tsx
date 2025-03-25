
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  adminOnly?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiredRoles = [],
  adminOnly = false
}: ProtectedRouteProps) => {
  const { user, isLoading, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // To enable testing of the admin portal, we'll add a bypass mechanism
  const isAdminTest = location.search.includes('adminTest=true');
  
  useEffect(() => {
    // Only check auth after loading is complete
    if (!isLoading) {
      // If this is the admin test route, allow access regardless of auth status
      if (adminOnly && isAdminTest) {
        console.log('Admin test mode enabled - bypassing authentication checks');
        return;
      }
      
      if (!user) {
        // Store the attempted URL to redirect back after login
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
        
        toast({
          title: "Access Restricted",
          description: "Please sign in or create an account to access this feature.",
          variant: "destructive",
        });
        
        navigate('/sign-in');
        return;
      }
      
      // Admin-only pages check
      if (adminOnly && userProfile?.user_type !== 'admin' && !isAdminTest) {
        toast({
          title: "Admin Access Only",
          description: "You don't have administrative privileges to access this page.",
          variant: "destructive",
        });
        
        navigate('/');
        return;
      }
      
      // Role-based authorization check
      if (requiredRoles.length > 0 && userProfile) {
        const hasRequiredRole = userProfile.user_type && requiredRoles.includes(userProfile.user_type);
        
        if (!hasRequiredRole && !isAdminTest) {
          toast({
            title: "Permission Denied",
            description: "You don't have the required permissions to access this page.",
            variant: "destructive",
          });
          
          navigate('/');
          return;
        }
      }
    }
  }, [user, isLoading, navigate, toast, location.pathname, requiredRoles, userProfile, adminOnly, isAdminTest]);
  
  // Show loading indicator while checking authentication
  if (isLoading && !(adminOnly && isAdminTest)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  // Return children if user is authenticated or if it's an admin test
  return (user || (adminOnly && isAdminTest)) ? <>{children}</> : null;
};

export default ProtectedRoute;
