
import { Route } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

const SharedRoutes = (
  <>
    {/* Shared routes that can be accessed by all user types */}
    <Route path="*" element={<NotFound />} />
  </>
);

export default SharedRoutes;
