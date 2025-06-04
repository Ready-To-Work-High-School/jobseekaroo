
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Job } from '@/types/job';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DialogFooter } from '../ui/dialog';
import { applicationFormSchema, type ApplicationFormValues } from './form/validation';
import { StatusSelect } from './form/StatusSelect';
import { ContactFields } from './form/ContactFields';
import { NextStepFields } from './form/NextStepFields';

interface ApplicationFormProps {
  selectedJob: Job | null;
  isAdding: boolean;
  setIsAdding: (isAdding: boolean) => void;
  onCancel: () => void;
  onShowSavedJobs: () => void;
  onSuccess: () => void;
}

export const ApplicationForm = ({
  selectedJob,
  isAdding,
  setIsAdding,
  onCancel,
  onShowSavedJobs,
  onSuccess
}: ApplicationFormProps) => {
  const { createApplication } = useAuth();
  const { toast } = useToast();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      job_title: selectedJob?.title || '',
      company: selectedJob?.company.name || '',
      applied_date: new Date().toISOString().substring(0, 10),
      status: 'applied',
      notes: '',
      contact_name: '',
      contact_email: '',
      next_step: '',
      next_step_date: '',
    },
  });

  const onSubmit = async (values: ApplicationFormValues) => {
    setIsAdding(true);
    
    try {
      await createApplication({
        job_id: selectedJob?.id || 'manual-entry',
        ...values
      });
      
      toast({
        title: 'Application added',
        description: 'Your job application has been added to tracking',
      });
      
      onSuccess();
      
    } catch (error) {
      console.error('Error adding application:', error);
      toast({
        title: 'Error',
        description: 'Failed to add application',
        variant: 'destructive',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="job_title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Retail Associate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Target" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="applied_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <StatusSelect form={form} />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any notes about this application"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ContactFields form={form} />
          <NextStepFields form={form} />
        </div>

        <DialogFooter className="flex justify-between items-center pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onShowSavedJobs}
            disabled={isAdding}
          >
            Select from Saved Jobs
          </Button>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? "Adding..." : "Add Application"}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
};
