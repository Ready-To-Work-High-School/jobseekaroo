
export interface Job {
  id: string;
  title: string;
  company_name: string;
  description: string;
  location_city: string;
  location_state: string;
  location_zip: string;
  job_type: 'full-time' | 'part-time' | 'internship' | 'volunteer' | 'seasonal';
  experience_level: 'entry-level' | 'mid-level' | 'senior' | 'internship';
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'yearly';
  requirements: string[];
  hours_per_week?: number;
  is_remote?: boolean;
  is_flexible?: boolean;
  is_featured?: boolean;
  is_premium?: boolean;
  is_teen_appropriate?: boolean;
  prohibited_types?: string[];
  posted_date: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface JobSearchFilters {
  zipCode?: string;
  radius?: number;
  jobType?: string;
  experienceLevel?: string;
  isRemote?: boolean;
  isFlexible?: boolean;
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

export interface SavedSearch {
  id: string;
  user_id: string;
  name: string;
  query: string;
  filters: JobSearchFilters;
  created_at: string;
  updated_at?: string;
}
