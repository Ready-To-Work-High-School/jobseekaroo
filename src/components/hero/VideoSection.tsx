
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export const VideoSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-12"
    >
      {/* Gradient accent border around video */}
      <div className="p-1 rounded-lg bg-gradient-to-r from-purple-600 via-blue-500 to-amber-500">
        <div className="rounded-lg overflow-hidden shadow-xl relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-10">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                <p className="text-sm text-gray-600">Loading video...</p>
              </div>
            </div>
          )}
          
          {isError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 z-10 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mb-2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p className="text-red-600 font-medium mb-2">Video failed to load</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open("https://www.veed.io/view/a2f96110-1b4c-4e7f-bc4d-73bcb4c28a67", "_blank")}
              >
                Open in Veed.io
              </Button>
            </div>
          )}
          
          <iframe 
            src="https://www.veed.io/embed/a2f96110-1b4c-4e7f-bc4d-73bcb4c28a67?watermark=0&color=purple&sharing=0&title=1" 
            width="744" 
            height="504" 
            frameBorder="0" 
            title="Kickstart Your Career with Ease!" 
            className="w-full aspect-video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      </div>
    </motion.div>
  );
};
