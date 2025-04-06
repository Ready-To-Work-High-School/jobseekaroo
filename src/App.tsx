
import { BrowserRouter, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { NotificationsProvider } from '@/contexts/NotificationsContext';
import { Toaster } from '@/components/ui/toaster';
import { AppRoutes } from '@/routes';
import SidePanel from '@/components/layout/SidePanel';
import { useMediaQuery } from '@/hooks/use-mobile';
import MobileLayout from '@/components/MobileLayout';

function AppContent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <>
      {isMobile ? (
        <MobileLayout>
          <Routes>{AppRoutes}</Routes>
        </MobileLayout>
      ) : (
        <Routes>{AppRoutes}</Routes>
      )}
      <Toaster />
      <SidePanel />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationsProvider>
            <AppContent />
          </NotificationsProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
