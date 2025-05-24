
import { Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthRoutes = [
  <Route key="signin" path="/sign-in" element={<SignIn />} />,
  <Route key="signup" path="/signup" element={<SignUp />} />
];

export default AuthRoutes;
