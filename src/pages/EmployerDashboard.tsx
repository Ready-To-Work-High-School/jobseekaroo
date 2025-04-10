
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import UnauthenticatedEmployerView from '@/components/employer/dashboard/UnauthenticatedEmployerView';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  // If user is not authenticated, show sign in/sign up options with enhanced features
  if (!user) {
    return (
      <Layout>
        <UnauthenticatedEmployerView />
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
