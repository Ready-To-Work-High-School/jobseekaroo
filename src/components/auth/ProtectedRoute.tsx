
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isAdmin, isTestMode } from "@/utils/adminUtils";
import AdvancedSpinner from "@/components/ui/advanced-spinner";

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
  const { user, userProfile, isLoading, refreshProfile } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const testMode = isTestMode();
  const [hasShownToast, setHasShownToast] = useState(false);
  
  // Add detailed debug logging to help diagnose issues
  console.log('ProtectedRoute:', { 
    path: location.pathname,
    isLoading, 
    authenticated: !!user,
    userType: userProfile?.user_type,
    userProfile,
    adminOnly,
    testMode,
    adminAccess: isAdmin(userProfile) || testMode
  });
  
  // Attempt to refresh the profile if we have a user but no profile
  useEffect(() => {
    if (user && !userProfile && !isLoading) {
      console.log('User exists but no profile, refreshing profile data');
      refreshProfile();
    }
  }, [user, userProfile, isLoading, refreshProfile]);
  
  // Show auth toast only once, not on every render
  useEffect(() => {
    if (!user && !isLoading && !testMode && !hasShownToast) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      setHasShownToast(true);
    }
  }, [user, isLoading, toast, testMode, hasShownToast]);

  // While checking auth status, show a loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AdvancedSpinner variant="circle" size="lg" text="Loading..." centered />
      </div>
    );
  }

  // If in test mode and trying to access admin routes, bypass auth checks
  if (testMode && adminOnly) {
    console.log('Admin test mode active - bypassing auth checks');
    return <>{children}</>;
  }

  // If not authenticated and not in test mode, redirect to login page with the return url
  // Remove the toast here since we're already showing it in the useEffect above
  if (!user && !testMode) {
    console.log('Not authenticated, redirecting to', redirectTo);
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
  if (adminOnly && !isAdmin(userProfile) && !testMode) {
    console.log('Access denied: Admin only route, user type is', userProfile?.user_type);
    if (!hasShownToast) {
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page",
        variant: "destructive",
      });
      setHasShownToast(true);
    }
    return <Navigate to="/" replace />;
  }

  // Check for role-based restrictions
  if (requiredRoles.length > 0 && userProfile && !testMode) {
    // Check if userProfile.user_type is defined and is one of the required roles
    const hasRequiredRole = userProfile.user_type && requiredRoles.includes(userProfile.user_type);
    if (!hasRequiredRole) {
      console.log('Access denied: Required roles not met', { 
        required: requiredRoles, 
        current: userProfile.user_type 
      });
      if (!hasShownToast) {
        toast({
          title: "Access Denied",
          description: "You don't have the required role to access this page",
          variant: "destructive",
        });
        setHasShownToast(true);
      }
      return <Navigate to="/" replace />;
    }
  }

  // If authenticated and has proper permissions, render children
  return <>{children}</>;
};

export default ProtectedRoute;
