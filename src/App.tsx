
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NotificationsProvider } from './contexts/notifications/NotificationsProvider';
import Layout from './components/Layout';
import MobileLayout from './components/MobileLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import EnhancedJobListings from './pages/EnhancedJobListings';
import JobDetailsPage from './pages/JobDetailsPage';
import CeoPortal from './pages/CeoPortal';
import { useAuth } from './hooks/useAuth';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import AuthRoutes from './routes/authRoutes';
import UserProfileTabs from './pages/UserProfileTabs';
import FirstJobToolkit from './pages/FirstJobToolkit';
import { PublicRoutes } from './routes/publicRoutes';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import RequireVerification from './components/auth/RequireVerification';

function App() {
  const { user } = useAuth();
  const isMobile = window.innerWidth <= 768;
  const LayoutComponent = isMobile ? MobileLayout : Layout;

  return (
    <div className="app">
      <NotificationsProvider user={user}>
        <Routes>
          {/* Main protected routes */}
          <Route path="/" element={<LayoutComponent><Home /></LayoutComponent>} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <LayoutComponent><Profile /></LayoutComponent>
            </ProtectedRoute>
          } />
          <Route path="/profile-tabs" element={
            <ProtectedRoute>
              <LayoutComponent><UserProfileTabs /></LayoutComponent>
            </ProtectedRoute>
          } />
          <Route path="/employer-dashboard" element={
            <ProtectedRoute requiredRoles={["employer"]}>
              <LayoutComponent><EmployerDashboard /></LayoutComponent>
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={<LayoutComponent><EnhancedJobListings /></LayoutComponent>} />
          <Route path="/jobs/:jobId" element={<LayoutComponent><JobDetailsPage /></LayoutComponent>} />
          <Route path="/ceo-portal" element={
            <ProtectedRoute adminOnly>
              <RequireVerification>
                <LayoutComponent><CeoPortal /></LayoutComponent>
              </RequireVerification>
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <LayoutComponent><Notifications /></LayoutComponent>
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <LayoutComponent><AdminPanel /></LayoutComponent>
            </ProtectedRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute adminOnly>
              <LayoutComponent><AdminPanel /></LayoutComponent>
            </ProtectedRoute>
          } />
          <Route path="/first-job-toolkit" element={<LayoutComponent><FirstJobToolkit /></LayoutComponent>} />
          
          {/* Include all auth routes */}
          {AuthRoutes}
          
          {/* Include public routes */}
          {PublicRoutes}
          
          {/* Catch-all route for 404s */}
          <Route path="*" element={<LayoutComponent><NotFound /></LayoutComponent>} />
        </Routes>
      </NotificationsProvider>
    </div>
  );
}

export default App;
