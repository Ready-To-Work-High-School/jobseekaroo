
import { saveJob, unsaveJob, isSavedJob, getSavedJobs } from './savedJobsService';

/**
 * Service functions for handling job-related operations
 */
export const jobService = {
  saveJob: (userId: string, jobId: string): Promise<void> => {
    if (!userId) {
      console.error('User must be logged in to save jobs');
      return Promise.reject(new Error('User must be logged in to save jobs'));
    }
    return saveJob(userId, jobId);
  },
  
  unsaveJob: (userId: string, jobId: string): Promise<void> => {
    if (!userId) {
      console.error('User must be logged in to unsave jobs');
      return Promise.reject(new Error('User must be logged in to unsave jobs'));
    }
    return unsaveJob(userId, jobId);
  },
  
  isSavedJob: (userId: string, jobId: string): Promise<boolean> => {
    if (!userId) {
      console.log('No user, job cannot be saved');
      return Promise.resolve(false);
    }
    return isSavedJob(userId, jobId);
  },
  
  getSavedJobs: (userId: string): Promise<string[]> => {
    if (!userId) {
      console.log('No user, no saved jobs');
      return Promise.resolve([]);
    }
    return getSavedJobs(userId);
  }
};
