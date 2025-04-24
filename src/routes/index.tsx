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

// Add the system diagnostics route to the routes array
const AppRoutes = [
  <Route path="/" element={<Home />} key="home" />,
  <Route path="/jobs" element={<Jobs />} key="jobs" />,
  <Route path="/jobs/:id" element={<JobDetail />} key="jobDetail" />,
  <Route path="/signin" element={<SignIn />} key="signin" />,
  <Route path="/signup" element={<SignUp />} key="signup" />,
  <Route path="/dashboard" element={<Dashboard />} key="dashboard" />,
  <Route path="/profile" element={<Profile />} key="profile" />,
  <Route path="/applications" element={<Applications />} key="applications" />,
  <Route path="/error" element={<ErrorPage />} key="error" />,
  <Route path="/employer-dashboard" element={<EmployerDashboard />} key="employer-dashboard" />,
  <Route path="/admin-dashboard" element={<AdminDashboard />} key="admin-dashboard" />,
  <Route path="/teacher-dashboard" element={<TeacherDashboard />} key="teacher-dashboard" />,
  <Route path="/system-diagnostics" element={<SystemDiagnosticsPage />} key="system-diagnostics" />,
];

export default AppRoutes;
