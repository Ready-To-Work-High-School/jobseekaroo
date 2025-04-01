
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { MobileNavLink } from '../navbar/MobileNavLink';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const { user, signOut, userProfile } = useAuth();
  const isAdmin = userProfile?.user_type === 'admin';
  
  // Debug logs
  console.log("MobileMenu - User profile:", userProfile);
  console.log("MobileMenu - Is admin:", isAdmin);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="sm:max-w-sm rounded-lg">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-1 py-4">
            {/* Shared Items */}
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/for-employers">For Employers</MobileNavLink>
            <MobileNavLink to="/resources">Resources</MobileNavLink>
            <MobileNavLink to="/entrepreneurship-academy">Entrepreneurship</MobileNavLink>
            
            {user ? (
              <>
                {/* Authenticated Items */}
                <MobileNavLink to="/dashboard">Dashboard</MobileNavLink>
                <MobileNavLink to="/jobs">Jobs</MobileNavLink>
                <MobileNavLink to="/skills">Skills</MobileNavLink>
                <MobileNavLink to="/applications">Applications</MobileNavLink>
                <MobileNavLink to="/profile">Profile</MobileNavLink>
                
                {/* Admin Items */}
                {isAdmin && (
                  <MobileNavLink to="/admin">Admin</MobileNavLink>
                )}
                
                <Button 
                  variant="ghost" 
                  className="justify-start px-4 py-2 hover:bg-accent rounded-md flex items-center" 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <ExternalLink className="h-5 w-5 mr-3" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                {/* Unauthenticated Items */}
                <MobileNavLink to="/sign-in">Sign In</MobileNavLink>
                <MobileNavLink to="/sign-up">Sign Up</MobileNavLink>
                <MobileNavLink to="/redeem-code">Redeem Code</MobileNavLink>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
