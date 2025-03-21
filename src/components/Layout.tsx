
import { ReactNode } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full">
        <div className="container-custom py-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
