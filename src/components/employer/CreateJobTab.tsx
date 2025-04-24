
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePremiumPostings } from '@/hooks/usePremiumPostings';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type JobFormData, type JobSubmitData, type ProhibitedJobType } from '@/types/jobs';
import BasicJobDetails from './job/BasicJobDetails';
import CompensationDetails from './job/CompensationDetails';
import JobRequirementsSection from './job/JobRequirementsSection';
import JobPostSuccess from './job/JobPostSuccess';
import JobFieldValidator from './job/JobFieldValidator';

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { checkTrialEligibility, isLoading: isPremiumLoading } = usePremiumPostings();
  const [isEligibleForTrial, setIsEligibleForTrial] = useState(false);
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  const [showValidation, setShowValidation] = useState(false);
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    type: 'part-time',
    requirements: '',
    description: '',
    hours_per_week: 20,
    pay_rate_min: 12,
    pay_rate_max: 15,
    contactEmail: '',
    isPremium: false,
    prohibited_types: [] // Initialize as empty array of ProhibitedJobType
  });
  
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
    setShowValidation(true);
    
    // Check if key fields are missing
    if (!formData.hours_per_week || 
        !formData.pay_rate_min ||
        !formData.pay_rate_max ||
        formData.pay_rate_min < 12 ||
        formData.pay_rate_max < formData.pay_rate_min ||
        formData.hours_per_week > 40) {
      // The validation alert will show due to showValidation being true
      toast({
        title: "Missing or Invalid Fields",
        description: "Please check the highlighted fields and ensure all requirements are met.",
        variant: "destructive",
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to post a job.",
        variant: "destructive",
      });
      return;
    }

    try {
      const requirementsArray = formData.requirements
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0);

      const [city, state] = formData.location.split(',').map(s => s.trim());

      const submitData: JobSubmitData = {
        title: formData.title,
        company_name: formData.company,
        location_city: city || formData.location,
        location_state: state || '',
        location_zip: '00000',
        job_type: formData.type,
        pay_rate_min: formData.pay_rate_min,
        pay_rate_max: formData.pay_rate_max,
        pay_rate_period: 'hourly',
        description: formData.description,
        requirements: requirementsArray,
        experience_level: 'entry-level',
        hours_per_week: formData.hours_per_week,
        is_featured: formData.isPremium,
        is_premium: formData.isPremium,
        prohibited_types: formData.prohibited_types as ProhibitedJobType[] // Explicitly cast to the correct type
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(submitData)
        .select()
        .single();

      if (error) throw error;

      setCreatedJobId(data.id);
      
      toast({
        title: "Job Posted",
        description: "Your job has been successfully posted.",
      });
      
      setFormData({
        title: '',
        company: '',
        location: '',
        type: 'part-time',
        requirements: '',
        description: '',
        hours_per_week: 20,
        pay_rate_min: 12,
        pay_rate_max: 15,
        contactEmail: '',
        isPremium: false,
        prohibited_types: []
      });
      
    } catch (error: any) {
      console.error('Error posting job:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to post job",
        variant: "destructive",
      });
    }
  };

  if (createdJobId) {
    return (
      <JobPostSuccess 
        jobId={createdJobId}
        onContinue={() => {
          setCreatedJobId(null);
          setActiveTab("postings");
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
        <CardDescription className="space-y-2">
          <p>Fill out the form below to create a new job posting for students.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
            <h4 className="font-medium mb-2">Teen Job Requirements:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Jobs must be entry-level (e.g., cashier, retail associate, food service)</li>
              <li>Minimum wage must be at least $12/hour</li>
              <li>Maximum 40 hours per week</li>
              <li>No commission-only, door-to-door sales, or hazardous roles</li>
            </ul>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <JobFieldValidator formData={formData} showValidation={showValidation} />
          
          <BasicJobDetails 
            title={formData.title}
            company={formData.company}
            location={formData.location}
            type={formData.type}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />

          <CompensationDetails 
            hoursPerWeek={formData.hours_per_week}
            payRateMin={formData.pay_rate_min}
            payRateMax={formData.pay_rate_max}
            onChange={handleInputChange}
          />

          <JobRequirementsSection 
            requirements={formData.requirements}
            onChange={handleInputChange}
          />
          
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
              <p>Job postings will be reviewed to ensure they meet our teen employment standards before being made visible.</p>
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
