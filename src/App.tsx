
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationsProvider } from '@/contexts/notifications/NotificationsProvider';
import { Toaster } from '@/components/ui/toaster';
import HomeRoutes from '@/routes/homeRoutes';
import { AuthRoutes } from '@/routes/authRoutes';
import { AdminRoutes } from '@/routes/adminRoutes';
import { JobSeekerRoutes } from '@/routes/jobSeekerRoutes';
import { EmployerRoutes } from '@/routes/employerRoutes';
import SharedRoutes from '@/routes/sharedRoutes';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <Routes>
              {HomeRoutes}
              {AuthRoutes}
              {AdminRoutes}
              {JobSeekerRoutes}
              {EmployerRoutes}
              {SharedRoutes}
            </Routes>
            <Toaster />
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
