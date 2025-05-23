
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';

// Placeholder auth components
const SignIn = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <p>Sign in page coming soon...</p>
    </div>
  </Layout>
);

const SignUp = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p>Sign up page coming soon...</p>
    </div>
  </Layout>
);

const AuthRoutes = [
  <Route key="signin" path="/sign-in" element={<SignIn />} />,
  <Route key="signup" path="/sign-up" element={<SignUp />} />
];

export default AuthRoutes;
