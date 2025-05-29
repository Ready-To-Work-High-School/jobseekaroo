
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from './MobileMenu';
import DesktopNav from './DesktopNav';
import { NavbarBrand } from './NavbarBrand';
import { NavbarRight } from './NavbarRight';
import { useAuth } from '@/contexts/AuthContext';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdminStatus } from '@/hooks/useAdminStatus';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [atTop, setAtTop] = useState(true);
  const { userProfile } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();

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
          
          {/* Hidden Shield - visible to all users but subtle */}
          <div className="relative group">
            <Link
              to="/ceo-portal"
              className="flex items-center justify-center h-8 w-8 rounded-full opacity-40 hover:opacity-100 transition-all duration-500 ease-in-out transform hover:scale-110"
              aria-label="Hidden Access"
            >
              {/* Gradient background with glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-80 blur-sm group-hover:blur-none transition-all duration-300"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400"></div>
              <Shield className="h-4 w-4 text-white relative z-10" />
            </Link>
            
            {/* Subtle pulse animation on hover */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-300"></div>
          </div>
          
          <DesktopNav className="hidden md:flex" />
        </div>

        <NavbarRight />
      </div>
    </header>
  );
};

export default Navbar;
