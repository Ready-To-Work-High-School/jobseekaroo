import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Notifications from '../pages/Notifications';

export const JobSeekerRoutes = (
  <>
    {/* Add notifications route */}
    <Route path="/notifications" element={
      <ProtectedRoute requiredRoles={['job_seeker']}>
        <Notifications />
      </ProtectedRoute>
    } />
  </>
);
