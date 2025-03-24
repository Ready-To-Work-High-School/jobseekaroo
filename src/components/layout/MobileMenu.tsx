
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  Briefcase,
  BookOpen,
  LayoutDashboard,
  ListChecks,
  FileText,
  Lightbulb,
  GraduationCap,
  ExternalLink,
  Bell,
  Building2,
  HelpCircle,
  Shield
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const { user, signOut, userProfile } = useAuth();
  const isAdmin = userProfile?.user_type === 'admin';
  const location = useLocation();
  
  // Debug logs
  console.log("MobileMenu - User profile:", userProfile);
  console.log("MobileMenu - Is admin:", isAdmin);
  console.log("MobileMenu - Current path:", location.pathname);

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm rounded-lg">
          <DialogHeader>
            <DialogTitle>Menu</DialogTitle>
          </DialogHeader>
          <nav className="flex flex-col space-y-1 py-4">
            <Link 
              to="/" 
              className={cn(
                "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                location.pathname === "/" && "bg-accent/70"
              )}
              onClick={() => setIsOpen(false)}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </Link>
            
            {user && (
              <Link 
                to="/dashboard" 
                className={cn(
                  "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                  location.pathname === "/dashboard" && "bg-accent/70"
                )}
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            )}

            <Link 
              to="/jobs" 
              className={cn(
                "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                location.pathname === "/jobs" && "bg-accent/70"
              )}
              onClick={() => setIsOpen(false)}
            >
              <Briefcase className="h-5 w-5 mr-3" />
              Find Jobs
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/skills"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/skills" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Skills
                </Link>
                <Link
                  to="/applications"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/applications" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <ListChecks className="h-5 w-5 mr-3" />
                  Applications
                </Link>
                <Link
                  to="/resume"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/resume" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Resume
                </Link>
                <Link
                  to="/saved-jobs"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/saved-jobs" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Lightbulb className="h-5 w-5 mr-3" />
                  Saved Jobs
                </Link>
                <Link
                  to="/notifications"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/notifications" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={cn(
                      "px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md flex items-center font-bold",
                      location.pathname.startsWith("/admin") && "bg-red-700"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    Admin Panel
                  </Link>
                )}
              </>
            ) : (
              <Link
                to="/resources"
                className={cn(
                  "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                  location.pathname === "/resources" && "bg-accent/70"
                )}
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Resources
              </Link>
            )}
            <Link
              to="/entrepreneurship-academy"
              className={cn(
                "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                location.pathname === "/entrepreneurship-academy" && "bg-accent/70"
              )}
              onClick={() => setIsOpen(false)}
            >
              <GraduationCap className="h-5 w-5 mr-3" />
              Academy
            </Link>
            {user ? (
              <Button variant="ghost" className="justify-start px-4 py-2 hover:bg-accent rounded-md flex items-center" onClick={() => {
                signOut();
                setIsOpen(false);
              }}>
                <ExternalLink className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/sign-in" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <ExternalLink className="h-5 w-5 mr-3" />
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                    location.pathname === "/sign-up" && "bg-accent/70"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <Building2 className="h-5 w-5 mr-3" />
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/faq"
              className={cn(
                "px-4 py-2 hover:bg-accent rounded-md flex items-center",
                location.pathname === "/faq" && "bg-accent/70"
              )}
              onClick={() => setIsOpen(false)}
            >
              <HelpCircle className="h-5 w-5 mr-3" />
              FAQ
            </Link>
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
