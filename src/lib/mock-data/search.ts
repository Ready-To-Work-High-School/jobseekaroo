
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

// Function to get user's current location using browser geolocation API
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }
  });
};

// Function to convert coordinates to a ZIP code (mock implementation)
export const getZipFromCoordinates = async (lat: number, lng: number): Promise<string> => {
  // In a real app, this would make an API call to a geocoding service
  // For demo purposes, we'll just return a mock ZIP code based on coordinates
  const mockZipCode = `${Math.floor(lat * 100).toString().slice(-5)}`;
  return mockZipCode.length === 5 ? mockZipCode : '32256'; // Default to Jacksonville
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
  minimumRating?: number; // Company rating filter
  benefits?: string[]; // Benefits filter
  sortBy?: 'relevance' | 'date' | 'salary' | 'distance'; // Sort options
}

// Common ZIP codes for autocomplete (would be replaced by a real API in production)
export const commonZipCodes = [
  '32256', '32207', '32204', '32202', '32246', // Jacksonville area
  '32082', '32084', '32086', // St. Augustine area
  '32003', '32065', '32068', // Clay County area
  '32092', '32095', // St. Johns County area
  '32034', '32097', // Nassau County area
  '32043', '32073', // Green Cove Springs & Orange Park
];

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

  // Apply industry filter if provided
  if (filters.industry) {
    // This is a mock implementation
    // In a real app, jobs would have an industry field
    const industryKeywords: Record<string, string[]> = {
      'healthcare': ['hospital', 'medical', 'healthcare', 'nurse', 'doctor', 'patient'],
      'technology': ['software', 'developer', 'programmer', 'IT', 'tech', 'computer'],
      'retail': ['retail', 'sales', 'customer', 'store', 'shop', 'cashier'],
      'office': ['admin', 'office', 'clerical', 'assistant', 'secretary', 'receptionist'],
      'trade': ['construction', 'electrician', 'plumber', 'carpenter', 'mechanic']
    };
    
    const keywords = industryKeywords[filters.industry];
    if (keywords) {
      filtered = filtered.filter(job => {
        const jobText = `${job.title} ${job.description}`.toLowerCase();
        return keywords.some(keyword => jobText.includes(keyword));
      });
    }
  }

  // Apply sort options
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
        break;
      case 'salary':
        filtered.sort((a, b) => {
          const aAnnualMax = a.salary?.max || a.payRate.max * 2080;
          const bAnnualMax = b.salary?.max || b.payRate.max * 2080;
          return bAnnualMax - aAnnualMax;
        });
        break;
      case 'distance':
        if (zipCode) {
          filtered.sort((a, b) => {
            const distanceA = calculateDistance(zipCode, a.location.zipCode);
            const distanceB = calculateDistance(zipCode, b.location.zipCode);
            return distanceA - distanceB;
          });
        }
        break;
      case 'relevance':
      default:
        // Relevance sorting would be more complex in a real app
        // This is just a placeholder
        break;
    }
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
    skills?: string[];
    keywords?: string[];
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
  
  // Filter by skills if provided (mock implementation)
  if (userPreferences.skills && userPreferences.skills.length > 0) {
    suggestions = suggestions.filter(job => {
      const jobText = `${job.title} ${job.description}`.toLowerCase();
      return userPreferences.skills!.some(skill => 
        jobText.includes(skill.toLowerCase())
      );
    });
  }
  
  // Filter by keywords if provided
  if (userPreferences.keywords && userPreferences.keywords.length > 0) {
    suggestions = suggestions.filter(job => {
      const jobText = `${job.title} ${job.description} ${job.company.name}`.toLowerCase();
      return userPreferences.keywords!.some(keyword => 
        jobText.includes(keyword.toLowerCase())
      );
    });
  }
  
  // Sort by relevance (in a real app this would use a more sophisticated algorithm)
  // For now, we'll just randomize to simulate personalized recommendations
  suggestions.sort(() => Math.random() - 0.5);
  
  // Return top 5 suggestions
  return suggestions.slice(0, 5);
};

// Function to save a search
export const saveSearch = async (userId: string, name: string, zipCode: string, radius: number | undefined, filters: JobSearchFilters) => {
  // In a real app, this would save the search to the database
  // For our demo, we'll just log it
  console.log('Saving search:', { userId, name, zipCode, radius, filters });
  return {
    id: Math.random().toString(36).substring(2, 15),
    name,
    zipCode,
    radius,
    filters,
    created_at: new Date().toISOString()
  };
};

// Function to get saved searches
export const getSavedSearches = async (userId: string) => {
  // In a real app, this would fetch from the database
  // For our demo, we'll return empty array
  return [];
};

// Function to delete a saved search
export const deleteSavedSearch = async (userId: string, searchId: string) => {
  // In a real app, this would delete from the database
  console.log('Deleting search:', { userId, searchId });
  return true;
};
