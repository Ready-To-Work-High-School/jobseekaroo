
import { useQuery } from '@tanstack/react-query';
import { Job } from '@/types/job';
import { getAllJobs } from '@/lib/supabase';

export interface JobFilterOptions {
  zipCode?: string;
  radius?: number;
  jobType?: string;
  experienceLevel?: string;
  isRemote?: boolean;
  isFlexible?: boolean;
  salary?: {
    min?: number;
    max?: number;
  };
  postedWithin?: number;
  keywords?: string[];
  sortBy?: 'relevance' | 'date' | 'salary' | 'distance';
  page?: number;
  limit?: number;
}

// Function to fetch jobs with filtering
export async function fetchJobs(filters: JobFilterOptions = {}): Promise<Job[]> {
  try {
    // In real app, this would make an API call with filters as query params
    // For now, we'll fetch all jobs from supabase and filter client-side
    const jobs = await getAllJobs();
    
    // Apply filtering (simplified implementation)
    let filteredJobs = jobs;
    
    // Return paginated result if page and limit are provided
    if (filters.page && filters.limit) {
      const start = (filters.page - 1) * filters.limit;
      const end = start + filters.limit;
      return filteredJobs.slice(start, end);
    }
    
    return filteredJobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch job listings');
  }
}

export function useJobListings(filters: JobFilterOptions = {}) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
  });
}

export function usePaginatedJobListings(filters: JobFilterOptions = {}, page = 1, limit = 10) {
  return useQuery({
    queryKey: ['jobs', { ...filters, page, limit }],
    queryFn: () => fetchJobs({ ...filters, page, limit }),
  });
}
