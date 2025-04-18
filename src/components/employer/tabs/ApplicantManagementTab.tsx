
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search,
  Filter,
  Calendar,
  MessageSquare,
  UserPlus,
  Users,
  X,
  CheckCircle,
  Clock,
  XCircle,
  Download
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Applicant {
  id: string;
  name: string;
  email: string;
  job_title: string;
  applied_date: string;
  status: 'applied' | 'screened' | 'interviewing' | 'hired' | 'rejected';
}

const MOCK_APPLICANTS: Applicant[] = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john.smith@example.com',
    job_title: 'Retail Associate',
    applied_date: '2023-11-12',
    status: 'applied' 
  },
  { 
    id: '2', 
    name: 'Maria Garcia', 
    email: 'maria.garcia@example.com',
    job_title: 'Administrative Assistant',
    applied_date: '2023-11-10',
    status: 'screened' 
  },
  { 
    id: '3', 
    name: 'David Johnson', 
    email: 'david.johnson@example.com',
    job_title: 'Customer Service Rep',
    applied_date: '2023-11-05',
    status: 'interviewing' 
  },
  { 
    id: '4', 
    name: 'Sarah Williams', 
    email: 'sarah.williams@example.com',
    job_title: 'Retail Associate',
    applied_date: '2023-10-28',
    status: 'hired' 
  },
  { 
    id: '5', 
    name: 'Michael Brown', 
    email: 'michael.brown@example.com',
    job_title: 'Administrative Assistant',
    applied_date: '2023-10-25',
    status: 'rejected' 
  }
];

const ApplicantManagementTab = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<string | null>(null);
  
  const jobTitles = [...new Set(MOCK_APPLICANTS.map(app => app.job_title))];

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job_title.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = !statusFilter || app.status === statusFilter;
    const matchesJob = !jobFilter || app.job_title === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  // In a real app, we would fetch actual job applications from Supabase
  useEffect(() => {
    if (user) {
      // Simulating API call
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [user]);

  const handleUpdateStatus = (id: string, newStatus: Applicant['status']) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const getStatusBadge = (status: Applicant['status']) => {
    switch (status) {
      case 'applied':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Applied</Badge>;
      case 'screened':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Screened</Badge>;
      case 'interviewing':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Interviewing</Badge>;
      case 'hired':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Hired</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="bg-blue-50 border-b">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          <CardTitle>Applicant Management</CardTitle>
        </div>
        <CardDescription>
          Review and manage student applicants for your job postings
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Applicants</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
              <TabsTrigger value="hired">Hired</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search applicants"
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>{statusFilter || "Filter by status"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="screened">Screened</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              
              <Select onValueChange={setJobFilter}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <span>{jobFilter || "Filter by job"}</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Jobs</SelectItem>
                  {jobTitles.map(title => (
                    <SelectItem key={title} value={title}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" onClick={() => {
                setSearchTerm('');
                setStatusFilter(null);
                setJobFilter(null);
              }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="all" className="m-0">
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
              </div>
            ) : filteredApplications.length > 0 ? (
              <div className="rounded-md border overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((applicant) => (
                      <TableRow key={applicant.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{applicant.name}</div>
                            <div className="text-sm text-muted-foreground">{applicant.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{applicant.job_title}</TableCell>
                        <TableCell>{applicant.applied_date}</TableCell>
                        <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Schedule</span>
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Message</span>
                            </Button>
                            <Select
                              onValueChange={(value) => handleUpdateStatus(applicant.id, value as any)}
                              defaultValue={applicant.status}
                            >
                              <SelectTrigger className="h-9 w-[130px]">
                                <SelectValue placeholder="Update status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="applied">
                                    <div className="flex items-center">
                                      <Clock className="h-4 w-4 mr-2 text-blue-500" />
                                      Applied
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="screened">
                                    <div className="flex items-center">
                                      <CheckCircle className="h-4 w-4 mr-2 text-purple-500" />
                                      Screened
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="interviewing">
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-2 text-amber-500" />
                                      Interviewing
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="hired">
                                    <div className="flex items-center">
                                      <UserPlus className="h-4 w-4 mr-2 text-green-500" />
                                      Hired
                                    </div>
                                  </SelectItem>
                                  <SelectItem value="rejected">
                                    <div className="flex items-center">
                                      <XCircle className="h-4 w-4 mr-2 text-red-500" />
                                      Rejected
                                    </div>
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <Users className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <h3 className="text-lg font-medium">No applicants found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm || statusFilter || jobFilter 
                    ? "Try adjusting your search filters" 
                    : "No applications have been received yet"}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="new" className="m-0">
            <div className="text-center py-10">
              <p>Showing new applicants</p>
            </div>
          </TabsContent>
          
          <TabsContent value="interviewing" className="m-0">
            <div className="text-center py-10">
              <p>Showing applicants in interview stage</p>
            </div>
          </TabsContent>
          
          <TabsContent value="hired" className="m-0">
            <div className="text-center py-10">
              <p>Showing hired applicants</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t py-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredApplications.length} applicants
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export data
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApplicantManagementTab;
