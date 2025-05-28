
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/contexts/AuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import all page components
import Home from '@/pages/Home';
import JobListings from '@/pages/JobListings';
import JobDetailsPage from '@/pages/JobDetailsPage';
import JobDetail from '@/pages/JobDetail';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Applications from '@/pages/Applications';
import SavedJobs from '@/pages/SavedJobs';
import Messages from '@/pages/Messages';
import InterviewPrep from '@/pages/InterviewPrep';
import InterviewChecklist from '@/pages/InterviewChecklist';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import ContactUs from '@/pages/Contact';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import Resources from '@/pages/Resources';
import SkillDevelopment from '@/pages/SkillDevelopment';
import ForEmployers from '@/pages/ForEmployers';
import ResumeAssistant from '@/pages/ResumeAssistant';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import CareerQuiz from '@/pages/CareerQuiz';
import PlatformGuide from '@/pages/PlatformGuide';
import SchoolIntegration from '@/pages/SchoolIntegration';
import SchoolDashboard from '@/pages/SchoolDashboard';
import SchoolStudents from '@/pages/school/SchoolStudents';
import SchoolAnalytics from '@/pages/school/SchoolAnalytics';
import SchoolEvents from '@/pages/school/SchoolEvents';
import SchoolResources from '@/pages/school/SchoolResources';
import SchedulePage from '@/pages/SchedulePage';
import SchoolGuide from '@/pages/SchoolGuide';
import SafetyCompliance from '@/pages/SafetyCompliance';
import StudentSuccess from '@/pages/StudentSuccess';
import PersonalizedAssessment from '@/pages/PersonalizedAssessment';
import StudentDashboard from '@/pages/StudentDashboard';
import UserRepository from '@/pages/UserRepository';
import ErrorPage from '@/pages/ErrorPage';
import TestPage from '@/pages/TestPage';
import NotFound from '@/pages/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
              <Helmet>
                <title>Job Seekers 4 HS - Your First Job, Made Simple.</title>
                <meta name="description" content="A fun, safe, mobile-first app to land your first job, with badges and guidance. For high school students." />
              </Helmet>
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/interview-checklist" element={<InterviewChecklist />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/skill-development" element={<SkillDevelopment />} />
                <Route path="/for-employers" element={<ForEmployers />} />
                <Route path="/resume-assistant" element={<ResumeAssistant />} />
                <Route path="/job-simulations" element={<JobSimulations />} />
                <Route path="/job-simulations/:id" element={<SimulationDetail />} />
                <Route path="/career-quiz" element={<CareerQuiz />} />
                <Route path="/career-assessment" element={<CareerQuiz />} />
                <Route path="/personalized-assessment" element={<PersonalizedAssessment />} />
                <Route path="/platform-guide" element={<PlatformGuide />} />
                <Route path="/school-integration" element={<SchoolIntegration />} />
                <Route path="/school-dashboard" element={<SchoolDashboard />} />
                <Route path="/school/students" element={<SchoolStudents />} />
                <Route path="/school/analytics" element={<SchoolAnalytics />} />
                <Route path="/school/events" element={<SchoolEvents />} />
                <Route path="/school/resources" element={<SchoolResources />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/school-guide" element={<SchoolGuide />} />
                <Route path="/safety-compliance" element={<SafetyCompliance />} />
                <Route path="/student-success" element={<StudentSuccess />} />
                <Route path="/user-repository" element={<UserRepository />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
            <Sonner />
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
