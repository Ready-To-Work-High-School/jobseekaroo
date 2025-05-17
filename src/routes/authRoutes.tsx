
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import AuthCallback from '../pages/AuthCallback';
import ProfileEdit from '../pages/ProfileEdit';
import Login from '../pages/Login';

const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/sign-up" element={<SignUp />} /> {/* Adding both routes to ensure all links work */}
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/profile/edit" element={<ProfileEdit />} />
    <Route path="/auth/login" element={<Login />} />
  </>
);

export default AuthRoutes;
