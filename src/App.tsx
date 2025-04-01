
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
import ProtectedRoute from './components/ProtectedRoute';
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

function App() {
  return <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Authentication routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/redeem-code" element={<RedemptionCode />} />

              {/* Job seeker routes */}
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/search" element={<EnhancedJobListings />} />
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

              {/* Content pages */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/server-demo" element={<ServerDemo />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/skills" element={
                <ProtectedRoute>
                  <Skills />
                </ProtectedRoute>
              } />
              <Route path="/for-employers" element={<ForEmployers />} />
              <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/saved-jobs" element={<Layout />} />
              <Route path="/account-benefits" element={<Layout />} />
              <Route path="/applications" element={<Layout />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/license" element={<License />} />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/resume" element={<Layout />} />
              <Route path="/saved" element={<Layout />} />
              <Route path="/notifications" element={<Layout />} />

              {/* Protected routes */}
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
