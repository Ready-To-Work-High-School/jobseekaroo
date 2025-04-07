
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Profile from './pages/Profile';
import EmployerDashboard from './pages/EmployerDashboard';
import Login from './pages/Login';
import { AppRoutes } from './routes';
import License from './pages/License';
import NotFound from './pages/NotFound';

const App = () => (
  <Routes>
    {/* Use AppRoutes from routes/index.tsx */}
    {AppRoutes}

    {/* Legacy routes that aren't yet moved to the routes folder */}
    <Route path="/login" element={<Login />} />
    <Route path="/license" element={<License />} />
    <Route path="/unauthorized" element={<div>Access Denied</div>} />
    <Route
      path="/profile"
      element={<ProtectedRoute><Profile /></ProtectedRoute>}
    />
    <Route
      path="/employer-dashboard"
      element={<ProtectedRoute requiredRoles={['employer', 'admin']}><EmployerDashboard /></ProtectedRoute>}
    />
    
    {/* Catch all route for 404s */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
