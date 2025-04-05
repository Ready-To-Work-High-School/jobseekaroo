
import React from 'react';
import Layout from "@/components/Layout";
import ParentalConsentFlow from "@/components/consent/ParentalConsentFlow";

const ParentalConsent: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Parental Consent</h1>
          <ParentalConsentFlow />
        </div>
      </div>
    </Layout>
  );
};

export default ParentalConsent;
