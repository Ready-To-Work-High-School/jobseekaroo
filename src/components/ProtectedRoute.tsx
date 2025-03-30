
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

  // While checking auth status, show loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If not logged in, redirect to login page with return URL
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If adminOnly and user is not an admin, redirect to dashboard
  if (adminOnly && userProfile?.user_type !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Check for required roles if specified
  if (requiredRoles.length > 0 && userProfile) {
    const hasRequiredRole = requiredRoles.includes(userProfile.user_type);
    if (!hasRequiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // User is authenticated and authorized, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
