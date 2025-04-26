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

// Import routes from other route files
import { PublicRoutes } from './publicRoutes';
import { SchoolRoutes } from './schoolRoutes';
import { EmployerRoutes } from './employerRoutes';

// Complete routes array with all necessary routes
const AppRoutes = [
  <Route path="/" element={<Home />} key="home" />,
  <Route path="/jobs" element={<Jobs />} key="jobs" />,
  <Route path="/jobs/:id" element={<JobDetail />} key="jobDetail" />,
  <Route path="/signin" element={<SignIn />} key="signin" />,
  <Route path="/sign-in" element={<SignIn />} key="sign-in" />,
  <Route path="/signup" element={<SignUp />} key="signup" />,
  <Route path="/sign-up" element={<SignUp />} key="sign-up" />,
  <Route path="/dashboard" element={<Dashboard />} key="dashboard" />,
  <Route path="/profile" element={<Profile />} key="profile" />,
  <Route path="/applications" element={<Applications />} key="applications" />,
  <Route path="/error" element={<ErrorPage />} key="error" />,
  <Route path="/employer-dashboard" element={<EmployerDashboard />} key="employer-dashboard" />,
  <Route path="/admin-dashboard" element={<AdminDashboard />} key="admin-dashboard" />,
  <Route path="/teacher-dashboard" element={<TeacherDashboard />} key="teacher-dashboard" />,
  <Route path="/system-diagnostics" element={<SystemDiagnosticsPage />} key="system-diagnostics" />,
  <Route path="/skill-development" element={<SkillDevelopment />} key="skill-development" />,
  <Route path="/interview-prep" element={<InterviewPrep />} key="interview-prep" />,
  <Route path="/employer-analytics" element={<EmployerAnalytics />} key="employer-analytics" />,
  <Route path="/premium-services" element={<PremiumServices />} key="premium-services" />,
  <Route path="/employer-premium" element={<EmployerPremiumServices />} key="employer-premium" />,
  <Route path="/analytics" element={<AnalyticsDashboard />} key="analytics" />,
  <Route path="/school-guide" element={<SchoolGuide />} key="school-guide" />,
  <Route path="/resources" element={<Resources />} key="resources" />,
  <Route path="/platform-guide" element={<PlatformGuide />} key="platform-guide" />,
  <Route path="/for-employers" element={<ForEmployers />} key="for-employers" />,
  <Route path="/school-integration" element={<SchoolIntegration />} key="school-integration" />,
  <Route path="/schedule" element={<SchedulePage />} key="schedule" />,
];

export default AppRoutes;
