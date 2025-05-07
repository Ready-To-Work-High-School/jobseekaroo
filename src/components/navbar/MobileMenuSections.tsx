
import React from 'react';
import { MobileNavLink } from './MobileNavLink';
import { 
  GraduationCap, 
  Briefcase, 
  User, 
  BookOpen, 
  LogIn, 
  UserPlus, 
  LogOut, 
  BookMarked, 
  Settings,
  Shield,
  Info,
  Home,
  Award,
  Building2,
  FileCheck,
  Kanban,
  BarChart3,
  Folder
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const PrimaryNavigationLinks = () => (
  <>
    <MobileNavLink to="/jobs">
      <Briefcase className="h-5 w-5" />
      Find Jobs
    </MobileNavLink>
    <MobileNavLink to="/for-employers">
      <Building2 className="h-5 w-5" />
      For Employers
    </MobileNavLink>
    <MobileNavLink to="/about">
      <Info className="h-5 w-5" />
      About Us
    </MobileNavLink>
  </>
);

export const JobSeekersSection = ({ getPath }: { getPath: (path: string) => string }) => (
  <div>
    <h4 className="px-4 py-2 text-sm font-semibold">For Job Seekers</h4>
    <MobileNavLink to={getPath("/saved-jobs")}>
      <BookMarked className="h-5 w-5" />
      Saved Jobs
    </MobileNavLink>
  </div>
);

export const EmployerSection = ({ getPath }: { getPath: (path: string) => string }) => (
  <div>
    <h4 className="px-4 py-2 text-sm font-semibold">For Employers</h4>
    <MobileNavLink to={getPath("/employer/dashboard")}>
      <Briefcase className="h-5 w-5" />
      Post Jobs
    </MobileNavLink>
    <MobileNavLink to={getPath("/employer/candidates")}>
      <Kanban className="h-5 w-5" />
      Candidate Pipeline
    </MobileNavLink>
    <MobileNavLink to={getPath("/employer/verifications")}>
      <FileCheck className="h-5 w-5" />
      Verifications
    </MobileNavLink>
    <MobileNavLink to={getPath("/employer/analytics")}>
      <BarChart3 className="h-5 w-5" />
      Hiring Analytics
    </MobileNavLink>
    <MobileNavLink to={getPath("/employer/tools")}>
      <Folder className="h-5 w-5" />
      Recruitment Tools
    </MobileNavLink>
  </div>
);

export const ResourcesSection = ({ getPath }: { getPath: (path: string) => string }) => (
  <div>
    <h4 className="px-4 py-2 text-sm font-semibold">Resources</h4>
    <MobileNavLink to={getPath("/school-integration")}>
      <GraduationCap className="h-5 w-5" />
      School Programs
    </MobileNavLink>
    <MobileNavLink to={getPath("/first-job-toolkit")}>
      <BookOpen className="h-5 w-5" />
      First Job Toolkit
    </MobileNavLink>
  </div>
);

export const AuthenticatedUserLinks = ({ onSignOut }: { onSignOut: () => void }) => (
  <div className="border-t pt-2">
    <h4 className="px-4 py-2 text-sm font-semibold">Your Account</h4>
    <MobileNavLink to="/profile">
      <User className="h-5 w-5" />
      Profile
    </MobileNavLink>
    <MobileNavLink to="/account-benefits">
      <Award className="h-5 w-5" />
      Account Benefits
    </MobileNavLink>
    <MobileNavLink to="/settings">
      <Settings className="h-5 w-5" />
      Settings
    </MobileNavLink>
  </div>
);

export const AdminLink = () => (
  <div className="border-t pt-2">
    <h4 className="px-4 py-2 text-sm font-semibold">Admin</h4>
    <MobileNavLink to="/admin" className="text-blue-600">
      <Shield className="h-5 w-5" />
      Admin Dashboard
    </MobileNavLink>
  </div>
);

export const CeoLink = () => (
  <MobileNavLink to="/ceo-portal" className="text-primary opacity-0 hover:opacity-100">
    <Shield className="h-5 w-5" />
    CEO Portal
  </MobileNavLink>
);

export const SignOutButton = ({ onSignOut }: { onSignOut: () => void }) => (
  <div className="border-t pt-4 px-4 mt-auto">
    <Button 
      variant="outline" 
      onClick={onSignOut}
      className="w-full flex items-center gap-2 text-red-500 hover:text-red-600"
    >
      <LogOut className="h-5 w-5" />
      Sign Out
    </Button>
  </div>
);

export const UnauthenticatedUserLinks = () => (
  <div className="border-t mt-4 pt-4 px-4 space-y-2">
    <Link to="/sign-in" className="flex items-center gap-2 rounded-md border px-4 py-2 w-full text-sm">
      <LogIn className="h-5 w-5" />
      Sign In
    </Link>
    <Link to="/sign-up" className="flex items-center gap-2 bg-primary text-white rounded-md px-4 py-2 w-full text-sm">
      <UserPlus className="h-5 w-5" />
      Sign Up
    </Link>
  </div>
);
