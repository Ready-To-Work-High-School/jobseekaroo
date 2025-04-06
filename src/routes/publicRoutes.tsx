
import { Route } from 'react-router-dom';
import Contact from '../pages/Contact';
import About from '../pages/About';
import FAQ from '../pages/FAQ';
import ForEmployers from '../pages/ForEmployers';
import EntrepreneurshipAcademy from '../pages/EntrepreneurshipAcademy';
import License from '../pages/License';
import AuthCallback from '../pages/AuthCallback';
import StudentSuccess from '../pages/StudentSuccess';
import SpinnerExamples from '../pages/SpinnerExamples';
import FirstJobBootcamp from '../pages/FirstJobBootcamp';
import FirstJobToolkit from '../pages/FirstJobToolkit';
import ParentalConsent from '../pages/ParentalConsent';
import Index from '../pages/Index';
import EnhancedJobListings from '../pages/EnhancedJobListings';
import Pricing from '../components/Pricing';

export const PublicRoutes = (
  <>
    {/* Public routes - accessible to everyone */}
    <Route path="/" element={<Index />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/about" element={<About />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/for-employers" element={<ForEmployers />} />
    <Route path="/entrepreneurship-academy" element={<EntrepreneurshipAcademy />} />
    <Route path="/license" element={<License />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/student-success" element={<StudentSuccess />} />
    <Route path="/spinners" element={<SpinnerExamples />} />
    <Route path="/first-job-bootcamp" element={<FirstJobBootcamp />} />
    <Route path="/first-job-toolkit" element={<FirstJobToolkit />} />
    <Route path="/parental-consent" element={<ParentalConsent />} />
    <Route path="/jobs" element={<EnhancedJobListings />} />
    <Route path="/pricing" element={<Pricing />} />
  </>
);
