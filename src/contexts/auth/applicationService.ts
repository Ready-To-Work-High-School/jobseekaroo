
import { createApplication, updateApplicationStatus, getApplications, deleteApplication } from './applicationService';
import { JobApplication, ApplicationStatus } from '@/types/application';

/**
 * Service functions for handling application-related operations
 */
export const applicationService = {
  createApplication: (userId: string, application: Omit<JobApplication, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<string> => {
    if (!userId) {
      console.error('User must be logged in to create an application');
      return Promise.reject(new Error('User must be logged in to create an application'));
    }
    return createApplication(userId, application);
  },
  
  updateApplicationStatus: (userId: string, applicationId: string, status: ApplicationStatus): Promise<void> => {
    if (!userId) {
      console.error('User must be logged in to update an application');
      return Promise.reject(new Error('User must be logged in to update an application'));
    }
    return updateApplicationStatus(userId, applicationId, status);
  },
  
  getApplications: (userId: string): Promise<JobApplication[]> => {
    if (!userId) {
      console.log('No user, no applications');
      return Promise.resolve([]);
    }
    return getApplications(userId);
  },
  
  deleteApplication: (userId: string, applicationId: string): Promise<void> => {
    if (!userId) {
      console.error('User must be logged in to delete an application');
      return Promise.reject(new Error('User must be logged in to delete an application'));
    }
    return deleteApplication(userId, applicationId);
  }
};
