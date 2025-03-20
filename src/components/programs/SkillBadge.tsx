
import React from 'react';

interface SkillBadgeProps {
  image: string;
  name: string;
}

const SkillBadge = ({ image, name }: SkillBadgeProps) => {
  return (
    <div className="skill-badge hover:scale-105 transition-transform">
      <img src={image} alt={`${name} Badge`} className="rounded-lg shadow-md h-32 md:h-40 w-auto mx-auto" />
      <p className="text-center text-sm font-medium mt-2">{name}</p>
    </div>
  );
};

export default SkillBadge;
