
export type JobType = 'full-time' | 'part-time' | 'internship' | 'volunteer' | 'seasonal';
export type ExperienceLevel = 'entry-level' | 'mid-level' | 'senior' | 'internship';
export type ApplicationStatus = 'applied' | 'interviewing' | 'rejected' | 'accepted' | 'pending' | 'hired' | 'withdrawn' | 'offered';

export interface Job {
  id: string;
  title: string;
  company_name: string;
  description: string;
  job_type: string;
  logo_url?: string;
  location_city: string;
  location_state: string;
  location_zip: string;
  is_remote?: boolean;
  is_flexible?: boolean;
  experience_level: string;
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: string;
  hours_per_week?: number;
  posted_date: string;
  requirements: string[];
  is_featured?: boolean;
  is_premium?: boolean;
  is_teen_appropriate?: boolean;
  prohibited_types?: string[];
  created_at: string;
  updated_at: string;
}

export interface JobSearchFilters {
  type?: string;
  experienceLevel?: string;
  isRemote?: boolean | null;
  isFlexible?: boolean | null;
  category?: string;
  salary?: {
    min?: number;
    max?: number;
  };
  postedWithin?: number;
  keywords?: string[];
  radius?: number;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
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
