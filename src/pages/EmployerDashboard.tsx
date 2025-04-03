
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployerDashboard = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("postings");
  const navigate = useNavigate();
  
  const handlePostNewJob = () => {
    setActiveTab("create");
  };
  
  return (
    <ProtectedRoute requiredRoles={['employer', 'admin']}>
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <DashboardHeader />
          
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerDashboard;
