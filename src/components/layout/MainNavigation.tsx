
import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '../theme/ThemeToggle';
import { useNavigation } from './navigation/useNavigation';
import { Link } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus, Building2, Briefcase, Shield, Users, BookOpen, Heart, Crown } from 'lucide-react';
import { Button } from '../ui/button';
import { UserDropdown } from './navigation/UserDropdown';
import { JobSeekerDropdown } from './navigation/JobSeekerDropdown';
import { EmployerDropdown } from './navigation/EmployerDropdown';
import { ResourcesDropdown } from './navigation/ResourcesDropdown';
import { AdminLink } from './navigation/AdminLink';
import { Separator } from '../ui/separator';

const MainNavigation = ({ className }: { className?: string }) => {
  const { user, userProfile, isAdmin, signOut } = useNavigation();
  
  // Log user type for debugging
  console.log('MainNavigation - user type:', userProfile?.user_type);

  // Check if user has CEO privileges (also being admin)
  const isCeo = userProfile?.user_type === 'admin' && 
                (userProfile?.job_title?.toLowerCase()?.includes('ceo') || 
                 userProfile?.company_name?.toLowerCase()?.includes('ceo'));

  return (
    <nav className={cn("hidden lg:flex items-center space-x-6", className)} aria-label="Main Navigation">
      {/* Primary Navigation Links */}
      <Link 
        to="/" 
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Home
      </Link>
      
      <Separator orientation="vertical" className="h-6 bg-gradient-to-b from-blue-200/30 via-purple-300/30 to-blue-200/30" />
      
      {/* Job Seekers Section */}
      <JobSeekerDropdown />
      
      <Separator orientation="vertical" className="h-6 bg-gradient-to-b from-purple-200/30 via-blue-300/30 to-purple-200/30" />
      
      {/* Employers Section */}
      <EmployerDropdown />
      
      <Separator orientation="vertical" className="h-6 bg-gradient-to-b from-blue-200/30 via-purple-300/30 to-blue-200/30" />
      
      {/* Schools Link */}
      <Link 
        to="/school-integration" 
        className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5"
      >
        <GraduationCap className="h-4 w-4" />
        Schools
      </Link>
      
      <Separator orientation="vertical" className="h-6 bg-gradient-to-b from-purple-200/30 via-blue-300/30 to-purple-200/30" />
      
      {/* Resources Section */}
      <ResourcesDropdown />
      
      <Separator orientation="vertical" className="h-6 bg-gradient-to-b from-blue-300/30 via-purple-300/30 to-blue-300/30" />
      
      {/* Admin Link - Only shown if user is admin */}
      <AdminLink isAdmin={isAdmin} />
      
      {/* CEO Portal Link with small purple-blue-gold shield */}
      {isCeo && (
        <div className="relative group">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-yellow-400/50 opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-300"></div>
          <Link 
            to="/ceo-portal" 
            className="relative z-10 inline-flex items-center opacity-30 group-hover:opacity-100 transition-all duration-300 text-sm font-medium gap-1 px-2 py-1 rounded-full"
            aria-label="CEO Portal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mr-1" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <defs>
                <linearGradient id="ceoGradientSmall" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9333EA" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              <path fill="url(#ceoGradientSmall)" stroke="none" d="M12 2L3 7v6c0 5 3.5 7 9 7s9-2 9-7V7l-9-5z" />
              <path d="M12 22c-5.5 0-9-2-9-7V7l9-5 9 5v8c0 5-3.5 7-9 7z" stroke="#00000020" strokeWidth="0.5" fill="none"/>
            </svg>
            <span>CEO</span>
          </Link>
        </div>
      )}

      <Separator orientation="vertical" className="h-6 bg-gradient-to-b from-purple-200/30 via-blue-300/30 to-purple-200/30" />

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
            <span>Sign In</span>
          </Link>
          <Button asChild size="sm" variant="default">
            <Link 
              to="/sign-up" 
              className="text-sm font-medium flex items-center gap-1"
            >
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      )}
    </nav>
  );
};

export default MainNavigation;

