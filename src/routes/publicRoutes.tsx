
import { Route } from 'react-router-dom';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import JobListings from '../pages/JobListings';
import EnhancedJobListings from '../pages/EnhancedJobListings';
import ContactUs from '../pages/Contact';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import SampleCandidates from '../pages/SampleCandidates';

export const PublicRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/job-listings" element={<JobListings />} />
    <Route path="/job-search" element={<EnhancedJobListings />} />
    <Route path="/employer" element={<EnhancedJobListings />} />
    <Route path="/for-employers" element={<EnhancedJobListings />} />
    <Route path="/nursing-academy" element={<EnhancedJobListings />} />
    <Route path="/entrepreneurship-academy" element={<EnhancedJobListings />} />
    <Route path="/skills-build" element={<EnhancedJobListings />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/waiting-list" element={<EnhancedJobListings />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/sample-candidates" element={<SampleCandidates />} />
    <Route path="/credentials" element={<EnhancedJobListings />} />
  </>
);
