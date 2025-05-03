
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle, Check, RefreshCw } from 'lucide-react';

// Define the ScrapedJob type to match our database schema
type ScrapedJob = {
  id: string;
  title: string;
  company_name: string;
  description: string | null;
  source_url: string | null;
  job_type: string;
  is_verified: boolean;
  created_at: string;
  location_city: string;
  location_state: string;
};

export default function InternshipScraper() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedJobs, setScrapedJobs] = useState<ScrapedJob[]>([]);
  const [lastScraped, setLastScraped] = useState<string | null>(null);
  
  // Start the scraping process
  const startScraping = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('scrape-internships', {
        method: 'POST',
      });
      
      if (error) throw error;
      
      toast({
        title: "Scraping completed",
        description: `Successfully scraped ${data.jobs?.length || 0} internship listings.`,
      });
      
      // Fetch the newly scraped jobs
      await fetchScrapedJobs();
      setLastScraped(new Date().toISOString());
    } catch (error: any) {
      console.error("Error during scraping:", error);
      toast({
        title: "Scraping failed",
        description: error.message || "Failed to scrape internships",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch the scraped jobs from the database
  const fetchScrapedJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('scraped_jobs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setScrapedJobs(data as ScrapedJob[]);
    } catch (error: any) {
      console.error("Error fetching scraped jobs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch scraped internships",
        variant: "destructive",
      });
    }
  };
  
  // Approve a scraped job and add it to the main jobs table
  const approveJob = async (job: ScrapedJob) => {
    try {
      // Insert into the jobs table
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .insert([
          {
            title: job.title,
            company_name: job.company_name,
            location_city: job.location_city || 'Jacksonville',
            location_state: job.location_state || 'FL',
            location_zip: '32256', // Default zip for Jacksonville
            job_type: 'internship',
            pay_rate_min: 15, // Default values - can be updated later
            pay_rate_max: 20,
            pay_rate_period: 'hourly',
            description: job.description || 'No description provided',
            requirements: ['No specific requirements listed'],
            experience_level: 'entry-level',
            is_featured: false,
            is_remote: false,
            is_flexible: true
          }
        ]);
        
      if (jobError) throw jobError;
      
      // Mark the scraped job as verified
      const { error: updateError } = await supabase
        .from('scraped_jobs')
        .update({ is_verified: true })
        .eq('id', job.id);
        
      if (updateError) throw updateError;
      
      toast({
        title: "Job approved",
        description: "The internship has been added to the job listings",
      });
      
      // Refresh the list
      fetchScrapedJobs();
    } catch (error: any) {
      console.error("Error approving job:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve job",
        variant: "destructive",
      });
    }
  };
  
  // Delete a scraped job
  const deleteJob = async (id: string) => {
    try {
      const { error } = await supabase
        .from('scraped_jobs')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Job deleted",
        description: "The scraped internship has been removed",
      });
      
      // Refresh the list
      fetchScrapedJobs();
    } catch (error: any) {
      console.error("Error deleting job:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete job",
        variant: "destructive",
      });
    }
  };
  
  // Load the jobs when the component mounts
  React.useEffect(() => {
    fetchScrapedJobs();
  }, []);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Jacksonville Internship Scraper</CardTitle>
          <CardDescription>
            Automatically collect internship listings from major job boards and review them before publishing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              {lastScraped && (
                <p className="text-sm text-muted-foreground">
                  Last scraped: {new Date(lastScraped).toLocaleString()}
                </p>
              )}
            </div>
            <Button 
              onClick={startScraping} 
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Scrape Internships
                </>
              )}
            </Button>
          </div>
          
          {isLoading && (
            <Alert>
              <AlertTitle>Scraping in progress</AlertTitle>
              <AlertDescription>
                Please wait while we collect the latest internship listings from job boards.
                This may take a minute.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="unverified" className="mt-6">
            <TabsList>
              <TabsTrigger value="unverified">
                Unverified 
                <span className="ml-1 text-xs bg-amber-100 text-amber-800 rounded-full px-2">
                  {scrapedJobs.filter(job => !job.is_verified).length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved
                <span className="ml-1 text-xs bg-green-100 text-green-800 rounded-full px-2">
                  {scrapedJobs.filter(job => job.is_verified).length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="unverified" className="space-y-4 mt-4">
              {scrapedJobs.filter(job => !job.is_verified).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No unverified internship listings
                </div>
              ) : (
                scrapedJobs
                  .filter(job => !job.is_verified)
                  .map(job => (
                    <Card key={job.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company_name}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => approveJob(job)}
                            >
                              <Check className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              onClick={() => deleteJob(job.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">
                          {job.description || "No description provided"}
                        </p>
                        {job.source_url && (
                          <a 
                            href={job.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 mt-2 inline-block"
                          >
                            Source: {new URL(job.source_url).hostname}
                          </a>
                        )}
                      </div>
                    </Card>
                  ))
              )}
            </TabsContent>
            
            <TabsContent value="approved" className="space-y-4 mt-4">
              {scrapedJobs.filter(job => job.is_verified).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No approved internship listings
                </div>
              ) : (
                scrapedJobs
                  .filter(job => job.is_verified)
                  .map(job => (
                    <Card key={job.id} className="overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company_name}</p>
                            <div className="inline-flex items-center mt-1 gap-1 bg-green-100 text-green-800 rounded-full px-2 py-0.5 text-xs">
                              <Check className="h-3 w-3" /> Approved
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm line-clamp-2">
                          {job.description || "No description provided"}
                        </p>
                      </div>
                    </Card>
                  ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
