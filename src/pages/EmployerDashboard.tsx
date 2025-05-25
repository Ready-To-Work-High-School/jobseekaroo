
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import UnauthenticatedEmployerView from '@/components/employer/dashboard/UnauthenticatedEmployerView';
import EmployerKeyFeatures from '@/components/employer/dashboard/EmployerKeyFeatures';
import EmployerDirectAccessSection from '@/components/employer/dashboard/EmployerDirectAccessSection';
import EmployerPremiumServices from '@/components/employer/premium/EmployerPremiumServices';
import EmployerSignUpPrompt from '@/components/employer/EmployerSignUpPrompt';
import EmployerWhatYouGetSection from '@/components/employer/EmployerWhatYouGetSection';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  // If user is not authenticated, show sign in/sign up options with enhanced features
  if (!user) {
    return (
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-12">
          <EmployerKeyFeatures />
          <EmployerWhatYouGetSection />
          <EmployerSignUpPrompt />
          <EmployerDirectAccessSection />
          <EmployerPremiumServices />
        </div>
      </Layout>
    );
  }
  
  // For authenticated users, show the actual dashboard
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <DashboardHeader />
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
