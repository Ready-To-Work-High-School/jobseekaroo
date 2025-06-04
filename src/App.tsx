
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from '@/pages/ErrorPage';
import AppHeader from '@/components/app/AppHeader';

// Import pages
import Index from '@/pages/Index';
import Jobs from '@/pages/Jobs';
import JobDetail from '@/pages/JobDetail';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Applications from '@/pages/Applications';
import EmployerDashboard from '@/pages/employer/EmployerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';
import SchoolDashboard from '@/pages/SchoolDashboard';
import SystemDiagnosticsPage from '@/pages/SystemDiagnosticsPage';
import NotFound from '@/pages/NotFound';
import SkillDevelopment from '@/pages/SkillDevelopment';
import InterviewPrep from '@/pages/InterviewPrep';
import EmployerAnalytics from '@/pages/EmployerAnalytics';
import EmployerPremiumServices from '@/pages/EmployerPremiumServices';
import PremiumServices from '@/pages/PremiumServices';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import SchoolGuide from '@/pages/SchoolGuide';
import SchoolIntegration from '@/pages/SchoolIntegration';
import Resources from '@/pages/Resources';
import PlatformGuide from '@/pages/PlatformGuide';
import ForEmployers from '@/pages/ForEmployers';
import SchedulePage from '@/pages/SchedulePage';
import TestPage from '@/pages/TestPage';
import SavedJobs from '@/pages/SavedJobs';

// Create a simple error fallback that doesn't use hooks
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
    <p className="mb-4">We're having trouble loading the application. Please try again later.</p>
    <div className="flex gap-4">
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
      <a 
        href="/" 
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Go Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onError={(error, errorInfo) => {
            console.error('Application error:', error, errorInfo);
          }}
        >
          <div className="min-h-screen bg-background">
            <AppHeader />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/saved-jobs" element={<SavedJobs />} />
                <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/school-dashboard" element={<SchoolDashboard />} />
                <Route path="/system-diagnostics" element={<SystemDiagnosticsPage />} />
                <Route path="/skill-development" element={<SkillDevelopment />} />
                <Route path="/interview-prep" element={<InterviewPrep />} />
                <Route path="/employer-analytics" element={<EmployerAnalytics />} />
                <Route path="/premium-services" element={<PremiumServices />} />
                <Route path="/employer-premium" element={<EmployerPremiumServices />} />
                <Route path="/analytics" element={<AnalyticsDashboard />} />
                <Route path="/school-guide" element={<SchoolGuide />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/platform-guide" element={<PlatformGuide />} />
                <Route path="/for-employers" element={<ForEmployers />} />
                <Route path="/school-integration" element={<SchoolIntegration />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
