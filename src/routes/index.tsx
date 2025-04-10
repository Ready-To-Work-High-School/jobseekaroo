
import { Route } from 'react-router-dom';
import HomeRoutes from './homeRoutes';
import { PublicRoutes } from './publicRoutes';
import AuthRoutes from './authRoutes';
import { ProtectedRoutes } from './protectedRoutes';
import { JobSeekerRoutes } from './jobSeekerRoutes';
import { EmployerRoutes } from './employerRoutes';
import { AdminRoutes } from './adminRoutes';
import SharedRoutes from './sharedRoutes';
import NotFound from '../pages/NotFound';

export const AppRoutes = (
  <>
    {/* Home routes */}
    {HomeRoutes}
    
    {/* Public routes */}
    {PublicRoutes}
    
    {/* Auth routes */}
    {AuthRoutes}
    
    {/* Protected routes - requires authentication */}
    {ProtectedRoutes}
    
    {/* Job Seeker routes */}
    {JobSeekerRoutes}
    
    {/* Employer routes */}
    {EmployerRoutes}
    
    {/* Admin routes */}
    {AdminRoutes}
    
    {/* Shared routes */}
    {SharedRoutes}
    
    {/* Catch all route - must be last */}
    <Route path="*" element={<NotFound />} />
  </>
);
