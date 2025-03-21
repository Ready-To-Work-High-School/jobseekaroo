
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useFadeIn } from '@/utils/animations';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const animation = useFadeIn(100);
  const {
    user,
    signOut
  } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getUserInitials = () => {
    if (!user) return '';

    // Try to get initials from user metadata
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }

    // Fallback to email
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return '';
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out', 
      animation, 
      scrolled ? 'py-2 md:py-3 backdrop-blur-lg bg-white/80 shadow-sm' : 'py-3 md:py-5 bg-transparent'
    )}>
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80">
          <img 
            src="/lovable-uploads/aaf637dd-c5d6-46e1-ae48-b8adb777f7cb.png" 
            alt="Westside HS Logo" 
            className="h-14 md:h-20 w-auto object-fill" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8 text-black">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/jobs" label="Find Jobs" currentPath={location.pathname} />
          <NavLink to="/for-employers" label="For Employers" currentPath={location.pathname} />
          <NavLink to="/success-stories" label="Success Stories" currentPath={location.pathname} />
          <NavLink to="/resume-assistant" label="Resume Help" currentPath={location.pathname} />
          <NavLink to="/resources" label="Resources" currentPath={location.pathname} />
          <NavLink to="/faq" label="FAQ" currentPath={location.pathname} />
        </nav>

        <div className="flex items-center space-x-2 md:space-x-4">
          {user ? (
            <>
              <Link to="/jobs" className={cn(
                "hidden md:flex px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 mr-2", 
                "bg-primary text-white hover:bg-primary/90 focus-ring"
              )}>
                Find Jobs
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt="User" />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="font-medium">
                    {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-sm text-muted-foreground">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/applications">My Applications</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/saved-jobs">Saved Jobs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/resume-assistant">Resume Assistant</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive" 
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="hidden md:block text-sm font-medium text-black hover:text-foreground transition-colors">
                Sign In
              </Link>
              <Link to="/sign-up" className={cn(
                "hidden md:flex px-4 py-2 rounded-full text-sm font-medium transition-all duration-200", 
                "bg-primary text-white hover:bg-primary/90 focus-ring"
              )}>
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[350px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-lg font-semibold">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="flex flex-col gap-1 p-4 overflow-y-auto flex-1">
                  <MobileNavLink to="/" label="Home" />
                  <MobileNavLink to="/jobs" label="Find Jobs" />
                  <MobileNavLink to="/for-employers" label="For Employers" />
                  <MobileNavLink to="/success-stories" label="Success Stories" />
                  <MobileNavLink to="/resume-assistant" label="Resume Help" />
                  <MobileNavLink to="/resources" label="Resources" />
                  <MobileNavLink to="/faq" label="FAQ" />
                </nav>
                
                <div className="mt-auto p-4 border-t">
                  {user ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.user_metadata?.avatar_url} alt="User" />
                          <AvatarFallback>{getUserInitials()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/profile">My Profile</Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/applications">My Applications</Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/saved-jobs">Saved Jobs</Link>
                      </Button>
                      <Button variant="destructive" className="w-full mt-4" onClick={() => signOut()}>
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button className="w-full" asChild>
                        <Link to="/sign-in">Sign In</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to="/sign-up">Create Account</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
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
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  return (
    <Link 
      to={to} 
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-black"
      )}
    >
      {label}
    </Link>
  );
};

const MobileNavLink = ({ to, label }: { to: string; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center px-4 py-3 rounded-md transition-colors text-base",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "hover:bg-secondary/50 text-foreground"
      )}
    >
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
