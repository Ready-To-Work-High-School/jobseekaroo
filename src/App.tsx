
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from './utils/ErrorBoundary';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import ServerDemo from './pages/ServerDemo';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <header className="bg-blue-600 dark:bg-blue-800 py-2 hidden sm:flex justify-center">
              <div className="container flex items-center justify-center">
                {/* Added blue-gold gradient glow around logo in header */}
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-500 opacity-75 blur-sm animate-pulse"></div>
                  <img 
                    src="/lovable-uploads/8587ce26-fbc1-463b-a0ef-e63f5fda9889.png" 
                    alt="JS4HS Logo" 
                    className="h-12 w-12 mr-3 relative z-10"
                  />
                </div>
                <h1 className="text-white text-xl font-bold">Job Seekers 4 High Schools</h1>
              </div>
            </header>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/server-demo" element={<ServerDemo />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute adminOnly={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
