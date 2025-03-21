import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';

// Import main page components directly
import Index from './pages/Index';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

// Lazy load all other pages
const JobListings = lazy(() => import('./pages/JobListings'));
const Skills = lazy(() => import('./pages/Skills'));
const InterviewPrep = lazy(() => import('./pages/InterviewPrep'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const Resources = lazy(() => import('./pages/Resources'));
const ForEmployers = lazy(() => import('./pages/ForEmployers'));
const EmployerDashboard = lazy(() => import('./pages/EmployerDashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Profile = lazy(() => import('./pages/Profile'));
const Applications = lazy(() => import('./pages/Applications'));
const ResumeAssistant = lazy(() => import('./pages/ResumeAssistant'));
const SavedJobs = lazy(() => import('./pages/SavedJobs'));
const FAQ = lazy(() => import('./pages/FAQ'));
const SuccessStories = lazy(() => import('./pages/SuccessStories'));
const License = lazy(() => import('./pages/License'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationsProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/resume-assistant" element={<ResumeAssistant />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/license" element={<License />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </NotificationsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
