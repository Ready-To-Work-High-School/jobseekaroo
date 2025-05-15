
export type JobType = 'full-time' | 'part-time' | 'internship' | 'volunteer' | 'seasonal' | 'weekend' | 'summer';
export type ExperienceLevel = 'entry-level' | 'mid-level' | 'senior' | 'internship' | 'no-experience' | 'some-experience';
export type ApplicationStatus = 'applied' | 'interviewing' | 'rejected' | 'accepted' | 'pending' | 'hired' | 'withdrawn' | 'offered';

export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logoUrl?: string;
  };
  description: string;
  location: {
    city: string;
    state: string;
    zip: string;
  };
  type: JobType;
  logoUrl?: string;
  postedDate: string;
  isRemote?: boolean;
  isFlexible?: boolean;
  experienceLevel: ExperienceLevel;
  payRate: {
    min: number;
    max: number;
    period: string;
  };
  hours_per_week?: number;
  requirements: string[];
  isFeatured?: boolean;
  isPremium?: boolean;
  is_teen_appropriate?: boolean;
  prohibited_types?: string[];
  created_at: string;
  updated_at: string;
  // Legacy properties for compatibility
  company_name?: string;
  logo_url?: string;
  location_city?: string;
  location_state?: string;
  location_zip?: string;
  job_type?: string;
  experience_level?: string;
  pay_rate_min?: number;
  pay_rate_max?: number;
  pay_rate_period?: string;
  is_remote?: boolean;
  is_flexible?: boolean;
  is_featured?: boolean;
  is_premium?: boolean;
  posted_date?: string;
}

export interface JobSearchFilters {
  zipCode?: string;
  radius?: number;
  type?: string;
  experienceLevel?: string;
  isRemote?: boolean | null;
  isFlexible?: boolean | null;
  category?: string; // Added category property
  salary?: {
    min?: number;
    max?: number;
  };
  postedWithin?: number;
  keywords?: string[];
  sortBy?: 'relevance' | 'date' | 'salary' | 'distance';
  page?: number;
  limit?: number;
}

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

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  query: string;
  filters: JobSearchFilters;
  created_at: string;
  updated_at?: string;
}
