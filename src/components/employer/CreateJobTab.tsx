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
import FreemiumFeatures from './FreemiumFeatures';

// interfaces for form data and props
interface FormData {
  title: string;
  company: string;
  location: string;
  type: string;
  requirements: string;
  description: string;
  hours_per_week: number;
  pay_rate_min: number;
  pay_rate_max: number;
  contactEmail: string;
  isPremium: boolean;
  prohibited_types: string[];
}

interface CreateJobTabProps {
  setActiveTab: (tab: string) => void;
}

const CreateJobTab = ({ setActiveTab }: CreateJobTabProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { checkTrialEligibility, startPremiumTrial, isLoading: isPremiumLoading } = usePremiumPostings();
  const [isEligibleForTrial, setIsEligibleForTrial] = useState(false);
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);
  
  // Form state for new job posting
  const [formData, setFormData] = useState<FormData>({
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

      const [city, state] = formData.location.split(',').map(s => s.trim());
      
      const jobData = {
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
        prohibited_types: formData.prohibited_types
      };

      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();

      if (jobError) throw jobError;

      setCreatedJobId(jobData.id);
      
      toast({
        title: "Job Posted",
        description: "Your job has been successfully posted.",
      });
      
      // Reset form data
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

  return (
    <>
      {createdJobId ? (
        // Show Freemium Features after job is created
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Posted Successfully!</CardTitle>
              <CardDescription>
                Your job has been posted. Now choose how to promote it:
              </CardDescription>
            </CardHeader>
          </Card>
          
          <FreemiumFeatures jobId={createdJobId} />
          
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setCreatedJobId(null);
                setActiveTab("postings");
              }}
            >
              Continue to Job Listings
            </Button>
          </div>
        </div>
      ) : (
        // Show Job Form
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input 
                    id="title" 
                    name="title"
                    placeholder="e.g. Retail Associate at Target"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Be specific - include role and company name
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company" 
                    name="company"
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
                      <SelectItem value="part-time">Part-Time</SelectItem>
                      <SelectItem value="full-time">Full-Time</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours_per_week">Hours per Week</Label>
                  <Input 
                    id="hours_per_week"
                    name="hours_per_week"
                    type="number"
                    min="1"
                    max="40"
                    value={formData.hours_per_week}
                    onChange={(e) => handleInputChange({
                      target: {
                        name: 'hours_per_week',
                        value: parseInt(e.target.value)
                      }
                    } as React.ChangeEvent<HTMLInputElement>)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">Maximum 40 hours per week for teen jobs</p>
                </div>

                <div className="space-y-2">
                  <Label>Pay Rate (per hour)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input 
                        id="pay_rate_min"
                        name="pay_rate_min"
                        type="number"
                        min="12"
                        step="0.50"
                        placeholder="Min"
                        value={formData.pay_rate_min}
                        onChange={(e) => handleInputChange({
                          target: {
                            name: 'pay_rate_min',
                            value: parseFloat(e.target.value)
                          }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        id="pay_rate_max"
                        name="pay_rate_max"
                        type="number"
                        min="12"
                        step="0.50"
                        placeholder="Max"
                        value={formData.pay_rate_max}
                        onChange={(e) => handleInputChange({
                          target: {
                            name: 'pay_rate_max',
                            value: parseFloat(e.target.value)
                          }
                        } as React.ChangeEvent<HTMLInputElement>)}
                        required
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum wage must be at least $12/hour</p>
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
      )}
    </>
  );
};

export default CreateJobTab;
