
import React from 'react';
import { Badge } from '@/components/ui/badge';
import LazyImage from '@/components/LazyImage';
import { getImageSizes } from '@/utils/imageUtils';

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
    <div className="skill-badge hover:scale-110 transition-all duration-300 flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-400 rounded-lg blur-sm opacity-20"></div>
        <LazyImage 
          src={imageSrc} 
          webpSrc={webpSrc}
          avifSrc={avifSrc}
          alt={`${name} Certification`} 
          className="rounded-lg shadow-lg w-auto mx-auto relative z-10 object-contain h-[120px] md:h-[140px]" 
          width={width}
          height={height}
          sizes={getImageSizes('badge')}
          placeholderSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23dddddd' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='8' r='7'%3E%3C/circle%3E%3Cpolyline points='8.21 13.89 7 23 12 20 17 23 15.79 13.88'%3E%3C/polyline%3E%3C/svg%3E"
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
