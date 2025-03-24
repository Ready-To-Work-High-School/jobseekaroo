
import React from 'react';
import MobileMenuItem from './MobileMenuItem';
import { BookOpen, ExternalLink, Building2, Shield } from 'lucide-react';

interface UnauthenticatedMenuItemsProps {
  setIsOpen: (isOpen: boolean) => void;
}

const UnauthenticatedMenuItems: React.FC<UnauthenticatedMenuItemsProps> = ({ setIsOpen }) => {
  console.log("UnauthenticatedMenuItems - rendering menu items with Admin link");
  
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
      
      {/* IMPORTANT: Always show admin link for testing - no conditional rendering */}
      <MobileMenuItem 
        to="/admin" 
        icon={Shield}
        onClick={() => setIsOpen(false)}
        className="text-white bg-red-600 hover:bg-red-700 font-bold"
        activeCheck={(pathname) => pathname === "/admin" || pathname.startsWith("/admin/")}
      >
        Admin Panel (Test)
      </MobileMenuItem>
    </>
  );
};

export default UnauthenticatedMenuItems;
