
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
      .maybeSingle();
      
    if (error && error.code !== 'PGRST116') return false;
    return !!data;
  };

  const getSavedJobs = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_id', user.id);
      
    if (error) throw error;
    return data?.map(item => item.job_id) || [];
  };

  return {
    saveJob,
    unsaveJob,
    isSavedJob,
    getSavedJobs
  };
};
