
import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useJobActions = (user: any) => {
  const { toast } = useToast();

  const saveJob = useCallback(async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to save jobs');
    
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({ user_id: user.id, job_id: jobId });
        
      if (error) throw error;
    } catch (error) {
      console.error('Error saving job:', error);
      throw error;
    }
  }, [user]);

  const unsaveJob = useCallback(async (jobId: string) => {
    if (!user) throw new Error('User must be logged in to unsave jobs');
    
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', user.id)
        .eq('job_id', jobId);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error unsaving job:', error);
      throw error;
    }
  }, [user]);

  const isSavedJob = useCallback(async (jobId: string) => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('*')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .single();
        
      if (error && error.code !== 'PGRST116') throw error;
      
      return !!data;
    } catch (error) {
      console.error('Error checking if job is saved:', error);
      return false;
    }
  }, [user]);

  const getSavedJobs = useCallback(async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      return data.map(item => item.job_id);
    } catch (error) {
      console.error('Error getting saved jobs:', error);
      return [];
    }
  }, [user]);

  return {
    saveJob,
    unsaveJob,
    isSavedJob,
    getSavedJobs
  };
};
