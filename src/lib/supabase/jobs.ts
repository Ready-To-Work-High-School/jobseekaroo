
import { supabase } from './index';
import { Job, JobType, ExperienceLevel } from '@/types/job';

// Get all jobs
export async function getAllJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        company:company_name (
          name,
          logo_url
        )
      `)
      .order('posted_date', { ascending: false });
    
    if (error) throw error;
    
    // Format the data to match the Job interface
    const formattedData = data.map(job => ({
      id: job.id,
      title: job.title,
      company: {
        name: job.company_name,
        logoUrl: job.logo_url || null,
      },
      location: {
        city: job.location_city,
        state: job.location_state,
        zipCode: job.location_zip,
      },
      type: job.job_type as JobType,
      description: job.description,
      requirements: job.requirements || [],
      isFeatured: job.is_featured || false,
      isRemote: job.is_remote || false,
      isFlexible: job.is_flexible || false,
      isPremium: job.is_premium || false,
      postedDate: job.posted_date,
      payRate: {
        min: job.pay_rate_min,
        max: job.pay_rate_max,
        period: job.pay_rate_period as "hourly" | "weekly" | "monthly"
      },
      experienceLevel: job.experience_level as ExperienceLevel
    }));
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

// Get job by ID
export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        company:company_name (
          name,
          logo_url
        )
      `)
      .eq('id', jobId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - job not found
        return null;
      }
      throw error;
    }
    
    if (!data) return null;
    
    // Format the data to match the Job interface
    return {
      id: data.id,
      title: data.title,
      company: {
        name: data.company_name,
        logoUrl: data.logo_url || null,
      },
      location: {
        city: data.location_city,
        state: data.location_state,
        zipCode: data.location_zip,
      },
      type: data.job_type as JobType,
      description: data.description,
      requirements: data.requirements || [],
      isFeatured: data.is_featured || false,
      isRemote: data.is_remote || false,
      isFlexible: data.is_flexible || false,
      isPremium: data.is_premium || false,
      postedDate: data.posted_date,
      payRate: {
        min: data.pay_rate_min,
        max: data.pay_rate_max,
        period: data.pay_rate_period as "hourly" | "weekly" | "monthly"
      },
      experienceLevel: data.experience_level as ExperienceLevel
    };
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    throw error;
  }
}

// Get employer job statistics
export async function getEmployerJobStats(employerId: string): Promise<{
  jobsPosted: number;
  hires: number;
  applications: number;
}> {
  try {
    // Get jobs posted count
    const { count: jobsCount, error: jobsError } = await supabase
      .from('jobs')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', employerId);
    
    if (jobsError) throw jobsError;
    
    // Get hires count 
    const { count: hiresCount, error: hiresError } = await supabase
      .from('job_applications')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', employerId)
      .eq('status', 'hired');
    
    if (hiresError) throw hiresError;
    
    // Get applications count
    const { count: applicationsCount, error: applicationsError } = await supabase
      .from('job_applications')
      .select('id', { count: 'exact', head: true })
      .eq('employer_id', employerId);
    
    if (applicationsError) throw applicationsError;
    
    return {
      jobsPosted: jobsCount || 0,
      hires: hiresCount || 0,
      applications: applicationsCount || 0
    };
  } catch (error) {
    console.error('Error fetching employer stats:', error);
    throw error;
  }
}
