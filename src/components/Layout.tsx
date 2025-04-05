
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export interface LayoutProps {
  children: React.ReactNode;
  hideAuthLinks?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideAuthLinks }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header hideAuthLinks={hideAuthLinks} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
