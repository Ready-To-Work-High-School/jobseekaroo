import React from 'react';
interface ProminentLogoProps {
  className?: string;
}
const ProminentLogo = ({
  className = ""
}: ProminentLogoProps) => {
  return <div className={`flex justify-center ${className}`}>
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg border">
        
      </div>
    </div>;
};
export default ProminentLogo;