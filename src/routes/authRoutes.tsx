
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import RedemptionCode from '../pages/RedemptionCode';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminToggle from '../components/admin/AdminToggle';

export const AuthRoutes = (
  <>
    {/* Authentication routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/redeem-code" element={<RedemptionCode />} />
    
    {/* Admin toggle for testing */}
    <Route path="/admin-toggle" element={
      <ProtectedRoute>
        <Layout>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
            <AdminToggle />
          </div>
        </Layout>
      </ProtectedRoute>
    } />
  </>
);
