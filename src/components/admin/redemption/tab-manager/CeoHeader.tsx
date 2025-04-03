
import React from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CeoHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleManageJobs = () => {
    navigate('/employer-dashboard');
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold">CEO Dashboard</h2>
        <p className="text-sm text-muted-foreground">Manage codes and job postings</p>
      </div>
      <Button 
        onClick={handleManageJobs} 
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Briefcase className="h-4 w-4" />
        Manage Job Postings
      </Button>
    </div>
  );
};

export default CeoHeader;
