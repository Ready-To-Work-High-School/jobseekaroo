
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
        
        {isESB && (
          <img 
            src="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png" 
            alt="ESB Certification" 
            className="absolute -bottom-3 -right-3 h-8 w-8 md:h-10 md:w-10"
          />
        )}
      </div>
      <p className="text-center text-sm font-medium mt-2">{name}</p>
      <span className="text-xs text-muted-foreground text-center mt-1">
        Industry-recognized credential
      </span>
    </div>
  );
};

export default SkillBadge;
