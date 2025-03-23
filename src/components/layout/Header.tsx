
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import { BriefcaseBusiness, Users, GraduationCap, Menu, X } from 'lucide-react';

const Header = () => {
  const { user, userProfile } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-xl text-primary">JS4HS</span>
            <span className="ml-1 text-gray-500 hidden sm:inline">| Job Seekers 4 High Schools</span>
          </Link>
          
          {/* Main navigation - desktop */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" 
              className={`font-medium text-sm ${isActive('/') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Home
            </Link>
            <Link to="/jobs" 
              className={`font-medium text-sm ${isActive('/jobs') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Find Jobs
            </Link>
            <Link to="/resources" 
              className={`font-medium text-sm ${isActive('/resources') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Resources
            </Link>
            <Link to="/academy" 
              className={`font-medium text-sm ${isActive('/academy') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <span className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-1" />
                Academy
              </span>
            </Link>
            <Link to="/for-employers" 
              className={`font-medium text-sm ${isActive('/for-employers') ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}
            >
              <span className="flex items-center">
                <BriefcaseBusiness className="h-4 w-4 mr-1" />
                For Employers
              </span>
            </Link>
          </nav>
          
          {/* Auth buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to={userProfile?.user_type === 'employer' ? '/employer-dashboard' : '/profile'}>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-1" />
                    {userProfile?.user_type === 'employer' ? 'Dashboard' : 'My Profile'}
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/sign-in">
                  <Button variant="outline" size="sm">Sign In</Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu drawer */}
      {isMenuOpen && <MobileMenu />}
    </header>
  );
};

export default Header;
