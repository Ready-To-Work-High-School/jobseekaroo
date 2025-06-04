
import React from 'react';
import Layout from '@/components/Layout';
import EmployerOnboardingFlow from '@/components/employer/onboarding/EmployerOnboardingFlow';

const EmployerOnboarding: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/a051d480-e6ba-4e2e-8f5c-69229c03b3f9.png" 
            alt="Job Seekers 4 High Schools Logo" 
            className="h-20 md:h-24 w-auto object-contain"
            width="200"
            height="200"
            loading="eager"
          />
        </div>
        
        <EmployerOnboardingFlow />
      </div>
    </Layout>
  );
};

export default EmployerOnboarding;
