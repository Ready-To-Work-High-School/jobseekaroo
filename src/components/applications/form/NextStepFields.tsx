
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ApplicationFormValues } from './validation';

interface NextStepFieldsProps {
  form: UseFormReturn<ApplicationFormValues>;
}

export const NextStepFields = ({ form }: NextStepFieldsProps) => {
  return (
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
  );
};
