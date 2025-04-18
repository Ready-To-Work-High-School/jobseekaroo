import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Job } from '@/types/job';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogFooter } from '../ui/dialog';

const formSchema = z.object({
  job_title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  applied_date: z.string().min(2, "Application date is required"),
  status: z.enum(['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn']),
  notes: z.string().optional(),
  contact_name: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal('')),
  next_step: z.string().optional(),
  next_step_date: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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

  const onSubmit = async (values: FormValues) => {
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="applied">
                        <div className="flex items-center gap-2">
                          <ApplicationStatusBadge status="applied" />
                        </div>
                      </SelectItem>
                      <SelectItem value="interviewing">
                        <div className="flex items-center gap-2">
                          <ApplicationStatusBadge status="interviewing" />
                        </div>
                      </SelectItem>
                      <SelectItem value="offered">
                        <div className="flex items-center gap-2">
                          <ApplicationStatusBadge status="offered" />
                        </div>
                      </SelectItem>
                      <SelectItem value="accepted">
                        <div className="flex items-center gap-2">
                          <ApplicationStatusBadge status="accepted" />
                        </div>
                      </SelectItem>
                      <SelectItem value="rejected">
                        <div className="flex items-center gap-2">
                          <ApplicationStatusBadge status="rejected" />
                        </div>
                      </SelectItem>
                      <SelectItem value="withdrawn">
                        <div className="flex items-center gap-2">
                          <ApplicationStatusBadge status="withdrawn" />
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. john@company.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="next_step"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Step</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Phone Interview" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="next_step_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Step Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
