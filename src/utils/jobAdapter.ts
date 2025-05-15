
import { Job } from '@/types/job';

// This utility helps handle both property naming conventions in our application
export function normalizeJob(job: any): Job {
  // Normalize inconsistent property names
  const normalizedJob: Job = {
    id: job.id,
    title: job.title,
    description: job.description || '',
    requirements: job.requirements || [],
    
    // Handle nested objects for components that expect them
    company: {
      name: job.company_name || (job.company ? (typeof job.company === 'object' ? job.company.name : job.company) : ''),
      logoUrl: job.logo_url || job.logoUrl || (job.company && typeof job.company === 'object' ? job.company.logoUrl : undefined)
    },
    
    location: {
      city: job.location_city || (job.location && typeof job.location === 'object' ? job.location.city : ''),
      state: job.location_state || (job.location && typeof job.location === 'object' ? job.location.state : ''),
      zip: job.location_zip || (job.location && typeof job.location === 'object' ? job.location.zip : '')
    },
    
    payRate: {
      min: job.pay_rate_min || (job.payRate && typeof job.payRate === 'object' ? job.payRate.min : 0),
      max: job.pay_rate_max || (job.payRate && typeof job.payRate === 'object' ? job.payRate.max : 0),
      period: job.pay_rate_period || (job.payRate && typeof job.payRate === 'object' ? job.payRate.period : 'hourly')
    },
    
    type: job.type || job.job_type || 'full-time',
    experienceLevel: job.experienceLevel || job.experience_level || 'entry-level',
    postedDate: job.postedDate || job.posted_date || new Date().toISOString(),
    isRemote: job.isRemote !== undefined ? job.isRemote : (job.is_remote || false),
    isFlexible: job.isFlexible !== undefined ? job.isFlexible : (job.is_flexible || false),
    isFeatured: job.isFeatured !== undefined ? job.isFeatured : (job.is_featured || false),
    logoUrl: job.logoUrl || job.logo_url,
    
    // Include original properties for compatibility
    company_name: job.company_name || '',
    logo_url: job.logo_url || job.logoUrl,
    location_city: job.location_city || '',
    location_state: job.location_state || '',
    location_zip: job.location_zip || '',
    job_type: job.job_type || job.type,
    experience_level: job.experience_level || job.experienceLevel,
    pay_rate_min: job.pay_rate_min || (job.payRate && typeof job.payRate === 'object' ? job.payRate.min : 0),
    pay_rate_max: job.pay_rate_max || (job.payRate && typeof job.payRate === 'object' ? job.payRate.max : 0),
    pay_rate_period: job.pay_rate_period || (job.payRate && typeof job.payRate === 'object' ? job.payRate.period : 'hourly'),
    is_remote: job.is_remote !== undefined ? job.is_remote : job.isRemote,
    is_flexible: job.is_flexible !== undefined ? job.is_flexible : job.isFlexible,
    is_featured: job.is_featured !== undefined ? job.is_featured : job.isFeatured,
    posted_date: job.posted_date || job.postedDate,
    hours_per_week: job.hours_per_week,
    is_teen_appropriate: job.is_teen_appropriate,
    prohibited_types: job.prohibited_types,
    created_at: job.created_at || new Date().toISOString(),
    updated_at: job.updated_at || new Date().toISOString()
  };
  
  return normalizedJob;
}

// Function to normalize an array of jobs
export function normalizeJobs(jobs: any[]): Job[] {
  return jobs.map(normalizeJob);
}
