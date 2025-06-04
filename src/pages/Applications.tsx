
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
import { ApplicationStatus, StatusCount } from '@/types/application';
import { ApplicationStats } from '@/components/ApplicationStats';
import ErrorBoundary from '@/utils/ErrorBoundary';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
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
    // Don't set loading if we already have applications to prevent flickering
    if (applications.length === 0) {
      setIsLoading(true);
    }
    
    try {
      // Check if we're online before attempting to fetch
      if (!navigator.onLine) {
        setError("You appear to be offline. Please check your connection.");
        return;
      }
      
      const appData = await getApplications();
      
      // Guard against undefined data
      if (!appData) {
        throw new Error("Failed to retrieve application data");
      }
      
      setApplications(appData);
      setError(null);
      updateStatusCounts(appData);
    } catch (error) {
      console.error('Error loading applications:', error);
      setError("Failed to load applications. You may be experiencing connection issues.");
      
      // Only show toast on first error
      if (retryCount === 0) {
        toast({
          title: 'Connection Error',
          description: 'Unable to load your applications. Please check your network connection.',
          variant: 'destructive',
        });
      }
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadApplications();
    }
    
    // If we have an error, set up a retry mechanism
    if (error) {
      const retryTimer = setTimeout(() => {
        // Only retry 3 times automatically
        if (retryCount < 3 && navigator.onLine) {
          loadApplications();
        }
      }, 5000);
      
      return () => clearTimeout(retryTimer);
    }
  }, [user, error, retryCount]);

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
        <ErrorBoundary>
          <div className="flex flex-col gap-6 application-form">
            <ApplicationHeader 
              onAddClick={() => setShowAddDialog(true)} 
              onRefreshClick={loadApplications}
            />

            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-md p-4">
                <p className="text-destructive">{error}</p>
                <button 
                  onClick={loadApplications}
                  className="mt-2 text-sm font-medium text-primary hover:underline"
                >
                  Retry now
                </button>
              </div>
            )}

            {applications.length > 0 && !error && (
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
        </ErrorBoundary>
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
