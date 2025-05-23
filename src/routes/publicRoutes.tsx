
import React from 'react';
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
import SchoolDashboard from '../pages/SchoolDashboard';
import SchoolStudents from '../pages/school/SchoolStudents';
import SchoolAnalytics from '../pages/school/SchoolAnalytics';
import SchoolEvents from '../pages/school/SchoolEvents';
import SchoolResources from '../pages/school/SchoolResources';
import InterviewPrep from '../pages/InterviewPrep';
import SchedulePage from '@/pages/SchedulePage';
import SchoolGuide from '../pages/SchoolGuide';
import SafetyCompliance from '../pages/SafetyCompliance';
import StudentSuccess from '../pages/StudentSuccess';
import PersonalizedAssessment from '../pages/PersonalizedAssessment';

export const PublicRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/job-listings" element={<JobListings />} />
    <Route path="/jobs" element={<JobListings />} />
    <Route path="/job-search" element={<EnhancedJobListings />} />
    <Route path="/employer-info" element={<EnhancedJobListings />} />
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
    <Route path="/skills-build" element={<SkillDevelopment />} />
    <Route path="/skill-development" element={<SkillDevelopment />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/resume-assistant" element={<ResumeAssistant />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/waiting-list" element={<EnhancedJobListings />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms" element={<TermsOfService />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/sample-candidates" element={<SampleCandidates />} />
    <Route path="/credentials" element={<CredentialsPage />} />
    <Route path="/job-simulations" element={<JobSimulations />} />
    <Route path="/job-simulations/:id" element={<SimulationDetail />} />
    <Route path="/career-quiz" element={<CareerQuiz />} />
    <Route path="/career-assessment" element={<CareerQuiz />} />
    <Route path="/personalized-assessment" element={<PersonalizedAssessment />} />
    <Route path="/platform-guide" element={<PlatformGuide />} />
    <Route path="/school-integration" element={<SchoolIntegration />} />
    <Route path="/school-dashboard" element={<SchoolDashboard />} />
    <Route path="/interview-questions" element={<InterviewPrep />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
    <Route path="/school-guide" element={<SchoolGuide />} />
    <Route path="/safety-compliance" element={<SafetyCompliance />} />
    <Route path="/student-success" element={<StudentSuccess />} />
    
    <Route path="/school/students" element={<SchoolStudents />} />
    <Route path="/school/analytics" element={<SchoolAnalytics />} />
    <Route path="/school/events" element={<SchoolEvents />} />
    <Route path="/school/resources" element={<SchoolResources />} />
    <Route path="/schedule" element={<SchedulePage />} />
  </>
);
