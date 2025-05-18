
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, GraduationCap, Briefcase, Settings, HelpCircle, Building2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import NetworkStatusIndicator from '@/components/NetworkStatusIndicator';
import TroubleshootDialog from '../troubleshooting/TroubleshootDialog';
import MainNavigation from './MainNavigation';
import DiagnosticMenuButton from '../ErrorRecovery/DiagnosticMenuButton';

interface HeaderProps {
  hideAuthLinks?: boolean;
}

const Header: React.FC<HeaderProps> = ({ hideAuthLinks }) => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast()
  const navigate = useNavigate();
  const isOnline = useNetworkStatus();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    })
    navigate('/sign-in');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="mr-6 font-bold">
          Job Seekers 4 HS
        </Link>
        
        {/* Main Navigation (desktop) */}
        <MainNavigation />
        
        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center space-x-4 flex-1">
          <Link to="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
            Jobs
          </Link>
          <Link to="/school-integration" className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            Schools
          </Link>
          <Link to="/for-employers" className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
            <Building2 className="h-4 w-4" />
            Employers
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center space-x-2">
          {/* Remove the isOnline prop since NetworkStatusIndicator now gets this internally */}
          <NetworkStatusIndicator />
          
          {/* Auth Status (only show if not hidden) */}
          {!hideAuthLinks && (
            <div className="flex items-center gap-2">
              <TroubleshootDialog />
              <DiagnosticMenuButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
