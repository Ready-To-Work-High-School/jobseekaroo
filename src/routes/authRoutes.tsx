
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
import VerifyIdentity from '../pages/VerifyIdentity';

export const AuthRoutes = (
  <>
    {/* Authentication routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/signin" element={<SignIn />} /> {/* Alias route for /signin without hyphen */}
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/signup" element={<SignUp />} /> {/* Alias route for /signup without hyphen */}
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/redeem-code" element={<RedemptionCode />} />
    <Route path="/verify-identity" element={<VerifyIdentity />} />
    
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
