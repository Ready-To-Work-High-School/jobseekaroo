import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from './utils/ErrorBoundary';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminRedemptionCodes from './pages/AdminRedemptionCodes';
import AdminMessageModeration from './pages/AdminMessageModeration';
import Skills from './pages/Skills';
import RedemptionCode from './pages/RedemptionCode';
import Resources from './pages/Resources';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import EmployerDashboard from './pages/EmployerDashboard';
import JobListings from './pages/JobListings';
import ResumeAssistant from './pages/ResumeAssistant';
import InterviewPrep from './pages/InterviewPrep';
import ForEmployers from './pages/ForEmployers';
import EnhancedJobListings from './pages/EnhancedJobListings';
import Analytics from './pages/Analytics';
import FAQ from './pages/FAQ';
import SuccessStories from './pages/SuccessStories';
import License from './pages/License';
import EntrepreneurshipAcademy from './pages/EntrepreneurshipAcademy';
import SavedJobs from './pages/SavedJobs';
import Messages from './pages/Messages';
import AuthCallback from './pages/AuthCallback';
import AdminToggle from './components/admin/AdminToggle';
import StudentSuccess from './pages/StudentSuccess';
import AdminPanel from './pages/AdminPanel';
import SpinnerExamples from './pages/SpinnerExamples';
import About from './pages/About';
import FirstJobBootcamp from './pages/FirstJobBootcamp';
import ParentalConsent from './pages/ParentalConsent';
import EmployerAnalytics from './pages/EmployerAnalytics';
import MobileBottomNav from './components/mobile/MobileBottomNav';
import FirstJobToolkit from './pages/FirstJobToolkit';

function App() {
  console.log('App component rendered');

  return <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Routes>
              {/* Public routes - accessible to everyone */}
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/license" element={<License />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/student-success" element={<StudentSuccess />} />
              <Route path="/spinners" element={<SpinnerExamples />} />
              <Route path="/first-job-bootcamp" element={<FirstJobBootcamp />} />
              <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
              <Route path="/parental-consent" element={<ParentalConsent />} />

              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/redeem-code" element={<RedemptionCode />} />
              
              {/* Admin toggle for testing */}
              <Route path="/admin-toggle" element={
                <ProtectedRoute>
                  <Layout>
                    <div className="container mx-auto px-4 py-8">
                      <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
                      <AdminToggle />
                    </div>
                  </Layout>
                </ProtectedRoute>
              } />
              
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
              
              {/* Employer routes */}
              <Route path="/employer-dashboard" element={
                <ProtectedRoute requiredRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/employer-analytics" element={
                <ProtectedRoute requiredRoles={['employer']}>
                  <EmployerAnalytics />
                </ProtectedRoute>
              } />
              
              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly>
                  <AdminPanel />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AdminUserManagement />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/redemption-codes" element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AdminRedemptionCodes />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/admin/message-moderation" element={
                <ProtectedRoute adminOnly>
                  <Layout>
                    <AdminMessageModeration />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNav />
            <Toaster />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>;
}

export default App;
