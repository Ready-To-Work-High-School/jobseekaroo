
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
  
  // Check if user is CEO based on job title or company name
  const isCeo = userProfile?.job_title?.toLowerCase().includes('ceo') || 
               userProfile?.job_title?.toLowerCase().includes('chief executive') ||
               userProfile?.company_name?.toLowerCase().includes('ceo');
  
  const handlePostNewJob = () => {
    setActiveTab("create");
  };
  
  return (
    <ProtectedRoute requiredRoles={['employer', 'admin']}>
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                {isCeo ? "CEO Job Management Dashboard" : "Employer Dashboard"}
              </h1>
              <p className="text-muted-foreground">
                Welcome{userProfile?.first_name ? `, ${userProfile.first_name}` : ''}! Manage your job postings and applicants.
              </p>
            </div>
            <Button 
              onClick={handlePostNewJob}
              className="gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Post a New Job
            </Button>
          </div>
          
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default EmployerDashboard;
