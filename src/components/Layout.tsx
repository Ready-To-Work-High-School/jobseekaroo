
import React, { useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SignUpPrompt from './auth/SignUpPrompt';
import BackButton from './navigation/BackButton';
import UserOnboardingGuide from './onboarding/UserOnboardingGuide';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const user = null;
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    console.log('Layout mounted with pathname:', location.pathname);
    return () => console.log('Layout unmounted from pathname:', location.pathname);
  }, [location.pathname]);

  console.log('Layout rendering, isHomePage:', isHomePage);

  return (
    <div className="min-h-screen flex flex-col">
      {console.log('Rendering Header')}
      <Header hideAuthLinks={hideAuthLinks} />
      <main className="flex-grow">
        {!isHomePage && (
          <div className="container mx-auto px-4 py-4">
            {console.log('Rendering BackButton')}
            <BackButton />
          </div>
        )}
        {console.log('Rendering Layout children')}
        {children}
      </main>
      {!user && <SignUpPrompt autoDismiss={true} dismissTime={3000} />}
      <UserOnboardingGuide />
      {console.log('Rendering Footer')}
      <Footer />
    </div>
  );
};

export default Layout;
