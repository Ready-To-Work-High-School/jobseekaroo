
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import EmployerOnboardingFlow from '@/components/employer/onboarding/EmployerOnboardingFlow';
import LogoBackgroundRemover from '@/components/employer/onboarding/LogoBackgroundRemover';

const EmployerOnboarding: React.FC = () => {
  const [logoSrc, setLogoSrc] = useState("/lovable-uploads/3ba4c5f8-5ab2-4f8f-ba65-5c9fbae68408.png");

  const handleProcessedImage = (processedImageUrl: string) => {
    setLogoSrc(processedImageUrl);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img 
            src={logoSrc}
            alt="Job Seekers 4 High Schools Logo" 
            className="h-32 md:h-40 w-auto object-contain"
            width="300"
            height="300"
            loading="eager"
          />
        </div>
        
        {/* Background Removal Tool */}
        <div className="flex justify-center mb-8">
          <LogoBackgroundRemover 
            originalImageSrc="/lovable-uploads/3ba4c5f8-5ab2-4f8f-ba65-5c9fbae68408.png"
            onProcessedImage={handleProcessedImage}
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-center">Employer Registration</h1>
        <EmployerOnboardingFlow />
      </div>
    </Layout>
  );
};

export default EmployerOnboarding;
