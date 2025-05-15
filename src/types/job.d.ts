
export type JobType = 
  | 'full-time'
  | 'part-time'
  | 'internship'
  | 'contract'
  | 'temporary'
  | 'volunteer'
  | 'apprenticeship';

export type ExperienceLevel = 
  | 'entry-level'
  | 'mid-level'
  | 'senior-level'
  | 'executive'
  | 'no-experience';

export type PayRatePeriod = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Job {
  id: string;
  title: string;
  company_name: string;
  company?: {
    name: string;
    logoUrl?: string;
  };
  logo_url?: string;
  description: string;
  job_type: JobType;
  experience_level: ExperienceLevel;
  location: {
    city: string;
    state: string;
    zip: string;
  };
  is_remote: boolean;
  is_featured?: boolean;
  is_premium?: boolean;
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: PayRatePeriod;
  hours_per_week?: number;
  is_flexible?: boolean;
  requirements: string[];
  posted_date: string;
  created_at: string;
  updated_at: string;
  is_teen_appropriate?: boolean;
}

export interface JobSearchFilters {
  keyword?: string;
  location?: string;
  job_type?: JobType;
  experience_level?: ExperienceLevel;
  is_remote?: boolean;
  salary_min?: number;
  is_featured?: boolean;
}

export type ApplicationStatus =
  | "applied"
  | "interviewing"
  | "rejected"
  | "accepted"
  | "withdrawn"
  | "offered"
  | "pending"
  | "hired";

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  job_title: string;
  company: string;
  status: ApplicationStatus;
  applied_date: string;
  contact_name?: string;
  contact_email?: string;
  next_step?: string;
  next_step_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
