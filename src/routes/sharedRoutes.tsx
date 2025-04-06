
import { Route } from 'react-router-dom';
import SchoolLanding from '../pages/SchoolLanding';
import EmployerPremiumServices from '../pages/EmployerPremiumServices';

const SharedRoutes = (
  <>
    <Route path="/employer-premium" element={<EmployerPremiumServices />} />
    <Route path="/school" element={<SchoolLanding />} />
    <Route path="/school/:slug" element={<SchoolLanding />} /> {/* Add support for /school/[slug] path */}
    <Route path="/" element={<SchoolLanding />} /> {/* SchoolLanding handles both school subdomains and main domain */}
  </>
);

export default SharedRoutes;
