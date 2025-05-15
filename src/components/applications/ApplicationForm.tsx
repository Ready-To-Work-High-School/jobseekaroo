
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Job } from '@/types/job';

const formSchema = z.object({
  job_title: z.string().min(1, 'Job title is required'),
  company: z.string().min(1, 'Company name is required'),
  status: z.enum(['applied', 'interviewing', 'rejected', 'accepted', 'pending', 'hired', 'withdrawn', 'offered']),
  applied_date: z.date(),
  contact_name: z.string().optional(),
  contact_email: z.string().email('Invalid email').optional().or(z.literal('')),
  next_step: z.string().optional(),
  next_step_date: z.date().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationFormProps {
  initialValues?: Partial<FormValues>;
  onSubmit: (values: FormValues) => void;
  job?: Job;
  loading?: boolean;
}

export const ApplicationForm = ({ initialValues, onSubmit, job, loading = false }: ApplicationFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: job?.title || initialValues?.job_title || '',
      company: job?.company?.name || initialValues?.company || '',
      status: initialValues?.status || 'applied',
      applied_date: initialValues?.applied_date || new Date(),
      contact_name: initialValues?.contact_name || '',
      contact_email: initialValues?.contact_email || '',
      next_step: initialValues?.next_step || '',
      next_step_date: initialValues?.next_step_date,
      notes: initialValues?.notes || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="job_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
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
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applied_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Application Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={loading}
                      >
                        {field.value ? format(field.value, "PPP") : "Select date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
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
                <FormControl>
                  <select
                    className="w-full p-2 border rounded-md"
                    {...field}
                    disabled={loading}
                  >
                    <option value="applied">Applied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="withdrawn">Withdrawn</option>
                    <option value="hired">Hired</option>
                    <option value="offered">Offer Received</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
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
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="next_step"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Step</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="next_step_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Next Step Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={loading}
                      >
                        {field.value ? format(field.value, "PPP") : "Select date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
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
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Application'}
        </Button>
      </form>
    </Form>
  );
};

export default ApplicationForm;
