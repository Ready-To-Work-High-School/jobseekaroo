
import { useState } from 'react';
import LazyImage from '../LazyImage';

interface JobCardLogoProps {
  logoUrl: string | undefined;
  companyName: string;
  useAmberStyling: boolean;
}

const JobCardLogo = ({ logoUrl, companyName, useAmberStyling }: JobCardLogoProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (logoUrl) {
    return (
      <div 
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md ${useAmberStyling ? 'border-amber-400' : 'border-border'} border overflow-hidden bg-muted flex-shrink-0`}
        aria-hidden="true"
      >
        <LazyImage
          src={logoUrl}
          alt={`${companyName} logo`}
          className="w-full h-full object-contain relative z-10 rounded-md"
          onLoad={() => setImageLoaded(true)}
          width="48"
          height="48"
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md border ${useAmberStyling ? 'border-amber-400 bg-amber-50' : 'border-border bg-primary/10'} flex items-center justify-center flex-shrink-0`}
      aria-hidden="true"
    >
      <span className={`${useAmberStyling ? 'text-amber-600' : 'text-primary'} font-medium text-base sm:text-lg`}>
        {companyName.substring(0, 1)}
      </span>
    </div>
  );
};

export default JobCardLogo;
