
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ResetPassword from '../pages/ResetPassword';
import ForgotPassword from '../pages/ForgotPassword';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ProfileEdit from '../pages/ProfileEdit';
import RedemptionCode from '../pages/RedemptionCode';
import EmployerSchoolDemo from '../pages/EmployerSchoolDemo';

const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/login" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/register" element={<SignUp />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
    <Route path="/profile/edit" element={
      <ProtectedRoute>
        <ProfileEdit />
      </ProtectedRoute>
    } />
    <Route path="/redemption-code" element={<RedemptionCode />} />
    <Route path="/demo" element={<EmployerSchoolDemo />} />
  </>
);

export default AuthRoutes;
