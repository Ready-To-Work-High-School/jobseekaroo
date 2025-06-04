
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export const useApplications = (user: User | null) => {
  const createApplication = async (applicationData: any) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('applications')
        .insert({ 
          user_id: user.id, 
          ...applicationData 
        });
      
      if (error) throw error;
    } catch (error) {
      console.error('Failed to create application:', error);
      throw error;
    }
  };

  const getApplications = async (): Promise<any[]> => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Failed to get applications:', error);
      return [];
    }
  };

  const updateApplication = async (applicationId: string, updates: any) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('applications')
        .update(updates)
        .eq('id', applicationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Failed to update application:', error);
      throw error;
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    return updateApplication(applicationId, { status });
  };

  const deleteApplication = async (applicationId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId)
        .eq('user_id', user.id);
      
      if (error) throw error;
    } catch (error) {
      console.error('Failed to delete application:', error);
      throw error;
    }
  };

  return {
    createApplication,
    getApplications,
    updateApplication,
    updateApplicationStatus,
    deleteApplication
  };
};
