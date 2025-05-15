
import { Job } from '@/types/job';

// This utility helps handle both property naming conventions in our application
// during the transition period
export function normalizeJob(job: any): Job {
  // Normalize inconsistent property names
  const normalizedJob: Job = {
    ...job,
    // Handle company structure
    company: job.company || { 
      name: job.company_name || '',
      logoUrl: job.logo_url || job.logoUrl
    },
    // Handle location structure
    location: job.location || {
      city: job.location_city || '',
      state: job.location_state || '',
      zip: job.location_zip || ''
    },
    // Handle pay rate structure
    payRate: job.payRate || {
      min: job.pay_rate_min || 0,
      max: job.pay_rate_max || 0,
      period: job.pay_rate_period || 'hourly'
    },
    // Handle inconsistent naming
    logoUrl: job.logoUrl || job.logo_url,
    postedDate: job.postedDate || job.posted_date,
    isRemote: job.isRemote !== undefined ? job.isRemote : job.is_remote,
    isFlexible: job.isFlexible !== undefined ? job.isFlexible : job.is_flexible,
    isFeatured: job.isFeatured !== undefined ? job.isFeatured : job.is_featured,
    isPremium: job.isPremium !== undefined ? job.isPremium : job.is_premium,
    experienceLevel: job.experienceLevel || job.experience_level,
    type: job.type || job.job_type,
    requirements: job.requirements || [],
    created_at: job.created_at || new Date().toISOString(),
    updated_at: job.updated_at || new Date().toISOString()
  };
  
  return normalizedJob;
}

// Function to normalize an array of jobs
export function normalizeJobs(jobs: any[]): Job[] {
  return jobs.map(normalizeJob);
}
