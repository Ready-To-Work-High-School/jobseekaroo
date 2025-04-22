
import { SchoolRoutes } from './schoolRoutes';
import { ProtectedRoutes } from './protectedRoutes';
import { PublicRoutes } from './publicRoutes';
import { AdminRoutes } from './adminRoutes';
import HomeRoutes from './homeRoutes';

// Combine all routes
const AppRoutes = (
  <>
    {HomeRoutes}
    {PublicRoutes}
    {ProtectedRoutes}
    {SchoolRoutes}
    {AdminRoutes}
  </>
);

export default AppRoutes;
