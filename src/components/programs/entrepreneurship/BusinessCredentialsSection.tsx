
import React from 'react';
import CredentialsBadges from '@/components/auth/CredentialsBadges';
import CredentialsBadgesSection from '@/components/auth/CredentialsBadgesSection';

const BusinessCredentialsSection = () => {
  return <div className="mb-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Employment Credentials & Certifications</h2>
      <CredentialsBadgesSection />
    </div>;
};

export default BusinessCredentialsSection;
