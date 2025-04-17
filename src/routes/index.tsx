
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
console.log("Routes index loading");

// Export all routes as a JSX fragment for use in App.tsx
const AppRoutes = (
  <>
    {/* Home routes */}
    {console.log("Loading Home routes")}
    {HomeRoutes}
    
    {/* Public routes */}
    {console.log("Loading Public routes")}
    {PublicRoutes}
    
    {/* Auth routes */}
    {console.log("Loading Auth routes")}
    {AuthRoutes}
    
    {/* Protected routes - requires authentication */}
    {console.log("Loading Protected routes")}
    {ProtectedRoutes}
    
    {/* Job Seeker routes */}
    {console.log("Loading Job Seeker routes")}
    {JobSeekerRoutes}
    
    {/* Employer routes */}
    {console.log("Loading Employer routes")}
    {EmployerRoutes}
    
    {/* Admin routes */}
    {console.log("Loading Admin routes")}
    {AdminRoutes}
    
    {/* Shared routes */}
    {console.log("Loading Shared routes")}
    {SharedRoutes}
  </>
);

export default AppRoutes;
