
import { Job as MockJob } from '@/types/job';

// Database Job interface
export interface DatabaseJob {
  id: string;
  title: string;
  company_name: string;
  location_city: string;
  location_state: string;
  job_type: string;
  pay_rate_min: number;
  pay_rate_max: number;
  pay_rate_period: string;
  posted_date: string;
  logo_url?: string;
  is_featured?: boolean;
  is_remote?: boolean;
  is_flexible?: boolean;
  description?: string;
  experience_level?: string;
}

// Transform mock job to database job format
export const transformMockJobToDatabase = (mockJob: MockJob): DatabaseJob => {
  return {
    id: mockJob.id,
    title: mockJob.title,
    company_name: mockJob.company.name,
    location_city: mockJob.location.city,
    location_state: mockJob.location.state,
    job_type: mockJob.type,
    pay_rate_min: mockJob.payRate.min,
    pay_rate_max: mockJob.payRate.max,
    pay_rate_period: mockJob.payRate.period,
    posted_date: mockJob.postedDate,
    logo_url: mockJob.logoUrl,
    is_featured: mockJob.isFeatured,
    is_remote: mockJob.isRemote,
    is_flexible: mockJob.isFlexible,
    description: mockJob.description,
    experience_level: mockJob.experienceLevel,
  };
};

// Transform array of mock jobs to database jobs
export const transformMockJobsToDatabase = (mockJobs: MockJob[]): DatabaseJob[] => {
  return mockJobs.map(transformMockJobToDatabase);
};
