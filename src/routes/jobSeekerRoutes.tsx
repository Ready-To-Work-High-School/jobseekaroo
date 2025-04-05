
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import JobListings from '../pages/JobListings';
import EnhancedJobListings from '../pages/EnhancedJobListings';
import ResumeAssistant from '../pages/ResumeAssistant';
import InterviewPrep from '../pages/InterviewPrep';
import Skills from '../pages/Skills';
import Analytics from '../pages/Analytics';
import SavedJobs from '../pages/SavedJobs';
import Messages from '../pages/Messages';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import MobileJobSwipe from '../components/mobile/MobileJobSwipe';

export const JobSeekerRoutes = (
  <>
    {/* Protected job seeker routes */}
    <Route path="/jobs" element={
      <ProtectedRoute>
        <JobListings />
      </ProtectedRoute>
    } />
    <Route path="/jobs/search" element={
      <ProtectedRoute>
        <EnhancedJobListings />
      </ProtectedRoute>
    } />
    <Route path="/resume-assistant" element={
      <ProtectedRoute>
        <ResumeAssistant />
      </ProtectedRoute>
    } />
    <Route path="/interview-prep" element={
      <ProtectedRoute>
        <InterviewPrep />
      </ProtectedRoute>
    } />
    <Route path="/skills" element={
      <ProtectedRoute>
        <Skills />
      </ProtectedRoute>
    } />
    <Route path="/analytics" element={
      <ProtectedRoute>
        <Analytics />
      </ProtectedRoute>
    } />
    <Route path="/saved-jobs" element={
      <ProtectedRoute>
        <SavedJobs />
      </ProtectedRoute>
    } />
    <Route path="/messages" element={
      <ProtectedRoute>
        <Messages />
      </ProtectedRoute>
    } />
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
    
    {/* New mobile-optimized routes */}
    <Route path="/mobile/jobs" element={
      <ProtectedRoute>
        <MobileJobSwipe />
      </ProtectedRoute>
    } />
  </>
);
