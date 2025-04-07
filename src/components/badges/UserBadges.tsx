
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BadgeIcon from './BadgeIcon';
import { UserBadge } from '@/types/badges';

interface UserBadgesProps {
  badges: UserBadge[];
  showTitle?: boolean;
  className?: string;
}

const UserBadges: React.FC<UserBadgesProps> = ({ badges, showTitle = true, className = '' }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className={`mt-4 ${className}`}>
        {showTitle && <h3 className="text-lg font-semibold mb-2">Badges</h3>}
        <p className="text-muted-foreground">No badges earned yet.</p>
      </div>
    );
  }

  return (
    <div className={`mt-4 ${className}`}>
      {showTitle && (
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-semibold">Badges</h3>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <TooltipProvider key={badge.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge 
                  variant="outline" 
                  className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 text-amber-800 hover:bg-amber-100 flex items-center gap-1.5 py-1.5 px-3"
                >
                  <BadgeIcon badgeId={badge.id} className="text-amber-500" />
                  <span>{badge.name}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-white border-amber-200">
                <div className="text-xs p-1">
                  <div className="font-medium">{badge.name}</div>
                  {badge.earned_at && (
                    <div className="text-muted-foreground">
                      Earned on {new Date(badge.earned_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default UserBadges;
