
import React from 'react';
import MobileMenuItem from './MobileMenuItem';
import { HomeIcon, Briefcase, GraduationCap, HelpCircle } from 'lucide-react';

interface SharedMenuItemsProps {
  user: any;
  setIsOpen: (isOpen: boolean) => void;
}

const SharedMenuItems: React.FC<SharedMenuItemsProps> = ({ user, setIsOpen }) => {
  return (
    <>
      <MobileMenuItem 
        to="/" 
        icon={HomeIcon}
        onClick={() => setIsOpen(false)}
      >
        Home
      </MobileMenuItem>
      
      {user && (
        <MobileMenuItem 
          to="/dashboard" 
          icon={HomeIcon}
          onClick={() => setIsOpen(false)}
        >
          Dashboard
        </MobileMenuItem>
      )}
      
      <MobileMenuItem 
        to="/jobs" 
        icon={Briefcase}
        onClick={() => setIsOpen(false)}
      >
        Find Jobs
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/entrepreneurship-academy" 
        icon={GraduationCap}
        onClick={() => setIsOpen(false)}
      >
        Academy
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/faq" 
        icon={HelpCircle}
        onClick={() => setIsOpen(false)}
      >
        FAQ
      </MobileMenuItem>
    </>
  );
};

export default SharedMenuItems;
