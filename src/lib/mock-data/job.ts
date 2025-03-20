
import { Job } from '../../types/job';
import { mockJobs } from './jobs';

export const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};
