
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { 
  Settings, User, BarChart2, Briefcase, 
  BookmarkCheck, Award, Shield
} from 'lucide-react';
import { Button } from '../ui/button';
import AccountTypeBadge from './AccountTypeBadge';

const UserMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();

  // Debug log to check admin status
  console.log('UserMenu - userProfile:', userProfile);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isEmployer = userProfile?.user_type === 'employer';
  const isAdmin = userProfile?.user_type === 'admin';
  
  // Check if user is CEO based on job title or company name
  const isCeo = userProfile?.job_title?.toLowerCase().includes('ceo') || 
               userProfile?.job_title?.toLowerCase().includes('chief executive') ||
               userProfile?.company_name?.toLowerCase().includes('ceo');

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
            <AvatarFallback>{userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}</AvatarFallback>
          </Avatar>
          {userProfile?.user_type && (
            <div className="absolute -top-2 -right-2">
              <AccountTypeBadge userProfile={userProfile} className="h-4 px-1" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          {userProfile ? (
            <div className="flex flex-col">
              <div className="flex items-center justify-between">
                <span>{userProfile.first_name} {userProfile.last_name}</span>
                {userProfile.user_type && (
                  <AccountTypeBadge userProfile={userProfile} />
                )}
              </div>
              <span className="text-xs text-muted-foreground">{user.email}</span>
              {isCeo && <span className="text-xs font-semibold text-blue-600">CEO Access</span>}
            </div>
          ) : (
            <span>My Account</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          {!isAdmin && (
            <DropdownMenuItem asChild>
              <Link to="/account-benefits" className="cursor-pointer">
                <Award className="mr-2 h-4 w-4" />
                <span>Account Benefits</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link to="/analytics" className="cursor-pointer">
              <BarChart2 className="mr-2 h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/saved-jobs" className="cursor-pointer">
              <BookmarkCheck className="mr-2 h-4 w-4" />
              <span>Saved Jobs</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {!userProfile?.redeemed_at && !isAdmin && (
          <DropdownMenuItem asChild>
            <Link to="/redeem-code" className="cursor-pointer">
              <Award className="mr-2 h-4 w-4" />
              <span>Redeem Code</span>
            </Link>
          </DropdownMenuItem>
        )}
        {(isEmployer || isCeo) && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/employer-dashboard" className="cursor-pointer">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Employer Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {isAdmin && (
          <>
            <DropdownMenuItem asChild>
              <Link to="/admin" className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Admin Dashboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/admin/redemption-codes" className="cursor-pointer">
                <Award className="mr-2 h-4 w-4" />
                <span>Manage Redemption Codes</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
