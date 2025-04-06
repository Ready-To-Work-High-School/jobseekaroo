
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Star, Users, Clock, Brain, Briefcase, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import BadgeIcon from '@/components/badges/BadgeIcon';

export interface StudentBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  type: 'skill' | 'character' | 'achievement';
}

interface StudentBadgesProps {
  badges: StudentBadge[];
  showEarnBadgeButton?: boolean;
  onEarnBadgeClick?: (badgeId: string) => void;
}

const BadgeIconComponent = ({ badge }: { badge: StudentBadge }) => {
  return (
    <div className={`${badge.earned ? 'text-amber-500' : 'text-gray-400'} ${badge.earned ? 'opacity-100' : 'opacity-60'}`}>
      <BadgeIcon badgeId={badge.id} />
    </div>
  );
};

const StudentBadges: React.FC<StudentBadgesProps> = ({ 
  badges, 
  showEarnBadgeButton = false,
  onEarnBadgeClick 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Your Career Badges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Earn badges by completing quizzes and receiving employer endorsements.
            These badges showcase your skills and character to future employers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`border rounded-md p-3 flex items-center gap-3 
              ${badge.earned ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="shrink-0">
                <BadgeIconComponent badge={badge} />
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{badge.name}</h3>
                  {badge.earned && (
                    <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-800 border-amber-200">
                      Earned
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                {badge.earned && badge.earnedDate && (
                  <p className="text-xs text-amber-700 mt-1">Earned on {badge.earnedDate}</p>
                )}
                {!badge.earned && showEarnBadgeButton && (
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-700 underline mt-1"
                    onClick={() => onEarnBadgeClick && onEarnBadgeClick(badge.id)}
                  >
                    Take quiz to earn
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentBadges;
