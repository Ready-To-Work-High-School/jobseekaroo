
import { RouteObject, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import App from '@/App';
import LandingPage from '@/pages/LandingPage';
import StudentDashboard from '@/pages/student/StudentDashboard';
import EmployerDashboard from '@/pages/employer/EmployerDashboard';
import JobPostingForm from '@/pages/employer/JobPostingForm';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import ErrorPage from '@/pages/ErrorPage';
import AboutUs from '@/pages/AboutUs';
import MissionPage from '@/pages/MissionPage';
import AdminRoute from '@/components/admin/AdminRoute';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import StudentProfile from '@/pages/student/StudentProfile';
import EmployerProfile from '@/pages/employer/EmployerProfile';
import RedemptionCodePage from '@/pages/admin/RedemptionCodePage';
import MessageModeration from '@/pages/admin/MessageModeration';
import UserManagement from '@/pages/admin/UserManagement';
import ApplicationPage from '@/pages/student/ApplicationPage';
import StudentMessages from '@/pages/student/StudentMessages';
import AdminVerification from '@/pages/admin/AdminVerification';
import SharedRoutes from './sharedRoutes';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import HealthcareSimulation from '@/pages/HealthcareSimulation';
import SkillDevelopment from '@/pages/SkillDevelopment';
import UserCredentials from '@/pages/UserCredentials';

// Checking for the correct types being returned from createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Public Routes
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/jobs',
        element: <Jobs />,
      },
      {
        path: '/jobs/:id',
        element: <JobDetail />,
      },
      {
        path: '/privacy-policy',
        element: <PrivacyPolicy />,
      },
      {
        path: '/terms-of-service',
        element: <TermsOfService />,
      },
      {
        path: '/about-us',
        element: <AboutUs />,
      },
      {
        path: '/mission',
        element: <MissionPage />,
      },
      
      // Student Routes
      {
        path: '/student/dashboard',
        element: <StudentDashboard />,
      },
      {
        path: '/student/profile',
        element: <StudentProfile />,
      },
      {
        path: '/student/applications',
        element: <ApplicationPage />,
      },
      {
        path: '/student/messages',
        element: <StudentMessages />,
      },
      
      // Employer Routes
      {
        path: '/employer/dashboard',
        element: <EmployerDashboard />,
      },
      {
        path: '/employer/post-job',
        element: <JobPostingForm />,
      },
      {
        path: '/employer/profile',
        element: <EmployerProfile />,
      },
      
      // Admin Routes
      {
        path: '/admin/*',
        element: <AdminRoute />,
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'redemption-codes',
            element: <RedemptionCodePage />,
          },
          {
            path: 'message-moderation',
            element: <MessageModeration />,
          },
          {
            path: 'user-management',
            element: <UserManagement />,
          },
          {
            path: 'verification',
            element: <AdminVerification />,
          },
        ],
      },
      
      // Job Simulations and Skills Routes
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
        path: '/skill-development',
        element: <SkillDevelopment />,
      },
      {
        path: '/credentials',
        element: <UserCredentials />,
      },
      
      // Add SharedRoutes
      ...React.Children.toArray(SharedRoutes) as RouteObject[],
    ],
  },
]);

export default router;
