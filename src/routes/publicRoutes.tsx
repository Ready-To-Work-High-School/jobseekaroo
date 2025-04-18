import { Route } from 'react-router-dom';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import JobListings from '../pages/JobListings';
import EnhancedJobListings from '../pages/EnhancedJobListings';
import ContactUs from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import SampleCandidates from '../pages/SampleCandidates';
import CredentialsPage from '../pages/Credentials';
import NursingAcademy from '../pages/NursingAcademy';
import EntrepreneurshipAcademy from '../pages/EntrepreneurshipAcademy';
import FirstJobToolkit from '../pages/FirstJobToolkit';
import Resources from '../pages/Resources';
import SkillDevelopment from '../pages/SkillDevelopment';
import ForEmployers from '../pages/ForEmployers';
import ResumeAssistant from '../pages/ResumeAssistant';
import JobSimulations from '../pages/JobSimulations';
import SimulationDetail from '../pages/SimulationDetail';
import CareerQuiz from '../pages/CareerQuiz';
import PlatformGuide from '../pages/PlatformGuide';
import SchoolIntegration from '../pages/SchoolIntegration';

export const PublicRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/job-listings" element={<JobListings />} />
    <Route path="/jobs" element={<JobListings />} />
    <Route path="/job-search" element={<EnhancedJobListings />} />
    <Route path="/employer-info" element={<EnhancedJobListings />} />
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/nursing-academy" element={<NursingAcademy />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
    <Route path="/skills-build" element={<EnhancedJobListings />} />
    <Route path="/skill-development" element={<SkillDevelopment />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/resume-assistant" element={<ResumeAssistant />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/waiting-list" element={<EnhancedJobListings />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/sample-candidates" element={<SampleCandidates />} />
    <Route path="/credentials" element={<CredentialsPage />} />
    <Route path="/job-simulations" element={<JobSimulations />} />
    <Route path="/job-simulations/:id" element={<SimulationDetail />} />
    <Route path="/career-quiz" element={<CareerQuiz />} />
    <Route path="/platform-guide" element={<PlatformGuide />} />
    <Route path="/school-integration" element={<SchoolIntegration />} />
  </>
);
