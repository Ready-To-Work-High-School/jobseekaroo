
import { Route } from 'react-router-dom';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Faq from '@/pages/FAQ';
import JobListings from '@/pages/JobListings';
import EnhancedJobListings from '@/pages/EnhancedJobListings';
import JobDetails from '@/pages/JobDetails';
import ForEmployers from '@/pages/ForEmployers';
import EmployerPremiumServices from '@/pages/EmployerPremiumServices';
import Resources from '@/pages/Resources';
import JobHelp from '@/pages/JobHelp';
import RadixDemo from '@/pages/RadixDemo';
import License from '@/pages/License';
import FirstJobToolkit from '@/pages/FirstJobToolkit';
import FirstJobBootcamp from '@/pages/FirstJobBootcamp';
import EntrepreneurshipAcademy from '@/pages/EntrepreneurshipAcademy';

export const PublicRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/jobs" element={<JobListings />} />
    <Route path="/enhanced-jobs" element={<EnhancedJobListings />} />
    <Route path="/job/:id" element={<JobDetails />} />
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/employers" element={<ForEmployers />} /> {/* Add this route as an alias */}
    <Route path="/employer-premium" element={<EmployerPremiumServices />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/job-help" element={<JobHelp />} />
    <Route path="/radix-demo" element={<RadixDemo />} />
    <Route path="/license" element={<License />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
    <Route path="/employee-toolkit" element={<FirstJobToolkit />} /> {/* Alias for the FirstJobToolkit */}
    <Route path="/first-job-bootcamp" element={<FirstJobBootcamp />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} /> {/* Our Program */}
    <Route path="/our-program" element={<EntrepreneurshipAcademy />} /> {/* Alias for Our Program */}
  </>
);

export default PublicRoutes;
