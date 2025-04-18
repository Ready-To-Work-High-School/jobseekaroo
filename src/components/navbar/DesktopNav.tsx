
import React from 'react';
import NavLink from './NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Ticket, GraduationCap, Briefcase, Building2, BookOpen, User, Award, Info, Compass, Heart, FileText, Shield } from 'lucide-react';
import { isAdmin } from '@/utils/adminUtils';

interface DesktopNavProps {
  className?: string;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ className }) => {
  const { user, userProfile } = useAuth();
  const userIsAdmin = isAdmin(userProfile);
  
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
        
        <NavLink to={getAuthPath("/schools")} className="flex items-center gap-1">
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
        
        {userIsAdmin && (
          <NavLink to="/admin" className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            <span>Admin</span>
          </NavLink>
        )}
        
        <NavLink to="/about" className="flex items-center gap-1">
          <Info className="h-4 w-4" />
          <span>About</span>
        </NavLink>
        
        {/* Hidden CEO Portal - Only visible on hover */}
        <NavLink 
          to="/ceo-portal" 
          className="opacity-0 hover:opacity-100 transition-opacity duration-300"
        >
          <Shield className="h-4 w-4" />
        </NavLink>
        
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
