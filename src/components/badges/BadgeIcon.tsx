
import React from 'react';
import { Award, Star, Clock, Brain, Briefcase, Shield, Users, Wand, Zap, Check, Lightbulb, Target, GraduationCap, Crown } from 'lucide-react';

// Map badge IDs to their respective icons with improved organization
export const badgeIconMap: Record<string, React.ReactNode> = {
  // Character traits
  reliable: <Clock className="h-5 w-5" />,
  team_player: <Users className="h-5 w-5" />,
  punctual: <Clock className="h-5 w-5" />,
  ethical: <Shield className="h-4 w-4" />,
  
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
  goal_oriented: <Target className="h-5 w-5" />,
  
  // School-specific badges
  js4hs: <div className="h-5 w-5 relative flex items-center justify-center">
    <img 
      src="/lovable-uploads/0b66caa3-2a72-475c-981f-fe66e8da8bb0.png" 
      alt="JS4HS" 
      className="h-full w-full object-contain"
    />
  </div>,
  nursing_academy: <div className="h-5 w-5 relative flex items-center justify-center">
    <img 
      src="/lovable-uploads/32e451a9-4fe2-40b0-bfbc-15cfceea8d71.png" 
      alt="Nursing Academy" 
      className="h-full w-full object-contain"
    />
  </div>,
  esb: <div className="h-5 w-5 relative flex items-center justify-center">
    <img 
      src="/lovable-uploads/9babf5b8-1235-48d8-8e19-a555efbf5102.png" 
      alt="Entrepreneurship & Small Business" 
      className="h-full w-full object-contain"
    />
  </div>,
  ibm_skillsbuild: <div className="h-5 w-5 relative flex items-center justify-center">
    <img 
      src="/lovable-uploads/898ea22e-1f00-4da4-92db-b78adabc702a.png" 
      alt="IBM SkillsBuild" 
      className="h-full w-full object-contain"
    />
  </div>,
  
  // Early adopter badges
  founding_member: <Crown className="h-5 w-5" />
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
  
  // Fix the TypeScript error by properly handling the clone element type
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
