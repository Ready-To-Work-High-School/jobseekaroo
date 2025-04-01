
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ 
  children, 
  adminOnly = false, 
  requiredRoles = [] 
}: ProtectedRouteProps) => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();

  // If still loading auth state, show nothing (avoid flashes)
  if (isLoading) {
    return null;
  }
  
  // Not logged in - redirect to login page
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }
  
  // If admin route but user is not admin, redirect to dashboard
  if (adminOnly && userProfile?.user_type !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Check for required roles if specified
  if (requiredRoles.length > 0) {
    const userType = userProfile?.user_type;
    // If user doesn't have any of the required roles, redirect to dashboard
    if (!userType || !requiredRoles.includes(userType)) {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // User is authenticated and has required role (if specified) - render children
  return <>{children}</>;
};

export default ProtectedRoute;
