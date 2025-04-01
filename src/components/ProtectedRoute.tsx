
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
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
  
  // User is authenticated (and admin if needed) - render children
  return <>{children}</>;
};

export default ProtectedRoute;
