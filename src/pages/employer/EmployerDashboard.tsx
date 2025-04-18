
import { useState } from 'react';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import DashboardHeader from '@/components/employer/DashboardHeader';
import DashboardTabs from '@/components/employer/DashboardTabs';
import UnauthenticatedEmployerView from '@/components/employer/dashboard/UnauthenticatedEmployerView';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

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
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Employer Dashboard</h1>
            <p className="text-muted-foreground">Manage your job postings and applicants</p>
          </div>
          
          <Button asChild className="mt-2 md:mt-0 bg-gradient-to-r from-primary/80 to-primary">
            <Link to="/employer/premium-features" className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1.5" />
              Premium Features
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Link>
          </Button>
        </div>
        
        <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
