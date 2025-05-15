
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/auth';
import { Link } from 'react-router-dom';
import { Job } from '@/types/job';
import { normalizeJob } from '@/utils/jobAdapter';

interface ApplicationFormProps {
  jobId?: string;
  jobTitle?: string;
  companyName?: string;
  selectedJob?: Job | null;
  isAdding: boolean;
  setIsAdding: (value: boolean) => void;
  onCancel: () => void;
  onShowSavedJobs: () => void;
  onSuccess: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  jobId = '',
  jobTitle = 'Job Position',
  companyName = 'Company Name',
  selectedJob = null,
  isAdding = false,
  setIsAdding,
  onCancel,
  onShowSavedJobs,
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user, createApplication } = useAuth();
  
  // If a job was provided, normalize it and extract properties
  const normalizedJob = selectedJob ? normalizeJob(selectedJob) : null;
  const finalJobId = normalizedJob?.id || jobId;
  const finalJobTitle = normalizedJob?.title || jobTitle;
  const finalCompanyName = normalizedJob?.company?.name || normalizedJob?.company || companyName;
  
  const form = useForm({
    defaultValues: {
      coverLetter: '',
      phone: '',
      availability: '',
      referral: ''
    }
  });

  const onSubmit = async (data: any) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for jobs",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the application
      await createApplication({
        job_id: finalJobId,
        job_title: finalJobTitle,
        company: finalCompanyName,
        status: 'applied',
        applied_date: new Date().toISOString().slice(0, 10),
        notes: data.coverLetter,
        contact_name: '',
        contact_email: ''
      });
      
      toast({
        title: "Application submitted!",
        description: `Your application for ${finalJobTitle} at ${finalCompanyName} has been submitted successfully.`
      });
      
      form.reset();
      if (onSuccess) onSuccess();
      if (setIsAdding) setIsAdding(false);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="application-form p-6 border rounded-lg bg-muted/30">
        <h3 className="text-xl font-semibold mb-4">Apply for this position</h3>
        <p className="mb-6 text-muted-foreground">Please sign in to apply for jobs</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Why are you interested in this position?" 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Briefly explain why you're a good fit for this role.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Availability</FormLabel>
                <FormControl>
                  <Input placeholder="When can you start? What days/hours are you available?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How did you hear about this position?</FormLabel>
                <FormControl>
                  <Input placeholder="School counselor, teacher, website, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex gap-2 justify-end">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
