
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import JobListings from './pages/JobListings';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Applications from './pages/Applications';
import SavedJobs from './pages/SavedJobs';
import ResumeAssistant from './pages/ResumeAssistant';
import Analytics from './pages/Analytics';
import ForgotPassword from './pages/ForgotPassword';
import ResumeBuilder from './pages/ResumeBuilder';
import ForEmployers from './pages/ForEmployers';
import EmployerDashboard from './pages/EmployerDashboard';
import FAQ from './pages/FAQ';
import License from './pages/License';
import SuccessStories from './pages/SuccessStories';
import Resources from './pages/Resources';
import EntrepreneurshipAcademy from './pages/EntrepreneurshipAcademy';
import InterviewPrep from './pages/InterviewPrep';
import EnhancedJobListings from './pages/EnhancedJobListings';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import RedemptionCode from './pages/RedemptionCode';
import AccountBenefits from './pages/AccountBenefits';
import AdminRedemptionCodes from './pages/AdminRedemptionCodes';
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/enhanced-jobs" element={<EnhancedJobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/resume-assistant" element={<ResumeAssistant />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/for-employers" element={<ForEmployers />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/license" element={<License />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/redeem-code" element={<RedemptionCode />} />
          <Route path="/account-benefits" element={<AccountBenefits />} />
          <Route path="/admin/redemption-codes" element={<AdminRedemptionCodes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
