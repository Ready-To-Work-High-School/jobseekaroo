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
import EncryptionServiceTest from './components/EncryptionServiceTest';

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
          <Routes>
            <Route path="/" element={<MobileLayout><Index /></MobileLayout>} />
            <Route path="/sign-in" element={<MobileLayout><SignIn /></MobileLayout>} />
            <Route path="/sign-up" element={<MobileLayout><SignUp /></MobileLayout>} />
            <Route path="/forgot-password" element={<MobileLayout><ForgotPassword /></MobileLayout>} />
            <Route path="/reset-password" element={<MobileLayout><ResetPassword /></MobileLayout>} />
            <Route path="/jobs" element={<MobileLayout><JobListings /></MobileLayout>} />
            <Route path="/jobs/:id" element={<MobileLayout><JobDetails /></MobileLayout>} />
            <Route path="/dashboard" element={<MobileLayout><Dashboard /></MobileLayout>} />
            <Route path="/applications" element={<MobileLayout><Applications /></MobileLayout>} />
            <Route path="/skills" element={<MobileLayout><Skills /></MobileLayout>} />
            <Route path="/resume" element={<MobileLayout><ResumeAssistant /></MobileLayout>} />
            <Route path="/resume/builder" element={<MobileLayout><ResumeBuilder /></MobileLayout>} />
            <Route path="/interview-prep" element={<MobileLayout><InterviewPrep /></MobileLayout>} />
            <Route path="/saved-jobs" element={<MobileLayout><SavedJobs /></MobileLayout>} />
            <Route path="/analytics" element={<MobileLayout><Analytics /></MobileLayout>} />
            <Route path="/resources" element={<MobileLayout><Resources /></MobileLayout>} />
            <Route path="/entrepreneurship-academy" element={<MobileLayout><EntrepreneurshipAcademy /></MobileLayout>} />
            <Route path="/notifications" element={<MobileLayout><Notifications /></MobileLayout>} />
            <Route path="/for-employers" element={<MobileLayout><ForEmployers /></MobileLayout>} />
            <Route path="/enhanced-job-listings" element={<MobileLayout><EnhancedJobListings /></MobileLayout>} />
            <Route path="/success-stories" element={<MobileLayout><SuccessStories /></MobileLayout>} />
            <Route path="/profile" element={<MobileLayout><Profile /></MobileLayout>} />
            <Route path="/employer-dashboard" element={<MobileLayout><EmployerDashboard /></MobileLayout>} />
            <Route path="/account-benefits" element={<MobileLayout><AccountBenefits /></MobileLayout>} />
            <Route path="/faq" element={<MobileLayout><FAQ /></MobileLayout>} />
            <Route path="/redeem-code" element={<MobileLayout><RedemptionCode /></MobileLayout>} />
            <Route path="/admin" element={<MobileLayout><AdminPanel /></MobileLayout>} />
            <Route path="/admin/redemption-codes" element={<MobileLayout><AdminRedemptionCodes /></MobileLayout>} />
            <Route path="/admin/user-management" element={<MobileLayout><AdminUserManagement /></MobileLayout>} />
            <Route path="/admin/message-moderation" element={<MobileLayout><AdminMessageModeration /></MobileLayout>} />
            <Route path="/license" element={<MobileLayout><License /></MobileLayout>} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/messages" element={<MobileLayout><Messages /></MobileLayout>} />
            <Route path="*" element={<MobileLayout><NotFound /></MobileLayout>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
