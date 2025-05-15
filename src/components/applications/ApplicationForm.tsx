import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { ApplicationStatus } from '@/types/application';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const applicationFormSchema = z.object({
  job_title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  status: z.string().min(2, {
    message: "Status is required.",
  }),
  applied_date: z.date(),
  contact_name: z.string().optional(),
  contact_email: z.string().email({ message: "Invalid email address." }).optional(),
  next_step: z.string().optional(),
  next_step_date: z.date().optional(),
  notes: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  onSuccess?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  jobId,
  jobTitle,
  companyName,
  onSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { createApplication } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      job_title: jobTitle,
      company: companyName,
      status: "applied" as ApplicationStatus,
      applied_date: new Date(),
    },
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsLoading(true);
    try {
      if (!createApplication) {
        throw new Error("createApplication function is not available");
      }

      await createApplication({
        job_id: jobId,
        job_title: data.job_title,
        company: data.company,
        status: data.status,
        applied_date: data.applied_date.toISOString(),
        contact_name: data.contact_name,
        contact_email: data.contact_email,
        next_step: data.next_step,
        next_step_date: data.next_step_date?.toISOString(),
        notes: data.notes,
      });

      toast({
        title: "Application Created",
        description: "Your application has been successfully created.",
      });

      onSuccess?.();
      navigate('/profile');
    } catch (error: any) {
      console.error("Error creating application:", error);
      toast({
        title: "Error",
        description:
          error.message || "Failed to create application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Job Title */}
      <div className="space-y-2">
        <Label htmlFor="job_title">Job Title</Label>
        <Input
          id="job_title"
          placeholder="Enter job title"
          {...register("job_title")}
        />
        {errors.job_title && (
          <p className="text-sm text-red-500">{errors.job_title.message}</p>
        )}
      </div>

      {/* Company */}
      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          placeholder="Enter company name"
          {...register("company")}
        />
        {errors.company && (
          <p className="text-sm text-red-500">{errors.company.message}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          onValueChange={(value) => {
            // Manually trigger the change event
            const event = new Event('input', { bubbles: true, cancelable: true });
            const el = document.querySelector('#status');
            el?.dispatchEvent(event);
          }}
        >
          <SelectTrigger id="status">
            <SelectValue placeholder="Select a status" {...register("status")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="withdrawn">Withdrawn</SelectItem>
            <SelectItem value="offered">Offered</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-sm text-red-500">{errors.status.message}</p>
        )}
      </div>

      {/* Applied Date */}
      <div className="space-y-2">
        <Label htmlFor="applied_date">Applied Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !((control as any)._formValues.applied_date) && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {((control as any)._formValues.applied_date) ? (
                format(((control as any)._formValues.applied_date), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              // selected={field.value}
              onSelect={(date) => {
                // Manually trigger the change event
                const event = new Event('input', { bubbles: true, cancelable: true });
                const el = document.querySelector('#applied_date');
                el?.dispatchEvent(event);
              }}
              disabled={(date) =>
                date > new Date() || date < new Date("2021-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.applied_date && (
          <p className="text-sm text-red-500">{errors.applied_date.message}</p>
        )}
      </div>

      {/* Contact Name */}
      <div className="space-y-2">
        <Label htmlFor="contact_name">Contact Name (Optional)</Label>
        <Input
          id="contact_name"
          placeholder="Enter contact name"
          {...register("contact_name")}
        />
        {errors.contact_name && (
          <p className="text-sm text-red-500">{errors.contact_name.message}</p>
        )}
      </div>

      {/* Contact Email */}
      <div className="space-y-2">
        <Label htmlFor="contact_email">Contact Email (Optional)</Label>
        <Input
          id="contact_email"
          type="email"
          placeholder="Enter contact email"
          {...register("contact_email")}
        />
        {errors.contact_email && (
          <p className="text-sm text-red-500">{errors.contact_email.message}</p>
        )}
      </div>

      {/* Next Step */}
      <div className="space-y-2">
        <Label htmlFor="next_step">Next Step (Optional)</Label>
        <Input
          id="next_step"
          placeholder="Enter next step"
          {...register("next_step")}
        />
        {errors.next_step && (
          <p className="text-sm text-red-500">{errors.next_step.message}</p>
        )}
      </div>

      {/* Next Step Date */}
      <div className="space-y-2">
        <Label htmlFor="next_step_date">Next Step Date (Optional)</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !((control as any)._formValues.next_step_date) && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {((control as any)._formValues.next_step_date) ? (
                format(((control as any)._formValues.next_step_date), "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              // selected={field.value}
              onSelect={(date) => {
                // Manually trigger the change event
                const event = new Event('input', { bubbles: true, cancelable: true });
                const el = document.querySelector('#next_step_date');
                el?.dispatchEvent(event);
              }}
              disabled={(date) =>
                date < new Date()
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.next_step_date && (
          <p className="text-sm text-red-500">{errors.next_step_date.message}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Enter any notes"
          {...register("notes")}
        />
        {errors.notes && (
          <p className="text-sm text-red-500">{errors.notes.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Creating Application..." : "Create Application"}
      </Button>
    </form>
  );
};
export default ApplicationForm;
