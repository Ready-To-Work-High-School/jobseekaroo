
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/Layout';
import AdminPanel from '../pages/AdminPanel';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUserManagement from '../pages/AdminUserManagement';
import AdminRedemptionCodes from '../pages/AdminRedemptionCodes';
import AdminMessageModeration from '../pages/AdminMessageModeration';
import AdminPremiumManagement from '../pages/AdminPremiumManagement';
import AdminJobManagement from '../pages/AdminJobManagement';
import CeoPortal from '../pages/CeoPortal';

export const AdminRoutes = (
  <>
    {/* Admin routes */}
    <Route path="/admin" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminPanel />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/dashboard" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminDashboard />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/users" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminUserManagement />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/redemption-codes" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminRedemptionCodes />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/message-moderation" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminMessageModeration />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/premium" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminPremiumManagement />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/job-management" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminJobManagement />
        </Layout>
      </ProtectedRoute>
    } />
    <Route path="/admin/job-catalog" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <AdminJobManagement />
        </Layout>
      </ProtectedRoute>
    } />
    {/* CEO Portal route */}
    <Route path="/ceo-portal" element={
      <ProtectedRoute adminOnly>
        <Layout>
          <CeoPortal />
        </Layout>
      </ProtectedRoute>
    } />
  </>
);

export default AdminRoutes;
