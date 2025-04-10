
export type JobType = 'part-time' | 'full-time' | 'internship' | 'temporary' | 'weekend' | 'summer' | 'apprenticeship' | 'contract';

export type ExperienceLevel = 'no-experience' | 'entry-level' | 'some-experience' | 'mid-level' | 'senior';

export interface Job {
  id: string;
  title: string;
  company: {
    name: string;
    logoUrl?: string;
  };
  location: {
    city: string;
    state: string;
    zipCode: string;
  };
  type: JobType;
  payRate: {
    min: number;
    max: number;
    period: 'hourly' | 'weekly' | 'monthly';
  };
  salary?: {
    min?: number;
    max?: number;
  };
  description: string;
  requirements: string[];
  experienceLevel: ExperienceLevel;
  postedDate: string;
  applicationUrl?: string;
  contactEmail?: string;
  logoUrl?: string;
  isRemote: boolean;
  isFlexible: boolean;
  isFeatured?: boolean;
}
