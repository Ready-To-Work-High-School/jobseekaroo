
import React from 'react';
import MobileMenuItem from './MobileMenuItem';
import { BookOpen, Building2, LockKeyhole } from 'lucide-react';

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
        to="/for-employers" 
        icon={Building2}
        onClick={() => setIsOpen(false)}
      >
        For Employers
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/forgot-password" 
        icon={LockKeyhole}
        onClick={() => setIsOpen(false)}
      >
        Forgot Password
      </MobileMenuItem>
    </>
  );
};

export default UnauthenticatedMenuItems;
