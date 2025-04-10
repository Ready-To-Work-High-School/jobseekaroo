import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import SavedJobs from './pages/SavedJobs';
import Applications from './pages/Applications';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthCallback from './pages/AuthCallback';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import EnhancedJobListings from './pages/EnhancedJobListings';
import MobileJobSwipe from './components/mobile/MobileJobSwipe';
import { useIsMobile } from './hooks/use-mobile';
import MobileLayout from './components/MobileLayout';
import UserOnboardingGuide from './components/onboarding/UserOnboardingGuide';

const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Contact = lazy(() => import('./pages/Contact'));
const About = lazy(() => import('./pages/About'));

function App() {
  const isMobile = useIsMobile();
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <ThemeProvider defaultTheme="light">
          {/* Wrap the routes in the appropriate layout based on device */}
          {isMobile ? (
            <MobileLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<EnhancedJobListings />} />
                <Route path="/jobs/:jobId" element={<JobDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                <Route path="/mobile/jobs" element={<MobileJobSwipe />} />
                <Route path="/terms" element={<Suspense fallback={<div>Loading...</div>}><TermsOfService /></Suspense>} />
                <Route path="/privacy" element={<Suspense fallback={<div>Loading...</div>}><PrivacyPolicy /></Suspense>} />
                <Route path="/contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
                <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
              </Routes>
            </MobileLayout>
          ) : (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<EnhancedJobListings />} />
                <Route path="/jobs/:jobId" element={<JobDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                <Route path="/mobile/jobs" element={<MobileJobSwipe />} />
                <Route path="/terms" element={<Suspense fallback={<div>Loading...</div>}><TermsOfService /></Suspense>} />
                <Route path="/privacy" element={<Suspense fallback={<div>Loading...</div>}><PrivacyPolicy /></Suspense>} />
                <Route path="/contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
                <Route path="/about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
              </Routes>
              <UserOnboardingGuide />
            </>
          )}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
