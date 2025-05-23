
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ApplicationStatusBadge } from '@/components/ApplicationStatusBadge';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationFormValues } from './validation';
import { ApplicationStatus } from '@/types/application';

interface StatusSelectProps {
  form: UseFormReturn<ApplicationFormValues>;
}

export const StatusSelect = ({ form }: StatusSelectProps) => {
  // Define statuses as ApplicationStatus[] to ensure type safety
  const statuses: ApplicationStatus[] = ['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn'];

  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value || 'applied'}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center gap-2">
                    <ApplicationStatusBadge status={status} />
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
