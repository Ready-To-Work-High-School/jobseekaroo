
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false,
  requiredRoles = []
}) => {
  const { user, userProfile, isLoading } = useAuth();

  // If auth is still loading, you might want to show a loading spinner
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  // Not authenticated at all, redirect to sign in
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  // Check for admin-only routes
  if (adminOnly && userProfile?.user_type !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Check for role-based restrictions
  if (requiredRoles.length > 0 && userProfile) {
    const hasRequiredRole = requiredRoles.includes(userProfile.user_type);
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  // User is authenticated and has proper permissions
  return <>{children}</>;
};

export default ProtectedRoute;
