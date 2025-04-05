
import { Route } from 'react-router-dom';
import SchoolLanding from '../pages/SchoolLanding';
import EmployerPremiumServices from '../pages/EmployerPremiumServices';

const SharedRoutes = (
  <>
    <Route path="/employer-premium" element={<EmployerPremiumServices />} />
    <Route path="/school" element={<SchoolLanding />} />
  </>
);

export default SharedRoutes;
