
import { z } from "zod";

export const employerVerificationSchema = z.object({
  company_name: z.string().min(2, "Company name is required"),
  ein: z.string().regex(/^\d{2}-?\d{7}$/, "EIN must be in format XX-XXXXXXX"),
  address: z.string().min(5, "Full address is required"),
  website: z.string().url("Must be a valid URL").optional(),
  contact_name: z.string().min(2, "Contact name is required"),
  contact_email: z.string().email("Must be a valid email"),
  contact_phone: z.string().optional(),
  job_description: z.string().min(50, "Please provide a detailed job description (min 50 characters)"),
  wage_range_min: z.number().min(1, "Minimum wage is required"),
  wage_range_max: z.number().min(1, "Maximum wage is required"),
  hours_per_week: z.number().min(1, "Hours per week is required"),
  safety_pledge_accepted: z.boolean().refine(val => val === true, "You must accept the safety pledge")
});

export type EmployerVerificationFormData = z.infer<typeof employerVerificationSchema>;

export type EmployerVerificationStatus = 'pending' | 'approved' | 'denied';
