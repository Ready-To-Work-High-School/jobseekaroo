import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react'; // Or useSupabaseAuth if using Supabase
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase'; // If Supabase is used

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'employer' | 'school'; // Optional role-based access
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isSignedIn, userId } = useAuth(); // Clerk auth
  const location = useLocation();

  // Fetch user role from Supabase (if roles stored there)
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfile', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId, // Only fetch if signed in
  });

  // Loading state
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Not signed in -> redirect to login with return URL
  if (!isSignedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Role-based access
  if (requiredRole && userProfile?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
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

  // If authenticated and has proper permissions, check if verification is required
  if (requireVerification) {
    return <RequireVerification>{children}</RequireVerification>;
  }

  // If authenticated and has proper permissions, render children
  return <>{children}</>;
};

export default ProtectedRoute;
