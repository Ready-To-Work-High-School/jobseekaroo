
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFadeIn } from '@/utils/animations';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const animation = useFadeIn(100);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return <header className={cn('fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out', animation, scrolled ? 'py-3 backdrop-blur-lg bg-white/80 shadow-sm' : 'py-5 bg-transparent')}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
          <img src="/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png" alt="Westside HS Logo" className="h-16 w-auto object-fill" />
          <div className="flex flex-col items-start">
            <span className="text-2xl font-medium tracking-tight">
              <span className="text-primary font-semibold">Job</span>
              <span>seeker
            </span>
            </span>
            <span className="-mt-1 font-bold text-stone-950 text-base">Westside High School</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/jobs" label="Find Jobs" currentPath={location.pathname} />
          <NavLink to="/resources" label="Resources" currentPath={location.pathname} />
        </nav>
        
        <div className="flex items-center space-x-4">
          <SignedOut>
            <Link to="/sign-in" className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Link to="/sign-up" className={cn("hidden md:flex px-4 py-2 rounded-full text-sm font-medium transition-all duration-200", "bg-primary text-white hover:bg-primary/90 focus-ring")}>
              Sign Up
            </Link>
          </SignedOut>
          
          <SignedIn>
            <Link to="/jobs" className={cn("hidden md:flex px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 mr-2", "bg-primary text-white hover:bg-primary/90 focus-ring")}>
              Find Jobs
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          
          <button className="flex md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground focus-ring" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>;
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
}

const NavLink = ({
  to,
  label,
  currentPath
}: NavLinkProps) => {
  const isActive = currentPath === to || to !== '/' && currentPath.startsWith(to);
  return <Link to={to} className={cn(
    "text-sm font-medium transition-colors", 
    isActive ? "text-primary font-semibold" : "text-foreground/80 hover:text-foreground"
  )}>
      {label}
    </Link>;
};

export default Navbar;
