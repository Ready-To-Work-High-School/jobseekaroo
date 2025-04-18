
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
import { LogOut, User, GraduationCap, Briefcase, Settings, HelpCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import NetworkStatusIndicator from '@/components/NetworkStatusIndicator';
import TroubleshootDialog from '../troubleshooting/TroubleshootDialog';

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
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/jobs" className="text-sm font-medium transition-colors hover:text-primary">
            Find Jobs
          </Link>
          {userProfile?.user_type === 'employer' && (
            <Link to="/post-job" className="text-sm font-medium transition-colors hover:text-primary">
              Post a Job
            </Link>
          )}
          <Link to="/for-employers" className="text-sm font-medium transition-colors hover:text-primary">
            For Employers
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <NetworkStatusIndicator isOnline={isOnline} />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userProfile?.avatar_url} alt={user?.email || "Avatar"} />
                    <AvatarFallback>{userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                {userProfile?.user_type === 'student' && (
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/applications')}>
                    <GraduationCap className="h-4 w-4 mr-2" />
                    My Applications
                  </DropdownMenuItem>
                )}
                {userProfile?.user_type === 'employer' && (
                  <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/employer/jobs')}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    My Jobs
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/account')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2" onClick={() => navigate('/support')}>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !hideAuthLinks && (
              <>
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm" className="text-sm font-medium transition-colors hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm" className="text-sm font-medium transition-colors">
                    Sign Up
                  </Button>
                </Link>
              </>
            )
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <TroubleshootDialog />
        </div>
      </div>
    </header>
  );
};

export default Header;
