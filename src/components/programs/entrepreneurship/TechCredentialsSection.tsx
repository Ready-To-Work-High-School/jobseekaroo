import React from 'react';
import TechCredentialBadges from '../TechCredentialBadges';
const TechCredentialsSection = () => {
  return <div className="mb-12">
      
      <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 p-6 rounded-lg mb-10">
        <p className="text-lg text-center text-gray-800 italic">
          "Our students gain valuable digital credentials in emerging technologies, 
          preparing them for the future of work."
        </p>
      </div>
      <TechCredentialBadges />
    </div>;
};
export default TechCredentialsSection;