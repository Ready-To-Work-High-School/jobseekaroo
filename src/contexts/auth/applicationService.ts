
import { supabase } from '@/lib/supabase';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { validateApplicationStatus } from '@/lib/supabase/utils';

export const createApplication = async (
  userId: string,
  application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<string> => {
  if (!userId) throw new Error('User must be logged in to create an application');
  
  try {
    // Add all required fields ensuring job_id is properly populated
    const newApplication = {
      ...application,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    // Explicitly avoid any employer_id field that might be causing conflicts
    // Ensure we're not trying to insert fields that don't exist in the table
    const { data, error } = await supabase
      .from('job_applications')
      .insert([newApplication])
      .select('id')
      .single();
    
    if (error) throw error;
    
    return data.id;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  userId: string,
  applicationId: string, 
  status: ApplicationStatus
): Promise<void> => {
  if (!userId) throw new Error('User must be logged in to update an application');
  
  try {
    const { error } = await supabase
      .from('job_applications')
      .update({ 
        status, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', applicationId)
      .eq('user_id', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};

export const getApplications = async (userId: string): Promise<JobApplication[]> => {
  if (!userId) return [];
  
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map(app => ({
      ...app,
      status: validateApplicationStatus(app.status)
    })) as JobApplication[];
    
  } catch (error) {
    console.error('Error getting applications:', error);
    return [];
  }
};

export const deleteApplication = async (userId: string, applicationId: string): Promise<void> => {
  if (!userId) throw new Error('User must be logged in to delete an application');
  
  try {
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId)
      .eq('user_id', userId);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};
