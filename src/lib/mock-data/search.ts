
import { Job } from '../../types/job';
import { mockJobs } from './jobs';

export const searchJobsByZipCode = (zipCode: string, filters: Partial<Job> = {}): Job[] => {
  let filtered = [...mockJobs];
  
  // If zipCode is provided
  if (zipCode && zipCode.trim() !== '') {
    filtered = filtered.filter(job => job.location.zipCode === zipCode);
  }
  
  // Apply additional filters
  if (filters.type) {
    filtered = filtered.filter(job => job.type === filters.type);
  }
  
  if (filters.experienceLevel) {
    filtered = filtered.filter(job => job.experienceLevel === filters.experienceLevel);
  }
  
  if (filters.isRemote !== undefined) {
    filtered = filtered.filter(job => job.isRemote === filters.isRemote);
  }
  
  if (filters.isFlexible !== undefined) {
    filtered = filtered.filter(job => job.isFlexible === filters.isFlexible);
  }
  
  return filtered;
};
