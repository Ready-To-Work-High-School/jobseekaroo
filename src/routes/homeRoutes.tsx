
import { lazy } from 'react';
import { Route } from 'react-router-dom';
import PlatformGuide from '@/pages/PlatformGuide';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Support from '@/pages/Support';
import HealthcarePathways from '@/pages/HealthcarePathways';
import StudentSuccess from '@/pages/StudentSuccess';
import CareerQuiz from '@/pages/CareerQuiz';
import PersonalizedAssessment from '@/pages/PersonalizedAssessment';
import UserProfileTabs from '@/pages/UserProfileTabs';
import EntrepreneurshipAcademy from '@/pages/EntrepreneurshipAcademy';
import NursingAcademy from '@/pages/NursingAcademy';

// We need to fix the missing page imports - using Home instead of HomePage, etc.
import Home from '@/pages/Home';
import About from '@/pages/Index'; // Using Index as a fallback for AboutPage
import Resources from '@/pages/Resources';
import MacquarieExternship from '@/pages/MacquarieExternship';
import VystarInternship from '@/pages/VystarInternship';
import SkillDevelopment from '@/pages/SkillDevelopment';
import CeoPortal from '@/pages/CeoPortal';
import FAQ from '@/pages/FAQ';

// Use lazy imports for larger components
const Jobs = lazy(() => import('@/pages/Jobs'));
const ForEmployers = lazy(() => import('@/pages/ForEmployers'));
const SchoolIntegration = lazy(() => import('@/pages/SchoolIntegration'));

// Create placeholder pages for missing components
const EmployerVerification = () => <div>Employer Verification Page</div>;
const ResourcesCatalog = () => <div>Resources Catalog Page</div>;
const SafetyCompliancePage = () => <div>Safety & Compliance Page</div>;
const BadgesPage = () => <div>Badges and Achievements</div>;

const HomeRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/school-integration" element={<SchoolIntegration />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/platform-guide" element={<PlatformGuide />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/support" element={<Support />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/employer-verification" element={<EmployerVerification />} />
    <Route path="/resources-catalog" element={<ResourcesCatalog />} />
    <Route path="/safety-compliance" element={<SafetyCompliancePage />} />
    <Route path="/programs/macquarie-externship" element={<MacquarieExternship />} />
    <Route path="/programs/healthcare-pathways" element={<HealthcarePathways />} />
    <Route path="/healthcare-pathways" element={<HealthcarePathways />} />
    <Route path="/programs/vystar-internship" element={<VystarInternship />} />
    <Route path="/skill-development" element={<SkillDevelopment />} />
    <Route path="/badges" element={<BadgesPage />} />
    <Route path="/ceo-portal" element={<CeoPortal />} />
    <Route path="/student-success" element={<StudentSuccess />} />
    <Route path="/career-quiz" element={<CareerQuiz />} />
    <Route path="/career-assessment" element={<CareerQuiz />} />
    <Route path="/personalized-assessment" element={<PersonalizedAssessment />} />
    <Route path="/profile-tabs" element={<UserProfileTabs />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
    <Route path="/nursing-academy" element={<NursingAcademy />} />
  </>
);

export default HomeRoutes;
