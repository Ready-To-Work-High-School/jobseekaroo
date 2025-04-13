
import React, { useState } from 'react';

interface CanvaEmbedProps {
  designId: string;
  designName?: string;
  authorName?: string;
  aspectRatio?: string; // Format like "56.25%" for 16:9
  className?: string;
}

const CanvaEmbed: React.FC<CanvaEmbedProps> = ({
  designId,
  designName = "Canva Design",
  authorName,
  aspectRatio = "56.2225%",
  className = "",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleIframeLoad = () => {
    setIsLoaded(true);
  };
  
  const handleIframeError = () => {
    setIsError(true);
    console.error("Failed to load Canva embed");
  };

  // Build the Canva embed URL
  const embedUrl = `https://www.canva.com/design/${designId}/view?embed`;
  const shareUrl = `https://www.canva.com/design/${designId}/view?utm_content=${designId}&utm_campaign=designshare&utm_medium=embeds&utm_source=link`;

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Loading spinner overlay */}
        {!isLoaded && !isError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-10">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Error state */}
        {isError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10 p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="text-red-600 font-medium">Failed to load the Canva design</p>
            <a 
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              View design on Canva
            </a>
          </div>
        )}
        
        {/* Responsive container with custom aspect ratio */}
        <div 
          className="relative w-full"
          style={{ 
            paddingTop: aspectRatio,
            boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
            overflow: "hidden",
            borderRadius: "8px", 
            willChange: "transform"
          }}
        >
          <iframe 
            loading="lazy" 
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            className={`absolute top-0 left-0 w-full h-full border-0 p-0 m-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={embedUrl.replace('designId', designId)}
            allowFullScreen={true}
            allow="fullscreen"
            title={designName}
          />
        </div>
        
        {/* Attribution with better styling */}
        {(designName || authorName) && (
          <div className="flex flex-wrap items-center justify-center mt-3 mb-2 text-center px-2">
            {designName && (
              <a 
                href={shareUrl.replace(/designId/g, designId)}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>
                <span>{designName}</span>
              </a>
            )}
            
            {designName && authorName && (
              <span className="mx-2 text-gray-400">•</span>
            )}
            
            {authorName && (
              <span className="text-sm text-gray-500">by {authorName}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvaEmbed;
