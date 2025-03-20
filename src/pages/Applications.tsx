
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useFadeIn } from '@/utils/animations';
import { JobApplication, StatusCount, ApplicationStatus } from '@/types/application';
import { ApplicationCard } from '@/components/ApplicationCard';
import { ApplicationStats } from '@/components/ApplicationStats';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import { getJobById } from '@/lib/mock-data';
import { Job } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Filter, Search, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

const formSchema = z.object({
  job_title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  applied_date: z.string().min(2, "Application date is required"),
  status: z.enum(['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn']),
  notes: z.string().optional(),
  contact_name: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal('')),
  next_step: z.string().optional(),
  next_step_date: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Applications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'all'>('all');
  const [statusCounts, setStatusCounts] = useState<StatusCount[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  
  const { user, getApplications, createApplication, getSavedJobs } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const animation = useFadeIn(200);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: '',
      company: '',
      applied_date: new Date().toISOString().substring(0, 10),
      status: 'applied',
      notes: '',
      contact_name: '',
      contact_email: '',
      next_step: '',
      next_step_date: '',
    },
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/sign-in');
    }
  }, [user, navigate]);

  // Load applications
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

  // Load applications on mount
  useEffect(() => {
    if (user) {
      loadApplications();
    }
  }, [user]);

  // Filter applications based on search term and active tab
  useEffect(() => {
    let filtered = applications;
    
    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(app => app.status === activeTab);
    }
    
    // Filter by search term
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

  // Calculate status counts
  const updateStatusCounts = (apps: JobApplication[]) => {
    const counts: { [key in ApplicationStatus]?: number } = {};
    
    // Initialize all statuses with 0
    const statuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];
    statuses.forEach(status => {
      counts[status] = 0;
    });
    
    // Count applications by status
    apps.forEach(app => {
      if (counts[app.status] !== undefined) {
        counts[app.status]! += 1;
      }
    });
    
    // Convert to array for component
    const countsArray: StatusCount[] = statuses.map(status => ({
      status,
      count: counts[status] || 0,
    }));
    
    setStatusCounts(countsArray);
  };

  // Load saved jobs when adding application
  const loadSavedJobs = async () => {
    if (!user) return;
    
    try {
      const savedJobIds = await getSavedJobs();
      const jobDetails = savedJobIds.map(id => getJobById(id)).filter(Boolean) as Job[];
      setSavedJobs(jobDetails);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  // Pre-fill form with saved job data
  const prefillWithSavedJob = (job: Job) => {
    form.setValue('job_title', job.title);
    form.setValue('company', job.company);
    setSelectedJob(job);
    setShowSavedJobs(false);
  };

  // Handle new application submission
  const onSubmit = async (values: FormValues) => {
    setIsAdding(true);
    
    try {
      const newApplication = {
        job_id: selectedJob?.id || 'manual-entry',
        ...values,
      };
      
      await createApplication(newApplication);
      
      toast({
        title: 'Application added',
        description: 'Your job application has been added to tracking',
      });
      
      setShowAddDialog(false);
      form.reset({
        job_title: '',
        company: '',
        applied_date: new Date().toISOString().substring(0, 10),
        status: 'applied',
        notes: '',
        contact_name: '',
        contact_email: '',
        next_step: '',
        next_step_date: '',
      });
      setSelectedJob(null);
      
      // Reload applications
      loadApplications();
      
    } catch (error) {
      console.error('Error adding application:', error);
      toast({
        title: 'Error',
        description: 'Failed to add application',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Layout>
      <div className={`container max-w-5xl py-8 ${animation}`}>
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
              <p className="text-muted-foreground mt-1">
                Track and manage your job applications
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={loadApplications}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
              <Button onClick={() => {
                setShowAddDialog(true);
                loadSavedJobs();
              }}>
                <Plus className="h-4 w-4 mr-1" />
                Add Application
              </Button>
            </div>
          </div>

          {/* Stats */}
          {applications.length > 0 && (
            <ApplicationStats 
              statusCounts={statusCounts} 
              totalApplications={applications.length}
            />
          )}

          {/* Filters and Search */}
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
              <Filter className="h-4 w-4 text-muted-foreground" />
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

          {/* Applications List */}
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
            <div className="text-center py-12 bg-secondary/20 rounded-lg">
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-muted-foreground"
                >
                  <rect width="8" height="14" x="8" y="5" rx="1" />
                  <path d="M4 5h4" />
                  <path d="M16 5h4" />
                  <path d="M4 10h4" />
                  <path d="M16 10h4" />
                  <path d="M4 15h4" />
                  <path d="M16 15h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium">No applications found</h3>
              <p className="text-muted-foreground mt-1 mb-4 max-w-md mx-auto">
                {applications.length === 0 
                  ? "You haven't added any job applications to track yet."
                  : "No applications match your current filters."}
              </p>
              {applications.length === 0 && (
                <Button onClick={() => setShowAddDialog(true)}>
                  Add Your First Application
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Application Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Application</DialogTitle>
            <DialogDescription>
              Track a new job application in your dashboard.
            </DialogDescription>
          </DialogHeader>

          {showSavedJobs ? (
            <>
              <div className="py-4">
                <h3 className="text-sm font-medium mb-2">Select from saved jobs:</h3>
                {savedJobs.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {savedJobs.map((job) => (
                      <div 
                        key={job.id}
                        className="p-3 border rounded-md cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => prefillWithSavedJob(job)}
                      >
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-muted-foreground">{job.company}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-muted-foreground">
                    <p>You don't have any saved jobs yet.</p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowSavedJobs(false)}>
                  Enter Manually
                </Button>
              </DialogFooter>
            </>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-4 py-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="job_title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Retail Associate" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Target" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="applied_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Application Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="applied">
                                <div className="flex items-center gap-2">
                                  <ApplicationStatusBadge status="applied" />
                                </div>
                              </SelectItem>
                              <SelectItem value="interviewing">
                                <div className="flex items-center gap-2">
                                  <ApplicationStatusBadge status="interviewing" />
                                </div>
                              </SelectItem>
                              <SelectItem value="offered">
                                <div className="flex items-center gap-2">
                                  <ApplicationStatusBadge status="offered" />
                                </div>
                              </SelectItem>
                              <SelectItem value="accepted">
                                <div className="flex items-center gap-2">
                                  <ApplicationStatusBadge status="accepted" />
                                </div>
                              </SelectItem>
                              <SelectItem value="rejected">
                                <div className="flex items-center gap-2">
                                  <ApplicationStatusBadge status="rejected" />
                                </div>
                              </SelectItem>
                              <SelectItem value="withdrawn">
                                <div className="flex items-center gap-2">
                                  <ApplicationStatusBadge status="withdrawn" />
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any notes about this application"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contact_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. John Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contact_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. john@company.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="next_step"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Next Step</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Phone Interview" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="next_step_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Next Step Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter className="flex justify-between items-center pt-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowSavedJobs(true)}
                    disabled={isAdding}
                  >
                    Select from Saved Jobs
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddDialog(false)}
                      disabled={isAdding}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isAdding}>
                      {isAdding ? "Adding..." : "Add Application"}
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Applications;
