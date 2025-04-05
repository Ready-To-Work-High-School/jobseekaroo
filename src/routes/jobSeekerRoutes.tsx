
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Notifications from '../pages/Notifications';
import JobAlerts from '../pages/JobAlerts';

export const JobSeekerRoutes = (
  <>
    {/* Notifications route */}
    <Route path="/notifications" element={
      <ProtectedRoute requiredRoles={['job_seeker']}>
        <Notifications />
      </ProtectedRoute>
    } />
    
    {/* Job Alerts route (for testing) */}
    <Route path="/job-alerts" element={
      <ProtectedRoute requiredRoles={['job_seeker', 'admin']}>
        <JobAlerts />
      </ProtectedRoute>
    } />
  </>
);
