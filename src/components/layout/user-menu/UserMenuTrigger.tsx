
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Sparkles, Award } from 'lucide-react';
import AccountTypeBadge from '../AccountTypeBadge';
import { UserProfile } from '@/types/user';

interface UserMenuTriggerProps {
  user: any;
  userProfile: UserProfile | null;
  hasPremium: boolean;
  hasBadges: boolean;
  isCeo: boolean;
}

const UserMenuTrigger = ({ user, userProfile, hasPremium, hasBadges, isCeo }: UserMenuTriggerProps) => {
  if (!user) return null;

  return (
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
          <div className="flex items-center justify-center h-3 w-3 rounded-full bg-gradient-to-r from-purple-700 via-blue-600 to-amber-500 p-[1px] border border-white">
            <Shield className="h-1.5 w-1.5 text-white" />
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
  );
};

export default UserMenuTrigger;
