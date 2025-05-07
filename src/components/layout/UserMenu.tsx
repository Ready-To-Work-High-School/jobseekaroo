
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserBadges } from '@/hooks/use-user-badges';
import { useAdminStatus } from '@/hooks/useAdminStatus';

// Import the extracted components
import UserMenuTrigger from './user-menu/UserMenuTrigger';
import UserMenuHeader from './user-menu/UserMenuHeader';
import ProfileMenuItems from './user-menu/ProfileMenuItems';
import EmployerMenuItems from './user-menu/EmployerMenuItems';
import AdminMenuItems from './user-menu/AdminMenuItems';
import RedemptionMenuItem from './user-menu/RedemptionMenuItem';

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
  
  // Check if user has redeemed a code
  const hasRedeemed = !!userProfile?.redeemed_at;

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserMenuTrigger 
          user={user}
          userProfile={userProfile}
          hasPremium={hasPremium}
          hasBadges={hasBadges}
          isCeo={isCeo}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <UserMenuHeader 
          user={user}
          userProfile={userProfile}
          isCeo={isCeo}
          hasPremium={hasPremium}
        />
        <DropdownMenuSeparator />
        
        <ProfileMenuItems 
          userProfile={userProfile}
          isAdmin={isAdmin}
        />
        
        <DropdownMenuSeparator />
        
        <RedemptionMenuItem 
          hasRedeemed={hasRedeemed}
          isAdmin={isAdmin}
        />
        
        <EmployerMenuItems 
          isEmployer={isEmployer}
          isCeo={isCeo}
          hasPremium={hasPremium}
        />
        
        {(isEmployer || isCeo) && <DropdownMenuSeparator />}
        
        <AdminMenuItems isAdmin={isAdmin} />
        
        {isAdmin && <DropdownMenuSeparator />}
        
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
