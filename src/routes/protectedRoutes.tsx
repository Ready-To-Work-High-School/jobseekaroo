
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Messages from '../pages/Messages';
import AccountBenefits from '../pages/AccountBenefits';
import SavedJobs from '../pages/SavedJobs';
import Settings from '../pages/Settings';
import Resources from '../pages/Resources';

// Routes that require authentication to access
export const ProtectedRoutes = (
  <>
    <Route path="/dashboard" element={
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/profile" element={
      <ProtectedRoute>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/messages" element={
      <ProtectedRoute>
        <Layout>
          <Messages />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/account-benefits" element={
      <ProtectedRoute>
        <Layout>
          <AccountBenefits />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/saved-jobs" element={
      <ProtectedRoute>
        <Layout>
          <SavedJobs />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/settings" element={
      <ProtectedRoute>
        <Layout>
          <Settings />
        </Layout>
      </ProtectedRoute>
    } />
    
    <Route path="/resources" element={
      <ProtectedRoute>
        <Layout>
          <Resources />
        </Layout>
      </ProtectedRoute>
    } />
  </>
);
