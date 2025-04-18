
import { Link } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Building2, 
  GraduationCap, 
  Compass, 
  Award, 
  BookOpen,
  PenLine,
  Headphones,
  BarChart,
  BookMarked,
  CheckSquare,
  User,
  Shield,
  LogOut,
  Info
} from 'lucide-react';
import { MobileNavLink } from './MobileNavLink';

// Primary Navigation Links
export const PrimaryNavigationLinks = () => (
  <div className="px-4 py-2 my-1 bg-blue-50">
    <MobileNavLink to="/entrepreneurship-academy">
      <GraduationCap className="h-5 w-5" />
      <span className="font-semibold">Our Program</span>
    </MobileNavLink>
    
    <MobileNavLink to="/first-job-toolkit">
      <Compass className="h-5 w-5" />
      <span className="font-semibold">First Job Toolkit</span>
    </MobileNavLink>
    
    <MobileNavLink to="/jobs">
      <Briefcase className="h-5 w-5" />
      <span className="font-semibold">Browse Jobs</span>
    </MobileNavLink>
    
    <MobileNavLink to="/schools">
      <GraduationCap className="h-5 w-5" />
      <span className="font-semibold">Schools</span>
    </MobileNavLink>
    
    <MobileNavLink to="/for-employers">
      <Building2 className="h-5 w-5" />
      <span className="font-semibold">For Employers</span>
    </MobileNavLink>

    <MobileNavLink to="/about">
      <Info className="h-5 w-5" />
      <span className="font-semibold">About</span>
    </MobileNavLink>
    
    <MobileNavLink to="/platform-guide">
      <BookOpen className="h-5 w-5" />
      <span className="font-semibold">Platform Guide</span>
    </MobileNavLink>
    
    <MobileNavLink to="/resources">
      <BookOpen className="h-5 w-5" />
      <span className="font-semibold">Resources</span>
    </MobileNavLink>
  </div>
);

// Job Seekers Section
export const JobSeekersSection = ({ getPath }: { getPath: (path: string) => string }) => (
  <>
    <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
      For Job Seekers
    </div>
    
    <MobileNavLink to={getPath("/skills")}>
      <GraduationCap className="h-5 w-5" />
      Skills Development
    </MobileNavLink>
    
    <MobileNavLink to={getPath("/resume-assistant")}>
      <PenLine className="h-5 w-5" />
      Resume Help
    </MobileNavLink>
    
    <MobileNavLink to={getPath("/interview-prep")}>
      <Headphones className="h-5 w-5" />
      Interview Prep
    </MobileNavLink>
  </>
);

// Resources Section
export const ResourcesSection = ({ getPath }: { getPath: (path: string) => string }) => (
  <>
    <div className="px-4 py-2 text-sm font-semibold text-muted-foreground mt-2">
      Resources
    </div>
    
    <MobileNavLink to="/resources">
      <BookOpen className="h-5 w-5" />
      Career Resources
    </MobileNavLink>
    
    <MobileNavLink to={getPath("/analytics")}>
      <BarChart className="h-5 w-5" />
      Analytics Dashboard
    </MobileNavLink>
  </>
);

// Authenticated User Links
export const AuthenticatedUserLinks = ({ onSignOut }: { onSignOut: () => void }) => (
  <>
    <div className="border-t border-border/60 my-2"></div>
    
    <MobileNavLink to="/saved-jobs">
      <BookMarked className="h-5 w-5" />
      Saved Jobs
    </MobileNavLink>
    
    <MobileNavLink to="/applications">
      <CheckSquare className="h-5 w-5" />
      Applications
    </MobileNavLink>
    
    <MobileNavLink to="/student-profile">
      <User className="h-5 w-5" />
      Student Profile
    </MobileNavLink>
  </>
);

// Admin Link
export const AdminLink = () => (
  <MobileNavLink to="/admin">
    <Shield className="h-5 w-5" />
    Admin Panel
  </MobileNavLink>
);

// CEO Link - Hidden but accessible
export const CeoLink = () => (
  <MobileNavLink to="/ceo-portal" className="opacity-30 hover:opacity-100 transition-opacity">
    <Shield className="h-5 w-5" />
    CEO Portal
  </MobileNavLink>
);

// Sign Out Button
export const SignOutButton = ({ onSignOut }: { onSignOut: () => void }) => (
  <div 
    className="flex items-center gap-3 px-4 py-3 text-base cursor-pointer hover:bg-muted"
    onClick={onSignOut}
  >
    <LogOut className="h-5 w-5" />
    Sign Out
  </div>
);

// Unauthenticated User Links
export const UnauthenticatedUserLinks = () => (
  <>
    <div className="border-t border-border/60 my-2"></div>
    <MobileNavLink to="/sign-in">
      Sign In
    </MobileNavLink>
    <MobileNavLink to="/sign-up">
      Sign Up
    </MobileNavLink>
  </>
);
