
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import MainNavigation from './MainNavigation';
import AuthStatus from '../AuthStatus';
import JobSeekers4HSBadge from '../badges/JobSeekers4HSBadge';

interface HeaderProps {
  hideAuthLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideAuthLinks }) => {
  const { user, userProfile } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center">
          <JobSeekers4HSBadge variant="small" />
        </Link>
        
        {/* Main Navigation */}
        <MainNavigation />
        
        {/* Auth Status (only show if not hidden) */}
        <div className="ml-auto flex items-center space-x-2">
          {!hideAuthLinks && user && (
            <AuthStatus />
          )}
          
          {!hideAuthLinks && !user && (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
