
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
import EmployerVerifications from '@/pages/employer/EmployerVerifications';
import EmployerOnboarding from '@/pages/employer/EmployerOnboarding';
import EmployerKanban from '@/pages/EmployerKanban';
import EmployerToolsPage from '@/pages/employer/EmployerToolsPage';
import { VerificationFormContainer } from '@/components/employer/VerificationFormContainer';

export const EmployerRoutes = (
  <>
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/employer" element={<ForEmployers />} />
    <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
    <Route 
      path="/employer/dashboard" 
      element={
        <ProtectedRoute>
          <EmployerDashboard />
        </ProtectedRoute>
      } 
    />
    <Route path="/employer-dashboard" element={<EmployerDashboard />} />
    <Route path="/employer/analytics" element={<EmployerAnalytics />} />
    <Route path="/analytics" element={<AnalyticsDashboard />} />
    <Route path="/employer/premium" element={<EmployerPremiumServices />} />
    <Route path="/employer/premium-features" element={<PremiumFeaturesPage />} />
    <Route path="/premium-services" element={<PremiumServices />} />
    <Route path="/employer/badges" element={<EmployerBadges />} />
    <Route path="/employer-badges" element={<EmployerBadges />} />
    <Route path="/resume-assistant" element={<ForEmployers />} />
    <Route path="/post-job" element={<EmployerDashboard />} />
    <Route path="/applicants" element={<EmployerDashboard />} />
    <Route 
      path="/employer/verify" 
      element={
        <ProtectedRoute>
          <VerificationFormContainer />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/verifications" 
      element={
        <ProtectedRoute>
          <EmployerVerifications />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/candidates" 
      element={
        <ProtectedRoute>
          <EmployerKanban />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/tools" 
      element={
        <ProtectedRoute>
          <EmployerToolsPage />
        </ProtectedRoute>
      } 
    />
  </>
);

export default EmployerRoutes;
