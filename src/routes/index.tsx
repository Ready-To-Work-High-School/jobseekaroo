
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
import TestPage from '@/pages/TestPage';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import UserCredentials from '@/pages/UserCredentials';
import StudentProfile from '@/pages/student/StudentProfile';
import StudentDashboard from '@/pages/student/StudentDashboard';
import HealthcareSimulation from '@/pages/HealthcareSimulation';

import { PublicRoutes } from './publicRoutes';
import { SchoolRoutes } from './schoolRoutes';
import { EmployerRoutes } from './employerRoutes';
import { JobSeekerRoutes } from './jobSeekerRoutes';

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
  <Route path="/test" element={<TestPage />} key="test" />,
  
  /* Job simulation routes */
  <Route path="/job-simulations" element={<JobSimulations />} key="job-simulations" />,
  <Route path="/job-simulations/:id" element={<SimulationDetail />} key="simulation-detail" />,
  <Route path="/credentials" element={<UserCredentials />} key="user-credentials" />,
  <Route path="/healthcare-simulation" element={<HealthcareSimulation />} key="healthcare-simulation" />,
  
  /* Student routes */
  <Route path="/student-dashboard" element={<StudentDashboard />} key="student-dashboard" />,
  <Route path="/student-profile" element={<StudentProfile />} key="student-profile" />,
  
  /* Include routes defined in other files */
  ...PublicRoutes,
  ...SchoolRoutes,
  ...EmployerRoutes,
  ...JobSeekerRoutes
];

export default AppRoutes;
