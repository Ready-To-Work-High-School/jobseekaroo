
import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import SignUpPrompt from './auth/SignUpPrompt';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout = ({ children, hideAuthLinks }: LayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideAuthLinks={hideAuthLinks} />
      <main className="flex-grow">
        {children}
      </main>
      {!user && <SignUpPrompt autoDismiss={false} />}
      <Footer />
    </div>
  );
};

export default Layout;
