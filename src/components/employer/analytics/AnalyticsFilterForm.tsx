
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { CalendarRange, Filter, RefreshCw } from 'lucide-react';
import { DateRange } from 'react-day-picker';

// Define the schema for our filter form
const analyticsFilterSchema = z.object({
  jobId: z.string().optional(),
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
  status: z.enum(['all', 'applied', 'screening', 'interview', 'offer', 'rejected', 'accepted']).default('all'),
  sortBy: z.enum(['date', 'status', 'name']).default('date'),
});

type AnalyticsFilterValues = z.infer<typeof analyticsFilterSchema>;

interface AnalyticsFilterFormProps {
  onFilterChange: (values: AnalyticsFilterValues) => void;
  isLoading?: boolean;
}

export default function AnalyticsFilterForm({ onFilterChange, isLoading = false }: AnalyticsFilterFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<AnalyticsFilterValues>({
    resolver: zodResolver(analyticsFilterSchema),
    defaultValues: {
      jobId: '',
      status: 'all',
      sortBy: 'date',
      dateRange: undefined,
    },
  });

  function onSubmit(values: AnalyticsFilterValues) {
    onFilterChange(values);
  }

  return (
    <Card className="mb-6 p-4 bg-white shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Analytics Filters
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {isExpanded && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="jobId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Filter by job title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date Range</FormLabel>
                    <DatePicker
                      selectsRange={true}
                      startDate={field.value?.from}
                      endDate={field.value?.to}
                      onSelect={(dateRange) => {
                        // Handle the date selection for range
                        if (dateRange && typeof dateRange === 'object') {
                          // Range object received from Calendar component
                          const range = dateRange as DateRange;
                          field.onChange({
                            from: range.from,
                            to: range.to
                          });
                        }
                      }}
                      placeholder="Select date range"
                      className="w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Status</FormLabel>
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
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="screening">Screening</SelectItem>
                        <SelectItem value="interview">Interview</SelectItem>
                        <SelectItem value="offer">Offer</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  onFilterChange({
                    jobId: '',
                    status: 'all',
                    sortBy: 'date',
                  });
                }}
              >
                Reset
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Apply Filters'
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </Card>
  );
}
