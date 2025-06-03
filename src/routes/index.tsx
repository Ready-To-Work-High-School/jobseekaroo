
import React from 'react';
import { Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Applications from '@/pages/Applications';
import ErrorPage from '@/pages/ErrorPage';
import EmployerDashboard from '@/pages/EmployerDashboard';
import EmployerQRGenerator from '@/pages/EmployerQRGenerator';
import AdminDashboard from '@/pages/AdminDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';
import SystemDiagnosticsPage from '@/pages/SystemDiagnosticsPage';
import NotFound from '@/pages/NotFound';
import SkillDevelopment from '@/pages/SkillDevelopment';
import InterviewPrep from '@/pages/InterviewPrep';
import EmployerAnalytics from '@/pages/EmployerAnalytics';
import EmployerPremiumServices from '@/pages/EmployerPremiumServices';
import PremiumServices from '@/pages/PremiumServices';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import SchoolGuide from '@/pages/SchoolGuide';
import SchoolIntegration from '@/pages/SchoolIntegration';
import Resources from '@/pages/Resources';
import PlatformGuide from '@/pages/PlatformGuide';
import ForEmployers from '@/pages/ForEmployers';
import SchedulePage from '@/pages/SchedulePage';
import TestPage from '@/pages/TestPage';
import SavedJobs from '@/pages/SavedJobs';
import About from '@/pages/About';

// These are route configurations that can be imported in App.tsx
// They are not actual Route components
const AppRoutes = [
  {
    path: "/",
    element: <Home />,
    key: "home"
  },
  {
    path: "/jobs",
    element: <Jobs />,
    key: "jobs"
  },
  {
    path: "/jobs/:id",
    element: <JobDetail />,
    key: "jobDetail"
  },
  {
    path: "/signin",
    element: <SignIn />,
    key: "signin"
  },
  {
    path: "/sign-in",
    element: <SignIn />,
    key: "sign-in"
  },
  {
    path: "/signup",
    element: <SignUp />,
    key: "signup"
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    key: "sign-up"
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    key: "dashboard"
  },
  {
    path: "/profile",
    element: <Profile />,
    key: "profile"
  },
  {
    path: "/applications",
    element: <Applications />,
    key: "applications"
  },
  {
    path: "/saved-jobs",
    element: <SavedJobs />,
    key: "saved-jobs"
  },
  {
    path: "/error",
    element: <ErrorPage />,
    key: "error"
  },
  {
    path: "/employer-dashboard",
    element: <EmployerDashboard />,
    key: "employer-dashboard"
  },
  {
    path: "/employer/qr-generator",
    element: <EmployerQRGenerator />,
    key: "employer-qr-generator"
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />,
    key: "admin-dashboard"
  },
  {
    path: "/teacher-dashboard",
    element: <TeacherDashboard />,
    key: "teacher-dashboard"
  },
  {
    path: "/system-diagnostics",
    element: <SystemDiagnosticsPage />,
    key: "system-diagnostics"
  },
  {
    path: "/skill-development",
    element: <SkillDevelopment />,
    key: "skill-development"
  },
  {
    path: "/interview-prep",
    element: <InterviewPrep />,
    key: "interview-prep"
  },
  {
    path: "/employer-analytics",
    element: <EmployerAnalytics />,
    key: "employer-analytics"
  },
  {
    path: "/premium-services",
    element: <PremiumServices />,
    key: "premium-services"
  },
  {
    path: "/employer-premium",
    element: <EmployerPremiumServices />,
    key: "employer-premium"
  },
  {
    path: "/analytics",
    element: <AnalyticsDashboard />,
    key: "analytics"
  },
  {
    path: "/school-guide",
    element: <SchoolGuide />,
    key: "school-guide"
  },
  {
    path: "/resources",
    element: <Resources />,
    key: "resources"
  },
  {
    path: "/platform-guide",
    element: <PlatformGuide />,
    key: "platform-guide"
  },
  {
    path: "/for-employers",
    element: <ForEmployers />,
    key: "for-employers"
  },
  {
    path: "/school-integration",
    element: <SchoolIntegration />,
    key: "school-integration"
  },
  {
    path: "/schedule",
    element: <SchedulePage />,
    key: "schedule"
  },
  {
    path: "/test",
    element: <TestPage />,
    key: "test"
  },
  {
    path: "/about",
    element: <About />,
    key: "about"
  },
  {
    path: "*",
    element: <NotFound />,
    key: "not-found"
  }
];

export default AppRoutes;
