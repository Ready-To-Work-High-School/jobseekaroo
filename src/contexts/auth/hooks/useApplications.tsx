
import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ApplicationStatus } from '@/types/application';

export const useApplications = (user: any) => {
  const createApplication = useCallback(async (application: any) => {
    if (!user) throw new Error('User must be logged in to create an application');
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .insert({ ...application, user_id: user.id })
        .select()
        .single();
        
      if (error) throw error;
      
      return data.id;
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  }, [user]);

  const updateApplicationStatus = useCallback(async (applicationId: string, status: ApplicationStatus) => {
    if (!user) throw new Error('User must be logged in to update an application');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId)
        .eq('user_id', user.id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  }, [user]);

  const getApplications = useCallback(async () => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('applied_date', { ascending: false });
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error('Error getting applications:', error);
      return [];
    }
  }, [user]);

  const deleteApplication = useCallback(async (applicationId: string) => {
    if (!user) throw new Error('User must be logged in to delete an application');
    
    try {
      const { error } = await supabase
        .from('job_applications')
        .delete()
        .eq('id', applicationId)
        .eq('user_id', user.id);
        
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  }, [user]);

  return {
    createApplication,
    updateApplicationStatus,
    getApplications,
    deleteApplication
  };
};
