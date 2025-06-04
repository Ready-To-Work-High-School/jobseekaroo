
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onError={(error, errorInfo) => {
        console.error('Application error:', error, errorInfo);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
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
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
