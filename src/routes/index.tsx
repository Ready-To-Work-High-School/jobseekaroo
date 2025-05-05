
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import SharedRoutes from './sharedRoutes';
// Import only the components we need eagerly, lazy load the rest
import SystemDiagnosticsPage from '@/pages/SystemDiagnosticsPage';
import Home from '@/pages/Home';  // Eagerly import Home component for faster initial load

// Lazy load non-critical route components
const Profile = lazy(() => import('@/pages/Profile'));
const Skills = lazy(() => import('@/pages/Skills'));
const JobSimulations = lazy(() => import('@/pages/JobSimulations'));
const SimulationDetail = lazy(() => import('@/pages/SimulationDetail'));
const HealthcareSimulation = lazy(() => import('@/pages/HealthcareSimulation'));
const UserCredentials = lazy(() => import('@/pages/UserCredentials'));
const PersonalizedAssessment = lazy(() => import('@/pages/PersonalizedAssessment'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[70vh]">
    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
);

// Create a router with routes configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Important: Home route must be at the top for immediate loading
      {
        index: true,
        element: <Home />
      },
      // Regular routes with lazy loading
      {
        path: 'skills',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Skills />
          </Suspense>
        )
      },
      {
        path: 'job-simulations',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <JobSimulations />
          </Suspense>
        )
      },
      {
        path: 'job-simulations/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SimulationDetail />
          </Suspense>
        )
      },
      {
        path: 'healthcare-simulation',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HealthcareSimulation />
          </Suspense>
        )
      },
      {
        path: 'credentials',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <UserCredentials />
          </Suspense>
        )
      },
      {
        path: 'personalized-assessment',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PersonalizedAssessment />
          </Suspense>
        )
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Profile />
          </Suspense>
        )
      },
      {
        path: 'system-diagnostics',
        element: <SystemDiagnosticsPage />
      },
      // Spread the shared routes
      ...SharedRoutes,
    ],
  },
]);

export default router;
