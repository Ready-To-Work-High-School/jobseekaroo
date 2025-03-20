
export type JobType = 'part-time' | 'full-time' | 'internship' | 'temporary' | 'weekend' | 'summer' | 'apprenticeship';

export type ExperienceLevel = 'no-experience' | 'entry-level' | 'some-experience';

export interface Job {
  id: string;
  title: string;
  company: string;
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
  description: string;
  requirements: string[];
  experienceLevel: ExperienceLevel;
  postedDate: string;
  applicationUrl?: string;
  logoUrl?: string;
  isRemote: boolean;
  isFlexible: boolean;
}
