
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import EmployerDashboard from '../pages/EmployerDashboard';
import EmployerAnalytics from '../pages/EmployerAnalytics';
import EmployerPremiumServices from '../pages/EmployerPremiumServices';
import ForEmployers from '../pages/ForEmployers';
import EmployerBadges from '../pages/EmployerBadges';

export const EmployerRoutes = (
  <>
    <Route path="/employer" element={<ForEmployers />} />
    <Route path="/employer/dashboard" element={
      <ProtectedRoute requiredRoles={['employer', 'admin']}>
        <EmployerDashboard />
      </ProtectedRoute>
    } />
    <Route path="/employer-dashboard" element={
      <ProtectedRoute requiredRoles={['employer', 'admin']}>
        <EmployerDashboard />
      </ProtectedRoute>
    } />
    <Route path="/employer/analytics" element={
      <ProtectedRoute requiredRoles={['employer', 'admin']}>
        <EmployerAnalytics />
      </ProtectedRoute>
    } />
    <Route path="/employer/premium" element={
      <ProtectedRoute requiredRoles={['employer', 'admin']}>
        <EmployerPremiumServices />
      </ProtectedRoute>
    } />
    <Route path="/employer/badges" element={<EmployerBadges />} />
  </>
);

export default EmployerRoutes;
