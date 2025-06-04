
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export const useJobActions = (user: User | null) => {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const saveJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({ user_id: user.id, job_id: jobId });
      
      if (error) throw error;
      setSavedJobs(prev => [...prev, jobId]);
    } catch (error) {
      console.error('Failed to save job:', error);
      throw error;
    }
  };

  const unsaveJob = async (jobId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .delete()
        .eq('user_id', user.id)
        .eq('job_id', jobId);
      
      if (error) throw error;
      setSavedJobs(prev => prev.filter(id => id !== jobId));
    } catch (error) {
      console.error('Failed to unsave job:', error);
      throw error;
    }
  };

  const getSavedJobs = async (): Promise<string[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      const jobIds = data?.map(item => item.job_id) || [];
      setSavedJobs(jobIds);
      return jobIds;
    } catch (error) {
      console.error('Failed to get saved jobs:', error);
      return [];
    }
  };

  const isSavedJob = async (jobId: string): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('id')
        .eq('user_id', user.id)
        .eq('job_id', jobId)
        .maybeSingle();
      
      if (error) throw error;
      return !!data;
    } catch (error) {
      console.error('Failed to check if job is saved:', error);
      return false;
    }
  };

  return {
    saveJob,
    unsaveJob,
    getSavedJobs,
    isSavedJob
  };
};
