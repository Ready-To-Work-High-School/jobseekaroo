
import { Job, JobType, ExperienceLevel } from '@/types/job';
import { supabase } from './index';

// Helper to fetch all jobs from the database
export async function getAllJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_date', { ascending: false });
    
    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
    
    // Transform the database records to match the Job type
    return (data || []).map(job => transformDatabaseJobToJobType(job));
  } catch (error) {
    console.error('Exception fetching jobs:', error);
    return [];
  }
}

// Helper to fetch a specific job by ID
export async function getJobById(id: string): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Record not found, this is expected in some cases
        console.log(`Job with ID ${id} not found in database`);
        return null;
      }
      console.error('Error fetching job by id:', error);
      return null;
    }
    
    if (!data) return null;
    
    return transformDatabaseJobToJobType(data);
  } catch (error) {
    console.error('Exception fetching job by id:', error);
    return null;
  }
}

// Helper function to transform a database job record to the Job type
function transformDatabaseJobToJobType(dbJob: any): Job {
  return {
    id: dbJob.id,
    title: dbJob.title,
    company: {
      name: dbJob.company_name,
    },
    location: {
      city: dbJob.location_city,
      state: dbJob.location_state,
      zipCode: dbJob.location_zip,
    },
    type: dbJob.job_type as JobType,
    payRate: {
      min: Number(dbJob.pay_rate_min),
      max: Number(dbJob.pay_rate_max),
      period: dbJob.pay_rate_period as 'hourly' | 'weekly' | 'monthly',
    },
    description: dbJob.description,
    requirements: dbJob.requirements,
    experienceLevel: dbJob.experience_level as ExperienceLevel,
    postedDate: dbJob.posted_date,
    logoUrl: dbJob.logo_url,
    isRemote: dbJob.is_remote,
    isFlexible: dbJob.is_flexible,
    isFeatured: dbJob.is_featured,
  };
}
