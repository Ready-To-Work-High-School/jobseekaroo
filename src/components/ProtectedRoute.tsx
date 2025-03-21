
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ children, requiredRoles = [] }: ProtectedRouteProps) => {
  const { user, isLoading, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Only check auth after loading is complete
    if (!isLoading) {
      if (!user) {
        // Store the attempted URL to redirect back after login
        sessionStorage.setItem('redirectAfterLogin', location.pathname);
        
        toast({
          title: "Access Restricted",
          description: "Please sign in or create an account to access this feature.",
          variant: "destructive",
        });
        
        navigate('/sign-in');
      }
      
      // Role-based authorization check (if roles system is implemented in the future)
      if (requiredRoles.length > 0 && userProfile) {
        const hasRequiredRole = userProfile.user_type && requiredRoles.includes(userProfile.user_type);
        
        if (!hasRequiredRole) {
          toast({
            title: "Permission Denied",
            description: "You don't have the required permissions to access this page.",
            variant: "destructive",
          });
          
          navigate('/');
        }
      }
    }
  }, [user, isLoading, navigate, toast, location.pathname, requiredRoles, userProfile]);
  
  // Show loading indicator while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }
  
  // Only render children if user is authenticated
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
