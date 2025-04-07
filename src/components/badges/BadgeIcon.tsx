
import React from 'react';
import { Award, Star, Clock, Brain, Briefcase, Shield, Users, Wand, Zap, Check, Lightbulb, Target } from 'lucide-react';

// Map badge IDs to their respective icons with improved organization
export const badgeIconMap: Record<string, React.ReactNode> = {
  // Character traits
  reliable: <Clock className="h-5 w-5" />,
  team_player: <Users className="h-5 w-5" />,
  punctual: <Clock className="h-5 w-5" />,
  ethical: <Shield className="h-5 w-5" />,
  
  // Skills
  problem_solver: <Brain className="h-5 w-5" />,
  professional: <Briefcase className="h-5 w-5" />,
  adaptable: <Star className="h-5 w-5" />,
  leader: <Award className="h-5 w-5" />,
  creative: <Wand className="h-5 w-5" />,
  
  // Additional badges
  initiative: <Zap className="h-5 w-5" />,
  achievement: <Check className="h-5 w-5" />,
  innovative: <Lightbulb className="h-5 w-5" />,
  goal_oriented: <Target className="h-5 w-5" />
};

interface BadgeIconProps {
  badgeId: string;
  className?: string;
  size?: number;
}

export const BadgeIcon: React.FC<BadgeIconProps> = ({ badgeId, className = "", size = 5 }) => {
  // Get the icon component based on the badgeId
  const iconElement = badgeIconMap[badgeId];
  
  // If no matching icon is found, use a default
  if (!iconElement) {
    return (
      <div className={className}>
        <Award className={`h-${size} w-${size}`} />
      </div>
    );
  }
  
  // For existing icons, we need to ensure proper sizing if customized
  if (size !== 5 && React.isValidElement(iconElement)) {
    return (
      <div className={className}>
        {React.cloneElement(iconElement as React.ReactElement, {
          className: `h-${size} w-${size}`
        })}
      </div>
    );
  }
  
  // Return the icon with the original className
  return (
    <div className={className}>
      {iconElement}
    </div>
  );
};

export default BadgeIcon;
