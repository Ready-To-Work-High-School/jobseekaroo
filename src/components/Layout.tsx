
import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';
import PlatformDisclaimer from './PlatformDisclaimer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  
  useEffect(() => {
    // Only show disclaimer on home, jobs, and for-employers pages
    // Exclude the sign-in page from showing the disclaimer
    const pathsToShowDisclaimer = ['/', '/jobs', '/for-employers'];
    setShowDisclaimer(pathsToShowDisclaimer.includes(location.pathname) && location.pathname !== '/sign-in');
  }, [location.pathname]);

  return (
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
  );
};

export default Layout;
