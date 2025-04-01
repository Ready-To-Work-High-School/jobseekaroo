
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import { useState } from 'react';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  
  return (
    <ProtectedRoute requiredRoles={['employer']}>
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <DashboardHeader setActiveTab={setActiveTab} />
          <DashboardTabs />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerDashboard;
