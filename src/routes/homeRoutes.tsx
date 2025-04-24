
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ResourcesPage from '@/pages/Resources';
import PlatformGuide from '@/pages/PlatformGuide';

// Use lazy imports for larger components
const JobsPage = lazy(() => import('@/pages/JobsPage'));
const ForEmployers = lazy(() => import('@/pages/ForEmployers'));
const SchoolIntegration = lazy(() => import('@/pages/SchoolIntegration'));
const EmployerVerification = lazy(() => import('@/pages/EmployerVerification'));
const ResourcesCatalog = lazy(() => import('@/pages/ResourcesCatalog'));
const SafetyCompliancePage = lazy(() => import('@/pages/SafetyCompliancePage'));

const HomeRoutes = (
  <>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/jobs" element={<JobsPage />} />
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/school-integration" element={<SchoolIntegration />} />
    <Route path="/resources" element={<ResourcesPage />} />
    <Route path="/platform-guide" element={<PlatformGuide />} />
    <Route path="/employer-verification" element={<EmployerVerification />} />
    <Route path="/resources-catalog" element={<ResourcesCatalog />} />
    <Route path="/safety-compliance" element={<SafetyCompliancePage />} />
  </>
);

export default HomeRoutes;
