
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Building2, Plus, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Building2 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userProfile?.company_name ? `${userProfile.company_name} Dashboard` : 'Employer Dashboard'}
          </h1>
          <p className="text-gray-600">
            Manage your job postings and connect with qualified student candidates
          </p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/employer/post-job" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Post New Job
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/employer/analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </Link>
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/employer/applicants" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            View Applicants
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
