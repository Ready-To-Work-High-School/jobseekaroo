
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
  BookmarkCheck, Award, Shield, Sparkles, ShieldCheck, School
} from 'lucide-react';
import { Button } from '../ui/button';
import AccountTypeBadge from './AccountTypeBadge';
import { useUserBadges } from '@/hooks/use-user-badges';
import { useAdminStatus } from '@/hooks/useAdminStatus';

const UserMenu = () => {
  const { user, userProfile, signOut } = useAuth();
  const { toast } = useToast();
  const { badges } = useUserBadges();
  const { isAdmin, isCeo } = useAdminStatus();

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
  
  // Check if user has premium subscription
  const hasPremium = userProfile?.preferences?.hasPremium === true;
  
  // Check if user has badges
  const hasBadges = badges && badges.length > 0;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={userProfile?.avatar_url || `https://avatar.vercel.sh/${user.email}.png`} alt={user.email} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              {userProfile?.first_name?.[0]}{userProfile?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          
          {userProfile?.user_type && (
            <div className="absolute -top-2 -right-2">
              <AccountTypeBadge userProfile={userProfile} className="h-4 w-4 p-0" showText={false} />
            </div>
          )}
          
          {/* Improved CEO indicator */}
          {isCeo && (
            <div className="absolute top-0 right-0 -mt-1 -mr-1">
              <div className="flex items-center justify-center h-4 w-4 rounded-full bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 p-[2px] border border-white">
                <ShieldCheck className="h-2 w-2 text-amber-400" />
              </div>
            </div>
          )}
          
          {/* Only show these badges if not displaying the CEO badge */}
          {!isCeo && (
            <>
              {hasPremium && (
                <div className="absolute -bottom-1 -right-1">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 ring-1 ring-white" aria-label="Premium user">
                    <Sparkles className="h-2 w-2 text-white" />
                  </span>
                </div>
              )}
              
              {hasBadges && (
                <div className="absolute -bottom-1 -left-1">
                  <span className="flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-500 ring-1 ring-white animate-pulse-slow" aria-label="Has achievements">
                    <Award className="h-2 w-2 text-white" />
                  </span>
                </div>
              )}
            </>
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
              {isCeo && (
                <span className="text-xs font-semibold bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 bg-clip-text text-transparent flex items-center gap-1">
                  <Shield className="h-3 w-3 text-amber-500" />
                  CEO Access
                </span>
              )}
              {hasPremium && <span className="text-xs font-semibold text-amber-600 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" />
                Gold Status
              </span>}
            </div>
          ) : (
            <span>My Account</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to={userProfile?.user_type === 'student' ? "/student-profile" : "/profile"} className="cursor-pointer">
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
            <DropdownMenuItem asChild>
              <Link to="/employer-premium" className="cursor-pointer">
                <Sparkles className="mr-2 h-4 w-4" />
                <span>Premium Services</span>
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
