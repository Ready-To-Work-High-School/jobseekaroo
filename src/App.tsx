
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/auth/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from 'react-error-boundary';
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

// Simple error fallback component that doesn't use router hooks
const ErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
      <p className="mb-4">We're sorry, but something unexpected happened.</p>
      <button 
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
      >
        Try again
      </button>
      <button 
        onClick={() => window.location.href = '/'}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Go home
      </button>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Application error:', error, errorInfo);
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
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
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
