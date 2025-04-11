
import { Route } from 'react-router-dom';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import License from '@/pages/License';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import EnhancedJobListings from '@/pages/EnhancedJobListings';
import JobSimulations from '@/pages/JobSimulations';
import SimulationDetail from '@/pages/SimulationDetail';
import UserCredentials from '@/pages/UserCredentials';
import StudentSuccess from '@/pages/StudentSuccess';
import SchoolLanding from '@/pages/SchoolLanding';
import EntrepreneurshipAcademy from '@/pages/EntrepreneurshipAcademy';
import JobHelp from '@/pages/JobHelp';
import InterviewPrep from '@/pages/InterviewPrep';
import HealthcarePathways from '@/pages/HealthcarePathways';
import PlatformGuide from '@/pages/PlatformGuide';
import SkillDevelopment from '@/pages/SkillDevelopment';
import ResumeAssistant from '@/pages/ResumeAssistant';
import SafetyCompliance from '@/pages/SafetyCompliance';
import SchoolIntegration from '@/pages/SchoolIntegration';
import AnalyticsDashboard from '@/pages/AnalyticsDashboard';
import CommunicationTools from '@/pages/CommunicationTools';
import PremiumServices from '@/pages/PremiumServices';

const SharedRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/license" element={<License />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
    <Route path="/enhanced-job-listings" element={<EnhancedJobListings />} />
    <Route path="/job-simulations" element={<JobSimulations />} />
    <Route path="/job-simulations/:id" element={<SimulationDetail />} />
    <Route path="/credentials" element={<UserCredentials />} />
    <Route path="/student-success" element={<StudentSuccess />} />
    <Route path="/school-landing" element={<SchoolLanding />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
    <Route path="/job-help" element={<JobHelp />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
    <Route path="/healthcare-pathways" element={<HealthcarePathways />} />
    <Route path="/platform-guide" element={<PlatformGuide />} />
    
    {/* Additional routes for platform features */}
    <Route path="/skill-development" element={<SkillDevelopment />} />
    <Route path="/resume-assistant" element={<ResumeAssistant />} />
    <Route path="/safety-compliance" element={<SafetyCompliance />} />
    <Route path="/school-integration" element={<SchoolIntegration />} />
    <Route path="/analytics" element={<AnalyticsDashboard />} />
    <Route path="/communication" element={<CommunicationTools />} />
    <Route path="/premium-services" element={<PremiumServices />} />
  </>
);

export default SharedRoutes;
