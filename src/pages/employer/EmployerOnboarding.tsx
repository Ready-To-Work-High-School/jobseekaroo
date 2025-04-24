
import React from 'react';
import Layout from '@/components/Layout';
import EmployerOnboardingFlow from '@/components/employer/onboarding/EmployerOnboardingFlow';

const EmployerOnboarding: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">Employer Registration</h1>
        <EmployerOnboardingFlow />
      </div>
    </Layout>
  );
};

export default EmployerOnboarding;
