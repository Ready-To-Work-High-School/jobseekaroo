
import { supabase } from '@/lib/supabase';
import { JobApplication, ApplicationStatus } from '@/types/job';

export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
): Promise<void> => {
  const { error } = await supabase
    .from('job_applications')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', applicationId);

  if (error) throw error;
};

export const fetchApplications = async (userId: string): Promise<JobApplication[]> => {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', userId)
    .order('applied_date', { ascending: false });

  if (error) throw error;
  return data as JobApplication[];
};

export const deleteApplication = async (applicationId: string): Promise<void> => {
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('id', applicationId);

  if (error) throw error;
};

export const createApplication = async (
  application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at'>
): Promise<string> => {
  const { data, error } = await supabase
    .from('job_applications')
    .insert({
      ...application,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
};

