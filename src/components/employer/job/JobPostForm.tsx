
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import FreemiumFeatures from '@/components/employer/FreemiumFeatures';

const jobFormSchema = z.object({
  title: z.string().min(3, { message: "Job title must be at least 3 characters long" }),
  company: z.string().min(2, { message: "Company name is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  description: z.string().min(20, { message: "Please provide a detailed job description" }),
  jobType: z.string().min(1, { message: "Job type is required" }),
  salary: z.string().min(1, { message: "Salary/wage information is required" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
  contactEmail: z.string().email({ message: "Valid email is required" }),
  contactPhone: z.string().optional(),
  applicationDeadline: z.string().min(1, { message: "Application deadline is required" }),
  isRemote: z.boolean().default(false),
  acceptsApplications: z.boolean().default(true),
  isPremium: z.boolean().default(false)
});

type JobFormValues = z.infer<typeof jobFormSchema>;

interface JobPostFormProps {
  onSuccess: (jobId: string) => void;
  onCancel: () => void;
}

const JobPostForm = ({ onSuccess, onCancel }: JobPostFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPremiumOptions, setShowPremiumOptions] = useState(false);
  const [createdJobId, setCreatedJobId] = useState<string | null>(null);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      jobType: 'part-time',
      salary: '',
      requirements: '',
      contactEmail: '',
      contactPhone: '',
      applicationDeadline: '',
      isRemote: false,
      acceptsApplications: true,
      isPremium: false
    }
  });

  const onSubmit = async (data: JobFormValues) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to post a job",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: jobData, error } = await supabase
        .from('jobs')
        .insert({
          ...data,
          user_id: user.id,
          status: 'active',
          is_premium: data.isPremium
        })
        .select('id')
        .single();

      if (error) {
        throw error;
      }

      setCreatedJobId(jobData.id);

      if (data.isPremium) {
        setShowPremiumOptions(true);
      } else {
        toast({
          title: "Job Posted Successfully",
          description: "Your job has been posted and is now live"
        });
        
        onSuccess(jobData.id);
      }
    } catch (error: any) {
      console.error('Error posting job:', error);
      
      toast({
        title: "Error",
        description: error.message || "There was an error posting your job",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPremiumOptions && createdJobId) {
    return <FreemiumFeatures jobId={createdJobId} />;
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Post a New Job</h2>
        <p className="text-muted-foreground">
          Create a new job posting to find qualified high school students
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Cashier, Server, Intern" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the job responsibilities, schedule, and any other relevant details" 
                    rows={5}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary/Wage</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. $15-18/hour, $500/week" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="applicationDeadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List qualifications, skills, and requirements for the position" 
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="(XXX) XXX-XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="isRemote"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div>
                    <FormLabel>Remote Work Available</FormLabel>
                    <FormDescription>
                      Check this if the job can be done remotely
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="acceptsApplications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div>
                    <FormLabel>Accept Applications</FormLabel>
                    <FormDescription>
                      Uncheck this if you want to create the job but not accept applications yet
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isPremium"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-amber-50">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div>
                    <FormLabel className="font-medium">Premium Listing</FormLabel>
                    <FormDescription>
                      Premium job postings receive up to 3x more qualified applications and include 
                      enhanced visibility, branded listings, and detailed analytics. 
                      Get a 30-day free trial!
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default JobPostForm;
