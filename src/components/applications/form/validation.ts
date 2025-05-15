
import { z } from 'zod';
import { ApplicationStatus } from '@/types/application';

export const applicationFormSchema = z.object({
  job_title: z.string().min(2, "Job title is required"),
  company: z.string().min(2, "Company name is required"),
  applied_date: z.string().min(2, "Application date is required"),
  status: z.enum(['applied', 'interviewing', 'offered', 'accepted', 'rejected', 'withdrawn', 'pending', 'hired'] as const),
  notes: z.string().optional(),
  contact_name: z.string().optional(),
  contact_email: z.string().email().optional().or(z.literal('')),
  next_step: z.string().optional(),
  next_step_date: z.string().optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
