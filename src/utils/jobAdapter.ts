
import { Job } from '@/types/job';

// This utility helps handle both property naming conventions in our application
// during the transition period
export function normalizeJob(job: any): Job {
  // Normalize inconsistent property names
  const normalizedJob: Job = {
    id: job.id,
    title: job.title,
    description: job.description || '',
    requirements: job.requirements || [],
    
    // Handle company structure
    company: {
      name: job.company_name || (job.company ? job.company.name : ''),
      logoUrl: job.logo_url || job.logoUrl || (job.company ? job.company.logoUrl : undefined)
    },
    
    // Handle location structure
    location: {
      city: job.location_city || (job.location ? job.location.city : ''),
      state: job.location_state || (job.location ? job.location.state : ''),
      zip: job.location_zip || (job.location ? job.location.zip : '')
    },
    
    // Handle pay rate structure
    payRate: {
      min: job.pay_rate_min || (job.payRate ? job.payRate.min : 0),
      max: job.pay_rate_max || (job.payRate ? job.payRate.max : 0),
      period: job.pay_rate_period || (job.payRate ? job.payRate.period : 'hourly')
    },
    
    // Handle other properties with consistent naming
    type: job.type || job.job_type || 'full-time',
    experienceLevel: job.experienceLevel || job.experience_level || 'entry-level',
    postedDate: job.postedDate || job.posted_date || new Date().toISOString(),
    isRemote: job.isRemote !== undefined ? job.isRemote : job.is_remote,
    isFlexible: job.isFlexible !== undefined ? job.isFlexible : job.is_flexible,
    isFeatured: job.isFeatured !== undefined ? job.isFeatured : job.is_featured,
    isPremium: job.isPremium !== undefined ? job.isPremium : job.is_premium,
    logoUrl: job.logoUrl || job.logo_url,
    hours_per_week: job.hours_per_week,
    is_teen_appropriate: job.is_teen_appropriate,
    prohibited_types: job.prohibited_types,
    created_at: job.created_at || new Date().toISOString(),
    updated_at: job.updated_at || new Date().toISOString(),
    
    // Include legacy properties for compatibility
    company_name: job.company_name || (job.company ? job.company.name : ''),
    logo_url: job.logo_url || job.logoUrl,
    location_city: job.location_city || (job.location ? job.location.city : ''),
    location_state: job.location_state || (job.location ? job.location.state : ''),
    location_zip: job.location_zip || (job.location ? job.location.zip : ''),
    job_type: job.job_type || job.type,
    experience_level: job.experience_level || job.experienceLevel,
    pay_rate_min: job.pay_rate_min || (job.payRate ? job.payRate.min : 0),
    pay_rate_max: job.pay_rate_max || (job.payRate ? job.payRate.max : 0),
    pay_rate_period: job.pay_rate_period || (job.payRate ? job.payRate.period : 'hourly'),
    is_remote: job.is_remote !== undefined ? job.is_remote : job.isRemote,
    is_flexible: job.is_flexible !== undefined ? job.is_flexible : job.isFlexible,
    is_featured: job.is_featured !== undefined ? job.is_featured : job.isFeatured,
    is_premium: job.is_premium !== undefined ? job.is_premium : job.isPremium,
    posted_date: job.posted_date || job.postedDate
  };
  
  return normalizedJob;
}

// Function to normalize an array of jobs
export function normalizeJobs(jobs: any[]): Job[] {
  return jobs.map(normalizeJob);
}
