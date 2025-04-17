
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

// Add console logging to debug route loading
console.log("Shared routes loaded");

// Export all routes as a JSX fragment for use in App.tsx
const AppRoutes = (
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
    
    {/* Add a catch-all route for 404 errors */}
    <Route path="*" element={<NotFound />} />
  </>
);

export default AppRoutes;
