
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  title: string;
  company: string;
  location: string;
  type: string;
  requirements: string;
  description: string;
  salary: string;
  contactEmail: string;
}

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const { toast } = useToast();
  
  // Form state for new job posting
  const [formData, setFormData] = useState<FormData>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    requirements: '',
    description: '',
    salary: '',
    contactEmail: ''
  });
  
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
  );
};

export default CreateJobTab;
