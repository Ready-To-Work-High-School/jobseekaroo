
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
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
    if (!user) {
      navigate('/sign-in', { state: { from: window.location.pathname } });
      return;
    }

    // Check admin access if required
    if (adminOnly && !isAdmin) {
      navigate('/');
      return;
    }

    // Check required roles if specified
    if (requiredRoles && userProfile) {
      const userRole = userProfile.user_type;
      if (!userRole || !requiredRoles.includes(userRole)) {
        navigate('/');
        return;
      }
    }
  }, [user, userProfile, adminOnly, requiredRoles, navigate, isAdmin]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
