
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PlatformDisclaimer from './PlatformDisclaimer';
import { NotificationsProvider } from '@/contexts/NotificationsContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({
  children
}: LayoutProps) => {
  const location = useLocation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    // Show disclaimer on home, jobs, for-employers, and sign-in pages
    const pathsToShowDisclaimer = ['/', '/jobs', '/for-employers', '/sign-in'];
    setShowDisclaimer(pathsToShowDisclaimer.includes(location.pathname));
    
    // Scroll to top on page navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <NotificationsProvider>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
          {showDisclaimer && <PlatformDisclaimer />}
        </main>
        <Footer />
      </div>
    </NotificationsProvider>
  );
};

export default Layout;
