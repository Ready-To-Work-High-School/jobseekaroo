
import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useNavigation } from './navigation/useNavigation';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { UserDropdown } from './navigation/UserDropdown';
import { JobSeekerDropdown } from './navigation/JobSeekerDropdown';
import { EmployerDropdown } from './navigation/EmployerDropdown';
import { ResourcesDropdown } from './navigation/ResourcesDropdown';
import { SchoolDropdown } from './navigation/SchoolDropdown';
import { Separator } from '../ui/separator';

const MainNavigation = ({ className }: { className?: string }) => {
  const { user, userProfile, signOut, isAdmin } = useNavigation();
  
  console.info("MainNavigation - user type:", userProfile?.user_type);

  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      <div className="flex items-center space-x-6">
        <JobSeekerDropdown />
        <EmployerDropdown />
        <SchoolDropdown />
        <ResourcesDropdown />
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        {user ? (
          <UserDropdown user={user} userProfile={userProfile} signOut={signOut} />
        ) : (
          <div className="flex items-center space-x-2">
            <Button asChild variant="ghost">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavigation;
