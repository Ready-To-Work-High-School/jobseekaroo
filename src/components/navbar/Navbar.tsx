
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

const Navbar = () => {
  const isMobile = useIsMobile();
  const [atTop, setAtTop] = useState(true);
  const { userProfile } = useAuth();
  
  // Check if user is admin (required for CEO status)
  const isAdmin = userProfile?.user_type === 'admin';
  
  // Specific CEO identifier - your email only
  const isCeoByEmail = userProfile?.email?.toLowerCase() === process.env.CEO_EMAIL;
  
  // Only show CEO icon if admin AND matches specific identifier
  const showCeoIcon = isAdmin && isCeoByEmail;

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY < 10);
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
      <div className="container-custom flex h-16 items-center justify-between py-2">
        <div className="flex items-center gap-2 md:gap-6">
          {isMobile && <MobileMenu />}
          <NavbarBrand />
          
          {/* CEO Shield - visible only for CEOs with Admin status */}
          {showCeoIcon && (
            <Link
              to="/ceo-portal"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-amber-400 p-1.5 shadow-md hover:opacity-90 animate-pulse-slow"
              aria-label="CEO Portal"
            >
              <Shield className="h-4 w-4 text-white" />
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
