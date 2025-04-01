
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
import ServerDemo from './pages/ServerDemo';
import AdminDashboard from './pages/AdminDashboard';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminRedemptionCodes from './pages/AdminRedemptionCodes';
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

function App() {
  return <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Routes>
              {/* Public routes - accessible to everyone */}
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/server-demo" element={<ServerDemo />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/license" element={<License />} />
              <Route path="/auth/callback" element={<AuthCallback />} />

              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/redeem-code" element={<RedemptionCode />} />
              
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
              
              {/* Protected account routes */}
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
              <Route path="/account-benefits" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } />
              <Route path="/applications" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } />
              <Route path="/resume" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              } />
              
              {/* Employer routes */}
              <Route path="/employer-dashboard" element={
                <ProtectedRoute requiredRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              } />

              {/* Admin routes */}
              <Route path="/admin" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminUserManagement />
                </ProtectedRoute>
              } />
              <Route path="/admin/redemption-codes" element={
                <ProtectedRoute adminOnly={true}>
                  <AdminRedemptionCodes />
                </ProtectedRoute>
              } />

              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>;
}
export default App;
