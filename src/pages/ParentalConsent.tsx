
import React from 'react';
import Layout from "@/components/Layout";
import ParentalConsentFlow from "@/components/consent/ParentalConsentFlow";
import { useLocation, Navigate } from 'react-router-dom';

const ParentalConsent: React.FC = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  // If no user data was provided, redirect back to signup
  if (!userData) {
    return <Navigate to="/sign-up" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Parental Consent Required</h1>
          <ParentalConsentFlow initialUserData={userData} />
        </div>
      </div>
    </Layout>
  );
};

export default ParentalConsent;
