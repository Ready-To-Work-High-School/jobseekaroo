
import { Route } from 'react-router-dom';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import Jobs from '../pages/Jobs';
import JobListings from '../pages/JobListings';
import EmployerHome from '../pages/EmployerHome';
import ContactUs from '../pages/ContactUs';
import WaitingList from '../pages/WaitingList';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService';
import JobSearch from '../pages/JobSearch';
import SampleCandidates from '../pages/SampleCandidates';

export const PublicRoutes = (
  <>
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/jobs" element={<Jobs />} />
    <Route path="/job-search" element={<JobSearch />} />
    <Route path="/job-listings" element={<JobListings />} />
    <Route path="/employer" element={<EmployerHome />} />
    <Route path="/contact" element={<ContactUs />} />
    <Route path="/waiting-list" element={<WaitingList />} />
    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route path="/terms-of-service" element={<TermsOfService />} />
    <Route path="/sample-candidates" element={<SampleCandidates />} />
  </>
);
