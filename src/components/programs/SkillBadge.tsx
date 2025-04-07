
import React from 'react';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/LazyImage';

interface SkillBadgeProps {
  image: string;
  name: string;
  isESB?: boolean;
  width?: number;
  height?: number;
  webpImage?: string;
  avifImage?: string;
}

const SkillBadge = ({ 
  image, 
  name, 
  width = 150, 
  height = 150, 
  webpImage,
  avifImage
}: SkillBadgeProps) => {
  return (
    <div className="skill-badge hover:scale-105 transition-transform flex flex-col items-center">
      <div className="relative">
        <LazyImage 
          src={image} 
          webpSrc={webpImage}
          avifSrc={avifImage}
          alt={`${name} Badge`} 
          className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" 
          width={width}
          height={height}
        />
        <Badge className="absolute -top-2 -right-2 bg-primary text-white text-xs" size="sm">Certified</Badge>
      </div>
      <p className="text-center text-sm font-medium mt-2">{name}</p>
      <span className="text-xs text-muted-foreground text-center mt-1">
        Industry-recognized credential
      </span>
    </div>
  );
};

export default SkillBadge;
