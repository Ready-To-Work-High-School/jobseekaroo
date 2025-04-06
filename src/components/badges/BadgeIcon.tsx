
import React from 'react';
import { Award, Star, Clock, Brain, Briefcase, Shield, Users, Wand } from 'lucide-react';

// Map badge IDs to their respective icons
export const badgeIconMap: Record<string, React.ReactNode> = {
  reliable: <Clock className="h-5 w-5" />,
  team_player: <Users className="h-5 w-5" />,
  problem_solver: <Brain className="h-5 w-5" />,
  professional: <Briefcase className="h-5 w-5" />,
  adaptable: <Star className="h-5 w-5" />,
  ethical: <Shield className="h-5 w-5" />,
  leader: <Award className="h-5 w-5" />,
  punctual: <Clock className="h-5 w-5" />,
  creative: <Wand className="h-5 w-5" />
};

interface BadgeIconProps {
  badgeId: string;
  className?: string;
  size?: number;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ badgeId, className, size = 5 }) => {
  // Default to Award icon if the badge ID is not found in the map
  const IconComponent = badgeIconMap[badgeId] || <Award className={`h-${size} w-${size}`} />;
  
  return (
    <div className={className}>
      {IconComponent}
    </div>
  );
};

export default BadgeIcon;
