
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
    <Route path="/signin" element={<Layout><SignIn /></Layout>} />
    <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
    <Route path="/signup" element={<Layout><SignUp /></Layout>} />
    <Route path="/forgot-password" element={<Layout><ForgotPassword /></Layout>} />
    <Route path="/reset-password" element={<Layout><ResetPassword /></Layout>} />
  </>
);

export default AuthRoutes;
