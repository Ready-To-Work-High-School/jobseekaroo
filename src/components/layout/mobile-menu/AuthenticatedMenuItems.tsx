
import React from 'react';
import { UserProfile } from '@/types/user';
import MobileMenuItem from './MobileMenuItem';
import { 
  BookOpen, 
  ListChecks, 
  FileText, 
  Lightbulb, 
  Bell, 
  Shield 
} from 'lucide-react';

interface AuthenticatedMenuItemsProps {
  isAdmin: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AuthenticatedMenuItems: React.FC<AuthenticatedMenuItemsProps> = ({ isAdmin, setIsOpen }) => {
  return (
    <>
      <MobileMenuItem 
        to="/skills" 
        icon={BookOpen}
        onClick={() => setIsOpen(false)}
      >
        Skills
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/applications" 
        icon={ListChecks}
        onClick={() => setIsOpen(false)}
      >
        Applications
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/resume" 
        icon={FileText}
        onClick={() => setIsOpen(false)}
      >
        Resume
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/saved-jobs" 
        icon={Lightbulb}
        onClick={() => setIsOpen(false)}
      >
        Saved Jobs
      </MobileMenuItem>
      
      <MobileMenuItem 
        to="/notifications" 
        icon={Bell}
        onClick={() => setIsOpen(false)}
      >
        Notifications
      </MobileMenuItem>
      
      {isAdmin && (
        <MobileMenuItem
          to="/admin"
          icon={Shield}
          className="bg-red-600 text-white hover:bg-red-700 font-bold"
          onClick={() => setIsOpen(false)}
          activeCheck={(pathname) => pathname === "/admin" || pathname.startsWith("/admin/")}
        >
          Admin Panel
        </MobileMenuItem>
      )}
    </>
  );
};

export default AuthenticatedMenuItems;
