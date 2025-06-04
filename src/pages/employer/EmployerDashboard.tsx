
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import UnauthenticatedEmployerView from '@/components/employer/dashboard/UnauthenticatedEmployerView';
import FreemiumBanner from '@/components/employer/premium/FreemiumBanner';
import PremiumFeaturesDisplay from '@/components/employer/premium/PremiumFeaturesDisplay';
import EmployerKeyFeatures from '@/components/employer/dashboard/EmployerKeyFeatures';
import { Helmet } from 'react-helmet';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  if (!user) {
    return (
      <Layout>
        <Helmet>
          <title>Employer Dashboard | JobSeeker4HS</title>
        </Helmet>
        <UnauthenticatedEmployerView />
      </Layout>
    );
  }

  // For authenticated users - show employer-specific content only
  return (
    <Layout>
      <Helmet>
        <title>Employer Dashboard | JobSeeker4HS</title>
      </Helmet>
      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        <DashboardHeader />
        
        {/* Display FreemiumBanner prominently at the top */}
        <FreemiumBanner />
        
        {/* Show key employer features */}
        <EmployerKeyFeatures />
        
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Show Premium Features at the bottom of the page */}
        <div className="mt-12 pt-6 border-t">
          <PremiumFeaturesDisplay />
        </div>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
