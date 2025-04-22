
import { SchoolRoutes } from './schoolRoutes';
import { ProtectedRoutes } from './protectedRoutes';
import { PublicRoutes } from './publicRoutes';
import { AdminRoutes } from './adminRoutes';

// Combine all routes
const AppRoutes = (
  <>
    {PublicRoutes}
    {ProtectedRoutes}
    {SchoolRoutes}
    {AdminRoutes}
  </>
);

export default AppRoutes;
