
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { JobApplication, ApplicationStatus } from '@/types/job';
import { useAuth } from '@/hooks/useAuth';

// Define the form schema
const formSchema = z.object({
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  company: z.string().min(1, { message: 'Company name is required' }),
  appliedDate: z.date({
    required_error: 'Applied date is required',
  }),
  status: z.enum(['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn']),
  contactName: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal('')),
  notes: z.string().optional(),
  nextStep: z.string().optional(),
  nextStepDate: z.date().optional(),
});

export interface ApplicationFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
  selectedJob?: any;
  application?: JobApplication;
}

const ApplicationForm = ({ onSuccess, onCancel, selectedJob, application }: ApplicationFormProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: '',
      company: '',
      status: 'applied' as ApplicationStatus,
      appliedDate: new Date(),
      contactName: '',
      contactEmail: '',
      notes: '',
      nextStep: '',
    },
  });

  // Populate form with existing data if editing
  useEffect(() => {
    if (application) {
      form.reset({
        jobTitle: application.jobTitle,
        company: application.company,
        status: application.status as any,
        appliedDate: new Date(application.appliedDate),
        contactName: application.contactName || '',
        contactEmail: application.contactEmail || '',
        notes: application.notes || '',
        nextStep: application.nextStep || '',
        nextStepDate: application.nextStepDate ? new Date(application.nextStepDate) : undefined,
      });
    } else if (selectedJob) {
      const companyValue = typeof selectedJob.company === 'string' 
        ? selectedJob.company 
        : selectedJob.company.name;
      
      form.reset({
        jobTitle: selectedJob.title,
        company: companyValue,
        status: 'applied',
        appliedDate: new Date(),
        contactName: '',
        contactEmail: '',
        notes: '',
        nextStep: '',
      });
    }
  }, [form, application, selectedJob]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save applications",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call for now
      console.log('Submitting application:', values);
      await new Promise(resolve => setTimeout(resolve, 800));

      toast({
        title: application ? "Application updated" : "Application added",
        description: application 
          ? "Your job application has been updated successfully" 
          : "Your job application has been saved successfully",
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error saving application:', error);
      toast({
        title: "Error",
        description: "There was a problem saving your application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Developer" {...field} />
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
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <select
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2",
                    "text-sm ring-offset-background focus:outline-none focus:ring-2",
                    "focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  {...field}
                >
                  <option value="applied">Applied</option>
                  <option value="interviewing">Interviewing</option>
                  <option value="offered">Offered</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appliedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Applied Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nextStep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Step (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Phone interview" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nextStepDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Next Step Date (Optional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any notes about the application or interview process..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 mr-2 rounded-full border-2 border-current border-r-transparent animate-spin" />
                Saving...
              </>
            ) : application ? (
              "Update Application"
            ) : (
              "Save Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ApplicationForm;
