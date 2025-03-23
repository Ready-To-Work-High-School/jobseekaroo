
import React from 'react';
import IBMBadgesSection from './badges/IBMBadgesSection';
import MicrosoftBadgesSection from './badges/MicrosoftBadgesSection';

const TechCredentialBadges = () => {
  return (
    <div className="space-y-8">
      <IBMBadgesSection />
      <MicrosoftBadgesSection />
    </div>
  );
};

export default TechCredentialBadges;
