
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import UnauthenticatedEmployerView from '@/components/employer/dashboard/UnauthenticatedEmployerView';
import EmployerBenefits from '@/components/employer/EmployerBenefits';
import EmployerDirectAccessSection from '@/components/employer/dashboard/EmployerDirectAccessSection';
import EmployerPremiumServices from '@/components/employer/premium/EmployerPremiumServices';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  if (!user) {
    return (
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-8 space-y-12">
          <EmployerBenefits />
          <EmployerDirectAccessSection />
          <EmployerPremiumServices />
        </div>
      </Layout>
    );
  }

  // For authenticated users, show dashboard with enhanced benefits summary
  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6 space-y-10">
        <DashboardHeader />
        <div className="mb-8">
          <EmployerBenefits />
        </div>
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
