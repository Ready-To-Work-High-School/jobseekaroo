
import React from 'react';
import MobileMenuItem from './MobileMenuItem';
import { BookOpen, ExternalLink, Building2 } from 'lucide-react';

interface UnauthenticatedMenuItemsProps {
  setIsOpen: (isOpen: boolean) => void;
}

const UnauthenticatedMenuItems: React.FC<UnauthenticatedMenuItemsProps> = ({ setIsOpen }) => {
  console.log("UnauthenticatedMenuItems - rendering menu items");
  
  return (
    <>
      <MobileMenuItem 
        to="/resources" 
        icon={BookOpen}
        onClick={() => setIsOpen(false)}
      >
        Resources
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/sign-in" 
        icon={ExternalLink}
        onClick={() => setIsOpen(false)}
      >
        Sign In
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/sign-up" 
        icon={Building2}
        onClick={() => setIsOpen(false)}
      >
        Sign Up
      </MobileMenuItem>
    </>
  );
};

export default UnauthenticatedMenuItems;
