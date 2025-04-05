
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumPostings } from '@/hooks/usePremiumPostings';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FormData {
  title: string;
  company: string;
  location: string;
  type: string;
  requirements: string;
  description: string;
  salary: string;
  contactEmail: string;
  isPremium: boolean;
}

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { checkTrialEligibility, startPremiumTrial, isLoading: isPremiumLoading } = usePremiumPostings();
  const [isEligibleForTrial, setIsEligibleForTrial] = useState(false);
  
  // Form state for new job posting
  const [formData, setFormData] = useState<FormData>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    requirements: '',
    description: '',
    salary: '',
    contactEmail: '',
    isPremium: false,
  });
  
  // Check if the user is eligible for a free premium trial
  useEffect(() => {
    const checkEligibility = async () => {
      const eligible = await checkTrialEligibility();
      setIsEligibleForTrial(eligible);
    };
    
    if (user) {
      checkEligibility();
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePremiumToggle = () => {
    setFormData((prev) => ({ ...prev, isPremium: !prev.isPremium }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to post a job.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Convert requirements to an array
      const requirementsArray = formData.requirements
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);
      
      // Insert job into Supabase
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .insert({
          title: formData.title,
          company_name: formData.company,
          location_city: formData.location.split(',')[0]?.trim() || formData.location,
          location_state: formData.location.split(',')[1]?.trim() || '',
          location_zip: '00000', // Default value, could be updated later
          job_type: formData.type,
          pay_rate_min: parseInt(formData.salary.split('-')[0]?.replace(/[^0-9]/g, '') || '0'),
          pay_rate_max: parseInt(formData.salary.split('-')[1]?.replace(/[^0-9]/g, '') || '0'),
          pay_rate_period: 'hourly',
          description: formData.description,
          requirements: requirementsArray,
          experience_level: 'entry-level',
          is_featured: formData.isPremium,
          is_premium: formData.isPremium
        })
        .select()
        .single();
        
      if (jobError) throw jobError;
      
      // If premium is selected, activate the trial
      if (formData.isPremium && isEligibleForTrial) {
        await startPremiumTrial(jobData.id);
      }
      
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
        contactEmail: '',
        isPremium: false,
      });
      
      // Switch to postings tab
      setActiveTab("postings");
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to post job",
        variant: "destructive",
      });
    }
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
              placeholder="List required skills, experience, or credentials (one per line)"
              value={formData.requirements}
              onChange={handleInputChange}
              rows={3}
              required
            />
            <p className="text-xs text-muted-foreground">Enter each requirement on a new line</p>
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
          
          {isEligibleForTrial && (
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-md p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Premium Job Posting</h4>
                      <p className="text-sm text-amber-800">Free 30-day trial available</p>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div>
                            <Switch
                              id="premium"
                              checked={formData.isPremium}
                              onCheckedChange={handlePremiumToggle}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Feature your job posting for greater visibility</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <ul className="text-sm text-amber-800 list-disc pl-5 space-y-1">
                    <li>Featured placement on job listings</li>
                    <li>Higher visibility to candidates</li>
                    <li>Detailed analytics on applicant engagement</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
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
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isPremiumLoading}
        >
          {isPremiumLoading ? "Processing..." : "Submit Job Posting"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateJobTab;
