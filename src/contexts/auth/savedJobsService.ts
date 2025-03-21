
import { supabase } from '@/lib/supabase';

export const saveJob = async (userId: string, jobId: string): Promise<void> => {
  if (!userId) throw new Error('User must be logged in to save jobs');
  
  try {
    const { data: existingData, error: checkError } = await supabase
      .from('saved_jobs')
      .select('*')
      .eq('user_id', userId)
      .eq('job_id', jobId)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }
    
    if (existingData) return;
    
    const { error } = await supabase
      .from('saved_jobs')
      .insert([
        { user_id: userId, job_id: jobId }
      ]);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error saving job:', error);
    throw error;
  }
};

export const unsaveJob = async (userId: string, jobId: string): Promise<void> => {
  if (!userId) throw new Error('User must be logged in to unsave jobs');
  
  try {
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('user_id', userId)
      .eq('job_id', jobId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error removing saved job:', error);
    throw error;
  }
};

export const isSavedJob = async (userId: string, jobId: string): Promise<boolean> => {
  if (!userId) return false;
  
  try {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('*')
      .eq('user_id', userId)
      .eq('job_id', jobId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw error;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking if job is saved:', error);
    return false;
  }
};

export const getSavedJobs = async (userId: string): Promise<string[]> => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('job_id')
      .eq('user_id', userId);
    
    if (error) throw error;
    
    return data.map(item => item.job_id);
  } catch (error) {
    console.error('Error getting saved jobs:', error);
    return [];
  }
};
