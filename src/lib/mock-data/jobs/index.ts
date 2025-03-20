
import { Job } from '../../../types/job';
import { retailJobs } from './retail-jobs';
import { techJobs } from './tech-jobs';
import { officeJobs } from './office-jobs';
import { healthcareJobs } from './healthcare-jobs';
import { tradeJobs } from './trade-jobs';

// Combine all jobs from different categories
export const mockJobs: Job[] = [
  ...retailJobs,
  ...techJobs,
  ...officeJobs,
  ...healthcareJobs,
  ...tradeJobs
];
