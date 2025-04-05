
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import EmployerDashboard from '../pages/EmployerDashboard';
import EmployerAnalytics from '../pages/EmployerAnalytics';

export const EmployerRoutes = (
  <>
    {/* Employer routes */}
    <Route path="/employer-dashboard" element={
      <ProtectedRoute requiredRoles={['employer']}>
        <EmployerDashboard />
      </ProtectedRoute>
    } />
    <Route path="/employer-analytics" element={
      <ProtectedRoute requiredRoles={['employer']}>
        <EmployerAnalytics />
      </ProtectedRoute>
    } />
  </>
);
