
import React from 'react';

interface ProgramCardProps {
  image?: string;
  title: string;
  description: string;
}

const ProgramCard = ({ image, title, description }: ProgramCardProps) => {
  return (
    <div className="border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full relative h-40 overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
        {image && <img src={image} alt={title} className="w-full h-full object-scale-down" />}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">
          {description}
        </p>
        <a href="#" className="text-primary font-medium hover:underline inline-flex items-center">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProgramCard;
