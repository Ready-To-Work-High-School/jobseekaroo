
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { cn } from '@/lib/utils';
import { Briefcase, GraduationCap, Search, User, LogIn, Menu } from 'lucide-react';
import { useState } from 'react';

const HomeNavBar = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Find Jobs', href: '/jobs', icon: Search },
    { name: 'For Students', href: '/student-success', icon: GraduationCap },
    { name: 'For Employers', href: '/for-employers', icon: Briefcase },
    { name: 'About', href: '/about', icon: User },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-700 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-bold text-xl text-primary">JobSeekers4HS</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button asChild variant="outline" size="sm" className="flex items-center gap-1.5">
                <Link to="/profile">
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="flex items-center gap-1.5">
                  <Link to="/sign-in">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button asChild size="sm" className="flex items-center gap-1.5">
                  <Link to="/sign-up">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        <div 
          className={cn(
            "md:hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
          )}
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center gap-2 px-2 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md dark:text-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <Button asChild variant="default" className="w-full justify-center mt-2">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-4 w-4 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                </Button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline" className="w-full justify-center">
                    <Link to="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                      <LogIn className="h-4 w-4 mr-2" />
                      <span>Sign In</span>
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-center">
                    <Link to="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                      <span>Sign Up</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavBar;
