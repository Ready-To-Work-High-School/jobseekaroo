
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
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

interface ApplicationFormProps {
  jobId?: string;
  jobTitle?: string;
  companyName?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ 
  jobId = '',
  jobTitle = 'Job Position',
  companyName = 'Company Name'
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
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
      // In a real app, this would submit to an API
      console.log('Application data:', {
        jobId,
        userId: user.id,
        ...data
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Application submitted!",
        description: `Your application for ${jobTitle} at ${companyName} has been submitted successfully.`
      });
      
      form.reset();
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
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
