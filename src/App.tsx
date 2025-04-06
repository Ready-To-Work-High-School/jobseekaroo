
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import Login from './pages/Login'; // Import the Login component
import { AppRoutes } from './routes';

const App = () => (
  <Routes>
    {/* Use AppRoutes from routes/index.tsx */}
    {AppRoutes}

    {/* Legacy routes that aren't yet moved to the routes folder */}
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

export default App;
