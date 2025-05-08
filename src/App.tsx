
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { NotificationsProvider } from './contexts/notifications/NotificationsProvider';
import Navbar from './components/navbar/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import EnhancedJobListings from './pages/EnhancedJobListings';
import JobDetailsPage from './pages/JobDetailsPage';
import CeoPortal from './pages/CeoPortal';
import { useAuth } from './contexts/auth';
import Notifications from './pages/Notifications';

function App() {
  const { user } = useAuth();

  return (
    <div className="app">
      <AuthProvider>
        <NotificationsProvider user={user}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/employer-dashboard" element={<EmployerDashboard />} />
            <Route path="/jobs" element={<EnhancedJobListings />} />
            <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
            <Route path="/ceo-portal" element={<CeoPortal />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
          <Footer />
        </NotificationsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
