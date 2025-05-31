
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
            className="h-32 md:h-40 w-auto object-contain"
            width="300"
            height="300"
            loading="eager"
          />
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-center">Employer Onboarding</h1>
        <EmployerOnboardingFlow />
      </div>
    </Layout>
  );
};

export default EmployerOnboarding;
