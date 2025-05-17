
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { NotificationsProvider } from './contexts/notifications/NotificationsProvider';
import Layout from './components/Layout';
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
import PasswordResetRedirect from "./components/auth/PasswordResetRedirect";
import { Helmet, HelmetProvider } from 'react-helmet';

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
            
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
              <Route path="/profile-tabs" element={<Layout><UserProfileTabs /></Layout>} />
              <Route path="/employer-dashboard" element={<Layout><EmployerDashboard /></Layout>} />
              <Route path="/jobs" element={<Layout><EnhancedJobListings /></Layout>} />
              <Route path="/jobs/:jobId" element={<Layout><JobDetailsPage /></Layout>} />
              <Route path="/ceo-portal" element={<Layout><CeoPortal /></Layout>} />
              <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
              <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
              <Route path="/admin/*" element={<Layout><AdminPanel /></Layout>} />
              
              {/* Include all auth routes */}
              {AuthRoutes}
            </Routes>
          </NotificationsProvider>
        </AuthProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
