
import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Users, Clock, PlusCircle, Loader2 } from 'lucide-react';
import AdvancedSpinner from '@/components/ui/advanced-spinner';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  location: string;
  posted: string;
  status: string;
  applicants: number;
}

interface PostingsTabProps {
  jobPostings: JobPosting[];
  loading?: boolean;
  setActiveTab: (tab: string) => void;
}

// Using memo to prevent unnecessary re-renders
const PostingsTab = memo(({ jobPostings, loading = false, setActiveTab }: PostingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Postings</CardTitle>
        <CardDescription>
          Manage and track all your active and closed job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <AdvancedSpinner 
              variant="circle" 
              size="lg" 
              text="Loading your job postings..." 
              centered 
              className="text-muted-foreground" 
            />
          </div>
        ) : jobPostings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="bg-muted/30 p-4 rounded-full mb-4">
              <Building className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No job postings yet</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              You haven't posted any jobs yet. Create your first job posting to start finding qualified candidates.
            </p>
            <Button onClick={() => setActiveTab("create")} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Post New Job
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <div key={job.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1 mb-3 md:mb-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{job.title}</h3>
                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'}>
                      {job.status === 'active' ? 'Active' : 'Closed'}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-3.5 w-3.5" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {job.applicants} Applicants
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      Posted: {new Date(job.posted).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    View Applicants
                  </Button>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {jobPostings.length > 0 && (
        <CardFooter className="border-t pt-6 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {jobPostings.length} job posting{jobPostings.length !== 1 ? 's' : ''}
          </div>
          <Button onClick={() => setActiveTab("create")} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Post New Job
          </Button>
        </CardFooter>
      )}
    </Card>
  );
});

PostingsTab.displayName = 'PostingsTab';

export default PostingsTab;
