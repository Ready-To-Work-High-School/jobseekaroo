
import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
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
import SchoolDashboard from '../pages/SchoolDashboard';
import SchoolStudents from '../pages/school/SchoolStudents';
import SchoolAnalytics from '../pages/school/SchoolAnalytics';
import SchoolEvents from '../pages/school/SchoolEvents';
import SchoolResources from '../pages/school/SchoolResources';
import InterviewPrep from '../pages/InterviewPrep';
import SchedulePage from '@/pages/SchedulePage';
import SchoolGuide from '../pages/SchoolGuide';
import SafetyCompliance from '../pages/SafetyCompliance';
import HealthcarePathways from '../pages/HealthcarePathways';
import StudentSuccess from '../pages/StudentSuccess';
import PersonalizedAssessment from '../pages/PersonalizedAssessment';
import RedemptionCode from '../pages/RedemptionCode';
import ParentalConsent from '../pages/ParentalConsent';
import ProfileEdit from '../pages/ProfileEdit';

export const PublicRoutes = (
  <>
    <Route path="/about" element={<Layout><About /></Layout>} />
    <Route path="/faq" element={<Layout><FAQ /></Layout>} />
    <Route path="/job-listings" element={<Layout><JobListings /></Layout>} />
    <Route path="/jobs" element={<Layout><JobListings /></Layout>} />
    <Route path="/job-search" element={<Layout><EnhancedJobListings /></Layout>} />
    <Route path="/employer-info" element={<Layout><EnhancedJobListings /></Layout>} />
    <Route path="/for-employers" element={<Layout><ForEmployers /></Layout>} />
    <Route path="/nursing-academy" element={<Layout><NursingAcademy /></Layout>} />
    <Route path="/entrepreneurship-academy" element={<Layout><EntrepreneurshipAcademy /></Layout>} />
    <Route path="/first-job-toolkit" element={<Layout><FirstJobToolkit /></Layout>} />
    <Route path="/skills-build" element={<Layout><SkillDevelopment /></Layout>} />
    <Route path="/skill-development" element={<Layout><SkillDevelopment /></Layout>} />
    <Route path="/resources" element={<Layout><Resources /></Layout>} />
    <Route path="/resume-assistant" element={<Layout><ResumeAssistant /></Layout>} />
    <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
    <Route path="/waiting-list" element={<Layout><EnhancedJobListings /></Layout>} />
    <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
    <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
    <Route path="/terms-of-service" element={<Layout><TermsOfService /></Layout>} />
    <Route path="/sample-candidates" element={<Layout><SampleCandidates /></Layout>} />
    <Route path="/credentials" element={<Layout><CredentialsPage /></Layout>} />
    <Route path="/job-simulations" element={<Layout><JobSimulations /></Layout>} />
    <Route path="/job-simulations/:id" element={<Layout><SimulationDetail /></Layout>} />
    <Route path="/career-quiz" element={<Layout><CareerQuiz /></Layout>} />
    <Route path="/career-assessment" element={<Layout><CareerQuiz /></Layout>} />
    <Route path="/personalized-assessment" element={<Layout><PersonalizedAssessment /></Layout>} />
    <Route path="/platform-guide" element={<Layout><PlatformGuide /></Layout>} />
    <Route path="/school-integration" element={<Layout><SchoolIntegration /></Layout>} />
    <Route path="/school-dashboard" element={<Layout><SchoolDashboard /></Layout>} />
    <Route path="/interview-questions" element={<Layout><InterviewPrep /></Layout>} />
    <Route path="/interview-prep" element={<Layout><InterviewPrep /></Layout>} />
    <Route path="/school-guide" element={<Layout><SchoolGuide /></Layout>} />
    <Route path="/safety-compliance" element={<Layout><SafetyCompliance /></Layout>} />
    <Route path="/programs/healthcare-pathways" element={<Layout><HealthcarePathways /></Layout>} />
    <Route path="/healthcare-pathways" element={<Layout><HealthcarePathways /></Layout>} />
    <Route path="/student-success" element={<Layout><StudentSuccess /></Layout>} />
    <Route path="/redemption-code" element={<Layout><RedemptionCode /></Layout>} />
    <Route path="/parental-consent" element={<Layout><ParentalConsent /></Layout>} />
    <Route path="/profile-edit" element={<Layout><ProfileEdit /></Layout>} />
    
    <Route path="/school/students" element={<Layout><SchoolStudents /></Layout>} />
    <Route path="/school/analytics" element={<Layout><SchoolAnalytics /></Layout>} />
    <Route path="/school/events" element={<Layout><SchoolEvents /></Layout>} />
    <Route path="/school/resources" element={<Layout><SchoolResources /></Layout>} />
    <Route path="/schedule" element={<Layout><SchedulePage /></Layout>} />
  </>
);
