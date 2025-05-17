
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import AuthCallback from '../pages/AuthCallback';
import ProfileEdit from '../pages/ProfileEdit';
import Login from '../pages/Login';
import Layout from '../components/Layout';

const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
    <Route path="/signin" element={<Layout><SignIn /></Layout>} /> {/* Adding both routes to ensure all links work */}
    <Route path="/signup" element={<Layout><SignUp /></Layout>} />
    <Route path="/sign-up" element={<Layout><SignUp /></Layout>} /> {/* Adding both routes to ensure all links work */}
    <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
    <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
    <Route path="/auth/callback" element={<Layout><AuthCallback /></Layout>} />
    <Route path="/profile/edit" element={<Layout><ProfileEdit /></Layout>} />
    <Route path="/auth/login" element={<Layout><Login /></Layout>} />
  </>
);

export default AuthRoutes;
