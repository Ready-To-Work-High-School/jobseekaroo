
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
  adminOnly?: boolean;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ 
  children,
  redirectTo = "/login",
  adminOnly = false,
  requiredRoles = []
}: ProtectedRouteProps) => {
  const { user, userProfile, isLoading } = useAuth();
  const location = useLocation();

  // While checking auth status, show nothing or a loading spinner
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login page with the return url
  if (!user) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location }} 
        replace
      />
    );
  }

  // If adminOnly and user is not an admin, redirect
  if (adminOnly && userProfile?.user_type !== 'admin') {
    return (
      <Navigate 
        to="/" 
        state={{ from: location }} 
        replace
      />
    );
  }

  // If requiredRoles is specified and user doesn't have any of the required roles
  if (requiredRoles.length > 0 && 
      (!userProfile?.user_type || !requiredRoles.includes(userProfile.user_type))) {
    return (
      <Navigate 
        to="/" 
        state={{ from: location }} 
        replace
      />
    );
  }

  // If authenticated and has proper permissions, render children
  return <>{children}</>;
};

export default ProtectedRoute;
