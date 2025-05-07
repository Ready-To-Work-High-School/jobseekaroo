import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth'; // Fixed import path
import { useEffect } from 'react';
import { useAdminStatus } from '@/hooks/useAdminStatus';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ children, adminOnly, requiredRoles }: ProtectedRouteProps) => {
  const { user, userProfile } = useAuth();
  const { isAdmin } = useAdminStatus();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - checking access:', { 
      user: !!user, 
      adminOnly, 
      isAdmin, 
      userType: userProfile?.user_type 
    });
    
    if (!user) {
      console.log('ProtectedRoute - redirecting to sign-in: no user');
      navigate('/sign-in', { state: { from: window.location.pathname } });
      return;
    }

    // Check admin access if required
    if (adminOnly && !isAdmin) {
      console.log('ProtectedRoute - redirecting to home: admin required but user is not admin');
      navigate('/');
      return;
    }

    // Check required roles if specified
    if (requiredRoles && userProfile) {
      const userRole = userProfile.user_type;
      if (!userRole || !requiredRoles.includes(userRole)) {
        console.log('ProtectedRoute - redirecting to home: role required but user does not have it');
        navigate('/');
        return;
      }
    }
    
    console.log('ProtectedRoute - access granted');
  }, [user, userProfile, adminOnly, requiredRoles, navigate, isAdmin]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
