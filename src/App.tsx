
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { SkillsProvider } from '@/contexts/SkillsContext';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import JobListings from '@/pages/JobListings';
import SavedJobs from '@/pages/SavedJobs';
import Applications from '@/pages/Applications';
import JobDetails from '@/pages/JobDetails';
import Skills from '@/pages/Skills';
import EnhancedJobListings from '@/pages/EnhancedJobListings';
import ResumeAssistant from '@/pages/ResumeAssistant';
import NotFound from '@/pages/NotFound';
import Resources from '@/pages/Resources';
import ForEmployers from '@/pages/ForEmployers';
import InterviewPrep from '@/pages/InterviewPrep';
import SuccessStories from '@/pages/SuccessStories';
import FAQ from '@/pages/FAQ';
import EmployerDashboard from '@/pages/EmployerDashboard';
import ResumeBuilder from '@/pages/ResumeBuilder';
import Profile from '@/pages/Profile';
import Analytics from '@/pages/Analytics';
import ProtectedRoute from '@/components/ProtectedRoute';
import License from '@/pages/License';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SkillsProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/enhanced-jobs" element={<EnhancedJobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/resume-assistant" element={<ResumeAssistant />} />
              <Route path="/license" element={<License />} />
              
              {/* Protected Routes */}
              <Route path="/saved-jobs" element={<ProtectedRoute><SavedJobs /></ProtectedRoute>} />
              <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
              <Route path="/skills" element={<ProtectedRoute><Skills /></ProtectedRoute>} />
              <Route path="/employer-dashboard" element={<ProtectedRoute><EmployerDashboard /></ProtectedRoute>} />
              <Route path="/resume-builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <Toaster />
        </SkillsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
