
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  PlusCircle, Building, Briefcase, Users, Clock, FileText, 
  ChevronRight, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const EmployerDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("postings");
  
  // Form state for new job posting
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    requirements: '',
    description: '',
    salary: '',
    contactEmail: ''
  });
  
  // Placeholder job postings data
  const jobPostings = [
    {
      id: '1',
      title: 'Retail Associate',
      company: 'Westside Retail',
      location: 'Jacksonville, FL',
      posted: '2023-10-15',
      status: 'active',
      applicants: 12
    },
    {
      id: '2',
      title: 'Administrative Assistant',
      company: 'Westside Retail',
      location: 'Jacksonville, FL',
      posted: '2023-09-28',
      status: 'active',
      applicants: 8
    },
    {
      id: '3',
      title: 'Customer Service Rep',
      company: 'Westside Retail',
      location: 'Jacksonville, FL',
      posted: '2023-08-10',
      status: 'closed',
      applicants: 15
    }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with Supabase to submit the job posting
    
    toast({
      title: "Job Posted",
      description: "Your job has been successfully posted.",
    });
    
    // Reset form
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'full-time',
      requirements: '',
      description: '',
      salary: '',
      contactEmail: ''
    });
    
    // Switch to postings tab
    setActiveTab("postings");
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col items-start justify-between space-y-2 mb-6 md:flex-row md:items-center md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employer Dashboard</h1>
            <p className="text-muted-foreground">
              Manage job postings and connect with qualified students
            </p>
          </div>
          
          {!isMobile && (
            <Button onClick={() => setActiveTab("create")} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Post New Job
            </Button>
          )}
        </div>
        
        <Tabs defaultValue="postings" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="postings">Postings</TabsTrigger>
            <TabsTrigger value="applicants">Applicants</TabsTrigger>
            <TabsTrigger value="create">Create Job</TabsTrigger>
          </TabsList>
          
          <TabsContent value="postings" className="space-y-4 mt-6">
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
          </TabsContent>
          
          <TabsContent value="applicants" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Applicants</CardTitle>
                <CardDescription>
                  View and respond to candidates who have applied to your job postings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1 mb-3 md:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Jane Smith</h3>
                        <Badge>New</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          Retail Associate
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          Has Resume
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Applied: 10/24/2023
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        View Details
                      </Button>
                      <Button size="sm" className="w-full md:w-auto">
                        Contact
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1 mb-3 md:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Carlos Rodriguez</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          Administrative Assistant
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          Has Resume
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Applied: 10/20/2023
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <Button variant="outline" size="sm" className="w-full md:w-auto">
                        View Details
                      </Button>
                      <Button size="sm" className="w-full md:w-auto">
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="create" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Post a New Job</CardTitle>
                <CardDescription>
                  Fill out the form below to create a new job posting for students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        placeholder="e.g. Retail Associate"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input 
                        id="company" 
                        name="company" 
                        placeholder="e.g. Westside Retail"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        placeholder="e.g. Jacksonville, FL"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => handleSelectChange('type', value)}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-Time</SelectItem>
                          <SelectItem value="part-time">Part-Time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="temporary">Temporary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary/Pay Rate</Label>
                      <Input 
                        id="salary" 
                        name="salary" 
                        placeholder="e.g. $15-18/hour"
                        value={formData.salary}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input 
                        id="contactEmail" 
                        name="contactEmail" 
                        type="email"
                        placeholder="e.g. hiring@company.com"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements/Qualifications</Label>
                    <Textarea 
                      id="requirements" 
                      name="requirements" 
                      placeholder="List required skills, experience, or credentials"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Describe the role, responsibilities, and work environment"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4 flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium">Important</p>
                      <p>Job postings will be reviewed by our team before being made visible to students. This typically takes 1-2 business days.</p>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t pt-6 flex flex-col sm:flex-row gap-3 justify-end">
                <Button variant="outline" onClick={() => setActiveTab("postings")}>
                  Cancel
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Submit Job Posting
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EmployerDashboard;
