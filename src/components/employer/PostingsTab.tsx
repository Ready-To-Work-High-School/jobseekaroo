
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Clock, PlusCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  loading: boolean;
  setActiveTab: (tab: string) => void;
}

const PostingsTab = ({ jobPostings, loading, setActiveTab }: PostingsTabProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading your job postings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Postings</CardTitle>
        <p className="text-muted-foreground mt-1">
          Manage and track all your active and closed job postings
        </p>
      </CardHeader>
      <CardContent>
        {jobPostings.length === 0 ? (
          <div className="bg-muted p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">No job postings yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first job posting to start receiving applications
            </p>
            <Button asChild>
              <Link to="/post-job">
                <PlusCircle className="h-4 w-4 mr-2" />
                Post Your First Job
              </Link>
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
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
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
      <CardFooter className="border-t pt-6 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {jobPostings.length} job posting{jobPostings.length !== 1 ? 's' : ''}
        </div>
        <Button asChild className="gap-2">
          <Link to="/post-job">
            <PlusCircle className="h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostingsTab;
