
import { Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/Layout';
import AdminPanel from '../pages/AdminPanel';
import AdminDashboard from '../pages/AdminDashboard';
import AdminUserManagement from '../pages/AdminUserManagement';
import AdminRedemptionCodes from '../pages/AdminRedemptionCodes';
import AdminMessageModeration from '../pages/AdminMessageModeration';
import AdminPremiumManagement from '../pages/AdminPremiumManagement';

export const AdminRoutes = (
  <>
    {/* Admin routes */}
    <Route path="/admin" element={
      <ProtectedRoute adminOnly>
        <AdminPanel />
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
        <AdminPremiumManagement />
      </ProtectedRoute>
    } />
  </>
);
