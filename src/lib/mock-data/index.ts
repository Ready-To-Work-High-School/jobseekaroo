
// Export all mock data functions from a single entry point
import { mockJobs } from './jobs';

export { mockJobs } from './jobs';
export { searchJobsByZipCode, getSavedSearches } from './search';
export { getJobById } from './job';
export { 
  mockComingSoonFeatures, 
  mockComingSoonUpdates,
  getComingSoonFeaturesByCategory,
  getComingSoonFeatureById 
} from './comingSoon';

// Add these new exports to resolve missing import errors
export const getJobs = () => mockJobs;
export const getJobsByLocation = (city: string, state: string) => {
  return mockJobs.filter(job => 
    job.location.city === city && job.location.state === state
  );
};
