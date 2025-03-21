
import { supabase } from '@/integrations/supabase/client';
import { mockJobs } from './jobs';
import { toast } from 'sonner';

/**
 * Synchronizes mock job data with the Supabase database.
 * This function is useful for initial setup or development purposes.
 */
export async function syncMockJobsToSupabase(): Promise<boolean> {
  try {
    console.log('Starting synchronization of mock jobs to Supabase...');
    
    // Check if we already have jobs in the database
    const { count, error: countError } = await supabase
      .from('jobs')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('Error checking jobs count:', countError);
      return false;
    }
    
    if (count && count > 0) {
      console.log(`Database already contains ${count} jobs. Skipping synchronization.`);
      return true;
    }
    
    // If no jobs exist, insert mock jobs
    console.log(`Inserting ${mockJobs.length} mock jobs into database...`);
    
    // Process in batches to avoid hitting limits
    const batchSize = 20;
    for (let i = 0; i < mockJobs.length; i += batchSize) {
      const batch = mockJobs.slice(i, i + batchSize).map(job => ({
        id: job.id,
        title: job.title,
        company_name: job.company.name,
        location_city: job.location.city || '',
        location_state: job.location.state || '',
        location_zip: job.location.zipCode || '',
        job_type: job.type,
        pay_rate_min: job.payRate?.min || 0,
        pay_rate_max: job.payRate?.max || 0,
        pay_rate_period: job.payRate?.period || 'hourly',
        description: job.description,
        requirements: job.requirements || [],
        experience_level: job.experienceLevel,
        posted_date: job.postedDate,
        logo_url: job.logoUrl || null,
        is_remote: job.isRemote || false,
        is_flexible: job.isFlexible || false,
        is_featured: job.isFeatured || false
      }));
      
      const { error } = await supabase.from('jobs').insert(batch);
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error);
        return false;
      }
      
      console.log(`Inserted batch ${i / batchSize + 1} of ${Math.ceil(mockJobs.length / batchSize)}`);
    }
    
    console.log('All mock jobs successfully synchronized to Supabase!');
    toast.success('Mock job data successfully loaded to database');
    return true;
  } catch (error) {
    console.error('Error synchronizing mock jobs:', error);
    toast.error('Failed to load mock job data');
    return false;
  }
}
