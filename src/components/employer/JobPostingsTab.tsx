
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Clock, PlusCircle } from 'lucide-react';

interface JobPostingProps {
  id: string;
  title: string;
  company: string;
  location: string;
  posted: string;
  status: string;
  applicants: number;
}

interface JobPostingsTabProps {
  jobPostings: JobPostingProps[];
  isMobile: boolean;
  setActiveTab: (tab: string) => void;
}

const JobPostingsTab = ({ jobPostings, isMobile, setActiveTab }: JobPostingsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Postings</CardTitle>
        <CardDescription>
          Manage and track all your active and closed job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {jobPostings.length} job postings
        </div>
        {isMobile && (
          <Button onClick={() => setActiveTab("create")} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Post New Job
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobPostingsTab;
