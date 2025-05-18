
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { NotificationsProvider } from './contexts/notifications/NotificationsProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import JobDetailsPage from './pages/JobDetailsPage';
import CeoPortal from './pages/CeoPortal';
import { useAuth } from './hooks/useAuth';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import AuthRoutes from './routes/authRoutes';
import UserProfileTabs from './pages/UserProfileTabs';
import PasswordResetRedirect from "./components/auth/PasswordResetRedirect";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Jobs from './pages/Jobs';
import EmployerKanban from './pages/EmployerKanban';
import CommunicationTools from './pages/CommunicationTools';
import SystemDiagnosticsPage from './pages/SystemDiagnosticsPage';
import { NetworkStatusIndicator } from './components/NetworkStatusIndicator';

// Add a loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <HelmetProvider>
      {/* Add the PasswordResetRedirect component at the root level */}
      <PasswordResetRedirect />
      
      <div className="app">
        <AuthProvider>
          <NotificationsProvider user={user}>
            {/* Add a default title tag that will be overridden by specific pages */}
            <Helmet defaultTitle="JobSeekers4HS - Your First Job, Made Simple" titleTemplate="%s | JobSeekers4HS" />
            
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Routes with the Layout component which already includes the Header */}
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                <Route path="/profile-tabs" element={<Layout><UserProfileTabs /></Layout>} />
                <Route path="/employer-dashboard" element={<Layout><EmployerDashboard /></Layout>} />
                <Route path="/jobs" element={<Layout><Jobs /></Layout>} />
                <Route path="/employer-kanban" element={<Layout><EmployerKanban /></Layout>} />
                <Route path="/communication-tools" element={<Layout><CommunicationTools /></Layout>} />
                <Route path="/jobs/:jobId" element={<Layout><JobDetailsPage /></Layout>} />
                <Route path="/ceo-portal" element={<Layout><CeoPortal /></Layout>} />
                <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
                <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
                <Route path="/admin/*" element={<Layout><AdminPanel /></Layout>} />
                
                {/* Add system diagnostics route */}
                <Route path="/system-diagnostics" element={<Layout><SystemDiagnosticsPage /></Layout>} />
                
                {/* Add explicit routes for privacy policy and terms of service */}
                <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
                <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
                
                {/* Include all auth routes */}
                {AuthRoutes}
              </Routes>
            </Suspense>
            
            {/* Network status indicator */}
            <NetworkStatusIndicator />
          </NotificationsProvider>
        </AuthProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
