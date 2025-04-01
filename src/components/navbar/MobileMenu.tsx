
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MobileNavLink } from './MobileNavLink';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Menu as MenuIcon,
  Home,
  Search,
  BookOpen,
  Building2,
  FileText,
  TrendingUp,
  BookMarked,
  CheckSquare,
  User,
  LogOut,
  Shield,
  GraduationCap,
  Briefcase,
  PenLine,
  Headphones,
  BarChart,
} from 'lucide-react';

export const MobileMenu = () => {
  const { user, signOut, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = userProfile?.user_type === 'admin';
  const isEmployer = userProfile?.user_type === 'employer';
  
  // Debug logs
  console.log("MobileMenu (navbar) - User profile:", userProfile);
  console.log("MobileMenu (navbar) - Is admin:", isAdmin);
  console.log("MobileMenu (navbar) - Current path:", location.pathname);

  // Function to get the redirect path based on auth status
  const getPath = (authenticatedPath: string) => {
    return user ? authenticatedPath : "/sign-in";
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Menu">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-10 w-[280px]">
        <SheetHeader className="px-4 pb-2">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col border-t">
          <MobileNavLink to="/">
            <Home className="h-5 w-5" />
            Home
          </MobileNavLink>
          
          {/* Job Seeker Section */}
          <div className="px-4 py-2 text-sm font-semibold text-muted-foreground">
            For Job Seekers
          </div>
          
          <MobileNavLink to="/jobs">
            <Briefcase className="h-5 w-5" />
            Browse Jobs
          </MobileNavLink>
          
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
          
          <MobileNavLink to="/entrepreneurship-academy">
            <GraduationCap className="h-5 w-5" />
            Entrepreneurship Academy
          </MobileNavLink>
          
          {/* Employer Section */}
          <div className="px-4 py-2 text-sm font-semibold text-muted-foreground mt-2">
            For Employers
          </div>
          
          <MobileNavLink to="/for-employers">
            <Building2 className="h-5 w-5" />
            Employer Overview
          </MobileNavLink>
          
          <MobileNavLink to={getPath("/employer-dashboard")}>
            <Briefcase className="h-5 w-5" />
            Employer Dashboard
          </MobileNavLink>
          
          {/* Resources Section */}
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
          
          {user ? (
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
              
              <MobileNavLink to="/profile">
                <User className="h-5 w-5" />
                Profile
              </MobileNavLink>
              
              {isAdmin && (
                <MobileNavLink to="/admin">
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </MobileNavLink>
              )}
              
              <div 
                className="flex items-center gap-3 px-4 py-3 text-base cursor-pointer hover:bg-muted"
                onClick={() => {
                  signOut();
                  navigate('/');
                }}
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </div>
            </>
          ) : (
            <>
              <div className="border-t border-border/60 my-2"></div>
              <MobileNavLink to="/sign-in">
                Sign In
              </MobileNavLink>
              <MobileNavLink to="/sign-up">
                Sign Up
              </MobileNavLink>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
