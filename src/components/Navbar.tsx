
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Home, Briefcase, Building2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { NavbarNotifications } from '@/components/notifications/NavbarNotifications';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold text-gray-900 dark:text-white">
              Job Seekers 4 HS
            </Link>
            
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <Link to="/" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Link>
                <Link to="/jobs" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <Briefcase className="h-4 w-4 mr-1" />
                  Jobs
                </Link>
                <Link to="/for-employers" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <Building2 className="h-4 w-4 mr-1" />
                  Employers
                </Link>
                <Link to="/about" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  <Info className="h-4 w-4 mr-1" />
                  About
                </Link>
                {user && (
                  <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {/* Notifications icon for job seekers */}
            <NavbarNotifications />
            
            {user ? (
              <div className="flex items-center">
                <Button variant="ghost" onClick={() => signOut()} className="ml-2">
                  Sign Out
                </Button>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="default" className="ml-2">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            {/* Mobile Notifications icon */}
            <NavbarNotifications />
            
            <Button variant="ghost" onClick={toggleMenu} className="ml-2">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Briefcase className="h-4 w-4 mr-1" />
              Jobs
            </Link>
            <Link 
              to="/for-employers" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Building2 className="h-4 w-4 mr-1" />
              Employers
            </Link>
            <Link 
              to="/about" 
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Info className="h-4 w-4 mr-1" />
              About
            </Link>
            {user && (
              <Link 
                to="/dashboard" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }} 
                  className="w-full text-left px-3 py-2"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/signin" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
