
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/jobs')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        
        <Card className="p-6">
          <div className="mb-4">
            <h1 className="text-2xl font-bold">Job Details</h1>
            <p className="text-muted-foreground">ID: {id}</p>
          </div>
          
          <div className="space-y-4">
            <p>Job details will be loaded here based on the job ID.</p>
            <div className="h-40 bg-muted rounded flex items-center justify-center">
              <p className="text-muted-foreground">Job content placeholder</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default JobDetail;
