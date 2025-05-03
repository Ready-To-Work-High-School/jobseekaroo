
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import AuthCallback from '../pages/AuthCallback';
import ProfileEdit from '../pages/ProfileEdit';
import Login from '../pages/Login';  // Import the Login component

const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
    <Route path="/auth/callback" element={<AuthCallback />} />
    <Route path="/profile/edit" element={<ProfileEdit />} />
    <Route path="/auth/login" element={<Login />} /> {/* Add route for /auth/login */}
  </>
);

export default AuthRoutes;
