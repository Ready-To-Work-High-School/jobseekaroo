
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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {/* JS4HS Logo - Primary Program */}
      <IndustryCertificationBadge
        imageSrc="/lovable-uploads/0b66caa3-2a72-475c-981f-fe66e8da8bb0.png"
        name="Job Seekers 4 High Schools"
        subtitle="Main program"
        width={200}
        height={200}
      />
      
      {/* ESB Badge - Entrepreneurship */}
      <IndustryCertificationBadge
        imageSrc="/lovable-uploads/9babf5b8-1235-48d8-8e19-a555efbf5102.png"
        name="Entrepreneurship &amp; Small Business"
        subtitle="Industry-recognized credential"
        width={200}
        height={200}
      />
      
      {/* Nursing Academy Badge */}
      <IndustryCertificationBadge
        imageSrc="/lovable-uploads/32e451a9-4fe2-40b0-bfbc-15cfceea8d71.png"
        name="Nursing Academy"
        subtitle="CNA certification pathway"
        width={200}
        height={200}
      />
      
      {/* IBM SkillsBuild Badge */}
      <IndustryCertificationBadge
        imageSrc="/lovable-uploads/898ea22e-1f00-4da4-92db-b78adabc702a.png"
        name="AI Foundations"
        subtitle="IBM SkillsBuild & ISTE"
        width={200}
        height={200}
      />
      
      {/* Show other badges if provided */}
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
    </div>
  );
};

export default BadgeGrid;
