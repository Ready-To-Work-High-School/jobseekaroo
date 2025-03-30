
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import SharedMenuItems from './mobile-menu/SharedMenuItems';
import AuthenticatedMenuItems from './mobile-menu/AuthenticatedMenuItems';
import UnauthenticatedMenuItems from './mobile-menu/UnauthenticatedMenuItems';

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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm rounded-lg">
          <DialogHeader>
            <DialogTitle>Menu</DialogTitle>
          </DialogHeader>
          <nav className="flex flex-col space-y-1 py-4">
            <SharedMenuItems setIsOpen={setIsOpen} />
            
            {user ? (
              <>
                <AuthenticatedMenuItems isAdmin={isAdmin} setIsOpen={setIsOpen} />
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
              <UnauthenticatedMenuItems setIsOpen={setIsOpen} />
            )}
          </nav>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MobileMenu;
