import React from 'react';
import NavLink from './NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Ticket, GraduationCap, Briefcase, Building2, BookOpen, Award, Info, Compass, Heart, Shield, LogIn, UserPlus } from 'lucide-react';
import { useAdminStatus } from '@/hooks/useAdminStatus';

interface DesktopNavProps {
  className?: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ className }) => {
  const { user, userProfile } = useAuth();
  const { isAdmin, isCeo } = useAdminStatus();
  
  console.log('DesktopNav render - isAdmin:', isAdmin, 'isCeo:', isCeo);
  
  const getAuthPath = (path: string) => {
    return user ? path : "/sign-in";
  };
  
  return (
    <nav className={className}>
      <div className="hidden md:flex items-center space-x-1">
        <NavLink to="/">Home</NavLink>
        
        <NavLink to={getAuthPath("/entrepreneurship-academy")} className="flex items-center gap-1">
          <Award className="h-4 w-4" />
          <span>Our Program</span>
        </NavLink>
        
        <NavLink to={getAuthPath("/healthcare-pathways")} className="flex items-center gap-1">
          <Heart className="h-4 w-4" />
          <span>Healthcare Careers</span>
        </NavLink>
        
        <NavLink to={getAuthPath("/first-job-toolkit")} className="flex items-center gap-1">
          <Compass className="h-4 w-4" />
          <span>First Job Toolkit</span>
        </NavLink>
        
        <NavLink to={getAuthPath("/school-integration")} className="flex items-center gap-1">
          <GraduationCap className="h-4 w-4" />
          <span>Schools</span>
        </NavLink>
        
        <NavLink to={userProfile?.user_type === 'employer' ? "/employer-dashboard" : "/for-employers"} className="flex items-center gap-1">
          <Building2 className="h-4 w-4" />
          <span>Employers</span>
        </NavLink>
        
        <NavLink to={getAuthPath("/jobs")} className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          <span>Jobs</span>
        </NavLink>
        
        {isAdmin && (
          <NavLink to="/admin" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Admin</span>
          </NavLink>
        )}
        
        {isCeo && (
          <NavLink to="/ceo-portal" className="flex items-center gap-1 bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text text-transparent">
            <Shield className="h-4 w-4 text-amber-500" />
            <span>CEO</span>
          </NavLink>
        )}
        
        <NavLink to="/about" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span>About</span>
        </NavLink>
        
        {!user && (
          <div className="flex items-center space-x-2 ml-2">
            <NavLink to="/sign-in" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </NavLink>
            <Button variant="default" asChild size="sm">
              <NavLink to="/signup" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </NavLink>
            </Button>
          </div>
        )}

        <NavLink to="/redeem-code" className="ml-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1 text-blue-700 border-blue-300">
            <Ticket className="h-3.5 w-3.5" />
            <span>Redeem Code</span>
          </Button>
        </NavLink>
      </div>
    </nav>
  );
};

export default DesktopNav;
