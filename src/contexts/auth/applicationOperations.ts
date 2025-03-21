
import { supabase } from '@/lib/supabase';
import { JobApplication, ApplicationStatus } from '@/types/application';
import { validateApplicationStatus } from '@/lib/supabase/utils';

/**
 * Create a new job application for a user
 */
export async function createApplication(
  userId: string,
  application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<string> {
  const applicationData = {
    user_id: userId,
    job_id: application.job_id,
    job_title: application.job_title,
    company: application.company,
    applied_date: application.applied_date,
    status: application.status || 'applied',
    notes: application.notes || '',
    contact_name: application.contact_name || '',
    contact_email: application.contact_email || '',
    next_step: application.next_step || '',
    next_step_date: application.next_step_date || null,
  };

  const { data, error } = await supabase
    .from('job_applications')
    .insert(applicationData)
    .select('id')
    .single();

  if (error) {
    console.error('Error creating application:', error);
    throw error;
  }

  return data.id;
}

/**
 * Update the status of a job application
 */
export async function updateApplicationStatus(
  userId: string,
  applicationId: string,
  status: ApplicationStatus
): Promise<void> {
  // Validate the status
  if (!validateApplicationStatus(status)) {
    throw new Error(`Invalid application status: ${status}`);
  }

  const { error } = await supabase
    .from('job_applications')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', applicationId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
}

/**
 * Get all applications for a user
 */
export async function getApplications(userId: string): Promise<JobApplication[]> {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', userId)
    .order('applied_date', { ascending: false });

  if (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }

  // Ensure the status field is properly typed as ApplicationStatus
  return (data || []).map(app => ({
    ...app,
    status: app.status as ApplicationStatus
  })) as JobApplication[];
}

/**
 * Delete an application
 */
export async function deleteApplication(userId: string, applicationId: string): Promise<void> {
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('id', applicationId)
    .eq('user_id', userId);

  if (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
}
