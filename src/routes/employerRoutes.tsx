
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
    <Route path="/employer/dashboard" element={<EmployerDashboard />} />
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
  </>
);

export default EmployerRoutes;
