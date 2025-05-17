
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, ExternalLink, MoreHorizontal } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

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
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (jobPostings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Job Postings</CardTitle>
          <CardDescription>You haven't created any job postings yet.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => setActiveTab("create")} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Create Your First Job Posting
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Job Postings</h3>
        <Button onClick={() => setActiveTab("create")} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Job
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPostings.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>
                <Badge variant={job.status === 'active' ? 'default' : 'outline'}>
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>{job.posted ? format(new Date(job.posted), 'MMM d, yyyy') : 'N/A'}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{job.applicants}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Job
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Job</DropdownMenuItem>
                    <DropdownMenuItem>Pause Job</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete Job</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostingsTab;
