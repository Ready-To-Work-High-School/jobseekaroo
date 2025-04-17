import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from 'react-error-boundary'

// Import pages
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EmployerSignUp from './pages/EmployerSignUp';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUs';
import FirstJobToolkit from './pages/FirstJobToolkit';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrep from './pages/InterviewPrep';
import JobSimulations from './pages/JobSimulations';
import SimulationDetail from './pages/SimulationDetail';
import SkillDevelopment from './pages/SkillDevelopment';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RedemptionCodeManagement from './pages/admin/RedemptionCodeManagement';
import ContentModeration from './pages/admin/ContentModeration';
import StudentDashboard from './pages/StudentDashboard';
import EmployerLanding from './pages/EmployerLanding';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/PostJob';
import EmployerAnalytics from './pages/employer/EmployerAnalytics';
import Messages from './pages/Messages';
import ConversationDetail from './pages/ConversationDetail';
import AuthCallback from './pages/AuthCallback';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Support from './pages/Support';
import FAQ from './pages/FAQ';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFound';
import CopyProtection from './components/CopyProtection';
import PersonalizedAssessment from './pages/PersonalizedAssessment';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <ErrorBoundary>
            <div className="min-h-screen flex flex-col">
              <CopyProtection />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/register/employer" element={<EmployerSignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
                <Route path="/resume-builder" element={<ResumeBuilder />} />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/job-simulations" element={<JobSimulations />} />
                <Route path="/job-simulations/:id" element={<SimulationDetail />} />
                <Route path="/skill-development" element={<SkillDevelopment />} />
                <Route path="/assessment" element={<PersonalizedAssessment />} />
                {/* Add new route for personalized assessment */}
                
                {/* Admin routes */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UserManagement />} />
                <Route path="/admin/redemption" element={<RedemptionCodeManagement />} />
                <Route path="/admin/moderation" element={<ContentModeration />} />
                
                {/* Student dashboard */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                
                {/* Employer routes */}
                <Route path="/employer" element={<EmployerLanding />} />
                <Route path="/employer/dashboard" element={<EmployerDashboard />} />
                <Route path="/employer/post-job" element={<PostJob />} />
                <Route path="/employer/analytics" element={<EmployerAnalytics />} />
                
                {/* Message center */}
                <Route path="/messages" element={<Messages />} />
                <Route path="/messages/:id" element={<ConversationDetail />} />
                
                {/* Auth callback routes */}
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Privacy and terms */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                
                {/* Support */}
                <Route path="/support" element={<Support />} />
                <Route path="/faq" element={<FAQ />} />
                
                {/* Error pages */}
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
