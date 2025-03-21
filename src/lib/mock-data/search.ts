
import { Job } from '../../types/job';
import { mockJobs } from './jobs';

// Calculate distance between two zip codes (simplified version)
// In a real implementation, this would use geolocation data or a proper zip code distance API
const calculateDistance = (zipCode1: string, zipCode2: string): number => {
  // Mock implementation - in a real app this would use proper geo-calculations
  // Here we just return a random number between 1-50 miles based on the zip code strings
  // This is just for demonstration purposes
  const zipSum1 = zipCode1.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  const zipSum2 = zipCode2.split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  
  return Math.abs(zipSum1 - zipSum2) % 50 + 1;
};

export const searchJobsByZipCode = (zipCode: string, filters: Partial<Job> & { radius?: number } = {}): Job[] => {
  let filtered = [...mockJobs];
  
  // If zipCode is provided
  if (zipCode && zipCode.trim() !== '') {
    // If radius is provided, filter by distance
    if (filters.radius && filters.radius > 0) {
      filtered = filtered.filter(job => {
        const distance = calculateDistance(zipCode, job.location.zipCode);
        return distance <= filters.radius;
      });
    } else {
      // Original exact zip code match
      filtered = filtered.filter(job => job.location.zipCode === zipCode);
    }
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
