
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from './MobileMenu';
import DesktopNav from './DesktopNav';
import { NavbarBrand } from './NavbarBrand';
import { NavbarRight } from './NavbarRight';
import MainNavigation from '@/components/layout/MainNavigation';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import JobSeekers4HSBadge from '@/components/badges/JobSeekers4HSBadge';
import { motion } from 'framer-motion';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [atTop, setAtTop] = useState(true);
  const { userProfile } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  const [isScrolled, setIsScrolled] = useState(false);

  console.log('Navbar render - isAdmin:', isAdmin, 'isCeo:', isCeo);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md ${
        atTop ? 'border-b border-border/40' : 'border-b border-border shadow-sm'
      }`}
      role="banner"
      aria-label="Main navigation"
    >
      {/* JS4HS Badge - centered at the top */}
      <motion.div 
        className="absolute left-0 right-0 -top-6 md:-top-5 z-10 flex justify-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
      >
        <JobSeekers4HSBadge 
          variant="default"
          className="transform hover:scale-105 transition-transform duration-200"
        />
      </motion.div>
      
      <div className="container-custom flex h-16 items-center justify-between py-2 pt-6 md:pt-5">
        <div className="flex items-center gap-2 md:gap-6">
          {isMobile && <MobileMenu />}
          <NavbarBrand />
          
          {/* CEO Shield with improved visibility */}
          {isCeo && (
            <Link
              to="/ceo-portal"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 p-1.5 shadow-md hover:opacity-90 animate-pulse"
              aria-label="CEO Portal"
            >
              <Shield className="h-5 w-5 text-white" />
            </Link>
          )}
          
          {/* Admin badge - visible for admins who aren't CEOs */}
          {isAdmin && !isCeo && (
            <Link
              to="/admin"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-red-600 p-1.5 shadow-md hover:opacity-90"
              aria-label="Admin Panel"
            >
              <Shield className="h-5 w-5 text-white" />
            </Link>
          )}
          
          <MainNavigation className="hidden lg:flex" />
          <DesktopNav className="hidden md:flex lg:hidden" />
        </div>

        <NavbarRight />
      </div>
    </header>
  );
};

export default Navbar;
