import { useState } from 'react';
import { Link } from 'react-router-dom';
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

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const { user, signOut, userProfile } = useAuth();
  const isAdmin = userProfile?.user_type === 'admin';

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
              className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Home
            </Link>
            
            {user && (
              <Link 
                to="/dashboard" 
                className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            )}

            <Link 
              to="/jobs" 
              className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Briefcase className="h-5 w-5 mr-3" />
              Find Jobs
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/skills"
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  Skills
                </Link>
                <Link
                  to="/applications"
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <ListChecks className="h-5 w-5 mr-3" />
                  Applications
                </Link>
                <Link
                  to="/resume"
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Resume
                </Link>
                <Link
                  to="/saved-jobs"
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Lightbulb className="h-5 w-5 mr-3" />
                  Saved Jobs
                </Link>
                <Link
                  to="/notifications"
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </Link>
              </>
            ) : (
              <Link
                to="/resources"
                className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="h-5 w-5 mr-3" />
                Resources
              </Link>
            )}
            <Link
              to="/entrepreneurship-academy"
              className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
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
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <ExternalLink className="h-5 w-5 mr-3" />
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Building2 className="h-5 w-5 mr-3" />
                  Sign Up
                </Link>
              </>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md flex items-center font-bold"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="h-5 w-5 mr-3" />
                Admin Panel
              </Link>
            )}
            <Link
              to="/faq"
              className="px-4 py-2 hover:bg-accent rounded-md flex items-center"
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
