
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

export interface JobSearchFilters {
  type?: string;
  experienceLevel?: string;
  isRemote?: boolean;
  isFlexible?: boolean;
  salary?: {
    min?: number;
    max?: number;
  };
  keywords?: string[];
  companyName?: string;
  postedWithin?: number; // days
  skillLevel?: string;
  industry?: string;
  radius?: number;
}

export const searchJobsByZipCode = (zipCode: string, filters: JobSearchFilters = {}): Job[] => {
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
  
  // Add salary filter functionality
  if (filters.salary?.min !== undefined) {
    filtered = filtered.filter(job => 
      (job.salary?.min !== undefined && job.salary.min >= (filters.salary?.min || 0)) ||
      (job.payRate.min * 2080 >= (filters.salary?.min || 0)) // Approximate annual salary based on hourly rate
    );
  }
  
  if (filters.salary?.max !== undefined) {
    filtered = filtered.filter(job => 
      (job.salary?.max !== undefined && job.salary.max <= (filters.salary?.max || Infinity)) ||
      (job.payRate.max * 2080 <= (filters.salary?.max || Infinity)) // Approximate annual salary based on hourly rate
    );
  }
  
  // Add company name filter
  if (filters.companyName) {
    const companyNameLower = filters.companyName.toLowerCase();
    filtered = filtered.filter(job => 
      job.company.name.toLowerCase().includes(companyNameLower)
    );
  }
  
  // Filter by keywords (search in title and description)
  if (filters.keywords && filters.keywords.length > 0) {
    filtered = filtered.filter(job => {
      const jobText = `${job.title} ${job.description} ${job.company.name}`.toLowerCase();
      return filters.keywords!.some(keyword => 
        jobText.includes(keyword.toLowerCase())
      );
    });
  }
  
  // Add recently posted filter
  if (filters.postedWithin !== undefined) {
    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - filters.postedWithin));
    
    filtered = filtered.filter(job => {
      const postedDate = new Date(job.postedDate);
      return postedDate >= cutoffDate;
    });
  }
  
  return filtered;
};

// New function to get job suggestions based on user preferences or history
export const getJobSuggestions = (
  userPreferences: {
    jobTypes?: string[];
    experienceLevels?: string[];
    industries?: string[];
    zipCode?: string;
  } = {}
): Job[] => {
  let suggestions = [...mockJobs];
  
  // Filter by job types if provided
  if (userPreferences.jobTypes && userPreferences.jobTypes.length > 0) {
    suggestions = suggestions.filter(job => 
      userPreferences.jobTypes!.includes(job.type)
    );
  }
  
  // Filter by experience levels if provided
  if (userPreferences.experienceLevels && userPreferences.experienceLevels.length > 0) {
    suggestions = suggestions.filter(job => 
      userPreferences.experienceLevels!.includes(job.experienceLevel)
    );
  }
  
  // Filter by location if provided
  if (userPreferences.zipCode) {
    suggestions = suggestions.filter(job => 
      calculateDistance(userPreferences.zipCode!, job.location.zipCode) <= 15
    );
  }
  
  // Sort by relevance (in a real app this would use a more sophisticated algorithm)
  // For now, we'll just randomize to simulate personalized recommendations
  suggestions.sort(() => Math.random() - 0.5);
  
  // Return top 5 suggestions
  return suggestions.slice(0, 5);
};
