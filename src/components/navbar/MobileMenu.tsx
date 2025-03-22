
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
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
  LogOut
} from 'lucide-react';

export const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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
          <MobileNavLink to="/jobs">
            <Search className="h-5 w-5" />
            Find Jobs
          </MobileNavLink>
          <MobileNavLink to="/resources">
            <BookOpen className="h-5 w-5" />
            Resources
          </MobileNavLink>
          <MobileNavLink to="/for-employers">
            <Building2 className="h-5 w-5" />
            For Employers
          </MobileNavLink>
          <MobileNavLink to={getPath("/resume-assistant")}>
            <FileText className="h-5 w-5" />
            Resume Assistant
          </MobileNavLink>
          
          {user ? (
            <>
              <div className="border-t border-border/60 my-2"></div>
              <MobileNavLink to="/skills">
                <TrendingUp className="h-5 w-5" />
                Skills
              </MobileNavLink>
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
