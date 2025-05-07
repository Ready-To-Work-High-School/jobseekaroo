
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import MobileBottomNavigation from './components/mobile/MobileBottomNavigation';
import AutoRecoveryErrorBoundary from './components/ErrorRecovery/AutoRecoveryErrorBoundary';
import DiagnosticMenuButton from './components/ErrorRecovery/DiagnosticMenuButton';
import ScrollToTop from './components/navigation/ScrollToTop';
import { motion } from 'framer-motion'; 

// Import all necessary route components
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Applications from './pages/Applications';
import ErrorPage from './pages/ErrorPage';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import SystemDiagnosticsPage from './pages/SystemDiagnosticsPage';
import NotFound from './pages/NotFound';
import SkillDevelopment from './pages/SkillDevelopment';
import InterviewPrep from './pages/InterviewPrep';
import EmployerAnalytics from './pages/EmployerAnalytics';
import EmployerPremiumServices from './pages/EmployerPremiumServices';
import PremiumServices from './pages/PremiumServices';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import SchoolGuide from './pages/SchoolGuide';
import SchoolIntegration from './pages/SchoolIntegration';
import Resources from './pages/Resources';
import PlatformGuide from './pages/PlatformGuide';
import ForEmployers from './pages/ForEmployers';
import SchedulePage from './pages/SchedulePage';
import TestPage from './pages/TestPage';
import Index from './pages/Index';
import HealthcarePathways from './pages/HealthcarePathways';
import StudentSuccess from './pages/StudentSuccess';
import CareerQuiz from './pages/CareerQuiz';
import PersonalizedAssessment from './pages/PersonalizedAssessment';
import SavedJobs from './pages/SavedJobs';

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AutoRecoveryErrorBoundary maxAutoRecoveryAttempts={2}>
        <TooltipProvider>
          <motion.div 
            className="min-h-screen flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollToTop />
            <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
              <DiagnosticMenuButton />
            </div>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
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
              <Route path="/index" element={<Index />} />
              <Route path="/about" element={<Index />} />
              <Route path="/programs/healthcare-pathways" element={<HealthcarePathways />} />
              <Route path="/healthcare-pathways" element={<HealthcarePathways />} />
              <Route path="/student-success" element={<StudentSuccess />} />
              <Route path="/career-quiz" element={<CareerQuiz />} />
              <Route path="/career-assessment" element={<CareerQuiz />} />
              <Route path="/personalized-assessment" element={<PersonalizedAssessment />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNavigation />
            <Toaster />
          </motion.div>
        </TooltipProvider>
      </AutoRecoveryErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
