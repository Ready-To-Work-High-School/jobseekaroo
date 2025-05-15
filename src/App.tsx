
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { NotificationsProvider } from './contexts/notifications/NotificationsProvider';
import SecurityProvider from './components/security/SecurityProvider';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EnhancedJobListings from './pages/EnhancedJobListings';
import JobDetailsPage from './pages/JobDetailsPage';
import CeoPortal from './pages/CeoPortal';
import { useAuth } from './contexts/auth';
import Notifications from './pages/Notifications';
import AdminPanel from './pages/AdminPanel';
import EmployerProfile from './pages/EmployerProfile';
import SystemDiagnosticsPage from './pages/SystemDiagnosticsPage';
import { PublicRoutes } from './routes/publicRoutes';
import EmployerRoutes from './routes/employerRoutes';
import EntrepreneurshipAcademy from './pages/EntrepreneurshipAcademy';
import NotFound from './pages/NotFound';
import ForEmployers from './pages/ForEmployers';
import JobPostingPage from './pages/employer/JobPostingPage';

function App() {
  // We'll use the useAuth hook inside the Routes component to avoid circular dependency
  return (
    <div className="app">
      <SecurityProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SecurityProvider>
    </div>
  );
}

// Create a separate component to use useAuth hook after AuthProvider is loaded
function AppContent() {
  const { user } = useAuth();

  return (
    <NotificationsProvider user={user}>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/employer-dashboard" element={<Layout><EmployerDashboard /></Layout>} />
        <Route path="/employer-profile" element={<Layout><EmployerProfile /></Layout>} />
        <Route path="/for-employers" element={<Layout><ForEmployers /></Layout>} />
        <Route path="/employer" element={<Layout><ForEmployers /></Layout>} />
        <Route path="/post-job" element={<Layout><JobPostingPage /></Layout>} />
        <Route path="/jobs" element={<Layout><EnhancedJobListings /></Layout>} />
        <Route path="/jobs/:jobId" element={<Layout><JobDetailsPage /></Layout>} />
        <Route path="/ceo-portal" element={<Layout><CeoPortal /></Layout>} />
        <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
        <Route path="/admin" element={<Layout><AdminPanel /></Layout>} />
        <Route path="/admin/*" element={<Layout><AdminPanel /></Layout>} />
        <Route path="/system-diagnostics" element={<Layout><SystemDiagnosticsPage /></Layout>} />
        <Route path="/entrepreneurship-academy" element={<Layout><EntrepreneurshipAcademy /></Layout>} />
        
        {/* Include all employer routes */}
        {EmployerRoutes}
        
        {/* Include all public routes */}
        {PublicRoutes}
        
        {/* 404 page for unmatched routes */}
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </NotificationsProvider>
  );
}

export default App;
