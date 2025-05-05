
import React from 'react';
import { useFadeIn } from '@/utils/animations';
import { HeroButtons } from '@/components/hero/HeroButtons';
import { VideoSection } from '@/components/hero/VideoSection';

const Hero = () => {
  const fadeIn = useFadeIn(300);

  return (
    <div className={`container mx-auto px-4 py-8 md:py-12 lg:py-16 ${fadeIn}`}>
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Your First Job, <span className="text-primary">Made Simple</span>
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-3xl mx-auto">
          Connecting Westside High School students with credential-ready job opportunities
        </p>
        
        {/* Buttons have high priority - load them early */}
        <HeroButtons />
      </div>

      {/* Video section */}
      <VideoSection />
    </div>
  );
};

export default React.memo(Hero);
