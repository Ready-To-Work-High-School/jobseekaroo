
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationStats } from '@/components/ApplicationStats';
import { useToast } from '@/hooks/use-toast';
import { Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ApplicationsHeader } from './ApplicationsHeader';
import { AddApplicationDialog } from './AddApplicationDialog';
import { NoApplicationsFound } from './NoApplicationsFound';

const ApplicationsPage = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');
  const [statusCounts, setStatusCounts] = useState<{ status: ApplicationStatus; count: number }[]>([]);
  
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

  const updateStatusCounts = (apps: JobApplication[]) => {
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
    
    const countsArray = statuses.map(status => ({
      status,
      count: counts[status] || 0,
    }));
    
    setStatusCounts(countsArray);
  };

  return (
    <Layout>
      <div className={`container max-w-5xl py-8 ${animation}`}>
        <div className="flex flex-col gap-6">
          <ApplicationsHeader 
            onAddApplication={() => setShowAddDialog(true)}
            onRefresh={loadApplications}
          />

          {applications.length > 0 && (
            <ApplicationStats 
              statusCounts={statusCounts} 
              totalApplications={applications.length}
            />
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">Filter:</span>
            </div>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="applied">Applied</TabsTrigger>
                <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
                <TabsTrigger value="offered">Offered</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : filteredApplications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredApplications.map((application) => (
                <ApplicationCard 
                  key={application.id} 
                  application={application} 
                  onUpdate={loadApplications}
                />
              ))}
            </div>
          ) : (
            <NoApplicationsFound 
              hasApplications={applications.length > 0}
              onAddApplication={() => setShowAddDialog(true)}
            />
          )}
        </div>
      </div>

      <AddApplicationDialog 
        isOpen={showAddDialog} 
        onOpenChange={setShowAddDialog}
        onApplicationAdded={loadApplications}
      />
    </Layout>
  );
};

export default ApplicationsPage;
