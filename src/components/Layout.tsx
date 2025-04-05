
import { ReactNode, useEffect, useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './layout/Header';
import Navbar from './Navbar';
import Footer from './layout/Footer';
import PlatformDisclaimer from './PlatformDisclaimer';
import { NotificationsProvider } from '@/contexts/NotificationsContext';
import SidePanel from './layout/SidePanel';
import MobileNavbar from './mobile/MobileNavbar';
import BackButton from './navigation/BackButton';
import BackToTopButton from './navigation/BackToTopButton';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps = {}) => {
  const location = useLocation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const isHomePage = location.pathname === '/';

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
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Only show back button if not on homepage */}
            {!isHomePage && (
              <div className="pt-4 pb-2">
                <BackButton />
              </div>
            )}
            {children || <Outlet />}
          </div>
          {showDisclaimer && <PlatformDisclaimer />}
          <SidePanel />
          <BackToTopButton />
        </main>
        <Footer />
        <MobileNavbar />
      </div>
    </NotificationsProvider>
  );
};

export default Layout;
