
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
  is_remote?: boolean;
  is_flexible?: boolean;
  isRemote?: boolean; // Support both formats temporarily during migration
  isFlexible?: boolean; // Support both formats temporarily during migration
  experienceLevel: ExperienceLevel;
  experience_level?: string;
  payRate: {
    min: number;
    max: number;
    period: string;
  };
  pay_rate_min?: number;
  pay_rate_max?: number;
  pay_rate_period?: string;
  hours_per_week?: number;
  requirements: string[];
  is_featured?: boolean;
  isFeatured?: boolean; // Support both formats
  is_premium?: boolean;
  isPremium?: boolean;
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
