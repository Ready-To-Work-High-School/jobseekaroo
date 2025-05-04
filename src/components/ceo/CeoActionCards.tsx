
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutList, Briefcase } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CeoActionCards: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="shadow-md border-purple-100 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <LayoutList className="h-5 w-5 text-purple-600" />
            <CardTitle>Employer Job Posting Approvals</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            CEOs/Admins: Easily review and approve or deny all pending employer job postings in one place.
          </p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600"
            onClick={() => navigate('/admin/employer-verification')}
          >
            Go to Approvals
          </Button>
        </CardContent>
      </Card>
      
      <Card className="shadow-md border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="h-5 w-5 text-amber-600" />
            <CardTitle>Job Management</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Create new job listings or use our automatic internship scraper to find opportunities in Jacksonville.
          </p>
          <Button
            className="bg-gradient-to-r from-amber-600 to-orange-500 text-white"
            onClick={() => navigate('/admin/job-management')}
          >
            Manage Jobs
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CeoActionCards;
