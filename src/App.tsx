
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Applications from './pages/Applications';
import Skills from './pages/Skills';
import ResumeAssistant from './pages/ResumeAssistant';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrep from './pages/InterviewPrep';
import SavedJobs from './pages/SavedJobs';
import Analytics from './pages/Analytics';
import Resources from './pages/Resources';
import EntrepreneurshipAcademy from './pages/EntrepreneurshipAcademy';
import Notifications from './pages/Notifications';
import ForEmployers from './pages/ForEmployers';
import EnhancedJobListings from './pages/EnhancedJobListings';
import SuccessStories from './pages/SuccessStories';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import AccountBenefits from './pages/AccountBenefits';
import FAQ from './pages/FAQ';
import RedemptionCode from './pages/RedemptionCode';
import AdminRedemptionCodes from './pages/AdminRedemptionCodes';
import AdminUserManagement from './pages/AdminUserManagement';
import License from './pages/License';
import NotFound from './pages/NotFound';
import AuthCallback from './pages/AuthCallback';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import AdminMessageModeration from './pages/AdminMessageModeration';
import AdminPanel from './pages/AdminPanel';
import NetworkOfflineState from './components/auth/diagnostic/NetworkOfflineState';
import { ErrorBoundary } from './components/ErrorBoundary';
import MobileLayout from './components/MobileLayout';

function App() {
  const [loading, setLoading] = useState(true);
  const [networkIssue, setNetworkIssue] = useState(false);

  useEffect(() => {
    const checkConnectivity = async () => {
      if (!navigator.onLine) {
        setNetworkIssue(true);
        setLoading(false);
        return;
      }
      
      try {
        await fetch('https://accounts.google.com/gsi/status', { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache'
        });
        
        setNetworkIssue(false);
      } catch (err) {
        console.error("Network connectivity test failed:", err);
        setNetworkIssue(true);
      } finally {
        setLoading(false);
      }
    };

    const handleOnline = () => setNetworkIssue(false);
    const handleOffline = () => setNetworkIssue(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    checkConnectivity();
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (networkIssue) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <NetworkOfflineState />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <MobileLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/resume" element={<ResumeAssistant />} />
              <Route path="/resume/builder" element={<ResumeBuilder />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/enhanced-job-listings" element={<EnhancedJobListings />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/account-benefits" element={<AccountBenefits />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/redeem-code" element={<RedemptionCode />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/redemption-codes" element={<AdminRedemptionCodes />} />
              <Route path="/admin/user-management" element={<AdminUserManagement />} />
              <Route path="/admin/message-moderation" element={<AdminMessageModeration />} />
              <Route path="/license" element={<License />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MobileLayout>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
