
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
import RadixDemo from '@/pages/RadixDemo'; // Add the new import

export const PublicRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/faq" element={<Faq />} />
    <Route path="/jobs" element={<JobListings />} />
    <Route path="/enhanced-jobs" element={<EnhancedJobListings />} />
    <Route path="/job/:id" element={<JobDetails />} />
    <Route path="/employers" element={<ForEmployers />} />
    <Route path="/employer-premium" element={<EmployerPremiumServices />} />
    <Route path="/resources" element={<Resources />} />
    <Route path="/job-help" element={<JobHelp />} />
    <Route path="/radix-demo" element={<RadixDemo />} /> {/* Add the new route */}
  </>
);

export default PublicRoutes;
