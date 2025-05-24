
import { supabase } from '@/lib/supabase';

export const getAllJobs = async () => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobById = async (jobId: string) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
};

export const createJob = async (jobData: any) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating job:', error);
    throw error;
  }
};

export const getEmployerJobStats = async (employerId: string) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('id, status')
      .eq('employer_id', employerId);

    if (error) throw error;
    
    return {
      total: data?.length || 0,
      active: data?.filter(job => job.status === 'active').length || 0,
      draft: data?.filter(job => job.status === 'draft').length || 0,
    };
  } catch (error) {
    console.error('Error fetching employer job stats:', error);
    return { total: 0, active: 0, draft: 0 };
  }
};
