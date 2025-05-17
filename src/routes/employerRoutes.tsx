
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ForEmployers from '../pages/ForEmployers';
import EmployerDashboard from '../pages/employer/EmployerDashboard';
import EmployerAnalytics from '../pages/EmployerAnalytics';
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
import EmployerPremiumServices from '@/pages/EmployerPremiumServices';

const EmployerRoutes = (
  <>
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/employer" element={<ForEmployers />} />
    <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
    <Route 
      path="/employer/dashboard" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerDashboard />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/analytics" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerAnalytics />
        </ProtectedRoute>
      } 
    />
    <Route path="/analytics" element={<AnalyticsDashboard />} />
    <Route path="/employer/premium" element={<EmployerPremiumServices />} />
    <Route path="/employer-premium" element={<EmployerPremiumServices />} />
    <Route path="/employer/premium-features" element={<PremiumFeaturesPage />} />
    <Route path="/premium-services" element={<PremiumServices />} />
    <Route path="/employer/badges" element={<EmployerBadges />} />
    <Route path="/employer-badges" element={<EmployerBadges />} />
    <Route path="/post-job" element={<EmployerDashboard />} />
    <Route 
      path="/employer/applicants" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerApplicants />
        </ProtectedRoute>
      } 
    />
    <Route path="/applicants" element={<EmployerDashboard />} />
    <Route 
      path="/employer/calendar" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerCalendar />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/verify" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <VerificationFormContainer />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/verifications" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerVerifications />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/candidates" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerKanban />
        </ProtectedRoute>
      } 
    />
    <Route 
      path="/employer/tools" 
      element={
        <ProtectedRoute requiredRoles={["employer"]}>
          <EmployerToolsPage />
        </ProtectedRoute>
      } 
    />
  </>
);

export default EmployerRoutes;
