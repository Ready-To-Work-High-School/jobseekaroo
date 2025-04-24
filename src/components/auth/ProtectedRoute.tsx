
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ children, adminOnly, requiredRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login', { state: { from: window.location.pathname } });
      return;
    }

    // Check admin access if required
    if (adminOnly && user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Check required roles if specified
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      navigate('/');
      return;
    }
  }, [user, adminOnly, requiredRoles, navigate]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
