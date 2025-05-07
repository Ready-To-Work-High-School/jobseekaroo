
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { useFadeIn } from '@/utils/animations';
import { Shield, AlertTriangle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import JobManagementTable from '@/components/admin/JobManagementTable';
import { Job } from '@/types/job';
import { getAllJobs } from '@/lib/supabase/jobs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { useToast } from '@/hooks/use-toast';

const AdminJobManagement: React.FC = () => {
  const fadeIn = useFadeIn(300);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin, isCeo } = useAdminStatus();
  const { toast } = useToast();
  
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const allJobs = await getAllJobs();
      setJobs(allJobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast({
        title: 'Error fetching jobs',
        description: 'There was a problem retrieving the job catalog.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAllJobs();
  }, []);
  
  const handleRefresh = () => {
    fetchAllJobs();
  };
  
  if (!isAdmin && !isCeo) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You don't have permission to view this page.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className={`container mx-auto px-4 py-8 ${fadeIn}`}>
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold">Job Management</h1>
        </div>
        <p className="text-muted-foreground mb-6">
          View and manage all job postings across the platform
        </p>
        <Separator className="mb-6" />
        
        <JobManagementTable 
          jobs={jobs}
          isLoading={loading}
          onRefresh={handleRefresh}
        />
      </div>
    </Layout>
  );
};

export default AdminJobManagement;
