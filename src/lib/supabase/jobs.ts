
import { supabase } from './index';
import { Job } from '@/types/job';

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
        logo: job.logo_url || null,
      },
      location: {
        city: job.location_city,
        state: job.location_state,
        zip: job.location_zip,
      },
      type: job.job_type,
      description: job.description,
      requirements: job.requirements || [],
      isFeatured: job.is_featured || false,
      isRemote: job.is_remote || false,
      isPremium: job.is_premium || false,
      postedDate: job.posted_date,
      payRate: {
        min: job.pay_rate_min,
        max: job.pay_rate_max,
        period: job.pay_rate_period
      },
      experienceLevel: job.experience_level
    }));
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

// Get employer job statistics
export async function getEmployerJobStats(employerId: string) {
  try {
    // Get jobs posted count
    const { data: jobsData, error: jobsError } = await supabase
      .from('jobs')
      .select('id', { count: 'exact' })
      .eq('employer_id', employerId);
    
    if (jobsError) throw jobsError;
    
    // Get hires count 
    const { data: hiresData, error: hiresError } = await supabase
      .from('job_applications')
      .select('id', { count: 'exact' })
      .eq('employer_id', employerId)
      .eq('status', 'hired');
    
    if (hiresError) throw hiresError;
    
    // Get applications count
    const { data: applicationsData, error: applicationsError } = await supabase
      .from('job_applications')
      .select('id', { count: 'exact' })
      .eq('employer_id', employerId);
    
    if (applicationsError) throw applicationsError;
    
    return {
      jobsPosted: jobsData?.length || 0,
      hires: hiresData?.length || 0,
      applications: applicationsData?.length || 0
    };
  } catch (error) {
    console.error('Error fetching employer stats:', error);
    throw error;
  }
}
