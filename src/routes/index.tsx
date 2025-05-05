
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '@/App';
import ErrorPage from '@/pages/ErrorPage';
import SharedRoutes from './sharedRoutes';
import SkillDevelopment from '@/pages/SkillDevelopment';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import HealthcareSimulation from '@/pages/HealthcareSimulation';
import UserCredentials from '@/pages/UserCredentials';
import PersonalizedAssessment from '@/pages/PersonalizedAssessment';

// Create a router with routes that we know exist
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Add only routes that we know exist
      {
        path: '/skill-development',
        element: <SkillDevelopment />,
      },
      {
        path: '/job-simulations',
        element: <JobSimulations />,
      },
      {
        path: '/simulations/:id',
        element: <SimulationDetail />,
      },
      {
        path: '/healthcare-simulation',
        element: <HealthcareSimulation />,
      },
      {
        path: '/credentials',
        element: <UserCredentials />,
      },
      {
        path: '/personalized-assessment',
        element: <PersonalizedAssessment />,
      },
      
      // Add SharedRoutes
      ...SharedRoutes,
    ],
  },
]);

export default router;
