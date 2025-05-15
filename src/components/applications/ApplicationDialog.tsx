
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Job } from '@/types/job';
import { SavedSearch } from '@/types/user';
import { mockJobs } from '@/lib/mock-data';
import ApplicationForm from './ApplicationForm';
import SavedSearches from '@/components/SavedSearches';
import { useDebounce } from '@/hooks/useDebounce';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { toast } = useToast();

  // Mock saved searches
  const savedSearches: SavedSearch[] = [
    {
      id: '1',
      name: 'Developer jobs in San Francisco',
      query: 'Developer',
      user_id: '1',
      filters: { keywords: 'Developer', type: 'full-time' },
      created_at: '2023-06-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Remote marketing positions',
      query: 'Marketing',
      user_id: '1',
      filters: { keywords: 'Marketing', isRemote: true },
      created_at: '2023-07-20T14:15:00Z',
    }
  ];

  useEffect(() => {
    if (debouncedSearchQuery) {
      performSearch(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  const performSearch = (query: string) => {
    setIsSearching(true);
    // Simulate API call delay
    setTimeout(() => {
      const results = mockJobs.filter(
        job => job.title.toLowerCase().includes(query.toLowerCase()) ||
              (typeof job.company === 'string' ? 
                job.company.toLowerCase().includes(query.toLowerCase()) : 
                job.company.name.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 10);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleSelectJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleSelectSearch = (search: SavedSearch) => {
    setSearchQuery(search.query);
    performSearch(search.query);
    setShowSavedJobs(false);
  };

  const handleCancel = () => {
    setSelectedJob(null);
  };

  const handleSuccess = () => {
    toast({
      title: "Application saved",
      description: "Your job application has been saved successfully"
    });
    onSuccess();
    onOpenChange(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'search' | 'manual');
    setSelectedJob(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {selectedJob ? 'Add Application Details' : 'Track a New Application'}
          </DialogTitle>
          <DialogDescription>
            {selectedJob 
              ? `Complete the application details for ${selectedJob.title}` 
              : 'Search for a job or manually enter the details'}
          </DialogDescription>
        </DialogHeader>

        {!selectedJob ? (
          <Tabs defaultValue="search" className="flex-1 flex flex-col" onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="search">Search for a job</TabsTrigger>
              <TabsTrigger value="manual">Enter manually</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="flex-1 flex flex-col">
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for a job title or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-1.5 h-7"
                  onClick={() => setShowSavedJobs(!showSavedJobs)}
                >
                  {showSavedJobs ? 'Hide Saved' : 'Saved Searches'}
                </Button>
              </div>

              {showSavedJobs ? (
                <SavedSearches
                  searches={savedSearches}
                  onSelectSearch={handleSelectSearch}
                  className="border rounded-md mb-4"
                />
              ) : null}

              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-[400px]">
                  {isSearching ? (
                    <div className="flex items-center justify-center h-20">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((job) => (
                        <div
                          key={job.id}
                          className="p-3 border rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => handleSelectJob(job)}
                        >
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {typeof job.company === 'string' ? job.company : job.company.name} • {job.location.city}, {job.location.state}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : debouncedSearchQuery ? (
                    <div className="text-center p-6 text-muted-foreground">
                      No jobs found matching "{debouncedSearchQuery}"
                    </div>
                  ) : (
                    <div className="text-center p-6 text-muted-foreground">
                      Search for jobs by title or company name
                    </div>
                  )}
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="flex-1">
              <ApplicationForm 
                onSuccess={handleSuccess}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <ApplicationForm 
            selectedJob={selectedJob}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
