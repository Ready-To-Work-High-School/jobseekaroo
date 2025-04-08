
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
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md ${useAmberStyling ? 'border-amber-400' : 'border-border'} border overflow-hidden bg-white flex-shrink-0 flex items-center justify-center`}
        aria-hidden="true"
      >
        <LazyImage
          src={logoUrl}
          alt={`${companyName} logo`}
          className="max-h-10 max-w-10 sm:max-h-11 sm:max-w-11 object-contain relative z-10"
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
