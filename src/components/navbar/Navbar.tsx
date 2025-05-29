
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

  // Only show CEO shield for verified admin users with CEO indicators
  const shouldShowCeoShield = isCeo && isAdmin && userProfile?.user_type === 'admin';

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
          <DesktopNav className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-4">
          {/* Hidden Shield - positioned between navigation and right side */}
          {shouldShowCeoShield && (
            <div className="relative group">
              <Link
                to="/ceo-portal"
                className="flex items-center justify-center h-10 w-10 rounded-full opacity-60 hover:opacity-100 transition-all duration-500 ease-in-out transform hover:scale-110 bg-gradient-to-tr from-purple-600/20 via-blue-500/20 to-amber-400/20 hover:from-purple-600 hover:via-blue-500 hover:to-amber-400 border border-purple-400/30 hover:border-amber-400/80"
                aria-label="Hidden Access Portal"
                title="Special Access"
              >
                <Shield className="h-5 w-5 text-purple-600 hover:text-white relative z-10 transition-colors duration-300" />
                
                {/* Subtle pulse animation on hover */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-amber-400 opacity-0 group-hover:opacity-30 group-hover:animate-ping transition-opacity duration-300"></div>
              </Link>
            </div>
          )}
          
          <NavbarRight />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
