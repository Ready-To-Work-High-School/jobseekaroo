
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import Login from './pages/Login'; // Import the Login component

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/unauthorized" element={<div>Access Denied</div>} />
    <Route
      path="/profile"
      element={<ProtectedRoute><Profile /></ProtectedRoute>}
    />
    <Route
      path="/employer-dashboard"
      element={<ProtectedRoute requiredRole="employer"><EmployerDashboard /></ProtectedRoute>}
    />
  </Routes>
);

export default App; // Make sure App is exported as default
