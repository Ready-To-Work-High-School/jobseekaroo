
import { Route } from 'react-router-dom';
import Resources from '@/pages/Resources';
import About from '@/pages/About';
import FAQ from '@/pages/FAQ';
import Contact from '@/pages/Contact';
import License from '@/pages/License';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import EnhancedJobListings from '@/pages/EnhancedJobListings';
import JobSimulations from '@/pages/JobSimulations';
import StudentSuccess from '@/pages/StudentSuccess';
import SchoolLanding from '@/pages/SchoolLanding';
import EntrepreneurshipAcademy from '@/pages/EntrepreneurshipAcademy';
import JobHelp from '@/pages/JobHelp';
import InterviewPrep from '@/pages/InterviewPrep';

const SharedRoutes = (
  <>
    <Route path="/resources" element={<Resources />} />
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/license" element={<License />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
    <Route path="/enhanced-job-listings" element={<EnhancedJobListings />} />
    <Route path="/job-simulations" element={<JobSimulations />} />
    <Route path="/student-success" element={<StudentSuccess />} />
    <Route path="/school-landing" element={<SchoolLanding />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
    <Route path="/job-help" element={<JobHelp />} />
    <Route path="/interview-prep" element={<InterviewPrep />} />
  </>
);

export default SharedRoutes;
