
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { 
  School, 
  Briefcase, 
  UserCircle, 
  Info, 
  Shield, 
  LogOut, 
  LogIn, 
  UserPlus,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useMobileNavigation } from '@/hooks/useMobileNavigation';
import { cn } from '@/lib/utils';

const NavigationLink = memo(({ 
  to, 
  icon: Icon, 
  children, 
  onClick, 
  className,
  isActive = false 
}: {
  to: string;
  icon: any;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}) => (
  <Button asChild variant="ghost" className={cn("justify-start", className)}>
    <Link 
      to={to} 
      className={cn(
        "flex items-center transition-colors",
        isActive && "bg-accent text-accent-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Link>
  </Button>
));

NavigationLink.displayName = 'NavigationLink';

export const MobileMenu = memo(() => {
  const {
    user,
    isAdmin,
    isCeo,
    isMenuOpen,
    setIsMenuOpen,
    shouldHideNavigation,
    handleSignOut,
    closeMenu,
    isActivePath
  } = useMobileNavigation();

  if (shouldHideNavigation) {
    return null;
  }

  return (
    <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="flex flex-col h-full">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col flex-grow gap-4 pt-4">
          {/* Core Navigation */}
          <NavigationLink 
            to="/" 
            icon={Home} 
            onClick={closeMenu}
            isActive={isActivePath('/')}
          >
            Home
          </NavigationLink>
          
          <NavigationLink 
            to="/jobs" 
            icon={Briefcase} 
            onClick={closeMenu}
            isActive={isActivePath('/jobs')}
          >
            Find Jobs
          </NavigationLink>
          
          <NavigationLink 
            to="/for-employers" 
            icon={UserCircle} 
            onClick={closeMenu}
            isActive={isActivePath('/for-employers')}
          >
            For Employers
          </NavigationLink>
          
          <NavigationLink 
            to="/school-integration" 
            icon={School} 
            onClick={closeMenu}
            isActive={isActivePath('/school-integration')}
          >
            Schools
          </NavigationLink>
          
          <NavigationLink 
            to="/about" 
            icon={Info} 
            onClick={closeMenu}
            isActive={isActivePath('/about')}
          >
            About
          </NavigationLink>
          
          <div className="border-t my-2"></div>
          
          {/* Admin/CEO Access */}
          {isAdmin && (
            <NavigationLink 
              to="/admin" 
              icon={Shield} 
              onClick={closeMenu}
              className="text-red-500 hover:text-red-600"
              isActive={isActivePath('/admin')}
            >
              Admin Panel
            </NavigationLink>
          )}
          
          {isCeo && (
            <NavigationLink 
              to="/ceo-portal" 
              icon={Shield} 
              onClick={closeMenu}
              className="opacity-60 hover:opacity-100 bg-gradient-to-r hover:from-purple-50 hover:to-amber-50"
              isActive={isActivePath('/ceo-portal')}
            >
              <span className="bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text text-transparent">
                CEO Portal
              </span>
            </NavigationLink>
          )}
          
          {/* User-specific content */}
          {user ? (
            <>
              <NavigationLink 
                to="/profile" 
                icon={UserCircle} 
                onClick={closeMenu}
                isActive={isActivePath('/profile')}
              >
                Profile
              </NavigationLink>
              
              <div className="mt-auto">
                <Button 
                  variant="ghost" 
                  className="justify-start w-full text-red-500 hover:text-red-600" 
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <div className="mt-auto flex flex-col gap-2">
              <NavigationLink 
                to="/sign-in" 
                icon={LogIn} 
                onClick={closeMenu}
                className="border"
              >
                Sign In
              </NavigationLink>
              
              <NavigationLink 
                to="/sign-up" 
                icon={UserPlus} 
                onClick={closeMenu}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Sign Up
              </NavigationLink>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
});

MobileMenu.displayName = 'MobileMenu';
