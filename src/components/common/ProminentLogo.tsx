
import React from 'react';

interface ProminentLogoProps {
  className?: string;
}

const ProminentLogo = ({ className = "" }: ProminentLogoProps) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border">
        <img 
          src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
          alt="Job Seekers 4 High Schools - Main Logo" 
          className="w-32 h-32 md:w-48 md:h-48 object-contain mx-auto"
        />
      </div>
    </div>
  );
};

export default ProminentLogo;
