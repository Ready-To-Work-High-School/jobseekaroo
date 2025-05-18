
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import MainNavigation from './MainNavigation';
import AuthStatus from '../AuthStatus';

interface HeaderProps {
  hideAuthLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideAuthLinks }) => {
  const { user, userProfile } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 flex items-center">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <img 
              src="/lovable-uploads/07748c3e-c8ae-4f0e-a79d-89da75c12094.png" 
              alt="JS4HS Logo" 
              className="h-full w-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                // Fallback to the JobSeekers4HSBadge component if image fails to load
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  const fallback = document.createElement('div');
                  fallback.className = 'bg-amber-500 text-white text-xs rounded-full h-8 w-8 flex items-center justify-center';
                  fallback.innerText = 'JS4HS';
                  parent.appendChild(fallback);
                }
              }}
            />
          </div>
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
