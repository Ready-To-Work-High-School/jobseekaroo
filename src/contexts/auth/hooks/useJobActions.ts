
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export const useJobActions = (user: User | null) => {
  const saveJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    const { error } = await supabase
      .from('saved_jobs')
      .insert({ user_id: user.id, job_id: jobId });
      
    if (error) throw error;
  };

  const unsaveJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .match({ user_id: user.id, job_id: jobId });
      
    if (error) throw error;
  };

  const isSavedJob = async (jobId: string) => {
    if (!user) return false;
    
    const { data, error } = await supabase
      .from('saved_jobs')
      .select()
      .match({ user_id: user.id, job_id: jobId })
      .single();
      
    if (error && error.code !== 'PGRST116') return false;
    return !!data;
  };

  const getSavedJobs = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .match({ user_id: user.id });
      
    if (error) throw error;
    return data.map(item => item.job_id);
  };
  
  const createJob = async (jobData: any) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('jobs')
      .insert({ ...jobData, employer_id: user.id })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  };
  
  const updateJob = async (jobId: string, jobData: any) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', jobId)
      .eq('employer_id', user.id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  };
  
  const deleteJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', jobId)
      .eq('employer_id', user.id);
      
    if (error) throw error;
  };
  
  const getJobs = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('jobs')
      .select()
      .eq('employer_id', user.id);
      
    if (error) throw error;
    return data;
  };
  
  const getJobById = async (jobId: string) => {
    const { data, error } = await supabase
      .from('jobs')
      .select()
      .eq('id', jobId)
      .single();
      
    if (error) throw error;
    return data;
  };

  return {
    saveJob,
    unsaveJob,
    isSavedJob,
    getSavedJobs,
    createJob,
    updateJob,
    deleteJob,
    getJobs,
    getJobById
  };
};
