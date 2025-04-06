
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import BadgeIcon from './BadgeIcon';
import { UserBadge } from '@/types/badges';

interface UserBadgesProps {
  badges: UserBadge[];
  showTitle?: boolean;
}

const UserBadges: React.FC<UserBadgesProps> = ({ badges, showTitle = true }) => {
  if (!badges || badges.length === 0) {
    return (
      <div className="mt-4">
        {showTitle && <h3 className="text-lg font-semibold mb-2">Badges</h3>}
        <p className="text-muted-foreground">No badges earned yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
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
                  className="bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100 flex items-center gap-1 py-1.5"
                >
                  <BadgeIcon badgeId={badge.id} className="text-amber-500" />
                  <span>{badge.name}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="text-xs p-1">
                  <div className="font-medium">{badge.name}</div>
                  {badge.earned_at && (
                    <div>Earned on {new Date(badge.earned_at).toLocaleDateString()}</div>
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
