
import { Shield, Sparkles } from 'lucide-react';
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import AccountTypeBadge from '../AccountTypeBadge';
import { UserProfile } from '@/types/user';

interface UserMenuHeaderProps {
  user: any;
  userProfile: UserProfile | null;
  isCeo: boolean;
  hasPremium: boolean;
}

const UserMenuHeader = ({ user, userProfile, isCeo, hasPremium }: UserMenuHeaderProps) => {
  return (
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
  );
};

export default UserMenuHeader;
