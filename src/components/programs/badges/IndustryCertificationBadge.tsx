
import React from 'react';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/LazyImage';

interface IndustryCertificationBadgeProps {
  imageSrc: string;
  webpSrc?: string;
  avifSrc?: string;
  name: string;
  subtitle: string;
  width?: number;
  height?: number;
}

const IndustryCertificationBadge = ({
  imageSrc,
  webpSrc,
  avifSrc,
  name,
  subtitle,
  width = 180,
  height = 180
}: IndustryCertificationBadgeProps) => {
  return (
    <div className="skill-badge transform hover:scale-110 transition-all duration-300 flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20 animate-pulse"></div>
        <LazyImage 
          src={imageSrc} 
          webpSrc={webpSrc}
          avifSrc={avifSrc}
          alt={`${name} Certification`} 
          className="rounded-lg shadow-lg h-21 md:h-30 w-auto mx-auto relative z-10 object-fill" 
          width={width}
          height={height}
        />
        <Badge className="absolute -top-2 -right-2 bg-red-600 text-white shadow-md z-20">Industry Certification</Badge>
      </div>
      <p className="text-center text-sm font-semibold mt-2">{name}</p>
      <span className="text-xs text-blue-800 text-center mt-1 font-medium">
        {subtitle}
      </span>
    </div>
  );
};

export default IndustryCertificationBadge;
