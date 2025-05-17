
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import PasswordReset from '../pages/PasswordReset';
import PasswordResetConfirmation from '../pages/PasswordResetConfirmation';

const AuthRoutes = (
  <>
    <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
    <Route path="/signin" element={<Layout><SignIn /></Layout>} />
    <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
    <Route path="/signup" element={<Layout><SignUp /></Layout>} />
    <Route path="/password-reset" element={<Layout><PasswordReset /></Layout>} />
    <Route path="/password-reset/confirmation" element={<Layout><PasswordResetConfirmation /></Layout>} />
  </>
);

export default AuthRoutes;
