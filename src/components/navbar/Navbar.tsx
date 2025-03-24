
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileMenu } from './MobileMenu';
import DesktopNav from './DesktopNav';
import { NavbarBrand } from './NavbarBrand';
import { NavbarRight } from './NavbarRight';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [atTop, setAtTop] = useState(true);
  
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
          <DesktopNav className="hidden md:flex" />
        </div>

        <NavbarRight />
      </div>
    </header>
  );
};

export default Navbar;
