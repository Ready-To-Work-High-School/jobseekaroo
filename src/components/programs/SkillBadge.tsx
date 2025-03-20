
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SkillBadgeProps {
  image: string;
  name: string;
  isESB?: boolean;
}

const SkillBadge = ({ image, name, isESB = false }: SkillBadgeProps) => {
  return (
    <div className="skill-badge hover:scale-105 transition-transform flex flex-col items-center">
      <div className="relative">
        <img 
          src={image} 
          alt={`${name} Badge`} 
          className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" 
        />
        <Badge className="absolute -top-2 -right-2 bg-primary text-white">Certified</Badge>
      </div>
      <p className="text-center text-sm font-medium mt-2">{name}</p>
      <span className="text-xs text-muted-foreground text-center mt-1">
        Industry-recognized credential
      </span>
    </div>
  );
};

export default SkillBadge;
