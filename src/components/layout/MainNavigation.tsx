
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useNavigation } from './navigation/useNavigation';
import { Link } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus, Building2, Briefcase, Shield, Users, BookOpen } from 'lucide-react';
import { Button } from '../ui/button';
import { UserDropdown } from './navigation/UserDropdown';
import { JobSeekerDropdown } from './navigation/JobSeekerDropdown';
import { EmployerDropdown } from './navigation/EmployerDropdown';
import { ResourcesDropdown } from './navigation/ResourcesDropdown';
import { AdminLink } from './navigation/AdminLink';

const MainNavigation = ({ className }: { className?: string }) => {
  const { user, userProfile, isAdmin, signOut } = useNavigation();

  return (
    <nav className={cn("hidden lg:flex items-center space-x-6", className)} aria-label="Main Navigation">
      {/* Primary Navigation Links */}
      <Link 
        to="/" 
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      
      {/* Job Seekers Section */}
      <JobSeekerDropdown />
      
      {/* Employers Section */}
      <EmployerDropdown />
      
      {/* Schools Link */}
      <Link 
        to="/school-integration" 
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
      >
        <GraduationCap className="h-4 w-4" />
        Schools
      </Link>
      
      {/* Resources Section */}
      <ResourcesDropdown />
      
      {/* Admin Link - Only shown if user is admin */}
      <AdminLink isAdmin={isAdmin} />
      
      {/* Hidden CEO Portal Link */}
      <Link 
        to="/ceo-portal" 
        className="opacity-0 hover:opacity-100 transition-opacity duration-300 text-sm font-medium flex items-center gap-1"
      >
        <Shield className="h-4 w-4" />
        CEO Portal
      </Link>

      {/* Auth Links or User Menu */}
      {user ? (
        <UserDropdown 
          user={user} 
          userProfile={userProfile} 
          signOut={signOut} 
        />
      ) : (
        <div className="flex items-center space-x-2">
          <Link 
            to="/sign-in" 
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Button asChild size="sm" variant="default">
            <Link 
              to="/sign-up" 
              className="text-sm font-medium flex items-center gap-1"
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;
