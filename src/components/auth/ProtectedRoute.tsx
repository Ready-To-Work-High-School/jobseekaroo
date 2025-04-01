
import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  adminOnly?: boolean;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ 
  children,
  redirectTo = "/sign-in",
  adminOnly = false,
  requiredRoles = []
}: ProtectedRouteProps) => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
    }
  }, [user, isLoading, toast]);

  // While checking auth status, show nothing or a loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page with the return url
  if (!user) {
    // Save the current location they were trying to go to
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location, redirectFrom: location.pathname.substring(1) }} 
        replace
      />
    );
  }

  // Check for admin-only routes
  if (adminOnly && userProfile?.user_type !== 'admin') {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this page",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  // Check for role-based restrictions
  if (requiredRoles.length > 0 && userProfile) {
    const hasRequiredRole = requiredRoles.includes(userProfile.user_type);
    if (!hasRequiredRole) {
      toast({
        title: "Access Denied",
        description: "You don't have the required role to access this page",
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has proper permissions, render children
  return <>{children}</>;
};

export default ProtectedRoute;
