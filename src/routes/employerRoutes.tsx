
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
import EmployerApplicants from '@/pages/employer/EmployerApplicants';
import EmployerCalendar from '@/pages/employer/EmployerCalendar';
import JobPerformance from '@/pages/employer/JobPerformance';
import EmployerQRGenerator from '@/pages/EmployerQRGenerator';

export const EmployerRoutes = (
  <>
    {/* Public employer pages */}
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/employer" element={<ForEmployers />} />
    <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
    
    {/* Protected employer dashboard routes */}
    <Route 
      path="/employer/dashboard" 
      element={
        <ProtectedRoute>
          <EmployerDashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer-dashboard" 
      element={
        <ProtectedRoute>
          <EmployerDashboard />
        </ProtectedRoute>
      }
    />
    
    {/* QR Code functionality - accessible to all employers */}
    <Route 
      path="/employer/qr-generator" 
      element={
        <ProtectedRoute>
          <EmployerQRGenerator />
        </ProtectedRoute>
      }
    />
    
    {/* Job posting routes */}
    <Route 
      path="/post-job" 
      element={
        <ProtectedRoute>
          <EmployerDashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/post-job" 
      element={
        <ProtectedRoute>
          <EmployerDashboard />
        </ProtectedRoute>
      } 
    />
    
    {/* Analytics and performance */}
    <Route 
      path="/employer/analytics" 
      element={
        <ProtectedRoute>
          <EmployerAnalytics />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/analytics" 
      element={
        <ProtectedRoute>
          <AnalyticsDashboard />
        </ProtectedRoute>
      }
    />
    <Route 
      path="/employer/job-performance" 
      element={
        <ProtectedRoute>
          <JobPerformance />
        </ProtectedRoute>
      } 
    />
    
    {/* Applicant management */}
    <Route 
      path="/employer/applicants" 
      element={
        <ProtectedRoute>
          <EmployerApplicants />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/applicants" 
      element={
        <ProtectedRoute>
          <EmployerApplicants />
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
    
    {/* Calendar and scheduling */}
    <Route 
      path="/employer/calendar" 
      element={
        <ProtectedRoute>
          <EmployerCalendar />
        </ProtectedRoute>
      } 
    />
    
    {/* Verification and compliance */}
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
    
    {/* Premium features and tools */}
    <Route 
      path="/employer/premium" 
      element={
        <ProtectedRoute>
          <EmployerPremiumServices />
        </ProtectedRoute>
      }
    />
    <Route 
      path="/employer/premium-features" 
      element={
        <ProtectedRoute>
          <PremiumFeaturesPage />
        </ProtectedRoute>
      }
    />
    <Route 
      path="/premium-services" 
      element={
        <ProtectedRoute>
          <PremiumServices />
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
    
    {/* Badges and recognition */}
    <Route 
      path="/employer/badges" 
      element={
        <ProtectedRoute>
          <EmployerBadges />
        </ProtectedRoute>
      }
    />
    <Route 
      path="/employer-badges" 
      element={
        <ProtectedRoute>
          <EmployerBadges />
        </ProtectedRoute>
      }
    />
  </>
);

export default EmployerRoutes;
