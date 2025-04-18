import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';
import { ApplicationDialog } from '@/components/applications/ApplicationDialog';
import { ApplicationList } from '@/components/applications/ApplicationList';
import { ApplicationHeader } from '@/components/applications/ApplicationHeader';
import { ApplicationFilters } from '@/components/applications/ApplicationFilters';
import { useToast } from '@/hooks/use-toast';
import { ApplicationStatus } from '@/types/application';
import { ApplicationStats } from '@/components/ApplicationStats';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');
  const [statusCounts, setStatusCounts] = useState([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  
  const { user, getApplications } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const animation = useFadeIn(200);

  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      const appData = await getApplications();
      setApplications(appData);
      updateStatusCounts(appData);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load applications',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  useEffect(() => {
    let filtered = applications;
    
    if (activeTab !== 'all') {
      filtered = filtered.filter(app => app.status === activeTab);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        app => 
          app.job_title.toLowerCase().includes(term) || 
          app.company.toLowerCase().includes(term)
      );
    }
    
    setFilteredApplications(filtered);
  }, [applications, activeTab, searchTerm]);

  const updateStatusCounts = (apps) => {
    const counts: { [key in ApplicationStatus]?: number } = {};
    
    const statuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
    statuses.forEach(status => {
      counts[status] = 0;
    });
    
    apps.forEach(app => {
      if (counts[app.status] !== undefined) {
        counts[app.status]! += 1;
      }
    });
    
    const countsArray: StatusCount[] = statuses.map(status => ({
      status,
      count: counts[status] || 0,
    }));
    
    setStatusCounts(countsArray);
  };

  return (
    <Layout>
      <div className={`container max-w-5xl py-8 ${animation}`}>
        <div className="flex flex-col gap-6">
          <ApplicationHeader 
            onAddClick={() => setShowAddDialog(true)} 
            onRefreshClick={loadApplications}
          />

          {applications.length > 0 && (
            <ApplicationStats 
              statusCounts={statusCounts} 
              totalApplications={applications.length}
            />
          )}

          <ApplicationFilters
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            activeTab={activeTab}
            onTabChange={(value) => setActiveTab(value as any)}
          />

          <ApplicationList 
            applications={filteredApplications}
            isLoading={isLoading}
            onUpdate={loadApplications}
            totalCount={applications.length}
            onAddFirst={() => setShowAddDialog(true)}
          />
        </div>
      </div>

      <ApplicationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        showSavedJobs={showSavedJobs}
        setShowSavedJobs={setShowSavedJobs}
        onSuccess={loadApplications}
      />
    </Layout>
  );
};

export default Applications;
