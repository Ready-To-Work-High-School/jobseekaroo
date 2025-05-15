
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { SearchX, Plus } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { Job } from '@/types/job';
import { normalizeJob } from '@/utils/jobAdapter';
import ApplicationForm from './ApplicationForm';

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showSavedJobs: boolean;
  setShowSavedJobs: (show: boolean) => void;
  onSuccess: () => void;
}

export const ApplicationDialog = ({
  open,
  onOpenChange,
  showSavedJobs,
  setShowSavedJobs,
  onSuccess
}: ApplicationDialogProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchSavedJobs = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // For now, load mock jobs (this would be replaced with actual API call)
      // const { data, error } = await supabase
      //  .from('saved_jobs')
      //  .select('job_id')
      //  .eq('user_id', user.id);
      
      // This is a mock implementation
      setTimeout(() => {
        const mockJobs: Job[] = [
          {
            id: 'job-001',
            title: 'Frontend Developer',
            company_name: 'Tech Solutions',
            company: { name: 'Tech Solutions' },
            location_city: 'San Francisco',
            location_state: 'CA',
            location_zip: '94105',
            location: { city: 'San Francisco', state: 'CA', zip: '94105' },
            description: 'Frontend development position',
            requirements: ['React', 'TypeScript'],
            pay_rate_min: 25,
            pay_rate_max: 35,
            pay_rate_period: 'hourly',
            payRate: { min: 25, max: 35, period: 'hourly' },
            job_type: 'full-time',
            type: 'full-time',
            experience_level: 'mid-level',
            experienceLevel: 'mid-level',
            is_remote: false,
            isRemote: false,
            posted_date: '2023-06-15',
            postedDate: '2023-06-15',
            created_at: '2023-06-15',
            updated_at: '2023-06-15'
          },
          {
            id: 'job-002',
            title: 'UX Designer',
            company_name: 'Creative Inc',
            company: { name: 'Creative Inc' },
            location_city: 'Austin',
            location_state: 'TX',
            location_zip: '78701',
            location: { city: 'Austin', state: 'TX', zip: '78701' },
            description: 'UX design position',
            requirements: ['Figma', 'Adobe XD'],
            pay_rate_min: 30,
            pay_rate_max: 40,
            pay_rate_period: 'hourly',
            payRate: { min: 30, max: 40, period: 'hourly' },
            job_type: 'full-time',
            type: 'full-time',
            experience_level: 'mid-level',
            experienceLevel: 'mid-level',
            is_remote: true,
            isRemote: true,
            posted_date: '2023-06-10',
            postedDate: '2023-06-10',
            created_at: '2023-06-10',
            updated_at: '2023-06-10'
          }
        ];
        
        setSavedJobs(mockJobs);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      setIsLoading(false);
    }
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(normalizeJob(job));
  };

  const handleCancelSelected = () => {
    setSelectedJob(null);
  };

  // Fetch saved jobs when dialog opens
  useState(() => {
    if (open && showSavedJobs) {
      fetchSavedJobs();
    }
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <Tabs defaultValue={showSavedJobs ? 'saved-jobs' : 'manual-entry'}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger 
              value="manual-entry"
              onClick={() => setShowSavedJobs(false)}
            >
              Manual Entry
            </TabsTrigger>
            <TabsTrigger 
              value="saved-jobs"
              onClick={() => {
                setShowSavedJobs(true);
                fetchSavedJobs();
              }}
            >
              Saved Jobs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual-entry" className="px-1">
            <ApplicationForm
              onCancel={() => onOpenChange(false)}
              onSuccess={onSuccess}
            />
          </TabsContent>
          
          <TabsContent value="saved-jobs" className="px-1">
            {selectedJob ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Apply for {selectedJob.title}</h3>
                  <Button variant="outline" size="sm" onClick={handleCancelSelected}>
                    Select Different Job
                  </Button>
                </div>
                <ApplicationForm
                  selectedJob={selectedJob}
                  onCancel={() => setSelectedJob(null)}
                  onSuccess={onSuccess}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select a saved job</h3>
                
                {isLoading ? (
                  <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : savedJobs.length > 0 ? (
                  <div className="grid gap-2">
                    {savedJobs.map((job) => {
                      const normalizedJob = normalizeJob(job);
                      return (
                        <div 
                          key={job.id}
                          className="flex justify-between items-center p-3 border rounded-md hover:bg-muted cursor-pointer"
                          onClick={() => handleSelectJob(job)}
                        >
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {typeof job.company === 'object' ? job.company.name : job.company_name || 'Unknown Company'}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4 mr-1" /> Apply
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <SearchX className="h-12 w-12 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No saved jobs found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      You haven't saved any jobs yet. Save jobs to easily apply to them later.
                    </p>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                      Close
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
