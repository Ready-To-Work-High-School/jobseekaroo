
import { Route } from 'react-router-dom';
import { PublicRoutes } from './publicRoutes';
import { AuthRoutes } from './authRoutes';
import { JobSeekerRoutes } from './jobSeekerRoutes';
import { EmployerRoutes } from './employerRoutes';
import { AdminRoutes } from './adminRoutes';
import NotFound from '../pages/NotFound';

export const AppRoutes = (
  <>
    {PublicRoutes}
    {AuthRoutes}
    {JobSeekerRoutes}
    {EmployerRoutes}
    {AdminRoutes}
    
    {/* Catch all route */}
    <Route path="*" element={<NotFound />} />
  </>
);
