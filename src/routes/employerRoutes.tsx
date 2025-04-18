
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ForEmployers from '../pages/ForEmployers';
import EmployerDashboard from '../pages/employer/EmployerDashboard';
import EmployerAnalytics from '../pages/EmployerAnalytics';
import EmployerPremiumServices from '../pages/EmployerPremiumServices';
import EmployerBadges from '../pages/EmployerBadges';
import PremiumServices from '../pages/PremiumServices';
import AnalyticsDashboard from '../pages/AnalyticsDashboard';
import PremiumFeaturesPage from '../pages/employer/PremiumFeaturesPage';

export const EmployerRoutes = (
  <>
    <Route path="/for-employers" element={<ForEmployers />} />
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
    <Route path="/analytics" element={<AnalyticsDashboard />} />
    <Route path="/employer/premium" element={
      <ProtectedRoute requiredRoles={['employer', 'admin']}>
        <EmployerPremiumServices />
      </ProtectedRoute>
    } />
    <Route path="/employer/premium-features" element={
      <ProtectedRoute requiredRoles={['employer', 'admin']}>
        <PremiumFeaturesPage />
      </ProtectedRoute>
    } />
    <Route path="/premium-services" element={<PremiumServices />} />
    <Route path="/employer/badges" element={<EmployerBadges />} />
    <Route path="/employer-badges" element={<EmployerBadges />} />
    <Route path="/resume-assistant" element={<ForEmployers />} />
  </>
);

export default EmployerRoutes;
