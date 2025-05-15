
export type JobType = 'full-time' | 'part-time' | 'internship' | 'contract' | 'temporary' | 'volunteer' | 'apprenticeship';

export type ExperienceLevel = 'entry-level' | 'mid-level' | 'senior-level' | 'manager' | 'executive';

export type ApplicationStatus = 'applied' | 'interviewing' | 'offered' | 'accepted' | 'rejected' | 'pending' | 'hired' | 'withdrawn';

export interface JobLocation {
  city: string;
  state: string;
  zip: string;
  zipCode?: string; // Adding this for backward compatibility
}

export interface JobSearchFilters {
  keywords?: string;
  type?: JobType | string;
  experienceLevel?: ExperienceLevel | string;
  isRemote?: boolean;
  isFlexible?: boolean;
  salary?: {
    min?: number;
    max?: number;
  };
  postedWithin?: number;
  category?: string;
  isFeatured?: boolean;
  sortBy?: 'relevance' | 'date' | 'salary' | 'distance';
  radius?: number;
}

export interface JobPayRate {
  min: number;
  max: number;
  period: 'hourly' | 'yearly' | 'monthly' | 'weekly';
}

export interface JobCompany {
  name: string;
  logoUrl?: string;
}

export interface Job {
  id: string;
  title: string;
  company: JobCompany | string;
  location: JobLocation;
  type: JobType;
  payRate?: JobPayRate;
  description: string;
  requirements: string[];
  experienceLevel: ExperienceLevel;
  postedDate: string;
  isRemote?: boolean;
  isFlexible?: boolean;
  isTeenAppropriate?: boolean;
  isFeatured?: boolean;
  isPremium?: boolean;
  hoursPerWeek?: number;
  prohibitedJobTypes?: string[];
  skills?: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
  userId: string;
  notes?: string;
  contactName?: string;
  contactEmail?: string;
  nextStep?: string;
  nextStepDate?: string;
  updatedAt: string;
  createdAt: string;
}

export interface ApplicationStats {
  applied: number;
  interviewing: number;
  offered: number;
  accepted: number;
  rejected: number;
  withdrawn: number;
  total: number;
}

export interface StatusCount {
  status: ApplicationStatus;
  count: number;
}
