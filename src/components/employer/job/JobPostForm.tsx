
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Briefcase, Plus } from 'lucide-react';
import { createJob } from '@/lib/supabase/jobs';
import { JobFormData } from '@/types/jobs';
import { useAuth } from '@/hooks/useAuth';
import BasicJobDetails from './BasicJobDetails';
import JobDescriptionSection from './JobDescriptionSection';
import JobRequirementsSection from './JobRequirementsSection';
import CompensationDetails from './CompensationDetails';
import PremiumJobToggle from './PremiumJobToggle';
import AIQuickJobPost from './AIQuickJobPost';

// Define form schema
const jobFormSchema = z.object({
  title: z.string().min(5, { message: "Job title must be at least 5 characters" }),
  company: z.string().min(2, { message: "Company name is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  type: z.string(),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  requirements: z.string(),
  hours_per_week: z.number().min(1).max(40),
  pay_rate_min: z.number().min(0),
  pay_rate_max: z.number().min(0),
  contactEmail: z.string().email({ message: "Please enter a valid email" }),
  isPremium: z.boolean().default(false),
  prohibited_types: z.array(z.string()).default([])
});

interface JobPostFormProps {
  onSuccess: (jobId: string) => void;
  onCancel: () => void;
}

const JobPostForm = ({ onSuccess, onCancel }: JobPostFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formMode, setFormMode] = useState<'manual' | 'ai'>('manual');
  const { toast } = useToast();
  const { userProfile } = useAuth();

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      company: userProfile?.company_name || "",
      location: "",
      type: "part-time",
      description: "",
      requirements: "",
      hours_per_week: 20,
      pay_rate_min: 15,
      pay_rate_max: 20,
      contactEmail: userProfile?.email || "",
      isPremium: false,
      prohibited_types: []
    },
  });

  const handleSubmit = async (data: JobFormData) => {
    setIsLoading(true);

    try {
      // Convert requirements string to array
      const requirementsArray = data.requirements
        .split('\n')
        .filter(req => req.trim() !== '')
        .map(req => req.trim());

      // Prepare data for submission
      const jobData = {
        title: data.title,
        company_name: data.company,
        location_city: data.location.split(',')[0]?.trim() || data.location,
        location_state: data.location.split(',')[1]?.trim() || 'FL',
        location_zip: '32256', // Default zip code
        job_type: data.type,
        pay_rate_min: data.pay_rate_min,
        pay_rate_max: data.pay_rate_max,
        pay_rate_period: 'hourly',
        description: data.description,
        requirements: requirementsArray,
        experience_level: 'entry-level',
        hours_per_week: data.hours_per_week,
        is_featured: false,
        is_premium: data.isPremium,
        prohibited_types: data.prohibited_types
      };

      const { data: job, error } = await createJob(jobData);

      if (error) throw error;

      if (job) {
        toast({
          title: "Success",
          description: "Job posting created successfully"
        });
        onSuccess(job.id);
      }
    } catch (error: any) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create job posting",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAIGenerated = (jobData: JobFormData) => {
    // Populate form with AI-generated data
    form.reset(jobData);
    // Switch to manual mode to let user review and edit
    setFormMode('manual');
    toast({
      title: "Job Generated",
      description: "Review and make any necessary edits before posting"
    });
  };

  return (
    <div className="w-full">
      <Tabs defaultValue={formMode} onValueChange={(value) => setFormMode(value as 'manual' | 'ai')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="ai">AI Quick Post</TabsTrigger>
        </TabsList>
        
        <TabsContent value="manual">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Post a New Job
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below to create a new job listing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <BasicJobDetails
                    title={form.watch('title')}
                    company={form.watch('company')}
                    location={form.watch('location')}
                    type={form.watch('type')}
                    onInputChange={(e) => form.setValue(e.target.name as any, e.target.value)}
                    onSelectChange={(name, value) => form.setValue(name as any, value)}
                  />
                  
                  <CompensationDetails
                    hoursPerWeek={form.watch('hours_per_week')}
                    payRateMin={form.watch('pay_rate_min')}
                    payRateMax={form.watch('pay_rate_max')}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      form.setValue(name as any, Number(value));
                    }}
                  />
                  
                  <JobDescriptionSection
                    description={form.watch('description')}
                    onChange={(e) => form.setValue('description', e.target.value)}
                  />
                  
                  <JobRequirementsSection
                    requirements={form.watch('requirements')}
                    onChange={(e) => form.setValue('requirements', e.target.value)}
                  />
                  
                  <PremiumJobToggle
                    isPremium={form.watch('isPremium')}
                    onToggle={() => form.setValue('isPremium', !form.watch('isPremium'))}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Posting...' : 'Post Job'}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
        
        <TabsContent value="ai">
          <AIQuickJobPost 
            onJobGenerated={handleAIGenerated}
            onCancel={onCancel}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobPostForm;
