
import { Job } from '@/types/job';

/**
 * Normalizes a job object to ensure it has consistent property structure
 * This handles both camelCase and snake_case properties
 */
export const normalizeJob = (job: Job): Job => {
  if (!job) return job;
  
  // Create normalized job object with both formats
  const normalized: Job = {
    ...job,
    // Set up camelCase properties if they don't exist
    company: job.company || { 
      name: job.company_name || '',
      logoUrl: job.logo_url
    },
    location: job.location || {
      city: job.location_city || '',
      state: job.location_state || '',
      zip: job.location_zip || ''
    },
    payRate: job.payRate || {
      min: job.pay_rate_min || 0,
      max: job.pay_rate_max || 0,
      period: job.pay_rate_period || 'hourly'
    },
    type: job.type || job.job_type || '',
    experienceLevel: job.experienceLevel || job.experience_level || '',
    postedDate: job.postedDate || job.posted_date || '',
    isRemote: job.isRemote !== undefined ? job.isRemote : job.is_remote,
    isFlexible: job.isFlexible !== undefined ? job.isFlexible : job.is_flexible,
    isFeatured: job.isFeatured !== undefined ? job.isFeatured : job.is_featured,
    isPremium: job.isPremium !== undefined ? job.isPremium : job.is_premium,
  };

  return normalized;
};

/**
 * Normalize an array of jobs
 */
export const normalizeJobs = (jobs: Job[]): Job[] => {
  if (!jobs) return [];
  return jobs.map(normalizeJob);
};
