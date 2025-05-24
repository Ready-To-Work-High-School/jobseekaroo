
import { useQuery } from '@tanstack/react-query';
import { getAllJobs } from '@/lib/supabase';

export const useJobListings = () => {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: getAllJobs,
  });
};
