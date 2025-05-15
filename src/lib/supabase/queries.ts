import { supabase } from './client';
import { ApplicationStatus } from '@/types/job';

// Function to update application status
export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  try {
    const { data, error } = await supabase
      .from('job_applications')
      .update({ status })
      .eq('id', id);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

// Add other query functions as needed
