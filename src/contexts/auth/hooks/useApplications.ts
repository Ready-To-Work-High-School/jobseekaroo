
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { ApplicationStatus } from '@/types/application';

export const useApplications = (user: User | null) => {
  const createApplication = async (applicationData: any) => {
    if (!user) throw new Error('User not authenticated');
    
    // Use the correct table name from supabase schema
    const { data, error } = await supabase
      .from('job_applications')
      .insert({ ...applicationData, user_id: user.id })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  };
  
  const getApplications = async () => {
    if (!user) return [];
    
    const { data, error } = await supabase
      .from('job_applications')
      .select()
      .eq('user_id', user.id);
      
    if (error) throw error;
    return data;
  };
  
  const getApplicationById = async (applicationId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('job_applications')
      .select()
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single();
      
    if (error) throw error;
    return data;
  };
  
  const updateApplicationStatus = async (applicationId: string, status: ApplicationStatus) => {
    if (!user) throw new Error('User not authenticated');
    
    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  };
  
  const deleteApplication = async (applicationId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    const { error } = await supabase
      .from('job_applications')
      .delete()
      .eq('id', applicationId)
      .eq('user_id', user.id);
      
    if (error) throw error;
  };

  return {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplicationStatus,
    deleteApplication
  };
};
