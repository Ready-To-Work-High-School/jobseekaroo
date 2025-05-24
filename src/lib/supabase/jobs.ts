
import { supabase } from './client';

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

export const getJobById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
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
      .insert([jobData])
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
      .select('*')
      .eq('company_name', employerId);

    if (error) throw error;

    const stats = {
      total: data?.length || 0,
      active: data?.filter(job => job.posted_date).length || 0,
      applications: 0, // This would need to come from applications table
      views: 0 // This would need to come from job views tracking
    };

    return stats;
  } catch (error) {
    console.error('Error fetching employer job stats:', error);
    return {
      total: 0,
      active: 0,
      applications: 0,
      views: 0
    };
  }
};
