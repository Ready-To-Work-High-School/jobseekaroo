
import { JobApplication, ApplicationStatus } from '@/types/application';
import * as db from '@/lib/supabase/database';
import { validateApplicationStatus } from '@/lib/supabase/utils';

const TABLE_NAME = 'job_applications';

/**
 * Service functions for handling application-related operations
 */
export const applicationService = {
  createApplication: async (userId: string, application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<string> => {
    if (!userId) {
      throw new Error('User must be logged in to create an application');
    }
    
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

    const result = await db.insertItem<JobApplication & { id: string }>(TABLE_NAME, applicationData);
    return result.id;
  },
  
  updateApplicationStatus: async (userId: string, applicationId: string, status: ApplicationStatus): Promise<void> => {
    if (!userId) {
      throw new Error('User must be logged in to update an application');
    }
    
    // Validate the status
    if (!validateApplicationStatus(status)) {
      throw new Error(`Invalid application status: ${status}`);
    }

    // First verify the application belongs to the user
    const applications = await db.getItems<JobApplication>(
      TABLE_NAME, 
      { id: applicationId, user_id: userId }
    );
    
    if (applications.length === 0) {
      throw new Error('Application not found or does not belong to the user');
    }
    
    await db.updateItem(
      TABLE_NAME, 
      applicationId, 
      { 
        status, 
        updated_at: new Date().toISOString() 
      }
    );
  },
  
  getApplications: async (userId: string): Promise<JobApplication[]> => {
    if (!userId) {
      return [];
    }
    
    const applications = await db.getItems<JobApplication>(
      TABLE_NAME, 
      { user_id: userId },
      { 
        orderBy: { 
          column: 'applied_date', 
          ascending: false 
        } 
      }
    );
    
    // Ensure the status field is properly typed as ApplicationStatus
    return applications.map(app => ({
      ...app,
      status: app.status as ApplicationStatus
    }));
  },
  
  deleteApplication: async (userId: string, applicationId: string): Promise<void> => {
    if (!userId) {
      throw new Error('User must be logged in to delete an application');
    }
    
    // First verify the application belongs to the user
    const applications = await db.getItems<JobApplication>(
      TABLE_NAME, 
      { id: applicationId, user_id: userId }
    );
    
    if (applications.length === 0) {
      throw new Error('Application not found or does not belong to the user');
    }
    
    await db.deleteItem(TABLE_NAME, applicationId);
  }
};
