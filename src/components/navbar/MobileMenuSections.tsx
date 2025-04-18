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
  Info,
  LogIn,
  UserPlus,
  Heart
} from 'lucide-react';
import { MobileNavLink } from './MobileNavLink';
import { Separator } from '@/components/ui/separator';

// Primary Navigation Links
export const PrimaryNavigationLinks = () => (
  <div className="px-4 py-2 my-1 bg-blue-50">
    <MobileNavLink to="/">
      <Home className="h-5 w-5" />
      <span className="font-semibold">Home</span>
    </MobileNavLink>
    
    <MobileNavLink to="/entrepreneurship-academy">
      <Award className="h-5 w-5" />
      <span className="font-semibold">Our Program</span>
    </MobileNavLink>
    
    <MobileNavLink to="/school-integration">
      <GraduationCap className="h-5 w-5" />
      <span className="font-semibold">Schools</span>
    </MobileNavLink>
    
    <MobileNavLink to="/first-job-toolkit">
      <Compass className="h-5 w-5" />
      <span className="font-semibold">First Job Toolkit</span>
    </MobileNavLink>
    
    <MobileNavLink to="/jobs">
      <Briefcase className="h-5 w-5" />
      <span className="font-semibold">Browse Jobs</span>
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
  </div>
);

// Job Seekers Section
export const JobSeekersSection = ({ getPath }: { getPath: (path: string) => string }) => (
  <>
    <Separator className="my-2 bg-gradient-to-r from-blue-200/30 via-purple-300/30 to-blue-200/30" />
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
    <Separator className="my-2 bg-gradient-to-r from-purple-200/30 via-blue-300/30 to-purple-200/30" />
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
    <Separator className="my-2 bg-gradient-to-r from-blue-200/30 via-purple-300/30 to-blue-200/30" />
    
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

// Updated CEO Link with refined round purple-blue gradient shield
export const CeoLink = () => (
  <MobileNavLink to="/ceo-portal" className="relative group">
    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-gold-500/50 opacity-50 blur-sm group-hover:opacity-75 transition-opacity duration-300"></div>
    <div className="relative z-10 opacity-30 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
      <Shield className="h-5 w-5 text-purple-600 mr-1" />
      <Heart 
        className="h-5 w-5" 
        style={{
          fill: "url(#ceoPortalMobileGradient)",
          stroke: "none"
        }}
      />
      CEO Portal
    </div>
    <svg width="0" height="0">
      <defs>
        <linearGradient id="ceoPortalMobileGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#9333EA' }} />
          <stop offset="50%" style={{ stopColor: '#3B82F6' }} />
          <stop offset="100%" style={{ stopColor: '#F59E0B' }} />
        </linearGradient>
      </defs>
    </svg>
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
    <Separator className="my-2 bg-gradient-to-r from-purple-200/30 via-blue-300/30 to-purple-200/30" />
    <MobileNavLink to="/sign-in">
      <LogIn className="h-5 w-5" />
      Sign In
    </MobileNavLink>
    <MobileNavLink to="/sign-up">
      <UserPlus className="h-5 w-5" />
      Sign Up
    </MobileNavLink>
  </>
);
