
import React from 'react';
import SkillBadge from '../SkillBadge';
import IndustryCertificationBadge from './IndustryCertificationBadge';

interface BadgeData {
  image: string;
  webpImage?: string;
  avifImage?: string;
  name: string;
  width: number;
  height: number;
}

interface BadgeGridProps {
  badges: BadgeData[];
}

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  // Only render a subset of badges if there are too many
  const optimizedBadges = badges.length > 10 ? badges.slice(0, 10) : badges;
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {optimizedBadges.map((badge, index) => (
        <SkillBadge 
          key={index} 
          image={badge.image} 
          webpImage={badge.webpImage}
          avifImage={badge.avifImage}
          name={badge.name} 
          width={badge.width} 
          height={badge.height} 
        />
      ))}
      
      {/* ESB Badge - Entrepreneurship */}
      <IndustryCertificationBadge
        imageSrc="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.png"
        webpSrc="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.webp"
        avifSrc="/lovable-uploads/92527ccc-ba6d-4860-99fb-a70c0c3955b6.avif"
        name="Entrepreneurship &amp; Small Business"
        subtitle="Industry-recognized credential"
      />
      
      {/* Nursing Academy Badge */}
      <IndustryCertificationBadge
        imageSrc="/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.png"
        webpSrc="/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.webp"
        avifSrc="/lovable-uploads/e624fc50-435f-4c99-96dc-bbace0660393.avif"
        name="Nursing Assistant"
        subtitle="CNA certification pathway"
      />
    </div>
  );
};

export default BadgeGrid;
